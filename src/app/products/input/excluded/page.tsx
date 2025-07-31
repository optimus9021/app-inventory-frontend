'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Ban, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Package,
  AlertTriangle,
  Calendar,
  User,
  Shield,
  Download,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

interface ExcludedProduct {
  id: string;
  excludeNumber: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  excludeReason: string;
  excludeType: 'quality-hold' | 'recall' | 'safety-issue' | 'legal-issue' | 'temp-restriction' | 'permanent-ban';
  quantity: number;
  unit: string;
  location: string;
  excludeDate: string;
  expectedResolution?: string;
  reference: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  excludedBy: string;
  approvedBy?: string;
  status: 'active' | 'resolved' | 'expired' | 'cancelled';
}

const mockExcludedProducts: ExcludedProduct[] = [
  {
    id: '1',
    excludeNumber: 'EXC-2025-001',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    brand: 'BrandA',
    excludeReason: 'Quality control issue - zipper defect',
    excludeType: 'quality-hold',
    quantity: 25,
    unit: 'pcs',
    location: 'WH-A1-QH',
    excludeDate: '2025-01-15',
    expectedResolution: '2025-01-20',
    reference: 'QC-2025-001',
    priority: 'high',
    notes: 'Menunggu konfirmasi dari supplier untuk replacement',
    excludedBy: 'QC Manager',
    approvedBy: 'Operations Manager',
    status: 'active'
  },
  {
    id: '2',
    excludeNumber: 'EXC-2025-002',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    brand: 'BrandB',
    excludeReason: 'Product recall - safety compliance',
    excludeType: 'recall',
    quantity: 150,
    unit: 'pcs',
    location: 'WH-B2-ISO',
    excludeDate: '2025-01-12',
    reference: 'RECALL-2025-001',
    priority: 'critical',
    notes: 'Recall dari brand owner karena tidak memenuhi standar keamanan',
    excludedBy: 'Safety Officer',
    approvedBy: 'General Manager',
    status: 'active'
  },
  {
    id: '3',
    excludeNumber: 'EXC-2025-003',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    brand: 'BrandC',
    excludeReason: 'Temporary restriction - supplier audit',
    excludeType: 'temp-restriction',
    quantity: 80,
    unit: 'pcs',
    location: 'WH-A2-HOLD',
    excludeDate: '2025-01-10',
    expectedResolution: '2025-01-25',
    reference: 'AUDIT-2025-003',
    priority: 'medium',
    notes: 'Menunggu hasil audit supplier selesai',
    excludedBy: 'Compliance Team',
    approvedBy: 'Procurement Manager',
    status: 'active'
  },
  {
    id: '4',
    excludeNumber: 'EXC-2024-045',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    brand: 'BrandD',
    excludeReason: 'Quality hold resolved - released for sale',
    excludeType: 'quality-hold',
    quantity: 40,
    unit: 'pcs',
    location: 'WH-C1',
    excludeDate: '2024-12-20',
    expectedResolution: '2025-01-05',
    reference: 'QC-2024-045',
    priority: 'low',
    notes: 'Issue telah resolved, produk sudah bisa dijual normal',
    excludedBy: 'QC Team',
    approvedBy: 'QC Manager',
    status: 'resolved'
  },
  {
    id: '5',
    excludeNumber: 'EXC-2024-038',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    brand: 'BrandE',
    excludeReason: 'Legal issue - trademark dispute',
    excludeType: 'legal-issue',
    quantity: 200,
    unit: 'pcs',
    location: 'WH-A3-LEGAL',
    excludeDate: '2024-11-15',
    reference: 'LEGAL-2024-005',
    priority: 'critical',
    notes: 'Permanent ban karena sengketa trademark yang tidak terselesaikan',
    excludedBy: 'Legal Team',
    approvedBy: 'Legal Manager',
    status: 'expired'
  }
];

