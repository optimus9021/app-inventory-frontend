'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck,
  Package,
  DollarSign
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: {
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  items: {
    productCode: string;
    productName: string;
    category: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: 'draft' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentTerms: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  approvedDate?: string;
}

export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock data
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO001',
      poNumber: 'PO-2024-001',
      supplier: {
        name: 'Samsung Indonesia',
        contactPerson: 'John Doe',
        email: 'john@samsung.co.id',
        phone: '+62-21-1234567'
      },
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-20',
      actualDelivery: '2024-01-20',
      items: [
        {
          productCode: 'SKU-001',
          productName: 'Smartphone Samsung Galaxy A54',
          category: 'Electronics',
          quantity: 50,
          unitPrice: 4200000,
          totalPrice: 210000000
        },
        {
          productCode: 'SKU-002',
          productName: 'Case Samsung Galaxy A54',
          category: 'Accessories',
          quantity: 50,
          unitPrice: 150000,
          totalPrice: 7500000
        }
      ],
      subtotal: 217500000,
      tax: 21750000,
      shippingCost: 500000,
      totalAmount: 239750000,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentTerms: 'Net 30',
      notes: 'Urgent order untuk restock',
      createdBy: 'Purchasing Manager',
      approvedBy: 'Finance Manager',
      approvedDate: '2024-01-15'
    },
    {
      id: 'PO002',
      poNumber: 'PO-2024-002',
      supplier: {
        name: 'ASUS Indonesia',
        contactPerson: 'Jane Smith',
        email: 'jane@asus.co.id',
        phone: '+62-21-2345678'
      },
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-22',
      items: [
        {
          productCode: 'SKU-003',
          productName: 'Laptop ASUS ROG Strix G15',
          category: 'Electronics',
          quantity: 20,
          unitPrice: 14200000,
          totalPrice: 284000000
        }
      ],
      subtotal: 284000000,
      tax: 28400000,
      shippingCost: 750000,
      totalAmount: 313150000,
      status: 'shipped',
      paymentStatus: 'partial',
      paymentTerms: 'Net 45',
      notes: 'Special gaming series order',
      createdBy: 'Product Manager',
      approvedBy: 'CEO',
      approvedDate: '2024-01-14'
    },
    {
      id: 'PO003',
      poNumber: 'PO-2024-003',
      supplier: {
        name: 'Nike Authorized Dealer',
        contactPerson: 'Mike Johnson',
        email: 'mike@nikedealer.com',
        phone: '+62-21-3456789'
      },
      orderDate: '2024-01-13',
      expectedDelivery: '2024-01-25',
      items: [
        {
          productCode: 'SKU-004',
          productName: 'Sepatu Nike Air Force 1',
          category: 'Fashion',
          quantity: 100,
          unitPrice: 1200000,
          totalPrice: 120000000
        },
        {
          productCode: 'SKU-005',
          productName: 'Sepatu Nike Air Max 90',
          category: 'Fashion',
          quantity: 75,
          unitPrice: 1450000,
          totalPrice: 108750000
        }
      ],
      subtotal: 228750000,
      tax: 22875000,
      shippingCost: 600000,
      totalAmount: 252225000,
      status: 'confirmed',
      paymentStatus: 'unpaid',
      paymentTerms: 'Net 30',
      createdBy: 'Category Manager',
      approvedBy: 'Operations Manager',
      approvedDate: '2024-01-13'
    },
    {
      id: 'PO004',
      poNumber: 'PO-2024-004',
      supplier: {
        name: 'Sony Indonesia',
        contactPerson: 'Sarah Wilson',
        email: 'sarah@sony.co.id',
        phone: '+62-21-4567890'
      },
      orderDate: '2024-01-12',
      expectedDelivery: '2024-01-28',
      items: [
        {
          productCode: 'SKU-006',
          productName: 'Headphone Sony WH-1000XM5',
          category: 'Electronics',
          quantity: 30,
          unitPrice: 3800000,
          totalPrice: 114000000
        }
      ],
      subtotal: 114000000,
      tax: 11400000,
      shippingCost: 400000,
      totalAmount: 125800000,
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentTerms: 'Net 30',
      notes: 'Waiting for stock confirmation',
      createdBy: 'Buyer',
      approvedBy: 'Purchasing Manager',
      approvedDate: '2024-01-12'
    },
    {
      id: 'PO005',
      poNumber: 'PO-2024-005',
      supplier: {
        name: 'Casio Indonesia',
        contactPerson: 'David Brown',
        email: 'david@casio.co.id',
        phone: '+62-21-5678901'
      },
      orderDate: '2024-01-11',
      expectedDelivery: '2024-01-30',
      items: [
        {
          productCode: 'SKU-007',
          productName: 'Jam Tangan Casio G-Shock',
          category: 'Accessories',
          quantity: 25,
          unitPrice: 1900000,
          totalPrice: 47500000
        }
      ],
      subtotal: 47500000,
      tax: 4750000,
      shippingCost: 250000,
      totalAmount: 52500000,
      status: 'cancelled',
      paymentStatus: 'unpaid',
      paymentTerms: 'Net 30',
      notes: 'Cancelled due to budget constraints',
      createdBy: 'Junior Buyer'
    }
  ];

  // Statistics
  const totalOrders = purchaseOrders.length;
  const pendingOrders = purchaseOrders.filter(po => po.status === 'pending').length;
  const confirmedOrders = purchaseOrders.filter(po => po.status === 'confirmed').length;
  const deliveredOrders = purchaseOrders.filter(po => po.status === 'delivered').length;
  const totalValue = purchaseOrders
    .filter(po => po.status !== 'cancelled')
    .reduce((sum, po) => sum + po.totalAmount, 0);
  const unpaidOrders = purchaseOrders.filter(po => po.paymentStatus === 'unpaid' && po.status !== 'cancelled').length;

  // Filter orders
  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'draft': { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
      'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'confirmed': { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      'shipped': { label: 'Shipped', color: 'bg-purple-100 text-purple-800', icon: Truck },
      'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: Package },
      'cancelled': { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap['draft'];
  };

  const getPaymentStatusInfo = (status: string) => {
    const statusMap = {
      'unpaid': { label: 'Unpaid', color: 'bg-red-100 text-red-800' },
      'partial': { label: 'Partial', color: 'bg-yellow-100 text-yellow-800' },
      'paid': { label: 'Paid', color: 'bg-green-100 text-green-800' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap['unpaid'];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const isOverdue = (expectedDelivery: string, status: string) => {
    if (status === 'delivered' || status === 'cancelled') return false;
    const today = new Date();
    const expected = new Date(expectedDelivery);
    return today > expected;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
            <p className="text-gray-600">Kelola purchase order dan proses pembelian</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PO
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create PO
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total PO</p>
                <p className="text-2xl font-bold">{formatNumber(totalOrders)}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatNumber(pendingOrders)}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(confirmedOrders)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(deliveredOrders)}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unpaid</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(unpaidOrders)}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Cari PO number, supplier, atau produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Payment</option>
                <option value="unpaid">Unpaid</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Periode</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="quarter">Quarter Ini</option>
              </select>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Purchase Orders Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Purchase Orders ({formatNumber(filteredOrders.length)})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PO Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status);
                    const paymentInfo = getPaymentStatusInfo(order.paymentStatus);
                    const StatusIcon = statusInfo.icon;
                    const overdue = isOverdue(order.expectedDelivery, order.status);
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.poNumber}</div>
                            <div className="text-sm text-gray-500">Order: {order.orderDate}</div>
                            <div className="text-sm text-gray-500">by {order.createdBy}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.supplier.name}</div>
                            <div className="text-sm text-gray-500">{order.supplier.contactPerson}</div>
                            <div className="text-sm text-gray-500">{order.supplier.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            {order.items.slice(0, 2).map((item, index) => (
                              <div key={index} className="text-sm mb-1">
                                <div className="font-medium text-gray-900">{item.productName}</div>
                                <div className="text-gray-500">{formatNumber(item.quantity)} x {formatCurrency(item.unitPrice)}</div>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <div className="text-xs text-blue-600">
                                +{order.items.length - 2} items lainnya
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(order.totalAmount)}</div>
                            <div className="text-xs text-gray-500">
                              Subtotal: {formatCurrency(order.subtotal)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tax: {formatCurrency(order.tax)} | Ship: {formatCurrency(order.shippingCost)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`flex items-center gap-1 ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </Badge>
                          {order.approvedBy && (
                            <div className="text-xs text-gray-500 mt-1">
                              Approved by {order.approvedBy}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={paymentInfo.color}>
                            {paymentInfo.label}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {order.paymentTerms}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              Expected: {order.expectedDelivery}
                            </div>
                            {order.actualDelivery && (
                              <div className="text-sm text-green-600">
                                Actual: {order.actualDelivery}
                              </div>
                            )}
                            {overdue && (
                              <div className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Overdue
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
