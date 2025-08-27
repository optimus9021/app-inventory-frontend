"use client"

import React from "react"
import { TrendingUp, TrendingDown, BarChart3, Calendar, Filter, Download, RefreshCw, Eye, Settings } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, ChartContainer } from "@/components/ui/charts"
import { StatsCard } from "@/components/common/StatsCard"
import { DataExportModal } from "@/components/ui/data-export-modal"
import { FilterModal } from "@/components/ui/filter-modal"
import { Modal } from "@/components/ui/modal"
import { AnimatedDiv, FadeIn, SlideUp } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

// Sample data
const salesData = [
  { label: "Jan", value: 12500000 },
  { label: "Feb", value: 15200000 },
  { label: "Mar", value: 18900000 },
  { label: "Apr", value: 16700000 },
  { label: "May", value: 21300000 },
  { label: "Jun", value: 19800000 },
  { label: "Jul", value: 23100000 },
  { label: "Aug", value: 25600000 },
  { label: "Sep", value: 22400000 },
  { label: "Oct", value: 27800000 },
  { label: "Nov", value: 24900000 },
  { label: "Dec", value: 29200000 }
]

const categoryData = [
  { label: "Electronics", value: 35, color: "#3b82f6" },
  { label: "Fashion", value: 28, color: "#10b981" },
  { label: "Home & Garden", value: 18, color: "#f59e0b" },
  { label: "Sports", value: 12, color: "#ef4444" },
  { label: "Books", value: 7, color: "#8b5cf6" }
]

const topProducts = [
  { id: 1, name: "iPhone 15 Pro", sales: 45600000, units: 152, growth: 15.2 },
  { id: 2, name: "Samsung Galaxy S24", sales: 38900000, units: 143, growth: 12.8 },
  { id: 3, name: "MacBook Air M3", sales: 67200000, units: 89, growth: 8.4 },
  { id: 4, name: "AirPods Pro", sales: 23400000, units: 234, growth: 22.1 },
  { id: 5, name: "iPad Pro", sales: 41800000, units: 76, growth: -3.2 }
]

const regionData = [
  { region: "Jakarta", sales: 89200000, percentage: 32.1, trend: "up" },
  { region: "Surabaya", sales: 67400000, percentage: 24.3, trend: "up" },
  { region: "Bandung", sales: 54300000, percentage: 19.5, trend: "down" },
  { region: "Medan", sales: 38700000, percentage: 13.9, trend: "up" },
  { region: "Others", sales: 28100000, percentage: 10.2, trend: "stable" }
]

// Types
interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

// Chart Interaction Modal
interface ChartInteractionModalProps {
  isOpen: boolean
  onClose: () => void
  chartData: ChartDataPoint[]
  chartType: string
}

