'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye,
  Package,
  TrendingUp,
  Calendar,
  Folder
} from 'lucide-react';

interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  parentCategory?: string;
  level: number;
  isActive: boolean;
  productCount: number;
  totalValue: number;
  createdDate: string;
  lastModified: string;
  createdBy: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    code: 'FSH',
    name: 'Fashion',
    description: 'Kategori produk fashion dan pakaian',
    level: 1,
    isActive: true,
    productCount: 150,
    totalValue: 45000000,
    createdDate: '2024-01-15',
    lastModified: '2025-01-10',
    createdBy: 'Admin'
  },
  {
    id: '2',
    code: 'FSH-MEN',
    name: 'Fashion Pria',
    description: 'Kategori khusus fashion untuk pria',
    parentCategory: 'Fashion',
    level: 2,
    isActive: true,
    productCount: 75,
    totalValue: 22500000,
    createdDate: '2024-01-20',
    lastModified: '2025-01-08',
    createdBy: 'Admin'
  },
  {
    id: '3',
    code: 'FSH-WMN',
    name: 'Fashion Wanita',
    description: 'Kategori khusus fashion untuk wanita',
    parentCategory: 'Fashion',
    level: 2,
    isActive: true,
    productCount: 75,
    totalValue: 22500000,
    createdDate: '2024-01-20',
    lastModified: '2025-01-05',
    createdBy: 'Admin'
  },
  {
    id: '4',
    code: 'SPT',
    name: 'Olahraga',
    description: 'Kategori produk olahraga dan fitness',
    level: 1,
    isActive: true,
    productCount: 89,
    totalValue: 31150000,
    createdDate: '2024-02-01',
    lastModified: '2025-01-12',
    createdBy: 'Manager'
  },
  {
    id: '5',
    code: 'SPT-SHOE',
    name: 'Sepatu Olahraga',
    description: 'Kategori sepatu untuk berbagai jenis olahraga',
    parentCategory: 'Olahraga',
    level: 2,
    isActive: true,
    productCount: 45,
    totalValue: 18000000,
    createdDate: '2024-02-05',
    lastModified: '2025-01-10',
    createdBy: 'Manager'
  },
  {
    id: '6',
    code: 'ACC',
    name: 'Aksesoris',
    description: 'Kategori aksesoris dan pelengkap',
    level: 1,
    isActive: true,
    productCount: 67,
    totalValue: 13400000,
    createdDate: '2024-02-10',
    lastModified: '2025-01-14',
    createdBy: 'Admin'
  },
  {
    id: '7',
    code: 'ELC',
    name: 'Elektronik',
    description: 'Kategori produk elektronik',
    level: 1,
    isActive: false,
    productCount: 0,
    totalValue: 0,
    createdDate: '2024-03-01',
    lastModified: '2024-12-20',
    createdBy: 'Manager'
  }
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCategories = mockCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || category.level.toString() === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && category.isActive) ||
                         (selectedStatus === 'inactive' && !category.isActive);
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const totalCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter(cat => cat.isActive).length;
  const totalProducts = filteredCategories.reduce((sum, cat) => sum + cat.productCount, 0);
  const totalValue = filteredCategories.reduce((sum, cat) => sum + cat.totalValue, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryLevel = (level: number) => {
    return '—'.repeat(level - 1) + ' ';
  };

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Kategori Produk</h1>
            <p className="text-muted-foreground">
              Kelola kategori dan hierarki produk
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kategori
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Kategori</p>
                <p className="text-2xl font-bold">{totalCategories}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Folder className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Kategori Aktif</p>
                <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Produk</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Nilai</p>
                <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
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
                  placeholder="Cari kategori atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Level</option>
              <option value="1">Level 1 (Main)</option>
              <option value="2">Level 2 (Sub)</option>
              <option value="3">Level 3 (Detail)</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </Card>

        {/* Categories Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Kategori</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Kode</th>
                    <th className="text-left p-4">Nama Kategori</th>
                    <th className="text-left p-4">Parent Category</th>
                    <th className="text-center p-4">Level</th>
                    <th className="text-right p-4">Jumlah Produk</th>
                    <th className="text-right p-4">Total Nilai</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-left p-4">Terakhir Diubah</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{category.code}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <span className="text-muted-foreground mr-2">
                            {getCategoryLevel(category.level)}
                          </span>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {category.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {category.parentCategory ? (
                          <Badge variant="outline">{category.parentCategory}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Badge className={
                          category.level === 1 ? 'bg-blue-100 text-blue-800' :
                          category.level === 2 ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }>
                          Level {category.level}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-medium">
                        {category.productCount}
                      </td>
                      <td className="p-4 text-right font-medium">
                        {formatCurrency(category.totalValue)}
                      </td>
                      <td className="p-4 text-center">
                        {category.isActive ? (
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Tidak Aktif</Badge>
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                          <div>
                            <div>{category.lastModified}</div>
                            <div className="text-muted-foreground">
                              by {category.createdBy}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {}}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {}}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Category Hierarchy */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FolderOpen className="h-5 w-5 mr-2" />
            Hierarki Kategori
          </h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-blue-600 mb-2">Fashion (FSH)</h4>
              <div className="pl-4 border-l-2 border-blue-200 space-y-1">
                <div className="text-sm">├── Fashion Pria (FSH-MEN) - 75 produk</div>
                <div className="text-sm">└── Fashion Wanita (FSH-WMN) - 75 produk</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-green-600 mb-2">Olahraga (SPT)</h4>
              <div className="pl-4 border-l-2 border-green-200 space-y-1">
                <div className="text-sm">└── Sepatu Olahraga (SPT-SHOE) - 45 produk</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-purple-600 mb-2">Aksesoris (ACC)</h4>
              <div className="pl-4 border-l-2 border-purple-200 space-y-1">
                <div className="text-sm text-muted-foreground">No sub-categories</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Categories by Products</h3>
            <div className="space-y-3">
              {filteredCategories
                .filter(cat => cat.isActive)
                .sort((a, b) => b.productCount - a.productCount)
                .slice(0, 5)
                .map((category) => (
                  <div key={category.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="outline">{category.productCount} produk</Badge>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Categories by Value</h3>
            <div className="space-y-3">
              {filteredCategories
                .filter(cat => cat.isActive)
                .sort((a, b) => b.totalValue - a.totalValue)
                .slice(0, 5)
                .map((category) => (
                  <div key={category.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(category.totalValue)}
                    </span>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
