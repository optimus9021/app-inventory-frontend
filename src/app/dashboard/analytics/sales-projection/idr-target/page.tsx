'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

interface IDRTargetProjection {
  id: number;
  period: string;
  targetAmount: number;
  currentRevenue: number;
  projectedRevenue: number;
  variance: number;
  confidenceLevel: number;
  status: 'on-track' | 'at-risk' | 'exceeded';
  category: string;
  productCategory: string;
}

export default function IDRTargetProjectionPage() {
  const [projections, setProjections] = useState<IDRTargetProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchIDRTargetProjections();
  }, [selectedCategory]);

  const fetchIDRTargetProjections = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: IDRTargetProjection[] = [
        {
          id: 1,
          period: 'Januari 2024',
          targetAmount: 2500000000,
          currentRevenue: 2180000000,
          projectedRevenue: 2650000000,
          variance: 150000000,
          confidenceLevel: 89.2,
          status: 'exceeded',
          category: 'Monthly Target',
          productCategory: 'Electronics'
        },
        {
          id: 2,
          period: 'Februari 2024',
          targetAmount: 2200000000,
          currentRevenue: 1890000000,
          projectedRevenue: 2050000000,
          variance: -150000000,
          confidenceLevel: 83.5,
          status: 'at-risk',
          category: 'Monthly Target',
          productCategory: 'Electronics'
        },
        {
          id: 3,
          period: 'Maret 2024',
          targetAmount: 2800000000,
          currentRevenue: 2650000000,
          projectedRevenue: 2780000000,
          variance: -20000000,
          confidenceLevel: 92.1,
          status: 'on-track',
          category: 'Monthly Target',
          productCategory: 'Electronics'
        },
        {
          id: 4,
          period: 'Q1 2024',
          targetAmount: 7500000000,
          currentRevenue: 6720000000,
          projectedRevenue: 7480000000,
          variance: -20000000,
          confidenceLevel: 88.3,
          status: 'on-track',
          category: 'Quarterly Target',
          productCategory: 'Electronics'
        },
        {
          id: 5,
          period: 'Januari 2024',
          targetAmount: 500000000,
          currentRevenue: 485000000,
          projectedRevenue: 520000000,
          variance: 20000000,
          confidenceLevel: 86.7,
          status: 'exceeded',
          category: 'Monthly Target',
          productCategory: 'Accessories'
        }
      ];
      setProjections(mockData);
    } catch (error) {
      console.error('Error fetching IDR target projections:', error);
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

  const formatCurrencyShort = (amount: number) => {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `Rp ${(amount / 1000).toFixed(1)}K`;
    }
    return formatCurrency(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <Badge className="bg-green-100 text-green-800">Exceeded</Badge>;
      case 'on-track':
        return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>;
      case 'at-risk':
        return <Badge className="bg-red-100 text-red-800">At Risk</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (variance < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Target className="w-4 h-4 text-gray-600" />;
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge className="bg-green-100 text-green-800">High ({confidence}%)</Badge>;
    } else if (confidence >= 80) {
      return <Badge className="bg-yellow-100 text-yellow-800">Medium ({confidence}%)</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Low ({confidence}%)</Badge>;
    }
  };

  const filteredProjections = selectedCategory === 'all' 
    ? projections 
    : projections.filter(p => p.productCategory === selectedCategory);

  const totalTargetAmount = filteredProjections.reduce((sum, p) => sum + p.targetAmount, 0);
  const totalCurrentRevenue = filteredProjections.reduce((sum, p) => sum + p.currentRevenue, 0);
  const totalProjectedRevenue = filteredProjections.reduce((sum, p) => sum + p.projectedRevenue, 0);
  const avgConfidence = filteredProjections.reduce((sum, p) => sum + p.confidenceLevel, 0) / filteredProjections.length;

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
              <h1 className="text-2xl font-bold text-gray-900">Proyeksi Target Penjualan (IDR)</h1>
              <p className="text-gray-600 mt-1">Analisis proyeksi pencapaian target berdasarkan nilai rupiah</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Charts
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Target</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrencyShort(totalTargetAmount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current Revenue</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrencyShort(totalCurrentRevenue)}
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
                  <p className="text-sm font-medium text-gray-600">Projected Revenue</p>
                  <p className="text-lg font-bold text-purple-600">
                    {formatCurrencyShort(totalProjectedRevenue)}
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
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {avgConfidence.toFixed(1)}%
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
                  Product Category
                </label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Software">Software</option>
                  <option value="Services">Services</option>
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
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Targets</option>
                  <option value="monthly">Monthly Target</option>
                  <option value="quarterly">Quarterly Target</option>
                  <option value="yearly">Yearly Target</option>
                </select>
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

        {/* Projection Table */}
        <Card>
          <CardHeader>
            <CardTitle>IDR Target Projection Analysis ({filteredProjections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Target Amount</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Current Revenue</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Projected Revenue</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Variance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Achievement %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Confidence</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjections.map((projection) => (
                    <tr key={projection.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{projection.period}</div>
                            <div className="text-sm text-gray-500">{projection.productCategory}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(projection.targetAmount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium text-blue-600">
                          {formatCurrency(projection.currentRevenue)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-bold ${
                          projection.projectedRevenue >= projection.targetAmount ? 'text-green-600' : 
                          projection.projectedRevenue >= projection.targetAmount * 0.9 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(projection.projectedRevenue)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {getVarianceIcon(projection.variance)}
                          <span className={`ml-1 font-medium ${
                            projection.variance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrencyShort(Math.abs(projection.variance))}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          (projection.projectedRevenue / projection.targetAmount) * 100 >= 100 ? 'text-green-600' : 
                          (projection.projectedRevenue / projection.targetAmount) * 100 >= 90 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {((projection.projectedRevenue / projection.targetAmount) * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getConfidenceBadge(projection.confidenceLevel)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(projection.status)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            Adjust
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
