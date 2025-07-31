'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Search, 
  Plus, 
  Eye,
  TrendingUp,
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Download,
  Timer,
  Activity
} from 'lucide-react';

interface LeadTimeAnalysis {
  id: string;
  analysisNumber: string;
  supplierCode: string;
  supplierName: string;
  productCategory: string;
  orderType: 'regular' | 'rush' | 'bulk' | 'sample';
  analysisMonth: string;
  totalOrders: number;
  averageLeadTime: number; // in days
  minLeadTime: number;
  maxLeadTime: number;
  plannedLeadTime: number;
  actualLeadTime: number;
  variance: number; // difference between planned and actual
  variancePercentage: number;
  onTimeDeliveries: number;
  delayedDeliveries: number;
  onTimePercentage: number;
  performance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
  analysisBy: string;
  recommendations?: string[];
  notes?: string;
}

interface OrderLeadTime {
  id: string;
  orderNumber: string;
  supplierName: string;
  productCategory: string;
  orderDate: string;
  plannedDelivery: string;
  actualDelivery?: string;
  plannedLeadTime: number;
  actualLeadTime?: number;
  variance?: number;
  status: 'planned' | 'in-progress' | 'delivered' | 'delayed' | 'cancelled';
  delayReason?: string;
  orderValue: number;
  currency: string;
}

const mockLeadTimeAnalyses: LeadTimeAnalysis[] = [
  {
    id: '1',
    analysisNumber: 'LTA-2025-001',
    supplierCode: 'SUP-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    productCategory: 'Fashion',
    orderType: 'regular',
    analysisMonth: '2024-12',
    totalOrders: 24,
    averageLeadTime: 16.5,
    minLeadTime: 12,
    maxLeadTime: 22,
    plannedLeadTime: 15,
    actualLeadTime: 16.5,
    variance: 1.5,
    variancePercentage: 10,
    onTimeDeliveries: 18,
    delayedDeliveries: 6,
    onTimePercentage: 75,
    performance: 'good',
    trend: 'stable',
    riskLevel: 'low',
    lastUpdated: '2025-01-15',
    analysisBy: 'Supply Chain Analyst',
    recommendations: [
      'Maintain current supplier relationship',
      'Consider buffer stock for critical items',
      'Monitor seasonal variations'
    ],
    notes: 'Generally reliable supplier with consistent performance'
  },
  {
    id: '2',
    analysisNumber: 'LTA-2025-002',
    supplierCode: 'SUP-002',
    supplierName: 'CV Elektronik Nusantara',
    productCategory: 'Elektronik',
    orderType: 'bulk',
    analysisMonth: '2024-12',
    totalOrders: 12,
    averageLeadTime: 21.3,
    minLeadTime: 18,
    maxLeadTime: 28,
    plannedLeadTime: 18,
    actualLeadTime: 21.3,
    variance: 3.3,
    variancePercentage: 18.3,
    onTimeDeliveries: 8,
    delayedDeliveries: 4,
    onTimePercentage: 66.7,
    performance: 'average',
    trend: 'declining',
    riskLevel: 'medium',
    lastUpdated: '2025-01-14',
    analysisBy: 'Operations Manager',
    recommendations: [
      'Review supplier capacity planning',
      'Implement milestone tracking',
      'Consider backup supplier options',
      'Increase planned lead time buffer'
    ],
    notes: 'Performance declining in recent months, requires attention'
  },
  {
    id: '3',
    analysisNumber: 'LTA-2025-003',
    supplierCode: 'SUP-003',
    supplierName: 'PT Tekstil Modern',
    productCategory: 'Fashion',
    orderType: 'regular',
    analysisMonth: '2024-12',
    totalOrders: 18,
    averageLeadTime: 19.8,
    minLeadTime: 15,
    maxLeadTime: 25,
    plannedLeadTime: 14,
    actualLeadTime: 19.8,
    variance: 5.8,
    variancePercentage: 41.4,
    onTimeDeliveries: 9,
    delayedDeliveries: 9,
    onTimePercentage: 50,
    performance: 'poor',
    trend: 'declining',
    riskLevel: 'high',
    lastUpdated: '2025-01-13',
    analysisBy: 'Procurement Manager',
    recommendations: [
      'Urgent supplier performance review required',
      'Implement penalty clauses',
      'Source alternative suppliers',
      'Increase safety stock levels'
    ],
    notes: 'Significant performance issues, action required'
  },
  {
    id: '4',
    analysisNumber: 'LTA-2025-004',
    supplierCode: 'SUP-004',
    supplierName: 'PT Aksesoris Premium',
    productCategory: 'Aksesoris',
    orderType: 'sample',
    analysisMonth: '2024-12',
    totalOrders: 8,
    averageLeadTime: 11.2,
    minLeadTime: 9,
    maxLeadTime: 14,
    plannedLeadTime: 12,
    actualLeadTime: 11.2,
    variance: -0.8,
    variancePercentage: -6.7,
    onTimeDeliveries: 7,
    delayedDeliveries: 1,
    onTimePercentage: 87.5,
    performance: 'excellent',
    trend: 'improving',
    riskLevel: 'low',
    lastUpdated: '2025-01-12',
    analysisBy: 'Category Manager',
    recommendations: [
      'Excellent performance - maintain relationship',
      'Consider increasing order volumes',
      'Share best practices with other suppliers'
    ],
    notes: 'Top performing supplier, consistently exceeds expectations'
  },
  {
    id: '5',
    analysisNumber: 'LTA-2025-005',
    supplierCode: 'SUP-005',
    supplierName: 'CV Olahraga Sejahtera',
    productCategory: 'Olahraga',
    orderType: 'rush',
    analysisMonth: '2024-12',
    totalOrders: 6,
    averageLeadTime: 28.5,
    minLeadTime: 24,
    maxLeadTime: 35,
    plannedLeadTime: 21,
    actualLeadTime: 28.5,
    variance: 7.5,
    variancePercentage: 35.7,
    onTimeDeliveries: 2,
    delayedDeliveries: 4,
    onTimePercentage: 33.3,
    performance: 'critical',
    trend: 'declining',
    riskLevel: 'critical',
    lastUpdated: '2025-01-11',
    analysisBy: 'Supply Chain Manager',
    recommendations: [
      'Immediate supplier review meeting',
      'Implement strict SLA monitoring',
      'Find alternative suppliers urgently',
      'Consider contract termination if no improvement'
    ],
    notes: 'Critical performance issues, immediate action required'
  }
];

