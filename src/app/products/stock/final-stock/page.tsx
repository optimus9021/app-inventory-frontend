'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  Search, 
  Download, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

interface FinalStock {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  location: string;
  lastUpdated: string;
  status: 'adequate' | 'low' | 'overstock' | 'critical';
  value: number;
  unit: string;
}

const mockFinalStocks: FinalStock[] = [
  {
    id: '1',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    category: 'Fashion',
    brand: 'BrandA',
    currentStock: 150,
    minStock: 50,
    maxStock: 200,
    location: 'WH-A1',
    lastUpdated: '2025-01-15 14:30',
    status: 'adequate',
    value: 3750000,
    unit: 'pcs'
  },
  {
    id: '2',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    category: 'Olahraga',
    brand: 'BrandB',
    currentStock: 25,
    minStock: 30,
    maxStock: 150,
    location: 'WH-B2',
    lastUpdated: '2025-01-15 13:45',
    status: 'low',
    value: 1250000,
    unit: 'pcs'
  },
  {
    id: '3',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    category: 'Fashion',
    brand: 'BrandC',
    currentStock: 220,
    minStock: 40,
    maxStock: 180,
    location: 'WH-A2',
    lastUpdated: '2025-01-15 12:15',
    status: 'overstock',
    value: 6600000,
    unit: 'pcs'
  },
  {
    id: '4',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    category: 'Aksesoris',
    brand: 'BrandD',
    currentStock: 5,
    minStock: 20,
    maxStock: 100,
    location: 'WH-C1',
    lastUpdated: '2025-01-15 11:20',
    status: 'critical',
    value: 750000,
    unit: 'pcs'
  },
  {
    id: '5',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    category: 'Fashion',
    brand: 'BrandE',
    currentStock: 80,
    minStock: 25,
    maxStock: 120,
    location: 'WH-A3',
    lastUpdated: '2025-01-15 10:30',
    status: 'adequate',
    value: 4800000,
    unit: 'pcs'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'adequate':
      return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
    case 'low':
      return <Badge className="bg-yellow-100 text-yellow-800">Stok Rendah</Badge>;
    case 'overstock':
      return <Badge className="bg-blue-100 text-blue-800">Overstock</Badge>;
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Kritis</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'adequate':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'low':
      return <TrendingDown className="h-4 w-4 text-yellow-600" />;
    case 'overstock':
      return <TrendingUp className="h-4 w-4 text-blue-600" />;
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

export default function FinalStockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredStocks = mockFinalStocks.filter(stock => {
    const matchesSearch = stock.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || stock.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalValue = filteredStocks.reduce((sum, stock) => sum + stock.value, 0);
  const criticalItems = filteredStocks.filter(stock => stock.status === 'critical').length;
  const lowStockItems = filteredStocks.filter(stock => stock.status === 'low').length;
  const overstockItems = filteredStocks.filter(stock => stock.status === 'overstock').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stok Akhir</h1>
            <p className="text-muted-foreground">
              Kelola dan monitor stok akhir produk real-time
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{filteredStocks.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Nilai</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Stok Kritis</p>
                <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Stok Rendah</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
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
              <option value="adequate">Normal</option>
              <option value="low">Stok Rendah</option>
              <option value="overstock">Overstock</option>
              <option value="critical">Kritis</option>
            </select>
          </div>
        </Card>

        {/* Stock Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Stok Akhir</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Kode Produk</th>
                    <th className="text-left p-4">Nama Produk</th>
                    <th className="text-left p-4">Kategori</th>
                    <th className="text-left p-4">Lokasi</th>
                    <th className="text-right p-4">Stok Saat Ini</th>
                    <th className="text-right p-4">Min/Max</th>
                    <th className="text-right p-4">Nilai</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-left p-4">Update Terakhir</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map((stock) => (
                    <tr key={stock.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{stock.productCode}</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{stock.productName}</div>
                          <div className="text-sm text-muted-foreground">{stock.brand}</div>
                        </div>
                      </td>
                      <td className="p-4">{stock.category}</td>
                      <td className="p-4">
                        <Badge variant="outline">{stock.location}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {getStatusIcon(stock.status)}
                          <span className="font-medium">
                            {stock.currentStock} {stock.unit}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-right text-sm">
                        <div>{stock.minStock} / {stock.maxStock}</div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(stock.value)}
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(stock.status)}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {stock.lastUpdated}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Alert Summary */}
        {(criticalItems > 0 || lowStockItems > 0 || overstockItems > 0) && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Ringkasan Alert Stok
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {criticalItems > 0 && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <p className="font-medium text-red-800">Stok Kritis</p>
                      <p className="text-sm text-red-600">{criticalItems} produk perlu segera direstock</p>
                    </div>
                  </div>
                </div>
              )}
              
              {lowStockItems > 0 && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <p className="font-medium text-yellow-800">Stok Rendah</p>
                      <p className="text-sm text-yellow-600">{lowStockItems} produk mendekati minimum</p>
                    </div>
                  </div>
                </div>
              )}
              
              {overstockItems > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium text-blue-800">Overstock</p>
                      <p className="text-sm text-blue-600">{overstockItems} produk melebihi maksimum</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
