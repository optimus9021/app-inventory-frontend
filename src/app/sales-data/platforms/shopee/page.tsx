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
  Star,
  Eye,
  MessageSquare,
  Award,
  BarChart3,
  RefreshCw,
  Settings,
  Gift
} from 'lucide-react';

interface ShopeeProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  sold: number;
  revenue: number;
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  status: 'active' | 'inactive' | 'violation' | 'out_of_stock';
  badge?: 'preferred' | 'mall' | 'choice' | 'local';
  voucher?: boolean;
  freeShipping?: boolean;
  createdAt: string;
  lastUpdated: string;
}

interface ShopeePromotion {
  id: string;
  type: 'flash_sale' | 'voucher' | 'free_shipping' | 'bundle';
  title: string;
  discount: number;
  minPurchase: number;
  quota: number;
  used: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'scheduled';
}

export default function ShopeeDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const shopeeProducts: ShopeeProduct[] = [
    {
      id: '1',
      name: 'Dress Muslimah Elegant',
      sku: 'DRS-002',
      price: 250000,
      discountPrice: 200000,
      stock: 28,
      sold: 189,
      revenue: 37800000,
      rating: 4.9,
      reviews: 45,
      views: 8500,
      likes: 1250,
      status: 'active',
      badge: 'preferred',
      voucher: true,
      freeShipping: true,
      createdAt: '2025-01-10',
      lastUpdated: '2025-01-31'
    },
    {
      id: '2',
      name: 'Kemeja Formal Pria',
      sku: 'KMJ-008',
      price: 180000,
      discountPrice: 150000,
      stock: 15,
      sold: 124,
      revenue: 18600000,
      rating: 4.7,
      reviews: 32,
      views: 6200,
      likes: 890,
      status: 'active',
      badge: 'choice',
      voucher: false,
      freeShipping: true,
      createdAt: '2025-01-18',
      lastUpdated: '2025-01-30'
    },
    {
      id: '3',
      name: 'Tas Ransel Casual',
      sku: 'TAS-015',
      price: 120000,
      stock: 0,
      sold: 78,
      revenue: 9360000,
      rating: 4.6,
      reviews: 28,
      views: 4500,
      likes: 650,
      status: 'out_of_stock',
      badge: 'local',
      voucher: true,
      freeShipping: false,
      createdAt: '2025-01-22',
      lastUpdated: '2025-01-29'
    }
  ];

  const promotions: ShopeePromotion[] = [
    {
      id: '1',
      type: 'flash_sale',
      title: 'Flash Sale Weekend',
      discount: 30,
      minPurchase: 100000,
      quota: 100,
      used: 67,
      startDate: '2025-02-01',
      endDate: '2025-02-02',
      status: 'scheduled'
    },
    {
      id: '2',
      type: 'voucher',
      title: 'Voucher Gratis Ongkir',
      discount: 15000,
      minPurchase: 50000,
      quota: 200,
      used: 145,
      startDate: '2025-01-25',
      endDate: '2025-02-05',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Tidak Aktif', className: 'bg-gray-100 text-gray-800' },
      violation: { label: 'Pelanggaran', className: 'bg-red-100 text-red-800' },
      out_of_stock: { label: 'Stok Habis', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getBadgeIcon = (badge: string) => {
    const badgeConfig = {
      preferred: { label: 'Preferred', className: 'bg-purple-100 text-purple-800', icon: Award },
      mall: { label: 'Mall', className: 'bg-blue-100 text-blue-800', icon: Award },
      choice: { label: 'Choice', className: 'bg-green-100 text-green-800', icon: Star },
      local: { label: 'Local', className: 'bg-orange-100 text-orange-800', icon: Award }
    };
    
    const config = badgeConfig[badge as keyof typeof badgeConfig];
    if (!config) return null;
    
    const IconComponent = config.icon;
    return (
      <Badge className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getPromotionBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      expired: { label: 'Expired', className: 'bg-red-100 text-red-800' },
      scheduled: { label: 'Terjadwal', className: 'bg-blue-100 text-blue-800' }
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

  // Calculate summary statistics
  const totalRevenue = shopeeProducts.reduce((sum, product) => sum + product.revenue, 0);
  const totalSold = shopeeProducts.reduce((sum, product) => sum + product.sold, 0);
  const avgRating = shopeeProducts.reduce((sum, product) => sum + product.rating, 0) / shopeeProducts.length;
  const totalReviews = shopeeProducts.reduce((sum, product) => sum + product.reviews, 0);

  const filteredProducts = shopeeProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesBadge = selectedBadge === 'all' || product.badge === selectedBadge;
    
    return matchesSearch && matchesStatus && matchesBadge;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🛒</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopee</h1>
              <p className="text-gray-600 mt-1">
                Data penjualan dan performa produk di Shopee
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
                  <span className="text-sm">+25.8%</span>
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
                  <span className="text-sm">+22.3%</span>
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
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{totalReviews} reviews</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shop Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.9</p>
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Preferred Seller</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="promotions">Promosi</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Products */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Produk Terlaris</h3>
              <div className="space-y-4">
                {shopeeProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold">
                        #{index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs">{product.rating}</span>
                          </div>
                          {product.badge && getBadgeIcon(product.badge)}
                        </div>
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

            {/* Shop Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performa Toko</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold">&lt; 1 jam</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Cancellation</span>
                    <span className="font-semibold text-green-600">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Late Shipment</span>
                    <span className="font-semibold text-green-600">0.5%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Badges & Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span>Preferred Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <span>5-Star Rating Seller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-600" />
                    <span>Free Returns Eligible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Fast Response Seller</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  <option value="violation">Pelanggaran</option>
                  <option value="out_of_stock">Stok Habis</option>
                </select>

                <select
                  value={selectedBadge}
                  onChange={(e) => setSelectedBadge(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Badge</option>
                  <option value="preferred">Preferred</option>
                  <option value="mall">Mall</option>
                  <option value="choice">Choice</option>
                  <option value="local">Local</option>
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
                  Produk Shopee ({filteredProducts.length} dari {shopeeProducts.length})
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Badge</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Features</th>
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
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {product.badge && getBadgeIcon(product.badge)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-xs">
                            {product.voucher && (
                              <Badge className="bg-red-100 text-red-800">Voucher</Badge>
                            )}
                            {product.freeShipping && (
                              <Badge className="bg-green-100 text-green-800">Gratis Ongkir</Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(product.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Lihat Gambar">
                              <Eye className="w-4 h-4" />
                            </Button>
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

          <TabsContent value="promotions" className="space-y-6">
            {/* Active Promotions */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Promosi Aktif</h2>
                <Button>
                  <Gift className="w-4 h-4 mr-2" />
                  Buat Promosi
                </Button>
              </div>

              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{promo.title}</h3>
                        <p className="text-gray-600">
                          {promo.startDate} - {promo.endDate}
                        </p>
                      </div>
                      {getPromotionBadge(promo.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {promo.type === 'voucher' ? formatCurrency(promo.discount) : `${promo.discount}%`}
                        </div>
                        <div className="text-sm text-gray-600">Discount</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(promo.minPurchase)}</div>
                        <div className="text-sm text-gray-600">Min Purchase</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{promo.used}/{promo.quota}</div>
                        <div className="text-sm text-gray-600">Used/Quota</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {((promo.used / promo.quota) * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-gray-600">Usage Rate</div>
                      </div>
                    </div>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(promo.used / promo.quota) * 100}%` }}
                      ></div>
                    </div>
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
                  <p>Chart penjualan Shopee akan ditampilkan di sini</p>
                </div>
              </div>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Metrik Kunci</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversion Rate</span>
                    <span className="font-semibold">2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-semibold">{formatCurrency(195000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Return Rate</span>
                    <span className="font-semibold text-green-600">1.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <span className="font-semibold">96%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Search</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recommendations</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Direct</span>
                    <span className="font-semibold">18%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ads</span>
                    <span className="font-semibold">9%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
