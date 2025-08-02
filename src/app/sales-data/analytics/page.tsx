'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Target,
  DollarSign,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw
} from 'lucide-react';

interface SalesAnalytics {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalOrders: number;
  totalUnits: number;
  avgOrderValue: number;
  conversionRate: number;
  returRate: number;
  currency: string;
  platforms: PlatformSales[];
  categories: CategorySales[];
  trends: SalesTrend[];
  topProducts: TopProduct[];
}

interface PlatformSales {
  platform: string;
  revenue: number;
  orders: number;
  units: number;
  percentage: number;
  growth: number;
  commission: number;
}

interface CategorySales {
  category: string;
  revenue: number;
  units: number;
  percentage: number;
  growth: number;
  avgPrice: number;
}

interface SalesTrend {
  date: string;
  revenue: number;
  orders: number;
  units: number;
  conversionRate: number;
}

interface TopProduct {
  productCode: string;
  productName: string;
  category: string;
  revenue: number;
  units: number;
  avgPrice: number;
  growth: number;
  rank: number;
}

const mockSalesAnalytics: SalesAnalytics = {
  id: '1',
  period: 'January 2025',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  totalRevenue: 2450000000,
  totalOrders: 8750,
  totalUnits: 15420,
  avgOrderValue: 280000,
  conversionRate: 3.2,
  returRate: 2.1,
  currency: 'IDR',
  platforms: [
    {
      platform: 'TikTok Shop',
      revenue: 980000000,
      orders: 3500,
      units: 6200,
      percentage: 40.0,
      growth: 15.5,
      commission: 49000000
    },
    {
      platform: 'Shopee',
      revenue: 857500000,
      orders: 3060,
      units: 5380,
      percentage: 35.0,
      growth: 8.2,
      commission: 42875000
    },
    {
      platform: 'Tokopedia',
      revenue: 612500000,
      orders: 2190,
      units: 3840,
      percentage: 25.0,
      growth: -2.1,
      commission: 30625000
    }
  ],
  categories: [
    {
      category: 'Fashion',
      revenue: 1225000000,
      units: 7710,
      percentage: 50.0,
      growth: 12.3,
      avgPrice: 158900
    },
    {
      category: 'Elektronik',
      revenue: 735000000,
      units: 4630,
      percentage: 30.0,
      growth: 18.7,
      avgPrice: 158800
    },
    {
      category: 'Olahraga',
      revenue: 294000000,
      units: 1850,
      percentage: 12.0,
      growth: 5.4,
      avgPrice: 158900
    },
    {
      category: 'Aksesoris',
      revenue: 196000000,
      units: 1230,
      percentage: 8.0,
      growth: -3.2,
      avgPrice: 159350
    }
  ],
  trends: [
    {
      date: '2025-01-01',
      revenue: 78000000,
      orders: 280,
      units: 495,
      conversionRate: 3.1
    },
    {
      date: '2025-01-15',
      revenue: 85000000,
      orders: 304,
      units: 538,
      conversionRate: 3.3
    },
    {
      date: '2025-01-31',
      revenue: 82000000,
      orders: 293,
      units: 518,
      conversionRate: 3.2
    }
  ],
  topProducts: [
    {
      productCode: 'TAS-001',
      productName: 'Tas Ransel Premium',
      category: 'Fashion',
      revenue: 145000000,
      units: 725,
      avgPrice: 200000,
      growth: 25.8,
      rank: 1
    },
    {
      productCode: 'ELK-001',
      productName: 'Smartphone Android 128GB',
      category: 'Elektronik',
      revenue: 135000000,
      units: 450,
      avgPrice: 300000,
      growth: 18.2,
      rank: 2
    },
    {
      productCode: 'SEP-002',
      productName: 'Sepatu Sport Running',
      category: 'Olahraga',
      revenue: 98000000,
      units: 490,
      avgPrice: 200000,
      growth: 12.5,
      rank: 3
    },
    {
      productCode: 'JAM-001',
      productName: 'Jam Tangan Digital',
      category: 'Aksesoris',
      revenue: 87500000,
      units: 350,
      avgPrice: 250000,
      growth: -5.2,
      rank: 4
    },
    {
      productCode: 'KMJ-001',
      productName: 'Kemeja Formal Katun',
      category: 'Fashion',
      revenue: 76000000,
      units: 380,
      avgPrice: 200000,
      growth: 8.9,
      rank: 5
    }
  ]
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const formatPercentage = (num: number) => {
  return `${num.toFixed(1)}%`;
};

const getGrowthIcon = (growth: number) => {
  if (growth > 0) return <ArrowUpRight className="h-3 w-3 text-green-600" />;
  if (growth < 0) return <ArrowDownRight className="h-3 w-3 text-red-600" />;
  return <Minus className="h-3 w-3 text-gray-600" />;
};

const getGrowthColor = (growth: number) => {
  if (growth > 0) return 'text-green-600';
  if (growth < 0) return 'text-red-600';
  return 'text-gray-600';
};

export default function SalesAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const analytics = mockSalesAnalytics;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Analytics & Reporting</h1>
            <p className="text-muted-foreground">
              Analisis komprehensif data penjualan dan performa bisnis
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Period: {analytics.period}</span>
              <Badge className="bg-blue-100 text-blue-800">
                {analytics.startDate} - {analytics.endDate}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <Button size="sm">Apply</Button>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(analytics.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(12.5)}
              <span className={getGrowthColor(12.5)}>+12.5% from last period</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatNumber(analytics.totalOrders)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(8.3)}
              <span className={getGrowthColor(8.3)}>+8.3% from last period</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Units Sold</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatNumber(analytics.totalUnits)}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(15.7)}
              <span className={getGrowthColor(15.7)}>+15.7% from last period</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(analytics.avgOrderValue)}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(3.8)}
              <span className={getGrowthColor(3.8)}>+3.8% from last period</span>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Conversion Rate</h3>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatPercentage(analytics.conversionRate)}
            </div>
            <div className="flex items-center text-sm">
              {getGrowthIcon(0.5)}
              <span className={getGrowthColor(0.5)}>+0.5% from last period</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Return Rate</h3>
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {formatPercentage(analytics.returRate)}
            </div>
            <div className="flex items-center text-sm">
              {getGrowthIcon(-0.3)}
              <span className={getGrowthColor(-0.3)}>-0.3% from last period</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Platforms</h3>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {analytics.platforms.length}
            </div>
            <div className="text-sm text-muted-foreground">
              All platforms active
            </div>
          </Card>
        </div>

        {/* Platform Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Platform</th>
                  <th className="text-right p-4">Revenue</th>
                  <th className="text-center p-4">Orders</th>
                  <th className="text-center p-4">Units</th>
                  <th className="text-center p-4">Market Share</th>
                  <th className="text-center p-4">Growth</th>
                  <th className="text-right p-4">Commission</th>
                </tr>
              </thead>
              <tbody>
                {analytics.platforms.map((platform, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{platform.platform}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-medium text-green-600">
                        {formatCurrency(platform.revenue)}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-medium">{formatNumber(platform.orders)}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-medium">{formatNumber(platform.units)}</span>
                    </td>
                    <td className="p-4 text-center">
                      <Badge className="bg-blue-100 text-blue-800">
                        {formatPercentage(platform.percentage)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`flex items-center justify-center ${getGrowthColor(platform.growth)}`}>
                        {getGrowthIcon(platform.growth)}
                        <span className="ml-1">{formatPercentage(platform.growth)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span className="text-orange-600 font-medium">
                        {formatCurrency(platform.commission)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Category Analysis & Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
            <div className="space-y-4">
              {analytics.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.category}</span>
                      <div className={`flex items-center ${getGrowthColor(category.growth)}`}>
                        {getGrowthIcon(category.growth)}
                        <span className="ml-1 text-sm">{formatPercentage(category.growth)}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(category.revenue)}</span>
                      <span>{formatNumber(category.units)} units</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
            <div className="space-y-3">
              {analytics.topProducts.map((product) => (
                <div key={product.productCode} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      #{product.rank}
                    </div>
                    <div>
                      <div className="font-medium">{product.productName}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.productCode} • {product.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">
                      {formatCurrency(product.revenue)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatNumber(product.units)} units
                    </div>
                    <div className={`text-sm flex items-center justify-end ${getGrowthColor(product.growth)}`}>
                      {getGrowthIcon(product.growth)}
                      <span className="ml-1">{formatPercentage(product.growth)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
