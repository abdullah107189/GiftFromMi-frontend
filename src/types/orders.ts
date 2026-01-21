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
