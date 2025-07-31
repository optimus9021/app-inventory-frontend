'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Search, 
  Plus, 
  Edit2, 
  Eye,
  AlertTriangle,
  Calendar,
  User,
  DollarSign,
  Package,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Truck,
  BarChart3
} from 'lucide-react';

interface ExcessOrder {
  id: string;
  excessNumber: string;
  originalPO: string;
  supplierName: string;
  supplierCode: string;
  detectedDate: string;
  excessType: 'overdelivery' | 'overproduction' | 'forecast-error' | 'cancelled-order';
  category: string;
  totalItems: number;
  totalQuantity: number;
  excessValue: number;
  currency: string;
  status: 'identified' | 'confirmed' | 'action-planned' | 'disposing' | 'disposed' | 'retained';
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionPlan: string;
  responsibleTeam: string;
  expectedResolution: string;
  notes?: string;
  items: ExcessItem[];
}

interface ExcessItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  orderedQty: number;
  receivedQty: number;
  excessQty: number;
  unit: string;
  unitCost: number;
  excessValue: number;
  reason: string;
  disposition: 'return' | 'discount' | 'donate' | 'dispose' | 'retain' | 'transfer';
  notes?: string;
}

const mockExcessOrders: ExcessOrder[] = [
  {
    id: '1',
    excessNumber: 'EXC-2025-001',
    originalPO: 'PO-2025-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    supplierCode: 'SUP-001',
    detectedDate: '2025-01-15',
    excessType: 'overdelivery',
    category: 'Fashion',
    totalItems: 3,
    totalQuantity: 75,
    excessValue: 18750000,
    currency: 'IDR',
    status: 'confirmed',
    priority: 'high',
    actionPlan: 'Return to supplier',
    responsibleTeam: 'Purchasing Team',
    expectedResolution: '2025-01-20',
    notes: 'Supplier mengirim 25% lebih dari pesanan',
    items: [
      {
        id: '1',
        productCode: 'TAS-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        orderedQty: 50,
        receivedQty: 65,
        excessQty: 15,
        unit: 'pcs',
        unitCost: 500000,
        excessValue: 7500000,
        reason: 'Supplier error - overdelivery',
        disposition: 'return'
      },
      {
        id: '2',
        productCode: 'SEP-002',
        productName: 'Sepatu Sport Running',
        category: 'Fashion',
        orderedQty: 100,
        receivedQty: 160,
        excessQty: 60,
        unit: 'pcs',
        unitCost: 750000,
        excessValue: 45000000,
        reason: 'Production overrun',
        disposition: 'discount'
      }
    ]
  },
  {
    id: '2',
    excessNumber: 'EXC-2025-002',
    originalPO: 'PO-2024-089',
    supplierName: 'CV Elektronik Nusantara',
    supplierCode: 'SUP-002',
    detectedDate: '2025-01-12',
    excessType: 'cancelled-order',
    category: 'Elektronik',
    totalItems: 2,
    totalQuantity: 30,
    excessValue: 75000000,
    currency: 'IDR',
    status: 'action-planned',
    priority: 'critical',
    actionPlan: 'Transfer to other outlet',
    responsibleTeam: 'Operations Team',
    expectedResolution: '2025-01-18',
    notes: 'Order dari client dibatalkan mendadak setelah barang diproduksi',
    items: [
      {
        id: '3',
        productCode: 'ELK-001',
        productName: 'Smartphone Android 128GB',
        category: 'Elektronik',
        orderedQty: 0,
        receivedQty: 30,
        excessQty: 30,
        unit: 'pcs',
        unitCost: 2500000,
        excessValue: 75000000,
        reason: 'Client order cancelled',
        disposition: 'transfer'
      }
    ]
  },
  {
    id: '3',
    excessNumber: 'EXC-2025-003',
    originalPO: 'PO-2024-078',
    supplierName: 'PT Tekstil Modern',
    supplierCode: 'SUP-003',
    detectedDate: '2025-01-10',
    excessType: 'forecast-error',
    category: 'Fashion',
    totalItems: 4,
    totalQuantity: 120,
    excessValue: 24000000,
    currency: 'IDR',
    status: 'disposing',
    priority: 'medium',
    actionPlan: 'Clearance sale dengan diskon',
    responsibleTeam: 'Sales Team',
    expectedResolution: '2025-01-25',
    notes: 'Forecast demand terlalu tinggi, real demand 60% dari prediksi',
    items: [
      {
        id: '4',
        productCode: 'KMJ-001',
        productName: 'Kemeja Formal Katun',
        category: 'Fashion',
        orderedQty: 150,
        receivedQty: 150,
        excessQty: 120,
        unit: 'pcs',
        unitCost: 200000,
        excessValue: 24000000,
        reason: 'Demand forecast too high',
        disposition: 'discount'
      }
    ]
  },
  {
    id: '4',
    excessNumber: 'EXC-2024-045',
    originalPO: 'PO-2024-045',
    supplierName: 'PT Aksesoris Premium',
    supplierCode: 'SUP-004',
    detectedDate: '2024-12-15',
    excessType: 'overproduction',
    category: 'Aksesoris',
    totalItems: 2,
    totalQuantity: 50,
    excessValue: 15000000,
    currency: 'IDR',
    status: 'disposed',
    priority: 'low',
    actionPlan: 'Donated to charity',
    responsibleTeam: 'CSR Team',
    expectedResolution: '2024-12-30',
    notes: 'Successfully disposed through charity program',
    items: [
      {
        id: '5',
        productCode: 'JAM-001',
        productName: 'Jam Tangan Digital',
        category: 'Aksesoris',
        orderedQty: 100,
        receivedQty: 150,
        excessQty: 50,
        unit: 'pcs',
        unitCost: 300000,
        excessValue: 15000000,
        reason: 'Supplier overproduction',
        disposition: 'donate'
      }
    ]
  },
  {
    id: '5',
    excessNumber: 'EXC-2024-038',
    originalPO: 'PO-2024-038',
    supplierName: 'CV Olahraga Sejahtera',
    supplierCode: 'SUP-005',
    detectedDate: '2024-11-20',
    excessType: 'overdelivery',
    category: 'Olahraga',
    totalItems: 1,
    totalQuantity: 25,
    excessValue: 12500000,
    currency: 'IDR',
    status: 'retained',
    priority: 'low',
    actionPlan: 'Keep as safety stock',
    responsibleTeam: 'Inventory Team',
    expectedResolution: '2024-12-01',
    notes: 'Diputuskan untuk disimpan sebagai safety stock karena produk bestseller',
    items: [
      {
        id: '6',
        productCode: 'BOL-001',
        productName: 'Bola Sepak Official',
        category: 'Olahraga',
        orderedQty: 40,
        receivedQty: 65,
        excessQty: 25,
        unit: 'pcs',
        unitCost: 500000,
        excessValue: 12500000,
        reason: 'Supplier packaging error',
        disposition: 'retain'
      }
    ]
  }
];

