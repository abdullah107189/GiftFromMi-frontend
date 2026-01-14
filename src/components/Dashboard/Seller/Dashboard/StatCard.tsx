// components/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";
import type { StatCard } from "@/types/dashboard";

interface StatCardProps {
  data: StatCard;
}

export default function StatCard({ data }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{data.title}</p>
            <h3 className="text-3xl font-bold mt-2">{data.value}</h3>
          </div>
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{data.change}</span>
          </div>
        </div>
        {data.description && (
          <p className="text-sm text-gray-500 mt-2">{data.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
