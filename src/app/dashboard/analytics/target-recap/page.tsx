'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
  Filter,
  Download,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TargetRecap {
  id: number;
  period: string;
  category: string;
  targetType: 'revenue' | 'quantity' | 'percentage';
  targetValue: number;
  actualValue: number;
  achievement: number;
  variance: number;
  status: 'achieved' | 'exceeded' | 'missed';
  confidenceLevel: number;
  lastUpdated: string;
}

export default function TargetRecapPage() {
  const [targetRecaps, setTargetRecaps] = useState<TargetRecap[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchTargetRecaps();
  }, [filterPeriod, filterType]);

  const fetchTargetRecaps = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: TargetRecap[] = [
        {
          id: 1,
          period: 'Januari 2024',
          category: 'Electronics',
          targetType: 'revenue',
          targetValue: 2500000000,
          actualValue: 2680000000,
          achievement: 107.2,
          variance: 180000000,
          status: 'exceeded',
          confidenceLevel: 95.2,
          lastUpdated: '2024-01-31'
        },
        {
          id: 2,
          period: 'Januari 2024',
          category: 'Electronics',
          targetType: 'quantity',
          targetValue: 500,
          actualValue: 485,
          achievement: 97.0,
          variance: -15,
          status: 'missed',
          confidenceLevel: 88.5,
          lastUpdated: '2024-01-31'
        },
        {
          id: 3,
          period: 'Februari 2024',
          category: 'Electronics',
          targetType: 'revenue',
          targetValue: 2200000000,
          actualValue: 2200000000,
          achievement: 100.0,
          variance: 0,
          status: 'achieved',
          confidenceLevel: 92.1,
          lastUpdated: '2024-02-29'
        },
        {
          id: 4,
          period: 'Februari 2024',
          category: 'Accessories',
          targetType: 'percentage',
          targetValue: 100,
          actualValue: 105.5,
          achievement: 105.5,
          variance: 5.5,
          status: 'exceeded',
          confidenceLevel: 87.3,
          lastUpdated: '2024-02-29'
        },
        {
          id: 5,
          period: 'Q1 2024',
          category: 'All Categories',
          targetType: 'revenue',
          targetValue: 7500000000,
          actualValue: 7350000000,
          achievement: 98.0,
          variance: -150000000,
          status: 'missed',
          confidenceLevel: 89.7,
          lastUpdated: '2024-03-31'
        }
      ];
      setTargetRecaps(mockData);
    } catch (error) {
      console.error('Error fetching target recaps:', error);
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

  const formatValue = (value: number, type: string) => {
    switch (type) {
      case 'revenue':
        return formatCurrency(value);
      case 'quantity':
        return value.toLocaleString();
      case 'percentage':
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <Badge className="bg-green-100 text-green-800">Exceeded</Badge>;
      case 'achieved':
        return <Badge className="bg-blue-100 text-blue-800">Achieved</Badge>;
      case 'missed':
        return <Badge className="bg-red-100 text-red-800">Missed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'achieved':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'missed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Target className="w-4 h-4 text-gray-600" />;
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

  const filteredRecaps = targetRecaps.filter(recap => {
    const periodMatch = filterPeriod === 'all' || recap.period.includes(filterPeriod);
    const typeMatch = filterType === 'all' || recap.targetType === filterType;
    return periodMatch && typeMatch;
  });

  const achievedCount = filteredRecaps.filter(r => r.status === 'achieved').length;
  const exceededCount = filteredRecaps.filter(r => r.status === 'exceeded').length;
  const missedCount = filteredRecaps.filter(r => r.status === 'missed').length;
  const avgAchievement = filteredRecaps.reduce((sum, r) => sum + r.achievement, 0) / filteredRecaps.length;

  if (loading) {
    return (
      
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      
    );
  }

  return (
    
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rekapitulasi Target</h1>
              <p className="text-gray-600 mt-1">Ringkasan pencapaian target penjualan seluruh periode</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Recap
              </Button>
              <Button>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Achieved Targets</p>
                  <p className="text-2xl font-bold text-blue-600">{achievedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Exceeded Targets</p>
                  <p className="text-2xl font-bold text-green-600">{exceededCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Missed Targets</p>
                  <p className="text-2xl font-bold text-red-600">{missedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Achievement</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {avgAchievement.toFixed(1)}%
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
                  Filter by Period
                </label>
                <select 
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Periods</option>
                  <option value="2024">2024</option>
                  <option value="Q1">Q1 2024</option>
                  <option value="Januari">Januari 2024</option>
                  <option value="Februari">Februari 2024</option>
                  <option value="Maret">Maret 2024</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Target Type
                </label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="revenue">Revenue Targets</option>
                  <option value="quantity">Quantity Targets</option>
                  <option value="percentage">Percentage Targets</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <Input placeholder="Search by category or period..." />
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

        {/* Target Recap Table */}
        <Card>
          <CardHeader>
            <CardTitle>Target Recap Summary ({filteredRecaps.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Target</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actual</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Achievement</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Variance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Last Updated</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecaps.map((recap) => (
                    <tr key={recap.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">{recap.period}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{recap.category}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {recap.targetType === 'revenue' && <DollarSign className="w-4 h-4 mr-1 text-green-600" />}
                          {recap.targetType === 'quantity' && <Package className="w-4 h-4 mr-1 text-blue-600" />}
                          {recap.targetType === 'percentage' && <Target className="w-4 h-4 mr-1 text-purple-600" />}
                          <span className="text-sm capitalize">{recap.targetType}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatValue(recap.targetValue, recap.targetType)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatValue(recap.actualValue, recap.targetType)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${
                          recap.achievement >= 100 ? 'text-green-600' : 
                          recap.achievement >= 90 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {recap.achievement.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {getVarianceIcon(recap.variance)}
                          <span className={`ml-1 text-sm ${
                            recap.variance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {recap.targetType === 'revenue' ? 
                              (recap.variance >= 0 ? '+' : '') + formatValue(recap.variance, recap.targetType) :
                              (recap.variance >= 0 ? '+' : '') + recap.variance.toString()
                            }
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {getStatusIcon(recap.status)}
                          <span className="ml-1">
                            {getStatusBadge(recap.status)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {new Date(recap.lastUpdated).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            View Detail
                          </Button>
                          <Button variant="ghost" size="sm">
                            Export
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
    
  );
}
