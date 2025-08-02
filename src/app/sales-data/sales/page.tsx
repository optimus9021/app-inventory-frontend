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
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  Edit
} from 'lucide-react';

interface SalesData {
  id: string;
  orderId: string;
  platform: 'TikTok' | 'Shopee' | 'Tokopedia';
  customerName: string;
  customerPhone: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed';
  paymentMethod: string;
  orderDate: string;
  shipDate?: string;
  deliveryDate?: string;
  province: string;
  city: string;
  notes?: string;
}

export default function SalesDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  // Mock data
  const salesData: SalesData[] = [
    {
      id: '1',
      orderId: 'TT-001-2025-001',
      platform: 'TikTok',
      customerName: 'Budi Santoso',
      customerPhone: '081234567890',
      productName: 'Kemeja Batik Premium',
      sku: 'BTK-001',
      quantity: 2,
      unitPrice: 150000,
      totalAmount: 300000,
      discount: 30000,
      finalAmount: 270000,
      status: 'completed',
      paymentMethod: 'OVO',
      orderDate: '2025-01-25',
      shipDate: '2025-01-26',
      deliveryDate: '2025-01-28',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      notes: 'Pengiriman express'
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
      unitPrice: 250000,
      totalAmount: 250000,
      discount: 0,
      finalAmount: 250000,
      status: 'shipped',
      paymentMethod: 'ShopeePay',
      orderDate: '2025-01-29',
      shipDate: '2025-01-30',
      province: 'Jawa Barat',
      city: 'Bandung',
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
      unitPrice: 180000,
      totalAmount: 540000,
      discount: 54000,
      finalAmount: 486000,
      status: 'processing',
      paymentMethod: 'Bank Transfer',
      orderDate: '2025-01-30',
      province: 'Jawa Tengah',
      city: 'Surakarta',
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Menunggu', className: 'bg-yellow-100 text-yellow-800' },
      processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-800' },
      shipped: { label: 'Dikirim', className: 'bg-purple-100 text-purple-800' },
      delivered: { label: 'Terkirim', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Selesai', className: 'bg-emerald-100 text-emerald-800' }
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
  const totalSales = salesData.reduce((sum, item) => sum + item.finalAmount, 0);
  const totalOrders = salesData.length;
  const totalQuantity = salesData.reduce((sum, item) => sum + item.quantity, 0);
  const avgOrderValue = totalSales / totalOrders;

  const filteredData = salesData.filter(item => {
    const matchesSearch = 
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Penjualan</h1>
            <p className="text-gray-600 mt-1">
              Kelola dan analisis data penjualan dari semua platform
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalSales)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Qty</p>
                <p className="text-2xl font-bold text-gray-900">{totalQuantity}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata AOV</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(avgOrderValue)}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="processing">Diproses</option>
              <option value="shipped">Dikirim</option>
              <option value="delivered">Terkirim</option>
              <option value="completed">Selesai</option>
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

        {/* Sales Data Table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Data Penjualan ({filteredData.length} dari {totalOrders})</h2>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Qty</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Tanggal</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-blue-600">{sale.orderId}</div>
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
                      <div className="text-gray-500 text-xs">SKU: {sale.sku}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                        {sale.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{formatCurrency(sale.finalAmount)}</div>
                      {sale.discount > 0 && (
                        <div className="text-red-500 text-xs">
                          Diskon: {formatCurrency(sale.discount)}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(sale.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{sale.orderDate}</div>
                      {sale.deliveryDate && (
                        <div className="text-xs text-gray-500">
                          Terkirim: {sale.deliveryDate}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
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
              <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data penjualan</h3>
              <p className="text-gray-500">
                Tidak ada data penjualan yang sesuai dengan filter yang dipilih.
              </p>
            </div>
          )}
        </Card>
      </div>
    
  );
}
