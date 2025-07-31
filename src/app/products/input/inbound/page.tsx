'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  User,
  FileText,
  Download
} from 'lucide-react';

interface InboundProduct {
  id: string;
  inboundNumber: string;
  productCode: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  receivedDate: string;
  expectedDate: string;
  batchNumber?: string;
  expiryDate?: string;
  condition: 'good' | 'damaged' | 'partial';
  location: string;
  reference: string;
  notes?: string;
  receivedBy: string;
  status: 'pending' | 'received' | 'quality-check' | 'stored' | 'rejected';
}

const mockInboundProducts: InboundProduct[] = [
  {
    id: '1',
    inboundNumber: 'IB-2025-001',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    supplier: 'Supplier A',
    quantity: 50,
    unit: 'pcs',
    unitCost: 175000,
    totalCost: 8750000,
    receivedDate: '2025-01-15',
    expectedDate: '2025-01-15',
    batchNumber: 'BATCH-001-2025',
    condition: 'good',
    location: 'WH-A1',
    reference: 'PO-2025-001',
    notes: 'Stock masuk sesuai jadwal',
    receivedBy: 'Warehouse Team',
    status: 'stored'
  },
  {
    id: '2',
    inboundNumber: 'IB-2025-002',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    supplier: 'Supplier B',
    quantity: 30,
    unit: 'pcs',
    unitCost: 220000,
    totalCost: 6600000,
    receivedDate: '2025-01-14',
    expectedDate: '2025-01-14',
    batchNumber: 'BATCH-002-2025',
    condition: 'good',
    location: 'WH-B2',
    reference: 'PO-2025-002',
    receivedBy: 'Warehouse Team',
    status: 'quality-check'
  },
  {
    id: '3',
    inboundNumber: 'IB-2025-003',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    supplier: 'Supplier C',
    quantity: 25,
    unit: 'pcs',
    unitCost: 125000,
    totalCost: 3125000,
    receivedDate: '2025-01-13',
    expectedDate: '2025-01-12',
    batchNumber: 'BATCH-003-2025',
    condition: 'partial',
    location: 'WH-A2',
    reference: 'PO-2025-003',
    notes: '5 pcs rusak saat pengiriman',
    receivedBy: 'Warehouse Team',
    status: 'received'
  },
  {
    id: '4',
    inboundNumber: 'IB-2025-004',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    supplier: 'Supplier D',
    quantity: 20,
    unit: 'pcs',
    unitCost: 80000,
    totalCost: 1600000,
    receivedDate: '',
    expectedDate: '2025-01-16',
    condition: 'good',
    location: 'WH-C1',
    reference: 'PO-2025-004',
    receivedBy: '',
    status: 'pending'
  },
  {
    id: '5',
    inboundNumber: 'IB-2025-005',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    supplier: 'Supplier E',
    quantity: 15,
    unit: 'pcs',
    unitCost: 150000,
    totalCost: 2250000,
    receivedDate: '2025-01-10',
    expectedDate: '2025-01-10',
    batchNumber: 'BATCH-005-2025',
    condition: 'damaged',
    location: 'WH-A3',
    reference: 'PO-2025-005',
    notes: 'Kemasan rusak total, produk tidak dapat dijual',
    receivedBy: 'Warehouse Team',
    status: 'rejected'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'received':
      return <Badge className="bg-blue-100 text-blue-800">Diterima</Badge>;
    case 'quality-check':
      return <Badge className="bg-purple-100 text-purple-800">QC</Badge>;
    case 'stored':
      return <Badge className="bg-green-100 text-green-800">Disimpan</Badge>;
    case 'rejected':
      return <Badge className="bg-red-100 text-red-800">Ditolak</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getConditionBadge = (condition: string) => {
  switch (condition) {
    case 'good':
      return <Badge className="bg-green-100 text-green-800">Baik</Badge>;
    case 'damaged':
      return <Badge className="bg-red-100 text-red-800">Rusak</Badge>;
    case 'partial':
      return <Badge className="bg-yellow-100 text-yellow-800">Sebagian</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'received':
      return <Truck className="h-4 w-4 text-blue-600" />;
    case 'quality-check':
      return <AlertTriangle className="h-4 w-4 text-purple-600" />;
    case 'stored':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'rejected':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

export default function InboundProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = mockInboundProducts.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.inboundNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier = selectedSupplier === 'all' || product.supplier === selectedSupplier;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesSupplier && matchesStatus;
  });

  const totalItems = filteredProducts.length;
  const totalValue = filteredProducts.reduce((sum, product) => sum + product.totalCost, 0);
  const pendingItems = filteredProducts.filter(p => p.status === 'pending').length;
  const rejectedItems = filteredProducts.filter(p => p.status === 'rejected').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input Produk Inbound</h1>
            <p className="text-muted-foreground">
              Kelola penerimaan produk masuk dari supplier
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Inbound
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Nilai</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedItems}</p>
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
                  placeholder="Cari produk, kode, atau nomor inbound..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedSupplier}
              onChange={(e) => setSelectedSupplier(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
              <option value="Supplier D">Supplier D</option>
              <option value="Supplier E">Supplier E</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="received">Diterima</option>
              <option value="quality-check">Quality Check</option>
              <option value="stored">Disimpan</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </Card>

        {/* Inbound Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Produk Inbound</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">No. Inbound</th>
                    <th className="text-left p-4">Produk</th>
                    <th className="text-left p-4">Supplier</th>
                    <th className="text-right p-4">Quantity</th>
                    <th className="text-right p-4">Total Cost</th>
                    <th className="text-left p-4">Tanggal</th>
                    <th className="text-center p-4">Kondisi</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-left p-4">Lokasi</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.inboundNumber}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {product.reference}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.productCode} • {product.category}
                          </div>
                          {product.batchNumber && (
                            <div className="text-xs text-blue-600">
                              Batch: {product.batchNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.supplier}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">
                          {product.quantity} {product.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{formatCurrency(product.unitCost)}
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold">
                        {formatCurrency(product.totalCost)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            Expected: {product.expectedDate}
                          </div>
                          {product.receivedDate && (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Received: {product.receivedDate}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getConditionBadge(product.condition)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(product.status)}
                          {getStatusBadge(product.status)}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.location}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          {product.status === 'pending' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Stored
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredProducts.filter(p => p.status === 'stored').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-purple-600" />
                  Quality Check
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredProducts.filter(p => p.status === 'quality-check').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-blue-600" />
                  Received
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredProducts.filter(p => p.status === 'received').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                  Pending
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {pendingItems}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {filteredProducts
                .filter(p => p.receivedDate)
                .sort((a, b) => new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime())
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(product.status)}
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-muted-foreground flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {product.receivedBy}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>{product.quantity} {product.unit}</div>
                      <div className="text-muted-foreground">{product.receivedDate}</div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
