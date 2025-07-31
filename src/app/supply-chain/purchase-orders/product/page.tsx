'use client';

import React, { useState } from 'react';
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
  DollarSign,
  ShoppingCart,
  Clock,
  AlertTriangle,
  Edit,
  Eye,
  Trash2,
  FileText,
  Building,
  TrendingUp,
  User
} from 'lucide-react';

interface ProductPO {
  id: string;
  poNumber: string;
  poDate: string;
  supplier: {
    id: string;
    name: string;
    contact: string;
    rating: number;
  };
  requestedBy: string;
  department: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'partial' | 'completed' | 'cancelled';
  expectedDelivery: string;
  deliveryAddress: string;
  paymentTerms: string;
  currency: 'IDR' | 'USD';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  items: POItem[];
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface POItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  description: string;
  specification: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  expectedDelivery: string;
  notes?: string;
  receivedQuantity?: number;
  status: 'pending' | 'partial' | 'received' | 'cancelled';
}

const mockProductPOs: ProductPO[] = [
  {
    id: '1',
    poNumber: 'PO-PRD-2025-001',
    poDate: '2025-01-30T08:00:00Z',
    supplier: {
      id: 'SUP-001',
      name: 'PT Supplier Utama',
      contact: 'supplier@utama.com',
      rating: 4.5
    },
    requestedBy: 'Ahmad Sutanto',
    department: 'Production',
    priority: 'high',
    status: 'approved',
    expectedDelivery: '2025-02-15T00:00:00Z',
    deliveryAddress: 'Gudang Utama, Jl. Industri No.123, Jakarta',
    paymentTerms: 'Net 30',
    currency: 'IDR',
    subtotal: 45000000,
    tax: 4500000,
    shipping: 500000,
    total: 50000000,
    items: [
      {
        id: '1',
        productCode: 'PRD-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        description: 'Tas ransel berbahan kulit premium dengan kapasitas 25L',
        specification: 'Material: Kulit sintetis, Warna: Hitam, Ukuran: 40x30x15cm',
        quantity: 200,
        unit: 'pcs',
        unitPrice: 150000,
        discount: 5,
        totalPrice: 28500000,
        expectedDelivery: '2025-02-15T00:00:00Z',
        status: 'pending'
      },
      {
        id: '2',
        productCode: 'PRD-008',
        productName: 'Sepatu Sport Running',
        category: 'Sports',
        description: 'Sepatu running dengan teknologi cushioning terbaru',
        specification: 'Material: Mesh breathable, Sol: EVA foam, Ukuran: 39-44',
        quantity: 50,
        unit: 'pairs',
        unitPrice: 350000,
        discount: 10,
        totalPrice: 15750000,
        expectedDelivery: '2025-02-15T00:00:00Z',
        status: 'pending'
      }
    ],
    notes: 'Pastikan kualitas sesuai dengan sample yang telah disetujui',
    approvedBy: 'Manager Procurement',
    approvedDate: '2025-01-30T10:30:00Z',
    createdBy: 'Staff Procurement',
    createdDate: '2025-01-29T14:20:00Z',
    lastModified: '2025-01-30T10:30:00Z'
  },
  {
    id: '2',
    poNumber: 'PO-PRD-2025-002',
    poDate: '2025-01-29T09:15:00Z',
    supplier: {
      id: 'SUP-002',
      name: 'CV Elektronik Jaya',
      contact: 'sales@elektronikjaya.com',
      rating: 4.2
    },
    requestedBy: 'Siti Rahayu',
    department: 'Product Development',
    priority: 'urgent',
    status: 'ordered',
    expectedDelivery: '2025-02-10T00:00:00Z',
    deliveryAddress: 'Gudang B, Jl. Teknologi No.456, Tangerang',
    paymentTerms: 'Net 15',
    currency: 'IDR',
    subtotal: 75000000,
    tax: 7500000,
    shipping: 750000,
    total: 83250000,
    items: [
      {
        id: '3',
        productCode: 'PRD-005',
        productName: 'Smartphone Android 128GB',
        category: 'Electronics',
        description: 'Smartphone Android dengan RAM 6GB dan storage 128GB',
        specification: 'RAM: 6GB, Storage: 128GB, Camera: 48MP, Battery: 4000mAh',
        quantity: 30,
        unit: 'units',
        unitPrice: 2500000,
        discount: 0,
        totalPrice: 75000000,
        expectedDelivery: '2025-02-10T00:00:00Z',
        status: 'pending'
      }
    ],
    notes: 'Urgent untuk launching produk baru bulan depan',
    approvedBy: 'Director',
    approvedDate: '2025-01-29T11:00:00Z',
    createdBy: 'Lead Product Manager',
    createdDate: '2025-01-29T09:15:00Z',
    lastModified: '2025-01-29T11:00:00Z'
  },
  {
    id: '3',
    poNumber: 'PO-PRD-2025-003',
    poDate: '2025-01-28T13:30:00Z',
    supplier: {
      id: 'SUP-003',
      name: 'PT Furniture Modern',
      contact: 'order@furnituremodern.com',
      rating: 4.8
    },
    requestedBy: 'Budi Santoso',
    department: 'Sales',
    priority: 'medium',
    status: 'partial',
    expectedDelivery: '2025-02-20T00:00:00Z',
    deliveryAddress: 'Showroom Jakarta, Jl. Furniture No.789, Jakarta Selatan',
    paymentTerms: 'Net 45',
    currency: 'IDR',
    subtotal: 60000000,
    tax: 6000000,
    shipping: 1000000,
    total: 67000000,
    items: [
      {
        id: '4',
        productCode: 'PRD-015',
        productName: 'Furniture Modern',
        category: 'Home & Living',
        description: 'Set furniture modern untuk ruang tamu',
        specification: 'Material: Kayu jati, Finishing: Natural, Set: Meja + 4 Kursi',
        quantity: 20,
        unit: 'sets',
        unitPrice: 3000000,
        discount: 0,
        totalPrice: 60000000,
        expectedDelivery: '2025-02-20T00:00:00Z',
        receivedQuantity: 12,
        status: 'partial'
      }
    ],
    notes: 'Pengiriman dapat dilakukan bertahap',
    approvedBy: 'Manager Sales',
    approvedDate: '2025-01-28T15:45:00Z',
    createdBy: 'Sales Representative',
    createdDate: '2025-01-28T13:30:00Z',
    lastModified: '2025-01-30T08:15:00Z'
  },
  {
    id: '4',
    poNumber: 'PO-PRD-2025-004',
    poDate: '2025-01-27T11:20:00Z',
    supplier: {
      id: 'SUP-004',
      name: 'Aksesoris Plus',
      contact: 'info@aksesorisplus.com',
      rating: 3.9
    },
    requestedBy: 'Lisa Permata',
    department: 'Marketing',
    priority: 'low',
    status: 'completed',
    expectedDelivery: '2025-02-05T00:00:00Z',
    deliveryAddress: 'Gudang C, Jl. Aksesoris No.321, Bekasi',
    paymentTerms: 'Net 60',
    currency: 'IDR',
    subtotal: 15000000,
    tax: 1500000,
    shipping: 200000,
    total: 16700000,
    items: [
      {
        id: '5',
        productCode: 'PRD-012',
        productName: 'Jam Tangan Digital',
        category: 'Accessories',
        description: 'Jam tangan digital dengan fitur smartwatch',
        specification: 'Display: OLED, Battery: 7 hari, Waterproof: IP68',
        quantity: 75,
        unit: 'pcs',
        unitPrice: 200000,
        discount: 0,
        totalPrice: 15000000,
        expectedDelivery: '2025-02-05T00:00:00Z',
        receivedQuantity: 75,
        status: 'received'
      }
    ],
    notes: 'Produk sudah diterima dengan kondisi baik',
    approvedBy: 'Manager Marketing',
    approvedDate: '2025-01-27T14:00:00Z',
    createdBy: 'Marketing Staff',
    createdDate: '2025-01-27T11:20:00Z',
    lastModified: '2025-01-30T16:30:00Z'
  },
  {
    id: '5',
    poNumber: 'PO-PRD-2025-005',
    poDate: '2025-01-26T16:45:00Z',
    supplier: {
      id: 'SUP-005',
      name: 'Sport Gear Supplier',
      contact: 'sales@sportgear.com',
      rating: 4.3
    },
    requestedBy: 'Andi Wijaya',
    department: 'Retail',
    priority: 'medium',
    status: 'cancelled',
    expectedDelivery: '2025-02-12T00:00:00Z',
    deliveryAddress: 'Toko Retail, Jl. Olahraga No.654, Surabaya',
    paymentTerms: 'Net 30',
    currency: 'IDR',
    subtotal: 25000000,
    tax: 2500000,
    shipping: 300000,
    total: 27800000,
    items: [
      {
        id: '6',
        productCode: 'PRD-020',
        productName: 'Peralatan Gym',
        category: 'Sports',
        description: 'Set peralatan gym lengkap untuk home workout',
        specification: 'Set: Dumbbells, Matras, Resistance bands, Kettlebell',
        quantity: 10,
        unit: 'sets',
        unitPrice: 2500000,
        discount: 0,
        totalPrice: 25000000,
        expectedDelivery: '2025-02-12T00:00:00Z',
        status: 'cancelled'
      }
    ],
    notes: 'Dibatalkan karena perubahan strategi produk',
    createdBy: 'Retail Manager',
    createdDate: '2025-01-26T16:45:00Z',
    lastModified: '2025-01-28T09:20:00Z'
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
    case 'partial':
      return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>;
    case 'completed':
      return <Badge className="bg-purple-100 text-purple-800">Completed</Badge>;
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

const getItemStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="text-yellow-600">Pending</Badge>;
    case 'partial':
      return <Badge variant="outline" className="text-orange-600">Partial</Badge>;
    case 'received':
      return <Badge variant="outline" className="text-green-600">Received</Badge>;
    case 'cancelled':
      return <Badge variant="outline" className="text-red-600">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
      ★
    </span>
  ));
};

