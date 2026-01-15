import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SharedDropdown from "@/components/shared/SharedDropdown";
import type { Order } from "@/types/dashboard";

interface OrderTableProps {
  orders: Order[];
}

const actionOptions = [
  { label: "View Details", value: "view" },
  { label: "Edit Order", value: "edit" },
  { label: "Cancel Order", value: "cancel" },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-[#DCFCE7] text-[#008236]";
    case "shipped":
      return "bg-[#FFEDD4] text-[#CA3500]";
    case "scheduled":
      return "bg-[#F3E8FF] text-[#8200DB]";
    case "pending":
      return "bg-[#FEF9C2] text-[#A65F00]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden mt-4">
      <Table className="border-collapse">
        <TableHeader className="bg-primary-50">
          <TableRow className="border-b hover:bg-transparent ">
            <TableHead className="font-medium text-gray-900 py-4 px-6">
              Order ID
            </TableHead>
            <TableHead className="font-medium text-gray-900">
              Recipient
            </TableHead>
            <TableHead className="font-medium text-gray-900">Gift</TableHead>
            <TableHead className="font-medium text-gray-900">
              Campaign
            </TableHead>
            <TableHead className="font-medium text-gray-900">Date</TableHead>
            <TableHead className="font-medium text-gray-900">Status</TableHead>
            <TableHead className="font-medium text-gray-900">Amount</TableHead>
            <TableHead className="font-medium text-gray-900 ">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="border-b border-gray-200 hover:bg-primary-50/50 last:border-0 transition-colors group"
            >
              <TableCell className="py-5 px-6 font-medium text-gray-900">
                {order.id}
              </TableCell>
              <TableCell className="py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {order.recipient}
                  </span>
                  <span className="text-xs text-gray-500">
                    {order.recipientEmail}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-5 text-gray-600">{order.gift}</TableCell>
              <TableCell className="py-5">
                {order.campaign ? (
                  <Badge
                    variant="outline"
                    className="bg-[#EEF2FF] text-[#4338CA] border-none rounded-md px-2.5 py-0.5"
                  >
                    {order.campaign}
                  </Badge>
                ) : (
                  <span className="text-gray-300">—</span>
                )}
              </TableCell>
              <TableCell className="py-5 text-gray-600">{order.date}</TableCell>
              <TableCell className="py-5">
                <Badge
                  className={cn(
                    "shadow-none border-none px-3 capitalize font-medium rounded-md",
                    getStatusStyles(order.status)
                  )}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="py-5 font-semibold text-gray-900">
                ${order.amount.toFixed(2)}
              </TableCell>
              <TableCell className="py-5 ">
                <SharedDropdown
                  options={actionOptions}
                  onValueChange={(val) => console.log(val)}
                  triggerIcon={
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  }
                  className="w-auto border-none bg-transparent"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
