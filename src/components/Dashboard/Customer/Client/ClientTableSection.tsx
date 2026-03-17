import { Card, CardContent } from "@/components/ui/card";
import type { IClientRecord } from "@/types/client";

import ClientTable from "./ClientTable";

type ClientTableSectionProps = {
  clients: IClientRecord[];
  isLoading?: boolean;
  pendingClientId?: string | null;
  isDeletingClient?: boolean;
  isUpdatingClient?: boolean;
  onEdit: (client: IClientRecord) => void;
  onDelete: (client: IClientRecord) => void;
};

export default function ClientTableSection({
  clients,
  isLoading = false,
  pendingClientId,
  isDeletingClient = false,
  isUpdatingClient = false,
  onEdit,
  onDelete,
}: ClientTableSectionProps) {
  return (
    <Card className="rounded-4xl border-slate-200 py-0 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
      <CardContent className="space-y-6 p-5 md:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-950">
              All client recipients
            </h2>
            <p className="text-sm text-slate-500">
              {isLoading
                ? "Refreshing client list..."
                : "Add, update, and remove recipients from one place."}
            </p>
          </div>
        </div>

        <ClientTable
          clients={clients}
          isLoading={isLoading}
          pendingClientId={pendingClientId}
          isDeletingClient={isDeletingClient}
          isUpdatingClient={isUpdatingClient}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}
