'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Package,
  XCircle,
  Calendar,
  User,
  Download,
  TrendingDown,
  DollarSign
} from 'lucide-react';

interface RejectProduct {
  id: string;
  rejectNumber: string;
  productCode: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalLoss: number;
  rejectDate: string;
  rejectReason: string;
  rejectType: 'supplier' | 'quality' | 'damage' | 'expired' | 'customer-return';
  batchNumber?: string;
  location: string;
  disposition: 'return-supplier' | 'disposal' | 'rework' | 'discount-sale' | 'pending';
  reference: string;
  notes?: string;
  rejectedBy: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'processed' | 'completed';
}

const mockRejectProducts: RejectProduct[] = [
  {
    id: '1',
    rejectNumber: 'REJ-2025-001',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    supplier: 'Supplier A',
    quantity: 5,
    unit: 'pcs',
    unitCost: 175000,
    totalLoss: 875000,
    rejectDate: '2025-01-15',
    rejectReason: 'Cacat produksi - jahitan rusak',
    rejectType: 'quality',
    batchNumber: 'BATCH-001-2025',
    location: 'WH-A1',
    disposition: 'return-supplier',
    reference: 'IB-2025-001',
    notes: 'Ditemukan saat quality check, semua unit batch ini bermasalah',
    rejectedBy: 'QC Team',
    approvedBy: 'Warehouse Manager',
    status: 'completed'
  },
  {
    id: '2',
    rejectNumber: 'REJ-2025-002',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    supplier: 'Supplier B',
    quantity: 3,
    unit: 'pcs',
    unitCost: 220000,
    totalLoss: 660000,
    rejectDate: '2025-01-14',
    rejectReason: 'Rusak saat pengiriman',
    rejectType: 'damage',
    batchNumber: 'BATCH-002-2025',
    location: 'WH-B2',
    disposition: 'disposal',
    reference: 'IB-2025-002',
    notes: 'Box rusak parah, produk tidak bisa diperbaiki',
    rejectedBy: 'Warehouse Team',
    approvedBy: 'Operations Manager',
    status: 'processed'
  },
  {
    id: '3',
    rejectNumber: 'REJ-2025-003',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    supplier: 'Supplier C',
    quantity: 8,
    unit: 'pcs',
    unitCost: 125000,
    totalLoss: 1000000,
    rejectDate: '2025-01-13',
    rejectReason: 'Return dari customer - ukuran tidak sesuai',
    rejectType: 'customer-return',
    location: 'WH-A2',
    disposition: 'discount-sale',
    reference: 'RTN-2025-001',
    notes: 'Masih dalam kondisi baik, bisa dijual dengan diskon',
    rejectedBy: 'Customer Service',
    status: 'approved'
  },
  {
    id: '4',
    rejectNumber: 'REJ-2025-004',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    supplier: 'Supplier D',
    quantity: 2,
    unit: 'pcs',
    unitCost: 80000,
    totalLoss: 160000,
    rejectDate: '2025-01-12',
    rejectReason: 'Baterai bocor saat penyimpanan',
    rejectType: 'quality',
    location: 'WH-C1',
    disposition: 'rework',
    reference: 'INV-2025-004',
    notes: 'Bisa diperbaiki dengan ganti baterai',
    rejectedBy: 'Inventory Team',
    status: 'pending'
  },
  {
    id: '5',
    rejectNumber: 'REJ-2025-005',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    supplier: 'Supplier E',
    quantity: 12,
    unit: 'pcs',
    unitCost: 150000,
    totalLoss: 1800000,
    rejectDate: '2025-01-11',
    rejectReason: 'Warna tidak sesuai spesifikasi',
    rejectType: 'supplier',
    batchNumber: 'BATCH-005-2025',
    location: 'WH-A3',
    disposition: 'return-supplier',
    reference: 'PO-2025-005',
    notes: 'Warna terlalu gelap dari yang dipesan',
    rejectedBy: 'QC Team',
    approvedBy: 'Purchase Manager',
    status: 'completed'
  }
];

