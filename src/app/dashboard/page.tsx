"use client"

import React from "react"
import { StatsCard } from "@/components/common/StatsCard"
import { useRealtimeData } from "@/hooks/useRealtimeData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FormModal } from "@/components/ui/form-modal"
import { DetailViewModal } from "@/components/ui/detail-view-modal"
import { useToast } from "@/components/ui/toast"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  BarChart3,
  Plus,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Filter,
  ChevronRight,
  Activity,
  Zap,
  FileText,
  ShoppingBag
} from "lucide-react"

const topProducts = [
  { 
    id: 1,
    name: "Product A", 
    sales: 150, 
    revenue: 15000000, 
    growth: 12.5,
    category: "Electronics",
    sku: "PRD-001",
    stock: 45
  },
  { 
    id: 2,
    name: "Product B", 
    sales: 125, 
    revenue: 12500000, 
    growth: 8.3,
    category: "Fashion",
    sku: "PRD-002",
    stock: 32
  },
  { 
    id: 3,
    name: "Product C", 
    sales: 98, 
    revenue: 9800000, 
    growth: -2.1,
    category: "Home & Garden",
    sku: "PRD-003",
    stock: 18
  },
  { 
    id: 4,
    name: "Product D", 
    sales: 87, 
    revenue: 8700000, 
    growth: 15.2,
    category: "Electronics",
    sku: "PRD-004",
    stock: 67
  },
  { 
    id: 5,
    name: "Product E", 
    sales: 76, 
    revenue: 7600000, 
    growth: 5.8,
    category: "Sports",
    sku: "PRD-005",
    stock: 23
  }
]

const quickActions = [
  {
    id: 'add-product',
    title: 'Add New Product',
    description: 'Create a new product entry',
    icon: Plus,
    color: 'blue',
    action: 'modal'
  },
  {
    id: 'create-po',
    title: 'Create Purchase Order',
    description: 'Generate new PO for suppliers',
    icon: ShoppingBag,
    color: 'green',
    action: 'modal'
  },
  {
    id: 'stock-adjustment',
    title: 'Stock Adjustment',
    description: 'Adjust inventory levels',
    icon: Package,
    color: 'yellow',
    action: 'modal'
  },
  {
    id: 'generate-report',
    title: 'Generate Report',
    description: 'Create inventory reports',
    icon: FileText,
    color: 'purple',
    action: 'modal'
  }
]

