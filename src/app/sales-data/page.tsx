"use client"

import React from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3,
  Plus,
  Download,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

const platformModules = [
  {
    title: "TikTok Shop",
    description: "Data penjualan dari platform TikTok Shop",
    icon: ShoppingCart,
    href: "/sales-data/platforms/tiktok",
    stats: { revenue: 45000000, orders: 125, growth: 18.5 },
    color: "pink"
  },
  {
    title: "Shopee",
    description: "Data penjualan dari platform Shopee",
    icon: ShoppingCart,
    href: "/sales-data/platforms/shopee",
    stats: { revenue: 62000000, orders: 198, growth: 12.3 },
    color: "orange"
  },
  {
    title: "Tokopedia",
    description: "Data penjualan dari platform Tokopedia",
    icon: ShoppingCart,
    href: "/sales-data/platforms/tokopedia",
    stats: { revenue: 38000000, orders: 89, growth: -2.1 },
    color: "green"
  },
  {
    title: "Sales Analytics",
    description: "Analisis mendalam data penjualan semua platform",
    icon: BarChart3,
    href: "/sales-data/analytics",
    stats: { revenue: 145000000, orders: 412, growth: 15.2 },
    color: "blue"
  }
]

const salesOverview = [
  { label: "Total Revenue", value: 145000000, change: 15.2, icon: DollarSign, type: "currency" },
  { label: "Total Orders", value: 412, change: 12.8, icon: ShoppingCart, type: "number" },
  { label: "Average Order Value", value: 352000, change: 8.5, icon: TrendingUp, type: "currency" },
  { label: "Conversion Rate", value: 3.2, change: -0.5, icon: BarChart3, type: "percentage" }
]

const topProducts = [
  { name: "iPhone 14 Pro", platform: "Shopee", sales: 45, revenue: 675000000 },
  { name: "Samsung Galaxy S23", platform: "TikTok", sales: 38, revenue: 494000000 },
  { name: "MacBook Air M2", platform: "Tokopedia", sales: 22, revenue: 418000000 },
  { name: "iPad Air", platform: "Shopee", sales: 33, revenue: 297000000 },
  { name: "AirPods Pro", platform: "TikTok", sales: 67, revenue: 201000000 }
]

const recentSales = [
  {
    id: "ORD-001",
    platform: "TikTok",
    product: "iPhone 14 Pro",
    customer: "John Doe",
    amount: 15999000,
    status: "completed",
    time: "5 minutes ago"
  },
  {
    id: "ORD-002", 
    platform: "Shopee",
    product: "Samsung Galaxy S23",
    customer: "Jane Smith",
    amount: 12999000,
    status: "pending",
    time: "15 minutes ago"
  },
  {
    id: "ORD-003",
    platform: "Tokopedia",
    product: "MacBook Air M2",
    customer: "Bob Johnson",
    amount: 18999000,
    status: "shipped",
    time: "1 hour ago"
  },
  {
    id: "ORD-004",
    platform: "TikTok",
    product: "AirPods Pro",
    customer: "Alice Brown",
    amount: 3999000,
    status: "cancelled",
    time: "2 hours ago"
  }
]

export default function SalesDataPage() {
  const formatValue = (value: number, type: string) => {
    switch (type) {
      case "currency":
        return formatCurrency(value)
      case "percentage":
        return `${value}%`
      default:
        return value.toLocaleString()
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sales Data Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor sales performance across all platforms
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Sale
            </Button>
          </div>
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesOverview.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatValue(stat.value, stat.type)}
                    </p>
                    <p className={`text-sm flex items-center mt-1 ${
                      stat.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(stat.change)}% this month
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Modules */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platformModules.map((platform, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-${platform.color}-100 dark:bg-${platform.color}-900/20`}>
                            <platform.icon className={`h-5 w-5 text-${platform.color}-600 dark:text-${platform.color}-400`} />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {platform.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {platform.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <span className="text-sm font-medium">{formatCurrency(platform.stats.revenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Orders</span>
                          <span className="text-sm font-medium">{platform.stats.orders}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Growth</span>
                          <Badge variant={platform.stats.growth > 0 ? "success" : "destructive"}>
                            {platform.stats.growth > 0 ? "+" : ""}{platform.stats.growth}%
                          </Badge>
                        </div>
                      </div>
                      
                      <Link href={platform.href} className="block mt-3">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <Badge variant="secondary">{product.platform}</Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.sales} units sold
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            {formatCurrency(product.revenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {sale.id}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {sale.product} • {sale.platform}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {sale.customer}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(sale.amount)}
                          </p>
                          <Badge 
                            variant={
                              sale.status === 'completed' ? 'success' :
                              sale.status === 'shipped' ? 'info' :
                              sale.status === 'cancelled' ? 'destructive' :
                              'warning'
                            }
                            className="text-xs"
                          >
                            {sale.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {sale.time}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Link href="/sales-data/sales">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Platform Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Shopee</span>
                      <span className="text-sm text-gray-600">42.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "42.8%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">TikTok</span>
                      <span className="text-sm text-gray-600">31.0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: "31.0%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Tokopedia</span>
                      <span className="text-sm text-gray-600">26.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "26.2%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Sales Data
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Sales Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
