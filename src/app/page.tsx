'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import type { 
  InventoryItem, 
  DashboardStats, 
  SearchFilters 
} from '@/types';

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    stockStatus: 'all'
  });

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo
      const mockStats: DashboardStats = {
        totalProducts: 156,
        totalValue: 2450000000,
        lowStockItems: 12,
        outOfStockItems: 3,
        pendingOrders: 8,
        totalSalesThisMonth: 850000000,
        totalPurchasesThisMonth: 420000000,
        topSellingProducts: [],
        recentMovements: [],
        supplierPerformance: []
      };

      const mockInventory: InventoryItem[] = [
        {
          id: 1,
          name: 'Laptop Dell XPS 13',
          description: 'Laptop premium untuk profesional',
          sku: 'DELL-XPS-001',
          quantity: 15,
          price: 18500000,
          cost: 16000000,
          category: { id: 1, name: 'Electronics', createdAt: '2024-01-01' },
          supplier: { 
            id: 1, 
            name: 'PT Dell Indonesia', 
            contactPerson: 'John Doe',
            email: 'contact@dell.co.id',
            phone: '+62-21-5555-0001',
            address: 'Jakarta',
            city: 'Jakarta',
            country: 'Indonesia',
            paymentTerms: 'NET 30',
            rating: 4.5,
            isActive: true,
            createdAt: '2024-01-01'
          },
          minStock: 5,
          maxStock: 50,
          reorderPoint: 10,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          status: 'active'
        },
        {
          id: 2,
          name: 'iPhone 14 Pro',
          description: 'Smartphone premium Apple',
          sku: 'APPL-IP14-001',
          quantity: 3,
          price: 15999000,
          cost: 14000000,
          category: { id: 1, name: 'Electronics', createdAt: '2024-01-01' },
          supplier: { 
            id: 2, 
            name: 'PT Apple Indonesia', 
            contactPerson: 'Jane Smith',
            email: 'contact@apple.co.id',
            phone: '+62-21-5555-0002',
            address: 'Jakarta',
            city: 'Jakarta',
            country: 'Indonesia',
            paymentTerms: 'NET 15',
            rating: 4.8,
            isActive: true,
            createdAt: '2024-01-01'
          },
          minStock: 10,
          maxStock: 30,
          reorderPoint: 8,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          status: 'active'
        },
        {
          id: 3,
          name: 'Samsung Galaxy S23',
          description: 'Flagship Android smartphone',
          sku: 'SAMS-GS23-001',
          quantity: 0,
          price: 12999000,
          cost: 11500000,
          category: { id: 1, name: 'Electronics', createdAt: '2024-01-01' },
          supplier: { 
            id: 3, 
            name: 'PT Samsung Electronics', 
            contactPerson: 'Kim Lee',
            email: 'contact@samsung.co.id',
            phone: '+62-21-5555-0003',
            address: 'Jakarta',
            city: 'Jakarta',
            country: 'Indonesia',
            paymentTerms: 'NET 30',
            rating: 4.3,
            isActive: true,
            createdAt: '2024-01-01'
          },
          minStock: 15,
          maxStock: 40,
          reorderPoint: 12,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          status: 'active'
        }
      ];

      setStats(mockStats);
      setInventory(mockInventory);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatusBadge = (item: InventoryItem) => {
    if (item.quantity === 0) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Out of Stock</Badge>;
    } else if (item.quantity <= item.reorderPoint) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
  };

  const formatCurrency = (amount: number) => {
    // Prevent hydration mismatch by checking if component is mounted
    if (!mounted) {
      return `Rp ${amount.toLocaleString()}`;
    }
    
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch {
      // Fallback if Intl.NumberFormat fails
      return `Rp ${amount.toLocaleString()}`;
    }
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Inventory</h1>
                <p className="text-gray-600 mt-1">Kelola inventaris dan supply chain Anda</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Produk
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.totalProducts || 0}
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Semua kategori produk
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Nilai Total Inventaris
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats ? formatCurrency(stats.totalValue) : formatCurrency(0)}
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Stok Menipis
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.lowStockItems || 0}
              </div>
              <p className="text-xs text-yellow-600 mt-1">
                Perlu segera di-restock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pesanan Pending
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.pendingOrders || 0}
              </div>
              <p className="text-xs text-orange-600 mt-1">
                Menunggu approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Cari & Filter Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari produk, SKU, atau kategori..."
                    value={searchFilters.searchTerm}
                    onChange={(e) => setSearchFilters({
                      ...searchFilters,
                      searchTerm: e.target.value
                    })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchFilters.stockStatus}
                  onChange={(e) => setSearchFilters({
                    ...searchFilters,
                    stockStatus: e.target.value as 'all' | 'in-stock' | 'low-stock' | 'out-of-stock'
                  })}
                >
                  <option value="all">Semua Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Lanjutan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Daftar Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Produk</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stok</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Harga</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500">{item.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{item.sku}</td>
                      <td className="py-3 px-4 text-gray-600">{item.category.name}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{item.quantity}</div>
                        <div className="text-sm text-gray-500">Min: {item.minStock}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{formatCurrency(item.price)}</td>
                      <td className="py-3 px-4">
                        {getStockStatusBadge(item)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-500" />
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
    </div>
    </Layout>
  );
}
