'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingDown, 
  TrendingUp,
  Search,
  Filter,
  Plus,
  Eye,
  Calendar,
  Package,
  ArrowRight,
  User
} from 'lucide-react';
import type { StockMovement } from '@/types';

export default function StockMovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockMovements: StockMovement[] = [
        {
          id: 1,
          inventoryItem: {
            id: 1, name: 'Laptop Dell XPS 13', sku: 'DELL-XPS-001',
            description: 'Laptop premium untuk profesional', quantity: 15, price: 18500000, cost: 16000000,
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
          movementType: 'in',
          quantity: 10,
          reason: 'Purchase Order PO-2024-001',
          reference: 'PO-2024-001',
          performedBy: 1,
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          inventoryItem: {
            id: 2, name: 'iPhone 14 Pro', sku: 'APPL-IP14-001',
            description: 'Smartphone premium Apple', quantity: 8, price: 15999000, cost: 14000000,
            category: { id: 1, name: 'Electronics', createdAt: '2024-01-01' },
            supplier: { 
              id: 2, name: 'PT Apple Indonesia', contactPerson: 'Jane Smith',
              email: 'contact@apple.co.id', phone: '+62-21-5555-0002',
              address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
              paymentTerms: 'NET 15', rating: 4.8, isActive: true, createdAt: '2024-01-01'
            },
            minStock: 10, maxStock: 30, reorderPoint: 8,
            createdAt: '2024-01-01', updatedAt: '2024-01-15', status: 'active'
          },
          movementType: 'out',
          quantity: 5,
          reason: 'Sales Order SO-2024-001',
          reference: 'SO-2024-001',
          performedBy: 1,
          createdAt: '2024-01-14T14:20:00Z'
        },
        {
          id: 3,
          inventoryItem: {
            id: 1, name: 'Laptop Dell XPS 13', sku: 'DELL-XPS-001',
            description: 'Laptop premium untuk profesional', quantity: 15, price: 18500000, cost: 16000000,
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
          movementType: 'adjustment',
          quantity: -2,
          reason: 'Stock opname - damaged goods',
          reference: 'ADJ-2024-001',
          performedBy: 1,
          createdAt: '2024-01-13T09:15:00Z'
        }
      ];
      setMovements(mockMovements);
    } catch (error) {
      console.error('Error fetching movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMovementBadge = (type: string, quantity: number) => {
    if (type === 'in') {
      return <Badge className="bg-green-100 text-green-800">Stock In (+{quantity})</Badge>;
    } else if (type === 'out') {
      return <Badge className="bg-red-100 text-red-800">Stock Out (-{quantity})</Badge>;
    } else if (type === 'adjustment') {
      const sign = quantity >= 0 ? '+' : '';
      return <Badge className="bg-blue-100 text-blue-800">Adjustment ({sign}{quantity})</Badge>;
    } else if (type === 'transfer') {
      return <Badge className="bg-purple-100 text-purple-800">Transfer ({quantity})</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800">{type}</Badge>;
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'out':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'adjustment':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'transfer':
        return <ArrowRight className="w-4 h-4 text-purple-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredMovements = movements.filter(movement =>
    movement.inventoryItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.inventoryItem.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.reason.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-bold text-gray-900">Stock Movement</h1>
              <p className="text-gray-600 mt-1">Riwayat pergerakan stok dan inventaris</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Stock Opname
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adjustment Manual
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock In</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {movements.filter(m => m.movementType === 'in').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingDown className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Out</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {movements.filter(m => m.movementType === 'out').length}
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
                  <p className="text-sm font-medium text-gray-600">Adjustments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {movements.filter(m => m.movementType === 'adjustment').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ArrowRight className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Transfers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {movements.filter(m => m.movementType === 'transfer').length}
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
                    placeholder="Cari produk, SKU, atau reason..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Movement</option>
                  <option>Stock In</option>
                  <option>Stock Out</option>
                  <option>Adjustment</option>
                  <option>Transfer</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Hari Ini</option>
                  <option>7 Hari Terakhir</option>
                  <option>30 Hari Terakhir</option>
                  <option>Semua</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Movements Table */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Stock Movement ({filteredMovements.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Produk</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Movement</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reference</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => (
                    <tr key={movement.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getMovementIcon(movement.movementType)}
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{movement.inventoryItem.name}</div>
                            <div className="text-sm text-gray-500">{movement.inventoryItem.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getMovementBadge(movement.movementType, movement.quantity)}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{movement.reason}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {movement.reference || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDateTime(movement.createdAt)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          User #{movement.performedBy}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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
