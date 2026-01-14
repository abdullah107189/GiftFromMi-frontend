// types/index.ts
export interface Order {
  id: string;
  recipient: string;
  gift: string;
  date: string;
  status: "delivered" | "in-transit" | "scheduled" | "pending";
  amount: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  description?: string;
}

export interface UpcomingGift {
  recipient: string;
  gift: string;
  date: string;
}

export interface QuickAction {
  title: string;
  description: string;
}

export interface ChartData {
  months: string[];
  orders: number[];
  revenue: number[];
}
