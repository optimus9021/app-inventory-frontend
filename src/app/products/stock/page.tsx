"use client"

import React, { useState } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Download, 
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data
const stockData = [
  {
    id: 1,
    sku: "PRD-001",
    name: "iPhone 14 Pro",
    category: "Electronics",
    currentStock: 25,
    minStock: 10,
    maxStock: 100,
    unitPrice: 15999000,
    totalValue: 399975000,
    lastUpdated: "2024-01-20",
    status: "in_stock"
  },
  {
    id: 2,
    sku: "PRD-002", 
    name: "Samsung Galaxy S23",
    category: "Electronics",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unitPrice: 12999000,
    totalValue: 103992000,
    lastUpdated: "2024-01-19",
    status: "low_stock"
  },
  {
    id: 3,
    sku: "PRD-003",
    name: "MacBook Air M2",
    category: "Computers",
    currentStock: 0,
    minStock: 5,
    maxStock: 30,
    unitPrice: 18999000,
    totalValue: 0,
    lastUpdated: "2024-01-18",
    status: "out_of_stock"
  },
  {
    id: 4,
    sku: "PRD-004",
    name: "Dell XPS 13",
    category: "Computers", 
    currentStock: 45,
    minStock: 10,
    maxStock: 60,
    unitPrice: 16999000,
    totalValue: 764955000,
    lastUpdated: "2024-01-20",
    status: "in_stock"
  }
]

const getStatusBadge = (status: string, currentStock: number, minStock: number) => {
  if (currentStock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>
  } else if (currentStock <= minStock) {
    return <Badge variant="warning">Low Stock</Badge>
  } else {
    return <Badge variant="success">In Stock</Badge>
  }
}

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "in_stock" && item.currentStock > item.minStock) ||
                         (filterStatus === "low_stock" && item.currentStock <= item.minStock && item.currentStock > 0) ||
                         (filterStatus === "out_of_stock" && item.currentStock === 0)
    
    return matchesSearch && matchesFilter
  })

  const totalStockValue = stockData.reduce((sum, item) => sum + item.totalValue, 0)
  const lowStockItems = stockData.filter(item => item.currentStock <= item.minStock && item.currentStock > 0).length
  const outOfStockItems = stockData.filter(item => item.currentStock === 0).length

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Stock Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor and manage product inventory levels
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Stock Adjustment
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Stock Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(totalStockValue)}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stockData.length}
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% this month
                  </p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Low Stock Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {lowStockItems}
                  </p>
                  <p className="text-sm text-yellow-600">
                    Need attention
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {outOfStockItems}
                  </p>
                  <p className="text-sm text-red-600 flex items-center mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Critical
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min/Max</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Updated: {item.lastUpdated}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.sku}
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        item.currentStock === 0 ? 'text-red-600' :
                        item.currentStock <= item.minStock ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {item.minStock} / {item.maxStock}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell>{formatCurrency(item.totalValue)}</TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.currentStock, item.minStock)}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No products found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
