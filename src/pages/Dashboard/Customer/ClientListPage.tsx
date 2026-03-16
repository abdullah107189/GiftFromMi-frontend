/* eslint-disable react-hooks/set-state-in-effect */
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Edit, Mail, MapPin, Phone, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import SEO from "@/components/shared/SEO";
import DeleteConfirmModal from "@/components/shared/Modal/DeleteConfirmModal";
import { SharedSearchableSelect } from "@/components/shared/SharedSearchableSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import type { IClientRecord } from "@/types/client";
import { countries } from "@/utils/countryCode";
import { buildBulkClientSelection } from "@/utils/clientCsv";

const CLIENT_STORAGE_KEY = "dashboard_clients_v1";

const clientSchema = z.object({
  name: z.string().trim().min(2, "Client name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z.string().trim().min(7, "Phone number is required"),
  country: z.string().trim().min(2, "Country code is required"),
  town_city: z.string().trim().min(2, "Town / city is required"),
  district: z.string().trim().min(2, "District is required"),
  street_address: z.string().trim().min(5, "Street address is required"),
  postcode: z.string().trim().min(2, "Postcode is required"),
  order_notes: z.string().trim().optional(),
});

type ClientFormValues = z.infer<typeof clientSchema>;

const defaultFormValues: ClientFormValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  town_city: "",
  district: "",
  street_address: "",
  postcode: "",
  order_notes: "",
};

const defaultClients: IClientRecord[] = [
  {
    id: "client-1",
    name: "Kiel Carmen",
    email: "kcarmen0@blogger.com",
    phone: "581-944-9982",
    country: "BD",
    town_city: "Unabah",
    district: "Oil & Gas Services",
    street_address: "241 Artisan Trail",
    postcode: "1215",
    order_notes: "Fragile, Handle with care",
  },
  {
    id: "client-2",
    name: "Eloisa Showell",
    email: "eshowell1@google.co.uk",
    phone: "803-877-2503",
    country: "US",
    town_city: "Surkh Bilandi",
    district: "JReport",
    street_address: "59 Dawn Park",
    postcode: "1215",
    order_notes: "Fragile, Handle with care",
  },
  {
    id: "client-3",
    name: "Palmer Rait",
    email: "prait2@si.edu",
    phone: "633-347-2331",
    country: "CN",
    town_city: "Khadir",
    district: "BTLS",
    street_address: "75 School Crossing",
    postcode: "1215",
    order_notes: "Gift wrap this order",
  },
  {
    id: "client-4",
    name: "Kaycee Bonas",
    email: "kbonas3@bigcartel.com",
    phone: "940-309-9054",
    country: "BD",
    town_city: "Dehi",
    district: "Lymphedema",
    street_address: "8435 Grayhawk Pass",
    postcode: "1215",
    order_notes: "Priority delivery requested",
  },
  {
    id: "client-5",
    name: "Johann Vittore",
    email: "jvittore4@yale.edu",
    phone: "742-564-9614",
    country: "BD",
    town_city: "Pashmul",
    district: "XCOM",
    street_address: "700 Northfield Street",
    postcode: "1215",
    order_notes: "Deliver between 10 AM and 4 PM",
  },
];

const buildClientId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `client-${Date.now()}`;
};

