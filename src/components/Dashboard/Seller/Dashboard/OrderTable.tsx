import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types/dashboard";
import { MoreHorizontal } from "lucide-react";
import SharedDropdown from "@/components/shared/SharedDropdown";
interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-[#DCFCE7] text-[#008236]";
      case "in-transit":
        return "bg-[#FFEDD4] text-[#CA3500]";
      case "scheduled":
        return "bg-[#F3E8FF] text-[#8200DB]";
      case "pending":
        return "bg-[#FEF9C2] text-[#A65F00]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const actionOptions = [
    { label: "View Details", value: "view" },
    { label: "Edit Order", value: "edit" },
    { label: "Cancel Order", value: "cancel" },
  ];
  return (
    <div className="border-b">
      <Table className="">
        <TableHeader>
          <TableRow className="text-gray-700 font-medium hover:bg-primary-100">
            <TableHead className="">Order ID</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Gift</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-12 !">
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-primary-50">
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.recipient}</TableCell>
              <TableCell>{order.gift}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(order.status)}
                  variant="secondary"
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>${order.amount.toFixed(2)}</TableCell>
              <TableCell className="text-center pr-5">
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
