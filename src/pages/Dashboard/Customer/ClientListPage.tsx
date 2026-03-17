/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import ClientFormDialog, {
  type ClientFormValues,
} from "@/components/Dashboard/Customer/Client/ClientFormDialog";
import ClientListHeader from "@/components/Dashboard/Customer/Client/ClientListHeader";
import ClientStatsGrid from "@/components/Dashboard/Customer/Client/ClientStatsGrid";
import SEO from "@/components/shared/SEO";
import DeleteConfirmModal from "@/components/shared/Modal/DeleteConfirmModal";
// import PageLoader from "@/components/shared/PageLoader";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "@/redux/features/clients/clients.api";
import type { IClientRecord } from "@/types/client";
import { buildBulkClientSelection } from "@/utils/clientCsv";
import ClientTableSection from "@/components/Dashboard/Customer/Client/ClientTableSection";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  return fallback;
};

const ClientListPage = () => {
  const navigate = useNavigate();
  const {
    data: clientsResponse,
    isLoading,
    isFetching: isFetchingGetAllClients,
    refetch: refetchClients,
  } = useGetAllClientsQuery(undefined);
  const [addClient, { isLoading: isAddingClient }] = useAddClientMutation();
  const [updateClient, { isLoading: isUpdatingClient }] =
    useUpdateClientMutation();

  const [deleteClient, { isLoading: isDeletingClient }] =
    useDeleteClientMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<IClientRecord | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingClientId, setPendingClientId] = useState<string | null>(null);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);

  const clients = Array.isArray(clientsResponse?.data)
    ? clientsResponse.data
    : Array.isArray(clientsResponse)
      ? clientsResponse
      : [];
  const selectedClients = clients.filter((client: IClientRecord) =>
    selectedClientIds.includes(String(client.id)),
  );
  const selectedCountriesCount = new Set(
    selectedClients.map((client: IClientRecord) => client.country_code),
  ).size;

  const handleOpenNewClient = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditClient = (client: IClientRecord) => {
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const handleToggleClient = (clientId: string) => {
    setSelectedClientIds((currentIds) =>
      currentIds.includes(clientId)
        ? currentIds.filter((id) => id !== clientId)
        : [...currentIds, clientId],
    );
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClientIds(
        clients.map((client: IClientRecord) => String(client.id)),
      );
      return;
    }

    setSelectedClientIds([]);
  };

  const handleStartBulkOrder = () => {
    if (selectedClients.length === 0) return;

    const bulkClientSelection = buildBulkClientSelection(selectedClients);

    navigate("/checkout?type=bulk", {
      state: { bulkClientSelection },
    });
  };

  const handleClientSubmit = async (values: ClientFormValues) => {
    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      country_code: values.country_code.toUpperCase(),
      town: values.town,
      district: values.district,
      street_address: values.street_address,
      postal_code: values.postal_code,
    };

    try {
      if (editingClient) {
        setPendingClientId(String(editingClient.id));
        const response: any = await updateClient({
          id: editingClient.id,
          data: payload,
        }).unwrap();
        setIsDialogOpen(false);
        toast.success(response?.message || "Client updated successfully.");
        await refetchClients();
      } else {
        setPendingClientId("new");
        const response: any = await addClient(payload).unwrap();
        setIsDialogOpen(false);
        await refetchClients();
        toast.success(response?.message || "Client added successfully.");
      }
      setEditingClient(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Client save failed."));
    } finally {
      setPendingClientId(null);
    }
  };

  const handleDeleteClient = async () => {
    if (!deleteId) return;

    try {
      setPendingClientId(deleteId);
      const response: any = await deleteClient(deleteId).unwrap();
      setDeleteId(null);
      setIsDeleteOpen(false);
      setSelectedClientIds((currentIds) =>
        currentIds.filter((id) => id !== deleteId),
      );
      await refetchClients();
      toast.success(response?.message || "Client deleted successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Client delete failed."));
    } finally {
      setPendingClientId(null);
    }
  };

  const isBusy = isAddingClient || isUpdatingClient || isDeletingClient;
  const isRefreshing = isFetchingGetAllClients && !isLoading;
  const currentActionLabel = isAddingClient
    ? "Adding client..."
    : isUpdatingClient
      ? "Updating client..."
      : isDeletingClient
        ? "Deleting client..."
        : null;

  // if (isLoading) {
  //   return <PageLoader />;
  // }

  return (
    <section className="space-y-6 overflow-hidden">
      <SEO
        title="Client List"
        description="Manage client recipients and start bulk orders from selected clients."
      />

      <ClientListHeader
        selectedCount={selectedClients.length}
        onNewOrder={handleStartBulkOrder}
        onNewClient={handleOpenNewClient}
      />

      <ClientStatsGrid
        totalClients={clients.length}
        selectedClients={selectedClients.length}
        countriesCount={selectedCountriesCount}
      />

      <ClientTableSection
        clients={clients}
        isLoading={isRefreshing}
        pendingClientId={pendingClientId}
        isDeletingClient={isDeletingClient}
        isUpdatingClient={isUpdatingClient}
        selectedClientIds={selectedClientIds}
        onToggleClient={handleToggleClient}
        onToggleSelectAll={handleToggleSelectAll}
        onEdit={handleOpenEditClient}
        onDelete={(client) => {
          setDeleteId(String(client.id));
          setIsDeleteOpen(true);
        }}
      />

      <ClientFormDialog
        open={isDialogOpen}
        editingClient={editingClient}
        isBusy={isBusy}
        isAddingClient={isAddingClient}
        isUpdatingClient={isUpdatingClient}
        pendingLabel={currentActionLabel}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingClient(null);
          }
        }}
        onSubmit={handleClientSubmit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteClient}
        isBusy={isDeletingClient}
        title="Delete Client?"
        description="This client will be removed from your saved recipient list."
        confirmLabel={isDeletingClient ? "Deleting..." : "Delete Client"}
      />
    </section>
  );
};

export default ClientListPage;
