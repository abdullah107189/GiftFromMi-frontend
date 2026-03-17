import { Edit, Mail, MapPin, Phone, Trash2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IClientRecord } from "@/types/client";
import { countries } from "@/utils/countryCode";

type ClientTableProps = {
  clients: IClientRecord[];
  isLoading?: boolean;
  pendingClientId?: string | null;
  isDeletingClient?: boolean;
  isUpdatingClient?: boolean;
  selectedClientIds: string[];
  onToggleClient: (clientId: string) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onEdit: (client: IClientRecord) => void;
  onDelete: (client: IClientRecord) => void;
};

const countryLabelByCode = Object.fromEntries(
  countries.map((country) => [country.value.toUpperCase(), country.label]),
) as Record<string, string>;

export default function ClientTable({
  isLoading = false,
  clients,
  pendingClientId,
  isDeletingClient = false,
  isUpdatingClient = false,
  selectedClientIds,
  onToggleClient,
  onToggleSelectAll,
  onEdit,
  onDelete,
}: ClientTableProps) {
  const allSelected = clients.length > 0 && selectedClientIds.length === clients.length;

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-14">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => onToggleSelectAll(Boolean(checked))}
                aria-label="Select all clients"
              />
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Town / District</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`client-skeleton-${index}`}>
                <TableCell>
                  <Skeleton className="h-4 w-4 rounded-sm" />
                </TableCell>
                <TableCell className="min-w-72">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-56" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>
                <TableCell className="min-w-72">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-20 rounded-xl" />
                    <Skeleton className="h-9 w-24 rounded-xl" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : clients?.length === 0 && !isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-10 text-center text-sm text-slate-500"
              >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients?.map((client: IClientRecord) => {
              const isPendingRow = pendingClientId === String(client.id);
              const isSelected = selectedClientIds.includes(String(client.id));

              return (
                <TableRow key={client.id} className="hover:bg-primary-50">
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleClient(String(client.id))}
                      aria-label={`Select ${client.name}`}
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
                        {client.country_code}
                      </Badge>
                      <p className="text-xs text-slate-500">
                        {client.country ||
                          countryLabelByCode[client.country_code] ||
                          client.country_code}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p className="font-medium">{client.town}</p>
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
                        Postal code: {client.postal_code}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-slate-300"
                        disabled={isPendingRow}
                        onClick={() => onEdit(client)}
                      >
                        <Edit className="size-4" />
                        {isPendingRow && isUpdatingClient
                          ? "Updating..."
                          : "Edit"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                        disabled={isPendingRow}
                        onClick={() => onDelete(client)}
                      >
                        <Trash2 className="size-4" />
                        {isPendingRow && isDeletingClient
                          ? "Deleting..."
                          : "Delete"}
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
  );
}
