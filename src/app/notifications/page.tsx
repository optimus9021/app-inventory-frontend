'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Search,
  Settings,
  CheckCheck,
  Trash2,
  Archive,
  Star,
  Mail,
  MessageSquare,
  Smartphone,
  Volume2,
  VolumeX,
  Users,
  Package,
  TrendingUp,
  Truck,
  Shield,
  Database,
  Plus,
  Eye,
  Share2
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'system' | 'inventory' | 'sales' | 'operations' | 'security' | 'user';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  createdAt: string;
  readAt?: string;
  sender: string;
  recipients: string[];
  actions?: Array<{
    label: string;
    action: string;
    type: 'primary' | 'secondary';
  }>;
  metadata?: Record<string, string>;
}

interface NotificationStats {
  total: number;
  unread: number;
  starred: number;
  urgent: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showRead, setShowRead] = useState(true);

  // Mock data
  const notifications: Notification[] = [
    {
      id: 'notif_1',
      title: 'Low Stock Alert',
      message: 'Product "Samsung Galaxy S24" is running low. Current stock: 5 units. Minimum threshold: 10 units.',
      type: 'warning',
      category: 'inventory',
      priority: 'high',
      isRead: false,
      isStarred: true,
      isArchived: false,
      createdAt: '2025-01-31 14:30',
      sender: 'Inventory System',
      recipients: ['warehouse@company.com', 'manager@company.com'],
      actions: [
        { label: 'Create PO', action: 'create_po', type: 'primary' },
        { label: 'View Stock', action: 'view_stock', type: 'secondary' }
      ],
      metadata: {
        productId: 'prod_123',
        currentStock: '5',
        minThreshold: '10'
      }
    },
    {
      id: 'notif_2',
      title: 'New User Registration',
      message: 'New user "John Smith" has registered and is pending approval.',
      type: 'info',
      category: 'user',
      priority: 'medium',
      isRead: false,
      isStarred: false,
      isArchived: false,
      createdAt: '2025-01-31 13:15',
      sender: 'User Management',
      recipients: ['admin@company.com'],
      actions: [
        { label: 'Approve', action: 'approve_user', type: 'primary' },
        { label: 'View Profile', action: 'view_profile', type: 'secondary' }
      ],
      metadata: {
        userId: 'user_456',
        userEmail: 'john.smith@company.com'
      }
    },
    {
      id: 'notif_3',
      title: 'Sales Target Achieved',
      message: 'Congratulations! Monthly sales target has been achieved with 105% completion.',
      type: 'success',
      category: 'sales',
      priority: 'medium',
      isRead: true,
      isStarred: true,
      isArchived: false,
      createdAt: '2025-01-31 12:00',
      readAt: '2025-01-31 12:30',
      sender: 'Sales Analytics',
      recipients: ['sales@company.com', 'manager@company.com'],
      metadata: {
        targetAmount: '1000000',
        actualAmount: '1050000',
        percentage: '105'
      }
    },
    {
      id: 'notif_4',
      title: 'System Maintenance Scheduled',
      message: 'System maintenance is scheduled for tonight from 02:00 to 04:00 AM. Please save your work.',
      type: 'warning',
      category: 'system',
      priority: 'high',
      isRead: true,
      isStarred: false,
      isArchived: false,
      createdAt: '2025-01-31 10:00',
      readAt: '2025-01-31 10:15',
      sender: 'System Administrator',
      recipients: ['all_users'],
      metadata: {
        maintenanceStart: '2025-02-01 02:00',
        maintenanceEnd: '2025-02-01 04:00'
      }
    },
    {
      id: 'notif_5',
      title: 'Failed Login Attempts',
      message: 'Multiple failed login attempts detected for user "admin" from IP 192.168.1.100.',
      type: 'error',
      category: 'security',
      priority: 'urgent',
      isRead: false,
      isStarred: false,
      isArchived: false,
      createdAt: '2025-01-31 09:45',
      sender: 'Security System',
      recipients: ['security@company.com', 'admin@company.com'],
      actions: [
        { label: 'Lock Account', action: 'lock_account', type: 'primary' },
        { label: 'View Logs', action: 'view_logs', type: 'secondary' }
      ],
      metadata: {
        userId: 'admin',
        ipAddress: '192.168.1.100',
        attemptCount: '5'
      }
    },
    {
      id: 'notif_6',
      title: 'Vendor Delivery Delayed',
      message: 'Delivery from "ABC Supplier" for PO #12345 has been delayed by 2 days.',
      type: 'warning',
      category: 'operations',
      priority: 'medium',
      isRead: true,
      isStarred: false,
      isArchived: false,
      createdAt: '2025-01-31 08:30',
      readAt: '2025-01-31 09:00',
      sender: 'Supply Chain',
      recipients: ['procurement@company.com'],
      actions: [
        { label: 'Contact Vendor', action: 'contact_vendor', type: 'primary' },
        { label: 'View PO', action: 'view_po', type: 'secondary' }
      ],
      metadata: {
        poNumber: 'PO-12345',
        vendor: 'ABC Supplier',
        delayDays: '2'
      }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      info: { label: 'Info', className: 'bg-blue-100 text-blue-800' },
      warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-800' },
      error: { label: 'Error', className: 'bg-red-100 text-red-800' },
      success: { label: 'Success', className: 'bg-green-100 text-green-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    return (
      <Badge className={config.className}>
        {getTypeIcon(type)}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medium', className: 'bg-blue-100 text-blue-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'Urgent', className: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory':
        return <Package className="w-4 h-4" />;
      case 'sales':
        return <TrendingUp className="w-4 h-4" />;
      case 'operations':
        return <Truck className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'system':
        return <Database className="w-4 h-4" />;
      case 'user':
        return <Users className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (!showRead && notification.isRead) return false;
    
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || notification.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority;
    
    return matchesSearch && matchesType && matchesCategory && matchesPriority;
  });

  const getTabNotifications = (tab: string) => {
    switch (tab) {
      case 'inbox':
        return filteredNotifications.filter(n => !n.isArchived);
      case 'starred':
        return filteredNotifications.filter(n => n.isStarred && !n.isArchived);
      case 'archived':
        return filteredNotifications.filter(n => n.isArchived);
      case 'unread':
        return filteredNotifications.filter(n => !n.isRead && !n.isArchived);
      default:
        return filteredNotifications;
    }
  };

  const currentNotifications = getTabNotifications(activeTab);

  // Calculate stats
  const stats: NotificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    starred: notifications.filter(n => n.isStarred).length,
    urgent: notifications.filter(n => n.priority === 'urgent').length,
    byType: {
      info: notifications.filter(n => n.type === 'info').length,
      warning: notifications.filter(n => n.type === 'warning').length,
      error: notifications.filter(n => n.type === 'error').length,
      success: notifications.filter(n => n.type === 'success').length
    },
    byCategory: {
      system: notifications.filter(n => n.category === 'system').length,
      inventory: notifications.filter(n => n.category === 'inventory').length,
      sales: notifications.filter(n => n.category === 'sales').length,
      operations: notifications.filter(n => n.category === 'operations').length,
      security: notifications.filter(n => n.category === 'security').length,
      user: notifications.filter(n => n.category === 'user').length
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
            <p className="text-gray-600 mt-1">
              Manage semua notifikasi sistem dan alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Starred</p>
                <p className="text-2xl font-bold text-gray-900">{stats.starred}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">By Category</h3>
              <div className="space-y-2">
                {Object.entries(stats.byCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="capitalize">{category}</span>
                    </div>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Notification Channels */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Channels</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <Volume2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>SMS</span>
                  </div>
                  <Volume2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>Push</span>
                  </div>
                  <VolumeX className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="system">System</option>
                  <option value="inventory">Inventory</option>
                  <option value="sales">Sales</option>
                  <option value="operations">Operations</option>
                  <option value="security">Security</option>
                  <option value="user">User</option>
                </select>

                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>

                <div className="flex items-center gap-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={showRead}
                      onChange={(e) => setShowRead(e.target.checked)}
                      className="mr-2"
                    />
                    Show Read
                  </label>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="inbox">
                  Inbox ({notifications.filter(n => !n.isArchived).length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({stats.unread})
                </TabsTrigger>
                <TabsTrigger value="starred">
                  Starred ({stats.starred})
                </TabsTrigger>
                <TabsTrigger value="archived">
                  Archived ({notifications.filter(n => n.isArchived).length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4 mt-6">
                {currentNotifications.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p className="text-gray-600">No notifications found for the current filter.</p>
                  </Card>
                ) : (
                  currentNotifications.map((notification) => (
                    <Card key={notification.id} className={`p-6 ${!notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getCategoryIcon(notification.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{notification.title}</h3>
                              {getTypeBadge(notification.type)}
                              {getPriorityBadge(notification.priority)}
                              {notification.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                            
                            <p className="text-gray-600 mb-3">{notification.message}</p>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notification.createdAt}
                              </div>
                              <div>From: {notification.sender}</div>
                              {notification.readAt && (
                                <div>Read: {notification.readAt}</div>
                              )}
                            </div>

                            {notification.actions && (
                              <div className="flex items-center gap-2">
                                {notification.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    size="sm"
                                    variant={action.type === 'primary' ? 'default' : 'outline'}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Star">
                            <Star className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Archive">
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Share">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
