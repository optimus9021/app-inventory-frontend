'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Settings,
  Eye,
  Download,
  Filter,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Wifi,
  WifiOff,
  Activity,
  Database,
  RefreshCw,
  Key,
  Shield,
  Globe,
  Link,
  Zap
} from 'lucide-react';

interface PlatformIntegration {
  id: string;
  platformName: string;
  platformType: 'marketplace' | 'social-commerce' | 'own-store' | 'wholesale';
  status: 'connected' | 'disconnected' | 'error' | 'syncing' | 'pending';
  connectionHealth: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  lastSync: string;
  nextSync: string;
  apiVersion: string;
  totalOrders: number;
  totalRevenue: number;
  syncInterval: number; // in minutes
  errorCount: number;
  successRate: number;
  dataPoints: DataPoint[];
  credentials: ApiCredentials;
  configuration: PlatformConfig;
}

interface DataPoint {
  type: 'orders' | 'products' | 'inventory' | 'customers' | 'analytics';
  lastUpdated: string;
  recordCount: number;
  status: 'synced' | 'pending' | 'error';
  errorMessage?: string;
}

interface ApiCredentials {
  type: 'api-key' | 'oauth' | 'basic-auth' | 'custom';
  isValid: boolean;
  expiryDate?: string;
  lastValidated: string;
}

interface PlatformConfig {
  autoSync: boolean;
  syncProducts: boolean;
  syncOrders: boolean;
  syncInventory: boolean;
  syncCustomers: boolean;
  webhooksEnabled: boolean;
  compressionEnabled: boolean;
  batchSize: number;
}

