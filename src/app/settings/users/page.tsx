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
  UserPlus,
  Edit,
  Eye,
  Mail,
  Shield,
  Activity,
  Settings,
  Key,
  Lock,
  Unlock,
  MoreHorizontal
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'viewer';
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  permissions: string[];
  loginAttempts: number;
  twoFactorEnabled: boolean;
}

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning';
}

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('users');

  // Mock data
  const users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@company.com',
      fullName: 'Administrator System',
      phone: '+62812-3456-7890',
      role: 'super_admin',
      department: 'IT',
      position: 'System Administrator',
      status: 'active',
      lastLogin: '2025-01-31 09:30',
      createdAt: '2024-01-15',
      updatedAt: '2025-01-31',
      permissions: ['all'],
      loginAttempts: 0,
      twoFactorEnabled: true
    },
    {
      id: '2',
      username: 'john.doe',
      email: 'john.doe@company.com',
      fullName: 'John Doe',
      phone: '+62812-3456-7891',
      role: 'manager',
      department: 'Operations',
      position: 'Operations Manager',
      status: 'active',
      lastLogin: '2025-01-31 08:45',
      createdAt: '2024-03-20',
      updatedAt: '2025-01-30',
      permissions: ['dashboard', 'products', 'supply-chain'],
      loginAttempts: 0,
      twoFactorEnabled: true
    },
    {
      id: '3',
      username: 'jane.smith',
      email: 'jane.smith@company.com',
      fullName: 'Jane Smith',
      phone: '+62812-3456-7892',
      role: 'staff',
      department: 'Sales',
      position: 'Sales Representative',
      status: 'active',
      lastLogin: '2025-01-30 17:20',
      createdAt: '2024-06-10',
      updatedAt: '2025-01-29',
      permissions: ['dashboard', 'sales-data'],
      loginAttempts: 1,
      twoFactorEnabled: false
    },
    {
      id: '4',
      username: 'mike.wilson',
      email: 'mike.wilson@company.com',
      fullName: 'Mike Wilson',
      phone: '+62812-3456-7893',
      role: 'viewer',
      department: 'Finance',
      position: 'Financial Analyst',
      status: 'inactive',
      lastLogin: '2025-01-25 14:30',
      createdAt: '2024-09-05',
      updatedAt: '2025-01-25',
      permissions: ['dashboard'],
      loginAttempts: 0,
      twoFactorEnabled: false
    }
  ];

  const userActivities: UserActivity[] = [
    {
      id: '1',
      userId: '2',
      action: 'Login',
      module: 'Authentication',
      timestamp: '2025-01-31 08:45',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0',
      status: 'success'
    },
    {
      id: '2',
      userId: '3',
      action: 'View Sales Report',
      module: 'Sales Data',
      timestamp: '2025-01-30 17:20',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox/121.0.0.0',
      status: 'success'
    },
    {
      id: '3',
      userId: '4',
      action: 'Failed Login',
      module: 'Authentication',
      timestamp: '2025-01-30 09:15',
      ipAddress: '192.168.1.110',
      userAgent: 'Edge/120.0.0.0',
      status: 'failed'
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: 'Super Admin', className: 'bg-red-100 text-red-800' },
      admin: { label: 'Admin', className: 'bg-purple-100 text-purple-800' },
      manager: { label: 'Manager', className: 'bg-blue-100 text-blue-800' },
      staff: { label: 'Staff', className: 'bg-green-100 text-green-800' },
      viewer: { label: 'Viewer', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Tidak Aktif', className: 'bg-gray-100 text-gray-800' },
      suspended: { label: 'Suspended', className: 'bg-red-100 text-red-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getActivityStatusBadge = (status: string) => {
    const statusConfig = {
      success: { label: 'Success', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800' },
      warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  // Calculate summary statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const recentLogins = users.filter(user => {
    const lastLogin = new Date(user.lastLogin);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  }).length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
            <p className="text-gray-600 mt-1">
              Kelola akun pengguna, role, dan hak akses sistem
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Tambah Pengguna
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pengguna Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tidak Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Login Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">{recentLogins}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Key className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Daftar Pengguna</TabsTrigger>
            <TabsTrigger value="activities">Log Aktivitas</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari pengguna..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Role</option>
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                  <option value="viewer">Viewer</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Department</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </select>

                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </Card>

            {/* Users Table */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Daftar Pengguna ({filteredUsers.length} dari {totalUsers})
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Lanjutan
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Pengguna</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">2FA</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {user.fullName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-gray-500 text-xs">@{user.username}</div>
                              <div className="text-gray-500 text-xs flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {getRoleBadge(user.role)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{user.department}</div>
                          <div className="text-gray-500 text-xs">{user.position}</div>
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">{user.lastLogin}</div>
                          {user.loginAttempts > 0 && (
                            <div className="text-xs text-red-500">
                              {user.loginAttempts} failed attempts
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {user.twoFactorEnabled ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Lock className="w-3 h-3 mr-1" />
                              Enabled
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              <Unlock className="w-3 h-3 mr-1" />
                              Disabled
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" title="Lihat Detail">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Edit">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="Settings">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" title="More">
                              <MoreHorizontal className="w-4 h-4" />
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

          <TabsContent value="activities" className="space-y-6">
            {/* Activity Log */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Log Aktivitas Pengguna</h2>
              
              <div className="space-y-4">
                {userActivities.map((activity) => {
                  const user = users.find(u => u.id === activity.userId);
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-gray-600">
                            {user?.fullName} • {activity.module}
                          </div>
                          <div className="text-xs text-gray-500">
                            IP: {activity.ipAddress} • {activity.userAgent}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getActivityStatusBadge(activity.status)}
                        <div className="text-sm text-gray-500 mt-1">{activity.timestamp}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* User Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Pengaturan Pengguna</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Kebijakan Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Length
                      </label>
                      <Input type="number" defaultValue="8" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password Expiry (days)
                      </label>
                      <Input type="number" defaultValue="90" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Kebijakan Login</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <Input type="number" defaultValue="3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lockout Duration (minutes)
                      </label>
                      <Input type="number" defaultValue="15" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Session Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Concurrent Sessions
                      </label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Simpan Pengaturan</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
