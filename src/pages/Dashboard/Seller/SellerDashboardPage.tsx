import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/Dashboard/Seller/Dashboard/StatCard";
import QuickActionCard from "@/components/Dashboard/Seller/Dashboard/QuickActionCard";
import OrderTable from "@/components/Dashboard/Seller/Dashboard/OrderTable";
import UpcomingGiftItem from "@/components/Dashboard/Seller/Dashboard/UpcomingGiftItem";
import Chart from "@/components/Dashboard/Seller/Dashboard/Chart";
import {
  statCards,
  orders,
  upcomingGifts,
  quickActions,
  chartData,
} from "@/data/mockData";
import { DashboardHeader } from "@/components/Dashboard/Seller/Dashboard/DashboardHeader";

export default function SellerDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div>
        {/* Header */}
        <DashboardHeader></DashboardHeader>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <StatCard key={index} data={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <Chart data={chartData} />
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <p className="text-sm text-gray-500">
                  Complete tasks in your fingertips
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <QuickActionCard key={index} action={action} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <p className="text-sm text-gray-500">
                  Track your latest gift orders
                </p>
              </CardHeader>
              <CardContent>
                <OrderTable orders={orders} />
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Gifts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Gifts</CardTitle>
                <p className="text-sm text-gray-500">Scheduled deliveries</p>
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
    </div>
  );
}
