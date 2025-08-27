"use client"

import React from "react"
import { TrendingDown, Package, AlertTriangle, DollarSign, Clock, Trash2, Filter, Download, RefreshCw, Eye, Settings, BarChart3, Calendar, CheckCircle } from "lucide-react"
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
interface DeadstockItem {
  id: number
  productName: string
  sku: string
  category: string
  currentStock: number
  lastSaleDate: string
  daysWithoutSale: number
  originalValue: number
  currentValue: number
  depreciation: number
  recommendation: 'clearance' | 'return' | 'bundle' | 'donation'
  priority: 'high' | 'medium' | 'low'
}

// Sample data
const deadstockItems: DeadstockItem[] = [
  {
    id: 1,
    productName: "Samsung Galaxy Note 20",
    sku: "SAM-GN20-001",
    category: "Electronics",
    currentStock: 45,
    lastSaleDate: "2024-08-15",
    daysWithoutSale: 127,
    originalValue: 12500000,
    currentValue: 8750000,
    depreciation: 30,
    recommendation: 'clearance',
    priority: 'high'
  },
  {
    id: 2,
    productName: "iPhone 12 Mini",
    sku: "APL-IP12M-001",
    category: "Electronics",
    currentStock: 28,
    lastSaleDate: "2024-09-22",
    daysWithoutSale: 89,
    originalValue: 9800000,
    currentValue: 7350000,
    depreciation: 25,
    recommendation: 'bundle',
    priority: 'medium'
  },
  {
    id: 3,
    productName: "MacBook Pro 13\" 2021",
    sku: "APL-MBP13-001",
    category: "Electronics",
    currentStock: 12,
    lastSaleDate: "2024-07-30",
    daysWithoutSale: 143,
    originalValue: 25600000,
    currentValue: 15360000,
    depreciation: 40,
    recommendation: 'return',
    priority: 'high'
  },
  {
    id: 4,
    productName: "AirPods 2nd Gen",
    sku: "APL-AP2-001",
    category: "Electronics",
    currentStock: 67,
    lastSaleDate: "2024-10-01",
    daysWithoutSale: 80,
    originalValue: 2100000,
    currentValue: 1680000,
    depreciation: 20,
    recommendation: 'clearance',
    priority: 'low'
  },
  {
    id: 5,
    productName: "Surface Pro 8",
    sku: "MSF-SP8-001",
    category: "Electronics",
    currentStock: 18,
    lastSaleDate: "2024-08-08",
    daysWithoutSale: 134,
    originalValue: 18900000,
    currentValue: 11340000,
    depreciation: 40,
    recommendation: 'bundle',
    priority: 'high'
  }
]

const categoryBreakdown = [
  { label: "Electronics", value: 65, color: "#3b82f6" },
  { label: "Fashion", value: 20, color: "#10b981" },
  { label: "Home & Garden", value: 10, color: "#f59e0b" },
  { label: "Sports", value: 5, color: "#ef4444" }
]

const recommendationData = [
  { label: "Clearance Sale", value: 45, color: "#ef4444" },
  { label: "Bundle Offers", value: 25, color: "#f59e0b" },
  { label: "Return to Supplier", value: 20, color: "#10b981" },
  { label: "Donation", value: 10, color: "#8b5cf6" }
]

// Deadstock Detail Modal
interface DeadstockDetailModalProps {
  isOpen: boolean
  onClose: () => void
  item: DeadstockItem | null
}

