'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Edit2, 
  Eye,
  Calendar,
  User,
  DollarSign,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  FileText
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  supplierCode: string;
  orderDate: string;
  requestedDate: string;
  expectedDelivery: string;
  status: 'draft' | 'pending' | 'approved' | 'sent' | 'partial' | 'received' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  currency: string;
  paymentTerms: string;
  deliveryAddress: string;
  requestedBy: string;
  approvedBy?: string;
  notes?: string;
  items: PurchaseOrderItem[];
}

interface PurchaseOrderItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  specification: string;
  requestedQty: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  receivedQty?: number;
  notes?: string;
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2025-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    supplierCode: 'SUP-001',
    orderDate: '2025-01-15',
    requestedDate: '2025-01-20',
    expectedDelivery: '2025-01-25',
    status: 'approved',
    priority: 'high',
    totalItems: 5,
    totalQuantity: 250,
    totalAmount: 125000000,
    currency: 'IDR',
    paymentTerms: 'Net 30',
    deliveryAddress: 'Gudang Central Jakarta',
    requestedBy: 'Purchasing Manager',
    approvedBy: 'Operations Director',
    notes: 'Rush order untuk restock barang bestseller',
    items: [
      {
        id: '1',
        productCode: 'TAS-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        specification: 'Warna: Hitam, Ukuran: 40L',
        requestedQty: 50,
        unit: 'pcs',
        unitPrice: 500000,
        totalPrice: 25000000
      },
      {
        id: '2',
        productCode: 'SEP-002',
        productName: 'Sepatu Sport Running',
        category: 'Olahraga',
        specification: 'Size: 38-44, Warna: Putih/Hitam',
        requestedQty: 100,
        unit: 'pcs',
        unitPrice: 750000,
        totalPrice: 75000000
      }
    ]
  },
  {
    id: '2',
    poNumber: 'PO-2025-002',
    supplierName: 'CV Elektronik Nusantara',
    supplierCode: 'SUP-002',
    orderDate: '2025-01-14',
    requestedDate: '2025-01-18',
    expectedDelivery: '2025-01-22',
    status: 'sent',
    priority: 'medium',
    totalItems: 3,
    totalQuantity: 150,
    totalAmount: 225000000,
    currency: 'IDR',
    paymentTerms: 'COD',
    deliveryAddress: 'Gudang Central Jakarta',
    requestedBy: 'Inventory Manager',
    approvedBy: 'Purchasing Director',
    notes: 'Include warranty card untuk semua item elektronik',
    items: [
      {
        id: '3',
        productCode: 'ELK-001',
        productName: 'Smartphone Android 128GB',
        category: 'Elektronik',
        specification: 'RAM: 6GB, Storage: 128GB',
        requestedQty: 75,
        unit: 'pcs',
        unitPrice: 2500000,
        totalPrice: 187500000
      }
    ]
  },
  {
    id: '3',
    poNumber: 'PO-2025-003',
    supplierName: 'PT Tekstil Modern',
    supplierCode: 'SUP-003',
    orderDate: '2025-01-13',
    requestedDate: '2025-01-16',
    expectedDelivery: '2025-01-21',
    status: 'partial',
    priority: 'low',
    totalItems: 4,
    totalQuantity: 300,
    totalAmount: 90000000,
    currency: 'IDR',
    paymentTerms: 'Net 15',
    deliveryAddress: 'Gudang Tangerang',
    requestedBy: 'Category Manager',
    approvedBy: 'Operations Manager',
    notes: 'Partial delivery diperbolehkan',
    items: [
      {
        id: '4',
        productCode: 'KMJ-001',
        productName: 'Kemeja Formal Katun',
        category: 'Fashion',
        specification: 'Size: S-XL, Warna: Putih/Biru',
        requestedQty: 150,
        unit: 'pcs',
        unitPrice: 200000,
        totalPrice: 30000000,
        receivedQty: 75
      }
    ]
  },
  {
    id: '4',
    poNumber: 'PO-2025-004',
    supplierName: 'PT Aksesoris Premium',
    supplierCode: 'SUP-004',
    orderDate: '2025-01-12',
    requestedDate: '2025-01-15',
    expectedDelivery: '2025-01-19',
    status: 'received',
    priority: 'medium',
    totalItems: 6,
    totalQuantity: 200,
    totalAmount: 60000000,
    currency: 'IDR',
    paymentTerms: 'Net 30',
    deliveryAddress: 'Gudang Central Jakarta',
    requestedBy: 'Purchasing Staff',
    approvedBy: 'Purchasing Manager',
    notes: 'Semua item sudah diterima dengan kondisi baik',
    items: [
      {
        id: '5',
        productCode: 'JAM-001',
        productName: 'Jam Tangan Digital',
        category: 'Aksesoris',
        specification: 'Water resistant, LED display',
        requestedQty: 100,
        unit: 'pcs',
        unitPrice: 300000,
        totalPrice: 30000000,
        receivedQty: 100
      }
    ]
  },
  {
    id: '5',
    poNumber: 'PO-2025-005',
    supplierName: 'CV Olahraga Sejahtera',
    supplierCode: 'SUP-005',
    orderDate: '2025-01-10',
    requestedDate: '2025-01-12',
    expectedDelivery: '2025-01-17',
    status: 'cancelled',
    priority: 'urgent',
    totalItems: 2,
    totalQuantity: 80,
    totalAmount: 40000000,
    currency: 'IDR',
    paymentTerms: 'Advance 50%',
    deliveryAddress: 'Gudang Surabaya',
    requestedBy: 'Regional Manager',
    notes: 'Dibatalkan karena supplier tidak bisa memenuhi timeline',
    items: [
      {
        id: '6',
        productCode: 'BOL-001',
        productName: 'Bola Sepak Official',
        category: 'Olahraga',
        specification: 'FIFA approved, Size 5',
        requestedQty: 40,
        unit: 'pcs',
        unitPrice: 500000,
        totalPrice: 20000000
      }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
    case 'sent':
      return <Badge className="bg-purple-100 text-purple-800">Sent</Badge>;
    case 'partial':
      return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>;
    case 'received':
      return <Badge className="bg-green-100 text-green-800">Received</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case 'high':
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case 'urgent':
      return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'draft':
      return <FileText className="h-4 w-4 text-gray-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'approved':
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case 'sent':
      return <Truck className="h-4 w-4 text-purple-600" />;
    case 'partial':
      return <AlertCircle className="h-4 w-4 text-orange-600" />;
    case 'received':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'cancelled':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function ProductPurchaseOrderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredOrders = mockPurchaseOrders.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplierCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || order.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalOrders = filteredOrders.length;
  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = filteredOrders.filter(o => ['pending', 'approved', 'sent'].includes(o.status)).length;
  const urgentOrders = filteredOrders.filter(o => o.priority === 'urgent' && o.status !== 'received' && o.status !== 'cancelled').length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Order Barang</h1>
            <p className="text-muted-foreground">
              Kelola purchase order untuk pengadaan barang
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Buat PO Baru
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total PO</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold text-orange-600">{pendingOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Urgent Orders</p>
                <p className="text-2xl font-bold text-red-600">{urgentOrders}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari PO number, supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="sent">Sent</option>
              <option value="partial">Partial</option>
              <option value="received">Received</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </Card>

        {/* Purchase Orders Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Purchase Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">PO Number</th>
                    <th className="text-left p-4">Supplier</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Priority</th>
                    <th className="text-right p-4">Total Amount</th>
                    <th className="text-right p-4">Items</th>
                    <th className="text-left p-4">Dates</th>
                    <th className="text-left p-4">Requested By</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.poNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.paymentTerms}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.supplierName}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.supplierCode}
                          </div>
                          <div className="text-xs text-blue-600">
                            {order.deliveryAddress}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(order.status)}
                          {getStatusBadge(order.status)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getPriorityBadge(order.priority)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(order.totalAmount)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.currency}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">{order.totalItems} items</div>
                        <div className="text-sm text-muted-foreground">
                          {order.totalQuantity} pcs
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            Order: {order.orderDate}
                          </div>
                          <div className="flex items-center">
                            <Truck className="h-3 w-3 mr-1 text-blue-600" />
                            Expected: {order.expectedDelivery}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            {order.requestedBy}
                          </div>
                          {order.approvedBy && (
                            <div className="flex items-center text-green-600 mt-1">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {order.approvedBy}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {order.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Received Orders
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredOrders.filter(o => o.status === 'received').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-purple-600" />
                  In Transit
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredOrders.filter(o => o.status === 'sent').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                  Pending Approval
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredOrders.filter(o => o.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-orange-600" />
                  Partial Received
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredOrders.filter(o => o.status === 'partial').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Urgent Purchase Orders</h3>
            <div className="space-y-3">
              {filteredOrders
                .filter(o => o.priority === 'urgent' && !['received', 'cancelled'].includes(o.status))
                .slice(0, 5)
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="font-medium">{order.poNumber}</div>
                        <div className="text-muted-foreground">
                          {order.supplierName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        {formatCurrency(order.totalAmount)}
                      </div>
                      <div className="text-muted-foreground">
                        Due: {order.expectedDelivery}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
