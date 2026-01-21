import OrderHistoryHeader from "@/components/Dashboard/Customer/OrderHistory/OrderHistoryHeader";
import ReorderCard from "@/components/Dashboard/Customer/OrderHistory/ReorderCard";
import orderHistoryData from "@/data/mockData";

const OrderHistoryPage = () => {
  return (
    <div>
      <OrderHistoryHeader></OrderHistoryHeader>
      <div className="flex flex-col xl:gap-12 lg:gap-8 md:gap-6 gap-4 shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] rounded-4xl xl:p-10 lg:p-8 md:p-6 p-4">
        {orderHistoryData.map((order) => (
          <ReorderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
