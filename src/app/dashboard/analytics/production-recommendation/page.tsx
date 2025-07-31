'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Package,
  AlertTriangle,
  Filter,
  Download,
  BarChart3
} from 'lucide-react';

interface ProductionRecommendation {
  id: number;
  productName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  averageSales: number;
  recommendedProduction: number;
  daysOfInventory: number;
  urgencyLevel: 'high' | 'medium' | 'low';
  category: string;
}

export default function ProductionRecommendationPage() {
  const [recommendations, setRecommendations] = useState<ProductionRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUrgency, setFilterUrgency] = useState('all');

  useEffect(() => {
    fetchProductionRecommendations();
  }, []);

  const fetchProductionRecommendations = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: ProductionRecommendation[] = [
        {
          id: 1,
          productName: 'Laptop Dell XPS 13',
          sku: 'DELL-XPS-001',
          currentStock: 5,
          minStock: 15,
          averageSales: 8,
          recommendedProduction: 25,
          daysOfInventory: 5,
          urgencyLevel: 'high',
          category: 'Electronics'
        },
        {
          id: 2,
          productName: 'iPhone 14 Pro',
          sku: 'APPL-IP14-001',
          currentStock: 12,
          minStock: 20,
          averageSales: 6,
          recommendedProduction: 15,
          daysOfInventory: 14,
          urgencyLevel: 'medium',
          category: 'Electronics'
        },
        {
          id: 3,
          productName: 'Samsung Galaxy S24',
          sku: 'SAMS-S24-001',
          currentStock: 3,
          minStock: 10,
          averageSales: 4,
          recommendedProduction: 20,
          daysOfInventory: 7,
          urgencyLevel: 'high',
          category: 'Electronics'
        },
        {
          id: 4,
          productName: 'MacBook Air M2',
          sku: 'APPL-MBA-001',
          currentStock: 18,
          minStock: 15,
          averageSales: 3,
          recommendedProduction: 10,
          daysOfInventory: 21,
          urgencyLevel: 'low',
          category: 'Electronics'
        }
      ];
      setRecommendations(mockData);
    } catch (error) {
      console.error('Error fetching production recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Package className="w-4 h-4 text-green-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredRecommendations = filterUrgency === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.urgencyLevel === filterUrgency);

  const totalHighPriority = recommendations.filter(r => r.urgencyLevel === 'high').length;
  const totalMediumPriority = recommendations.filter(r => r.urgencyLevel === 'medium').length;
  const totalLowPriority = recommendations.filter(r => r.urgencyLevel === 'low').length;
  const totalRecommendedProduction = recommendations.reduce((sum, item) => sum + item.recommendedProduction, 0);

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
              <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Produksi Barang</h1>
              <p className="text-gray-600 mt-1">Analisis dan rekomendasi produksi berdasarkan stok dan penjualan</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Recommendations
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
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">{totalHighPriority}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Medium Priority</p>
                  <p className="text-2xl font-bold text-yellow-600">{totalMediumPriority}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Priority</p>
                  <p className="text-2xl font-bold text-green-600">{totalLowPriority}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Production Rec.</p>
                  <p className="text-2xl font-bold text-blue-600">{totalRecommendedProduction}</p>
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
                  Filter by Priority
                </label>
                <select 
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
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

        {/* Production Recommendations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Production Recommendations ({filteredRecommendations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Current Stock</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Min Stock</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Avg Sales/Day</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Days of Inventory</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Recommended Production</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Priority</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecommendations.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getUrgencyIcon(item.urgencyLevel)}
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.sku} • {item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {item.currentStock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {item.minStock}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-900">
                        {item.averageSales}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          item.daysOfInventory <= 7 ? 'text-red-600' : 
                          item.daysOfInventory <= 14 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {item.daysOfInventory} days
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-bold text-blue-600">
                          {item.recommendedProduction}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getUrgencyBadge(item.urgencyLevel)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            Create PO
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