const getRejectTypeBadge = (type: string) => {
  switch (type) {
    case 'supplier':
      return <Badge className="bg-red-100 text-red-800">Supplier Issue</Badge>;
    case 'quality':
      return <Badge className="bg-orange-100 text-orange-800">Quality</Badge>;
    case 'damage':
      return <Badge className="bg-yellow-100 text-yellow-800">Damage</Badge>;
    case 'expired':
      return <Badge className="bg-purple-100 text-purple-800">Expired</Badge>;
    case 'customer-return':
      return <Badge className="bg-blue-100 text-blue-800">Customer Return</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getDispositionBadge = (disposition: string) => {
  switch (disposition) {
    case 'return-supplier':
      return <Badge className="bg-blue-100 text-blue-800">Return Supplier</Badge>;
    case 'disposal':
      return <Badge className="bg-red-100 text-red-800">Disposal</Badge>;
    case 'rework':
      return <Badge className="bg-green-100 text-green-800">Rework</Badge>;
    case 'discount-sale':
      return <Badge className="bg-yellow-100 text-yellow-800">Discount Sale</Badge>;
    case 'pending':
      return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
    case 'processed':
      return <Badge className="bg-purple-100 text-purple-800">Processed</Badge>;
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

export default function RejectProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = mockRejectProducts.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.rejectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.rejectType === selectedType;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalItems = filteredProducts.length;
  const totalLoss = filteredProducts.reduce((sum, product) => sum + product.totalLoss, 0);
  const pendingApproval = filteredProducts.filter(p => p.status === 'pending').length;
  const totalQuantity = filteredProducts.reduce((sum, product) => sum + product.quantity, 0);

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
            <h1 className="text-3xl font-bold tracking-tight">Input Produk Reject</h1>
            <p className="text-muted-foreground">
              Kelola produk yang ditolak dan disposisinya
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Reject
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Reject</p>
                <p className="text-2xl font-bold text-red-600">{totalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalQuantity} pcs</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Loss</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(totalLoss)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingApproval}</p>
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
                  placeholder="Cari produk, kode, atau nomor reject..."
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
              <option value="supplier">Supplier Issue</option>
              <option value="quality">Quality</option>
              <option value="damage">Damage</option>
              <option value="expired">Expired</option>
              <option value="customer-return">Customer Return</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="processed">Processed</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </Card>

        {/* Reject Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Produk Reject</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">No. Reject</th>
                    <th className="text-left p-4">Produk</th>
                    <th className="text-center p-4">Tipe Reject</th>
                    <th className="text-right p-4">Quantity</th>
                    <th className="text-right p-4">Total Loss</th>
                    <th className="text-center p-4">Disposition</th>
                    <th className="text-left p-4">Alasan</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.rejectNumber}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {product.rejectDate}
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
                      <td className="p-4 text-center">
                        {getRejectTypeBadge(product.rejectType)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-red-600">
                          {product.quantity} {product.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{formatCurrency(product.unitCost)}
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold text-red-600">
                        {formatCurrency(product.totalLoss)}
                      </td>
                      <td className="p-4 text-center">
                        {getDispositionBadge(product.disposition)}
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          <div className="font-medium text-sm">{product.rejectReason}</div>
                          {product.notes && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {product.notes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(product.status)}
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

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Reject Type Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  Supplier Issue
                </span>
                <div className="text-right">
                  <Badge className="bg-red-100 text-red-800">
                    {filteredProducts.filter(p => p.rejectType === 'supplier').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredProducts.filter(p => p.rejectType === 'supplier').reduce((sum, p) => sum + p.totalLoss, 0))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                  Quality Issues
                </span>
                <div className="text-right">
                  <Badge className="bg-orange-100 text-orange-800">
                    {filteredProducts.filter(p => p.rejectType === 'quality').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredProducts.filter(p => p.rejectType === 'quality').reduce((sum, p) => sum + p.totalLoss, 0))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-yellow-600" />
                  Damage
                </span>
                <div className="text-right">
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {filteredProducts.filter(p => p.rejectType === 'damage').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredProducts.filter(p => p.rejectType === 'damage').reduce((sum, p) => sum + p.totalLoss, 0))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2 text-blue-600" />
                  Customer Return
                </span>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredProducts.filter(p => p.rejectType === 'customer-return').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredProducts.filter(p => p.rejectType === 'customer-return').reduce((sum, p) => sum + p.totalLoss, 0))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Rejects</h3>
            <div className="space-y-3">
              {filteredProducts
                .sort((a, b) => new Date(b.rejectDate).getTime() - new Date(a.rejectDate).getTime())
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-muted-foreground flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {product.rejectedBy}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-red-600 font-medium">{product.quantity} {product.unit}</div>
                      <div className="text-muted-foreground">{product.rejectDate}</div>
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
