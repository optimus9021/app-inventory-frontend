'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star
} from 'lucide-react';
import type { Supplier } from '@/types';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockSuppliers: Supplier[] = [
        {
          id: 1,
          name: 'PT Dell Indonesia',
          contactPerson: 'John Doe',
          email: 'contact@dell.co.id',
          phone: '+62-21-5555-0001',
          address: 'Jl. Sudirman No. 123',
          city: 'Jakarta',
          country: 'Indonesia',
          taxId: '01.234.567.8-901.000',
          paymentTerms: 'NET 30',
          rating: 4.5,
          isActive: true,
          createdAt: '2024-01-01'
        },
        {
          id: 2,
          name: 'PT Apple Indonesia',
          contactPerson: 'Jane Smith',
          email: 'contact@apple.co.id',
          phone: '+62-21-5555-0002',
          address: 'Jl. Thamrin No. 456',
          city: 'Jakarta',
          country: 'Indonesia',
          taxId: '01.234.567.8-902.000',
          paymentTerms: 'NET 15',
          rating: 4.8,
          isActive: true,
          createdAt: '2024-01-01'
        },
        {
          id: 3,
          name: 'PT Samsung Electronics',
          contactPerson: 'Kim Lee',
          email: 'contact@samsung.co.id',
          phone: '+62-21-5555-0003',
          address: 'Jl. Gatot Subroto No. 789',
          city: 'Jakarta',
          country: 'Indonesia',
          taxId: '01.234.567.8-903.000',
          paymentTerms: 'NET 30',
          rating: 4.3,
          isActive: false,
          createdAt: '2024-01-01'
        }
      ];
      setSuppliers(mockSuppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">Aktif</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Tidak Aktif</Badge>
    );
  };

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Supplier</h1>
              <p className="text-gray-600 mt-1">Kelola data supplier dan vendor</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                Import Supplier
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Supplier
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Supplier</p>
                  <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Supplier Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {suppliers.filter(s => s.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rating Rata-rata</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(suppliers.reduce((acc, s) => acc + s.rating, 0) / suppliers.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Supplier Nonaktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {suppliers.filter(s => !s.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari supplier, kontak, atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Status</option>
                  <option>Aktif</option>
                  <option>Tidak Aktif</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Semua Kota</option>
                  <option>Jakarta</option>
                  <option>Bandung</option>
                  <option>Surabaya</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suppliers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Supplier ({filteredSuppliers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Kontak</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Lokasi</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Payment Terms</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500">{supplier.contactPerson}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-2" />
                            {supplier.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-3 h-3 mr-2" />
                            {supplier.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-2" />
                          {supplier.city}, {supplier.country}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900">{supplier.paymentTerms}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {getRatingStars(supplier.rating)}
                          <span className="ml-1 text-sm text-gray-600">({supplier.rating})</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(supplier.isActive)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
