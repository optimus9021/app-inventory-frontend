'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Calendar,
  User,
  Package
} from 'lucide-react';
import type { Sale, Customer } from '@/types';

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSales();
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: 'PT Indosat Ooredoo',
        email: 'procurement@indosat.com',
        phone: '+62-21-5555-1001',
        address: 'Jakarta Selatan',
        city: 'Jakarta',
        country: 'Indonesia',
        customerType: 'business',
        creditLimit: 500000000,
        currentBalance: 0,
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+62-812-3456-7890',
        address: 'Bandung',
        city: 'Bandung',
        country: 'Indonesia',
        customerType: 'individual',
        creditLimit: 50000000,
        currentBalance: 0,
        isActive: true,
        createdAt: '2024-01-05'
      }
    ];
    setCustomers(mockCustomers);
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockSales: Sale[] = [
        {
          id: 1,
          saleOrderNumber: 'SO-2024-001',
          customer: {
            id: 1,
            name: 'PT Indosat Ooredoo',
            email: 'procurement@indosat.com',
            phone: '+62-21-5555-1001',
            address: 'Jakarta Selatan',
            city: 'Jakarta',
            country: 'Indonesia',
            customerType: 'business',
            creditLimit: 500000000,
            currentBalance: 0,
            isActive: true,
            createdAt: '2024-01-01'
          },
          items: [
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
              quantity: 5,
              unitPrice: 18500000,
              totalPrice: 92500000,
              discount: 0
            }
          ],
          totalAmount: 101750000,
          status: 'delivered',
          paymentStatus: 'paid',
          orderDate: '2024-01-15T10:30:00Z',
          deliveredDate: '2024-01-20T15:30:00Z',
          notes: 'Corporate order for office equipment'
        },
        {
          id: 2,
          saleOrderNumber: 'SO-2024-002',
          customer: {
            id: 2,
            name: 'John Doe',
            email: 'john.doe@email.com',
            phone: '+62-812-3456-7890',
            address: 'Bandung',
            city: 'Bandung',
            country: 'Indonesia',
            customerType: 'individual',
            creditLimit: 50000000,
            currentBalance: 0,
            isActive: true,
            createdAt: '2024-01-05'
          },
          items: [
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
              quantity: 2,
              unitPrice: 15999000,
              totalPrice: 30998000,
              discount: 1000000
            }
          ],
          totalAmount: 33097800,
          status: 'confirmed',
          paymentStatus: 'pending',
          orderDate: '2024-01-16T14:20:00Z',
          notes: 'Individual customer purchase'
        }
      ];
      setSales(mockSales);
    } catch (error) {
      console.error('Error fetching sales:', error);
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
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      confirmed: { color: 'bg-blue-100 text-blue-800', label: 'Confirmed' },
      shipped: { color: 'bg-purple-100 text-purple-800', label: 'Shipped' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      paid: { color: 'bg-green-100 text-green-800', label: 'Paid' },
      overdue: { color: 'bg-red-100 text-red-800', label: 'Overdue' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const filteredSales = sales.filter(sale =>
    sale.saleOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const completedSales = sales.filter(sale => sale.status === 'delivered').length;
  const pendingSales = sales.filter(sale => sale.paymentStatus === 'pending').length;
  const totalCustomers = customers.length;

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
              <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
              <p className="text-gray-600 mt-1">Kelola pesanan dan penjualan produk</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Customer Baru
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Sales Order Baru
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Sales</p>
                  <p className="text-2xl font-bold text-gray-900">{completedSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
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
                    placeholder="Cari nomor SO atau customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Status</option>
                  <option>Draft</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Payment</option>
                  <option>Pending</option>
                  <option>Partial</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Orders ({filteredSales.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">SO Number</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Payment</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-blue-600">{sale.saleOrderNumber}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">{sale.customer.name}</div>
                            <div className="text-sm text-gray-500">{sale.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-900">{sale.items.length} item(s)</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(sale.status)}
                      </td>
                      <td className="py-3 px-4">
                        {getPaymentStatusBadge(sale.paymentStatus)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(sale.orderDate)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
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