export default function ProductPOPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [expandedPO, setExpandedPO] = useState<string | null>(null);

  const filteredPOs = mockProductPOs.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || po.priority === selectedPriority;
    const matchesSupplier = selectedSupplier === 'all' || po.supplier.id === selectedSupplier;
    return matchesSearch && matchesStatus && matchesPriority && matchesSupplier;
  });

  const totalPOs = filteredPOs.length;
  const totalValue = filteredPOs.reduce((sum, po) => sum + po.total, 0);
  const pendingPOs = filteredPOs.filter(po => po.status === 'pending').length;
  const urgentPOs = filteredPOs.filter(po => po.priority === 'urgent').length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input PO Produk</h1>
            <p className="text-muted-foreground">
              Kelola purchase order untuk pengadaan produk dari supplier
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import PO
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Buat PO Baru
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total PO</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(totalPOs)}</p>
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
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{formatNumber(pendingPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent PO</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(urgentPOs)}</p>
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
                    placeholder="Cari PO number, supplier, atau requestor..."
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
                  <option value="partial">Partial</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Prioritas</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <select
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Supplier</option>
                  <option value="SUP-001">PT Supplier Utama</option>
                  <option value="SUP-002">CV Elektronik Jaya</option>
                  <option value="SUP-003">PT Furniture Modern</option>
                  <option value="SUP-004">Aksesoris Plus</option>
                  <option value="SUP-005">Sport Gear Supplier</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Purchase Orders Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Purchase Order Produk</h3>
            <div className="space-y-4">
              {filteredPOs.map((po) => (
                <div key={po.id} className="border rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">{po.poNumber}</span>
                            {getStatusBadge(po.status)}
                            {getPriorityBadge(po.priority)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Created: {new Date(po.poDate).toLocaleDateString('id-ID')} • 
                            Expected: {new Date(po.expectedDelivery).toLocaleDateString('id-ID')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="font-bold text-lg text-green-600">{formatCurrency(po.total)}</div>
                          <div className="text-sm text-muted-foreground">
                            {po.items.length} item{po.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setExpandedPO(expandedPO === po.id ? null : po.id)}
                        >
                          {expandedPO === po.id ? 'Collapse' : 'Expand'}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Supplier</div>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{po.supplier.name}</span>
                          <div className="flex items-center">
                            {getRatingStars(po.supplier.rating)}
                          </div>
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
                        <div className="text-sm text-muted-foreground">Payment Terms</div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">{po.paymentTerms}</span>
                        </div>
                      </div>
                    </div>

                    {po.notes && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Notes:</div>
                        <div className="text-sm">{po.notes}</div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Print
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

                    {expandedPO === po.id && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="font-semibold mb-3">Order Items</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Product</th>
                                <th className="text-center p-2">Qty</th>
                                <th className="text-center p-2">Unit Price</th>
                                <th className="text-center p-2">Discount</th>
                                <th className="text-center p-2">Total</th>
                                <th className="text-center p-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {po.items.map((item) => (
                                <tr key={item.id} className="border-b">
                                  <td className="p-2">
                                    <div>
                                      <div className="font-medium">{item.productName}</div>
                                      <div className="text-xs text-muted-foreground">{item.productCode}</div>
                                      <div className="text-xs text-blue-600">{item.category}</div>
                                    </div>
                                  </td>
                                  <td className="p-2 text-center">
                                    <div>{formatNumber(item.quantity)} {item.unit}</div>
                                    {item.receivedQuantity && (
                                      <div className="text-xs text-green-600">
                                        Received: {formatNumber(item.receivedQuantity)}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-2 text-center">{formatCurrency(item.unitPrice)}</td>
                                  <td className="p-2 text-center">{item.discount}%</td>
                                  <td className="p-2 text-center font-medium">{formatCurrency(item.totalPrice)}</td>
                                  <td className="p-2 text-center">{getItemStatusBadge(item.status)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <div className="w-64 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>{formatCurrency(po.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span>{formatCurrency(po.tax)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping:</span>
                              <span>{formatCurrency(po.shipping)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                              <span>Total:</span>
                              <span className="text-green-600">{formatCurrency(po.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>Buat PO Baru</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Template PO</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>PO Analytics</span>
            </Button>
          </div>
        </Card>
      </div>
    
  );
}
