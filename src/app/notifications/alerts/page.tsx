'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Copy,
  Power,
  PowerOff,
  Mail,
  MessageSquare,
  Smartphone,
  Webhook,
  Clock,
  Users,
  Package,
  TrendingUp,
  Shield,
  Database,
  Truck,
  Activity,
  CheckCircle,
  Pause,
  MoreHorizontal,
  Filter,
  Search,
  Download,
  Upload
} from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  description: string;
  category: 'inventory' | 'sales' | 'system' | 'security' | 'operations' | 'user';
  type: 'threshold' | 'event' | 'schedule' | 'anomaly';
  priority: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  conditions: AlertCondition[];
  actions: AlertAction[];
  channels: string[];
  recipients: string[];
  schedule?: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
    time?: string;
    days?: string[];
  };
  throttling: {
    enabled: boolean;
    interval: number;
    unit: 'minutes' | 'hours' | 'days';
  };
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  createdBy: string;
}

interface AlertCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains' | 'between';
  value: string | number;
  secondValue?: string | number;
}

interface AlertAction {
  id: string;
  type: 'notification' | 'email' | 'webhook' | 'script' | 'escalation';
  config: Record<string, string | number | boolean>;
  delay?: number;
}

interface AlertTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  rule: Partial<AlertRule>;
  isBuiltIn: boolean;
}