const mockOrderLeadTimes: OrderLeadTime[] = [
  {
    id: '1',
    orderNumber: 'PO-2025-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    productCategory: 'Fashion',
    orderDate: '2025-01-10',
    plannedDelivery: '2025-01-25',
    actualDelivery: '2025-01-26',
    plannedLeadTime: 15,
    actualLeadTime: 16,
    variance: 1,
    status: 'delivered',
    orderValue: 125000000,
    currency: 'IDR'
  },
  {
    id: '2',
    orderNumber: 'PO-2025-002',
    supplierName: 'CV Elektronik Nusantara',
    productCategory: 'Elektronik',
    orderDate: '2025-01-12',
    plannedDelivery: '2025-01-30',
    plannedLeadTime: 18,
    status: 'in-progress',
    orderValue: 225000000,
    currency: 'IDR'
  },
  {
    id: '3',
    orderNumber: 'PO-2025-003',
    supplierName: 'PT Tekstil Modern',
    productCategory: 'Fashion',
    orderDate: '2025-01-08',
    plannedDelivery: '2025-01-22',
    actualDelivery: '2025-01-28',
    plannedLeadTime: 14,
    actualLeadTime: 20,
    variance: 6,
    status: 'delayed',
    delayReason: 'Material shortage at supplier',
    orderValue: 90000000,
    currency: 'IDR'
  }
];

