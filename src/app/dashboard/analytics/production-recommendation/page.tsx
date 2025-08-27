"use client"

import React from "react"
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle, Factory, Users, Clock, Target, Filter, Download, RefreshCw, Eye, Settings, BarChart3, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, ChartContainer, ProgressRing } from "@/components/ui/charts"
import { StatsCard } from "@/components/common/StatsCard"
import { DataExportModal } from "@/components/ui/data-export-modal"
import { FilterModal } from "@/components/ui/filter-modal"
import { Modal } from "@/components/ui/modal"
import { AnimatedDiv, FadeIn, SlideUp } from "@/components/ui/animations"
import { cn } from "@/lib/utils"

// Types
interface ProductionItem {
  id: number
  productName: string
  currentStock: number
  forecastDemand: number
  recommendedProduction: number
  priority: 'high' | 'medium' | 'low'
  category: string
  leadTime: number
  costPerUnit: number
  profitMargin: number
}

interface CapacityData {
  department: string
  currentCapacity: number
  maxCapacity: number
  utilization: number
  efficiency: number
}

// Sample data
const productionRecommendations: ProductionItem[] = [
  {
    id: 1,
    productName: "iPhone 15 Pro",
    currentStock: 45,
    forecastDemand: 200,
    recommendedProduction: 155,
    priority: 'high',
    category: "Electronics",
    leadTime: 14,
    costPerUnit: 8500000,
    profitMargin: 25.5
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24",
    currentStock: 32,
    forecastDemand: 150,
    recommendedProduction: 118,
    priority: 'high',
    category: "Electronics",
    leadTime: 12,
    costPerUnit: 7200000,
    profitMargin: 22.8
  },
  {
    id: 3,
    productName: "MacBook Air M3",
    currentStock: 18,
    forecastDemand: 80,
    recommendedProduction: 62,
    priority: 'medium',
    category: "Electronics",
    leadTime: 21,
    costPerUnit: 15600000,
    profitMargin: 18.3
  },
  {
    id: 4,
    productName: "AirPods Pro",
    currentStock: 120,
    forecastDemand: 300,
    recommendedProduction: 180,
    priority: 'high',
    category: "Electronics",
    leadTime: 7,
    costPerUnit: 2800000,
    profitMargin: 35.2
  },
  {
    id: 5,
    productName: "iPad Pro",
    currentStock: 28,
    forecastDemand: 60,
    recommendedProduction: 32,
    priority: 'low',
    category: "Electronics",
    leadTime: 18,
    costPerUnit: 12400000,
    profitMargin: 20.1
  }
]

const capacityData: CapacityData[] = [
  { department: "Assembly", currentCapacity: 850, maxCapacity: 1000, utilization: 85, efficiency: 92 },
  { department: "Testing", currentCapacity: 720, maxCapacity: 800, utilization: 90, efficiency: 88 },
  { department: "Packaging", currentCapacity: 950, maxCapacity: 1200, utilization: 79, efficiency: 95 },
  { department: "Quality Control", currentCapacity: 680, maxCapacity: 750, utilization: 91, efficiency: 90 }
]

const demandForecastData = [
  { label: "Week 1", value: 280 },
  { label: "Week 2", value: 320 },
  { label: "Week 3", value: 350 },
  { label: "Week 4", value: 290 },
  { label: "Week 5", value: 410 },
  { label: "Week 6", value: 380 },
  { label: "Week 7", value: 450 },
  { label: "Week 8", value: 420 }
]

const productionTrendData = [
  { label: "Jan", value: 2400 },
  { label: "Feb", value: 2800 },
  { label: "Mar", value: 3200 },
  { label: "Apr", value: 2900 },
  { label: "May", value: 3600 },
  { label: "Jun", value: 3400 }
]

// Production Schedule Modal
interface ProductionScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  item: ProductionItem | null
}

