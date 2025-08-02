"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const analyticsData = {
  salesRealization: {
    title: "Sales Realization",
    current: 145000000,
    target: 180000000,
    percentage: 80.6,
    growth: 12.5
  },
  productionRecommendation: [
    { product: "iPhone 14 Pro", currentStock: 25, recommendedProduction: 50, priority: "high" },
    { product: "Samsung Galaxy S23", currentStock: 8, recommendedProduction: 75, priority: "urgent" },
    { product: "MacBook Air M2", currentStock: 0, recommendedProduction: 30, priority: "urgent" },
    { product: "iPad Air", currentStock: 15, recommendedProduction: 40, priority: "medium" }
  ],
  deadstockItems: [
    { product: "iPhone 12", stock: 45, daysStagnant: 120, value: 675000000, recommendation: "clearance" },
    { product: "Samsung Note 20", stock: 23, daysStagnant: 95, value: 299000000, recommendation: "discount" },
    { product: "iPad Mini", stock: 12, daysStagnant: 85, value: 72000000, recommendation: "bundle" }
  ],
  paretoAnalysis: [
    { product: "iPhone 14 Pro", sales: 45, revenue: 675000000, percentage: 32.1, category: "A" },
    { product: "Samsung Galaxy S23", sales: 38, revenue: 494000000, percentage: 23.5, category: "A" },
    { product: "MacBook Air M2", sales: 22, revenue: 418000000, percentage: 19.9, category: "A" },
    { product: "iPad Air", sales: 33, revenue: 297000000, percentage: 14.1, category: "B" },
    { product: "AirPods Pro", sales: 67, revenue: 201000000, percentage: 9.6, category: "B" }
  ]
}

const monthlyTrend = [
  { month: "Jan", sales: 85000000, target: 90000000 },
  { month: "Feb", sales: 92000000, target: 95000000 },
  { month: "Mar", sales: 105000000, target: 100000000 },
  { month: "Apr", sales: 118000000, target: 110000000 },
  { month: "May", sales: 132000000, target: 125000000 },
  { month: "Jun", sales: 145000000, target: 140000000 }
]

export default function AnalyticsPage() {
  return (
    
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sales Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive analysis of sales performance and product insights
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Sales Realization
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.salesRealization.percentage}%
                  </p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{analyticsData.salesRealization.growth}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(analyticsData.salesRealization.current)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Target: {formatCurrency(analyticsData.salesRealization.target)}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Products Analyzed
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.paretoAnalysis.length}
                  </p>
                  <p className="text-sm text-blue-600">
                    Top performers
                  </p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Deadstock Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analyticsData.deadstockItems.length}
                  </p>
                  <p className="text-sm text-red-600">
                    Need attention
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="realization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="realization">Sales Realization</TabsTrigger>
            <TabsTrigger value="production">Production Rec.</TabsTrigger>
            <TabsTrigger value="deadstock">Deadstock Analysis</TabsTrigger>
            <TabsTrigger value="pareto">Pareto Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="realization" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales vs Target Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyTrend.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{month.month}</span>
                          <div className="text-right">
                            <span className="text-sm font-medium">
                              {formatCurrency(month.sales)}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              / {formatCurrency(month.target)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              month.sales >= month.target ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(month.sales / month.target) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {((month.sales / month.target) * 100).toFixed(1)}% of target
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-300">
                        Sales Achievement
                      </h4>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-200 mt-1">
                        {analyticsData.salesRealization.percentage}%
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        {formatCurrency(analyticsData.salesRealization.current)} of {formatCurrency(analyticsData.salesRealization.target)}
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">
                        Growth Rate
                      </h4>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-1">
                        +{analyticsData.salesRealization.growth}%
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Compared to last month
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300">
                        Remaining Target
                      </h4>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-200 mt-1">
                        {formatCurrency(analyticsData.salesRealization.target - analyticsData.salesRealization.current)}
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-400">
                        To reach monthly target
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.productionRecommendation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.product}
                          </h4>
                          <Badge 
                            variant={
                              item.priority === 'urgent' ? 'destructive' :
                              item.priority === 'high' ? 'warning' : 'secondary'
                            }
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-600">
                            Current Stock: <span className="font-medium">{item.currentStock}</span>
                          </span>
                          <span className="text-sm text-blue-600">
                            Recommended: <span className="font-medium">{item.recommendedProduction} units</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deadstock" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deadstock Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.deadstockItems.map((item, index) => (
                    <div key={index} className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.product}
                          </h4>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            <div>
                              <span className="text-xs text-gray-500">Stock</span>
                              <p className="font-medium">{item.stock} units</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Days Stagnant</span>
                              <p className="font-medium text-red-600">{item.daysStagnant} days</p>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Value</span>
                              <p className="font-medium">{formatCurrency(item.value)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Badge variant="outline">
                            {item.recommendation}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pareto" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pareto Analysis (80/20 Rule)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.paretoAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.product}
                          </h4>
                          <Badge 
                            variant={item.category === 'A' ? 'success' : 'info'}
                          >
                            Category {item.category}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <span className="text-xs text-gray-500">Sales Volume</span>
                            <p className="font-medium">{item.sales} units</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Revenue</span>
                            <p className="font-medium">{formatCurrency(item.revenue)}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Revenue %</span>
                            <p className="font-medium text-blue-600">{item.percentage}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                    Pareto Insights
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Top 3 products (Category A) generate 75.5% of total revenue</li>
                    <li>• Focus marketing efforts on Category A products</li>
                    <li>• Consider discontinuing poor performers in Category C</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  )
}
