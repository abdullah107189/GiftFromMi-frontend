import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { IClientRecord } from "@/types/client";

import ClientTable from "./ClientTable";

type ClientTableSectionProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  clients: IClientRecord[];
  selectedIds: string[];
  isLoading?: boolean;
  onToggleClient: (clientId: string, checked: boolean) => void;
  onEdit: (client: IClientRecord) => void;
  onDelete: (client: IClientRecord) => void;
};

export default function ClientTableSection({
  searchTerm,
  onSearchChange,
  clients,
  selectedIds,
  isLoading = false,
  onToggleClient,
  onEdit,
  onDelete,
}: ClientTableSectionProps) {
  return (
    <Card className="rounded-[32px] border-slate-200 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <CardContent className="space-y-6 p-5 md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-950">
              All client recipients
            </h2>
          </div>

          <div className="w-full lg:max-w-sm">
            <Input
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by name, email, phone, or country..."
              className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 shadow-none focus-visible:ring-primary/20"
            />
          </div>
        </div>

        <ClientTable
          clients={clients}
          selectedIds={selectedIds}
          isLoading={isLoading}
          onToggleClient={onToggleClient}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}
