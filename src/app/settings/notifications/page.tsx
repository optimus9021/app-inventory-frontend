// by ismail anugrah saputra
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone,
  Settings,
  Save,
  TestTube,
  Volume2,
  VolumeX,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Send
} from 'lucide-react';

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'webhook' | 'slack';
  isActive: boolean;
  settings: Record<string, string | number>;
  lastUsed: string;
  successRate: number;
  createdAt: string;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  channels: string[];
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationRule {
  id: string;
  name: string;
  description: string;
  trigger: string;
  conditions: Record<string, string | number>;
  templateId: string;
  channels: string[];
  recipients: string[];
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
}

export default function NotificationSettingsPage() {
  const [activeTab, setActiveTab] = useState('channels');

  // Mock data
  const channels: NotificationChannel[] = [
    {
      id: 'ch_1',
      name: 'Email Primary',
      type: 'email',
      isActive: true,
      settings: {
        host: 'smtp.gmail.com',
        port: 587,
        username: 'notifications@company.com'
      },
      lastUsed: '2025-01-31 10:30',
      successRate: 98.5,
      createdAt: '2024-01-15'
    },
    {
      id: 'ch_2',
      name: 'SMS Gateway',
      type: 'sms',
      isActive: true,
      settings: {
        provider: 'Twilio',
        sender: 'INVENTORY'
      },
      lastUsed: '2025-01-31 09:15',
      successRate: 95.2,
      createdAt: '2024-01-15'
    },
    {
      id: 'ch_3',
      name: 'Push Notifications',
      type: 'push',
      isActive: true,
      settings: {
        provider: 'Firebase',
        appId: 'inventory-app'
      },
      lastUsed: '2025-01-31 11:45',
      successRate: 92.8,
      createdAt: '2024-01-15'
    },
    {
      id: 'ch_4',
      name: 'Slack Integration',
      type: 'slack',
      isActive: false,
      settings: {
        webhook: 'https://hooks.slack.com/...',
        channel: '#inventory-alerts'
      },
      lastUsed: '2025-01-28 16:20',
      successRate: 100,
      createdAt: '2024-02-01'
    }
  ];

  const templates: NotificationTemplate[] = [
    {
      id: 'tpl_1',
      name: 'Low Stock Alert',
      title: 'Stock Alert: {{product_name}}',
      message: 'Product {{product_name}} is running low. Current stock: {{current_stock}}. Minimum threshold: {{min_threshold}}.',
      type: 'warning',
      channels: ['ch_1', 'ch_2'],
      variables: ['product_name', 'current_stock', 'min_threshold'],
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2025-01-20'
    },
    {
      id: 'tpl_2',
      name: 'User Login',
      title: 'New Login Detected',
      message: 'User {{username}} logged in from {{ip_address}} at {{timestamp}}.',
      type: 'info',
      channels: ['ch_1'],
      variables: ['username', 'ip_address', 'timestamp'],
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-12-10'
    },
    {
      id: 'tpl_3',
      name: 'System Error',
      title: 'System Error Alert',
      message: 'A system error occurred in module {{module}}: {{error_message}}',
      type: 'error',
      channels: ['ch_1', 'ch_3'],
      variables: ['module', 'error_message'],
      isActive: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-11-05'
    }
  ];

  const rules: NotificationRule[] = [
    {
      id: 'rule_1',
      name: 'Low Stock Detection',
      description: 'Trigger alert when product stock is below minimum threshold',
      trigger: 'stock_below_threshold',
      conditions: { threshold: 10 },
      templateId: 'tpl_1',
      channels: ['ch_1', 'ch_2'],
      recipients: ['managers', 'warehouse_staff'],
      isActive: true,
      priority: 'high',
      createdAt: '2024-01-15'
    },
    {
      id: 'rule_2',
      name: 'Failed Login Attempts',
      description: 'Alert on multiple failed login attempts',
      trigger: 'failed_login_attempts',
      conditions: { attempts: 3, timeframe: '5 minutes' },
      templateId: 'tpl_2',
      channels: ['ch_1'],
      recipients: ['admins'],
      isActive: true,
      priority: 'medium',
      createdAt: '2024-01-15'
    },
    {
      id: 'rule_3',
      name: 'System Errors',
      description: 'Immediate alert for system errors',
      trigger: 'system_error',
      conditions: { severity: 'high' },
      templateId: 'tpl_3',
      channels: ['ch_1', 'ch_3'],
      recipients: ['admins', 'developers'],
      isActive: true,
      priority: 'urgent',
      createdAt: '2024-01-15'
    }
  ];

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'sms':
        return <MessageSquare className="w-5 h-5" />;
      case 'push':
        return <Smartphone className="w-5 h-5" />;
      case 'slack':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getChannelColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-blue-600 bg-blue-100';
      case 'sms':
        return 'text-green-600 bg-green-100';
      case 'push':
        return 'text-purple-600 bg-purple-100';
      case 'slack':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      info: { label: 'Info', className: 'bg-blue-100 text-blue-800' },
      warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-800' },
      success: { label: 'Success', className: 'bg-green-100 text-green-800' },
      error: { label: 'Error', className: 'bg-red-100 text-red-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    return (
      <Badge className={config.className}>
        {config.label}
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

  // Calculate summary statistics
  const activeChannels = channels.filter(c => c.isActive).length;
  const activeTemplates = templates.filter(t => t.isActive).length;
  const activeRules = rules.filter(r => r.isActive).length;
  const averageSuccessRate = channels.reduce((acc, c) => acc + c.successRate, 0) / channels.length;

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Notifikasi</h1>
            <p className="text-gray-600 mt-1">
              Kelola channel, template, dan aturan notifikasi sistem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <TestTube className="w-4 h-4 mr-2" />
              Test Notifikasi
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Simpan Semua
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Channels</p>
                <p className="text-2xl font-bold text-gray-900">{activeChannels}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{activeTemplates}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rules</p>
                <p className="text-2xl font-bold text-gray-900">{activeRules}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{averageSuccessRate.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-6">
            {/* Channels Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notification Channels</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Channel
              </Button>
            </div>

            {/* Channels List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {channels.map((channel) => (
                <Card key={channel.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getChannelColor(channel.type)}`}>
                        {getChannelIcon(channel.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{channel.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{channel.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {channel.isActive ? (
                        <Volume2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      )}
                      <Badge className={channel.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {channel.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-medium">{channel.successRate}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Used</span>
                      <span className="font-medium">{channel.lastUsed}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TestTube className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            {/* Templates Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notification Templates</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buat Template
              </Button>
            </div>

            {/* Templates List */}
            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{template.name}</h3>
                        {getTypeBadge(template.type)}
                        <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-900 mb-1">Title:</div>
                        <div className="text-sm text-gray-600">{template.title}</div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm font-medium text-gray-900 mb-1">Message:</div>
                        <div className="text-sm text-gray-600">{template.message}</div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Channels: {template.channels.length}</span>
                        <span>Variables: {template.variables.length}</span>
                        <span>Updated: {template.updatedAt}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            {/* Rules Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notification Rules</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Buat Rule
              </Button>
            </div>

            {/* Rules List */}
            <div className="space-y-4">
              {rules.map((rule) => (
                <Card key={rule.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{rule.name}</h3>
                        {getPriorityBadge(rule.priority)}
                        <Badge className={rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{rule.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Trigger:</span>
                          <div className="text-gray-600">{rule.trigger}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Channels:</span>
                          <div className="text-gray-600">{rule.channels.length} channels</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Recipients:</span>
                          <div className="text-gray-600">{rule.recipients.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <TestTube className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Global Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Global Notification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Retry Attempts
                      </label>
                      <Input type="number" defaultValue="3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retry Delay (seconds)
                      </label>
                      <Input type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Rate Limiting</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Notifications per Minute
                      </label>
                      <Input type="number" defaultValue="100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Burst Limit
                      </label>
                      <Input type="number" defaultValue="500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Quiet Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <Input type="time" defaultValue="07:00" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Pengaturan
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
