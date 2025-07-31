'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Tag,
  Package,
  Building
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  parentCategory?: string;
  createdDate: string;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  country: string;
  createdDate: string;
}

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  productCount: number;
  status: 'active' | 'inactive';
  rating: number;
  createdDate: string;
}

export default function ProductMasterPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'brands' | 'suppliers'>('categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const categories: Category[] = [
    {
      id: 'CAT001',
      name: 'Electronics',
      description: 'Perangkat elektronik dan gadget',
      productCount: 156,
      status: 'active',
      createdDate: '2024-01-01'
    },
    {
      id: 'CAT002',
      name: 'Fashion',
      description: 'Pakaian, sepatu, dan aksesori fashion',
      productCount: 89,
      status: 'active',
      parentCategory: 'Lifestyle',
      createdDate: '2024-01-02'
    },
    {
      id: 'CAT003',
      name: 'Home & Garden',
      description: 'Peralatan rumah tangga dan taman',
      productCount: 67,
      status: 'active',
      createdDate: '2024-01-03'
    },
    {
      id: 'CAT004',
      name: 'Sports',
      description: 'Peralatan olahraga dan fitness',
      productCount: 45,
      status: 'inactive',
      createdDate: '2024-01-04'
    },
    {
      id: 'CAT005',
      name: 'Accessories',
      description: 'Aksesori dan perhiasan',
      productCount: 23,
      status: 'active',
      createdDate: '2024-01-05'
    }
  ];

  const brands: Brand[] = [
    {
      id: 'BRD001',
      name: 'Samsung',
      description: 'Electronics manufacturer from South Korea',
      productCount: 45,
      status: 'active',
      country: 'South Korea',
      createdDate: '2024-01-01'
    },
    {
      id: 'BRD002',
      name: 'Nike',
      description: 'Sports apparel and footwear brand',
      productCount: 32,
      status: 'active',
      country: 'United States',
      createdDate: '2024-01-02'
    },
    {
      id: 'BRD003',
      name: 'ASUS',
      description: 'Computer hardware manufacturer',
      productCount: 28,
      status: 'active',
      country: 'Taiwan',
      createdDate: '2024-01-03'
    },
    {
      id: 'BRD004',
      name: 'Sony',
      description: 'Electronics and entertainment conglomerate',
      productCount: 22,
      status: 'active',
      country: 'Japan',
      createdDate: '2024-01-04'
    },
    {
      id: 'BRD005',
      name: 'Casio',
      description: 'Electronics and watch manufacturer',
      productCount: 15,
      status: 'inactive',
      country: 'Japan',
      createdDate: '2024-01-05'
    }
  ];

  const suppliers: Supplier[] = [
    {
      id: 'SUP001',
      name: 'Samsung Indonesia',
      contactPerson: 'John Doe',
      email: 'john@samsung.co.id',
      phone: '+62-21-1234567',
      address: 'Jakarta Selatan, DKI Jakarta',
      productCount: 45,
      status: 'active',
      rating: 4.8,
      createdDate: '2024-01-01'
    },
    {
      id: 'SUP002',
      name: 'Nike Authorized Dealer',
      contactPerson: 'Jane Smith',
      email: 'jane@nikedealer.com',
      phone: '+62-21-2345678',
      address: 'Bandung, Jawa Barat',
      productCount: 32,
      status: 'active',
      rating: 4.6,
      createdDate: '2024-01-02'
    },
    {
      id: 'SUP003',
      name: 'ASUS Indonesia',
      contactPerson: 'Mike Johnson',
      email: 'mike@asus.co.id',
      phone: '+62-21-3456789',
      address: 'Surabaya, Jawa Timur',
      productCount: 28,
      status: 'active',
      rating: 4.7,
      createdDate: '2024-01-03'
    },
    {
      id: 'SUP004',
      name: 'Sony Indonesia',
      contactPerson: 'Sarah Wilson',
      email: 'sarah@sony.co.id',
      phone: '+62-21-4567890',
      address: 'Medan, Sumatera Utara',
      productCount: 22,
      status: 'active',
      rating: 4.5,
      createdDate: '2024-01-04'
    },
    {
      id: 'SUP005',
      name: 'Casio Indonesia',
      contactPerson: 'David Brown',
      email: 'david@casio.co.id',
      phone: '+62-21-5678901',
      address: 'Yogyakarta, DI Yogyakarta',
      productCount: 15,
      status: 'inactive',
      rating: 4.2,
      createdDate: '2024-01-05'
    }
  ];

  // Filter data based on current tab
  const getFilteredData = () => {
    let data: (Category | Brand | Supplier)[] = [];
    switch (activeTab) {
      case 'categories':
        data = categories;
        break;
      case 'brands':
        data = brands;
        break;
      case 'suppliers':
        data = suppliers;
        break;
    }

    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  };

  const getStats = () => {
    const totalCategories = categories.length;
    const activeCategories = categories.filter(c => c.status === 'active').length;
    const totalBrands = brands.length;
    const activeBrands = brands.filter(b => b.status === 'active').length;
    const totalSuppliers = suppliers.length;
    const activeSuppliers = suppliers.filter(s => s.status === 'active').length;

    return {
      categories: { total: totalCategories, active: activeCategories },
      brands: { total: totalBrands, active: activeBrands },
      suppliers: { total: totalSuppliers, active: activeSuppliers }
    };
  };

  const stats = getStats();
  const filteredData = getFilteredData();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Master Produk</h1>
            <p className="text-gray-600">Kelola kategori, brand, dan supplier</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah {activeTab === 'categories' ? 'Kategori' : activeTab === 'brands' ? 'Brand' : 'Supplier'}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Kategori</p>
                <p className="text-2xl font-bold">{formatNumber(stats.categories.total)}</p>
                <p className="text-sm text-green-600">{stats.categories.active} aktif</p>
              </div>
              <Tag className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Brand</p>
                <p className="text-2xl font-bold">{formatNumber(stats.brands.total)}</p>
                <p className="text-sm text-green-600">{stats.brands.active} aktif</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Supplier</p>
                <p className="text-2xl font-bold">{formatNumber(stats.suppliers.total)}</p>
                <p className="text-sm text-green-600">{stats.suppliers.active} aktif</p>
              </div>
              <Building className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Kategori
                </div>
              </button>
              <button
                onClick={() => setActiveTab('brands')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'brands'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Brand
                </div>
              </button>
              <button
                onClick={() => setActiveTab('suppliers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'suppliers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Supplier
                </div>
              </button>
            </nav>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={`Cari ${activeTab === 'categories' ? 'kategori' : activeTab === 'brands' ? 'brand' : 'supplier'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {activeTab === 'categories' ? 'Daftar Kategori' : 
               activeTab === 'brands' ? 'Daftar Brand' : 'Daftar Supplier'} 
              ({formatNumber(filteredData.length)})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeTab === 'categories' ? 'Kategori' : activeTab === 'brands' ? 'Brand' : 'Supplier'}
                    </th>
                    {activeTab === 'suppliers' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kontak
                      </th>
                    )}
                    {activeTab === 'brands' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Negara
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Produk
                    </th>
                    {activeTab === 'suppliers' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dibuat
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">
                            {'description' in item ? item.description : 
                             'address' in item ? item.address : ''}
                          </div>
                          {activeTab === 'categories' && 'parentCategory' in item && item.parentCategory && (
                            <div className="text-xs text-blue-600">Parent: {item.parentCategory}</div>
                          )}
                        </div>
                      </td>
                      {activeTab === 'suppliers' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">
                              {'contactPerson' in item ? item.contactPerson : ''}
                            </div>
                            <div className="text-sm text-gray-500">
                              {'email' in item ? item.email : ''}
                            </div>
                            <div className="text-sm text-gray-500">
                              {'phone' in item ? item.phone : ''}
                            </div>
                          </div>
                        </td>
                      )}
                      {activeTab === 'brands' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {'country' in item ? item.country : ''}
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatNumber(item.productCount)}</div>
                        <div className="text-sm text-gray-500">produk</div>
                      </td>
                      {activeTab === 'suppliers' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">
                              {renderStars('rating' in item ? item.rating : 0)}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({'rating' in item ? item.rating : 0})
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {item.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.createdDate}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
