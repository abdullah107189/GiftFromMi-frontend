export interface IOrderHistory {
  orderId: string;
  date: string;
  status: "Delivered" | "Accepted";
  items: {
    id: string;
    title: string;
    category: string;
    image: string;
  }[];
}

export interface CustomerOrderItem {
  id?: number;
  product_title: string;
  image: string;
  category: string;
  quantity?: number;
  total_quantity?: number;
  sell_price?: number;
  estimated_delivery?: string;
}

export type OrderFulfillmentStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled";

export type OrderPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface CustomerOrder {
  id: number;
  order_id: string;
  total: number;
  payment_method: string;
  fulfillment_status: OrderFulfillmentStatus | string;
  payment_status: OrderPaymentStatus | string;
  created_at: string;
  is_bulk: number | boolean;
  recipient_count?: number;
  items: CustomerOrderItem[];
}

export interface CustomerOrdersResponse {
  data: CustomerOrder[];
  message: string;
  status: number;
}
