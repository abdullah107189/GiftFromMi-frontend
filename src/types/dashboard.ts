import type { LucideIcon } from "lucide-react";

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
  id: string;
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  iconName: LucideIcon;
  variant: "purple" | "green" | "cyan" | "orange";
}

export interface UpcomingGift {
  recipient: string;
  gift: string;
  date: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  variant?: "highlight" | "default";
}
export interface ChartDataItem {
  month: string;
  orders: number;
  revenue: number;
}
