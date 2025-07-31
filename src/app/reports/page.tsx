'use client';

import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar,
  Download,
  Filter,
  Search,
  Eye,
  Share2,
  Clock,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  Truck,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Plus,
  Settings,
  Star,
  Bookmark
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  description: string;
  category: 'inventory' | 'sales' | 'financial' | 'operations' | 'users';
  type: 'chart' | 'table' | 'dashboard' | 'export';
  lastGenerated: string;
  size: string;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'ready' | 'generating' | 'failed' | 'scheduled';
  isScheduled: boolean;
  isFavorite: boolean;
  accessCount: number;
  createdBy: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isPopular: boolean;
  estimatedTime: string;
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const reports: Report[] = [
    {
      id: 'rpt_1',
      name: 'Laporan Inventory Bulanan',
      description: 'Ringkasan status inventory untuk bulan ini',
      category: 'inventory',
      type: 'dashboard',
      lastGenerated: '2025-01-31 10:30',
      size: '2.4 MB',
      format: 'pdf',
      status: 'ready',
      isScheduled: true,
      isFavorite: true,
      accessCount: 45,
      createdBy: 'Admin'
    },
    {
      id: 'rpt_2',
      name: 'Analisis Penjualan Q1',
      description: 'Analisis performance penjualan quarter pertama',
      category: 'sales',
      type: 'chart',
      lastGenerated: '2025-01-30 16:45',
      size: '1.8 MB',
      format: 'excel',
      status: 'ready',
      isScheduled: false,
      isFavorite: false,
      accessCount: 23,
      createdBy: 'John Doe'
    },
    {
      id: 'rpt_3',
      name: 'Cash Flow Statement',
      description: 'Laporan arus kas harian dan proyeksi',
      category: 'financial',
      type: 'table',
      lastGenerated: '2025-01-31 08:15',
      size: '856 KB',
      format: 'pdf',
      status: 'ready',
      isScheduled: true,
      isFavorite: true,
      accessCount: 67,
      createdBy: 'Finance Team'
    },
    {
      id: 'rpt_4',
      name: 'Supply Chain Analytics',
      description: 'Analisis performa supply chain dan vendor',
      category: 'operations',
      type: 'dashboard',
      lastGenerated: '2025-01-31 12:00',
      size: '3.2 MB',
      format: 'excel',
      status: 'generating',
      isScheduled: true,
      isFavorite: false,
      accessCount: 12,
      createdBy: 'Operations'
    },
    {
      id: 'rpt_5',
      name: 'User Activity Report',
      description: 'Laporan aktivitas pengguna dan akses sistem',
      category: 'users',
      type: 'table',
      lastGenerated: '2025-01-30 22:30',
      size: '1.2 MB',
      format: 'csv',
      status: 'ready',
      isScheduled: false,
      isFavorite: false,
      accessCount: 8,
      createdBy: 'IT Admin'
    }
  ];

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'tpl_1',
      name: 'Stock Level Report',
      description: 'Current stock levels across all locations',
      category: 'Inventory',
      icon: 'Package',
      isPopular: true,
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'tpl_2',
      name: 'Sales Performance',
      description: 'Sales metrics and performance analysis',
      category: 'Sales',
      icon: 'TrendingUp',
      isPopular: true,
      estimatedTime: '3-5 minutes'
    },
    {
      id: 'tpl_3',
      name: 'Financial Summary',
      description: 'Income, expenses, and profit analysis',
      category: 'Financial',
      icon: 'DollarSign',
      isPopular: false,
      estimatedTime: '5-7 minutes'
    },
    {
      id: 'tpl_4',
      name: 'Vendor Performance',
      description: 'Supplier and vendor performance metrics',
      category: 'Operations',
      icon: 'Truck',
      isPopular: true,
      estimatedTime: '4-6 minutes'
    },
    {
      id: 'tpl_5',
      name: 'User Analytics',
      description: 'User behavior and system usage statistics',
      category: 'Users',
      icon: 'Users',
      isPopular: false,
      estimatedTime: '2-4 minutes'
    },
    {
      id: 'tpl_6',
      name: 'ABC Analysis',
      description: 'Product categorization based on value',
      category: 'Inventory',
      icon: 'BarChart3',
      isPopular: true,
      estimatedTime: '3-4 minutes'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory':
        return <Package className="w-5 h-5" />;
      case 'sales':
        return <ShoppingCart className="w-5 h-5" />;
      case 'financial':
        return <DollarSign className="w-5 h-5" />;
      case 'operations':
        return <Truck className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inventory':
        return 'text-blue-600 bg-blue-100';
      case 'sales':
        return 'text-green-600 bg-green-100';
      case 'financial':
        return 'text-purple-600 bg-purple-100';
      case 'operations':
        return 'text-orange-600 bg-orange-100';
      case 'users':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ready: { label: 'Ready', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      generating: { label: 'Generating', className: 'bg-blue-100 text-blue-800', icon: RefreshCw },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800', icon: AlertTriangle },
      scheduled: { label: 'Scheduled', className: 'bg-yellow-100 text-yellow-800', icon: Clock }
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

  const getFormatBadge = (format: string) => {
    const formatConfig = {
      pdf: { label: 'PDF', className: 'bg-red-100 text-red-800' },
      excel: { label: 'Excel', className: 'bg-green-100 text-green-800' },
      csv: { label: 'CSV', className: 'bg-blue-100 text-blue-800' },
      json: { label: 'JSON', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = formatConfig[format as keyof typeof formatConfig];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate summary statistics
  const totalReports = reports.length;
  const readyReports = reports.filter(r => r.status === 'ready').length;
  const scheduledReports = reports.filter(r => r.isScheduled).length;
  const favoriteReports = reports.filter(r => r.isFavorite).length;

  const popularTemplates = reportTemplates.filter(t => t.isPopular);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">
              Generate, manage, dan schedule laporan sistem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Template Manager
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold text-gray-900">{readyReports}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{scheduledReports}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favoriteReports}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions & Popular Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Report Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularTemplates.map((template) => (
                  <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {template.icon === 'Package' && <Package className="w-5 h-5 text-blue-600" />}
                          {template.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                          {template.icon === 'DollarSign' && <DollarSign className="w-5 h-5 text-blue-600" />}
                          {template.icon === 'Truck' && <Truck className="w-5 h-5 text-blue-600" />}
                          {template.icon === 'Users' && <Users className="w-5 h-5 text-blue-600" />}
                          {template.icon === 'BarChart3' && <BarChart3 className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.category}</p>
                        </div>
                      </div>
                      {template.isPopular && (
                        <Badge className="bg-orange-100 text-orange-800">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {template.estimatedTime}
                      </span>
                      <Button size="sm">Generate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard Overview
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Sales Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Package className="w-4 h-4 mr-2" />
                  Inventory Status
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PieChart className="w-4 h-4 mr-2" />
                  Custom Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Reports List */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Reports</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
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
              <option value="financial">Financial</option>
              <option value="operations">Operations</option>
              <option value="users">Users</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="ready">Ready</option>
              <option value="generating">Generating</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Report</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Format</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Generated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {report.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          {report.isScheduled && <Clock className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-gray-500 text-xs">{report.description}</div>
                          <div className="text-gray-500 text-xs">
                            by {report.createdBy} • {report.accessCount} views • {report.size}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm ${getCategoryColor(report.category)}`}>
                        {getCategoryIcon(report.category)}
                        <span className="capitalize">{report.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="py-3 px-4">
                      {getFormatBadge(report.format)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">{report.lastGenerated}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" title="View Report">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Download">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Share">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Add to Favorites">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