const getPerformanceBadge = (performance: string) => {
  switch (performance) {
    case 'excellent':
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    case 'good':
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    case 'average':
      return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    case 'poor':
      return <Badge className="bg-orange-100 text-orange-800">Poor</Badge>;
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'improving':
      return <Badge className="bg-green-100 text-green-800">Improving</Badge>;
    case 'stable':
      return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>;
    case 'declining':
      return <Badge className="bg-red-100 text-red-800">Declining</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    case 'high':
      return <Badge className="bg-orange-100 text-orange-800">High Risk</Badge>;
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Critical Risk</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getOrderTypeBadge = (type: string) => {
  switch (type) {
    case 'regular':
      return <Badge className="bg-blue-100 text-blue-800">Regular</Badge>;
    case 'rush':
      return <Badge className="bg-red-100 text-red-800">Rush</Badge>;
    case 'bulk':
      return <Badge className="bg-purple-100 text-purple-800">Bulk</Badge>;
    case 'sample':
      return <Badge className="bg-green-100 text-green-800">Sample</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'planned':
      return <Badge className="bg-gray-100 text-gray-800">Planned</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case 'delivered':
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
    case 'delayed':
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'stable':
      return <Activity className="h-4 w-4 text-blue-600" />;
    case 'declining':
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const getPerformanceIcon = (performance: string) => {
  switch (performance) {
    case 'excellent':
      return <Target className="h-4 w-4 text-green-600" />;
    case 'good':
      return <CheckCircle className="h-4 w-4 text-blue-600" />;
    case 'average':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'poor':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function LeadTimeAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerformance, setSelectedPerformance] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAnalyses = mockLeadTimeAnalyses.filter(analysis => {
    const matchesSearch = analysis.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.supplierCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         analysis.productCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPerformance = selectedPerformance === 'all' || analysis.performance === selectedPerformance;
    const matchesCategory = selectedCategory === 'all' || analysis.productCategory === selectedCategory;
    
    return matchesSearch && matchesPerformance && matchesCategory;
  });

  const totalAnalyses = filteredAnalyses.length;
  const avgLeadTime = filteredAnalyses.reduce((sum, a) => sum + a.averageLeadTime, 0) / filteredAnalyses.length;
  const avgOnTimePercentage = filteredAnalyses.reduce((sum, a) => sum + a.onTimePercentage, 0) / filteredAnalyses.length;
  const criticalSuppliers = filteredAnalyses.filter(a => a.performance === 'critical').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Time Analysis</h1>
            <p className="text-muted-foreground">
              Analisis dan monitor lead time performance dari supplier
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Analyses</p>
                <p className="text-2xl font-bold">{totalAnalyses}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Lead Time</p>
                <p className="text-2xl font-bold text-green-600">{avgLeadTime.toFixed(1)} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">On-Time %</p>
                <p className="text-2xl font-bold text-purple-600">{avgOnTimePercentage.toFixed(1)}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Suppliers</p>
                <p className="text-2xl font-bold text-red-600">{criticalSuppliers}</p>
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
                  placeholder="Cari supplier, kode, kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedPerformance}
              onChange={(e) => setSelectedPerformance(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Performance</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="poor">Poor</option>
              <option value="critical">Critical</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Kategori</option>
              <option value="Fashion">Fashion</option>
              <option value="Elektronik">Elektronik</option>
              <option value="Aksesoris">Aksesoris</option>
              <option value="Olahraga">Olahraga</option>
            </select>
          </div>
        </Card>

        {/* Lead Time Analysis Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Lead Time Performance Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Supplier Info</th>
                    <th className="text-center p-4">Order Type</th>
                    <th className="text-center p-4">Lead Time (Days)</th>
                    <th className="text-center p-4">Variance</th>
                    <th className="text-center p-4">On-Time %</th>
                    <th className="text-center p-4">Performance</th>
                    <th className="text-center p-4">Trend</th>
                    <th className="text-center p-4">Risk Level</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{analysis.supplierName}</div>
                          <div className="text-sm text-muted-foreground">
                            {analysis.supplierCode} • {analysis.productCategory}
                          </div>
                          <div className="text-xs text-blue-600">
                            {analysis.totalOrders} orders • {analysis.analysisMonth}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getOrderTypeBadge(analysis.orderType)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">{analysis.averageLeadTime} days</div>
                        <div className="text-sm text-muted-foreground">
                          Range: {analysis.minLeadTime}-{analysis.maxLeadTime}
                        </div>
                        <div className="text-xs text-gray-500">
                          Planned: {analysis.plannedLeadTime} days
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`font-medium ${analysis.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {analysis.variance > 0 ? '+' : ''}{analysis.variance} days
                        </div>
                        <div className={`text-sm ${analysis.variancePercentage > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {analysis.variancePercentage > 0 ? '+' : ''}{analysis.variancePercentage.toFixed(1)}%
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">{analysis.onTimePercentage}%</div>
                        <div className="text-sm text-muted-foreground">
                          {analysis.onTimeDeliveries}/{analysis.totalOrders}
                        </div>
                        <div className="text-xs text-red-600">
                          {analysis.delayedDeliveries} delayed
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getPerformanceIcon(analysis.performance)}
                          {getPerformanceBadge(analysis.performance)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getTrendIcon(analysis.trend)}
                          {getTrendBadge(analysis.trend)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getRiskBadge(analysis.riskLevel)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Recent Orders Lead Time */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Orders Lead Time Tracking</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Order Info</th>
                    <th className="text-left p-4">Supplier</th>
                    <th className="text-center p-4">Planned Lead Time</th>
                    <th className="text-center p-4">Actual Lead Time</th>
                    <th className="text-center p-4">Variance</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-right p-4">Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrderLeadTimes.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{order.orderNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.productCategory}
                          </div>
                          <div className="text-xs text-blue-600">
                            Order: {order.orderDate}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{order.supplierName}</div>
                        {order.delayReason && (
                          <div className="text-xs text-red-600 mt-1">
                            Delay: {order.delayReason}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">{order.plannedLeadTime} days</div>
                        <div className="text-sm text-muted-foreground">
                          Due: {order.plannedDelivery}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">
                          {order.actualLeadTime ? `${order.actualLeadTime} days` : 'TBD'}
                        </div>
                        {order.actualDelivery && (
                          <div className="text-sm text-muted-foreground">
                            Actual: {order.actualDelivery}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {order.variance !== undefined && (
                          <div className={`font-medium ${order.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {order.variance > 0 ? '+' : ''}{order.variance} days
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(order.orderValue)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-600" />
                  Excellent Performance
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredAnalyses.filter(a => a.performance === 'excellent').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  Good Performance
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredAnalyses.filter(a => a.performance === 'good').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                  Average Performance
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredAnalyses.filter(a => a.performance === 'average').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  Poor/Critical
                </span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredAnalyses.filter(a => ['poor', 'critical'].includes(a.performance)).length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Suppliers Requiring Attention</h3>
            <div className="space-y-3">
              {filteredAnalyses
                .filter(a => ['poor', 'critical'].includes(a.performance))
                .sort((a, b) => {
                  const performanceOrder = { 'critical': 4, 'poor': 3, 'average': 2, 'good': 1, 'excellent': 0 };
                  return performanceOrder[b.performance as keyof typeof performanceOrder] - performanceOrder[a.performance as keyof typeof performanceOrder];
                })
                .slice(0, 5)
                .map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getPerformanceIcon(analysis.performance)}
                      <div>
                        <div className="font-medium">{analysis.supplierName}</div>
                        <div className="text-muted-foreground">
                          {analysis.productCategory} • {analysis.onTimePercentage}% on-time
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">
                        {analysis.averageLeadTime} days
                      </div>
                      <div className="text-muted-foreground">
                        {analysis.variance > 0 ? '+' : ''}{analysis.variance} variance
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
