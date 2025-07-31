'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Search, 
  Plus, 
  Edit2, 
  Eye,
  CheckCircle,
  Calendar,
  User,
  Building,
  Star,
  TrendingUp,
  AlertCircle,
  Clock,
  Download,
  FileText,
  Award,
  Target
} from 'lucide-react';

interface WhitelistSupplier {
  id: string;
  supplierCode: string;
  supplierName: string;
  companyType: 'manufacturer' | 'distributor' | 'trader' | 'agent';
  category: string[];
  whitelistStatus: 'active' | 'pending' | 'suspended' | 'expired' | 'under-review';
  approvalDate: string;
  expiryDate: string;
  rating: number;
  certifications: string[];
  paymentTerms: string[];
  deliveryRegions: string[];
  totalOrders: number;
  totalValue: number;
  lastOrderDate: string;
  performanceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  approvedBy: string;
  reviewedBy?: string;
  notes?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
}

const mockWhitelistSuppliers: WhitelistSupplier[] = [
  {
    id: '1',
    supplierCode: 'WL-SUP-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    companyType: 'manufacturer',
    category: ['Fashion', 'Aksesoris'],
    whitelistStatus: 'active',
    approvalDate: '2024-06-15',
    expiryDate: '2025-06-15',
    rating: 4.8,
    certifications: ['ISO 9001', 'BPOM', 'Halal MUI'],
    paymentTerms: ['Net 30', 'COD', 'LC'],
    deliveryRegions: ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi'],
    totalOrders: 156,
    totalValue: 2400000000,
    lastOrderDate: '2025-01-15',
    performanceScore: 95,
    riskLevel: 'low',
    approvedBy: 'Procurement Director',
    reviewedBy: 'Quality Manager',
    notes: 'Supplier terpercaya dengan track record excellent',
    contactPerson: 'Ahmad Supplier',
    email: 'ahmad@supplierfashion.com',
    phone: '021-12345678',
    address: 'Jl. Industri No. 123, Jakarta Pusat'
  },
  {
    id: '2',
    supplierCode: 'WL-SUP-002',
    supplierName: 'CV Elektronik Nusantara',
    companyType: 'distributor',
    category: ['Elektronik', 'Gadget'],
    whitelistStatus: 'active',
    approvalDate: '2024-08-20',
    expiryDate: '2025-08-20',
    rating: 4.5,
    certifications: ['SNI', 'POSTEL', 'ISO 14001'],
    paymentTerms: ['Net 15', 'Advance 50%'],
    deliveryRegions: ['Jakarta', 'Surabaya', 'Bandung'],
    totalOrders: 89,
    totalValue: 1800000000,
    lastOrderDate: '2025-01-12',
    performanceScore: 88,
    riskLevel: 'low',
    approvedBy: 'Operations Manager',
    reviewedBy: 'Technical Manager',
    notes: 'Spesialis elektronik dengan produk berkualitas',
    contactPerson: 'Budi Electronics',
    email: 'budi@elektroniknusantara.com',
    phone: '031-98765432',
    address: 'Jl. Elektronik No. 456, Surabaya'
  },
  {
    id: '3',
    supplierCode: 'WL-SUP-003',
    supplierName: 'PT Tekstil Modern',
    companyType: 'manufacturer',
    category: ['Fashion', 'Textile'],
    whitelistStatus: 'pending',
    approvalDate: '2025-01-10',
    expiryDate: '2026-01-10',
    rating: 4.2,
    certifications: ['OEKO-TEX', 'GOTS'],
    paymentTerms: ['Net 30', 'LC'],
    deliveryRegions: ['Bandung', 'Jakarta', 'Cirebon'],
    totalOrders: 45,
    totalValue: 900000000,
    lastOrderDate: '2025-01-08',
    performanceScore: 82,
    riskLevel: 'medium',
    approvedBy: 'Procurement Manager',
    notes: 'Pending review untuk perpanjangan whitelist',
    contactPerson: 'Sari Tekstil',
    email: 'sari@tekstilmodern.com',
    phone: '022-11223344',
    address: 'Jl. Tekstil No. 789, Bandung'
  },
  {
    id: '4',
    supplierCode: 'WL-SUP-004',
    supplierName: 'PT Aksesoris Premium',
    companyType: 'trader',
    category: ['Aksesoris', 'Jam Tangan'],
    whitelistStatus: 'under-review',
    approvalDate: '2024-03-15',
    expiryDate: '2025-03-15',
    rating: 4.0,
    certifications: ['ISO 9001'],
    paymentTerms: ['Net 30', 'COD'],
    deliveryRegions: ['Jakarta', 'Tangerang'],
    totalOrders: 67,
    totalValue: 750000000,
    lastOrderDate: '2024-12-20',
    performanceScore: 75,
    riskLevel: 'medium',
    approvedBy: 'Category Manager',
    reviewedBy: 'Compliance Officer',
    notes: 'Sedang dalam review karena beberapa keterlambatan delivery',
    contactPerson: 'Andi Aksesoris',
    email: 'andi@aksesorispremium.com',
    phone: '021-55667788',
    address: 'Jl. Aksesoris No. 321, Jakarta Barat'
  },
  {
    id: '5',
    supplierCode: 'WL-SUP-005',
    supplierName: 'CV Olahraga Sejahtera',
    companyType: 'agent',
    category: ['Olahraga', 'Fitness'],
    whitelistStatus: 'suspended',
    approvalDate: '2024-01-10',
    expiryDate: '2025-01-10',
    rating: 3.5,
    certifications: ['SNI'],
    paymentTerms: ['Advance 50%'],
    deliveryRegions: ['Surabaya', 'Malang'],
    totalOrders: 23,
    totalValue: 460000000,
    lastOrderDate: '2024-11-15',
    performanceScore: 65,
    riskLevel: 'high',
    approvedBy: 'Regional Manager',
    reviewedBy: 'Risk Management',
    notes: 'Suspended karena masalah kualitas produk dan delivery',
    contactPerson: 'Rudi Sports',
    email: 'rudi@olahragasejahtera.com',
    phone: '031-44556677',
    address: 'Jl. Olahraga No. 654, Surabaya'
  },
  {
    id: '6',
    supplierCode: 'WL-SUP-006',
    supplierName: 'PT Digital Tech Indonesia',
    companyType: 'distributor',
    category: ['Elektronik', 'Komputer'],
    whitelistStatus: 'expired',
    approvalDate: '2023-12-01',
    expiryDate: '2024-12-01',
    rating: 4.3,
    certifications: ['ISO 27001', 'SNI'],
    paymentTerms: ['Net 15', 'COD'],
    deliveryRegions: ['Jakarta', 'Bandung', 'Yogyakarta'],
    totalOrders: 112,
    totalValue: 1600000000,
    lastOrderDate: '2024-11-25',
    performanceScore: 85,
    riskLevel: 'low',
    approvedBy: 'IT Manager',
    notes: 'Whitelist expired, menunggu renewal application',
    contactPerson: 'Doni Digital',
    email: 'doni@digitaltech.co.id',
    phone: '021-33445566',
    address: 'Jl. Digital No. 987, Jakarta Selatan'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'suspended':
      return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
    case 'expired':
      return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
    case 'under-review':
      return <Badge className="bg-orange-100 text-orange-800">Under Review</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getCompanyTypeBadge = (type: string) => {
  switch (type) {
    case 'manufacturer':
      return <Badge className="bg-blue-100 text-blue-800">Manufacturer</Badge>;
    case 'distributor':
      return <Badge className="bg-purple-100 text-purple-800">Distributor</Badge>;
    case 'trader':
      return <Badge className="bg-orange-100 text-orange-800">Trader</Badge>;
    case 'agent':
      return <Badge className="bg-green-100 text-green-800">Agent</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    case 'high':
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'suspended':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    case 'expired':
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
    case 'under-review':
      return <Eye className="h-4 w-4 text-orange-600" />;
    default:
      return null;
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
      }`}
    />
  ));
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function WhitelistPurchaseOrderPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredSuppliers = mockWhitelistSuppliers.filter(supplier => {
    const matchesSearch = supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.supplierCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || supplier.whitelistStatus === selectedStatus;
    const matchesType = selectedType === 'all' || supplier.companyType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalSuppliers = filteredSuppliers.length;
  const activeSuppliers = filteredSuppliers.filter(s => s.whitelistStatus === 'active').length;
  const avgRating = filteredSuppliers.reduce((sum, s) => sum + s.rating, 0) / filteredSuppliers.length;
  const totalValue = filteredSuppliers.reduce((sum, s) => sum + s.totalValue, 0);

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Order Whitelist</h1>
            <p className="text-muted-foreground">
              Kelola daftar supplier yang telah disetujui untuk purchase order
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Supplier
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{totalSuppliers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                <p className="text-2xl font-bold text-blue-600">{activeSuppliers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}/5.0</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalValue)}
                </p>
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
                  placeholder="Cari supplier, kode, kategori..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
              <option value="under-review">Under Review</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Tipe</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="distributor">Distributor</option>
              <option value="trader">Trader</option>
              <option value="agent">Agent</option>
            </select>
          </div>
        </Card>

        {/* Whitelist Suppliers Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Supplier Whitelist</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Supplier Info</th>
                    <th className="text-center p-4">Type</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Rating</th>
                    <th className="text-center p-4">Performance</th>
                    <th className="text-center p-4">Risk Level</th>
                    <th className="text-right p-4">Business Value</th>
                    <th className="text-left p-4">Validity</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{supplier.supplierName}</div>
                          <div className="text-sm text-muted-foreground">
                            {supplier.supplierCode}
                          </div>
                          <div className="text-xs text-blue-600">
                            {supplier.category.join(', ')}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {supplier.contactPerson}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getCompanyTypeBadge(supplier.companyType)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(supplier.whitelistStatus)}
                          {getStatusBadge(supplier.whitelistStatus)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getRatingStars(supplier.rating)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {supplier.rating}/5.0
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Target className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">{supplier.performanceScore}%</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {supplier.totalOrders} orders
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getRiskBadge(supplier.riskLevel)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(supplier.totalValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {supplier.totalOrders} orders
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-green-600" />
                            Approved: {supplier.approvalDate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-orange-600" />
                            Expires: {supplier.expiryDate}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            {supplier.approvedBy}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {supplier.whitelistStatus === 'active' && (
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
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Active Suppliers
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredSuppliers.filter(s => s.whitelistStatus === 'active').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                  Pending Review
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredSuppliers.filter(s => s.whitelistStatus === 'pending').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-orange-600" />
                  Under Review
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredSuppliers.filter(s => s.whitelistStatus === 'under-review').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                  Suspended/Expired
                </span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredSuppliers.filter(s => ['suspended', 'expired'].includes(s.whitelistStatus)).length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Suppliers</h3>
            <div className="space-y-3">
              {filteredSuppliers
                .filter(s => s.whitelistStatus === 'active')
                .sort((a, b) => b.performanceScore - a.performanceScore)
                .slice(0, 5)
                .map((supplier) => (
                  <div key={supplier.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">{supplier.supplierName}</div>
                        <div className="text-muted-foreground">
                          {supplier.category.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-600">
                        {supplier.performanceScore}%
                      </div>
                      <div className="text-muted-foreground">
                        {formatCurrency(supplier.totalValue)}
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
