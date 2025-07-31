"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { FormModal } from "@/components/ui/form-modal"
import { DetailViewModal } from "@/components/ui/detail-view-modal"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { useToast } from "@/components/ui/toast"
import { 
  Package, 
  Archive, 
  ShoppingBag, 
  TrendingDown,
  Plus,
  ArrowRight,
  BarChart3,
  Search,
  Filter,
  MoreHorizontal,
  Settings,
  Eye,
  AlertTriangle,
  TrendingUp,
  Activity,
  Download,
  RefreshCw
} from "lucide-react"
import Link from "next/link"

const productModules = [
  {
    title: "Stock Produk",
    description: "Kelola stok produk dan lihat pergerakan inventory real-time",
    icon: Package,
    href: "/products/stock",
    stats: { total: "456 items", alert: "12 low stock", status: "active" },
    color: "blue",
    features: ["Real-time tracking", "Low stock alerts", "Batch operations"]
  },
  {
    title: "Data Master",
    description: "Manage master data produk, kategori, dan supplier",
    icon: Archive,
    href: "/products/master",
    stats: { total: "89 categories", alert: "5 new", status: "active" },
    color: "green",
    features: ["Category management", "Product attributes", "Bulk import/export"]
  },
  {
    title: "Input Operations",
    description: "Input berbagai jenis produk dan pengelolaan inbound",
    icon: ShoppingBag,
    href: "/products/input",
    stats: { total: "23 pending", alert: "8 today", status: "warning" },
    color: "orange", 
    features: ["Batch input", "QR scanning", "Validation rules"]
  },
  {
    title: "Clearance Sale",
    description: "Daftar barang clearance dan promotional management",
    icon: TrendingDown,
    href: "/products/clearance",
    stats: { total: "15 items", alert: "3 expiring", status: "critical" },
    color: "red",
    features: ["Price automation", "Expiry tracking", "Promotion rules"]
  }
]

const quickStats = [
  { 
    label: "Total Products", 
    value: "456", 
    change: "+12", 
    changePercent: "+2.7%",
    icon: Package, 
    color: "blue",
    trend: "up" 
  },
  { 
    label: "Active Categories", 
    value: "89", 
    change: "+5", 
    changePercent: "+5.9%",
    icon: Archive, 
    color: "green",
    trend: "up" 
  },
  { 
    label: "Low Stock Items", 
    value: "12", 
    change: "-3", 
    changePercent: "-20%",
    icon: AlertTriangle, 
    color: "red",
    trend: "down" 
  },
  { 
    label: "Pending Inputs", 
    value: "23", 
    change: "+8", 
    changePercent: "+53%",
    icon: ShoppingBag, 
    color: "orange",
    trend: "up" 
  }
]

const recentActivities = [
  {
    id: 1,
    action: "Stock updated",
    product: "iPhone 14 Pro",
    details: "Quantity changed from 25 to 30",
    time: "2 minutes ago",
    type: "stock",
    user: "John Doe",
    change: "+5"
  },
  {
    id: 2,
    action: "New product added",
    product: "Samsung Galaxy S24",
    details: "Added to Electronics category",
    time: "1 hour ago",
    type: "product",
    user: "Jane Smith",
    change: "+1"
  },
  {
    id: 3,
    action: "Low stock alert",
    product: "MacBook Air M2",
    details: "Current stock: 3 units (min: 5)",
    time: "3 hours ago",
    type: "alert",
    user: "System",
    change: "Alert"
  },
  {
    id: 4,
    action: "Bulk import completed",
    product: "Electronics Category",
    details: "Successfully imported 45 new products",
    time: "5 hours ago",
    type: "import",
    user: "Mike Johnson",
    change: "+45"
  },
  {
    id: 5,
    action: "Category updated",
    product: "Smartphones",
    details: "Added new subcategories and attributes",
    time: "1 day ago",
    type: "category",
    user: "Sarah Wilson",
    change: "Updated"
  }
]