export default function DashboardPage() {
  const { stats, activities } = useRealtimeData()
  const { addToast } = useToast()
  
  // Modal states
  const [selectedProduct, setSelectedProduct] = React.useState<typeof topProducts[0] | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = React.useState(false)
  const [isCreatePOModalOpen, setIsCreatePOModalOpen] = React.useState(false)
  const [isStockAdjustmentModalOpen, setIsStockAdjustmentModalOpen] = React.useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleProductClick = (product: typeof topProducts[0]) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'add-product':
        setIsAddProductModalOpen(true)
        break
      case 'create-po':
        setIsCreatePOModalOpen(true)
        break
      case 'stock-adjustment':
        setIsStockAdjustmentModalOpen(true)
        break
      case 'generate-report':
        setIsReportModalOpen(true)
        break
    }
  }

  const handleRefreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    addToast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated successfully",
      variant: "success"
    })
  }

  const handleExportData = () => {
    addToast({
      title: "Export Started",
      description: "Dashboard data export is being prepared",
      variant: "info"
    })
  }

  const handleAddProduct = async (data: Record<string, FormDataEntryValue>) => {
    console.log('Adding product:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    addToast({
      title: "Product Added",
      description: `Product "${data.name}" has been successfully added`,
      variant: "success"
    })
  }

  const handleCreatePO = async (data: Record<string, FormDataEntryValue>) => {
    console.log('Creating PO:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    addToast({
      title: "Purchase Order Created",
      description: `PO #${data.poNumber} has been created`,
      variant: "success"
    })
  }

  const handleStockAdjustment = async (data: Record<string, FormDataEntryValue>) => {
    console.log('Adjusting stock:', data)
    await new Promise(resolve => setTimeout(resolve, 2000))
    addToast({
      title: "Stock Adjusted",
      description: "Stock levels have been updated successfully",
      variant: "success"
    })
  }

  const handleGenerateReport = async (data: Record<string, FormDataEntryValue>) => {
    console.log('Generating report:', data)
    await new Promise(resolve => setTimeout(resolve, 3000))
    addToast({
      title: "Report Generated",
      description: "Your report is ready for download",
      variant: "success"
    })
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here&apos;s what&apos;s happening with your inventory.
          </p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              addToast({
                title: "Settings",
                description: "Dashboard settings modal will be implemented",
                variant: "info"
              })
            }}
            className="hidden sm:flex"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue}
          type="currency"
          change={stats.revenueGrowth}
          changeType="increase"
          icon={DollarSign}
          description="Total revenue this month"
        />
        
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          type="number"
          change={stats.ordersGrowth}
          changeType="increase"
          icon={ShoppingCart}
          description="Orders processed this month"
        />
        
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          type="number"
          change={stats.productsGrowth}
          changeType="increase"
          icon={Package}
          description="Active products in inventory"
        />
        
        <StatsCard
          title="Low Stock Alerts"
          value={stats.lowStockAlerts}
          type="number"
          change={Math.abs(stats.alertsGrowth)}
          changeType="decrease"
          icon={AlertTriangle}
          description="Products below minimum stock"
        />
      </div>

      {/* Enhanced Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section with Enhanced UI */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="sales" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                <TabsTrigger value="sales" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Sales
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="platforms" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Platforms
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
            
            <TabsContent value="sales">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Sales Performance</span>
                    </CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      +12.5% vs last month
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-blue-200 dark:border-gray-600">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Sales Chart Component
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Interactive sales data visualization will be implemented here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Top Selling Products</span>
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topProducts.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400 font-semibold">
                            #{index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {product.sku}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {product.sales} units sold
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            Rp {(product.revenue / 1000000).toFixed(1)}M
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant={product.growth > 0 ? "default" : "destructive"}
                              className={`text-xs ${
                                product.growth > 0 
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                  : 'bg-red-100 text-red-800 hover:bg-red-100'
                              }`}
                            >
                              {product.growth > 0 ? '+' : ''}{product.growth}%
                            </Badge>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="platforms">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Platform Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-purple-200 dark:border-gray-600">
                    <div className="text-center">
                      <Activity className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Platform Analytics
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        TikTok, Shopee, Tokopedia performance comparison
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced Sidebar Content */}
        <div className="space-y-6">
          {/* Enhanced Recent Activities */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span>Recent Activities</span>
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
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

          {/* Enhanced Quick Actions */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const IconComponent = action.icon
                  return (
                    <Button
                      key={action.id}
                      variant="outline"
                      className="w-full p-4 h-auto text-left justify-start hover:shadow-md transition-all duration-200 group"
                      onClick={() => handleQuickAction(action.id)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:scale-110 transition-transform">
                          <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {action.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal Components */}
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <DetailViewModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          title={selectedProduct.name}
          subtitle={`SKU: ${selectedProduct.sku}`}
          sections={[
            {
              title: "Product Information",
              items: [
                { label: "Product Name", value: selectedProduct.name },
                { label: "SKU", value: selectedProduct.sku },
                { label: "Category", value: selectedProduct.category },
                { label: "Current Stock", value: selectedProduct.stock, type: "text" }
              ]
            },
            {
              title: "Sales Performance",
              items: [
                { label: "Units Sold", value: selectedProduct.sales },
                { label: "Revenue", value: selectedProduct.revenue, type: "currency" },
                { label: "Growth", value: `${selectedProduct.growth > 0 ? '+' : ''}${selectedProduct.growth}%`, type: "badge", variant: selectedProduct.growth > 0 ? "default" : "destructive" }
              ]
            }
          ]}
          actions={
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Package className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
              <Button size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          }
        />
      )}

      {/* Add Product Modal */}
      <FormModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
        title="Add New Product"
        description="Create a new product entry in your inventory"
        submitText="Add Product"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <Input name="name" placeholder="Enter product name" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <Input name="sku" placeholder="Enter SKU" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                options={[
                  { value: "electronics", label: "Electronics" },
                  { value: "fashion", label: "Fashion" },
                  { value: "home-garden", label: "Home & Garden" },
                  { value: "sports", label: "Sports" }
                ]}
                placeholder="Select category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Initial Stock</label>
              <Input name="stock" type="number" placeholder="Enter initial stock" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              rows={3}
              placeholder="Enter product description"
            />
          </div>
        </div>
      </FormModal>

      {/* Create PO Modal */}
      <FormModal
        isOpen={isCreatePOModalOpen}
        onClose={() => setIsCreatePOModalOpen(false)}
        onSubmit={handleCreatePO}
        title="Create Purchase Order"
        description="Generate a new purchase order for suppliers"
        submitText="Create PO"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">PO Number</label>
              <Input name="poNumber" placeholder="Auto-generated" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Supplier</label>
              <Select
                options={[
                  { value: "supplier1", label: "Supplier ABC" },
                  { value: "supplier2", label: "Supplier XYZ" },
                  { value: "supplier3", label: "Supplier 123" }
                ]}
                placeholder="Select supplier"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expected Delivery</label>
              <Input name="deliveryDate" type="date" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <Select
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                  { value: "urgent", label: "Urgent" }
                ]}
                placeholder="Select priority"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea 
              name="notes"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              rows={3}
              placeholder="Additional notes or requirements"
            />
          </div>
        </div>
      </FormModal>

      {/* Stock Adjustment Modal */}
      <FormModal
        isOpen={isStockAdjustmentModalOpen}
        onClose={() => setIsStockAdjustmentModalOpen(false)}
        onSubmit={handleStockAdjustment}
        title="Stock Adjustment"
        description="Adjust inventory levels for products"
        submitText="Adjust Stock"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product</label>
            <Select
              searchable
              options={topProducts.map(p => ({ 
                value: p.id.toString(), 
                label: `${p.name} (${p.sku})`,
                description: `Current stock: ${p.stock}`
              }))}
              placeholder="Search and select product"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Adjustment Type</label>
              <Select
                options={[
                  { value: "increase", label: "Increase Stock" },
                  { value: "decrease", label: "Decrease Stock" },
                  { value: "set", label: "Set Absolute Value" }
                ]}
                placeholder="Select adjustment type"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <Input name="quantity" type="number" placeholder="Enter quantity" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reason</label>
            <textarea 
              name="reason"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              rows={3}
              placeholder="Reason for stock adjustment"
              required
            />
          </div>
        </div>
      </FormModal>

      {/* Generate Report Modal */}
      <FormModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleGenerateReport}
        title="Generate Report"
        description="Create comprehensive inventory reports"
        submitText="Generate Report"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <Select
              options={[
                { value: "inventory", label: "Inventory Report" },
                { value: "sales", label: "Sales Report" },
                { value: "purchase", label: "Purchase Report" },
                { value: "financial", label: "Financial Report" }
              ]}
              placeholder="Select report type"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From Date</label>
              <Input name="fromDate" type="date" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To Date</label>
              <Input name="toDate" type="date" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <Select
              options={[
                { value: "pdf", label: "PDF" },
                { value: "excel", label: "Excel" },
                { value: "csv", label: "CSV" }
              ]}
              placeholder="Select output format"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Additional Options</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" name="includeCharts" className="mr-2" />
                Include charts and graphs
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="detailedBreakdown" className="mr-2" />
                Include detailed breakdown
              </label>
              <label className="flex items-center">
                <input type="checkbox" name="emailCopy" className="mr-2" />
                Email copy to me
              </label>
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  )
}
