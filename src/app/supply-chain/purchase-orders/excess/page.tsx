'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Plus,
  Upload,
  Download,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  User,
  Building,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

interface ExcessPO {
  id: string;
  poNumber: string;
  originalPONumber: string;
  excessDate: string;
  supplier: {
    id: string;
    name: string;
    contact: string;
    rating: number;
  };
  requestedBy: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'delivered' | 'completed' | 'cancelled';
  excessReason: 'demand-increase' | 'safety-stock' | 'promotion' | 'bulk-discount' | 'supplier-minimum' | 'other';
  expectedDelivery: string;
  totalValue: number;
  items: ExcessItem[];
  justification: string;
  riskAssessment: 'low' | 'medium' | 'high';
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
  createdBy: string;
  createdDate: string;
}

interface ExcessItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  originalQuantity: number;
  excessQuantity: number;
  totalQuantity: number;
  unitPrice: number;
  totalPrice: number;
  currentStock: number;
  avgSales: number;
  stockDays: number;
  excessJustification: string;
  storageImpact: 'none' | 'low' | 'medium' | 'high';
  expiryRisk: 'none' | 'low' | 'medium' | 'high';
}

const mockExcessPOs: ExcessPO[] = [
  {
    id: '1',
    poNumber: 'PO-EXC-2025-001',
    originalPONumber: 'PO-PRD-2025-001',
    excessDate: '2025-01-30T08:00:00Z',
    supplier: {
      id: 'SUP-001',
      name: 'PT Supplier Utama',
      contact: 'supplier@utama.com',
      rating: 4.5
    },
    requestedBy: 'Ahmad Sutanto',
    department: 'Sales',
    priority: 'high',
    status: 'pending',
    excessReason: 'demand-increase',
    expectedDelivery: '2025-02-15T00:00:00Z',
    totalValue: 15000000,
    items: [
      {
        id: '1',
        productCode: 'PRD-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        originalQuantity: 200,
        excessQuantity: 100,
        totalQuantity: 300,
        unitPrice: 150000,
        totalPrice: 15000000,
        currentStock: 45,
        avgSales: 25,
        stockDays: 1.8,
        excessJustification: 'Peningkatan demand 40% dari prediksi awal berdasarkan tren musiman',
        storageImpact: 'low',
        expiryRisk: 'none'
      }
    ],
    justification: 'Berdasarkan analisis tren penjualan, demand untuk tas ransel meningkat signifikan menjelang musim sekolah. Diperlukan tambahan stok untuk menghindari stockout.',
    riskAssessment: 'low',
    notes: 'Koordinasi dengan tim warehouse untuk persiapan ruang penyimpanan tambahan',
    createdBy: 'Sales Manager',
    createdDate: '2025-01-30T08:00:00Z'
  },
  {
    id: '2',
    poNumber: 'PO-EXC-2025-002',
    originalPONumber: 'PO-PRD-2025-003',
    excessDate: '2025-01-29T14:30:00Z',
    supplier: {
      id: 'SUP-002',
      name: 'CV Elektronik Jaya',
      contact: 'sales@elektronikjaya.com',
      rating: 4.2
    },
    requestedBy: 'Siti Rahayu',
    department: 'Marketing',
    priority: 'medium',
    status: 'approved',
    excessReason: 'promotion',
    expectedDelivery: '2025-02-10T00:00:00Z',
    totalValue: 25000000,
    items: [
      {
        id: '2',
        productCode: 'PRD-005',
        productName: 'Smartphone Android 128GB',
        category: 'Electronics',
        originalQuantity: 30,
        excessQuantity: 20,
        totalQuantity: 50,
        unitPrice: 2500000,
        totalPrice: 50000000,
        currentStock: 12,
        avgSales: 8,
        stockDays: 1.5,
        excessJustification: 'Persiapan untuk campaign promosi flash sale dengan target penjualan 45 unit',
        storageImpact: 'medium',
        expiryRisk: 'low'
      }
    ],
    justification: 'Excess order untuk mendukung kampanye promosi besar-besaran yang akan meningkatkan penjualan hingga 150%. ROI diperkirakan mencapai 250%.',
    riskAssessment: 'medium',
    approvedBy: 'Director Marketing',
    approvedDate: '2025-01-29T16:45:00Z',
    notes: 'Budget promosi sudah dialokasikan, koordinasi dengan tim digital marketing',
    createdBy: 'Marketing Manager',
    createdDate: '2025-01-29T14:30:00Z'
  },
  {
    id: '3',
    poNumber: 'PO-EXC-2025-003',
    originalPONumber: 'PO-PRD-2025-005',
    excessDate: '2025-01-28T11:15:00Z',
    supplier: {
      id: 'SUP-003',
      name: 'Sport Gear Supplier',
      contact: 'sales@sportgear.com',
      rating: 4.3
    },
    requestedBy: 'Budi Santoso',
    department: 'Procurement',
    priority: 'urgent',
    status: 'ordered',
    excessReason: 'bulk-discount',
    expectedDelivery: '2025-02-05T00:00:00Z',
    totalValue: 35000000,
    items: [
      {
        id: '3',
        productCode: 'PRD-008',
        productName: 'Sepatu Sport Running',
        category: 'Sports',
        originalQuantity: 50,
        excessQuantity: 100,
        totalQuantity: 150,
        unitPrice: 350000,
        totalPrice: 52500000,
        currentStock: 20,
        avgSales: 15,
        stockDays: 1.3,
        excessJustification: 'Bulk discount 25% dari supplier untuk pembelian minimal 150 unit',
        storageImpact: 'high',
        expiryRisk: 'none'
      }
    ],
    justification: 'Peluang mendapatkan discount besar dari supplier dengan syarat pembelian minimum. Penghematan cost mencapai 25% atau setara 17.5 juta rupiah.',
    riskAssessment: 'medium',
    approvedBy: 'Procurement Director',
    approvedDate: '2025-01-28T13:20:00Z',
    notes: 'Perlu koordinasi dengan warehouse untuk ekspansi storage',
    createdBy: 'Procurement Staff',
    createdDate: '2025-01-28T11:15:00Z'
  },
  {
    id: '4',
    poNumber: 'PO-EXC-2025-004',
    originalPONumber: 'PO-PRD-2025-007',
    excessDate: '2025-01-27T09:45:00Z',
    supplier: {
      id: 'SUP-004',
      name: 'Fashion Accessories Co',
      contact: 'order@fashionacc.com',
      rating: 3.8
    },
    requestedBy: 'Lisa Permata',
    department: 'Product',
    priority: 'low',
    status: 'cancelled',
    excessReason: 'safety-stock',
    expectedDelivery: '2025-02-12T00:00:00Z',
    totalValue: 8000000,
    items: [
      {
        id: '4',
        productCode: 'PRD-012',
        productName: 'Jam Tangan Digital',
        category: 'Accessories',
        originalQuantity: 75,
        excessQuantity: 40,
        totalQuantity: 115,
        unitPrice: 200000,
        totalPrice: 23000000,
        currentStock: 85,
        avgSales: 12,
        stockDays: 7.1,
        excessJustification: 'Safety stock untuk mengantisipasi keterlambatan supplier selanjutnya',
        storageImpact: 'low',
        expiryRisk: 'medium'
      }
    ],
    justification: 'Safety stock untuk mengantisipasi keterlambatan delivery dari supplier. Namun setelah review, current stock masih sufficient.',
    riskAssessment: 'high',
    notes: 'Cancelled karena current stock sudah mencukupi untuk 7 hari ke depan',
    createdBy: 'Product Manager',
    createdDate: '2025-01-27T09:45:00Z'
  },
  {
    id: '5',
    poNumber: 'PO-EXC-2025-005',
    originalPONumber: 'PO-PRD-2025-010',
    excessDate: '2025-01-26T16:20:00Z',
    supplier: {
      id: 'SUP-005',
      name: 'Home Furniture Ltd',
      contact: 'sales@homefurniture.com',
      rating: 4.6
    },
    requestedBy: 'Andi Wijaya',
    department: 'Retail',
    priority: 'medium',
    status: 'completed',
    excessReason: 'supplier-minimum',
    expectedDelivery: '2025-02-08T00:00:00Z',
    totalValue: 45000000,
    items: [
      {
        id: '5',
        productCode: 'PRD-015',
        productName: 'Furniture Modern',
        category: 'Home & Living',
        originalQuantity: 20,
        excessQuantity: 15,
        totalQuantity: 35,
        unitPrice: 3000000,
        totalPrice: 105000000,
        currentStock: 8,
        avgSales: 5,
        stockDays: 1.6,
        excessJustification: 'Minimum order quantity dari supplier adalah 35 unit',
        storageImpact: 'high',
        expiryRisk: 'none'
      }
    ],
    justification: 'Supplier menetapkan MOQ 35 unit untuk mendapatkan harga terbaik. Meskipun excess, masih dalam batas reasonable untuk cash flow.',
    riskAssessment: 'low',
    approvedBy: 'Retail Director',
    approvedDate: '2025-01-26T18:30:00Z',
    notes: 'Produk sudah diterima dan disimpan di warehouse dengan kondisi baik',
    createdBy: 'Retail Manager',
    createdDate: '2025-01-26T16:20:00Z'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'ordered':
      return <Badge className="bg-blue-100 text-blue-800">Ordered</Badge>;
    case 'delivered':
      return <Badge className="bg-purple-100 text-purple-800">Delivered</Badge>;
    case 'completed':
      return <Badge className="bg-indigo-100 text-indigo-800">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
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
      return <Badge>Unknown</Badge>;
  }
};

