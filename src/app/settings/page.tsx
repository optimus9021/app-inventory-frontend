'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings,
  Users,
  Shield,
  Bell,
  Monitor,
  User,
  Lock,
  Globe,
  Database,
  ArrowRight,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface SettingsModule {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  status: 'active' | 'maintenance' | 'disabled';
  lastUpdated: string;
  features: string[];
  color: string;
}

export default function SettingsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const settingsModules: SettingsModule[] = [
    {
      id: '1',
      title: 'Manajemen Pengguna',
      description: 'Kelola akun pengguna, profil, dan data personal',
      icon: Users,
      href: '/settings/users',
      status: 'active',
      lastUpdated: '2025-01-31',
      features: ['Tambah/Edit User', 'Role Assignment', 'Profil Management', 'Status Aktivasi'],
      color: 'blue'
    },
    {
      id: '2',
      title: 'Manajemen Izin',
      description: 'Konfigurasi hak akses, role, dan permission sistem',
      icon: Shield,
      href: '/settings/permissions',
      status: 'active',
      lastUpdated: '2025-01-30',
      features: ['Role-based Access', 'Permission Matrix', 'Module Access', 'Security Policies'],
      color: 'green'
    },
    {
      id: '3',
      title: 'Pengaturan Notifikasi',
      description: 'Konfigurasi sistem notifikasi dan alert',
      icon: Bell,
      href: '/settings/notifications',
      status: 'active',
      lastUpdated: '2025-01-29',
      features: ['Email Templates', 'Push Notifications', 'Alert Rules', 'Frequency Settings'],
      color: 'orange'
    },
    {
      id: '4',
      title: 'Pengaturan Sistem',
      description: 'Konfigurasi sistem, database, dan preferensi aplikasi',
      icon: Monitor,
      href: '/settings/system',
      status: 'active',
      lastUpdated: '2025-01-28',
      features: ['System Config', 'Database Settings', 'API Settings', 'Backup Management'],
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      action: 'User role updated',
      user: 'Admin System',
      target: 'John Doe - Manager Role',
      timestamp: '2025-01-31 10:30',
      type: 'user'
    },
    {
      id: '2',
      action: 'Permission modified',
      user: 'Super Admin',
      target: 'Inventory Module - Read Access',
      timestamp: '2025-01-31 09:15',
      type: 'permission'
    },
    {
      id: '3',
      action: 'Notification rule created',
      user: 'System Manager',
      target: 'Low Stock Alert - Email',
      timestamp: '2025-01-30 16:45',
      type: 'notification'
    },
    {
      id: '4',
      action: 'System backup completed',
      user: 'System',
      target: 'Daily Database Backup',
      timestamp: '2025-01-30 02:00',
      type: 'system'
    }
  ];

  const systemStatus = [
    { label: 'Active Users', value: '24', status: 'good' },
    { label: 'System Health', value: '99.9%', status: 'good' },
    { label: 'Last Backup', value: '2 hours ago', status: 'good' },
    { label: 'Pending Updates', value: '3', status: 'warning' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Aktif', className: 'bg-green-100 text-green-800' },
      maintenance: { label: 'Maintenance', className: 'bg-yellow-100 text-yellow-800' },
      disabled: { label: 'Nonaktif', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    const iconConfig = {
      user: Users,
      permission: Shield,
      notification: Bell,
      system: Monitor
    };
    
    const IconComponent = iconConfig[type as keyof typeof iconConfig] || Activity;
    return <IconComponent className="w-4 h-4" />;
  };

  const filteredModules = settingsModules.filter(module => {
    if (selectedCategory === 'all') return true;
    return module.status === selectedCategory;
  });

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
            <p className="text-gray-600 mt-1">
              Kelola konfigurasi sistem, pengguna, dan pengaturan aplikasi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Module</option>
              <option value="active">Aktif</option>
              <option value="maintenance">Maintenance</option>
              <option value="disabled">Nonaktif</option>
            </select>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStatus.map((item, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  item.status === 'good' 
                    ? 'bg-green-100' 
                    : item.status === 'warning' 
                      ? 'bg-yellow-100' 
                      : 'bg-red-100'
                }`}>
                  <CheckCircle className={`w-6 h-6 ${
                    item.status === 'good' 
                      ? 'text-green-600' 
                      : item.status === 'warning' 
                        ? 'text-yellow-600' 
                        : 'text-red-600'
                  }`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Settings Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredModules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-${module.color}-100`}>
                      <IconComponent className={`w-6 h-6 text-${module.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      {getStatusBadge(module.status)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {module.lastUpdated}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{module.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Fitur Utama:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link href={module.href}>
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Settings className="w-4 h-4" />
                    Kelola {module.title}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-gray-600">
                      oleh {activity.user} • {activity.target}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.timestamp}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex items-center justify-center gap-2 h-12">
              <User className="w-5 h-5" />
              Tambah User Baru
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <Lock className="w-5 h-5" />
              Update Permissions
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <Database className="w-5 h-5" />
              Backup Database
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2 h-12">
              <Globe className="w-5 h-5" />
              System Diagnostics
            </Button>
          </div>
        </Card>

        {/* System Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informasi Sistem</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Aplikasi</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Versi: 2.0.0</div>
                <div>Build: 20250131</div>
                <div>Environment: Production</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Database</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Type: PostgreSQL</div>
                <div>Version: 14.2</div>
                <div>Size: 2.4 GB</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Server</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>OS: Ubuntu 22.04</div>
                <div>Memory: 8 GB</div>
                <div>Storage: 100 GB SSD</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    
  );
}