export default function ProductsPage() {
  const { addToast } = useToast()
  const [addProductModal, setAddProductModal] = React.useState(false)
  const [selectedModule, setSelectedModule] = React.useState<typeof productModules[0] | null>(null)
  const [selectedActivity, setSelectedActivity] = React.useState<typeof recentActivities[0] | null>(null)
  const [confirmDialog, setConfirmDialog] = React.useState<{
    open: boolean
    title: string
    description: string
    action: () => void
  }>({
    open: false,
    title: "",
    description: "",
    action: () => {}
  })
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  // Handle add product
  const handleAddProduct = async (data: Record<string, FormDataEntryValue>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    addToast({
      title: "Product Added Successfully",
      description: `${data.name} has been added to inventory`,
      variant: "success"
    })
    
    setAddProductModal(false)
  }

  // Handle refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    
    addToast({
      title: "Data Refreshed",
      description: "All product data has been updated",
      variant: "success"
    })
  }

  // Handle bulk export
  const handleExport = () => {
    setConfirmDialog({
      open: true,
      title: "Export Product Data",
      description: "This will export all product data to Excel format. Continue?",
      action: () => {
        addToast({
          title: "Export Started",
          description: "Your export will be ready for download shortly",
          variant: "success"
        })
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Package className="h-8 w-8 text-blue-600" />
            Product Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
            Comprehensive product management system with real-time inventory tracking, 
            advanced analytics, and automated workflows
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-9 w-64"
            />
          </div>
          
          <Button variant="outline" size="default" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Button variant="outline" onClick={handleExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button onClick={() => setAddProductModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">({stat.changePercent})</span>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        {/* Modules View */}
        <TabsContent value="modules" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {productModules.map((module, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-500"
                onClick={() => setSelectedModule(module)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-${module.color}-100 dark:bg-${module.color}-900/20 group-hover:scale-105 transition-transform`}>
                        <module.icon className={`h-6 w-6 text-${module.color}-600 dark:text-${module.color}-400`} />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          {module.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {module.description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {module.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {module.stats.total}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          module.stats.status === 'active' ? 'bg-green-500' :
                          module.stats.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                      </div>
                      <Badge 
                        variant={module.stats.status === 'critical' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {module.stats.alert}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedModule(module)
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Link href={module.href}>
                        <Button size="sm">
                          Open
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics View */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Product Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Advanced analytics dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Performance tracking dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activities View */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Product Activities
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                      activity.type === 'alert' ? 'bg-red-500' :
                      activity.type === 'stock' ? 'bg-blue-500' :
                      activity.type === 'product' ? 'bg-green-500' :
                      activity.type === 'import' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {activity.action}: <span className="font-normal">{activity.product}</span>
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {activity.change}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.details}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        by {activity.user}
                      </p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedActivity(activity)
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Product Modal */}
      <FormModal
        isOpen={addProductModal}
        onClose={() => setAddProductModal(false)}
        title="Add New Product"
        description="Create a new product entry in your inventory system"
        onSubmit={handleAddProduct}
        submitText="Create Product"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Name *
            </label>
            <Input
              name="name"
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <select 
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price *
              </label>
              <Input
                name="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Stock *
              </label>
              <Input
                name="stock"
                type="number"
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Product description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </FormModal>

      {/* Module Detail Modal */}
      <DetailViewModal
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        title={selectedModule?.title || ""}
        sections={selectedModule ? [
          {
            title: "Module Information",
            items: [
              { label: "Description", value: selectedModule.description },
              { label: "Status", value: selectedModule.stats.status },
              { label: "Total Items", value: selectedModule.stats.total },
              { label: "Alert Info", value: selectedModule.stats.alert },
              { label: "Features", value: selectedModule.features.join(", ") }
            ]
          }
        ] : []}
        actions={
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={() => {
                if (selectedModule) {
                  window.location.href = selectedModule.href
                }
              }}
            >
              Open Module
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                addToast({
                  title: "Configuration",
                  description: "Module configuration options coming soon",
                  variant: "default"
                })
              }}
            >
              Configure
            </Button>
          </div>
        }
      />

      {/* Activity Detail Modal */}
      <DetailViewModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        title={`Activity: ${selectedActivity?.action || ""}`}
        sections={selectedActivity ? [
          {
            title: "Activity Details",
            items: [
              { label: "Product", value: selectedActivity.product },
              { label: "Action", value: selectedActivity.action },
              { label: "Details", value: selectedActivity.details },
              { label: "User", value: selectedActivity.user },
              { label: "Time", value: selectedActivity.time },
              { label: "Type", value: selectedActivity.type },
              { label: "Change", value: selectedActivity.change }
            ]
          }
        ] : []}
        actions={
          <Button
            variant="default"
            onClick={() => {
              addToast({
                title: "Redirecting",
                description: "Opening product details...",
                variant: "default"
              })
            }}
          >
            View Product
          </Button>
        }
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog(prev => ({ ...prev, open: false }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onConfirm={() => {
          confirmDialog.action()
          setConfirmDialog(prev => ({ ...prev, open: false }))
        }}
        confirmText="Continue"
        cancelText="Cancel"
      />
    </div>
  )
}
