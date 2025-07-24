'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Building2,
  Package
} from 'lucide-react';
import type { Purchase } from '@/types';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockPurchases: Purchase[] = [
        {
          id: 1,
          purchaseOrderNumber: 'PO-2024-001',
          supplier: {
            id: 1, name: 'PT Dell Indonesia', contactPerson: 'John Doe',
            email: 'contact@dell.co.id', phone: '+62-21-5555-0001',
            address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
            paymentTerms: 'NET 30', rating: 4.5, isActive: true, createdAt: '2024-01-01'
          },
          items: [],
          totalAmount: 185000000,
          status: 'pending',
          orderDate: '2024-01-15',
          expectedDate: '2024-01-25',
          notes: 'Urgent order untuk restock laptop',
          createdBy: 1
        },
        {
          id: 2,
          purchaseOrderNumber: 'PO-2024-002',
          supplier: {
            id: 2, name: 'PT Apple Indonesia', contactPerson: 'Jane Smith',
            email: 'contact@apple.co.id', phone: '+62-21-5555-0002',
            address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
            paymentTerms: 'NET 15', rating: 4.8, isActive: true, createdAt: '2024-01-01'
          },
          items: [],
          totalAmount: 159990000,
          status: 'approved',
          orderDate: '2024-01-14',
          expectedDate: '2024-01-20',
          receivedDate: '2024-01-19',
          notes: 'Regular restock iPhone',
          createdBy: 1
        },
        {
          id: 3,
          purchaseOrderNumber: 'PO-2024-003',
          supplier: {
            id: 3, name: 'PT Samsung Electronics', contactPerson: 'Kim Lee',
            email: 'contact@samsung.co.id', phone: '+62-21-5555-0003',
            address: 'Jakarta', city: 'Jakarta', country: 'Indonesia',
            paymentTerms: 'NET 30', rating: 4.3, isActive: true, createdAt: '2024-01-01'
          },
          items: [],
          totalAmount: 129990000,
          status: 'received',
          orderDate: '2024-01-10',
          expectedDate: '2024-01-18',
          receivedDate: '2024-01-17',
          notes: 'Bulk order Samsung smartphones',
          createdBy: 1
        }
      ];
      setPurchases(mockPurchases);
    } catch (error) {
      console.error('Error fetching purchases:', error);
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

  const formatDate = (dateString: string) => {
    if (!mounted) return new Date(dateString).toLocaleDateString();
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-blue-100 text-blue-800', label: 'Approved' },
      ordered: { color: 'bg-purple-100 text-purple-800', label: 'Ordered' },
      received: { color: 'bg-green-100 text-green-800', label: 'Received' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredPurchases = purchases.filter(purchase =>
    purchase.purchaseOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Pembelian</h1>
              <p className="text-gray-600 mt-1">Kelola purchase order dan pembelian barang</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Receive Goods
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buat Purchase Order
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total PO</p>
                  <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {purchases.filter(p => p.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Received</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {purchases.filter(p => p.status === 'received').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(purchases.reduce((acc, p) => acc + p.totalAmount, 0))}
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
                    placeholder="Cari PO number atau supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Ordered</option>
                  <option>Received</option>
                  <option>Cancelled</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Supplier</option>
                  <option>PT Dell Indonesia</option>
                  <option>PT Apple Indonesia</option>
                  <option>PT Samsung Electronics</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Purchase Order ({filteredPurchases.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">PO Number</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Expected Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPurchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{purchase.purchaseOrderNumber}</div>
                        {purchase.notes && (
                          <div className="text-sm text-gray-500">{purchase.notes}</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{purchase.supplier.name}</div>
                            <div className="text-sm text-gray-500">{purchase.supplier.contactPerson}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(purchase.orderDate)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {purchase.expectedDate && (
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(purchase.expectedDate)}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {formatCurrency(purchase.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(purchase.status)}
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
