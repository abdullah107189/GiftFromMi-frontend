// data/mockData.ts
import type {
  StatCard,
  Order,
  UpcomingGift,
  QuickAction,
  ChartData,
} from "@/types/dashboard";

export const statCards: StatCard[] = [
  {
    title: "Total Orders",
    value: "1,284",
    change: "+12%",
    description: "from last month",
  },
  {
    title: "Scheduled Gifts",
    value: "47",
    change: "Next: Dec 25",
    description: "",
  },
  {
    title: "Pending Shipment",
    value: "8",
    change: "gifts pending shipment",
    description: "",
  },
  {
    title: "Monthly Revenue",
    value: "$16,540",
    change: "+22%",
    description: "from last month",
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
  },
  {
    recipient: "Robert Smith",
    gift: "Holiday Hamper",
    date: "Dec 26, 2024",
  },
  {
    recipient: "Jennifer Brown",
    gift: "Anniversary Bundle",
    date: "Dec 28, 2024",
  },
  {
    recipient: "David Lee",
    gift: "Welcome Kit",
    date: "Dec 29, 2024",
  },
];

export const quickActions: QuickAction[] = [
  {
    title: "Create Order",
    description: "Send a gift to someone",
  },
  {
    title: "Bulk Upload",
    description: "Import recipients via CSV",
  },
  {
    title: "Add Recipients",
    description: "Manage your contacts",
  },
  {
    title: "New Campaign",
    description: "Set up automated gifting",
  },
];

export const chartData: ChartData = {
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  orders: [
    4000, 3000, 5000, 8000, 7000, 9000, 12000, 11000, 13000, 14000, 15000,
    16540,
  ],
  revenue: [
    3000, 4000, 6000, 7000, 8000, 10000, 11000, 12000, 13000, 14000, 15500,
    16540,
  ],
};
