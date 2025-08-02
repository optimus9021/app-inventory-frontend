'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Clock,
  Search,
  Filter,
  Download,
  Archive,
  Trash2,
  CheckCircle,
  XCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Webhook,
  Eye,
  RotateCcw,
  TrendingUp,
  Activity,
  Package,
  Shield,
  Database,
  Truck,
  Users,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface NotificationHistory {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'system' | 'inventory' | 'sales' | 'operations' | 'security' | 'user';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'bounced';
  channel: 'email' | 'sms' | 'push' | 'webhook' | 'in_app';
  recipients: string[];
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  failureReason?: string;
  ruleId?: string;
  ruleName?: string;
  metadata: {
    userId?: string;
    orderId?: string;
    productId?: string;
    [key: string]: string | number | undefined;
  };
  responseTime?: number;
  retryCount?: number;
  cost?: number;
}

interface NotificationStats {
  totalSent: number;
  delivered: number;
  read: number;
  failed: number;
  deliveryRate: number;
  readRate: number;
  avgResponseTime: number;
  totalCost: number;
  byChannel: Record<string, number>;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
}

export default function NotificationHistoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Mock data
  const notificationHistory: NotificationHistory[] = [
    {
      id: 'hist_1',
      title: 'Low Stock Alert',
      message: 'Product "Samsung Galaxy S24" is running low. Current stock: 5 units.',
      type: 'warning',
      category: 'inventory',
      priority: 'high',
      status: 'read',
      channel: 'email',
      recipients: ['warehouse@company.com', 'manager@company.com'],
      sentAt: '2025-01-31 14:30:00',
      deliveredAt: '2025-01-31 14:30:15',
      readAt: '2025-01-31 14:35:20',
      ruleId: 'rule_1',
      ruleName: 'Low Stock Alert',
      metadata: {
        productId: 'prod_123',
        currentStock: '5',
        threshold: '10'
      },
      responseTime: 15,
      retryCount: 0,
      cost: 0.005
    },
    {
      id: 'hist_2',
      title: 'High Value Transaction',
      message: 'New transaction of $75,000 detected.',
      type: 'info',
      category: 'sales',
      priority: 'medium',
      status: 'delivered',
      channel: 'push',
      recipients: ['sales@company.com'],
      sentAt: '2025-01-31 13:45:00',
      deliveredAt: '2025-01-31 13:45:02',
      ruleId: 'rule_2',
      ruleName: 'High Value Transaction',
      metadata: {
        orderId: 'order_456',
        amount: '75000'
      },
      responseTime: 2,
      retryCount: 0,
      cost: 0.001
    },
    {
      id: 'hist_3',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected for user "admin".',
      type: 'error',
      category: 'security',
      priority: 'critical',
      status: 'failed',
      channel: 'sms',
      recipients: ['security@company.com'],
      sentAt: '2025-01-31 12:15:00',
      failureReason: 'Invalid phone number',
      ruleId: 'rule_3',
      ruleName: 'Failed Login Attempts',
      metadata: {
        userId: 'admin',
        attempts: '5',
        ipAddress: '192.168.1.100'
      },
      responseTime: 0,
      retryCount: 2,
      cost: 0
    },
    {
      id: 'hist_4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will begin in 2 hours.',
      type: 'info',
      category: 'system',
      priority: 'medium',
      status: 'sent',
      channel: 'in_app',
      recipients: ['all_users'],
      sentAt: '2025-01-31 10:00:00',
      ruleId: 'rule_4',
      ruleName: 'Maintenance Notification',
      metadata: {
        maintenanceWindow: '02:00-04:00'
      },
      responseTime: 1,
      retryCount: 0,
      cost: 0
    },
    {
      id: 'hist_5',
      title: 'Delivery Update',
      message: 'Your order #12345 has been shipped and is on the way.',
      type: 'success',
      category: 'operations',
      priority: 'low',
      status: 'read',
      channel: 'email',
      recipients: ['customer@example.com'],
      sentAt: '2025-01-31 09:30:00',
      deliveredAt: '2025-01-31 09:30:05',
      readAt: '2025-01-31 10:15:00',
      metadata: {
        orderId: 'order_12345',
        trackingNumber: 'TRK123456789'
      },
      responseTime: 5,
      retryCount: 0,
      cost: 0.003
    },
    {
      id: 'hist_6',
      title: 'User Registration',
      message: 'New user has registered and requires approval.',
      type: 'info',
      category: 'user',
      priority: 'low',
      status: 'delivered',
      channel: 'webhook',
      recipients: ['admin@company.com'],
      sentAt: '2025-01-31 08:45:00',
      deliveredAt: '2025-01-31 08:45:01',
      metadata: {
        userId: 'user_789',
        userEmail: 'newuser@example.com'
      },
      responseTime: 1,
      retryCount: 0,
      cost: 0.001
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'read':
        return <Eye className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      case 'bounced':
        return <RotateCcw className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { label: 'Sent', className: 'bg-blue-100 text-blue-800' },
      delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800' },
      read: { label: 'Read', className: 'bg-purple-100 text-purple-800' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800' },
      bounced: { label: 'Bounced', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {getStatusIcon(status)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'push':
        return <Smartphone className="w-4 h-4" />;
      case 'webhook':
        return <Webhook className="w-4 h-4" />;
      case 'in_app':
        return <Bell className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory':
        return <Package className="w-4 h-4" />;
      case 'sales':
        return <TrendingUp className="w-4 h-4" />;
      case 'system':
        return <Database className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'operations':
        return <Truck className="w-4 h-4" />;
      case 'user':
        return <Users className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medium', className: 'bg-blue-100 text-blue-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredHistory = notificationHistory.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.recipients.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesChannel = selectedChannel === 'all' || item.channel === selectedChannel;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesChannel && matchesStatus && matchesCategory;
  });

  const getTabHistory = (tab: string) => {
    switch (tab) {
      case 'all':
        return filteredHistory;
      case 'delivered':
        return filteredHistory.filter(h => h.status === 'delivered' || h.status === 'read');
      case 'failed':
        return filteredHistory.filter(h => h.status === 'failed' || h.status === 'bounced');
      case 'pending':
        return filteredHistory.filter(h => h.status === 'sent');
      default:
        return filteredHistory;
    }
  };

  const currentHistory = getTabHistory(activeTab);
  const totalPages = Math.ceil(currentHistory.length / itemsPerPage);
  const paginatedHistory = currentHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const stats: NotificationStats = {
    totalSent: notificationHistory.length,
    delivered: notificationHistory.filter(h => h.status === 'delivered' || h.status === 'read').length,
    read: notificationHistory.filter(h => h.status === 'read').length,
    failed: notificationHistory.filter(h => h.status === 'failed' || h.status === 'bounced').length,
    deliveryRate: 0,
    readRate: 0,
    avgResponseTime: 0,
    totalCost: notificationHistory.reduce((sum, h) => sum + (h.cost || 0), 0),
    byChannel: {
      email: notificationHistory.filter(h => h.channel === 'email').length,
      sms: notificationHistory.filter(h => h.channel === 'sms').length,
      push: notificationHistory.filter(h => h.channel === 'push').length,
      webhook: notificationHistory.filter(h => h.channel === 'webhook').length,
      in_app: notificationHistory.filter(h => h.channel === 'in_app').length
    },
    byCategory: {
      inventory: notificationHistory.filter(h => h.category === 'inventory').length,
      sales: notificationHistory.filter(h => h.category === 'sales').length,
      system: notificationHistory.filter(h => h.category === 'system').length,
      security: notificationHistory.filter(h => h.category === 'security').length,
      operations: notificationHistory.filter(h => h.category === 'operations').length,
      user: notificationHistory.filter(h => h.category === 'user').length
    },
    byStatus: {
      sent: notificationHistory.filter(h => h.status === 'sent').length,
      delivered: notificationHistory.filter(h => h.status === 'delivered').length,
      read: notificationHistory.filter(h => h.status === 'read').length,
      failed: notificationHistory.filter(h => h.status === 'failed').length,
      bounced: notificationHistory.filter(h => h.status === 'bounced').length
    }
  };

  stats.deliveryRate = stats.totalSent > 0 ? (stats.delivered / stats.totalSent) * 100 : 0;
  stats.readRate = stats.delivered > 0 ? (stats.read / stats.delivered) * 100 : 0;
  stats.avgResponseTime = notificationHistory.reduce((sum, h) => sum + (h.responseTime || 0), 0) / notificationHistory.length;

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notification History</h1>
            <p className="text-gray-600 mt-1">
              Riwayat lengkap semua notifikasi yang telah dikirim
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline">
              <Trash2 className="w-4 h-4 mr-2" />
              Cleanup
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSent}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
                <p className="text-xs text-green-600">{stats.deliveryRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Read</p>
                <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
                <p className="text-xs text-purple-600">{stats.readRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
                <p className="text-xs text-red-600">
                  {stats.totalSent > 0 ? ((stats.failed / stats.totalSent) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime.toFixed(1)}s</p>
                <p className="text-xs text-gray-600">Cost: ${stats.totalCost.toFixed(3)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">By Channel</h3>
            <div className="space-y-3">
              {Object.entries(stats.byChannel).map(([channel, count]) => (
                <div key={channel} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getChannelIcon(channel)}
                    <span className="capitalize">{channel.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalSent) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">By Category</h3>
            <div className="space-y-3">
              {Object.entries(stats.byCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="capitalize">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalSent) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Channels</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
              <option value="webhook">Webhook</option>
              <option value="in_app">In-App</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="sent">Sent</option>
              <option value="delivered">Delivered</option>
              <option value="read">Read</option>
              <option value="failed">Failed</option>
              <option value="bounced">Bounced</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="inventory">Inventory</option>
              <option value="sales">Sales</option>
              <option value="system">System</option>
              <option value="security">Security</option>
              <option value="operations">Operations</option>
              <option value="user">User</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="custom">Custom Range</option>
            </select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({filteredHistory.length})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              Delivered ({filteredHistory.filter(h => h.status === 'delivered' || h.status === 'read').length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed ({filteredHistory.filter(h => h.status === 'failed' || h.status === 'bounced').length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({filteredHistory.filter(h => h.status === 'sent').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {/* History List */}
            <div className="space-y-4">
              {paginatedHistory.length === 0 ? (
                <Card className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-gray-600">No notification history found for the current filters.</p>
                </Card>
              ) : (
                paginatedHistory.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getCategoryIcon(item.category)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            {getStatusBadge(item.status)}
                            {getPriorityBadge(item.priority)}
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              {getChannelIcon(item.channel)}
                              <span className="capitalize">{item.channel.replace('_', ' ')}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-3">{item.message}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Recipients</p>
                              <div className="text-sm text-gray-700">
                                {item.recipients.slice(0, 2).map(recipient => (
                                  <div key={recipient}>{recipient}</div>
                                ))}
                                {item.recipients.length > 2 && (
                                  <div className="text-gray-500">+{item.recipients.length - 2} more</div>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Timeline</p>
                              <div className="text-sm text-gray-700 space-y-1">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Sent: {item.sentAt}
                                </div>
                                {item.deliveredAt && (
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Delivered: {item.deliveredAt}
                                  </div>
                                )}
                                {item.readAt && (
                                  <div className="flex items-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    Read: {item.readAt}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Details</p>
                              <div className="text-sm text-gray-700 space-y-1">
                                {item.responseTime !== undefined && (
                                  <div>Response: {item.responseTime}s</div>
                                )}
                                {item.retryCount !== undefined && item.retryCount > 0 && (
                                  <div>Retries: {item.retryCount}</div>
                                )}
                                {item.cost !== undefined && (
                                  <div>Cost: ${item.cost.toFixed(4)}</div>
                                )}
                                {item.ruleName && (
                                  <div>Rule: {item.ruleName}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {item.failureReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                              <div className="flex items-center gap-2 text-red-800">
                                <XCircle className="w-4 h-4" />
                                <span className="font-medium">Failure Reason:</span>
                              </div>
                              <p className="text-red-700 text-sm mt-1">{item.failureReason}</p>
                            </div>
                          )}

                          {Object.keys(item.metadata).length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm font-medium text-gray-500 mb-2">Metadata</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                {Object.entries(item.metadata).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="text-gray-500">{key}:</span>
                                    <span className="ml-1 text-gray-700">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Resend">
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Share">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Export">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, currentHistory.length)} of {currentHistory.length} results
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                      if (page > totalPages) return null;
                      
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
