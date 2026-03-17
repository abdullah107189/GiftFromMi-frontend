import type { OrderInvoice } from "@/types/orders";

type InvoiceProps = {
  invoice: OrderInvoice;
};

const Invoice = ({ invoice }: InvoiceProps) => {
  const order = invoice;

  const formatMoney = (amount: number | string) => Number(amount).toFixed(2);
  const groupedItems = order.items.reduce<
    Array<{
      key: string;
      id: number;
      product_title: string;
      sku: string;
      sell_price: number;
      quantity: number;
      imageUrl: string;
      color: string;
      deliveryLabels: string[];
    }>
  >((acc, item) => {
    const imageUrl = item.product?.imageUrl || "/fallback.png";
    const color = item.product?.color || "";
    const deliveryLabel = item.estimated_delivery || "Not available";
    const key = [
      item.product_title,
      item.sku,
      item.sell_price,
      color,
    ].join("__");

    const existing = acc.find((entry) => entry.key === key);

    if (existing) {
      existing.quantity += item.quantity;
      if (!existing.deliveryLabels.includes(deliveryLabel)) {
        existing.deliveryLabels.push(deliveryLabel);
      }
      return acc;
    }

    acc.push({
      key,
      id: item.id,
      product_title: item.product_title,
      sku: item.sku,
      sell_price: item.sell_price,
      quantity: item.quantity,
      imageUrl,
      color,
      deliveryLabels: [deliveryLabel],
    });

    return acc;
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Invoice</h1>
          <p className="text-sm text-gray-500 font-semibold">GiftFromMi</p>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="text-gray-400">Order UUID</p>
            <p className="font-medium">{order.order_uuid}</p>
          </div>

          <div>
            <p className="text-gray-400">Payment</p>
            <p className="font-medium uppercase">{order.payment_status}</p>
          </div>

          <div>
            <p className="text-gray-400">Fulfillment</p>
            <p className="font-medium">{order.fulfillment_status}</p>
          </div>

          <div>
            <p className="text-gray-400">Order Type</p>
            <p className="font-medium">
              {order.is_bulk ? "Bulk Order" : "Single Order"}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="mt-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-left border-b">
                <th className="pb-2">Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Delivery</th>
              </tr>
            </thead>

            <tbody>
              {groupedItems.map((item) => (
                <tr key={item.key} className="border-b last:border-none">
                  <td className="py-4 flex gap-3 items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.product_title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product_title}</p>
                      <p className="text-xs text-gray-400">
                        {item.sku}
                        {item.color ? ` • ${item.color}` : ""}
                      </p>
                    </div>
                  </td>

                  <td>{item.quantity}</td>

                  <td>${formatMoney(item.sell_price)}</td>

                  <td>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.deliveryLabels.join(", ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-56 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${formatMoney(order.subtotal)}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${formatMoney(order.shipping_cost)}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${formatMoney(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-10">
          Thank you for your purchase.
        </div>
      </div>
    </div>
  );
};

export default Invoice;
