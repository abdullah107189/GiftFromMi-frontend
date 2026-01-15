import { useState } from "react";
import OrdersFilterBar from "@/components/Dashboard/Seller/Orders/OrdersFilterBar";
import OrdersHeader from "@/components/Dashboard/Seller/Orders/OrdersHeader";
import OrderTable from "@/components/Dashboard/Seller/Orders/OrderTable";
import { orders } from "@/data/mockData";
import Pagination from "@/components/Dashboard/Seller/Orders/Pagination";

function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-4">
      <OrdersHeader />
      <OrdersFilterBar />

      <OrderTable orders={currentOrders} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default OrdersPage;
