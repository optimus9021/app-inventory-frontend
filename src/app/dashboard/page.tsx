"use client"

import React from "react"
import { Layout } from "@/components/layout/Layout"
import { StatsCard } from "@/components/common/StatsCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3
} from "lucide-react"

// Mock data - akan diganti dengan data real dari API
const dashboardStats = {
  totalRevenue: 1250000000,
  totalOrders: 1250,
  totalProducts: 450,
  lowStockAlerts: 12,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  productsGrowth: 5.2,
  alertsGrowth: -15.2
}

const recentActivities = [
  {
    id: 1,
    type: "order",
    message: "New order #INV-001 from TikTok Shop",
    time: "2 minutes ago",
    amount: 150000
  },
  {
    id: 2,
    type: "stock",
    message: "Low stock alert for Product A",
    time: "10 minutes ago",
    level: "warning"
  },
  {
    id: 3,
    type: "production",
    message: "Production batch PB-123 completed",
    time: "1 hour ago",
    quantity: 100
  },
  {
    id: 4,
    type: "order",
    message: "Order #INV-002 shipped to customer",
    time: "2 hours ago",
    amount: 250000
  }
]

const topProducts = [
  { name: "Product A", sales: 150, revenue: 15000000, growth: 12.5 },
  { name: "Product B", sales: 125, revenue: 12500000, growth: 8.3 },
  { name: "Product C", sales: 98, revenue: 9800000, growth: -2.1 },
  { name: "Product D", sales: 87, revenue: 8700000, growth: 15.2 },
  { name: "Product E", sales: 76, revenue: 7600000, growth: 5.8 }
]

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your inventory.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={dashboardStats.totalRevenue}
            type="currency"
            change={dashboardStats.revenueGrowth}
            changeType="increase"
            icon={DollarSign}
            description="Total revenue this month"
          />
          
          <StatsCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            type="number"
            change={dashboardStats.ordersGrowth}
            changeType="increase"
            icon={ShoppingCart}
            description="Orders processed this month"
          />
          
          <StatsCard
            title="Total Products"
            value={dashboardStats.totalProducts}
            type="number"
            change={dashboardStats.productsGrowth}
            changeType="increase"
            icon={Package}
            description="Active products in inventory"
          />
          
          <StatsCard
            title="Low Stock Alerts"
            value={dashboardStats.lowStockAlerts}
            type="number"
            change={Math.abs(dashboardStats.alertsGrowth)}
            changeType="decrease"
            icon={AlertTriangle}
            description="Products below minimum stock"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="sales" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sales">Sales Trend</TabsTrigger>
                <TabsTrigger value="products">Top Products</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Sales Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        Sales Chart Component
                        <br />
                        <small>Chart will be implemented with Recharts</small>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Top Selling Products</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.sales} units sold
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">
                              Rp {(product.revenue / 1000000).toFixed(1)}M
                            </p>
                            <p className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {product.growth > 0 ? '+' : ''}{product.growth}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="platforms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Platform Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-gray-500 dark:text-gray-400">
                        Platform Chart Component
                        <br />
                        <small>TikTok, Shopee, Tokopedia performance</small>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <p className="font-medium text-blue-900 dark:text-blue-300">
                      Add New Product
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Create a new product entry
                    </p>
                  </button>
                  
                  <button className="w-full p-3 text-left bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                    <p className="font-medium text-green-900 dark:text-green-300">
                      Create Purchase Order
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Generate new PO for suppliers
                    </p>
                  </button>
                  
                  <button className="w-full p-3 text-left bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors">
                    <p className="font-medium text-yellow-900 dark:text-yellow-300">
                      Stock Adjustment
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      Adjust inventory levels
                    </p>
                  </button>
                  
                  <button className="w-full p-3 text-left bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                    <p className="font-medium text-purple-900 dark:text-purple-300">
                      Generate Report
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400">
                      Create inventory reports
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
