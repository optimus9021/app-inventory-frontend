'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Star,
  Clock,
  BarChart3,
  Activity,
  ArrowRight,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface PlatformMetrics {
  platform: string;
  icon: string;
  color: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  totalProducts: number;
  activeProducts: number;
  rating: number;
  monthlyGrowth: number;
  salesGrowth: number;
  orderGrowth: number;
  topProduct: string;
  issues: number;
}

export default function PlatformHubPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock data
  const platformMetrics: PlatformMetrics[] = [
    {
      platform: 'TikTok Shop',
      icon: '🎵',
      color: 'black',
      status: 'connected',
      lastSync: '2025-01-31 09:30',
      totalSales: 45780000,
      totalOrders: 234,
      avgOrderValue: 195641,
      totalProducts: 45,
      activeProducts: 42,
      rating: 4.8,
      monthlyGrowth: 23.5,
      salesGrowth: 18.2,
      orderGrowth: 15.7,
      topProduct: 'Kemeja Batik Premium',
      issues: 0
    },
    {
      platform: 'Shopee',
      icon: '🛒',
      color: 'orange',
      status: 'connected',
      lastSync: '2025-01-31 09:25',
      totalSales: 62450000,
      totalOrders: 189,
      avgOrderValue: 330635,
      totalProducts: 52,
      activeProducts: 48,
      rating: 4.9,
      monthlyGrowth: 31.2,
      salesGrowth: 25.8,
      orderGrowth: 22.3,
      topProduct: 'Dress Muslimah Elegant',
      issues: 1
    },
    {
      platform: 'Tokopedia',
      icon: '🛍️',
      color: 'green',
      status: 'syncing',
      lastSync: '2025-01-31 08:45',
      totalSales: 38920000,
      totalOrders: 156,
      avgOrderValue: 249487,
      totalProducts: 38,
      activeProducts: 35,
      rating: 4.7,
      monthlyGrowth: 12.8,
      salesGrowth: 8.9,
      orderGrowth: 11.2,
      topProduct: 'Celana Jeans Slim Fit',
      issues: 2
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      connected: { label: 'Terhubung', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      disconnected: { label: 'Terputus', className: 'bg-red-100 text-red-800', icon: AlertCircle },
      error: { label: 'Error', className: 'bg-red-100 text-red-800', icon: AlertCircle },
      syncing: { label: 'Sinkronisasi', className: 'bg-blue-100 text-blue-800', icon: RefreshCw }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
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

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  // Calculate totals
  const totalSales = platformMetrics.reduce((sum, platform) => sum + platform.totalSales, 0);
  const totalOrders = platformMetrics.reduce((sum, platform) => sum + platform.totalOrders, 0);
  const totalProducts = platformMetrics.reduce((sum, platform) => sum + platform.totalProducts, 0);
  const avgRating = platformMetrics.reduce((sum, platform) => sum + platform.rating, 0) / platformMetrics.length;

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hub Platform</h1>
            <p className="text-gray-600 mt-1">
              Kelola dan monitor performa penjualan di semua platform e-commerce
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 Hari Terakhir</option>
              <option value="30">30 Hari Terakhir</option>
              <option value="90">90 Hari Terakhir</option>
            </select>
            <Button>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Semua
            </Button>
          </div>
        </div>

        {/* Overall Summary */}
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
                <p className="text-sm font-medium text-gray-600">Total Produk</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rata-rata Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platformMetrics.map((platform, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              {/* Platform Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{platform.platform}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(platform.status)}
                      {platform.issues > 0 && (
                        <Badge className="bg-red-100 text-red-800">
                          {platform.issues} Issue
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* Last Sync */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Sync terakhir: {platform.lastSync}</span>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Penjualan</span>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(platform.totalSales)}</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      platform.salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {platform.salesGrowth >= 0 ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      {formatPercentage(platform.salesGrowth)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pesanan</span>
                  <div className="text-right">
                    <div className="font-semibold">{platform.totalOrders}</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      platform.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {platform.orderGrowth >= 0 ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      {formatPercentage(platform.orderGrowth)}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">AOV</span>
                  <div className="font-semibold">{formatCurrency(platform.avgOrderValue)}</div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Produk Aktif</span>
                  <div className="font-semibold">{platform.activeProducts}/{platform.totalProducts}</div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{platform.rating}</span>
                  </div>
                </div>
              </div>

              {/* Top Product */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Produk Terlaris</div>
                <div className="font-medium text-sm">{platform.topProduct}</div>
              </div>

              {/* Action Button */}
              <Link href={`/sales-data/platforms/${platform.platform.toLowerCase().replace(' ', '')}`}>
                <Button className="w-full mt-4" variant="outline">
                  Lihat Detail
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Performance Comparison */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Perbandingan Performa Platform</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Penjualan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Pesanan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">AOV</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {platformMetrics.map((platform, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{platform.icon}</span>
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(platform.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{formatCurrency(platform.totalSales)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{platform.totalOrders}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{formatCurrency(platform.avgOrderValue)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1 ${
                        platform.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.monthlyGrowth >= 0 ? 
                          <TrendingUp className="w-4 h-4" /> : 
                          <TrendingDown className="w-4 h-4" />
                        }
                        <span className="font-medium">{formatPercentage(platform.monthlyGrowth)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{platform.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Activity className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex items-center justify-center gap-2 h-12">
              <RefreshCw className="w-5 h-5" />
              Sync Semua Data
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <BarChart3 className="w-5 h-5" />
              Analisis Performa
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <Users className="w-5 h-5" />
              Kelola Produk
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <Settings className="w-5 h-5" />
              Pengaturan Platform
            </Button>
          </div>
        </Card>
      </div>
    
  );
}
