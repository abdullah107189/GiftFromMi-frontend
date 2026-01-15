import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/Dashboard/Seller/Dashboard/StatCard";
import QuickActionCard from "@/components/Dashboard/Seller/Dashboard/QuickActionCard";
import OrderTable from "@/components/Dashboard/Seller/Dashboard/OrderTable";
import UpcomingGiftItem from "@/components/Dashboard/Seller/Dashboard/UpcomingGiftItem";
import Chart from "@/components/Dashboard/Seller/Dashboard/Chart";
import {
  orders,
  upcomingGifts,
  quickActions,
  chartData,
  statCardsData,
} from "@/data/mockData";
import { DashboardHeader } from "@/components/Dashboard/Seller/Dashboard/DashboardHeader";

export default function SellerDashboardPage() {
  return (
    <div className=" xl:p-6 p-4">
      <div>
        {/* Header */}
        <DashboardHeader></DashboardHeader>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCardsData.map((stat, index) => (
            <StatCard key={index} data={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 m-auto">
          {/* Chart Section */}
          <div className="lg:col-span-7">
            <Chart data={chartData} />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-5 border border-gray-200 xl:p-6 p-4 rounded-2xl">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-sm text-gray-700">
                Complete tasks in your fingertips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} action={action} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="shadow-none border border-gray-200 rounded-2xl md:p-6 p-4 ">
              <CardHeader className="p-0">
                <p>Recent Orders</p>
                <p className="text-sm text-gray-700">
                  Track your latest gift orders
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <OrderTable orders={orders} />
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Gifts */}

          <Card className="shadow-none">
            <CardHeader className="flex items-center justify-between ">
              <div>
                <CardTitle>Upcoming Gifts</CardTitle>
                <p className="text-sm text-gray-500 mt-4">
                  Scheduled deliveries
                </p>
              </div>
              <button className="text-primary text-sm cursor-pointer">
                View Calender
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcomingGifts.map((gift, index) => (
                  <UpcomingGiftItem key={index} gift={gift} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
