'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  TrendingUp,
  Package,
  DollarSign,
  Filter,
  Download,
  Star,
  Target
} from 'lucide-react';

interface ParetoProduct {
  id: number;
  productName: string;
  sku: string;
  totalRevenue: number;
  totalQuantitySold: number;
  revenuePercentage: number;
  cumulativePercentage: number;
  classification: 'A' | 'B' | 'C';
  category: string;
  rank: number;
}

export default function ParetoProductPage() {
  const [paretoData, setParetoData] = useState<ParetoProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterClassification, setFilterClassification] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    fetchParetoAnalysis();
  }, [selectedPeriod]);

  const fetchParetoAnalysis = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: ParetoProduct[] = [
        {
          id: 1,
          productName: 'iPhone 14 Pro',
          sku: 'APPL-IP14-001',
          totalRevenue: 480000000,
          totalQuantitySold: 30,
          revenuePercentage: 32.5,
          cumulativePercentage: 32.5,
          classification: 'A',
          category: 'Electronics',
          rank: 1
        },
        {
          id: 2,
          productName: 'Laptop Dell XPS 13',
          sku: 'DELL-XPS-001',
          totalRevenue: 370000000,
          totalQuantitySold: 20,
          revenuePercentage: 25.1,
          cumulativePercentage: 57.6,
          classification: 'A',
          category: 'Electronics',
          rank: 2
        },
        {
          id: 3,
          productName: 'Samsung Galaxy S24',
          sku: 'SAMS-S24-001',
          totalRevenue: 240000000,
          totalQuantitySold: 18,
          revenuePercentage: 16.3,
          cumulativePercentage: 73.9,
          classification: 'A',
          category: 'Electronics',
          rank: 3
        },
        {
          id: 4,
          productName: 'MacBook Air M2',
          sku: 'APPL-MBA-001',
          totalRevenue: 180000000,
          totalQuantitySold: 12,
          revenuePercentage: 12.2,
          cumulativePercentage: 86.1,
          classification: 'B',
          category: 'Electronics',
          rank: 4
        },
        {
          id: 5,
          productName: 'iPad Air',
          sku: 'APPL-IPAD-001',
          totalRevenue: 120000000,
          totalQuantitySold: 15,
          revenuePercentage: 8.1,
          cumulativePercentage: 94.2,
          classification: 'B',
          category: 'Electronics',
          rank: 5
        },
        {
          id: 6,
          productName: 'Gaming Mouse Pro',
          sku: 'GAME-MOUSE-001',
          totalRevenue: 45000000,
          totalQuantitySold: 45,
          revenuePercentage: 3.1,
          cumulativePercentage: 97.3,
          classification: 'C',
          category: 'Accessories',
          rank: 6
        },
        {
          id: 7,
          productName: 'Wireless Headphones',
          sku: 'AUDIO-WH-001',
          totalRevenue: 25000000,
          totalQuantitySold: 25,
          revenuePercentage: 1.7,
          cumulativePercentage: 99.0,
          classification: 'C',
          category: 'Accessories',
          rank: 7
        },
        {
          id: 8,
          productName: 'USB Cable',
          sku: 'CABLE-USB-001',
          totalRevenue: 15000000,
          totalQuantitySold: 100,
          revenuePercentage: 1.0,
          cumulativePercentage: 100.0,
          classification: 'C',
          category: 'Accessories',
          rank: 8
        }
      ];
      setParetoData(mockData);
    } catch (error) {
      console.error('Error fetching pareto analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case 'A':
        return <Badge className="bg-green-100 text-green-800">Class A (80%)</Badge>;
      case 'B':
        return <Badge className="bg-yellow-100 text-yellow-800">Class B (15%)</Badge>;
      case 'C':
        return <Badge className="bg-red-100 text-red-800">Class C (5%)</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'A':
        return <Star className="w-4 h-4 text-green-500" />;
      case 'B':
        return <Target className="w-4 h-4 text-yellow-500" />;
      case 'C':
        return <Package className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredData = filterClassification === 'all' 
    ? paretoData 
    : paretoData.filter(item => item.classification === filterClassification);

  const classACount = paretoData.filter(p => p.classification === 'A').length;
  const classBCount = paretoData.filter(p => p.classification === 'B').length;
  const classCCount = paretoData.filter(p => p.classification === 'C').length;
  const totalRevenue = paretoData.reduce((sum, item) => sum + item.totalRevenue, 0);

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
              <h1 className="text-2xl font-bold text-gray-900">Pareto Product Analysis</h1>
              <p className="text-gray-600 mt-1">Analisis 80/20 untuk identifikasi produk dengan kontribusi terbesar</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Analysis
              </Button>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Chart
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Class A Products</p>
                  <p className="text-2xl font-bold text-green-600">{classACount}</p>
                  <p className="text-xs text-gray-500">80% of revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Class B Products</p>
                  <p className="text-2xl font-bold text-yellow-600">{classBCount}</p>
                  <p className="text-xs text-gray-500">15% of revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Class C Products</p>
                  <p className="text-2xl font-bold text-red-600">{classCCount}</p>
                  <p className="text-xs text-gray-500">5% of revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-blue-600">
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
                  Analysis Period
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
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Classification
                </label>
                <select 
                  value={filterClassification}
                  onChange={(e) => setFilterClassification(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Classifications</option>
                  <option value="A">Class A (High Impact)</option>
                  <option value="B">Class B (Medium Impact)</option>
                  <option value="C">Class C (Low Impact)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <Input placeholder="Search by product name or SKU..." />
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

        {/* Pareto Analysis Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pareto Analysis Results ({filteredData.length} products)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Rank</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Revenue</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Qty Sold</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Revenue %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Cumulative %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Classification</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            item.rank <= 3 ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            {item.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getClassificationIcon(item.classification)}
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.sku} • {item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(item.totalRevenue)}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-900">
                        {item.totalQuantitySold}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          item.revenuePercentage >= 20 ? 'text-green-600' : 
                          item.revenuePercentage >= 10 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.revenuePercentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.cumulativePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.cumulativePercentage.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getClassificationBadge(item.classification)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            <TrendingUp className="w-4 h-4" />
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
      </div>
    </Layout>
  );
}
