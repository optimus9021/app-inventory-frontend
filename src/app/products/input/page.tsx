'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Upload
} from 'lucide-react';

interface InputOperation {
  id: string;
  operationType: 'purchase' | 'production' | 'return' | 'adjustment' | 'transfer';
  referenceNumber: string;
  date: string;
  supplier?: string;
  products: {
    productCode: string;
    productName: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
  }[];
  totalAmount: number;
  status: 'draft' | 'pending' | 'approved' | 'completed' | 'cancelled';
  notes?: string;
  createdBy: string;
  approvedBy?: string;
  approvedDate?: string;
}

export default function ProductInputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock data
  const inputOperations: InputOperation[] = [
    {
      id: 'INP001',
      operationType: 'purchase',
      referenceNumber: 'PO-2024-001',
      date: '2024-01-15',
      supplier: 'Samsung Indonesia',
      products: [
        {
          productCode: 'SKU-001',
          productName: 'Smartphone Samsung Galaxy A54',
          quantity: 20,
          unitCost: 4200000,
          totalCost: 84000000
        }
      ],
      totalAmount: 84000000,
      status: 'completed',
      notes: 'Pembelian rutin bulanan',
      createdBy: 'John Doe',
      approvedBy: 'Manager Purchasing',
      approvedDate: '2024-01-15'
    },
    {
      id: 'INP002',
      operationType: 'production',
      referenceNumber: 'PROD-2024-001',
      date: '2024-01-14',
      products: [
        {
          productCode: 'SKU-002',
          productName: 'Custom Laptop Assembly',
          quantity: 5,
          unitCost: 12000000,
          totalCost: 60000000
        }
      ],
      totalAmount: 60000000,
      status: 'pending',
      notes: 'Produksi custom order untuk klien corporate',
      createdBy: 'Jane Smith'
    },
    {
      id: 'INP003',
      operationType: 'return',
      referenceNumber: 'RET-2024-001',
      date: '2024-01-13',
      supplier: 'Nike Authorized Dealer',
      products: [
        {
          productCode: 'SKU-003',
          productName: 'Sepatu Nike Air Force 1',
          quantity: 3,
          unitCost: 1200000,
          totalCost: 3600000
        }
      ],
      totalAmount: 3600000,
      status: 'approved',
      notes: 'Return barang defect dari supplier',
      createdBy: 'Mike Johnson',
      approvedBy: 'Manager Quality',
      approvedDate: '2024-01-13'
    },
    {
      id: 'INP004',
      operationType: 'adjustment',
      referenceNumber: 'ADJ-2024-001',
      date: '2024-01-12',
      products: [
        {
          productCode: 'SKU-004',
          productName: 'Headphone Sony WH-1000XM5',
          quantity: 2,
          unitCost: 3800000,
          totalCost: 7600000
        }
      ],
      totalAmount: 7600000,
      status: 'draft',
      notes: 'Adjustment stok setelah stock opname',
      createdBy: 'Sarah Wilson'
    },
    {
      id: 'INP005',
      operationType: 'transfer',
      referenceNumber: 'TRF-2024-001',
      date: '2024-01-11',
      products: [
        {
          productCode: 'SKU-005',
          productName: 'Jam Tangan Casio G-Shock',
          quantity: 10,
          unitCost: 1900000,
          totalCost: 19000000
        }
      ],
      totalAmount: 19000000,
      status: 'cancelled',
      notes: 'Transfer antar gudang - dibatalkan',
      createdBy: 'David Brown'
    }
  ];

  // Statistics
  const totalOperations = inputOperations.length;
  const pendingOperations = inputOperations.filter(op => op.status === 'pending').length;
  const completedOperations = inputOperations.filter(op => op.status === 'completed').length;
  const totalValue = inputOperations
    .filter(op => op.status === 'completed')
    .reduce((sum, op) => sum + op.totalAmount, 0);

  // Filter operations
  const filteredOperations = inputOperations.filter(operation => {
    const matchesSearch = operation.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operation.products.some(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || operation.operationType === filterType;
    const matchesStatus = filterStatus === 'all' || operation.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getOperationTypeInfo = (type: string) => {
    const types = {
      purchase: { label: 'Pembelian', color: 'bg-blue-100 text-blue-800', icon: ShoppingBag },
      production: { label: 'Produksi', color: 'bg-green-100 text-green-800', icon: Package },
      return: { label: 'Return', color: 'bg-yellow-100 text-yellow-800', icon: TrendingUp },
      adjustment: { label: 'Adjustment', color: 'bg-purple-100 text-purple-800', icon: Edit },
      transfer: { label: 'Transfer', color: 'bg-gray-100 text-gray-800', icon: Upload }
    };
    return types[type as keyof typeof types] || types.purchase;
  };

  const getStatusInfo = (status: string) => {
    const statuses = {
      draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
      pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      approved: { label: 'Approved', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    return statuses[status as keyof typeof statuses] || statuses.draft;
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

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Input Operations</h1>
            <p className="text-gray-600">Kelola input produk dan operasi inventory</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Input Baru
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Operasi</p>
                <p className="text-2xl font-bold">{formatNumber(totalOperations)}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{formatNumber(pendingOperations)}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(completedOperations)}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Nilai</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
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
                  placeholder="Cari nomor referensi atau produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Tipe</option>
                <option value="purchase">Pembelian</option>
                <option value="production">Produksi</option>
                <option value="return">Return</option>
                <option value="adjustment">Adjustment</option>
                <option value="transfer">Transfer</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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

        {/* Operations Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Input Operations ({formatNumber(filteredOperations.length)})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referensi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Nilai
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOperations.map((operation) => {
                    const typeInfo = getOperationTypeInfo(operation.operationType);
                    const statusInfo = getStatusInfo(operation.status);
                    const TypeIcon = typeInfo.icon;
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <tr key={operation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{operation.referenceNumber}</div>
                            <div className="text-sm text-gray-500">ID: {operation.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`flex items-center gap-1 ${typeInfo.color}`}>
                            <TypeIcon className="w-3 h-3" />
                            {typeInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            {operation.products.slice(0, 2).map((product, index) => (
                              <div key={index} className="text-sm">
                                <div className="font-medium text-gray-900">{product.productName}</div>
                                <div className="text-gray-500">{formatNumber(product.quantity)} unit</div>
                              </div>
                            ))}
                            {operation.products.length > 2 && (
                              <div className="text-xs text-blue-600">
                                +{operation.products.length - 2} produk lainnya
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {operation.supplier || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(operation.totalAmount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`flex items-center gap-1 ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{operation.date}</div>
                            <div className="text-sm text-gray-500">oleh {operation.createdBy}</div>
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
