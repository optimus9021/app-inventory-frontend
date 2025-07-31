'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus, 
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  Eye,
  Download,
  Upload,
  Save,
  Settings,
  Star,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  BarChart3,
  PieChart,
  Table,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Code,
  Layers,
  Zap
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'inventory' | 'sales' | 'financial' | 'operations' | 'users' | 'custom';
  type: 'chart' | 'table' | 'dashboard' | 'export';
  format: 'pdf' | 'excel' | 'csv' | 'json';
  isBuiltIn: boolean;
  isActive: boolean;
  isFavorite: boolean;
  usageCount: number;
  lastUsed: string;
  estimatedTime: string;
  complexity: 'simple' | 'medium' | 'complex';
  dataSource: string[];
  parameters: ReportParameter[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ReportParameter {
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect';
  required: boolean;
  defaultValue?: string | number;
  options?: string[];
  description: string;
}

interface TemplateCategory {
  name: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export default function ReportTemplatesPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  // Mock data
  const templates: ReportTemplate[] = [
    {
      id: 'tpl_1',
      name: 'Stock Level Analysis',
      description: 'Comprehensive analysis of current stock levels across all locations and categories',
      category: 'inventory',
      type: 'dashboard',
      format: 'pdf',
      isBuiltIn: true,
      isActive: true,
      isFavorite: true,
      usageCount: 156,
      lastUsed: '2025-01-31 10:30',
      estimatedTime: '2-3 minutes',
      complexity: 'simple',
      dataSource: ['products', 'inventory', 'locations'],
      parameters: [
        {
          name: 'location',
          type: 'select',
          required: false,
          options: ['All Locations', 'Warehouse A', 'Warehouse B', 'Store 1'],
          description: 'Filter by specific location'
        },
        {
          name: 'category',
          type: 'multiselect',
          required: false,
          options: ['Electronics', 'Clothing', 'Books', 'Home & Garden'],
          description: 'Product categories to include'
        }
      ],
      createdBy: 'System',
      createdAt: '2024-01-15',
      updatedAt: '2024-12-20'
    },
    {
      id: 'tpl_2',
      name: 'Sales Performance Dashboard',
      description: 'Detailed sales metrics including trends, top products, and performance indicators',
      category: 'sales',
      type: 'dashboard',
      format: 'excel',
      isBuiltIn: true,
      isActive: true,
      isFavorite: true,
      usageCount: 298,
      lastUsed: '2025-01-31 09:15',
      estimatedTime: '3-5 minutes',
      complexity: 'medium',
      dataSource: ['sales', 'products', 'customers'],
      parameters: [
        {
          name: 'dateRange',
          type: 'date',
          required: true,
          description: 'Date range for analysis'
        },
        {
          name: 'salesPerson',
          type: 'select',
          required: false,
          options: ['All', 'John Doe', 'Jane Smith', 'Mike Wilson'],
          description: 'Filter by sales person'
        }
      ],
      createdBy: 'Sales Team',
      createdAt: '2024-02-01',
      updatedAt: '2025-01-15'
    },
    {
      id: 'tpl_3',
      name: 'Financial Summary Report',
      description: 'Complete financial overview including revenue, expenses, and profit margins',
      category: 'financial',
      type: 'table',
      format: 'pdf',
      isBuiltIn: true,
      isActive: true,
      isFavorite: false,
      usageCount: 89,
      lastUsed: '2025-01-30 16:45',
      estimatedTime: '5-7 minutes',
      complexity: 'complex',
      dataSource: ['transactions', 'accounts', 'budgets'],
      parameters: [
        {
          name: 'fiscalPeriod',
          type: 'select',
          required: true,
          options: ['Q1 2025', 'Q4 2024', 'FY 2024'],
          description: 'Fiscal period for report'
        }
      ],
      createdBy: 'Finance',
      createdAt: '2024-01-20',
      updatedAt: '2024-11-30'
    },
    {
      id: 'tpl_4',
      name: 'Vendor Performance Analysis',
      description: 'Evaluation of supplier performance including delivery times and quality metrics',
      category: 'operations',
      type: 'chart',
      format: 'excel',
      isBuiltIn: true,
      isActive: true,
      isFavorite: false,
      usageCount: 45,
      lastUsed: '2025-01-29 14:20',
      estimatedTime: '4-6 minutes',
      complexity: 'medium',
      dataSource: ['vendors', 'purchase_orders', 'deliveries'],
      parameters: [
        {
          name: 'vendor',
          type: 'multiselect',
          required: false,
          options: ['Vendor A', 'Vendor B', 'Vendor C'],
          description: 'Select vendors to analyze'
        }
      ],
      createdBy: 'Operations',
      createdAt: '2024-03-10',
      updatedAt: '2024-12-15'
    },
    {
      id: 'tpl_5',
      name: 'Custom ABC Analysis',
      description: 'Product categorization based on value and movement frequency',
      category: 'custom',
      type: 'chart',
      format: 'pdf',
      isBuiltIn: false,
      isActive: true,
      isFavorite: true,
      usageCount: 23,
      lastUsed: '2025-01-28 11:30',
      estimatedTime: '3-4 minutes',
      complexity: 'medium',
      dataSource: ['products', 'sales', 'inventory'],
      parameters: [
        {
          name: 'analysisType',
          type: 'select',
          required: true,
          options: ['Value-based', 'Quantity-based', 'Combined'],
          description: 'Type of ABC analysis'
        }
      ],
      createdBy: 'John Doe',
      createdAt: '2024-08-15',
      updatedAt: '2025-01-10'
    }
  ];

  const templateCategories: TemplateCategory[] = [
    {
      name: 'Inventory',
      count: templates.filter(t => t.category === 'inventory').length,
      icon: <Package className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Sales',
      count: templates.filter(t => t.category === 'sales').length,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-green-100 text-green-700'
    },
    {
      name: 'Financial',
      count: templates.filter(t => t.category === 'financial').length,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      name: 'Operations',
      count: templates.filter(t => t.category === 'operations').length,
      icon: <Truck className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      name: 'Users',
      count: templates.filter(t => t.category === 'users').length,
      icon: <Users className="w-5 h-5" />,
      color: 'bg-gray-100 text-gray-700'
    },
    {
      name: 'Custom',
      count: templates.filter(t => t.category === 'custom').length,
      icon: <Code className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-700'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'table':
        return <Table className="w-4 h-4" />;
      case 'dashboard':
        return <PieChart className="w-4 h-4" />;
      case 'export':
        return <Download className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getComplexityBadge = (complexity: string) => {
    const complexityConfig = {
      simple: { label: 'Simple', className: 'bg-green-100 text-green-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      complex: { label: 'Complex', className: 'bg-red-100 text-red-800' }
    };
    
    const config = complexityConfig[complexity as keyof typeof complexityConfig];
    return (
      <Badge className={config.className}>
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

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesType = selectedType === 'all' || template.type === selectedType;
    const matchesComplexity = selectedComplexity === 'all' || template.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesType && matchesComplexity;
  });

  // Calculate summary statistics
  const totalTemplates = templates.length;
  const builtInTemplates = templates.filter(t => t.isBuiltIn).length;
  const customTemplates = templates.filter(t => !t.isBuiltIn).length;
  const favoriteTemplates = templates.filter(t => t.isFavorite).length;

  return (
    
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Report Templates</h1>
            <p className="text-gray-600 mt-1">
              Manage and customize report templates untuk kebutuhan bisnis
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Template
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-gray-900">{totalTemplates}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Built-in</p>
                <p className="text-2xl font-bold text-gray-900">{builtInTemplates}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Custom</p>
                <p className="text-2xl font-bold text-gray-900">{customTemplates}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Code className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{favoriteTemplates}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="builder">Template Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Filters */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
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
                  <option value="custom">Custom</option>
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="chart">Chart</option>
                  <option value="table">Table</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="export">Export</option>
                </select>

                <select
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Complexity</option>
                  <option value="simple">Simple</option>
                  <option value="medium">Medium</option>
                  <option value="complex">Complex</option>
                </select>

                <Button>
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(template.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{template.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {template.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      {template.isBuiltIn ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Zap className="w-3 h-3 mr-1" />
                          Built-in
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-100 text-purple-800">
                          Custom
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Complexity</span>
                      {getComplexityBadge(template.complexity)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Format</span>
                      {getFormatBadge(template.format)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Usage</span>
                      <span className="font-medium">{template.usageCount} times</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Est. Time</span>
                      <span className="font-medium">{template.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button size="sm" className="flex-1">
                      <Zap className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {/* Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templateCategories.map((category) => (
                <Card key={category.name} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} templates</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {templates
                      .filter(t => t.category === category.name.toLowerCase())
                      .slice(0, 3)
                      .map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium">{template.name}</span>
                          <Badge className="text-xs">{template.usageCount}</Badge>
                        </div>
                      ))}
                  </div>

                  <Button className="w-full mt-4" variant="outline">
                    View All {category.name} Templates
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            {/* Template Builder */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Create New Template</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name
                    </label>
                    <Input placeholder="Enter template name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Select category</option>
                      <option>Inventory</option>
                      <option>Sales</option>
                      <option>Financial</option>
                      <option>Operations</option>
                      <option>Users</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Describe what this template does..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Chart</option>
                      <option>Table</option>
                      <option>Dashboard</option>
                      <option>Export</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                      <option>JSON</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complexity
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Simple</option>
                      <option>Medium</option>
                      <option>Complex</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Sources
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['products', 'inventory', 'sales', 'customers', 'vendors', 'transactions', 'users', 'logs'].map((source) => (
                      <label key={source} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="capitalize">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    
  );
}