function ProductionScheduleModal({ isOpen, onClose, item }: ProductionScheduleModalProps) {
  if (!item) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              🏭 Production Schedule - {item.productName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Detailed production planning and scheduling
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Production Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Current Stock</p>
                  <p className="text-lg font-semibold">{item.currentStock}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Forecast Demand</p>
                  <p className="text-lg font-semibold">{item.forecastDemand}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Factory className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Recommended</p>
                  <p className="text-lg font-semibold">{item.recommendedProduction}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Lead Time</p>
                  <p className="text-lg font-semibold">{item.leadTime} days</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Production Schedule Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Production Timeline</h3>
            <div className="space-y-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      Week {i + 1} Production
                    </h4>
                    <p className="text-sm text-gray-500">
                      Target: {Math.round(item.recommendedProduction / 4)} units
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={i === 0 ? 'default' : 'secondary'}>
                      {i === 0 ? 'In Progress' : 'Planned'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Cost Analysis */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Cost per Unit:</span>
                  <span className="font-medium">Rp {(item.costPerUnit / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Production Cost:</span>
                  <span className="font-medium">Rp {(item.costPerUnit * item.recommendedProduction / 1000000000).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Profit Margin:</span>
                  <span className="font-medium text-green-600">{item.profitMargin}%</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ProgressRing 
                  value={item.profitMargin} 
                  size={120}
                  strokeWidth={8}
                  className="text-green-600"
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              Approve Production
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// Capacity Analysis Modal
interface CapacityAnalysisModalProps {
  isOpen: boolean
  onClose: () => void
}

function CapacityAnalysisModal({ isOpen, onClose }: CapacityAnalysisModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              ⚙️ Capacity Analysis
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Production capacity optimization and analysis
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Capacity Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Department Utilization">
              <BarChart 
                data={capacityData.map(dept => ({
                  label: dept.department,
                  value: dept.utilization,
                  color: dept.utilization > 90 ? '#ef4444' : dept.utilization > 80 ? '#f59e0b' : '#10b981'
                }))}
                height={250}
                showValues
                animated
              />
            </ChartContainer>

            <ChartContainer title="Efficiency Metrics">
              <div className="grid grid-cols-2 gap-4 h-full">
                {capacityData.map((dept) => (
                  <div key={dept.department} className="flex flex-col items-center justify-center">
                    <ProgressRing 
                      value={dept.efficiency} 
                      size={80}
                      strokeWidth={6}
                      className={dept.efficiency > 90 ? "text-green-500" : "text-orange-500"}
                    />
                    <p className="text-xs font-medium mt-2">{dept.department}</p>
                    <p className="text-xs text-gray-500">{dept.efficiency}%</p>
                  </div>
                ))}
              </div>
            </ChartContainer>
          </div>

          {/* Detailed Capacity Table */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Capacity Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Department</th>
                    <th className="text-left py-2">Current</th>
                    <th className="text-left py-2">Max Capacity</th>
                    <th className="text-left py-2">Utilization</th>
                    <th className="text-left py-2">Efficiency</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {capacityData.map((dept) => (
                    <tr key={dept.department} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 font-medium">{dept.department}</td>
                      <td className="py-3">{dept.currentCapacity}</td>
                      <td className="py-3">{dept.maxCapacity}</td>
                      <td className="py-3">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs font-medium",
                          dept.utilization > 90 ? "bg-red-100 text-red-800" :
                          dept.utilization > 80 ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        )}>
                          {dept.utilization}%
                        </span>
                      </td>
                      <td className="py-3">{dept.efficiency}%</td>
                      <td className="py-3">
                        <Badge variant={
                          dept.utilization > 90 ? 'destructive' :
                          dept.utilization > 80 ? 'secondary' :
                          'default'
                        }>
                          {dept.utilization > 90 ? 'Overloaded' :
                           dept.utilization > 80 ? 'High' : 'Normal'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Optimization Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">Testing Department Overload</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Consider adding additional testing capacity or optimizing workflow</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">Assembly Department High Load</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">Monitor closely and prepare for capacity expansion</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">Packaging Department Optimized</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Good utilization rate with room for growth</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  )
}

export default function ProductionRecommendationPage() {
  const [showExportModal, setShowExportModal] = React.useState(false)
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [showScheduleModal, setShowScheduleModal] = React.useState(false)
  const [showCapacityModal, setShowCapacityModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<ProductionItem | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleScheduleClick = (item: ProductionItem) => {
    setSelectedItem(item)
    setShowScheduleModal(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const exportFields = [
    { key: 'productName', label: 'Product Name', type: 'text' as const },
    { key: 'currentStock', label: 'Current Stock', type: 'number' as const },
    { key: 'forecastDemand', label: 'Forecast Demand', type: 'number' as const },
    { key: 'recommendedProduction', label: 'Recommended Production', type: 'number' as const },
    { key: 'priority', label: 'Priority', type: 'text' as const },
    { key: 'leadTime', label: 'Lead Time (days)', type: 'number' as const },
    { key: 'costPerUnit', label: 'Cost per Unit', type: 'currency' as const },
    { key: 'profitMargin', label: 'Profit Margin', type: 'percentage' as const }
  ]

  const filterFields = [
    {
      key: 'priority',
      label: 'Priority Level',
      type: 'multiselect' as const,
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' }
      ],
      category: 'Priority'
    },
    {
      key: 'category',
      label: 'Product Category',
      type: 'text' as const,
      category: 'Product'
    },
    {
      key: 'leadTimeMin',
      label: 'Minimum Lead Time (days)',
      type: 'number' as const,
      category: 'Time'
    },
    {
      key: 'leadTimeMax',
      label: 'Maximum Lead Time (days)',
      type: 'number' as const,
      category: 'Time'
    }
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const totalRecommendedProduction = productionRecommendations.reduce((sum, item) => sum + item.recommendedProduction, 0)
  const highPriorityItems = productionRecommendations.filter(item => item.priority === 'high').length
  const avgLeadTime = productionRecommendations.reduce((sum, item) => sum + item.leadTime, 0) / productionRecommendations.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              🏭 Production Recommendation
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              AI-powered production planning and capacity optimization
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
              onClick={() => setShowCapacityModal(true)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Capacity
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
            title="Total Production Required"
            value={totalRecommendedProduction.toString()}
            change={12.8}
            icon={<Factory className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="High Priority Items"
            value={highPriorityItems.toString()}
            change={-3.2}
            icon={<AlertTriangle className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Avg Lead Time"
            value={`${avgLeadTime.toFixed(1)} days`}
            change={5.1}
            icon={<Clock className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Capacity Utilization"
            value="86.2%"
            change={8.7}
            icon={<Users className="h-5 w-5" />}
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
                Demand Forecast (8 Weeks)
              </h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <ChartContainer loading={isLoading}>
              <LineChart 
                data={demandForecastData} 
                height={300} 
                showDots 
                animated 
              />
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Production Trend
              </h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <ChartContainer loading={isLoading}>
              <BarChart 
                data={productionTrendData} 
                height={300} 
                showValues 
                animated 
              />
            </ChartContainer>
          </Card>
        </div>
      </SlideUp>

      {/* Production Recommendations */}
      <SlideUp delay={300}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Production Recommendations
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowCapacityModal(true)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Capacity
            </Button>
          </div>
          
          <div className="space-y-4">
            {productionRecommendations.map((item, index) => (
              <AnimatedDiv 
                key={item.id}
                type="fade"
                delay={index * 100}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    item.priority === 'high' ? "bg-red-100 dark:bg-red-900/20" :
                    item.priority === 'medium' ? "bg-yellow-100 dark:bg-yellow-900/20" :
                    "bg-green-100 dark:bg-green-900/20"
                  )}>
                    <Package className={cn(
                      "h-5 w-5",
                      item.priority === 'high' ? "text-red-600 dark:text-red-400" :
                      item.priority === 'medium' ? "text-yellow-600 dark:text-yellow-400" :
                      "text-green-600 dark:text-green-400"
                    )} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Stock: {item.currentStock} | Demand: {item.forecastDemand} | Lead: {item.leadTime}d
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Produce: {item.recommendedProduction}
                    </p>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(item.priority)}
                      <span className="text-sm text-green-600">
                        {item.profitMargin}% margin
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleScheduleClick(item)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
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
        title="Export Production Recommendations"
        fields={exportFields}
        onExport={async (config) => {
          console.log('Exporting:', config)
          await new Promise(resolve => setTimeout(resolve, 2000))
        }}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Production Data"
        fields={filterFields}
        values={{}}
        onChange={(values) => console.log('Filter values:', values)}
        onApply={(values) => {
          console.log('Applying filters:', values)
          setShowFilterModal(false)
        }}
        onReset={() => console.log('Reset filters')}
      />

      <ProductionScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        item={selectedItem}
      />

      <CapacityAnalysisModal
        isOpen={showCapacityModal}
        onClose={() => setShowCapacityModal(false)}
      />
    </div>
  )
}
