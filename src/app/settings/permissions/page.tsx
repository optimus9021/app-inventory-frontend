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
  Shield, 
  Eye,
  Edit,
  Plus,
  Copy,
  Trash2,
  Check,
  X,
  AlertTriangle,
  Info,
  Lock,
  Unlock,
  Key,
  UserCheck
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
  category: 'read' | 'write' | 'admin' | 'system';
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PermissionsPage() {
  const [activeTab, setActiveTab] = useState('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');

  // Mock data
  const permissions: Permission[] = [
    {
      id: 'perm_1',
      name: 'dashboard.view',
      description: 'Melihat dashboard utama',
      module: 'Dashboard',
      action: 'view',
      category: 'read',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_2',
      name: 'products.view',
      description: 'Melihat daftar produk',
      module: 'Products',
      action: 'view',
      category: 'read',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_3',
      name: 'products.create',
      description: 'Membuat produk baru',
      module: 'Products',
      action: 'create',
      category: 'write',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_4',
      name: 'products.edit',
      description: 'Mengedit informasi produk',
      module: 'Products',
      action: 'edit',
      category: 'write',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_5',
      name: 'products.delete',
      description: 'Menghapus produk',
      module: 'Products',
      action: 'delete',
      category: 'admin',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_6',
      name: 'users.manage',
      description: 'Mengelola pengguna sistem',
      module: 'Users',
      action: 'manage',
      category: 'admin',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'perm_7',
      name: 'system.configure',
      description: 'Mengkonfigurasi sistem',
      module: 'System',
      action: 'configure',
      category: 'system',
      isSystem: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ];

  const roles: Role[] = [
    {
      id: 'role_1',
      name: 'super_admin',
      displayName: 'Super Administrator',
      description: 'Akses penuh ke seluruh sistem',
      permissions: permissions.map(p => p.id),
      userCount: 1,
      isSystem: true,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'role_2',
      name: 'admin',
      displayName: 'Administrator',
      description: 'Akses administratif dengan pembatasan sistem',
      permissions: ['perm_1', 'perm_2', 'perm_3', 'perm_4', 'perm_5', 'perm_6'],
      userCount: 2,
      isSystem: true,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'role_3',
      name: 'manager',
      displayName: 'Manager',
      description: 'Akses manajerial untuk operasional',
      permissions: ['perm_1', 'perm_2', 'perm_3', 'perm_4'],
      userCount: 3,
      isSystem: true,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'role_4',
      name: 'staff',
      displayName: 'Staff',
      description: 'Akses operasional dasar',
      permissions: ['perm_1', 'perm_2', 'perm_3'],
      userCount: 5,
      isSystem: true,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 'role_5',
      name: 'viewer',
      displayName: 'Viewer',
      description: 'Akses hanya untuk melihat',
      permissions: ['perm_1', 'perm_2'],
      userCount: 2,
      isSystem: true,
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    }
  ];

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      read: { label: 'Read', className: 'bg-blue-100 text-blue-800' },
      write: { label: 'Write', className: 'bg-green-100 text-green-800' },
      admin: { label: 'Admin', className: 'bg-orange-100 text-orange-800' },
      system: { label: 'System', className: 'bg-red-100 text-red-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getSystemBadge = (isSystem: boolean) => {
    return isSystem ? (
      <Badge className="bg-red-100 text-red-800">
        <Lock className="w-3 h-3 mr-1" />
        System
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800">
        <Unlock className="w-3 h-3 mr-1" />
        Custom
      </Badge>
    );
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = 
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || permission.category === selectedCategory;
    const matchesModule = selectedModule === 'all' || permission.module === selectedModule;
    
    return matchesSearch && matchesCategory && matchesModule;
  });

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const totalRoles = roles.length;
  const activeRoles = roles.filter(role => role.isActive).length;
  const totalPermissions = permissions.length;
  const systemPermissions = permissions.filter(p => p.isSystem).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Permissions</h1>
            <p className="text-gray-600 mt-1">
              Kelola role dan hak akses pengguna sistem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Permission
            </Button>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Buat Role
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900">{totalRoles}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Roles</p>
                <p className="text-2xl font-bold text-gray-900">{activeRoles}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permissions</p>
                <p className="text-2xl font-bold text-gray-900">{totalPermissions}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Permissions</p>
                <p className="text-2xl font-bold text-gray-900">{systemPermissions}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-6">
            {/* Roles Filter */}
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </Card>

            {/* Roles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map((role) => (
                <Card key={role.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{role.displayName}</h3>
                        <p className="text-sm text-gray-600">@{role.name}</p>
                      </div>
                    </div>
                    {getSystemBadge(role.isSystem)}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Users</span>
                      <span className="font-medium">{role.userCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Permissions</span>
                      <span className="font-medium">{role.permissions.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge className={role.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {role.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Detail
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            {/* Permissions Filter */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari permissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="read">Read</option>
                  <option value="write">Write</option>
                  <option value="admin">Admin</option>
                  <option value="system">System</option>
                </select>

                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Module</option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Products">Products</option>
                  <option value="Users">Users</option>
                  <option value="System">System</option>
                </select>

                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Permission
                </Button>
              </div>
            </Card>

            {/* Permissions Table */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Daftar Permissions ({filteredPermissions.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Permission</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Module</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPermissions.map((permission) => (
                      <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{permission.name}</div>
                            <div className="text-gray-500 text-xs">{permission.description}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-gray-100 text-gray-800">
                            {permission.module}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          {getCategoryBadge(permission.category)}
                        </td>
                        <td className="py-3 px-4">
                          {getSystemBadge(permission.isSystem)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Edit">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {!permission.isSystem && (
                              <Button variant="outline" size="sm" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="matrix" className="space-y-6">
            {/* Permission Matrix */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Matrix Permission vs Role</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 sticky left-0 bg-white">
                        Permission
                      </th>
                      {roles.map((role) => (
                        <th key={role.id} className="text-center py-3 px-4 font-medium text-gray-900">
                          <div className="flex flex-col items-center gap-1">
                            <span>{role.displayName}</span>
                            <Badge className="text-xs">
                              {role.userCount} users
                            </Badge>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((permission) => (
                      <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 sticky left-0 bg-white">
                          <div>
                            <div className="font-medium">{permission.name}</div>
                            <div className="text-gray-500 text-xs">{permission.module}</div>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="py-3 px-4 text-center">
                            {role.permissions.includes(permission.id) ? (
                              <div className="flex justify-center">
                                <div className="p-1 bg-green-100 rounded-full">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center">
                                <div className="p-1 bg-gray-100 rounded-full">
                                  <X className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Permission Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Permission Coverage</h3>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between">
                      <span className="text-sm">{role.displayName}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(role.permissions.length / permissions.length) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {Math.round((role.permissions.length / permissions.length) * 100)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Security Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-yellow-800">Role Review Required</div>
                      <div className="text-yellow-700">Some roles have excessive permissions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium text-blue-800">Regular Audit</div>
                      <div className="text-blue-700">Schedule monthly permission reviews</div>
                    </div>
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