function ChartInteractionModal({ isOpen, onClose, chartData, chartType }: ChartInteractionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              📈 Chart Interaction - {chartType}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Detailed chart analysis and interactions
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="space-y-6">
          {/* Enhanced Chart */}
          <ChartContainer title="Enhanced Chart View" className="h-96">
            {chartType === 'bar' ? (
              <BarChart data={chartData} height={300} showValues animated />
            ) : (
              <LineChart data={chartData} height={300} showDots animated />
            )}
          </ChartContainer>

          {/* Chart Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Chart Type</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Bar Chart
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Line Chart
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Time Range</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">Last 7 Days</Button>
                <Button variant="outline" size="sm" className="w-full">Last 30 Days</Button>
                <Button variant="outline" size="sm" className="w-full">Last Year</Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Data Points</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Max Value:</span>
                  <span className="font-medium">Rp 29.2M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Min Value:</span>
                  <span className="font-medium">Rp 12.5M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average:</span>
                  <span className="font-medium">Rp 21.4M</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// Detail Breakdown Modal
interface DetailBreakdownModalProps {
  isOpen: boolean
  onClose: () => void
  data: typeof topProducts
}

function DetailBreakdownModal({ isOpen, onClose }: DetailBreakdownModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              📋 Sales Detail Breakdown
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comprehensive sales analysis and breakdown
            </p>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        #{index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.units} units sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Rp {(product.sales / 1000000).toFixed(1)}M
                    </p>
                    <div className="flex items-center gap-1">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={cn(
                        "text-sm",
                        product.growth > 0 ? "text-green-500" : "text-red-500"
                      )}>
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="regions" className="mt-6">
            <div className="space-y-4">
              {regionData.map((region) => (
                <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {region.percentage}%
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{region.region}</h3>
                      <p className="text-sm text-gray-500">
                        Regional sales performance
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Rp {(region.sales / 1000000).toFixed(1)}M
                    </p>
                    <Badge variant={region.trend === 'up' ? 'default' : region.trend === 'down' ? 'destructive' : 'secondary'}>
                      {region.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartContainer title="Category Distribution">
                <div className="flex items-center justify-center">
                  <div className="space-y-4 w-full">
                    {categoryData.map((category) => (
                      <div key={category.label} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="flex-1 text-sm">{category.label}</span>
                        <span className="text-sm font-medium">{category.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartContainer>

              <Card className="p-4">
                <h3 className="font-medium mb-4">Category Insights</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Top Performer</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Electronics (35%)</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">Growing Fast</p>
                    <p className="text-sm text-green-700 dark:text-green-300">Fashion (+28%)</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Needs Attention</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">Books (7%)</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="mt-6">
            <div className="space-y-6">
              <ChartContainer title="Sales Trends Over Time">
                <LineChart data={salesData} height={300} showDots animated />
              </ChartContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Best Month</h4>
                  <p className="text-2xl font-bold text-green-600">Dec</p>
                  <p className="text-sm text-gray-500">Rp 29.2M</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Growth Rate</h4>
                  <p className="text-2xl font-bold text-blue-600">+18.5%</p>
                  <p className="text-sm text-gray-500">Year over year</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Trend</h4>
                  <p className="text-2xl font-bold text-purple-600">📈</p>
                  <p className="text-sm text-gray-500">Upward</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  )
}

export default function SalesRealizationPage() {
  const [showExportModal, setShowExportModal] = React.useState(false)
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [showChartModal, setShowChartModal] = React.useState(false)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [selectedChart, setSelectedChart] = React.useState<{ data: ChartDataPoint[]; type: string } | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChartClick = (data: ChartDataPoint[], type: string) => {
    setSelectedChart({ data, type })
    setShowChartModal(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const exportFields = [
    { key: 'month', label: 'Month', type: 'text' as const },
    { key: 'sales', label: 'Sales Amount', type: 'currency' as const },
    { key: 'units', label: 'Units Sold', type: 'number' as const },
    { key: 'growth', label: 'Growth Rate', type: 'percentage' as const }
  ]

  const filterFields = [
    {
      key: 'dateRange',
      label: 'Date Range',
      type: 'daterange' as const,
      category: 'Time'
    },
    {
      key: 'category',
      label: 'Product Category',
      type: 'multiselect' as const,
      options: categoryData.map(cat => ({ label: cat.label, value: cat.label })),
      category: 'Product'
    },
    {
      key: 'region',
      label: 'Sales Region',
      type: 'multiselect' as const,
      options: regionData.map(reg => ({ label: reg.region, value: reg.region })),
      category: 'Location'
    },
    {
      key: 'minAmount',
      label: 'Minimum Sales Amount',
      type: 'number' as const,
      category: 'Amount'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              📈 Sales Realization
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Comprehensive sales performance analysis and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setShowExportModal(true)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Key Metrics */}
      <SlideUp delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Sales"
            value="Rp 257.8M"
            change={18.5}
            icon={<TrendingUp className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Units Sold"
            value="1,847"
            change={12.3}
            icon={<BarChart3 className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Average Order"
            value="Rp 139.6K"
            change={-2.1}
            icon={<Calendar className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Growth Rate"
            value="18.5%"
            change={5.2}
            icon={<TrendingUp className="h-5 w-5" />}
            loading={isLoading}
          />
        </div>
      </SlideUp>

      {/* Charts Section */}
      <SlideUp delay={200}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Monthly Sales Trend
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleChartClick(salesData, 'Monthly Sales')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDetailModal(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ChartContainer loading={isLoading}>
              <LineChart 
                data={salesData} 
                height={300} 
                showDots 
                animated 
                className="cursor-pointer"
              />
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Category Performance
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleChartClick(categoryData, 'Category Performance')}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDetailModal(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ChartContainer loading={isLoading}>
              <BarChart 
                data={categoryData.map(cat => ({ 
                  label: cat.label, 
                  value: cat.value,
                  color: cat.color 
                }))} 
                height={300} 
                showValues 
                animated 
                className="cursor-pointer"
              />
            </ChartContainer>
          </Card>
        </div>
      </SlideUp>

      {/* Top Products */}
      <SlideUp delay={300}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Top Performing Products
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetailModal(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <AnimatedDiv 
                key={product.id}
                type="fade"
                delay={index * 100}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      #{index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {product.units} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Rp {(product.sales / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex items-center gap-1">
                    {product.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm",
                      product.growth > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </AnimatedDiv>
            ))}
          </div>
        </Card>
      </SlideUp>

      {/* Modals */}
      <DataExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Sales Realization Data"
        fields={exportFields}
        onExport={async (config) => {
          console.log('Exporting:', config)
          // Simulate export
          await new Promise(resolve => setTimeout(resolve, 2000))
        }}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Sales Data"
        fields={filterFields}
        values={{}}
        onChange={(values) => console.log('Filter values:', values)}
        onApply={(values) => {
          console.log('Applying filters:', values)
          setShowFilterModal(false)
        }}
        onReset={() => console.log('Reset filters')}
      />

      {selectedChart && (
        <ChartInteractionModal
          isOpen={showChartModal}
          onClose={() => setShowChartModal(false)}
          chartData={selectedChart.data}
          chartType={selectedChart.type}
        />
      )}

      <DetailBreakdownModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        data={topProducts}
      />
    </div>
  )
}
