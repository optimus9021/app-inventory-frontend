"use client"

import React from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  ShoppingCart, 
  TrendingDown, 
  Target,
  Calendar,
  Plus,
  ArrowRight,
  Clock,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"

const supplyChainModules = [
  {
    title: "Purchase Orders",
    description: "Kelola semua purchase order dan procurement",
    icon: ShoppingCart,
    href: "/supply-chain/purchase-orders",
    stats: { total: "15 active POs", alert: "3 pending approval" },
    color: "blue"
  },
  {
    title: "Deadstock Management",
    description: "Monitor dan kelola barang deadstock",
    icon: TrendingDown,
    href: "/supply-chain/deadstock",
    stats: { total: "8 deadstock items", alert: "Need action" },
    color: "red"
  },
  {
    title: "Lead Time Tracking",
    description: "Track dan kelola lead time produk",
    icon: Clock,
    href: "/supply-chain/lead-time",
    stats: { total: "Avg 14 days", alert: "2 delayed" },
    color: "yellow"
  },
  {
    title: "Release Schedule",
    description: "Jadwal rilis produk baru",
    icon: Calendar,
    href: "/supply-chain/release-schedule",
    stats: { total: "5 upcoming", alert: "This month" },
    color: "green"
  }
]

const quickStats = [
  { label: "Active Purchase Orders", value: "15", change: "+3", icon: ShoppingCart },
  { label: "Pending Approvals", value: "8", change: "+2", icon: Target },
  { label: "Average Lead Time", value: "14 days", change: "-2", icon: Clock },
  { label: "Supplier Performance", value: "94%", change: "+1.2%", icon: Truck }
]

const recentActivities = [
  {
    id: 1,
    type: "po_created",
    title: "New PO Created",
    description: "PO-001 for Electronics supplier",
    time: "10 minutes ago",
    status: "pending"
  },
  {
    id: 2,
    type: "po_approved",
    title: "PO Approved",
    description: "PO-002 approved by manager",
    time: "1 hour ago",
    status: "approved"
  },
  {
    id: 3,
    type: "delivery_delayed",
    title: "Delivery Delayed",
    description: "Shipment from Supplier A delayed by 2 days",
    time: "3 hours ago",
    status: "warning"
  },
  {
    id: 4,
    type: "deadstock_alert",
    title: "Deadstock Alert",
    description: "Product XYZ showing slow movement",
    time: "1 day ago",
    status: "alert"
  }
]

export default function SupplyChainPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Supply Chain Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage procurement, suppliers, and supply chain operations
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              Supplier Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create PO
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {stat.change} this month
                    </p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Module Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supplyChainModules.map((module, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-${module.color}-100 dark:bg-${module.color}-900/20`}>
                          <module.icon className={`h-6 w-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {module.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {module.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {module.stats.total}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {module.stats.alert}
                        </Badge>
                      </div>
                      
                      <Link href={module.href}>
                        <Button variant="outline" size="sm">
                          Open Module
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Purchase Orders Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { po: "PO-001", supplier: "Electronics Supplier", amount: "Rp 25,000,000", status: "pending", dueDate: "2024-02-15" },
                    { po: "PO-002", supplier: "Office Supplies Co", amount: "Rp 8,500,000", status: "approved", dueDate: "2024-02-20" },
                    { po: "PO-003", supplier: "Tech Components Ltd", amount: "Rp 45,000,000", status: "in_transit", dueDate: "2024-02-25" },
                    { po: "PO-004", supplier: "Manufacturing Parts", amount: "Rp 12,300,000", status: "pending", dueDate: "2024-03-01" }
                  ].map((po, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {po.po} - {po.supplier}
                          </p>
                          <Badge 
                            variant={
                              po.status === 'approved' ? 'success' :
                              po.status === 'in_transit' ? 'info' :
                              'warning'
                            }
                          >
                            {po.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {po.amount}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Due: {po.dueDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Link href="/supply-chain/purchase-orders">
                    <Button variant="outline" size="sm">
                      View All Purchase Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'approved' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Supplier Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Top Suppliers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Electronics Supplier", performance: 98, orders: 12 },
                    { name: "Tech Components Ltd", performance: 95, orders: 8 },
                    { name: "Office Supplies Co", performance: 92, orders: 15 },
                    { name: "Manufacturing Parts", performance: 89, orders: 6 }
                  ].map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {supplier.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {supplier.orders} orders
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {supplier.performance}%
                        </p>
                        <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${supplier.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <Plus className="h-4 w-4 mr-2" />
                    Create Purchase Order
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Truck className="h-4 w-4 mr-2" />
                    Add New Supplier
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Review Deadstock
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Release
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
