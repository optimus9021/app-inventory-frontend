'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target,
  DollarSign,
  Percent,
  BarChart3,
  LineChart,
  ArrowRight,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

const projectionModules = [
  {
    title: "Proyeksi Persentase Penjualan",
    description: "Analisis proyeksi penjualan berdasarkan persentase pencapaian target",
    icon: Percent,
    href: "/dashboard/analytics/sales-projection/percentage",
    stats: { current: "85.3%", target: "100%", trend: "+5.2%" },
    color: "blue",
    status: "active"
  },
  {
    title: "Proyeksi Target Penjualan (Qty)",
    description: "Proyeksi target penjualan berdasarkan quantity produk",
    icon: BarChart3,
    href: "/dashboard/analytics/sales-projection/qty-target",
    stats: { current: "1,234 units", target: "1,500 units", trend: "+8.1%" },
    color: "green",
    status: "active"
  },
  {
    title: "Proyeksi Target Penjualan (IDR)",
    description: "Proyeksi target penjualan berdasarkan nilai rupiah",
    icon: DollarSign,
    href: "/dashboard/analytics/sales-projection/idr-target",
    stats: { current: "Rp 2.1B", target: "Rp 2.5B", trend: "+12.3%" },
    color: "purple",
    status: "active"
  }
];

const quickStats = [
  { 
    label: "Current Period Achievement", 
    value: "87.5%", 
    change: "+3.2%", 
    icon: Target,
    color: "green"
  },
  { 
    label: "Projected Revenue", 
    value: "Rp 2.8B", 
    change: "+15.5%", 
    icon: DollarSign,
    color: "blue"
  },
  { 
    label: "Forecasted Units", 
    value: "1,850", 
    change: "+8.7%", 
    icon: BarChart3,
    color: "purple"
  },
  { 
    label: "Confidence Level", 
    value: "92.3%", 
    change: "+1.8%", 
    icon: TrendingUp,
    color: "orange"
  }
];

export default function SalesProjectionPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');

  return (
    
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sales Projection Hub
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Proyeksi dan analisis target penjualan dalam berbagai metrik
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Set Period
            </Button>
            <Button>
              <LineChart className="h-4 w-4 mr-2" />
              Generate Forecast
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Projection Timeframe
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select the time period for sales projection analysis
                </p>
              </div>
              <div className="flex space-x-2">
                {['monthly', 'quarterly', 'yearly'].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className="capitalize"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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
                    <p className={`text-sm mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projection Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projectionModules.map((module, index) => (
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
                      <Badge variant="secondary" className="text-xs mt-1">
                        {module.status}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {module.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium text-gray-900">{module.stats.current}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target:</span>
                    <span className="font-medium text-gray-900">{module.stats.target}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trend:</span>
                    <span className={`font-medium ${
                      module.stats.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {module.stats.trend}
                    </span>
                  </div>
                </div>
                
                <Link href={module.href}>
                  <Button className="w-full">
                    Open Analysis
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projections Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projection Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Quarterly projection updated",
                  detail: "Q3 2024 sales forecast revised based on market trends",
                  time: "2 hours ago",
                  type: "projection",
                  status: "completed"
                },
                {
                  action: "Target achievement calculated",
                  detail: "Monthly target achievement: 87.5% (above threshold)",
                  time: "4 hours ago",
                  type: "calculation",
                  status: "completed"
                },
                {
                  action: "Forecast model retrained",
                  detail: "Machine learning model updated with latest sales data",
                  time: "1 day ago",
                  type: "model",
                  status: "completed"
                },
                {
                  action: "Percentage projection analyzed",
                  detail: "Sales percentage projection shows positive trend",
                  time: "2 days ago",
                  type: "analysis",
                  status: "completed"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'projection' ? 'bg-blue-500' :
                    activity.type === 'calculation' ? 'bg-green-500' :
                    activity.type === 'model' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.detail}
                    </p>
                    <Badge 
                      variant="outline" 
                      className="text-xs mt-1"
                    >
                      {activity.status}
                    </Badge>
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
    
  );
}
