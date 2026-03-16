/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import ClientFormDialog, {
  type ClientFormValues,
} from "@/components/Dashboard/Customer/Client/ClientFormDialog";
import ClientListHeader from "@/components/Dashboard/Customer/Client/ClientListHeader";
import ClientStatsGrid from "@/components/Dashboard/Customer/Client/ClientStatsGrid";
import SEO from "@/components/shared/SEO";
import DeleteConfirmModal from "@/components/shared/Modal/DeleteConfirmModal";
import PageLoader from "@/components/shared/PageLoader";
import {
  useAddClientMutation,
  useDeleteClientMutation,
  useGetAllClientsQuery,
  useUpdateClientMutation,
} from "@/redux/features/clients/clients.api";
import type { IClientRecord } from "@/types/client";
import { buildBulkClientSelection } from "@/utils/clientCsv";
import ClientTableSection from "@/components/Dashboard/Customer/Client/ClientTableSection";

const normalizeClientRecord = (client: any): IClientRecord => ({
  // Keep the mapper defensive so future API payload changes do not break the UI.
  id: String(client?.id ?? ""),
  key: String(client?.key ?? ""),
  name: String(client?.name ?? ""),
  email: String(client?.email ?? ""),
  phone: String(client?.phone ?? ""),
  country: String(client?.country ?? ""),
  country_code: String(
    client?.country_code ?? client?.country ?? "",
  ).toUpperCase(),
  town: String(client?.town ?? client?.town_city ?? ""),
  district: String(client?.district ?? ""),
  street_address: String(client?.street_address ?? ""),
  postal_code: String(client?.postal_code ?? client?.postcode ?? ""),
});

const getClientsFromResponse = (response: any): IClientRecord[] => {
  const rawClients = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : [];

  return rawClients.map(normalizeClientRecord);
};

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
    isFetching,
  } = useGetAllClientsQuery(undefined);
  const [addClient, { isLoading: isAddingClient }] = useAddClientMutation();

  const [updateClient, { isLoading: isUpdatingClient }] =
    useUpdateClientMutation();

  const [deleteClient, { isLoading: isDeletingClient }] =
    useDeleteClientMutation();

  const clients = useMemo(
    () => getClientsFromResponse(clientsResponse),
    [clientsResponse],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<IClientRecord | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => clients.some((client) => String(client.id) === id)),
    );
  }, [clients]);

  const filteredClients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return clients;

    return clients.filter((client) =>
      [
        client.name,
        client.key,
        client.email,
        client.phone,
        client.country,
        client.country_code,
        client.town,
        client.district,
        client.street_address,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [clients, searchTerm]);

  const selectedClients = useMemo(
    () => clients.filter((client) => selectedIds.includes(client.id)),
    [clients, selectedIds],
  );

  const selectedCountriesCount = useMemo(
    () => new Set(selectedClients.map((client) => client.country)).size,
    [selectedClients],
  );

  const handleToggleClient = (clientId: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked
        ? [...new Set([...prev, clientId])]
        : prev.filter((id) => id !== clientId),
    );
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...filteredClients.map((client) => String(client.id)),
        ]),
      ]);
      return;
    }

    const filteredIds = new Set(
      filteredClients.map((client) => String(client.id)),
    );
    setSelectedIds((prev) => prev.filter((id) => !filteredIds.has(id)));
  };

  const handleOpenNewClient = () => {
    setEditingClient(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditClient = (client: IClientRecord) => {
    setEditingClient(client);
    setIsDialogOpen(true);
  };

  const handleClientSubmit = async (values: ClientFormValues) => {
    const payload = {
      key: values.key,
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
        const response: any = await updateClient({
          id: editingClient.id,
          data: payload,
        }).unwrap();
        toast.success(response?.message || "Client updated successfully.");
      } else {
        const response: any = await addClient(payload).unwrap();
        toast.success(response?.message || "Client added successfully.");
      }

      setIsDialogOpen(false);
      setEditingClient(null);
    } catch (error) {
      toast.error(getErrorMessage(error, "Client save failed."));
    }
  };

  const handleDeleteClient = async () => {
    if (!deleteId) return;

    try {
      const response: any = await deleteClient(deleteId).unwrap();
      setSelectedIds((prev) => prev.filter((id) => id !== deleteId));
      setDeleteId(null);
      setIsDeleteOpen(false);
      toast.success(response?.message || "Client deleted successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Client delete failed."));
    }
  };

  const handleStartBulkOrder = () => {
    if (!selectedClients.length) return;

    // Selected clients are converted into the same CSV-shaped structure
    // that the bulk checkout page already understands.
    const bulkSelection = buildBulkClientSelection(selectedClients);

    navigate("/checkout?type=bulk", {
      state: {
        bulkClientSelection: bulkSelection,
      },
    });

    toast.success(
      `${selectedClients.length} clients prepared for bulk checkout.`,
    );
  };

  const isBusy = isAddingClient || isUpdatingClient || isDeletingClient;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <section className="space-y-6">
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
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        clients={filteredClients}
        selectedIds={selectedIds}
        isLoading={isFetching}
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
        title="Delete Client?"
        description="This client will be removed from your saved recipient list."
        confirmLabel={isDeletingClient ? "Deleting..." : "Delete Client"}
      />
    </section>
  );
};

export default ClientListPage;
