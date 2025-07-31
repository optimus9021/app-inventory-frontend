'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingDown,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Calendar,
  Percent,
  Tag,
  Package,
  Clock
} from 'lucide-react';

interface ClearanceItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  originalPrice: number;
  discountPercent: number;
  clearancePrice: number;
  currentStock: number;
  reason: 'slow-moving' | 'expired' | 'damaged' | 'seasonal' | 'overstock' | 'discontinued';
  expiryDate?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'sold-out' | 'cancelled';
  totalSold: number;
  revenue: number;
  supplier: string;
}

export default function ProductClearancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  // Mock data
  const clearanceItems: ClearanceItem[] = [
    {
      id: 'CLR001',
      productCode: 'SKU-001',
      productName: 'Smartphone Samsung Galaxy A53 (Model Lama)',
      category: 'Electronics',
      brand: 'Samsung',
      originalPrice: 4999000,
      discountPercent: 30,
      clearancePrice: 3499300,
      currentStock: 15,
      reason: 'discontinued',
      startDate: '2024-01-01',
      endDate: '2024-02-29',
      status: 'active',
      totalSold: 25,
      revenue: 87483250,
      supplier: 'Samsung Indonesia'
    },
    {
      id: 'CLR002',
      productCode: 'SKU-002',
      productName: 'Laptop ASUS VivoBook 14 (2022)',
      category: 'Electronics',
      brand: 'ASUS',
      originalPrice: 7999000,
      discountPercent: 25,
      clearancePrice: 5999250,
      currentStock: 8,
      reason: 'overstock',
      startDate: '2024-01-05',
      endDate: '2024-01-31',
      status: 'expired',
      totalSold: 12,
      revenue: 71991000,
      supplier: 'ASUS Indonesia'
    },
    {
      id: 'CLR003',
      productCode: 'SKU-003',
      productName: 'Jaket Musim Dingin Winter Collection',
      category: 'Fashion',
      brand: 'Nike',
      originalPrice: 1599000,
      discountPercent: 50,
      clearancePrice: 799500,
      currentStock: 0,
      reason: 'seasonal',
      startDate: '2024-01-10',
      endDate: '2024-03-31',
      status: 'sold-out',
      totalSold: 30,
      revenue: 23985000,
      supplier: 'Nike Authorized Dealer'
    },
    {
      id: 'CLR004',
      productCode: 'SKU-004',
      productName: 'Headphone Sony WH-CH720N (Kemasan Rusak)',
      category: 'Electronics',
      brand: 'Sony',
      originalPrice: 3999000,
      discountPercent: 40,
      clearancePrice: 2399400,
      currentStock: 5,
      reason: 'damaged',
      startDate: '2024-01-12',
      endDate: '2024-02-12',
      status: 'active',
      totalSold: 8,
      revenue: 19195200,
      supplier: 'Sony Indonesia'
    },
    {
      id: 'CLR005',
      productCode: 'SKU-005',
      productName: 'Smartwatch Garmin Forerunner 245 (Exp Soon)',
      category: 'Accessories',
      brand: 'Garmin',
      originalPrice: 4599000,
      discountPercent: 35,
      clearancePrice: 2989350,
      currentStock: 3,
      reason: 'expired',
      expiryDate: '2024-03-01',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      status: 'active',
      totalSold: 7,
      revenue: 20925450,
      supplier: 'Garmin Indonesia'
    },
    {
      id: 'CLR006',
      productCode: 'SKU-006',
      productName: 'Speaker JBL Flip 5 (Slow Moving)',
      category: 'Electronics',
      brand: 'JBL',
      originalPrice: 1999000,
      discountPercent: 20,
      clearancePrice: 1599200,
      currentStock: 12,
      reason: 'slow-moving',
      startDate: '2024-01-08',
      endDate: '2024-04-30',
      status: 'active',
      totalSold: 18,
      revenue: 28785600,
      supplier: 'Harman Indonesia'
    }
  ];

  const reasons = [
    { value: 'slow-moving', label: 'Slow Moving' },
    { value: 'expired', label: 'Expired/Near Expiry' },
    { value: 'damaged', label: 'Damaged' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'overstock', label: 'Overstock' },
    { value: 'discontinued', label: 'Discontinued' }
  ];

  // Statistics
  const totalItems = clearanceItems.length;
  const activeItems = clearanceItems.filter(item => item.status === 'active').length;
  const totalRevenue = clearanceItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalSold = clearanceItems.reduce((sum, item) => sum + item.totalSold, 0);
  const averageDiscount = clearanceItems.reduce((sum, item) => sum + item.discountPercent, 0) / clearanceItems.length;

  // Filter items
  const filteredItems = clearanceItems.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = filterReason === 'all' || item.reason === filterReason;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesReason && matchesStatus;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discountPercent - a.discountPercent;
      case 'price':
        return a.clearancePrice - b.clearancePrice;
      case 'stock':
        return b.currentStock - a.currentStock;
      case 'revenue':
        return b.revenue - a.revenue;
      default:
        return 0;
    }
  });

  const getReasonInfo = (reason: string) => {
    const reasonMap = {
      'slow-moving': { label: 'Slow Moving', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'expired': { label: 'Expired', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
      'damaged': { label: 'Damaged', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      'seasonal': { label: 'Seasonal', color: 'bg-blue-100 text-blue-800', icon: Calendar },
      'overstock': { label: 'Overstock', color: 'bg-purple-100 text-purple-800', icon: Package },
      'discontinued': { label: 'Discontinued', color: 'bg-gray-100 text-gray-800', icon: TrendingDown }
    };
    return reasonMap[reason as keyof typeof reasonMap] || reasonMap['slow-moving'];
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      'active': { label: 'Aktif', color: 'bg-green-100 text-green-800' },
      'expired': { label: 'Berakhir', color: 'bg-gray-100 text-gray-800' },
      'sold-out': { label: 'Habis Terjual', color: 'bg-blue-100 text-blue-800' },
      'cancelled': { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap['active'];
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

  const formatPercent = (percent: number) => {
    return `${percent}%`;
  };

  const isNearExpiry = (item: ClearanceItem) => {
    if (!item.expiryDate) return false;
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clearance Sale</h1>
            <p className="text-gray-600">Kelola produk clearance dan promotional items</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Clearance
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Item</p>
                <p className="text-2xl font-bold">{formatNumber(totalItems)}</p>
              </div>
              <Tag className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Item Aktif</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(activeItems)}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Terjual</p>
                <p className="text-2xl font-bold">{formatNumber(totalSold)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-yellow-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Discount</p>
                <p className="text-2xl font-bold text-red-600">{formatPercent(Math.round(averageDiscount))}</p>
              </div>
              <Percent className="w-8 h-8 text-red-600" />
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
                  placeholder="Cari produk, kode SKU, atau brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Alasan</option>
                {reasons.map(reason => (
                  <option key={reason.value} value={reason.value}>{reason.label}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="expired">Berakhir</option>
                <option value="sold-out">Habis Terjual</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="discount">Urutkan: Discount</option>
                <option value="price">Urutkan: Harga</option>
                <option value="stock">Urutkan: Stok</option>
                <option value="revenue">Urutkan: Revenue</option>
              </select>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Clearance Items Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Clearance Items ({formatNumber(sortedItems.length)})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga & Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stok
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alasan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Periode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedItems.map((item) => {
                    const reasonInfo = getReasonInfo(item.reason);
                    const statusInfo = getStatusInfo(item.status);
                    const ReasonIcon = reasonInfo.icon;
                    const savings = item.originalPrice - item.clearancePrice;
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                              <div className="text-sm text-gray-500">{item.productCode} • {item.brand}</div>
                              <div className="text-sm text-gray-500">{item.category}</div>
                              {isNearExpiry(item) && (
                                <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  Expiry: {item.expiryDate}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm line-through text-gray-500">{formatCurrency(item.originalPrice)}</div>
                            <div className="text-sm font-medium text-red-600">{formatCurrency(item.clearancePrice)}</div>
                            <div className="text-xs text-green-600">
                              -{formatPercent(item.discountPercent)} (Hemat {formatCurrency(savings)})
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatNumber(item.currentStock)} unit</div>
                          {item.currentStock === 0 && (
                            <div className="text-xs text-red-600">Habis Stok</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`flex items-center gap-1 ${reasonInfo.color}`}>
                            <ReasonIcon className="w-3 h-3" />
                            {reasonInfo.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{item.startDate}</div>
                            <div className="text-sm text-gray-500">s/d {item.endDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{formatNumber(item.totalSold)} terjual</div>
                            <div className="text-sm text-green-600">{formatCurrency(item.revenue)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={statusInfo.color}>
                            {statusInfo.label}
                          </Badge>
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
