'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DollarSign, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Eye,
  Calculator,
  Percent,
  Package,
  AlertTriangle
} from 'lucide-react';

interface ProductPricing {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  baseCost: number;
  grossPrice: number;
  discount: number;
  netPrice: number;
  margin: number;
  marginPercent: number;
  minimumPrice: number;
  competitorPrice?: number;
  lastUpdated: string;
  updatedBy: string;
  status: 'active' | 'pending' | 'review';
  priceHistory: Array<{
    date: string;
    oldPrice: number;
    newPrice: number;
    reason: string;
  }>;
}

const mockPricing: ProductPricing[] = [
  {
    id: '1',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    brand: 'BrandA',
    baseCost: 175000,
    grossPrice: 350000,
    discount: 10,
    netPrice: 315000,
    margin: 140000,
    marginPercent: 44.44,
    minimumPrice: 280000,
    competitorPrice: 330000,
    lastUpdated: '2025-01-15 14:30',
    updatedBy: 'Admin',
    status: 'active',
    priceHistory: [
      {
        date: '2025-01-10',
        oldPrice: 300000,
        newPrice: 315000,
        reason: 'Market adjustment'
      }
    ]
  },
  {
    id: '2',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    brand: 'BrandB',
    baseCost: 220000,
    grossPrice: 450000,
    discount: 15,
    netPrice: 382500,
    margin: 162500,
    marginPercent: 42.48,
    minimumPrice: 350000,
    competitorPrice: 400000,
    lastUpdated: '2025-01-14 10:15',
    updatedBy: 'Manager',
    status: 'active',
    priceHistory: []
  },
  {
    id: '3',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    brand: 'BrandC',
    baseCost: 125000,
    grossPrice: 250000,
    discount: 0,
    netPrice: 250000,
    margin: 125000,
    marginPercent: 50.0,
    minimumPrice: 200000,
    lastUpdated: '2025-01-13 16:45',
    updatedBy: 'Admin',
    status: 'pending',
    priceHistory: []
  },
  {
    id: '4',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    brand: 'BrandD',
    baseCost: 80000,
    grossPrice: 180000,
    discount: 5,
    netPrice: 171000,
    margin: 91000,
    marginPercent: 53.22,
    minimumPrice: 150000,
    competitorPrice: 190000,
    lastUpdated: '2025-01-12 11:20',
    updatedBy: 'Sales Team',
    status: 'review',
    priceHistory: []
  },
  {
    id: '5',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    brand: 'BrandE',
    baseCost: 150000,
    grossPrice: 320000,
    discount: 8,
    netPrice: 294400,
    margin: 144400,
    marginPercent: 49.05,
    minimumPrice: 250000,
    lastUpdated: '2025-01-11 09:30',
    updatedBy: 'Admin',
    status: 'active',
    priceHistory: []
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'review':
      return <Badge className="bg-blue-100 text-blue-800">Review</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getMarginColor = (percent: number) => {
  if (percent >= 50) return 'text-green-600';
  if (percent >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPricing = mockPricing.filter(pricing => {
    const matchesSearch = pricing.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pricing.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pricing.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || pricing.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = filteredPricing.length;
  const avgMargin = filteredPricing.reduce((sum, p) => sum + p.marginPercent, 0) / totalProducts;
  const totalRevenue = filteredPricing.reduce((sum, p) => sum + p.netPrice, 0);
  const pendingReview = filteredPricing.filter(p => p.status === 'pending' || p.status === 'review').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(1)}%`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input Harga Gross Produk</h1>
            <p className="text-muted-foreground">
              Kelola harga dan margin produk
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pricing
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Produk</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Percent className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Margin</p>
                <p className="text-2xl font-bold text-green-600">{formatPercent(avgMargin || 0)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingReview}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Kategori</option>
              <option value="Fashion">Fashion</option>
              <option value="Olahraga">Olahraga</option>
              <option value="Aksesoris">Aksesoris</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="pending">Pending</option>
              <option value="review">Review</option>
            </select>
          </div>
        </Card>

        {/* Pricing Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Harga Produk</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Kode Produk</th>
                    <th className="text-left p-4">Nama Produk</th>
                    <th className="text-right p-4">Base Cost</th>
                    <th className="text-right p-4">Gross Price</th>
                    <th className="text-center p-4">Discount</th>
                    <th className="text-right p-4">Net Price</th>
                    <th className="text-right p-4">Margin</th>
                    <th className="text-right p-4">Competitor</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPricing.map((pricing) => (
                    <tr key={pricing.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{pricing.productCode}</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{pricing.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {pricing.category} • {pricing.brand}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(pricing.baseCost)}
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(pricing.grossPrice)}
                      </td>
                      <td className="p-4 text-center">
                        {pricing.discount > 0 ? (
                          <Badge className="bg-red-100 text-red-800">
                            -{pricing.discount}%
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right font-bold text-green-600">
                        {formatCurrency(pricing.netPrice)}
                      </td>
                      <td className="p-4 text-right">
                        <div>
                          <div className="font-medium">{formatCurrency(pricing.margin)}</div>
                          <div className={`text-sm font-medium ${getMarginColor(pricing.marginPercent)}`}>
                            {formatPercent(pricing.marginPercent)}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        {pricing.competitorPrice ? (
                          <div>
                            <div className="font-medium">
                              {formatCurrency(pricing.competitorPrice)}
                            </div>
                            <div className="text-sm">
                              {pricing.netPrice < pricing.competitorPrice ? (
                                <span className="text-green-600 flex items-center justify-end">
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                  Kompetitif
                                </span>
                              ) : (
                                <span className="text-red-600 flex items-center justify-end">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Tinggi
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(pricing.status)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calculator className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Price Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Margin Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>High Margin (≥50%)</span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredPricing.filter(p => p.marginPercent >= 50).length} produk
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Medium Margin (40-49%)</span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredPricing.filter(p => p.marginPercent >= 40 && p.marginPercent < 50).length} produk
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Low Margin ({'<'}40%)</span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredPricing.filter(p => p.marginPercent < 40).length} produk
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
            <div className="space-y-3">
              {filteredPricing
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 5)
                .map((pricing) => (
                  <div key={pricing.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{pricing.productName}</div>
                      <div className="text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {pricing.lastUpdated} by {pricing.updatedBy}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(pricing.netPrice)}</div>
                      <div className={`text-sm ${getMarginColor(pricing.marginPercent)}`}>
                        {formatPercent(pricing.marginPercent)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
