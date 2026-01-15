// data/mockData.ts
import type {
  StatCard,
  Order,
  UpcomingGift,
  QuickAction,
  ChartDataItem,
} from "@/types/dashboard";
export type ChartDataArray = ChartDataItem[];
import { Plus, Upload, UserPlus, Megaphone } from "lucide-react";
import { Calendar, Clock, ShoppingCart, TrendingUp } from "lucide-react";
export const statCardsData: StatCard[] = [
  {
    id: "1",
    title: "Total Orders",
    value: "1,284",
    change: "+12%",
    trend: "up",
    description: "from last month",
    iconName: ShoppingCart,
    variant: "purple",
  },
  {
    id: "2",
    title: "Scheduled Gifts",
    value: "47",
    description: "Next: Dec 25",
    iconName: Calendar,
    variant: "green",
  },
  {
    id: "3",
    title: "Pending Shipment",
    value: "8",
    description: "gifts pending shipment",
    iconName: Clock,
    variant: "cyan",
  },
  {
    id: "4",
    title: "Monthly Revenue",
    value: "$16,540",
    change: "+22%",
    trend: "up",
    description: "from last month",
    iconName: TrendingUp,
    variant: "orange",
  },
];

export const orders: Order[] = [
  {
    id: "GF-2024-001",
    recipient: "Sarah Johnson",
    gift: "Premium Gift Box",
    date: "Dec 20, 2024",
    status: "delivered",
    amount: 89.0,
  },
  {
    id: "GF-2024-002",
    recipient: "Mike Chen",
    gift: "Holiday Hamper",
    date: "Dec 19, 2024",
    status: "in-transit",
    amount: 125.0,
  },
  {
    id: "GF-2024-003",
    recipient: "Emily Davis",
    gift: "Thank You Bundle",
    date: "Dec 18, 2024",
    status: "scheduled",
    amount: 65.0,
  },
  {
    id: "GF-2024-004",
    recipient: "James Wilson",
    gift: "Corporate Welcome Kit",
    date: "Dec 16, 2024",
    status: "pending",
    amount: 150.0,
  },
  {
    id: "GF-2024-005",
    recipient: "Lisa Anderson",
    gift: "Birthday Celebration",
    date: "Dec 17, 2024",
    status: "delivered",
    amount: 95.0,
  },
  {
    id: "GF-2024-006",
    recipient: "Lisa Anderson",
    gift: "Birthday Celebration",
    date: "Dec 17, 2024",
    status: "delivered",
    amount: 95.0,
  },
];

export const upcomingGifts: UpcomingGift[] = [
  {
    recipient: "Emma Thompson",
    gift: "Birthday Gift Box",
    date: "Dec 26, 2024",
    duration: "3 days",
  },
  {
    recipient: "Robert Smith",
    gift: "Holiday Hamper",
    date: "Dec 26, 2024",
    duration: "3 days",
  },
  {
    recipient: "Jennifer Brown",
    gift: "Anniversary Bundle",
    date: "Dec 28, 2024",
    duration: "3 days",
  },
  {
    recipient: "David Lee",
    gift: "Welcome Kit",
    date: "Dec 29, 2024",
    duration: "3 days",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "Create Order",
    description: "Send a gift to someone",
    icon: Plus,
    variant: "highlight",
  },
  {
    title: "Bulk Upload",
    description: "Import recipients via CSV",
    icon: Upload,
  },
  {
    title: "Add Recipients",
    description: "Manage your contacts",
    icon: UserPlus,
  },
  {
    title: "New Campaign",
    description: "Set up automated gifting",
    icon: Megaphone,
  },
];

export const chartData: ChartDataArray = [
  { month: "Jan", orders: 1200, revenue: 5000 },
  { month: "Feb", orders: 1500, revenue: 5800 },
  { month: "Mar", orders: 1100, revenue: 5500 },
  { month: "Apr", orders: 1800, revenue: 6500 },
  { month: "May", orders: 2000, revenue: 7200 },
  { month: "Jun", orders: 2200, revenue: 7800 },
  { month: "Jul", orders: 2500, revenue: 8500 },
  { month: "Aug", orders: 2300, revenue: 9500 },
  { month: "Sep", orders: 2800, revenue: 11000 },
  { month: "Oct", orders: 3200, revenue: 12500 },
  { month: "Nov", orders: 3500, revenue: 14000 },
  { month: "Dec", orders: 4000, revenue: 16000 },
];
