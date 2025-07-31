'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  Package,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  Archive,
  DollarSign
} from 'lucide-react';

interface DeadstockItem {
  id: number;
  productName: string;
  sku: string;
  currentStock: number;
  lastSaleDate: string;
  daysWithoutSale: number;
  inventoryValue: number;
  recommendation: 'clearance' | 'discount' | 'return' | 'dispose';
  category: string;
  supplier: string;
}

export default function DeadstockRecommendationPage() {
  const [deadstockItems, setDeadstockItems] = useState<DeadstockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRecommendation, setFilterRecommendation] = useState('all');

  useEffect(() => {
    fetchDeadstockRecommendations();
  }, []);

  const fetchDeadstockRecommendations = async () => {
    try {
      setLoading(true);
      // Mock data - replace with actual API call
      const mockData: DeadstockItem[] = [
        {
          id: 1,
          productName: 'Old Smartphone Model X1',
          sku: 'PHONE-X1-001',
          currentStock: 25,
          lastSaleDate: '2023-11-15',
          daysWithoutSale: 245,
          inventoryValue: 62500000,
          recommendation: 'clearance',
          category: 'Electronics',
          supplier: 'PT Tech Supplier'
        },
        {
          id: 2,
          productName: 'Outdated Laptop Series',
          sku: 'LAPTOP-OLD-001',
          currentStock: 8,
          lastSaleDate: '2023-10-20',
          daysWithoutSale: 271,
          inventoryValue: 80000000,
          recommendation: 'return',
          category: 'Electronics',
          supplier: 'PT Computer Dist'
        },
        {
          id: 3,
          productName: 'Legacy Tablet Model',
          sku: 'TABLET-LEG-001',
          currentStock: 15,
          lastSaleDate: '2023-12-01',
          daysWithoutSale: 229,
          inventoryValue: 37500000,
          recommendation: 'discount',
          category: 'Electronics',
          supplier: 'PT Mobile Solutions'
        },
        {
          id: 4,
          productName: 'Discontinued Accessory',
          sku: 'ACC-DISC-001',
          currentStock: 50,
          lastSaleDate: '2023-09-05',
          daysWithoutSale: 316,
          inventoryValue: 12500000,
          recommendation: 'dispose',
          category: 'Accessories',
          supplier: 'PT Parts Supplier'
        }
      ];
      setDeadstockItems(mockData);
    } catch (error) {
      console.error('Error fetching deadstock recommendations:', error);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'clearance':
        return <Badge className="bg-orange-100 text-orange-800">Clearance Sale</Badge>;
      case 'discount':
        return <Badge className="bg-yellow-100 text-yellow-800">Apply Discount</Badge>;
      case 'return':
        return <Badge className="bg-blue-100 text-blue-800">Return to Supplier</Badge>;
      case 'dispose':
        return <Badge className="bg-red-100 text-red-800">Dispose</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'clearance':
        return <TrendingDown className="w-4 h-4 text-orange-500" />;
      case 'discount':
        return <DollarSign className="w-4 h-4 text-yellow-500" />;
      case 'return':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'dispose':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Archive className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredItems = filterRecommendation === 'all' 
    ? deadstockItems 
    : deadstockItems.filter(item => item.recommendation === filterRecommendation);

  const totalDeadstockItems = deadstockItems.length;
  const totalInventoryValue = deadstockItems.reduce((sum, item) => sum + item.inventoryValue, 0);
  const totalUnits = deadstockItems.reduce((sum, item) => sum + item.currentStock, 0);
  const avgDaysWithoutSale = deadstockItems.reduce((sum, item) => sum + item.daysWithoutSale, 0) / deadstockItems.length;

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
              <h1 className="text-2xl font-bold text-gray-900">Rekomendasi Barang Dead Stock</h1>
              <p className="text-gray-600 mt-1">Analisis dan rekomendasi untuk barang yang tidak bergerak</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <Archive className="w-4 h-4 mr-2" />
                Bulk Actions
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
                  <p className="text-sm font-medium text-gray-600">Total Deadstock Items</p>
                  <p className="text-2xl font-bold text-red-600">{totalDeadstockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                  <p className="text-lg font-bold text-orange-600">
                    {formatCurrency(totalInventoryValue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Units</p>
                  <p className="text-2xl font-bold text-blue-600">{totalUnits}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Days No Sale</p>
                  <p className="text-2xl font-bold text-purple-600">{Math.round(avgDaysWithoutSale)}</p>
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
                  Filter by Recommendation
                </label>
                <select 
                  value={filterRecommendation}
                  onChange={(e) => setFilterRecommendation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Recommendations</option>
                  <option value="clearance">Clearance Sale</option>
                  <option value="discount">Apply Discount</option>
                  <option value="return">Return to Supplier</option>
                  <option value="dispose">Dispose</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <Input placeholder="Search by product name or SKU..." />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days Without Sale
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Days</option>
                  <option value="90">90+ Days</option>
                  <option value="180">180+ Days</option>
                  <option value="365">365+ Days</option>
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

        {/* Deadstock Table */}
        <Card>
          <CardHeader>
            <CardTitle>Deadstock Items ({filteredItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Current Stock</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Last Sale Date</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Days No Sale</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Inventory Value</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Recommendation</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getRecommendationIcon(item.recommendation)}
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">{item.sku} • {item.category}</div>
                            <div className="text-xs text-gray-400">{item.supplier}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-medium text-gray-900">{item.currentStock}</span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">
                        {formatDate(item.lastSaleDate)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`font-medium ${
                          item.daysWithoutSale >= 365 ? 'text-red-600' : 
                          item.daysWithoutSale >= 180 ? 'text-orange-600' : 'text-yellow-600'
                        }`}>
                          {item.daysWithoutSale} days
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {formatCurrency(item.inventoryValue)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {getRecommendationBadge(item.recommendation)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm">
                            Execute
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
