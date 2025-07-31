"use client"

import React from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Archive, 
  ShoppingBag, 
  TrendingDown,
  Plus,
  ArrowRight,
  BarChart3
} from "lucide-react"
import Link from "next/link"

const productModules = [
  {
    title: "Stock Produk",
    description: "Kelola stok produk dan lihat pergerakan inventory",
    icon: Package,
    href: "/products/stock",
    stats: { total: "456 items", alert: "12 low stock" },
    color: "blue"
  },
  {
    title: "Data Master",
    description: "Manage master data produk dan kategori",
    icon: Archive,
    href: "/products/master",
    stats: { total: "89 categories", alert: "5 new" },
    color: "green"
  },
  {
    title: "Input Operations",
    description: "Input berbagai jenis produk dan barang",
    icon: ShoppingBag,
    href: "/products/input",
    stats: { total: "23 pending", alert: "8 today" },
    color: "orange"
  },
  {
    title: "Clearance Sale",
    description: "Daftar barang clearance dan promotional items",
    icon: TrendingDown,
    href: "/products/clearance",
    stats: { total: "15 items", alert: "3 expiring" },
    color: "red"
  }
]

const quickStats = [
  { label: "Total Products", value: "456", change: "+12", icon: Package },
  { label: "Active Categories", value: "89", change: "+5", icon: Archive },
  { label: "Low Stock Items", value: "12", change: "-3", icon: TrendingDown },
  { label: "Pending Inputs", value: "23", change: "+8", icon: ShoppingBag }
]

export default function ProductsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage products, inventory, and stock operations
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
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

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productModules.map((module, index) => (
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

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Product Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Stock updated",
                  product: "iPhone 14 Pro",
                  details: "Quantity changed from 25 to 30",
                  time: "2 minutes ago",
                  type: "stock"
                },
                {
                  action: "New product added",
                  product: "Samsung Galaxy S24",
                  details: "Added to Electronics category",
                  time: "1 hour ago",
                  type: "product"
                },
                {
                  action: "Low stock alert",
                  product: "MacBook Air M2",
                  details: "Current stock: 3 units (min: 5)",
                  time: "3 hours ago",
                  type: "alert"
                },
                {
                  action: "Category updated",
                  product: "Smartphones",
                  details: "Added new subcategories",
                  time: "1 day ago",
                  type: "category"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-500' :
                    activity.type === 'stock' ? 'bg-blue-500' :
                    activity.type === 'product' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}: <span className="font-normal">{activity.product}</span>
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
