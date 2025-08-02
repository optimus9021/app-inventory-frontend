'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Percent,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

interface PercentageProjection {
  id: number;
  period: string;
  targetPercentage: number;
  currentAchievement: number;
  projectedAchievement: number;
  variance: number;
  confidenceLevel: number;
  status: 'on-track' | 'at-risk' | 'exceeded';
  category: string;
}

export default function PercentageProjectionPage() {
  const [projections, setProjections] = useState<PercentageProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  useEffect(() => {
    fetchPercentageProjections();
  }, [selectedTimeframe]);

  const fetchPercentageProjections = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: PercentageProjection[] = [
        {
          id: 1,
          period: 'Januari 2024',
          targetPercentage: 100,
          currentAchievement: 87.5,
          projectedAchievement: 95.2,
          variance: -4.8,
          confidenceLevel: 92.3,
          status: 'at-risk',
          category: 'Monthly Target'
        },
        {
          id: 2,
          period: 'Februari 2024',
          targetPercentage: 100,
          currentAchievement: 92.1,
          projectedAchievement: 103.5,
          variance: 3.5,
          confidenceLevel: 88.7,
          status: 'exceeded',
          category: 'Monthly Target'
        },
        {
          id: 3,
          period: 'Maret 2024',
          targetPercentage: 100,
          currentAchievement: 78.3,
          projectedAchievement: 98.8,
          variance: -1.2,
          confidenceLevel: 85.1,
          status: 'on-track',
          category: 'Monthly Target'
        },
        {
          id: 4,
          period: 'Q1 2024',
          targetPercentage: 100,
          currentAchievement: 85.9,
          projectedAchievement: 99.1,
          variance: -0.9,
          confidenceLevel: 91.2,
          status: 'on-track',
          category: 'Quarterly Target'
        }
      ];
      setProjections(mockData);
    } catch (error) {
      console.error('Error fetching percentage projections:', error);
    } finally {
      setLoading(false);
    }
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

  const avgCurrentAchievement = projections.reduce((sum, p) => sum + p.currentAchievement, 0) / projections.length;
  const avgProjectedAchievement = projections.reduce((sum, p) => sum + p.projectedAchievement, 0) / projections.length;
  const avgConfidence = projections.reduce((sum, p) => sum + p.confidenceLevel, 0) / projections.length;
  const onTrackCount = projections.filter(p => p.status === 'on-track' || p.status === 'exceeded').length;

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
              <h1 className="text-2xl font-bold text-gray-900">Proyeksi Persentase Penjualan</h1>
              <p className="text-gray-600 mt-1">Analisis proyeksi pencapaian target dalam persentase</p>
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
                <Percent className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Current Achievement</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {avgCurrentAchievement.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Projected Achievement</p>
                  <p className="text-2xl font-bold text-green-600">
                    {avgProjectedAchievement.toFixed(1)}%
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
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {avgConfidence.toFixed(1)}%
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
                  <p className="text-sm font-medium text-gray-600">On Track Periods</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {onTrackCount}/{projections.length}
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
                  Timeframe
                </label>
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
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
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Categories</option>
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
            <CardTitle>Percentage Projection Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Period</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Target %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Current %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Projected %</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Variance</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Confidence</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((projection) => (
                    <tr key={projection.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{projection.period}</div>
                            <div className="text-sm text-gray-500">{projection.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-gray-900">
                        {projection.targetPercentage}%
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          projection.currentAchievement >= 90 ? 'text-green-600' : 
                          projection.currentAchievement >= 75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {projection.currentAchievement.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-bold ${
                          projection.projectedAchievement >= 100 ? 'text-green-600' : 
                          projection.projectedAchievement >= 90 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {projection.projectedAchievement.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {getVarianceIcon(projection.variance)}
                          <span className={`ml-1 font-medium ${
                            projection.variance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {projection.variance > 0 ? '+' : ''}{projection.variance.toFixed(1)}%
                          </span>
                        </div>
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
    
  );
}