const getExcessTypeBadge = (type: string) => {
  switch (type) {
    case 'overdelivery':
      return <Badge className="bg-orange-100 text-orange-800">Over Delivery</Badge>;
    case 'overproduction':
      return <Badge className="bg-purple-100 text-purple-800">Over Production</Badge>;
    case 'forecast-error':
      return <Badge className="bg-yellow-100 text-yellow-800">Forecast Error</Badge>;
    case 'cancelled-order':
      return <Badge className="bg-red-100 text-red-800">Cancelled Order</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'identified':
      return <Badge className="bg-gray-100 text-gray-800">Identified</Badge>;
    case 'confirmed':
      return <Badge className="bg-yellow-100 text-yellow-800">Confirmed</Badge>;
    case 'action-planned':
      return <Badge className="bg-blue-100 text-blue-800">Action Planned</Badge>;
    case 'disposing':
      return <Badge className="bg-orange-100 text-orange-800">Disposing</Badge>;
    case 'disposed':
      return <Badge className="bg-green-100 text-green-800">Disposed</Badge>;
    case 'retained':
      return <Badge className="bg-purple-100 text-purple-800">Retained</Badge>;
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
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'identified':
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    case 'confirmed':
      return <CheckCircle className="h-4 w-4 text-yellow-600" />;
    case 'action-planned':
      return <FileText className="h-4 w-4 text-blue-600" />;
    case 'disposing':
      return <Truck className="h-4 w-4 text-orange-600" />;
    case 'disposed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'retained':
      return <Package className="h-4 w-4 text-purple-600" />;
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

export default function ExcessPurchaseOrderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = mockExcessOrders.filter(order => {
    const matchesSearch = order.excessNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.originalPO.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || order.excessType === selectedType;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalExcess = filteredOrders.length;
  const totalValue = filteredOrders.reduce((sum, order) => sum + order.excessValue, 0);
  const activeExcess = filteredOrders.filter(o => !['disposed', 'retained'].includes(o.status)).length;
  const criticalExcess = filteredOrders.filter(o => o.priority === 'critical' && !['disposed', 'retained'].includes(o.status)).length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Order Kelebihan</h1>
            <p className="text-muted-foreground">
              Kelola dan analisis kelebihan stok dari purchase order
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Excess
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Excess</p>
                <p className="text-2xl font-bold text-orange-600">{totalExcess}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Excess Value</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Issues</p>
                <p className="text-2xl font-bold text-yellow-600">{activeExcess}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-purple-600">{criticalExcess}</p>
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
                  placeholder="Cari excess number, PO, supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Tipe</option>
              <option value="overdelivery">Over Delivery</option>
              <option value="overproduction">Over Production</option>
              <option value="forecast-error">Forecast Error</option>
              <option value="cancelled-order">Cancelled Order</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="identified">Identified</option>
              <option value="confirmed">Confirmed</option>
              <option value="action-planned">Action Planned</option>
              <option value="disposing">Disposing</option>
              <option value="disposed">Disposed</option>
              <option value="retained">Retained</option>
            </select>
          </div>
        </Card>

        {/* Excess Orders Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Kelebihan Purchase Order</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Excess Number</th>
                    <th className="text-left p-4">Original PO</th>
                    <th className="text-left p-4">Supplier</th>
                    <th className="text-center p-4">Type</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Priority</th>
                    <th className="text-right p-4">Excess Value</th>
                    <th className="text-left p-4">Action Plan</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.excessNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.totalItems} items • {order.totalQuantity} qty
                          </div>
                          <div className="text-xs text-blue-600">
                            Detected: {order.detectedDate}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-blue-600">{order.originalPO}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.category}
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.supplierName}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.supplierCode}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getExcessTypeBadge(order.excessType)}
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
                        <div className="font-medium text-red-600">
                          {formatCurrency(order.excessValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.currency}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          <div className="font-medium text-sm">{order.actionPlan}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {order.responsibleTeam}
                            </div>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due: {order.expectedResolution}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!['disposed', 'retained'].includes(order.status) && (
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
            <h3 className="text-lg font-semibold mb-4">Excess Type Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                  Over Delivery
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredOrders.filter(o => o.excessType === 'overdelivery').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                  Over Production
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredOrders.filter(o => o.excessType === 'overproduction').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                  Forecast Error
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredOrders.filter(o => o.excessType === 'forecast-error').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-red-600" />
                  Cancelled Order
                </span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredOrders.filter(o => o.excessType === 'cancelled-order').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">High Priority Actions</h3>
            <div className="space-y-3">
              {filteredOrders
                .filter(o => ['critical', 'high'].includes(o.priority) && !['disposed', 'retained'].includes(o.status))
                .sort((a, b) => {
                  const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
                  return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
                })
                .slice(0, 5)
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <div>
                        <div className="font-medium">{order.excessNumber}</div>
                        <div className="text-muted-foreground">
                          {getExcessTypeBadge(order.excessType)} • {getPriorityBadge(order.priority)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">
                        {formatCurrency(order.excessValue)}
                      </div>
                      <div className="text-muted-foreground">
                        Due: {order.expectedResolution}
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
