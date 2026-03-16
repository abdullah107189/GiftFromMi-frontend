import { Edit, Mail, MapPin, Phone, Trash2, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  selectedIds: string[];
  isLoading?: boolean;
  onToggleClient: (clientId: string, checked: boolean) => void;
  onToggleSelectAll: (checked: boolean) => void;
  onEdit: (client: IClientRecord) => void;
  onDelete: (client: IClientRecord) => void;
};

const countryLabelByCode = Object.fromEntries(
  countries.map((country) => [country.value.toUpperCase(), country.label]),
) as Record<string, string>;

export default function ClientTable({
  clients,
  selectedIds,
  isLoading = false,
  onToggleClient,
  onToggleSelectAll,
  onEdit,
  onDelete,
}: ClientTableProps) {
  const isAllFilteredSelected =
    clients.length > 0 &&
    clients.every((client) => selectedIds.includes(String(client.id)));

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="w-14">
              <Checkbox
                checked={isAllFilteredSelected}
                onCheckedChange={(checked) =>
                  onToggleSelectAll(Boolean(checked))
                }
              />
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>City / District</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Key</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-sm text-slate-500"
              >
                Loading clients...
              </TableCell>
            </TableRow>
          ) : clients.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-sm text-slate-500"
              >
                No clients found.
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => {
              const clientId = String(client.id);
              const isSelected = selectedIds.includes(clientId);

              return (
                <TableRow
                  key={clientId}
                  className={isSelected ? "bg-primary/5" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        onToggleClient(clientId, Boolean(checked))
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

                  <TableCell className="min-w-56">
                    <p className="text-sm leading-6 text-slate-600">
                      {client.key || "No key"}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-slate-300"
                        onClick={() => onEdit(client)}
                      >
                        <Edit className="size-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                        onClick={() => onDelete(client)}
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
  );
}
