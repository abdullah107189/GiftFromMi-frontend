// components/QuickActionCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import type { QuickAction } from "@/types/dashboard";

interface QuickActionCardProps {
  action: QuickAction;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <h4 className="font-semibold text-gray-900">{action.title}</h4>
        <p className="text-sm text-gray-500 mt-1">{action.description}</p>
      </CardContent>
    </Card>
  );
}