const getReasonBadge = (reason: string) => {
  switch (reason) {
    case 'demand-increase':
      return <Badge className="bg-blue-100 text-blue-800">Demand Increase</Badge>;
    case 'safety-stock':
      return <Badge className="bg-green-100 text-green-800">Safety Stock</Badge>;
    case 'promotion':
      return <Badge className="bg-purple-100 text-purple-800">Promotion</Badge>;
    case 'bulk-discount':
      return <Badge className="bg-orange-100 text-orange-800">Bulk Discount</Badge>;
    case 'supplier-minimum':
      return <Badge className="bg-pink-100 text-pink-800">Supplier MOQ</Badge>;
    case 'other':
      return <Badge className="bg-gray-100 text-gray-800">Other</Badge>;
    default:
      return <Badge>Unknown</Badge>;
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
      return <Badge>Unknown</Badge>;
  }
};

const getImpactIcon = (impact: string) => {
  switch (impact) {
    case 'none':
      return <div className="w-2 h-2 rounded-full bg-gray-300"></div>;
    case 'low':
      return <div className="w-2 h-2 rounded-full bg-green-500"></div>;
    case 'medium':
      return <div className="w-2 h-2 rounded-full bg-yellow-500"></div>;
    case 'high':
      return <div className="w-2 h-2 rounded-full bg-red-500"></div>;
    default:
      return <div className="w-2 h-2 rounded-full bg-gray-300"></div>;
  }
};

