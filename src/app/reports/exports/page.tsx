'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Upload, 
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Settings,
  Play,
  Pause,
  Trash2,
  Eye,
  Copy,
  Share2,
  Archive,
  Database,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  Mail,
  MessageSquare,
  Plus,
  Edit,
  Save
} from 'lucide-react';

interface ExportJob {
  id: string;
  name: string;
  description: string;
  type: 'manual' | 'scheduled' | 'automated';
  format: 'pdf' | 'excel' | 'csv' | 'json' | 'xml';
  category: 'inventory' | 'sales' | 'financial' | 'operations' | 'users' | 'reports';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  fileSize: string;
  recordCount: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  duration?: string;
  downloadUrl?: string;
  expiresAt: string;
  createdBy: string;
  recipients?: string[];
  isRecurring: boolean;
  schedule?: string;
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  format: string;
  fields: string[];
  filters: Record<string, string>;
  isActive: boolean;
  usageCount: number;
  lastUsed: string;
  createdBy: string;
}

interface ExportSchedule {
  id: string;
  name: string;
  templateId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  time: string;
  recipients: string[];
  isActive: boolean;
  lastRun: string;
  nextRun: string;
  runCount: number;
}

export default function ExportManagerPage() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  // Mock data
  const exportJobs: ExportJob[] = [
    {
      id: 'job_1',
      name: 'Inventory Report - January 2025',
      description: 'Complete inventory report with stock levels and movements',
      type: 'manual',
      format: 'excel',
      category: 'inventory',
      status: 'completed',
      progress: 100,
      fileSize: '2.4 MB',
      recordCount: 15420,
      createdAt: '2025-01-31 10:30',
      startedAt: '2025-01-31 10:31',
      completedAt: '2025-01-31 10:35',
      duration: '4m 23s',
      downloadUrl: '/exports/inventory-jan2025.xlsx',
      expiresAt: '2025-02-07 10:35',
      createdBy: 'John Doe',
      isRecurring: false
    },
    {
      id: 'job_2',
      name: 'Sales Analytics Dashboard',
      description: 'Comprehensive sales data with charts and metrics',
      type: 'scheduled',
      format: 'pdf',
      category: 'sales',
      status: 'running',
      progress: 65,
      fileSize: 'Calculating...',
      recordCount: 8765,
      createdAt: '2025-01-31 12:00',
      startedAt: '2025-01-31 12:01',
      expiresAt: '2025-02-07 12:30',
      createdBy: 'Sales Team',
      recipients: ['manager@company.com', 'sales@company.com'],
      isRecurring: true,
      schedule: 'Daily at 12:00'
    },
    {
      id: 'job_3',
      name: 'Financial Summary Q1',
      description: 'Quarterly financial summary with profit analysis',
      type: 'manual',
      format: 'pdf',
      category: 'financial',
      status: 'pending',
      progress: 0,
      fileSize: '-',
      recordCount: 0,
      createdAt: '2025-01-31 14:15',
      expiresAt: '2025-02-07 14:15',
      createdBy: 'Finance',
      isRecurring: false
    },
    {
      id: 'job_4',
      name: 'User Activity Report',
      description: 'Monthly user activity and system usage statistics',
      type: 'automated',
      format: 'csv',
      category: 'users',
      status: 'failed',
      progress: 0,
      fileSize: '-',
      recordCount: 0,
      createdAt: '2025-01-31 02:00',
      startedAt: '2025-01-31 02:01',
      expiresAt: '2025-02-07 02:00',
      createdBy: 'System',
      isRecurring: true,
      schedule: 'Monthly'
    }
  ];

  const exportTemplates: ExportTemplate[] = [
    {
      id: 'tpl_1',
      name: 'Standard Inventory Report',
      description: 'Basic inventory report with stock levels',
      category: 'Inventory',
      format: 'Excel',
      fields: ['product_name', 'sku', 'category', 'current_stock', 'min_threshold'],
      filters: { 'location': 'all', 'category': 'all' },
      isActive: true,
      usageCount: 45,
      lastUsed: '2025-01-31 10:30',
      createdBy: 'Admin'
    },
    {
      id: 'tpl_2',
      name: 'Sales Performance Dashboard',
      description: 'Sales metrics with charts and KPIs',
      category: 'Sales',
      format: 'PDF',
      fields: ['date', 'product', 'quantity', 'revenue', 'profit_margin'],
      filters: { 'date_range': '30_days', 'sales_person': 'all' },
      isActive: true,
      usageCount: 67,
      lastUsed: '2025-01-31 12:00',
      createdBy: 'Sales Team'
    },
    {
      id: 'tpl_3',
      name: 'Vendor Performance Analysis',
      description: 'Supplier performance metrics and ratings',
      category: 'Operations',
      format: 'Excel',
      fields: ['vendor_name', 'delivery_time', 'quality_score', 'cost_efficiency'],
      filters: { 'vendor': 'all', 'period': 'quarter' },
      isActive: true,
      usageCount: 23,
      lastUsed: '2025-01-29 16:45',
      createdBy: 'Operations'
    }
  ];

  const exportSchedules: ExportSchedule[] = [
    {
      id: 'sch_1',
      name: 'Daily Sales Report',
      templateId: 'tpl_2',
      frequency: 'daily',
      time: '08:00',
      recipients: ['manager@company.com', 'sales@company.com'],
      isActive: true,
      lastRun: '2025-01-31 08:00',
      nextRun: '2025-02-01 08:00',
      runCount: 85
    },
    {
      id: 'sch_2',
      name: 'Weekly Inventory Summary',
      templateId: 'tpl_1',
      frequency: 'weekly',
      time: '09:00',
      recipients: ['warehouse@company.com'],
      isActive: true,
      lastRun: '2025-01-27 09:00',
      nextRun: '2025-02-03 09:00',
      runCount: 12
    },
    {
      id: 'sch_3',
      name: 'Monthly Vendor Report',
      templateId: 'tpl_3',
      frequency: 'monthly',
      time: '10:00',
      recipients: ['procurement@company.com'],
      isActive: false,
      lastRun: '2025-01-01 10:00',
      nextRun: '2025-02-01 10:00',
      runCount: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      running: { label: 'Running', className: 'bg-blue-100 text-blue-800', icon: RefreshCw },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800', icon: AlertTriangle },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-800', icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
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
      case 'financial':
        return <DollarSign className="w-4 h-4" />;
      case 'operations':
        return <Truck className="w-4 h-4" />;
      case 'users':
        return <Users className="w-4 h-4" />;
      case 'reports':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getFormatBadge = (format: string) => {
    const formatConfig = {
      pdf: { label: 'PDF', className: 'bg-red-100 text-red-800' },
      excel: { label: 'Excel', className: 'bg-green-100 text-green-800' },
      csv: { label: 'CSV', className: 'bg-blue-100 text-blue-800' },
      json: { label: 'JSON', className: 'bg-purple-100 text-purple-800' },
      xml: { label: 'XML', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = formatConfig[format as keyof typeof formatConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredJobs = exportJobs.filter(job => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || job.format === selectedFormat;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesFormat;
  });

  // Calculate summary statistics
  const totalJobs = exportJobs.length;
  const completedJobs = exportJobs.filter(j => j.status === 'completed').length;
  const runningJobs = exportJobs.filter(j => j.status === 'running').length;
  const scheduledJobs = exportJobs.filter(j => j.isRecurring).length;

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Export Manager</h1>
            <p className="text-gray-600 mt-1">
              Kelola export data, template, dan jadwal otomatis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Export Settings
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedJobs}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Running</p>
                <p className="text-2xl font-bold text-gray-900">{runningJobs}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledJobs}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="jobs">Export Jobs</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="inventory">Inventory</option>
                  <option value="sales">Sales</option>
                  <option value="financial">Financial</option>
                  <option value="operations">Operations</option>
                  <option value="users">Users</option>
                </select>

                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Formats</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>

                <Button>
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </Card>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getCategoryIcon(job.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{job.name}</h3>
                          {getStatusBadge(job.status)}
                          {getFormatBadge(job.format)}
                          {job.isRecurring && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Recurring
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{job.description}</p>

                        {job.status === 'running' && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${job.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Records:</span>
                            <div className="font-medium">{job.recordCount.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Size:</span>
                            <div className="font-medium">{job.fileSize}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Created:</span>
                            <div className="font-medium">{job.createdAt}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Duration:</span>
                            <div className="font-medium">{job.duration || '-'}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Expires:</span>
                            <div className="font-medium">{job.expiresAt}</div>
                          </div>
                        </div>

                        {job.recipients && (
                          <div className="mt-3">
                            <span className="text-sm text-gray-600">Recipients: </span>
                            <span className="text-sm">{job.recipients.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {job.status === 'completed' && (
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {job.status === 'running' && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {job.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            {/* Templates List */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Export Templates</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exportTemplates.map((template) => (
                  <div key={template.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.category}</p>
                      </div>
                      <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">{template.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fields:</span>
                        <span className="font-medium">{template.fields.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Usage:</span>
                        <span className="font-medium">{template.usageCount}x</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedules" className="space-y-6">
            {/* Schedules List */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Export Schedules</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Schedule
                </Button>
              </div>

              <div className="space-y-4">
                {exportSchedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{schedule.name}</div>
                        <div className="text-sm text-gray-600">
                          {schedule.frequency} at {schedule.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          Recipients: {schedule.recipients.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {schedule.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">
                        Next: {schedule.nextRun}
                      </div>
                      <div className="text-sm text-gray-600">
                        Runs: {schedule.runCount}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {schedule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

          <TabsContent value="settings" className="space-y-6">
            {/* Export Settings */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Export Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">File Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Export Format
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Excel</option>
                        <option>PDF</option>
                        <option>CSV</option>
                        <option>JSON</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Retention (days)
                      </label>
                      <Input type="number" defaultValue="7" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Email notification on export completion</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span>Email notification on export failure</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>SMS notification for critical exports</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Performance Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Concurrent Jobs
                      </label>
                      <Input type="number" defaultValue="3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Batch Size (records)
                      </label>
                      <Input type="number" defaultValue="1000" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
