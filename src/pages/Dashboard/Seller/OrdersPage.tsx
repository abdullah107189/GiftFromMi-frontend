import OrdersFilterBar from "@/components/Dashboard/Seller/Orders/OrdersFilterBar";
import OrdersHeader from "@/components/Dashboard/Seller/Orders/OrdersHeader";

function OrdersPage() {
  return (
    <div>
      <OrdersHeader></OrdersHeader>
      <OrdersFilterBar></OrdersFilterBar>
    </div>
  );
}

export default OrdersPage;
