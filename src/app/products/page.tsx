'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';
import type { InventoryItem } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockProducts: InventoryItem[] = [
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
            id: 1, name: 'PT Dell Indonesia', contactPerson: 'John Doe',
            email: 'contact@dell.co.id', phone: '+62-21-5555-0001',
            address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
            paymentTerms: 'NET 30', rating: 4.5, isActive: true, createdAt: '2024-01-01'
          },
          minStock: 5, maxStock: 50, reorderPoint: 10,
          createdAt: '2024-01-01', updatedAt: '2024-01-15', status: 'active'
        },
        {
          id: 2,
          name: 'iPhone 14 Pro',
          description: 'Smartphone premium Apple',
          sku: 'APPL-IP14-001',
          quantity: 8,
          price: 15999000,
          cost: 14000000,
          category: { id: 1, name: 'Electronics', createdAt: '2024-01-01' },
          supplier: { 
            id: 2, name: 'PT Apple Indonesia', contactPerson: 'Jane Smith',
            email: 'contact@apple.co.id', phone: '+62-21-5555-0002',
            address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
            paymentTerms: 'NET 15', rating: 4.8, isActive: true, createdAt: '2024-01-01'
          },
          minStock: 10, maxStock: 30, reorderPoint: 8,
          createdAt: '2024-01-01', updatedAt: '2024-01-15', status: 'active'
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (!mounted) return `Rp ${amount.toLocaleString()}`;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStockStatusBadge = (item: InventoryItem) => {
    if (item.quantity === 0) {
      return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
    } else if (item.quantity <= item.reorderPoint) {
      return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
              <p className="text-gray-600 mt-1">Kelola semua produk dalam inventaris</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Produk</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Produk Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stok Rendah</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.quantity <= p.reorderPoint).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stok Kosong</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.quantity === 0).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari produk atau SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Kategori</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Clothing</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Produk ({filteredProducts.length})</CardTitle>
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
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{product.sku}</td>
                      <td className="py-3 px-4 text-gray-600">{product.category.name}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{product.quantity}</div>
                        <div className="text-sm text-gray-500">Min: {product.minStock}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{formatCurrency(product.price)}</td>
                      <td className="py-3 px-4">
                        {getStockStatusBadge(product)}
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
    </Layout>
  );
}
