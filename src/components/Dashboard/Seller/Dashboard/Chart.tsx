/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  // ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { chartData } from "@/data/mockData";

export default function GiftingActivity() {
  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#8B5CF6",
    },
    revenue: {
      label: "Revenue ($)",
      color: "#F97316",
    },
  } satisfies ChartConfig;
  return (
    <Card className="rounded-2xl border-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-normal">
          Gifting Activity
        </CardTitle>
        <CardDescription className="text-sm font-normal">
          Orders and revenue over time
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 xl:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-video h-55.25 w-full "
        >
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend
              content={({ payload }) => (
                <div className="flex justify-center gap-4 mt-6">
                  {payload?.map((entry: any, index: number) => (
                    <div
                      key={`item-${index}`}
                      className="flex items-center gap-2"
                    >
                      {/* Circular Dot with Dynamic Color */}
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: entry.color }}
                      >
                        {entry.value === "orders" ? "Orders" : "Revenue ($)"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              stackId="a"
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-orders)"
              strokeWidth={2}
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