function DeadstockDetailModal({ isOpen, onClose, item }: DeadstockDetailModalProps) {
  if (!item) return null

  const potentialLoss = (item.originalValue - item.currentValue) * item.currentStock

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              📦 Deadstock Analysis - {item.productName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Detailed analysis and recommendations for deadstock management
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Item Overview */}
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
                <Clock className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-sm text-gray-500">Days Stagnant</p>
                  <p className="text-lg font-semibold">{item.daysWithoutSale}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Depreciation</p>
                  <p className="text-lg font-semibold">{item.depreciation}%</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Current Value</p>
                  <p className="text-lg font-semibold">Rp {(item.currentValue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Financial Impact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Financial Impact Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Original Unit Value:</span>
                  <span className="font-medium">Rp {(item.originalValue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Unit Value:</span>
                  <span className="font-medium">Rp {(item.currentValue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Original Investment:</span>
                  <span className="font-medium">Rp {(item.originalValue * item.currentStock / 1000000000).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Total Value:</span>
                  <span className="font-medium">Rp {(item.currentValue * item.currentStock / 1000000000).toFixed(2)}B</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-red-600 dark:text-red-400 font-medium">Potential Loss:</span>
                  <span className="font-bold text-red-600">Rp {(potentialLoss / 1000000000).toFixed(2)}B</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ProgressRing 
                  value={100 - item.depreciation} 
                  size={150}
                  strokeWidth={10}
                  className="text-red-600"
                />
              </div>
            </div>
          </Card>

          {/* Recommendation Strategy */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended Strategy</h3>
            <div className="space-y-4">
              <div className={cn(
                "flex items-start gap-3 p-4 rounded-lg",
                item.recommendation === 'clearance' ? "bg-red-50 dark:bg-red-900/20" :
                item.recommendation === 'bundle' ? "bg-yellow-50 dark:bg-yellow-900/20" :
                item.recommendation === 'return' ? "bg-green-50 dark:bg-green-900/20" :
                "bg-purple-50 dark:bg-purple-900/20"
              )}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  item.recommendation === 'clearance' ? "bg-red-100 dark:bg-red-800" :
                  item.recommendation === 'bundle' ? "bg-yellow-100 dark:bg-yellow-800" :
                  item.recommendation === 'return' ? "bg-green-100 dark:bg-green-800" :
                  "bg-purple-100 dark:bg-purple-800"
                )}>
                  {item.recommendation === 'clearance' ? <Trash2 className="h-4 w-4 text-red-600" /> :
                   item.recommendation === 'bundle' ? <Package className="h-4 w-4 text-yellow-600" /> :
                   item.recommendation === 'return' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                   <DollarSign className="h-4 w-4 text-purple-600" />}
                </div>
                <div>
                  <h4 className="font-medium mb-2">
                    {item.recommendation === 'clearance' ? 'Clearance Sale' :
                     item.recommendation === 'bundle' ? 'Bundle Offer' :
                     item.recommendation === 'return' ? 'Return to Supplier' :
                     'Donation'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.recommendation === 'clearance' ? 'Offer significant discounts (30-50%) to move inventory quickly' :
                     item.recommendation === 'bundle' ? 'Create attractive bundles with fast-moving products' :
                     item.recommendation === 'return' ? 'Negotiate return with supplier for store credit or refund' :
                     'Consider donation for tax benefits and brand goodwill'}
                  </p>
                  <div className="mt-2">
                    <Badge variant={
                      item.recommendation === 'clearance' ? 'destructive' :
                      item.recommendation === 'bundle' ? 'secondary' :
                      item.recommendation === 'return' ? 'default' :
                      'outline'
                    }>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Action Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Week 1: Implement recommended strategy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Week 2-3: Monitor performance and adjust pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Week 4: Evaluate results and next steps</span>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline">
              Mark as Reviewed
            </Button>
            <Button>
              Implement Strategy
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default function DeadstockRecommendationPage() {
  const [showExportModal, setShowExportModal] = React.useState(false)
  const [showFilterModal, setShowFilterModal] = React.useState(false)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState<DeadstockItem | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleItemClick = (item: DeadstockItem) => {
    setSelectedItem(item)
    setShowDetailModal(true)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const exportFields = [
    { key: 'productName', label: 'Product Name', type: 'text' as const },
    { key: 'sku', label: 'SKU', type: 'text' as const },
    { key: 'currentStock', label: 'Current Stock', type: 'number' as const },
    { key: 'daysWithoutSale', label: 'Days Without Sale', type: 'number' as const },
    { key: 'originalValue', label: 'Original Value', type: 'currency' as const },
    { key: 'currentValue', label: 'Current Value', type: 'currency' as const },
    { key: 'depreciation', label: 'Depreciation', type: 'percentage' as const },
    { key: 'recommendation', label: 'Recommendation', type: 'text' as const }
  ]

  const filterFields = [
    {
      key: 'recommendation',
      label: 'Recommendation Type',
      type: 'multiselect' as const,
      options: [
        { label: 'Clearance Sale', value: 'clearance' },
        { label: 'Bundle Offer', value: 'bundle' },
        { label: 'Return to Supplier', value: 'return' },
        { label: 'Donation', value: 'donation' }
      ],
      category: 'Strategy'
    },
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
      key: 'minDays',
      label: 'Minimum Days Without Sale',
      type: 'number' as const,
      category: 'Time'
    },
    {
      key: 'minDepreciation',
      label: 'Minimum Depreciation (%)',
      type: 'number' as const,
      category: 'Value'
    }
  ]

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'clearance':
        return <Badge variant="destructive">Clearance Sale</Badge>
      case 'bundle':
        return <Badge variant="secondary">Bundle Offer</Badge>
      case 'return':
        return <Badge variant="default">Return to Supplier</Badge>
      case 'donation':
        return <Badge variant="outline">Donation</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const totalDeadstockValue = deadstockItems.reduce((sum, item) => sum + (item.currentValue * item.currentStock), 0)
  const totalOriginalValue = deadstockItems.reduce((sum, item) => sum + (item.originalValue * item.currentStock), 0)
  const totalPotentialLoss = totalOriginalValue - totalDeadstockValue
  const avgDaysStagnant = deadstockItems.reduce((sum, item) => sum + item.daysWithoutSale, 0) / deadstockItems.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              🗂️ Deadstock Recommendation
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Identify and optimize slow-moving inventory with AI-powered recommendations
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
            title="Total Deadstock Value"
            value={`Rp ${(totalDeadstockValue / 1000000000).toFixed(1)}B`}
            change={-15.2}
            icon={<DollarSign className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Potential Loss"
            value={`Rp ${(totalPotentialLoss / 1000000000).toFixed(1)}B`}
            change={-8.7}
            icon={<TrendingDown className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Deadstock Items"
            value={deadstockItems.length.toString()}
            change={3.4}
            icon={<Package className="h-5 w-5" />}
            loading={isLoading}
          />
          <StatsCard
            title="Avg Days Stagnant"
            value={`${avgDaysStagnant.toFixed(0)} days`}
            change={12.1}
            icon={<Clock className="h-5 w-5" />}
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
                Deadstock by Category
              </h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <ChartContainer loading={isLoading}>
              <BarChart 
                data={categoryBreakdown} 
                height={300} 
                showValues 
                animated 
              />
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recommendation Distribution
              </h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <ChartContainer loading={isLoading}>
              <div className="space-y-4">
                {recommendationData.map((rec) => (
                  <div key={rec.label} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: rec.color }}
                    />
                    <span className="flex-1 text-sm">{rec.label}</span>
                    <span className="text-sm font-medium">{rec.value}%</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all"
                        style={{ 
                          width: `${rec.value}%`,
                          backgroundColor: rec.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ChartContainer>
          </Card>
        </div>
      </SlideUp>

      {/* Deadstock Items */}
      <SlideUp delay={300}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Deadstock Items Analysis
            </h3>
          </div>
          
          <div className="space-y-4">
            {deadstockItems.map((item, index) => (
              <AnimatedDiv 
                key={item.id}
                type="fade"
                delay={index * 100}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors cursor-pointer"
                onClick={() => handleItemClick(item)}
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
                      SKU: {item.sku} | Stock: {item.currentStock} | {item.daysWithoutSale} days stagnant
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Rp {(item.currentValue / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-sm text-red-500">
                      -{item.depreciation}% value
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {getRecommendationBadge(item.recommendation)}
                    <Badge variant={
                      item.priority === 'high' ? 'destructive' :
                      item.priority === 'medium' ? 'secondary' :
                      'outline'
                    } size="sm">
                      {item.priority} priority
                    </Badge>
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
        title="Export Deadstock Data"
        fields={exportFields}
        onExport={async (config) => {
          console.log('Exporting:', config)
          await new Promise(resolve => setTimeout(resolve, 2000))
        }}
      />

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Deadstock Items"
        fields={filterFields}
        values={{}}
        onChange={(values) => console.log('Filter values:', values)}
        onApply={(values) => {
          console.log('Applying filters:', values)
          setShowFilterModal(false)
        }}
        onReset={() => console.log('Reset filters')}
      />

      <DeadstockDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        item={selectedItem}
      />
    </div>
  )
}