const mockPlatformIntegrations: PlatformIntegration[] = [
  {
    id: '1',
    platformName: 'TikTok Shop',
    platformType: 'social-commerce',
    status: 'connected',
    connectionHealth: 'excellent',
    lastSync: '2025-01-30T14:30:00Z',
    nextSync: '2025-01-30T15:00:00Z',
    apiVersion: 'v2.1',
    totalOrders: 3520,
    totalRevenue: 980000000,
    syncInterval: 30,
    errorCount: 2,
    successRate: 99.8,
    dataPoints: [
      {
        type: 'orders',
        lastUpdated: '2025-01-30T14:30:00Z',
        recordCount: 3520,
        status: 'synced'
      },
      {
        type: 'products',
        lastUpdated: '2025-01-30T14:25:00Z',
        recordCount: 1245,
        status: 'synced'
      },
      {
        type: 'inventory',
        lastUpdated: '2025-01-30T14:30:00Z',
        recordCount: 1245,
        status: 'synced'
      }
    ],
    credentials: {
      type: 'oauth',
      isValid: true,
      expiryDate: '2025-12-30',
      lastValidated: '2025-01-30T10:00:00Z'
    },
    configuration: {
      autoSync: true,
      syncProducts: true,
      syncOrders: true,
      syncInventory: true,
      syncCustomers: false,
      webhooksEnabled: true,
      compressionEnabled: true,
      batchSize: 1000
    }
  },
  {
    id: '2',
    platformName: 'Shopee',
    platformType: 'marketplace',
    status: 'connected',
    connectionHealth: 'good',
    lastSync: '2025-01-30T14:15:00Z',
    nextSync: '2025-01-30T15:15:00Z',
    apiVersion: 'v4.0',
    totalOrders: 3060,
    totalRevenue: 857500000,
    syncInterval: 60,
    errorCount: 8,
    successRate: 98.5,
    dataPoints: [
      {
        type: 'orders',
        lastUpdated: '2025-01-30T14:15:00Z',
        recordCount: 3060,
        status: 'synced'
      },
      {
        type: 'products',
        lastUpdated: '2025-01-30T14:10:00Z',
        recordCount: 1180,
        status: 'synced'
      },
      {
        type: 'inventory',
        lastUpdated: '2025-01-30T14:12:00Z',
        recordCount: 1180,
        status: 'pending'
      }
    ],
    credentials: {
      type: 'api-key',
      isValid: true,
      lastValidated: '2025-01-30T09:00:00Z'
    },
    configuration: {
      autoSync: true,
      syncProducts: true,
      syncOrders: true,
      syncInventory: true,
      syncCustomers: true,
      webhooksEnabled: false,
      compressionEnabled: true,
      batchSize: 500
    }
  },
  {
    id: '3',
    platformName: 'Tokopedia',
    platformType: 'marketplace',
    status: 'error',
    connectionHealth: 'poor',
    lastSync: '2025-01-30T12:45:00Z',
    nextSync: '2025-01-30T15:45:00Z',
    apiVersion: 'v3.2',
    totalOrders: 2190,
    totalRevenue: 612500000,
    syncInterval: 60,
    errorCount: 25,
    successRate: 92.3,
    dataPoints: [
      {
        type: 'orders',
        lastUpdated: '2025-01-30T12:45:00Z',
        recordCount: 2190,
        status: 'error',
        errorMessage: 'API rate limit exceeded'
      },
      {
        type: 'products',
        lastUpdated: '2025-01-30T12:30:00Z',
        recordCount: 980,
        status: 'synced'
      }
    ],
    credentials: {
      type: 'oauth',
      isValid: false,
      expiryDate: '2025-02-15',
      lastValidated: '2025-01-28T08:00:00Z'
    },
    configuration: {
      autoSync: false,
      syncProducts: true,
      syncOrders: true,
      syncInventory: false,
      syncCustomers: false,
      webhooksEnabled: false,
      compressionEnabled: false,
      batchSize: 250
    }
  },
  {
    id: '4',
    platformName: 'Blibli',
    platformType: 'marketplace',
    status: 'pending',
    connectionHealth: 'fair',
    lastSync: '',
    nextSync: '',
    apiVersion: 'v2.0',
    totalOrders: 0,
    totalRevenue: 0,
    syncInterval: 120,
    errorCount: 0,
    successRate: 0,
    dataPoints: [],
    credentials: {
      type: 'api-key',
      isValid: false,
      lastValidated: ''
    },
    configuration: {
      autoSync: false,
      syncProducts: false,
      syncOrders: false,
      syncInventory: false,
      syncCustomers: false,
      webhooksEnabled: false,
      compressionEnabled: true,
      batchSize: 500
    }
  },
  {
    id: '5',
    platformName: 'Lazada',
    platformType: 'marketplace',
    status: 'disconnected',
    connectionHealth: 'critical',
    lastSync: '2025-01-28T10:20:00Z',
    nextSync: '',
    apiVersion: 'v3.0',
    totalOrders: 850,
    totalRevenue: 245000000,
    syncInterval: 180,
    errorCount: 45,
    successRate: 75.2,
    dataPoints: [
      {
        type: 'orders',
        lastUpdated: '2025-01-28T10:20:00Z',
        recordCount: 850,
        status: 'error',
        errorMessage: 'Authentication failed'
      }
    ],
    credentials: {
      type: 'oauth',
      isValid: false,
      expiryDate: '2025-01-25',
      lastValidated: '2025-01-25T12:00:00Z'
    },
    configuration: {
      autoSync: false,
      syncProducts: false,
      syncOrders: false,
      syncInventory: false,
      syncCustomers: false,
      webhooksEnabled: false,
      compressionEnabled: true,
      batchSize: 300
    }
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
    case 'disconnected':
      return <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>;
    case 'error':
      return <Badge className="bg-red-100 text-red-800">Error</Badge>;
    case 'syncing':
      return <Badge className="bg-blue-100 text-blue-800">Syncing</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getHealthBadge = (health: string) => {
  switch (health) {
    case 'excellent':
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    case 'good':
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    case 'fair':
      return <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>;
    case 'poor':
      return <Badge className="bg-orange-100 text-orange-800">Poor</Badge>;
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'disconnected':
      return <XCircle className="h-4 w-4 text-gray-600" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'syncing':
      return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    default:
      return null;
  }
};

const getConnectionIcon = (status: string) => {
  return status === 'connected' ? 
    <Wifi className="h-4 w-4 text-green-600" /> : 
    <WifiOff className="h-4 w-4 text-red-600" />;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('id-ID');
};

export default function PlatformIntegrationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredIntegrations = mockPlatformIntegrations.filter(integration => {
    const matchesSearch = integration.platformName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || integration.status === selectedStatus;
    const matchesType = selectedType === 'all' || integration.platformType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalIntegrations = filteredIntegrations.length;
  const connectedIntegrations = filteredIntegrations.filter(i => i.status === 'connected').length;
  const errorIntegrations = filteredIntegrations.filter(i => i.status === 'error').length;
  const totalRevenue = filteredIntegrations.reduce((sum, integration) => sum + integration.totalRevenue, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Platform Integration Management</h1>
            <p className="text-muted-foreground">
              Kelola integrasi dan sinkronisasi data dari berbagai platform e-commerce
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Platform
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Platforms</p>
                <p className="text-2xl font-bold">{totalIntegrations}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Connected</p>
                <p className="text-2xl font-bold text-green-600">{connectedIntegrations}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-red-600">{errorIntegrations}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalRevenue)}
                </p>
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
                  placeholder="Cari platform..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="connected">Connected</option>
              <option value="disconnected">Disconnected</option>
              <option value="error">Error</option>
              <option value="syncing">Syncing</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Tipe</option>
              <option value="marketplace">Marketplace</option>
              <option value="social-commerce">Social Commerce</option>
              <option value="own-store">Own Store</option>
              <option value="wholesale">Wholesale</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Platform Integration Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Integrations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Platform</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Health</th>
                    <th className="text-center p-4">Sync Info</th>
                    <th className="text-center p-4">Performance</th>
                    <th className="text-right p-4">Revenue</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIntegrations.map((integration) => (
                    <tr key={integration.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          {getConnectionIcon(integration.status)}
                          <div>
                            <div className="font-medium">{integration.platformName}</div>
                            <div className="text-sm text-muted-foreground capitalize">
                              {integration.platformType.replace('-', ' ')} • API {integration.apiVersion}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(integration.status)}
                          {getStatusBadge(integration.status)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getHealthBadge(integration.connectionHealth)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-sm">
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="h-3 w-3 mr-1 text-blue-600" />
                            Last: {formatDate(integration.lastSync)}
                          </div>
                          {integration.nextSync && (
                            <div className="flex items-center justify-center text-muted-foreground">
                              <Zap className="h-3 w-3 mr-1" />
                              Next: {formatDate(integration.nextSync)}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            Every {integration.syncInterval}min
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-blue-600">
                            {formatNumber(integration.totalOrders)} orders
                          </div>
                          <div className="text-green-600">
                            {integration.successRate.toFixed(1)}% success
                          </div>
                          {integration.errorCount > 0 && (
                            <div className="text-red-600">
                              {integration.errorCount} errors
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(integration.totalRevenue)}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          {integration.status !== 'connected' && (
                            <Button variant="outline" size="sm">
                              <Link className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Integration Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Data Sync Status</h3>
            <div className="space-y-4">
              {filteredIntegrations
                .filter(i => i.status === 'connected')
                .slice(0, 3)
                .map((integration) => (
                  <div key={integration.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{integration.platformName}</span>
                      <div className="flex items-center space-x-2">
                        {getConnectionIcon(integration.status)}
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {integration.dataPoints.map((dataPoint, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="capitalize">{dataPoint.type}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground">
                              {formatNumber(dataPoint.recordCount)} records
                            </span>
                            {dataPoint.status === 'synced' && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                            {dataPoint.status === 'pending' && (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                            {dataPoint.status === 'error' && (
                              <AlertTriangle className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security & Credentials</h3>
            <div className="space-y-4">
              {filteredIntegrations.slice(0, 3).map((integration) => (
                <div key={integration.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{integration.platformName}</span>
                    <div className="flex items-center space-x-2">
                      {integration.credentials.isValid ? (
                        <Shield className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <Key className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Auth Type:</span>
                      <span className="font-medium capitalize">
                        {integration.credentials.type.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      {integration.credentials.isValid ? (
                        <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Invalid</Badge>
                      )}
                    </div>
                    {integration.credentials.expiryDate && (
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span className="text-muted-foreground">
                          {integration.credentials.expiryDate}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Last Validated:</span>
                      <span className="text-muted-foreground">
                        {formatDate(integration.credentials.lastValidated)}
                      </span>
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
