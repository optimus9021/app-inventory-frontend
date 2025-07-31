'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
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
  Award,
  BarChart3,
  RefreshCw,
  Settings,
  Crown,
  Shield,
  Zap,
  Target
} from 'lucide-react';

interface TokopediaProduct {
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
  wishlist: number;
  status: 'active' | 'inactive' | 'banned' | 'out_of_stock';
  badge?: 'power_merchant' | 'official_store' | 'plus' | 'super_seller';
  topads?: boolean;
  powerUp?: boolean;
  freeShipping?: boolean;
  category: string;
  createdAt: string;
  lastUpdated: string;
}

interface TokopediaAds {
  id: string;
  productName: string;
  campaignType: 'search' | 'display' | 'shop';
  budget: number;
  spent: number;
  clicks: number;
  impressions: number;
  ctr: number;
  conversion: number;
  roas: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
}

export default function TokopediaDataPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const tokopediaProducts: TokopediaProduct[] = [
    {
      id: '1',
      name: 'Celana Jeans Slim Fit',
      sku: 'JNS-003',
      price: 200000,
      discountPrice: 180000,
      stock: 32,
      sold: 156,
      revenue: 28080000,
      rating: 4.7,
      reviews: 42,
      views: 12500,
      wishlist: 350,
      status: 'active',
      badge: 'power_merchant',
      topads: true,
      powerUp: true,
      freeShipping: true,
      category: 'Fashion Pria',
      createdAt: '2025-01-12',
      lastUpdated: '2025-01-31'
    },
    {
      id: '2',
      name: 'Kaos Polo Casual',
      sku: 'KAS-012',
      price: 120000,
      discountPrice: 95000,
      stock: 48,
      sold: 89,
      revenue: 8455000,
      rating: 4.6,
      reviews: 28,
      views: 8900,
      wishlist: 245,
      status: 'active',
      badge: 'plus',
      topads: false,
      powerUp: false,
      freeShipping: true,
      category: 'Fashion Pria',
      createdAt: '2025-01-20',
      lastUpdated: '2025-01-30'
    },
    {
      id: '3',
      name: 'Sepatu Sneakers Sport',
      sku: 'SPT-007',
      price: 350000,
      stock: 0,
      sold: 67,
      revenue: 23450000,
      rating: 4.8,
      reviews: 35,
      views: 6700,
      wishlist: 890,
      status: 'out_of_stock',
      badge: 'official_store',
      topads: true,
      powerUp: true,
      freeShipping: false,
      category: 'Sepatu',
      createdAt: '2025-01-15',
      lastUpdated: '2025-01-29'
    }
  ];

  const adsData: TokopediaAds[] = [
    {
      id: '1',
      productName: 'Celana Jeans Slim Fit',
      campaignType: 'search',
      budget: 500000,
      spent: 380000,
      clicks: 1250,
      impressions: 45000,
      ctr: 2.78,
      conversion: 12,
      roas: 4.2,
      status: 'active',
      startDate: '2025-01-25',
      endDate: '2025-02-05'
    },
    {
      id: '2',
      productName: 'Sepatu Sneakers Sport',
      campaignType: 'display',
      budget: 300000,
      spent: 245000,
      clicks: 890,
      impressions: 28000,
      ctr: 3.18,
      conversion: 8,
      roas: 3.8,
      status: 'active',
      startDate: '2025-01-28',
      endDate: '2025-02-10'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Tidak Aktif', className: 'bg-gray-100 text-gray-800' },
      banned: { label: 'Banned', className: 'bg-red-100 text-red-800' },
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
      power_merchant: { label: 'Power Merchant', className: 'bg-green-100 text-green-800', icon: Crown },
      official_store: { label: 'Official Store', className: 'bg-blue-100 text-blue-800', icon: Shield },
      plus: { label: 'Plus', className: 'bg-purple-100 text-purple-800', icon: Star },
      super_seller: { label: 'Super Seller', className: 'bg-yellow-100 text-yellow-800', icon: Award }
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

  const getAdsStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      paused: { label: 'Paused', className: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'Selesai', className: 'bg-gray-100 text-gray-800' }
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
  const totalRevenue = tokopediaProducts.reduce((sum, product) => sum + product.revenue, 0);
  const totalSold = tokopediaProducts.reduce((sum, product) => sum + product.sold, 0);
  const avgRating = tokopediaProducts.reduce((sum, product) => sum + product.rating, 0) / tokopediaProducts.length;
  const totalAdsSpent = adsData.reduce((sum, ad) => sum + ad.spent, 0);

  const filteredProducts = tokopediaProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    const matchesBadge = selectedBadge === 'all' || product.badge === selectedBadge;
    
    return matchesSearch && matchesStatus && matchesBadge;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🛍️</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tokopedia</h1>
              <p className="text-gray-600 mt-1">
                Data penjualan dan performa produk di Tokopedia
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
                  <span className="text-sm">+8.9%</span>
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
                  <span className="text-sm">+11.2%</span>
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
                  <span className="text-sm">Power Merchant</span>
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
                <p className="text-sm font-medium text-gray-600">TopAds Spent</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAdsSpent)}</p>
                <div className="flex items-center gap-1 mt-1 text-blue-600">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">ROAS 4.0</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="topads">TopAds</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Products */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Produk Terlaris</h3>
              <div className="space-y-4">
                {tokopediaProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
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
                          {product.topads && (
                            <Badge className="bg-blue-100 text-blue-800">TopAds</Badge>
                          )}
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
                    <span className="text-gray-600">Chat Response Rate</span>
                    <span className="font-semibold text-green-600">97%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Fulfillment</span>
                    <span className="font-semibold text-green-600">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product Quality Score</span>
                    <span className="font-semibold">4.7/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Score</span>
                    <span className="font-semibold text-green-600">4.8/5.0</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-green-600" />
                    <span>Power Merchant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span>Verified Store</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span>Fast Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span>Top Rated Seller</span>
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
                  <option value="banned">Banned</option>
                  <option value="out_of_stock">Stok Habis</option>
                </select>

                <select
                  value={selectedBadge}
                  onChange={(e) => setSelectedBadge(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Badge</option>
                  <option value="power_merchant">Power Merchant</option>
                  <option value="official_store">Official Store</option>
                  <option value="plus">Plus</option>
                  <option value="super_seller">Super Seller</option>
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
                  Produk Tokopedia ({filteredProducts.length} dari {tokopediaProducts.length})
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
                          <div className="flex flex-wrap items-center gap-1 text-xs">
                            {product.topads && (
                              <Badge className="bg-blue-100 text-blue-800">TopAds</Badge>
                            )}
                            {product.powerUp && (
                              <Badge className="bg-purple-100 text-purple-800">PowerUp</Badge>
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
                            <Button variant="outline" size="sm" title="Lihat Detail">
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

          <TabsContent value="topads" className="space-y-6">
            {/* TopAds Campaigns */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Kampanye TopAds</h2>
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Buat Kampanye
                </Button>
              </div>

              <div className="space-y-4">
                {adsData.map((ads) => (
                  <div key={ads.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{ads.productName}</h3>
                        <p className="text-gray-600 capitalize">{ads.campaignType} Campaign</p>
                        <p className="text-sm text-gray-500">
                          {ads.startDate} - {ads.endDate}
                        </p>
                      </div>
                      {getAdsStatusBadge(ads.status)}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{formatCurrency(ads.spent)}</div>
                        <div className="text-sm text-gray-600">Spent / {formatCurrency(ads.budget)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{formatNumber(ads.clicks)}</div>
                        <div className="text-sm text-gray-600">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{ads.ctr.toFixed(2)}%</div>
                        <div className="text-sm text-gray-600">CTR</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{ads.roas.toFixed(1)}x</div>
                        <div className="text-sm text-gray-600">ROAS</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Impressions:</span>
                        <span className="font-medium">{formatNumber(ads.impressions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversions:</span>
                        <span className="font-medium">{ads.conversion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget Usage:</span>
                        <span className="font-medium">{((ads.spent / ads.budget) * 100).toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(ads.spent / ads.budget) * 100}%` }}
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
                  <p>Chart penjualan Tokopedia akan ditampilkan di sini</p>
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
                    <span className="font-semibold">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Order Value</span>
                    <span className="font-semibold">{formatCurrency(185000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Return Rate</span>
                    <span className="font-semibold text-green-600">1.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">TopAds ROAS</span>
                    <span className="font-semibold">4.0x</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fashion Pria</span>
                    <span className="font-semibold">65%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sepatu</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Aksesoris</span>
                    <span className="font-semibold">10%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