const getExcludeTypeBadge = (type: string) => {
  switch (type) {
    case 'quality-hold':
      return <Badge className="bg-yellow-100 text-yellow-800">Quality Hold</Badge>;
    case 'recall':
      return <Badge className="bg-red-100 text-red-800">Recall</Badge>;
    case 'safety-issue':
      return <Badge className="bg-red-100 text-red-800">Safety Issue</Badge>;
    case 'legal-issue':
      return <Badge className="bg-purple-100 text-purple-800">Legal Issue</Badge>;
    case 'temp-restriction':
      return <Badge className="bg-orange-100 text-orange-800">Temp Restriction</Badge>;
    case 'permanent-ban':
      return <Badge className="bg-gray-100 text-gray-800">Permanent Ban</Badge>;
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-red-100 text-red-800">Active</Badge>;
    case 'resolved':
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
    case 'expired':
      return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
    case 'cancelled':
      return <Badge className="bg-blue-100 text-blue-800">Cancelled</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Ban className="h-4 w-4 text-red-600" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'expired':
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    case 'cancelled':
      return <RefreshCw className="h-4 w-4 text-blue-600" />;
    default:
      return null;
  }
};

export default function ExcludedProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = mockExcludedProducts.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.excludeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || product.excludeType === selectedType;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalExcluded = filteredProducts.length;
  const activeExclusions = filteredProducts.filter(p => p.status === 'active').length;
  const criticalIssues = filteredProducts.filter(p => p.priority === 'critical' && p.status === 'active').length;
  const totalQuantity = filteredProducts.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input Barang Yang Dikecualikan</h1>
            <p className="text-muted-foreground">
              Kelola produk yang dikecualikan dari penjualan
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Exclusion
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Ban className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Excluded</p>
                <p className="text-2xl font-bold text-red-600">{totalExcluded}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Exclusions</p>
                <p className="text-2xl font-bold text-orange-600">{activeExclusions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-purple-600">{criticalIssues}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalQuantity} pcs</p>
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
                  placeholder="Cari produk, kode, atau nomor exclusion..."
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
              <option value="quality-hold">Quality Hold</option>
              <option value="recall">Recall</option>
              <option value="safety-issue">Safety Issue</option>
              <option value="legal-issue">Legal Issue</option>
              <option value="temp-restriction">Temp Restriction</option>
              <option value="permanent-ban">Permanent Ban</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </Card>

        {/* Excluded Products Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Barang Yang Dikecualikan</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">No. Exclusion</th>
                    <th className="text-left p-4">Produk</th>
                    <th className="text-center p-4">Tipe</th>
                    <th className="text-right p-4">Quantity</th>
                    <th className="text-center p-4">Priority</th>
                    <th className="text-left p-4">Alasan</th>
                    <th className="text-left p-4">Tanggal</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.excludeNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            Ref: {product.reference}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.productCode} • {product.category}
                          </div>
                          <div className="text-xs text-blue-600">
                            Lokasi: {product.location}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getExcludeTypeBadge(product.excludeType)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-red-600">
                          {product.quantity} {product.unit}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getPriorityBadge(product.priority)}
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          <div className="font-medium text-sm">{product.excludeReason}</div>
                          {product.notes && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {product.notes}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                            Excluded: {product.excludeDate}
                          </div>
                          {product.expectedResolution && (
                            <div className="flex items-center text-green-600 mt-1">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Expected: {product.expectedResolution}
                            </div>
                          )}
                          <div className="flex items-center text-muted-foreground mt-1">
                            <User className="h-3 w-3 mr-1" />
                            {product.excludedBy}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(product.status)}
                          {getStatusBadge(product.status)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {product.status === 'active' && (
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {product.status !== 'resolved' && (
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
            <h3 className="text-lg font-semibold mb-4">Exclusion Type Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                  Quality Hold
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredProducts.filter(p => p.excludeType === 'quality-hold').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Ban className="h-4 w-4 mr-2 text-red-600" />
                  Recall
                </span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredProducts.filter(p => p.excludeType === 'recall').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-purple-600" />
                  Legal Issue
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredProducts.filter(p => p.excludeType === 'legal-issue').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-orange-600" />
                  Temp Restriction
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredProducts.filter(p => p.excludeType === 'temp-restriction').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Priority Issues</h3>
            <div className="space-y-3">
              {filteredProducts
                .filter(p => p.status === 'active')
                .sort((a, b) => {
                  const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
                  return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
                })
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(product.status)}
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className="text-muted-foreground">
                          {getExcludeTypeBadge(product.excludeType)} • {getPriorityBadge(product.priority)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">{product.quantity} {product.unit}</div>
                      <div className="text-muted-foreground">{product.excludeDate}</div>
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
