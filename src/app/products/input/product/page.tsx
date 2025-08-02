'use client';

import React, { useState } from 'react';
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
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Upload,
  Barcode
} from 'lucide-react';

interface ProductInput {
  id: string;
  inputNumber: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  inputDate: string;
  inputType: 'production' | 'purchase' | 'transfer' | 'adjustment' | 'return';
  batchNumber?: string;
  expiryDate?: string;
  location: string;
  supplier?: string;
  reference: string;
  notes?: string;
  inputBy: string;
  verifiedBy?: string;
  status: 'draft' | 'pending' | 'verified' | 'posted' | 'cancelled';
}

const mockProductInputs: ProductInput[] = [
  {
    id: '1',
    inputNumber: 'PIN-2025-001',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    brand: 'BrandA',
    quantity: 100,
    unit: 'pcs',
    unitCost: 175000,
    totalCost: 17500000,
    inputDate: '2025-01-15',
    inputType: 'production',
    batchNumber: 'PROD-001-2025',
    location: 'WH-A1',
    reference: 'PROD-2025-001',
    notes: 'Hasil produksi batch pertama tahun 2025',
    inputBy: 'Production Team',
    verifiedBy: 'Production Manager',
    status: 'posted'
  },
  {
    id: '2',
    inputNumber: 'PIN-2025-002',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    brand: 'BrandB',
    quantity: 75,
    unit: 'pcs',
    unitCost: 220000,
    totalCost: 16500000,
    inputDate: '2025-01-14',
    inputType: 'purchase',
    batchNumber: 'PUR-002-2025',
    location: 'WH-B2',
    supplier: 'Supplier B',
    reference: 'PO-2025-002',
    notes: 'Pembelian dari supplier utama',
    inputBy: 'Purchase Team',
    verifiedBy: 'Warehouse Manager',
    status: 'verified'
  },
  {
    id: '3',
    inputNumber: 'PIN-2025-003',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    brand: 'BrandC',
    quantity: 50,
    unit: 'pcs',
    unitCost: 125000,
    totalCost: 6250000,
    inputDate: '2025-01-13',
    inputType: 'transfer',
    location: 'WH-A2',
    reference: 'TRF-2025-003',
    notes: 'Transfer dari gudang cabang',
    inputBy: 'Warehouse Team',
    status: 'pending'
  },
  {
    id: '4',
    inputNumber: 'PIN-2025-004',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    brand: 'BrandD',
    quantity: 30,
    unit: 'pcs',
    unitCost: 80000,
    totalCost: 2400000,
    inputDate: '2025-01-12',
    inputType: 'adjustment',
    location: 'WH-C1',
    reference: 'ADJ-2025-004',
    notes: 'Penyesuaian stock opname',
    inputBy: 'Inventory Team',
    status: 'draft'
  },
  {
    id: '5',
    inputNumber: 'PIN-2025-005',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    brand: 'BrandE',
    quantity: 25,
    unit: 'pcs',
    unitCost: 150000,
    totalCost: 3750000,
    inputDate: '2025-01-11',
    inputType: 'return',
    location: 'WH-A3',
    reference: 'RTN-2025-005',
    notes: 'Return dari customer yang dibatalkan',
    inputBy: 'Customer Service',
    status: 'cancelled'
  }
];

const getInputTypeBadge = (type: string) => {
  switch (type) {
    case 'production':
      return <Badge className="bg-green-100 text-green-800">Production</Badge>;
    case 'purchase':
      return <Badge className="bg-blue-100 text-blue-800">Purchase</Badge>;
    case 'transfer':
      return <Badge className="bg-purple-100 text-purple-800">Transfer</Badge>;
    case 'adjustment':
      return <Badge className="bg-yellow-100 text-yellow-800">Adjustment</Badge>;
    case 'return':
      return <Badge className="bg-orange-100 text-orange-800">Return</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'verified':
      return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>;
    case 'posted':
      return <Badge className="bg-green-100 text-green-800">Posted</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'draft':
      return <Edit2 className="h-4 w-4 text-gray-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'verified':
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case 'posted':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'cancelled':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

export default function ProductInputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredInputs = mockProductInputs.filter(input => {
    const matchesSearch = input.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         input.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         input.inputNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || input.inputType === selectedType;
    const matchesStatus = selectedStatus === 'all' || input.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalInputs = filteredInputs.length;
  const totalValue = filteredInputs.reduce((sum, input) => sum + input.totalCost, 0);
  const pendingVerification = filteredInputs.filter(i => i.status === 'pending').length;
  const totalQuantity = filteredInputs.reduce((sum, input) => sum + input.quantity, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input Produk</h1>
            <p className="text-muted-foreground">
              Kelola input produk dari berbagai sumber
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Input
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Inputs</p>
                <p className="text-2xl font-bold">{totalInputs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Barcode className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalQuantity} pcs</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingVerification}</p>
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
                  placeholder="Cari produk, kode, atau nomor input..."
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
              <option value="production">Production</option>
              <option value="purchase">Purchase</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
              <option value="return">Return</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="posted">Posted</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </Card>

        {/* Input Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Input Produk</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">No. Input</th>
                    <th className="text-left p-4">Produk</th>
                    <th className="text-center p-4">Tipe</th>
                    <th className="text-right p-4">Quantity</th>
                    <th className="text-right p-4">Total Cost</th>
                    <th className="text-left p-4">Lokasi</th>
                    <th className="text-left p-4">Tanggal</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInputs.map((input) => (
                    <tr key={input.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{input.inputNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            Ref: {input.reference}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{input.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {input.productCode} • {input.category}
                          </div>
                          {input.batchNumber && (
                            <div className="text-xs text-blue-600">
                              Batch: {input.batchNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getInputTypeBadge(input.inputType)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium">
                          {input.quantity} {input.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{formatCurrency(input.unitCost)}
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold">
                        {formatCurrency(input.totalCost)}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{input.location}</Badge>
                        {input.supplier && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {input.supplier}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {input.inputDate}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {input.inputBy}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(input.status)}
                          {getStatusBadge(input.status)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {input.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {(input.status === 'draft' || input.status === 'pending') && (
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
            <h3 className="text-lg font-semibold mb-4">Input Type Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-green-600" />
                  Production
                </span>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">
                    {filteredInputs.filter(i => i.inputType === 'production').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredInputs.filter(i => i.inputType === 'production').reduce((sum, i) => sum + i.totalCost, 0))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-blue-600" />
                  Purchase
                </span>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800">
                    {filteredInputs.filter(i => i.inputType === 'purchase').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredInputs.filter(i => i.inputType === 'purchase').reduce((sum, i) => sum + i.totalCost, 0))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-purple-600" />
                  Transfer
                </span>
                <div className="text-right">
                  <Badge className="bg-purple-100 text-purple-800">
                    {filteredInputs.filter(i => i.inputType === 'transfer').length}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(filteredInputs.filter(i => i.inputType === 'transfer').reduce((sum, i) => sum + i.totalCost, 0))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {filteredInputs
                .sort((a, b) => new Date(b.inputDate).getTime() - new Date(a.inputDate).getTime())
                .slice(0, 5)
                .map((input) => (
                  <div key={input.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(input.status)}
                      <div>
                        <div className="font-medium">{input.productName}</div>
                        <div className="text-muted-foreground">
                          {getInputTypeBadge(input.inputType)} • {input.inputBy}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{input.quantity} {input.unit}</div>
                      <div className="text-muted-foreground">{input.inputDate}</div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
