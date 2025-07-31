'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Smartphone,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  Filter,
  Download,
  BarChart3,
  ArrowRight
} from 'lucide-react';

interface ConversionData {
  id: number;
  platform: string;
  period: string;
  visitors: number;
  views: number;
  clicks: number;
  addToCart: number;
  purchases: number;
  viewRate: number;
  clickRate: number;
  cartRate: number;
  conversionRate: number;
  revenue: number;
  avgOrderValue: number;
}

export default function ConversionDataPage() {
  const [conversionData, setConversionData] = useState<ConversionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    fetchConversionData();
  }, [selectedPlatform, selectedPeriod]);

  const fetchConversionData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: ConversionData[] = [
        {
          id: 1,
          platform: 'TikTok',
          period: 'Januari 2024',
          visitors: 50000,
          views: 45000,
          clicks: 8500,
          addToCart: 2100,
          purchases: 520,
          viewRate: 90.0,
          clickRate: 18.9,
          cartRate: 24.7,
          conversionRate: 24.8,
          revenue: 780000000,
          avgOrderValue: 1500000
        },
        {
          id: 2,
          platform: 'Shopee',
          period: 'Januari 2024',
          visitors: 35000,
          views: 32000,
          clicks: 7200,
          addToCart: 1800,
          purchases: 450,
          viewRate: 91.4,
          clickRate: 22.5,
          cartRate: 25.0,
          conversionRate: 25.0,
          revenue: 675000000,
          avgOrderValue: 1500000
        },
        {
          id: 3,
          platform: 'Tokopedia',
          period: 'Januari 2024',
          visitors: 28000,
          views: 26500,
          clicks: 5800,
          addToCart: 1450,
          purchases: 380,
          viewRate: 94.6,
          clickRate: 21.9,
          cartRate: 25.0,
          conversionRate: 26.2,
          revenue: 570000000,
          avgOrderValue: 1500000
        },
        {
          id: 4,
          platform: 'TikTok',
          period: 'Februari 2024',
          visitors: 52000,
          views: 47000,
          clicks: 9200,
          addToCart: 2250,
          purchases: 580,
          viewRate: 90.4,
          clickRate: 19.6,
          cartRate: 24.5,
          conversionRate: 25.8,
          revenue: 870000000,
          avgOrderValue: 1500000
        },
        {
          id: 5,
          platform: 'Shopee',
          period: 'Februari 2024',
          visitors: 38000,
          views: 35000,
          clicks: 8000,
          addToCart: 2000,
          purchases: 500,
          viewRate: 92.1,
          clickRate: 22.9,
          cartRate: 25.0,
          conversionRate: 25.0,
          revenue: 750000000,
          avgOrderValue: 1500000
        }
      ];
      setConversionData(mockData);
    } catch (error) {
      console.error('Error fetching conversion data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok':
        return <Smartphone className="w-4 h-4 text-black" />;
      case 'shopee':
        return <ShoppingBag className="w-4 h-4 text-orange-600" />;
      case 'tokopedia':
        return <ShoppingBag className="w-4 h-4 text-green-600" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'tiktok':
        return <Badge className="bg-black text-white">TikTok</Badge>;
      case 'shopee':
        return <Badge className="bg-orange-100 text-orange-800">Shopee</Badge>;
      case 'tokopedia':
        return <Badge className="bg-green-100 text-green-800">Tokopedia</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{platform}</Badge>;
    }
  };

  const getConversionTrend = (rate: number) => {
    if (rate >= 25) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (rate >= 20) {
      return <ArrowRight className="w-4 h-4 text-yellow-600" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  const filteredData = selectedPlatform === 'all' 
    ? conversionData 
    : conversionData.filter(data => data.platform.toLowerCase() === selectedPlatform);

  const totalVisitors = filteredData.reduce((sum, data) => sum + data.visitors, 0);
  const totalPurchases = filteredData.reduce((sum, data) => sum + data.purchases, 0);
  const totalRevenue = filteredData.reduce((sum, data) => sum + data.revenue, 0);
  const avgConversionRate = filteredData.reduce((sum, data) => sum + data.conversionRate, 0) / filteredData.length;

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Konversi Penjualan Platform</h1>
              <p className="text-gray-600 mt-1">Analisis konversi dan performa penjualan di berbagai platform e-commerce</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalVisitors.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalPurchases.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {avgConversionRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-orange-600">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform
                </label>
                <select 
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Platforms</option>
                  <option value="tiktok">TikTok</option>
                  <option value="shopee">Shopee</option>
                  <option value="tokopedia">Tokopedia</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="flex gap-2">
                  <Input type="date" />
                  <span className="self-center">to</span>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex items-end">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Conversion Analysis ({filteredData.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Platform</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Visitors</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Views</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Clicks</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Add to Cart</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Purchases</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Conversion Rate</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Revenue</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data) => (
                    <tr key={data.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getPlatformIcon(data.platform)}
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{data.platform}</div>
                            <div className="text-sm text-gray-500">{data.period}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-gray-900">
                        {data.visitors.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900">{data.views.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">({data.viewRate}%)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900">{data.clicks.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">({data.clickRate}%)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-medium text-gray-900">{data.addToCart.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">({data.cartRate}%)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-blue-600">
                        {data.purchases.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {getConversionTrend(data.conversionRate)}
                          <span className={`ml-1 font-bold ${
                            data.conversionRate >= 25 ? 'text-green-600' : 
                            data.conversionRate >= 20 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {data.conversionRate.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(data.revenue)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <MousePointer className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {['TikTok', 'Shopee', 'Tokopedia'].map((platform) => {
            const platformData = conversionData.filter(d => d.platform === platform);
            const latestData = platformData[platformData.length - 1];
            
            if (!latestData) return null;

            return (
              <Card key={platform}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getPlatformIcon(platform)}
                    <span className="ml-2">{platform} Funnel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Visitors</span>
                      <span className="font-medium">{latestData.visitors.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="font-medium">{latestData.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Clicks</span>
                      <span className="font-medium">{latestData.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Add to Cart</span>
                      <span className="font-medium">{latestData.addToCart.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium text-gray-900">Purchases</span>
                      <span className="font-bold text-green-600">{latestData.purchases.toLocaleString()}</span>
                    </div>
                    <div className="text-center mt-3">
                      {getPlatformBadge(platform)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
