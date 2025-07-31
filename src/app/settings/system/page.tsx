'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Database, 
  Shield, 
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Monitor,
  Wifi,
  Lock,
  Globe,
  Mail,
  Bell,
  FileText,
  Archive,
  Trash2,
  Eye
} from 'lucide-react';

interface SystemConfig {
  category: string;
  settings: Array<{
    key: string;
    name: string;
    description: string;
    value: string | number | boolean;
    type: 'text' | 'number' | 'boolean' | 'select' | 'textarea';
    options?: string[];
    required: boolean;
    sensitive?: boolean;
  }>;
}

interface BackupInfo {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  createdAt: string;
  duration: string;
  location: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  module: string;
  message: string;
  user?: string;
  ipAddress?: string;
}

export default function SystemSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const systemConfigs: SystemConfig[] = [
    {
      category: 'General',
      settings: [
        {
          key: 'app_name',
          name: 'Application Name',
          description: 'The name of the application',
          value: 'Inventory Management System',
          type: 'text',
          required: true
        },
        {
          key: 'app_version',
          name: 'Application Version',
          description: 'Current version of the application',
          value: '1.0.0',
          type: 'text',
          required: true
        },
        {
          key: 'timezone',
          name: 'Default Timezone',
          description: 'Default timezone for the application',
          value: 'Asia/Jakarta',
          type: 'select',
          options: ['Asia/Jakarta', 'UTC', 'Asia/Singapore', 'America/New_York'],
          required: true
        },
        {
          key: 'max_upload_size',
          name: 'Max Upload Size (MB)',
          description: 'Maximum file upload size in megabytes',
          value: 10,
          type: 'number',
          required: true
        }
      ]
    },
    {
      category: 'Database',
      settings: [
        {
          key: 'db_host',
          name: 'Database Host',
          description: 'Database server hostname or IP address',
          value: 'localhost',
          type: 'text',
          required: true,
          sensitive: true
        },
        {
          key: 'db_port',
          name: 'Database Port',
          description: 'Database server port number',
          value: 5432,
          type: 'number',
          required: true
        },
        {
          key: 'db_name',
          name: 'Database Name',
          description: 'Name of the database',
          value: 'inventory_db',
          type: 'text',
          required: true
        },
        {
          key: 'db_pool_size',
          name: 'Connection Pool Size',
          description: 'Maximum number of database connections',
          value: 20,
          type: 'number',
          required: true
        }
      ]
    },
    {
      category: 'Security',
      settings: [
        {
          key: 'session_timeout',
          name: 'Session Timeout (minutes)',
          description: 'User session timeout in minutes',
          value: 30,
          type: 'number',
          required: true
        },
        {
          key: 'password_min_length',
          name: 'Minimum Password Length',
          description: 'Minimum required password length',
          value: 8,
          type: 'number',
          required: true
        },
        {
          key: 'require_2fa',
          name: 'Require Two-Factor Authentication',
          description: 'Force all users to enable 2FA',
          value: false,
          type: 'boolean',
          required: false
        },
        {
          key: 'max_login_attempts',
          name: 'Max Login Attempts',
          description: 'Maximum failed login attempts before lockout',
          value: 3,
          type: 'number',
          required: true
        }
      ]
    },
    {
      category: 'Email',
      settings: [
        {
          key: 'smtp_host',
          name: 'SMTP Host',
          description: 'SMTP server hostname',
          value: 'smtp.gmail.com',
          type: 'text',
          required: true,
          sensitive: true
        },
        {
          key: 'smtp_port',
          name: 'SMTP Port',
          description: 'SMTP server port',
          value: 587,
          type: 'number',
          required: true
        },
        {
          key: 'smtp_username',
          name: 'SMTP Username',
          description: 'SMTP authentication username',
          value: 'notifications@company.com',
          type: 'text',
          required: true,
          sensitive: true
        },
        {
          key: 'from_email',
          name: 'From Email',
          description: 'Default sender email address',
          value: 'noreply@company.com',
          type: 'text',
          required: true
        }
      ]
    }
  ];

  const backups: BackupInfo[] = [
    {
      id: 'backup_1',
      name: 'Full Backup - Daily',
      type: 'full',
      size: '2.4 GB',
      status: 'completed',
      createdAt: '2025-01-31 02:00',
      duration: '45m 23s',
      location: '/backups/full/20250131_020000.sql'
    },
    {
      id: 'backup_2',
      name: 'Incremental Backup',
      type: 'incremental',
      size: '156 MB',
      status: 'completed',
      createdAt: '2025-01-31 08:00',
      duration: '3m 12s',
      location: '/backups/incremental/20250131_080000.sql'
    },
    {
      id: 'backup_3',
      name: 'Full Backup - Weekly',
      type: 'full',
      size: '2.6 GB',
      status: 'running',
      createdAt: '2025-01-31 12:00',
      duration: '12m 05s',
      location: '/backups/full/20250131_120000.sql'
    }
  ];

  const systemLogs: SystemLog[] = [
    {
      id: 'log_1',
      timestamp: '2025-01-31 12:30:45',
      level: 'info',
      module: 'Authentication',
      message: 'User john.doe logged in successfully',
      user: 'john.doe',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'log_2',
      timestamp: '2025-01-31 12:28:12',
      level: 'warning',
      module: 'Inventory',
      message: 'Product stock below minimum threshold: Product ABC',
      user: 'system'
    },
    {
      id: 'log_3',
      timestamp: '2025-01-31 12:25:33',
      level: 'error',
      module: 'Database',
      message: 'Connection timeout after 30 seconds',
      user: 'system'
    },
    {
      id: 'log_4',
      timestamp: '2025-01-31 12:20:15',
      level: 'info',
      module: 'Backup',
      message: 'Backup process started: Full Backup - Weekly',
      user: 'system'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
      running: { label: 'Running', className: 'bg-blue-100 text-blue-800' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800' },
      scheduled: { label: 'Scheduled', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getLogLevelBadge = (level: string) => {
    const levelConfig = {
      info: { label: 'Info', className: 'bg-blue-100 text-blue-800' },
      warning: { label: 'Warning', className: 'bg-yellow-100 text-yellow-800' },
      error: { label: 'Error', className: 'bg-red-100 text-red-800' },
      debug: { label: 'Debug', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getBackupTypeIcon = (type: string) => {
    switch (type) {
      case 'full':
        return <Archive className="w-4 h-4" />;
      case 'incremental':
        return <FileText className="w-4 h-4" />;
      case 'differential':
        return <HardDrive className="w-4 h-4" />;
      default:
        return <Archive className="w-4 h-4" />;
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const renderSettingInput = (setting: SystemConfig['settings'][0]) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={setting.value as boolean}
              className="mr-2"
            />
            <span>{setting.name}</span>
          </label>
        );
      case 'select':
        return (
          <select
            defaultValue={setting.value as string}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {setting.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            defaultValue={setting.value as string}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        );
      default:
        return (
          <Input
            type={setting.type}
            defaultValue={setting.value as string | number}
            className={setting.sensitive ? 'font-mono' : ''}
          />
        );
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pengaturan Sistem</h1>
            <p className="text-gray-600 mt-1">
              Konfigurasi sistem, backup, dan monitoring
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Config
            </Button>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Menyimpan...' : 'Simpan Semua'}
            </Button>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Database</p>
                <p className="text-2xl font-bold text-green-600">Connected</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Backup</p>
                <p className="text-2xl font-bold text-gray-900">2h ago</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Archive className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Monitor className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Configuration Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemConfigs.map((config) => (
                <Card key={config.category} className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {config.category === 'General' && <Settings className="w-5 h-5 text-blue-600" />}
                    {config.category === 'Database' && <Database className="w-5 h-5 text-green-600" />}
                    {config.category === 'Security' && <Shield className="w-5 h-5 text-red-600" />}
                    {config.category === 'Email' && <Mail className="w-5 h-5 text-purple-600" />}
                    <h3 className="text-lg font-semibold">{config.category} Settings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {config.settings.map((setting) => (
                      <div key={setting.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {setting.name}
                          {setting.required && <span className="text-red-500 ml-1">*</span>}
                          {setting.sensitive && <Lock className="w-3 h-3 inline ml-1 text-gray-400" />}
                        </label>
                        <div className="mb-1">
                          {renderSettingInput(setting)}
                        </div>
                        <p className="text-xs text-gray-500">{setting.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            {/* Backup Controls */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Backup Management</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore
                  </Button>
                  <Button>
                    <Archive className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </div>

              {/* Backup Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Backup Schedule
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Daily at 2:00 AM</option>
                    <option>Weekly on Sunday</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incremental Backup
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Every 4 hours</option>
                    <option>Every 6 hours</option>
                    <option>Every 12 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retention Period
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>30 days</option>
                    <option>60 days</option>
                    <option>90 days</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Backup History */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Backup History</h3>
              
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getBackupTypeIcon(backup.type)}
                      </div>
                      <div>
                        <div className="font-medium">{backup.name}</div>
                        <div className="text-sm text-gray-600">
                          Size: {backup.size} • Duration: {backup.duration}
                        </div>
                        <div className="text-xs text-gray-500">{backup.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(backup.status)}
                      <div className="text-sm text-gray-500 mt-1">{backup.createdAt}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            {/* System Logs */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">System Logs</h2>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-md">
                    <option>All Levels</option>
                    <option>Error</option>
                    <option>Warning</option>
                    <option>Info</option>
                  </select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{log.timestamp}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getLogLevelBadge(log.level)}
                          <Badge className="bg-gray-100 text-gray-800">{log.module}</Badge>
                        </div>
                        <div className="text-sm text-gray-900">{log.message}</div>
                        {(log.user || log.ipAddress) && (
                          <div className="text-xs text-gray-500 mt-1">
                            {log.user && `User: ${log.user}`}
                            {log.user && log.ipAddress && ' • '}
                            {log.ipAddress && `IP: ${log.ipAddress}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            {/* System Monitoring */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Server Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Disk Usage</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Network & Database</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Network Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Database</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">External APIs</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Notifications</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Health Checks */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Health Checks</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Database Connection</span>
                  </div>
                  <p className="text-sm text-green-700">All connections healthy</p>
                </div>
                
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Storage Space</span>
                  </div>
                  <p className="text-sm text-green-700">68% available</p>
                </div>
                
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Memory Usage</span>
                  </div>
                  <p className="text-sm text-yellow-700">High usage detected</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