export default function ExcessPOPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const filteredPOs = mockExcessPOs.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.originalPONumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesReason = selectedReason === 'all' || po.excessReason === selectedReason;
    const matchesRisk = selectedRisk === 'all' || po.riskAssessment === selectedRisk;
    return matchesSearch && matchesStatus && matchesReason && matchesRisk;
  });

  const totalExcess = filteredPOs.length;
  const totalValue = filteredPOs.reduce((sum, po) => sum + po.totalValue, 0);
  const pendingApproval = filteredPOs.filter(po => po.status === 'pending').length;
  const highRisk = filteredPOs.filter(po => po.riskAssessment === 'high').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input PO Lebih</h1>
            <p className="text-muted-foreground">
              Kelola purchase order tambahan untuk memenuhi kebutuhan yang melebihi rencana awal
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Request Excess PO
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Excess PO</p>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(totalExcess)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{formatNumber(pendingApproval)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(highRisk)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari PO number, supplier, atau original PO..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
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
                  <option value="ordered">Ordered</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Alasan</option>
                  <option value="demand-increase">Demand Increase</option>
                  <option value="safety-stock">Safety Stock</option>
                  <option value="promotion">Promotion</option>
                  <option value="bulk-discount">Bulk Discount</option>
                  <option value="supplier-minimum">Supplier MOQ</option>
                  <option value="other">Other</option>
                </select>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Risk Level</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Excess PO List */}
        <div className="space-y-4">
          {filteredPOs.map((po) => (
            <Card key={po.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-lg">{po.poNumber}</span>
                      {getStatusBadge(po.status)}
                      {getPriorityBadge(po.priority)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Original PO: {po.originalPONumber} • 
                      Request Date: {new Date(po.excessDate).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-orange-600">{formatCurrency(po.totalValue)}</div>
                  <div className="text-sm text-muted-foreground">Excess Value</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Supplier</div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{po.supplier.name}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Requested By</div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="font-medium">{po.requestedBy}</span>
                    <span className="text-sm text-muted-foreground">({po.department})</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Excess Reason</div>
                  <div className="mt-1">
                    {getReasonBadge(po.excessReason)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Risk Assessment</div>
                  <div className="mt-1">
                    {getRiskBadge(po.riskAssessment)}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Excess Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Product</th>
                        <th className="text-center p-2">Original Qty</th>
                        <th className="text-center p-2">Excess Qty</th>
                        <th className="text-center p-2">Total Qty</th>
                        <th className="text-center p-2">Current Stock</th>
                        <th className="text-center p-2">Stock Days</th>
                        <th className="text-center p-2">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {po.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{item.productName}</div>
                              <div className="text-xs text-muted-foreground">{item.productCode}</div>
                            </div>
                          </td>
                          <td className="p-2 text-center">{formatNumber(item.originalQuantity)}</td>
                          <td className="p-2 text-center">
                            <span className="font-medium text-orange-600">
                              +{formatNumber(item.excessQuantity)}
                            </span>
                          </td>
                          <td className="p-2 text-center font-medium">{formatNumber(item.totalQuantity)}</td>
                          <td className="p-2 text-center">{formatNumber(item.currentStock)}</td>
                          <td className="p-2 text-center">
                            <span className={`font-medium ${item.stockDays < 3 ? 'text-red-600' : item.stockDays < 7 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {item.stockDays} days
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {getImpactIcon(item.storageImpact)}
                                <span className="text-xs">Storage</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {getImpactIcon(item.expiryRisk)}
                                <span className="text-xs">Expiry</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Justification */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Business Justification:</div>
                <div className="text-sm text-blue-700">{po.justification}</div>
              </div>

              {po.notes && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 mb-1">Notes:</div>
                  <div className="text-sm text-gray-700">{po.notes}</div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Analytics
                  </Button>
                  {po.status === 'draft' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
                {po.approvedBy && (
                  <div className="text-sm text-muted-foreground">
                    Approved by {po.approvedBy} on {new Date(po.approvedDate!).toLocaleDateString('id-ID')}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Risk Analysis Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Analysis Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="font-medium">Low Risk POs</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {filteredPOs.filter(po => po.riskAssessment === 'low').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Safe to proceed with minimal oversight
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Medium Risk POs</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {filteredPOs.filter(po => po.riskAssessment === 'medium').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Requires careful monitoring
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium">High Risk POs</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {filteredPOs.filter(po => po.riskAssessment === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">
                Needs immediate attention
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
