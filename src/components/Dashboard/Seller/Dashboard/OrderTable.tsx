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
import { useState } from "react";

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
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "High to Low Payment", value: "price_high" },
    { label: "Low to High Payment", value: "price_low" },
    { label: "Delivered Only", value: "delivered" },
    { label: "Pending Only", value: "pending" },
  ];
  const [currentFilter, setCurrentFilter] = useState("all");
  return (
    <div className="border-b">
      <Table className="">
        <TableHeader>
          <TableRow className="text-gray-700 font-medium">
            <TableHead>Order ID</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Gift</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-12 hover:bg-none">
          {orders.map((order) => (
            <TableRow key={order.id}>
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
                <button className="p-1 hover:bg-primary-100 rounded">
                  <SharedDropdown
                    options={actionOptions}
                    onValueChange={(val) => console.log(val)}
                    triggerIcon={
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    }
                    className="w-auto border-none bg-transparent"
                  />
                  <SharedDropdown
                    options={filterOptions}
                    selectedValue={currentFilter} // এখন আর এরর আসবে না
                    onValueChange={(val) => {
                      setCurrentFilter(val); // ক্লিক করলে স্টেট আপডেট হবে
                      console.log("Selected Value:", val);
                    }}
                  />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
