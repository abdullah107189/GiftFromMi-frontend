import { Button } from "@/components/ui/button";

type ClientListHeaderProps = {
  selectedCount: number;
  onNewOrder: () => void;
  onNewClient: () => void;
};

export default function ClientListHeader({
  selectedCount,
  onNewOrder,
  onNewClient,
}: ClientListHeaderProps) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:p-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Client List
          </div>
          <h1 className="text-2xl font-semibold text-slate-950 md:text-3xl">
            Manage recipients for bulk gifting
          </h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Your client list now reads from RTK Query. Later, when backend data
            changes, this page will refresh from the API instead of local mock
            records.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            disabled={selectedCount === 0}
            className="border-slate-300"
            onClick={onNewOrder}
          >
            New Order
            {selectedCount > 0 ? ` (${selectedCount})` : ""}
          </Button>
          <Button type="button" onClick={onNewClient}>
            New Client
          </Button>
        </div>
      </div>
    </div>
  );
}
