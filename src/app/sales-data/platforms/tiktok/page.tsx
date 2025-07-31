'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  Heart,
  Share2,
  Play,
  BarChart3,
  RefreshCw,
  Settings,
  Video
} from 'lucide-react';

interface TikTokProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sold: number;
  revenue: number;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  conversionRate: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  videoUrl?: string;
  createdAt: string;
  lastUpdated: string;
}

interface TikTokLiveMetrics {
  sessionId: string;
  title: string;
  status: 'live' | 'scheduled' | 'ended';
  viewers: number;
  peakViewers: number;
  duration: string;
  sales: number;
  orders: number;
  products: number;
  engagement: number;
  startTime: string;
}

export default function TikTokDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const tiktokProducts: TikTokProduct[] = [
    {
      id: '1',
      name: 'Kemeja Batik Premium',
      sku: 'BTK-001',
      price: 150000,
      discountPrice: 120000,
      stock: 45,
      sold: 234,
      revenue: 28080000,
      views: 125000,
      likes: 8500,
      shares: 1200,
      comments: 350,
      conversionRate: 0.187,
      status: 'active',
      videoUrl: 'https://tiktok.com/video/123',
      createdAt: '2025-01-15',
      lastUpdated: '2025-01-31'
    },
    {
      id: '2',
      name: 'Dress Casual Modern',
      sku: 'DRS-005',
      price: 180000,
      discountPrice: 150000,
      stock: 0,
      sold: 156,
      revenue: 23400000,
      views: 89000,
      likes: 6200,
      shares: 890,
      comments: 245,
      conversionRate: 0.175,
      status: 'out_of_stock',
      createdAt: '2025-01-20',
      lastUpdated: '2025-01-30'
    },
    {
      id: '3',
      name: 'Celana Jeans Slim Fit',
      sku: 'JNS-003',
      price: 200000,
      stock: 32,
      sold: 89,
      revenue: 17800000,
      views: 67000,
      likes: 4100,
      shares: 520,
      comments: 180,
      conversionRate: 0.133,
      status: 'active',
      createdAt: '2025-01-25',
      lastUpdated: '2025-01-31'
    }
  ];

  const liveMetrics: TikTokLiveMetrics[] = [
    {
      sessionId: 'LIVE-001',
      title: 'Flash Sale Koleksi Terbaru!',
      status: 'ended',
      viewers: 2580,
      peakViewers: 4200,
      duration: '2h 45m',
      sales: 12500000,
      orders: 85,
      products: 8,
      engagement: 78.5,
      startTime: '2025-01-30 19:00'
    },
    {
      sessionId: 'LIVE-002',
      title: 'Review & Try On Session',
      status: 'scheduled',
      viewers: 0,
      peakViewers: 0,
      duration: '-',
      sales: 0,
      orders: 0,
      products: 5,
      engagement: 0,
      startTime: '2025-02-01 20:00'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Tidak Aktif', className: 'bg-gray-100 text-gray-800' },
      out_of_stock: { label: 'Stok Habis', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getLiveStatusBadge = (status: string) => {
    const statusConfig = {
      live: { label: 'LIVE', className: 'bg-red-100 text-red-800' },
      scheduled: { label: 'Terjadwal', className: 'bg-blue-100 text-blue-800' },
      ended: { label: 'Selesai', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Calculate summary statistics
  const totalRevenue = tiktokProducts.reduce((sum, product) => sum + product.revenue, 0);
  const totalSold = tiktokProducts.reduce((sum, product) => sum + product.sold, 0);
  const totalViews = tiktokProducts.reduce((sum, product) => sum + product.views, 0);
  const avgConversion = tiktokProducts.reduce((sum, product) => sum + product.conversionRate, 0) / tiktokProducts.length;

  const filteredProducts = tiktokProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎵</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TikTok Shop</h1>
              <p className="text-gray-600 mt-1">
                Data penjualan dan performa produk di TikTok Shop
              </p>
            </div>
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
              Sync Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalRevenue)}
                </p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+18.2%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Terjual</p>
                <p className="text-2xl font-bold text-gray-900">{totalSold}</p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+15.7%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalViews)}</p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+23.1%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                <p className="text-2xl font-bold text-gray-900">{(avgConversion * 100).toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+2.3%</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="live">Live Streaming</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Products */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Produk Terlaris</h3>
              <div className="space-y-4">
                {tiktokProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">SKU: {product.sku}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(product.revenue)}</div>
                      <div className="text-sm text-gray-600">{product.sold} terjual</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
              <div className="space-y-3">
                {[
                  { action: 'Produk baru ditambahkan', item: 'Kemeja Polos Basic', time: '2 jam lalu' },
                  { action: 'Live streaming dimulai', item: 'Flash Sale Koleksi Terbaru', time: '5 jam lalu' },
                  { action: 'Stok habis', item: 'Dress Casual Modern', time: '1 hari lalu' },
                  { action: 'Video produk diupdate', item: 'Celana Jeans Slim Fit', time: '2 hari lalu' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.item}</div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="out_of_stock">Stok Habis</option>
                </select>

                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Lanjutan
                </Button>

                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </Card>

            {/* Products Table */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Produk TikTok ({filteredProducts.length} dari {tiktokProducts.length})
                </h2>
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  Kelola Produk
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Produk</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Harga</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Stok</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Terjual</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Engagement</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-gray-500 text-xs">SKU: {product.sku}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{formatCurrency(product.discountPrice || product.price)}</div>
                          {product.discountPrice && (
                            <div className="text-gray-500 line-through text-xs">
                              {formatCurrency(product.price)}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            product.stock > 10 
                              ? 'bg-green-100 text-green-800' 
                              : product.stock > 0 
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{product.sold}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{formatCurrency(product.revenue)}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {formatNumber(product.views)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {formatNumber(product.likes)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              {formatNumber(product.shares)}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium">{(product.conversionRate * 100).toFixed(1)}%</span>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(product.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {product.videoUrl && (
                              <Button variant="outline" size="sm" title="Lihat Video">
                                <Video className="w-4 h-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm" title="Edit Produk">
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
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            {/* Live Sessions */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sesi Live Streaming</h2>
                <Button>
                  <Play className="w-4 h-4 mr-2" />
                  Jadwalkan Live
                </Button>
              </div>

              <div className="space-y-4">
                {liveMetrics.map((session) => (
                  <div key={session.sessionId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        <p className="text-gray-600">{session.startTime}</p>
                      </div>
                      {getLiveStatusBadge(session.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(session.viewers)}</div>
                        <div className="text-sm text-gray-600">Viewers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(session.sales)}</div>
                        <div className="text-sm text-gray-600">Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{session.orders}</div>
                        <div className="text-sm text-gray-600">Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{session.engagement}%</div>
                        <div className="text-sm text-gray-600">Engagement</div>
                      </div>
                    </div>

                    {session.status === 'ended' && (
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                        <span>Durasi: {session.duration}</span>
                        <span>Peak Viewers: {formatNumber(session.peakViewers)}</span>
                        <span>Produk: {session.products}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Performance Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performa Penjualan</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Chart penjualan TikTok akan ditampilkan di sini</p>
                </div>
              </div>
            </Card>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Metrik Engagement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-semibold">{formatNumber(totalViews)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Likes</span>
                    <span className="font-semibold">{formatNumber(tiktokProducts.reduce((sum, p) => sum + p.likes, 0))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Shares</span>
                    <span className="font-semibold">{formatNumber(tiktokProducts.reduce((sum, p) => sum + p.shares, 0))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Comments</span>
                    <span className="font-semibold">{formatNumber(tiktokProducts.reduce((sum, p) => sum + p.comments, 0))}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Views</span>
                    <span className="font-semibold">{formatNumber(totalViews)} (100%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Clicks</span>
                    <span className="font-semibold">{formatNumber(Math.round(totalViews * 0.05))} (5%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Purchases</span>
                    <span className="font-semibold">{totalSold} ({(avgConversion * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
