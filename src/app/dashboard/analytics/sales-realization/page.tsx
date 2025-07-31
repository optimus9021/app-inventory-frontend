'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Calendar,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

interface SalesRealization {
  id: number;
  period: string;
  targetAmount: number;
  actualAmount: number;
  achievementPercentage: number;
  variance: number;
  status: 'achieved' | 'underperformed' | 'exceeded';
}

export default function SalesRealizationPage() {
  const [salesData, setSalesData] = useState<SalesRealization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  useEffect(() => {
    fetchSalesRealization();
  }, [selectedPeriod]);

  const fetchSalesRealization = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: SalesRealization[] = [
        {
          id: 1,
          period: 'Januari 2024',
          targetAmount: 500000000,
          actualAmount: 520000000,
          achievementPercentage: 104,
          variance: 20000000,
          status: 'exceeded'
        },
        {
          id: 2,
          period: 'Februari 2024',
          targetAmount: 450000000,
          actualAmount: 430000000,
          achievementPercentage: 95.6,
          variance: -20000000,
          status: 'underperformed'
        },
        {
          id: 3,
          period: 'Maret 2024',
          targetAmount: 600000000,
          actualAmount: 600000000,
          achievementPercentage: 100,
          variance: 0,
          status: 'achieved'
        },
        {
          id: 4,
          period: 'April 2024',
          targetAmount: 550000000,
          actualAmount: 580000000,
          achievementPercentage: 105.5,
          variance: 30000000,
          status: 'exceeded'
        }
      ];
      setSalesData(mockData);
    } catch (error) {
      console.error('Error fetching sales realization:', error);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <Badge className="bg-green-100 text-green-800">Exceeded</Badge>;
      case 'achieved':
        return <Badge className="bg-blue-100 text-blue-800">Achieved</Badge>;
      case 'underperformed':
        return <Badge className="bg-red-100 text-red-800">Under Target</Badge>;
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
    return null;
  };

  const totalTarget = salesData.reduce((sum, item) => sum + item.targetAmount, 0);
  const totalActual = salesData.reduce((sum, item) => sum + item.actualAmount, 0);
  const overallAchievement = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

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
              <h1 className="text-2xl font-bold text-gray-900">Realisasi Penjualan</h1>
              <p className="text-gray-600 mt-1">Analisis pencapaian target vs realisasi penjualan</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <Filter className="w-4 h-4 mr-2" />
                Filter
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
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalTarget)}
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
                  <p className="text-sm font-medium text-gray-600">Total Realisasi</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalActual)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Achievement</p>
                  <p className="text-lg font-bold text-gray-900">
                    {overallAchievement.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Variance</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalActual - totalTarget)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Period Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period View
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
                  Date Range
                </label>
                <div className="flex gap-2">
                  <Input type="date" />
                  <span className="self-center">to</span>
                  <Input type="date" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Realization Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Realization Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Target</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actual</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Achievement %</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Variance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="font-medium text-gray-900">{item.period}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(item.targetAmount)}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(item.actualAmount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${
                          item.achievementPercentage >= 100 ? 'text-green-600' : 
                          item.achievementPercentage >= 90 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {item.achievementPercentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end">
                          {getVarianceIcon(item.variance)}
                          <span className={`ml-1 font-medium ${
                            item.variance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(Math.abs(item.variance))}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(item.status)}
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
