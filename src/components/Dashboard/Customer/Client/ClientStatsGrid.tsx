import { Card, CardContent } from "@/components/ui/card";

type ClientStatsGridProps = {
  totalClients: number;
  selectedClients: number;
  countriesCount: number;
};

export default function ClientStatsGrid({
  totalClients,
  selectedClients,
  countriesCount,
}: ClientStatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title="Total Clients"
        value={String(totalClients)}
        description="All saved recipients in the dashboard list."
      />
      <SummaryCard
        title="Selected"
        value={String(selectedClients)}
        description="Clients ready to convert into a bulk checkout CSV."
      />
      <SummaryCard
        title="Countries"
        value={String(countriesCount)}
        description="Unique country codes in the selected client set."
      />
    </div>
  );
}

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