export default function NotificationAlertsPage() {
  const [activeTab, setActiveTab] = useState('rules');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const alertRules: AlertRule[] = [
    {
      id: 'rule_1',
      name: 'Low Stock Alert',
      description: 'Alert when product stock falls below minimum threshold',
      category: 'inventory',
      type: 'threshold',
      priority: 'high',
      isActive: true,
      conditions: [
        {
          id: 'cond_1',
          field: 'stock_quantity',
          operator: 'less_than',
          value: 10
        }
      ],
      actions: [
        {
          id: 'action_1',
          type: 'email',
          config: {
            template: 'low_stock_alert',
            subject: 'Low Stock Alert: {{product_name}}'
          }
        },
        {
          id: 'action_2',
          type: 'notification',
          config: {
            priority: 'high',
            category: 'inventory'
          }
        }
      ],
      channels: ['email', 'push'],
      recipients: ['warehouse@company.com', 'manager@company.com'],
      throttling: {
        enabled: true,
        interval: 1,
        unit: 'hours'
      },
      createdAt: '2025-01-15 10:00',
      lastTriggered: '2025-01-31 14:30',
      triggerCount: 45,
      createdBy: 'admin@company.com'
    },
    {
      id: 'rule_2',
      name: 'High Value Transaction',
      description: 'Alert for transactions exceeding specified amount',
      category: 'sales',
      type: 'threshold',
      priority: 'medium',
      isActive: true,
      conditions: [
        {
          id: 'cond_2',
          field: 'transaction_amount',
          operator: 'greater_than',
          value: 50000
        }
      ],
      actions: [
        {
          id: 'action_3',
          type: 'notification',
          config: {
            priority: 'medium',
            category: 'sales'
          }
        },
        {
          id: 'action_4',
          type: 'webhook',
          config: {
            url: 'https://api.company.com/webhooks/high-value-transaction',
            method: 'POST'
          }
        }
      ],
      channels: ['push', 'webhook'],
      recipients: ['sales@company.com', 'finance@company.com'],
      throttling: {
        enabled: false,
        interval: 0,
        unit: 'minutes'
      },
      createdAt: '2025-01-10 15:30',
      lastTriggered: '2025-01-30 16:45',
      triggerCount: 12,
      createdBy: 'sales.manager@company.com'
    },
    {
      id: 'rule_3',
      name: 'Failed Login Attempts',
      description: 'Alert for multiple failed login attempts',
      category: 'security',
      type: 'event',
      priority: 'critical',
      isActive: true,
      conditions: [
        {
          id: 'cond_3',
          field: 'failed_attempts',
          operator: 'greater_than',
          value: 5
        },
        {
          id: 'cond_4',
          field: 'time_window',
          operator: 'less_than',
          value: 15
        }
      ],
      actions: [
        {
          id: 'action_5',
          type: 'email',
          config: {
            template: 'security_alert',
            subject: 'Security Alert: Multiple Failed Login Attempts'
          }
        },
        {
          id: 'action_6',
          type: 'escalation',
          config: {
            escalationLevel: 1,
            delayMinutes: 5
          }
        }
      ],
      channels: ['email', 'sms'],
      recipients: ['security@company.com', 'admin@company.com'],
      throttling: {
        enabled: true,
        interval: 30,
        unit: 'minutes'
      },
      createdAt: '2025-01-05 09:00',
      lastTriggered: '2025-01-31 09:45',
      triggerCount: 8,
      createdBy: 'security@company.com'
    },
    {
      id: 'rule_4',
      name: 'System Performance Alert',
      description: 'Alert when system performance degrades',
      category: 'system',
      type: 'anomaly',
      priority: 'high',
      isActive: false,
      conditions: [
        {
          id: 'cond_5',
          field: 'response_time',
          operator: 'greater_than',
          value: 5000
        },
        {
          id: 'cond_6',
          field: 'cpu_usage',
          operator: 'greater_than',
          value: 80
        }
      ],
      actions: [
        {
          id: 'action_7',
          type: 'notification',
          config: {
            priority: 'high',
            category: 'system'
          }
        }
      ],
      channels: ['push'],
      recipients: ['devops@company.com'],
      schedule: {
        enabled: true,
        frequency: 'immediate'
      },
      throttling: {
        enabled: true,
        interval: 15,
        unit: 'minutes'
      },
      createdAt: '2025-01-20 11:15',
      triggerCount: 0,
      createdBy: 'devops@company.com'
    }
  ];

  const templates: AlertTemplate[] = [
    {
      id: 'template_1',
      name: 'Inventory Low Stock',
      description: 'Standard low stock alert for inventory items',
      category: 'inventory',
      isBuiltIn: true,
      rule: {
        type: 'threshold',
        priority: 'medium',
        conditions: [
          {
            id: 'temp_cond_1',
            field: 'stock_quantity',
            operator: 'less_than',
            value: 0
          }
        ]
      }
    },
    {
      id: 'template_2',
      name: 'Sales Target Achievement',
      description: 'Alert when sales targets are met or exceeded',
      category: 'sales',
      isBuiltIn: true,
      rule: {
        type: 'threshold',
        priority: 'low',
        conditions: [
          {
            id: 'temp_cond_2',
            field: 'sales_percentage',
            operator: 'greater_than',
            value: 100
          }
        ]
      }
    },
    {
      id: 'template_3',
      name: 'Security Breach Detection',
      description: 'Alert for potential security breaches',
      category: 'security',
      isBuiltIn: true,
      rule: {
        type: 'event',
        priority: 'critical',
        conditions: [
          {
            id: 'temp_cond_3',
            field: 'unauthorized_access',
            operator: 'equals',
            value: 'detected'
          }
        ]
      }
    }
  ];

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

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      threshold: { label: 'Threshold', className: 'bg-purple-100 text-purple-800' },
      event: { label: 'Event', className: 'bg-green-100 text-green-800' },
      schedule: { label: 'Schedule', className: 'bg-yellow-100 text-yellow-800' },
      anomaly: { label: 'Anomaly', className: 'bg-pink-100 text-pink-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
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
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const filteredRules = alertRules.filter(rule => {
    const matchesSearch = 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || rule.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && rule.isActive) ||
      (selectedStatus === 'inactive' && !rule.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: alertRules.length,
    active: alertRules.filter(r => r.isActive).length,
    triggered: alertRules.filter(r => r.triggerCount > 0).length,
    critical: alertRules.filter(r => r.priority === 'critical').length
  };

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alert Rules</h1>
            <p className="text-gray-600 mt-1">
              Kelola aturan alert dan notifikasi otomatis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Rule
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rules</p>
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
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Triggered</p>
                <p className="text-2xl font-bold text-gray-900">{stats.triggered}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-gray-900">{stats.critical}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">Alert Rules ({alertRules.length})</TabsTrigger>
            <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Alert Rules Tab */}
          <TabsContent value="rules" className="space-y-6 mt-6">
            {/* Filters */}
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search rules..."
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
                  <option value="all">All Categories</option>
                  <option value="inventory">Inventory</option>
                  <option value="sales">Sales</option>
                  <option value="system">System</option>
                  <option value="security">Security</option>
                  <option value="operations">Operations</option>
                  <option value="user">User</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </Card>

            {/* Rules List */}
            <div className="space-y-4">
              {filteredRules.map((rule) => (
                <Card key={rule.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(rule.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{rule.name}</h3>
                          {getPriorityBadge(rule.priority)}
                          {getTypeBadge(rule.type)}
                          {rule.isActive ? (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              <Pause className="w-3 h-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-600 mb-3">{rule.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Conditions</p>
                            <div className="space-y-1">
                              {rule.conditions.map((condition) => (
                                <div key={condition.id} className="text-sm text-gray-700">
                                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                                    {condition.field} {condition.operator} {condition.value}
                                  </code>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Channels</p>
                            <div className="flex items-center gap-2">
                              {rule.channels.map((channel) => (
                                <div key={channel} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                                  {getChannelIcon(channel)}
                                  <span className="capitalize">{channel}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Statistics</p>
                            <div className="text-sm text-gray-700">
                              <div>Triggered: {rule.triggerCount} times</div>
                              {rule.lastTriggered && (
                                <div>Last: {rule.lastTriggered}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Created: {rule.createdAt}
                          </div>
                          <div>By: {rule.createdBy}</div>
                          {rule.throttling.enabled && (
                            <div>
                              Throttle: {rule.throttling.interval} {rule.throttling.unit}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        title={rule.isActive ? "Disable" : "Enable"}
                      >
                        {rule.isActive ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Copy">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(template.category)}
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        {template.isBuiltIn && (
                          <Badge className="bg-blue-100 text-blue-800 text-xs">Built-in</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="capitalize">{template.rule.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <span className="capitalize">{template.rule.priority}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Conditions:</span>
                      <span>{template.rule.conditions?.length || 0}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    Use Template
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Global Alert Throttling</p>
                      <p className="text-sm text-gray-600">Prevent spam by limiting alert frequency</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-resolve Alerts</p>
                      <p className="text-sm text-gray-600">Automatically resolve alerts when conditions are met</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alert Escalation</p>
                      <p className="text-sm text-gray-600">Escalate unresolved critical alerts</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </Card>

              {/* Channel Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Channel Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Send alerts via email</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Send alerts via SMS</p>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Send alerts via push notifications</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Webhook className="w-4 h-4" />
                      <div>
                        <p className="font-medium">Webhook Integration</p>
                        <p className="text-sm text-gray-600">Send alerts to external systems</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </Card>

              {/* Retention Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Data Retention</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alert History Retention
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="30">30 days</option>
                      <option value="90" selected>90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="0">Unlimited</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Log Retention
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="7">7 days</option>
                      <option value="30" selected>30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Performance Settings */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rule Evaluation Interval
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="30">30 seconds</option>
                      <option value="60" selected>1 minute</option>
                      <option value="300">5 minutes</option>
                      <option value="600">10 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Concurrent Alerts
                    </label>
                    <Input type="number" defaultValue="100" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Batch Size
                    </label>
                    <Input type="number" defaultValue="50" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
