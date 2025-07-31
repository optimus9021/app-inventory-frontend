'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle,
  XCircle,
  RefreshCw,
  MessageSquare,
  Eye,
  FileText,
  Clock
} from 'lucide-react';

interface CancelledSale {
  id: string;
  orderId: string;
  platform: 'TikTok' | 'Shopee' | 'Tokopedia';
  customerName: string;
  customerPhone: string;
  productName: string;
  sku: string;
  quantity: number;
  originalAmount: number;
  refundAmount: number;
  cancelReason: string;
  cancelCategory: 'customer_request' | 'stock_unavailable' | 'payment_failed' | 'quality_issue' | 'shipping_problem' | 'other';
  cancelDate: string;
  orderDate: string;
  refundStatus: 'pending' | 'processing' | 'completed' | 'failed';
  refundMethod: string;
  handledBy: string;
  notes?: string;
  resolutionTime: number; // in hours
}

export default function CancelledSalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRefundStatus, setSelectedRefundStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  // Mock data
  const cancelledSales: CancelledSale[] = [
    {
      id: '1',
      orderId: 'TT-001-2025-001',
      platform: 'TikTok',
      customerName: 'Budi Santoso',
      customerPhone: '081234567890',
      productName: 'Kemeja Batik Premium',
      sku: 'BTK-001',
      quantity: 2,
      originalAmount: 270000,
      refundAmount: 270000,
      cancelReason: 'Customer tidak jadi beli karena sudah menemukan barang serupa di tempat lain',
      cancelCategory: 'customer_request',
      cancelDate: '2025-01-26',
      orderDate: '2025-01-25',
      refundStatus: 'completed',
      refundMethod: 'OVO',
      handledBy: 'Admin CS',
      resolutionTime: 6,
      notes: 'Customer sangat kooperatif, proses lancar'
    },
    {
      id: '2',
      orderId: 'SP-002-2025-045',
      platform: 'Shopee',
      customerName: 'Siti Aminah',
      customerPhone: '082345678901',
      productName: 'Dress Muslimah Elegant',
      sku: 'DRS-002',
      quantity: 1,
      originalAmount: 250000,
      refundAmount: 250000,
      cancelReason: 'Stok habis setelah order dibuat',
      cancelCategory: 'stock_unavailable',
      cancelDate: '2025-01-29',
      orderDate: '2025-01-28',
      refundStatus: 'processing',
      refundMethod: 'ShopeePay',
      handledBy: 'Admin Inventory',
      resolutionTime: 12,
      notes: 'Menunggu konfirmasi supplier untuk restock'
    },
    {
      id: '3',
      orderId: 'TP-003-2025-123',
      platform: 'Tokopedia',
      customerName: 'Ahmad Rahman',
      customerPhone: '083456789012',
      productName: 'Celana Jeans Slim Fit',
      sku: 'JNS-003',
      quantity: 3,
      originalAmount: 486000,
      refundAmount: 450000,
      cancelReason: 'Produk cacat ditemukan saat QC sebelum pengiriman',
      cancelCategory: 'quality_issue',
      cancelDate: '2025-01-30',
      orderDate: '2025-01-29',
      refundStatus: 'pending',
      refundMethod: 'Bank Transfer',
      handledBy: 'QC Manager',
      resolutionTime: 24,
      notes: 'Produk dikembalikan ke supplier, menunggu penggantian'
    }
  ];

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      customer_request: { label: 'Permintaan Customer', className: 'bg-blue-100 text-blue-800' },
      stock_unavailable: { label: 'Stok Habis', className: 'bg-red-100 text-red-800' },
      payment_failed: { label: 'Pembayaran Gagal', className: 'bg-yellow-100 text-yellow-800' },
      quality_issue: { label: 'Masalah Kualitas', className: 'bg-orange-100 text-orange-800' },
      shipping_problem: { label: 'Masalah Pengiriman', className: 'bg-purple-100 text-purple-800' },
      other: { label: 'Lainnya', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getRefundStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Selesai', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Gagal', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getPlatformBadge = (platform: string) => {
    const platformConfig = {
      TikTok: { className: 'bg-black text-white' },
      Shopee: { className: 'bg-orange-100 text-orange-800' },
      Tokopedia: { className: 'bg-green-100 text-green-800' }
    };
    
    const config = platformConfig[platform as keyof typeof platformConfig];
    return (
      <Badge className={config.className}>
        {platform}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate summary statistics
  const totalCancelled = cancelledSales.length;
  const totalRefundAmount = cancelledSales.reduce((sum, item) => sum + item.refundAmount, 0);
  const avgResolutionTime = cancelledSales.reduce((sum, item) => sum + item.resolutionTime, 0) / totalCancelled;
  const pendingRefunds = cancelledSales.filter(item => item.refundStatus === 'pending').length;

  const filteredData = cancelledSales.filter(item => {
    const matchesSearch = 
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cancelReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'all' || item.cancelCategory === selectedCategory;
    const matchesRefundStatus = selectedRefundStatus === 'all' || item.refundStatus === selectedRefundStatus;
    
    return matchesSearch && matchesPlatform && matchesCategory && matchesRefundStatus;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Penjualan Dibatalkan</h1>
            <p className="text-gray-600 mt-1">
              Kelola dan analisis pesanan yang dibatalkan dari semua platform
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Dibatalkan</p>
                <p className="text-2xl font-bold text-gray-900">{totalCancelled}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Refund</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRefundAmount)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <RefreshCw className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Resolusi</p>
                <p className="text-2xl font-bold text-gray-900">{avgResolutionTime.toFixed(1)}h</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Refund Pending</p>
                <p className="text-2xl font-bold text-gray-900">{pendingRefunds}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari order ID, customer, produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Platform</option>
              <option value="TikTok">TikTok</option>
              <option value="Shopee">Shopee</option>
              <option value="Tokopedia">Tokopedia</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Kategori</option>
              <option value="customer_request">Permintaan Customer</option>
              <option value="stock_unavailable">Stok Habis</option>
              <option value="payment_failed">Pembayaran Gagal</option>
              <option value="quality_issue">Masalah Kualitas</option>
              <option value="shipping_problem">Masalah Pengiriman</option>
              <option value="other">Lainnya</option>
            </select>

            <select
              value={selectedRefundStatus}
              onChange={(e) => setSelectedRefundStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status Refund</option>
              <option value="pending">Menunggu</option>
              <option value="processing">Diproses</option>
              <option value="completed">Selesai</option>
              <option value="failed">Gagal</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 Hari Terakhir</option>
              <option value="30">30 Hari Terakhir</option>
              <option value="90">90 Hari Terakhir</option>
              <option value="365">1 Tahun Terakhir</option>
            </select>

            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Cancelled Sales Table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Pesanan Dibatalkan ({filteredData.length} dari {totalCancelled})</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter Lanjutan
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Produk</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Jumlah Refund</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status Refund</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Waktu Resolusi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-red-600">{sale.orderId}</div>
                      <div className="text-xs text-gray-500">
                        Dibatalkan: {sale.cancelDate}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getPlatformBadge(sale.platform)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{sale.customerName}</div>
                      <div className="text-gray-500 text-xs">{sale.customerPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{sale.productName}</div>
                      <div className="text-gray-500 text-xs">
                        SKU: {sale.sku} | Qty: {sale.quantity}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getCategoryBadge(sale.cancelCategory)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{formatCurrency(sale.refundAmount)}</div>
                      <div className="text-xs text-gray-500">
                        {sale.refundMethod}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getRefundStatusBadge(sale.refundStatus)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{sale.resolutionTime}h</div>
                      <div className="text-xs text-gray-500">
                        oleh {sale.handledBy}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" title="Lihat Detail">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Lihat Alasan">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Download Report">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data pembatalan</h3>
              <p className="text-gray-500">
                Tidak ada data pembatalan yang sesuai dengan filter yang dipilih.
              </p>
            </div>
          )}
        </Card>

        {/* Cancel Reason Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Analisis Alasan Pembatalan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { reason: 'Permintaan Customer', count: 8, percentage: 40 },
              { reason: 'Stok Habis', count: 6, percentage: 30 },
              { reason: 'Masalah Kualitas', count: 4, percentage: 20 },
              { reason: 'Masalah Pengiriman', count: 2, percentage: 10 }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.reason}</span>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    
  );
}
