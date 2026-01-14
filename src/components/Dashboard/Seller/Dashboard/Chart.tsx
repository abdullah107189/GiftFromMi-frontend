// components/Chart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "@/types/dashboard";

interface ChartProps {
  data: ChartData;
}

export default function Chart({ data }: ChartProps) {
  const maxValue = Math.max(...data.orders, ...data.revenue);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Gifting Activity</CardTitle>
        <p className="text-sm text-gray-500">Orders and revenue over time</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-end  space-x-2 mt-8">
          {data.months.map((month, index) => {
            const orderHeight = (data.orders[index] / maxValue) * 100;
            const revenueHeight = (data.revenue[index] / maxValue) * 100;

            return (
              <div key={month} className="flex flex-col items-center flex-1">
                <div className="flex items-end justify-center space-x-1 w-full h-48">
                  <div
                    className="w-3 bg-blue-500 rounded-t"
                    style={{ height: `${orderHeight}%` }}
                  />
                  <div
                    className="w-3 bg-orange-500 rounded-t"
                    style={{ height: `${revenueHeight}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{month}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Orders</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Revenue ($)</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0k</span>
          <span>4k</span>
          <span>8k</span>
          <span>12k</span>
          <span>16k</span>
        </div>
      </CardContent>
    </Card>
  );
}