const loadClients = (): IClientRecord[] => {
  if (typeof window === "undefined") return defaultClients;

  try {
    const storedValue = window.localStorage.getItem(CLIENT_STORAGE_KEY);
    if (!storedValue) return defaultClients;

    const parsed = JSON.parse(storedValue) as IClientRecord[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultClients;
  } catch {
    return defaultClients;
  }
};

const countryOptions = countries.map((country) => ({
  label: `${country.label} (${country.value.toUpperCase()})`,
  value: country.value.toUpperCase(),
}));

const countryLabelByCode = Object.fromEntries(
  countries.map((country) => [country.value.toUpperCase(), country.label]),
) as Record<string, string>;

const toFormValues = (client: IClientRecord): ClientFormValues => ({
  name: client.name,
  email: client.email,
  phone: client.phone,
  country: client.country,
  town_city: client.town_city,
  district: client.district,
  street_address: client.street_address,
  postcode: client.postcode,
  order_notes: client.order_notes,
});

const ClientListPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<IClientRecord[]>(() => loadClients());
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<IClientRecord | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    window.localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) => clients.some((client) => client.id === id)),
    );
  }, [clients]);

  const filteredClients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return clients;

    return clients.filter((client) =>
      [
        client.name,
        client.email,
        client.phone,
        client.country,
        client.town_city,
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

  const isAllFilteredSelected =
    filteredClients.length > 0 &&
    filteredClients.every((client) => selectedIds.includes(client.id));

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
        ...new Set([...prev, ...filteredClients.map((client) => client.id)]),
      ]);
      return;
    }

    const filteredIds = new Set(filteredClients.map((client) => client.id));
    setSelectedIds((prev) => prev.filter((id) => !filteredIds.has(id)));
  };

  const handleOpenNewClient = () => {
    setEditingClient(null);
    reset(defaultFormValues);
    setIsDialogOpen(true);
  };

  const handleOpenEditClient = (client: IClientRecord) => {
    setEditingClient(client);
    reset(toFormValues(client));
    setIsDialogOpen(true);
  };

  const handleClientSubmit = (values: ClientFormValues) => {
    const normalizedValues: IClientRecord = {
      id: editingClient?.id ?? buildClientId(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      country: values.country,
      town_city: values.town_city,
      district: values.district,
      street_address: values.street_address,
      postcode: values.postcode,
      order_notes: values.order_notes ?? "",
    };

    if (editingClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editingClient.id ? normalizedValues : client,
        ),
      );
      toast.success("Client updated successfully.");
    } else {
      setClients((prev) => [normalizedValues, ...prev]);
      toast.success("Client added successfully.");
    }

    setIsDialogOpen(false);
    setEditingClient(null);
    reset(defaultFormValues);
  };

  const handleDeleteClient = () => {
    if (!deleteId) return;

    setClients((prev) => prev.filter((client) => client.id !== deleteId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteId));
    setDeleteId(null);
    toast.success("Client deleted successfully.");
  };

  const handleStartBulkOrder = () => {
    if (!selectedClients.length) return;

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

  return (
    <section className="space-y-6">
      <SEO
        title="Client List"
        description="Manage client recipients and start bulk orders from selected clients."
      />

      <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-2">
            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Client List
            </div>
            <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">
              Manage recipients for bulk gifting
            </h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
              This page is frontend-ready for future API integration. Right now
              it uses CSV-shaped client records so later you can replace the
              local list with backend data without changing the table or bulk
              order flow.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Clients"
          value={String(clients.length)}
          description="All saved recipients in the dashboard list."
        />
        <SummaryCard
          title="Selected"
          value={String(selectedClients.length)}
          description="Clients ready to convert into a bulk checkout CSV."
        />
        <SummaryCard
          title="Countries"
          value={String(selectedCountriesCount)}
          description="Unique country codes in the selected client set."
        />
      </div>

      <Card className="rounded-[32px] border-slate-200 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
        <CardContent className="space-y-6 p-5 md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-950">
                All client recipients
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {" "}
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, phone, or country..."
                className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none focus-visible:ring-primary/20"
              />
              <Button
                type="button"
                variant="outline"
                disabled={selectedClients.length === 0}
                className="border-slate-300"
                onClick={handleStartBulkOrder}
              >
                New Order
                {selectedClients.length > 0
                  ? ` (${selectedClients.length})`
                  : ""}
              </Button>
              <Button type="button" onClick={handleOpenNewClient}>
                <Plus className="size-4" />
                New Client
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-primary-50">
                  <TableHead className="w-14">
                    <Checkbox
                      checked={isAllFilteredSelected}
                      className="w-7 h-7 rounded-full cursor-pointer"
                      onCheckedChange={(checked) =>
                        handleToggleSelectAll(Boolean(checked))
                      }
                    />
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>City / District</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No clients found for your current search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => {
                    const isSelected = selectedIds.includes(client.id);

                    return (
                      <TableRow
                        key={client.id}
                        className={
                          isSelected
                            ? "bg-primary-100 hover:bg-primary-100"
                            : "hover:bg-gray-100"
                        }
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            className="w-7 h-7 rounded-full cursor-pointer"
                            onCheckedChange={(checked) =>
                              handleToggleClient(client.id, Boolean(checked))
                            }
                          />
                        </TableCell>
                        <TableCell className="min-w-72">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Users className="size-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">
                                  {client.name}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                  <span className="inline-flex items-center gap-1">
                                    <Mail className="size-3.5" />
                                    {client.email}
                                  </span>
                                  <span className="inline-flex items-center gap-1">
                                    <Phone className="size-3.5" />
                                    {client.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant="outline" className="rounded-full">
                              {client.country}
                            </Badge>
                            <p className="text-xs text-slate-500">
                              {countryLabelByCode[client.country] ??
                                client.country}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm text-slate-700">
                            <p className="font-medium">{client.town_city}</p>
                            <p className="text-slate-500">{client.district}</p>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-72">
                          <div className="space-y-1 text-sm text-slate-700">
                            <p className="inline-flex items-start gap-2">
                              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span>{client.street_address}</span>
                            </p>
                            <p className="text-xs text-slate-500">
                              Postcode: {client.postcode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="min-w-56">
                          <p className="text-sm leading-6 text-slate-600">
                            {client.order_notes || "No extra note"}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-slate-300"
                              onClick={() => handleOpenEditClient(client)}
                            >
                              <Edit className="size-4" />
                              Edit
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                              onClick={() => {
                                setDeleteId(client.id);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 className="size-4" />
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl rounded-[28px] border-slate-200 bg-white p-0">
          <DialogHeader className="border-b border-slate-200 px-6 py-5 md:px-8">
            <DialogTitle className="text-2xl font-semibold text-slate-950">
              {editingClient ? "Update Client" : "Add New Client"}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-slate-600">
              Fill the same fields that your future API or CSV import will send.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(handleClientSubmit)}
            className="space-y-6 px-6 py-6 md:px-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Client Name" error={errors.name?.message}>
                <Input
                  {...register("name")}
                  placeholder="Enter client name"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field label="Email Address" error={errors.email?.message}>
                <Input
                  {...register("email")}
                  placeholder="Enter email address"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field label="Phone Number" error={errors.phone?.message}>
                <Input
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field label="Country Code" error={errors.country?.message}>
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <SharedSearchableSelect
                      options={countryOptions}
                      value={field.value}
                      onChange={field.onChange}
                      isClearable
                      placeholder="Select country code"
                      className="min-h-12!"
                    />
                  )}
                />
              </Field>

              <Field label="Town / City" error={errors.town_city?.message}>
                <Input
                  {...register("town_city")}
                  placeholder="Enter town or city"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field label="District" error={errors.district?.message}>
                <Input
                  {...register("district")}
                  placeholder="Enter district"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field
                label="Street Address"
                error={errors.street_address?.message}
              >
                <Input
                  {...register("street_address")}
                  placeholder="Enter street address"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>

              <Field label="Postcode" error={errors.postcode?.message}>
                <Input
                  {...register("postcode")}
                  placeholder="Enter postcode"
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
                />
              </Field>
            </div>

            <Field label="Order Notes" error={errors.order_notes?.message}>
              <Textarea
                {...register("order_notes")}
                placeholder="Write optional order notes"
                className="min-h-28 rounded-3xl border-slate-200 bg-slate-50 shadow-none focus-visible:ring-primary/20"
              />
            </Field>

            <DialogFooter className="border-t border-slate-200 pt-5">
              <Button
                type="button"
                variant="outline"
                className="border-slate-300"
                onClick={() => {
                  setIsDialogOpen(false);
                  setEditingClient(null);
                  reset(defaultFormValues);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingClient ? "Save Client" : "Create Client"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteClient}
        title="Delete Client?"
        description="This client will be removed from your saved recipient list."
        confirmLabel="Delete Client"
      />
    </section>
  );
};

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="rounded-[28px] border-slate-200 py-0 shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
      <CardContent className="space-y-2 p-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>
        <p className="text-3xl font-semibold text-slate-950">{value}</p>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-slate-700">{label}</Label>
      {children}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}

export default ClientListPage;
