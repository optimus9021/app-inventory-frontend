'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Download,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  BarChart3,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Activity,
  Building,
  FileText,
  Timer,
  Zap,
  Gauge,
  PlayCircle
} from 'lucide-react';

interface LeadTimeAnalysis {
  id: string;
  supplier: {
    name: string;
    code: string;
    contact: string;
    category: string;
    location: string;
  };
  item: {
    name: string;
    sku: string;
    category: string;
  };
  leadTimeMetrics: {
    promisedLeadTime: number; // days
    actualLeadTime: number; // days
    averageLeadTime: number; // days
    minimumLeadTime: number; // days
    maximumLeadTime: number; // days
    variance: number;
    standardDeviation: number;
    reliability: number; // percentage
  };
  orderHistory: OrderHistory[];
  performance: {
    onTimeDeliveryRate: number;
    averageDelay: number;
    consistencyScore: number;
    improvementTrend: 'improving' | 'stable' | 'declining';
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  breakdown: {
    processTime: number; // supplier internal processing
    productionTime: number; // manufacturing time
    qualityCheckTime: number; // QC time
    packagingTime: number; // packaging time
    shippingTime: number; // logistics time
    customsTime?: number; // customs clearance (if applicable)
  };
  analysis: {
    bottlenecks: string[];
    recommendations: string[];
    riskFactors: string[];
    seasonalImpact: boolean;
    weatherSensitive: boolean;
  };
  benchmarks: {
    industryAverage: number;
    competitorAverage: number;
    targetLeadTime: number;
    bestInClass: number;
  };
  forecast: {
    nextMonthPrediction: number;
    confidenceLevel: number;
    seasonalAdjustment: number;
  };
  alerts?: Alert[];
}

interface OrderHistory {
  poNumber: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery: string;
  leadTimeDays: number;
  status: 'on-time' | 'delayed' | 'early';
  delayReason?: string;
}

interface Alert {
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
}

const mockLeadTimeData: LeadTimeAnalysis[] = [
  {
    id: '1',
    supplier: {
      name: 'PT Supplier Utama',
      code: 'SUP-001',
      contact: 'supplier@utama.com',
      category: 'Electronics',
      location: 'Jakarta, Indonesia'
    },
    item: {
      name: 'Smartphone Components',
      sku: 'SPC-001',
      category: 'Electronics'
    },
    leadTimeMetrics: {
      promisedLeadTime: 14,
      actualLeadTime: 16,
      averageLeadTime: 15.5,
      minimumLeadTime: 12,
      maximumLeadTime: 21,
      variance: 4.2,
      standardDeviation: 2.1,
      reliability: 78
    },
    orderHistory: [
      {
        poNumber: 'PO-2025-001',
        orderDate: '2025-01-15T00:00:00Z',
        expectedDelivery: '2025-01-29T00:00:00Z',
        actualDelivery: '2025-01-31T00:00:00Z',
        leadTimeDays: 16,
        status: 'delayed',
        delayReason: 'Component shortage'
      },
      {
        poNumber: 'PO-2024-198',
        orderDate: '2024-12-20T00:00:00Z',
        expectedDelivery: '2025-01-03T00:00:00Z',
        actualDelivery: '2025-01-02T00:00:00Z',
        leadTimeDays: 13,
        status: 'early'
      },
      {
        poNumber: 'PO-2024-185',
        orderDate: '2024-12-01T00:00:00Z',
        expectedDelivery: '2024-12-15T00:00:00Z',
        actualDelivery: '2024-12-18T00:00:00Z',
        leadTimeDays: 17,
        status: 'delayed',
        delayReason: 'Quality issues'
      }
    ],
    performance: {
      onTimeDeliveryRate: 65,
      averageDelay: 2.1,
      consistencyScore: 72,
      improvementTrend: 'declining',
      riskLevel: 'medium'
    },
    breakdown: {
      processTime: 2,
      productionTime: 8,
      qualityCheckTime: 3,
      packagingTime: 1,
      shippingTime: 2
    },
    analysis: {
      bottlenecks: ['Production scheduling delays', 'Quality control inconsistencies'],
      recommendations: [
        'Implement better production planning',
        'Establish backup suppliers',
        'Improve quality processes'
      ],
      riskFactors: ['Single source dependency', 'Quality variability'],
      seasonalImpact: true,
      weatherSensitive: false
    },
    benchmarks: {
      industryAverage: 18,
      competitorAverage: 16,
      targetLeadTime: 12,
      bestInClass: 10
    },
    forecast: {
      nextMonthPrediction: 17,
      confidenceLevel: 75,
      seasonalAdjustment: 1.2
    },
    alerts: [
      {
        type: 'warning',
        message: 'Lead time trending upward - performance declining',
        timestamp: '2025-02-15T10:00:00Z'
      }
    ]
  },
  {
    id: '2',
    supplier: {
      name: 'CV Furniture Excellence',
      code: 'SUP-002',
      contact: 'order@furnitureexcel.com',
      category: 'Furniture',
      location: 'Jepara, Indonesia'
    },
    item: {
      name: 'Custom Office Furniture',
      sku: 'COF-001',
      category: 'Furniture'
    },
    leadTimeMetrics: {
      promisedLeadTime: 21,
      actualLeadTime: 19,
      averageLeadTime: 20.5,
      minimumLeadTime: 18,
      maximumLeadTime: 25,
      variance: 2.8,
      standardDeviation: 1.7,
      reliability: 85
    },
    orderHistory: [
      {
        poNumber: 'PO-2025-015',
        orderDate: '2025-01-20T00:00:00Z',
        expectedDelivery: '2025-02-10T00:00:00Z',
        actualDelivery: '2025-02-08T00:00:00Z',
        leadTimeDays: 19,
        status: 'early'
      },
      {
        poNumber: 'PO-2024-210',
        orderDate: '2024-12-15T00:00:00Z',
        expectedDelivery: '2025-01-05T00:00:00Z',
        actualDelivery: '2025-01-05T00:00:00Z',
        leadTimeDays: 21,
        status: 'on-time'
      }
    ],
    performance: {
      onTimeDeliveryRate: 85,
      averageDelay: 0.5,
      consistencyScore: 88,
      improvementTrend: 'improving',
      riskLevel: 'low'
    },
    breakdown: {
      processTime: 3,
      productionTime: 14,
      qualityCheckTime: 2,
      packagingTime: 1,
      shippingTime: 1
    },
    analysis: {
      bottlenecks: ['Custom design approval process'],
      recommendations: [
        'Streamline design approval',
        'Maintain current performance level',
        'Consider as preferred supplier'
      ],
      riskFactors: ['Design complexity dependency'],
      seasonalImpact: false,
      weatherSensitive: true
    },
    benchmarks: {
      industryAverage: 28,
      competitorAverage: 25,
      targetLeadTime: 18,
      bestInClass: 15
    },
    forecast: {
      nextMonthPrediction: 20,
      confidenceLevel: 92,
      seasonalAdjustment: 0.9
    },
    alerts: [
      {
        type: 'info',
        message: 'Consistently meeting promised lead times',
        timestamp: '2025-02-14T15:30:00Z'
      }
    ]
  },
  {
    id: '3',
    supplier: {
      name: 'PT Express Manufacturing',
      code: 'SUP-003',
      contact: 'sales@expressmfg.com',
      category: 'Manufacturing',
      location: 'Surabaya, Indonesia'
    },
    item: {
      name: 'Industrial Components',
      sku: 'IND-001',
      category: 'Industrial'
    },
    leadTimeMetrics: {
      promisedLeadTime: 7,
      actualLeadTime: 11,
      averageLeadTime: 9.8,
      minimumLeadTime: 7,
      maximumLeadTime: 14,
      variance: 6.1,
      standardDeviation: 2.5,
      reliability: 45
    },
    orderHistory: [
      {
        poNumber: 'PO-2025-008',
        orderDate: '2025-02-01T00:00:00Z',
        expectedDelivery: '2025-02-08T00:00:00Z',
        actualDelivery: '2025-02-12T00:00:00Z',
        leadTimeDays: 11,
        status: 'delayed',
        delayReason: 'Machine breakdown'
      },
      {
        poNumber: 'PO-2025-003',
        orderDate: '2025-01-18T00:00:00Z',
        expectedDelivery: '2025-01-25T00:00:00Z',
        actualDelivery: '2025-01-29T00:00:00Z',
        leadTimeDays: 11,
        status: 'delayed',
        delayReason: 'Material shortage'
      }
    ],
    performance: {
      onTimeDeliveryRate: 45,
      averageDelay: 3.8,
      consistencyScore: 38,
      improvementTrend: 'declining',
      riskLevel: 'high'
    },
    breakdown: {
      processTime: 1,
      productionTime: 4,
      qualityCheckTime: 2,
      packagingTime: 1,
      shippingTime: 3
    },
    analysis: {
      bottlenecks: ['Equipment reliability issues', 'Material supply chain disruptions'],
      recommendations: [
        'Diversify supplier base urgently',
        'Implement contingency planning',
        'Consider alternative suppliers'
      ],
      riskFactors: ['High equipment failure rate', 'Poor planning', 'Material dependencies'],
      seasonalImpact: false,
      weatherSensitive: false
    },
    benchmarks: {
      industryAverage: 8,
      competitorAverage: 7,
      targetLeadTime: 7,
      bestInClass: 5
    },
    forecast: {
      nextMonthPrediction: 12,
      confidenceLevel: 60,
      seasonalAdjustment: 1.0
    },
    alerts: [
      {
        type: 'critical',
        message: 'Consistently missing promised lead times - high risk supplier',
        timestamp: '2025-02-16T08:00:00Z'
      },
      {
        type: 'error',
        message: 'Lead time variance exceeding acceptable limits',
        timestamp: '2025-02-15T14:00:00Z'
      }
    ]
  }
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num);
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
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge>Unknown</Badge>;
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
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'on-time':
      return <Badge className="bg-green-100 text-green-800">On Time</Badge>;
    case 'early':
      return <Badge className="bg-blue-100 text-blue-800">Early</Badge>;
    case 'delayed':
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'critical':
      return <Zap className="h-4 w-4 text-red-600" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'info':
      return <Activity className="h-4 w-4 text-blue-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

export default function LeadTimeAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);

  const filteredData = mockLeadTimeData.filter(data => {
    const matchesSearch = 
      data.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.supplier.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || data.supplier.category === selectedCategory;
    const matchesRisk = selectedRisk === 'all' || data.performance.riskLevel === selectedRisk;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const totalSuppliers = filteredData.length;
  const avgLeadTime = filteredData.reduce((sum, data) => sum + data.leadTimeMetrics.averageLeadTime, 0) / filteredData.length;
  const avgReliability = filteredData.reduce((sum, data) => sum + data.leadTimeMetrics.reliability, 0) / filteredData.length;
  const onTimeRate = filteredData.reduce((sum, data) => sum + data.performance.onTimeDeliveryRate, 0) / filteredData.length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lead Time Analysis</h1>
            <p className="text-muted-foreground">
              Analisis mendalam lead time supplier dan performance delivery
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Advanced Analytics
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Suppliers</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(totalSuppliers)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Lead Time</p>
                <p className="text-2xl font-bold text-purple-600">{avgLeadTime.toFixed(1)} days</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reliability</p>
                <p className="text-2xl font-bold text-green-600">{avgReliability.toFixed(1)}%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">On-Time Rate</p>
                <p className="text-2xl font-bold text-emerald-600">{onTimeRate.toFixed(1)}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari supplier, item, atau kode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Textiles">Textiles</option>
                </select>
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Risk Level</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Lead Time Analysis List */}
        <div className="space-y-6">
          {filteredData.map((data) => (
            <Card key={data.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-xl">{data.supplier.name}</span>
                      <Badge variant="outline">{data.supplier.code}</Badge>
                      {getRiskBadge(data.performance.riskLevel)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {data.item.name} • {data.supplier.category} • {data.supplier.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-blue-600">
                    {data.leadTimeMetrics.actualLeadTime} days
                  </div>
                  <div className="text-sm text-muted-foreground">
                    vs {data.leadTimeMetrics.promisedLeadTime} promised
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{data.leadTimeMetrics.averageLeadTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Lead Time</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{data.leadTimeMetrics.reliability}%</div>
                  <div className="text-sm text-muted-foreground">Reliability</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{data.performance.onTimeDeliveryRate}%</div>
                  <div className="text-sm text-muted-foreground">On-Time Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">±{data.leadTimeMetrics.standardDeviation}</div>
                  <div className="text-sm text-muted-foreground">Std Deviation</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1">
                    {getTrendIcon(data.performance.improvementTrend)}
                    <span className="text-2xl font-bold text-emerald-600">{data.performance.consistencyScore}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Consistency</div>
                </div>
              </div>

              {/* Performance vs Benchmarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Gauge className="h-5 w-5 mr-2" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Min Lead Time:</span>
                      <span className="font-medium text-green-600">{data.leadTimeMetrics.minimumLeadTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Lead Time:</span>
                      <span className="font-medium text-red-600">{data.leadTimeMetrics.maximumLeadTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance:</span>
                      <span className="font-medium text-orange-600">±{data.leadTimeMetrics.variance} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Delay:</span>
                      <span className="font-medium text-purple-600">{data.performance.averageDelay} days</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Benchmarks Comparison
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Target:</span>
                      <span className="font-medium text-blue-600">{data.benchmarks.targetLeadTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Industry Avg:</span>
                      <span className="font-medium text-gray-600">{data.benchmarks.industryAverage} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Competitor Avg:</span>
                      <span className="font-medium text-yellow-600">{data.benchmarks.competitorAverage} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best in Class:</span>
                      <span className="font-medium text-green-600">{data.benchmarks.bestInClass} days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Time Breakdown */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Timer className="h-5 w-5 mr-2" />
                  Lead Time Breakdown
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">{data.breakdown.processTime}d</div>
                    <div className="text-xs text-muted-foreground">Processing</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="text-lg font-bold text-purple-600">{data.breakdown.productionTime}d</div>
                    <div className="text-xs text-muted-foreground">Production</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">{data.breakdown.qualityCheckTime}d</div>
                    <div className="text-xs text-muted-foreground">QC Check</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded">
                    <div className="text-lg font-bold text-yellow-600">{data.breakdown.packagingTime}d</div>
                    <div className="text-xs text-muted-foreground">Packaging</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded">
                    <div className="text-lg font-bold text-indigo-600">{data.breakdown.shippingTime}d</div>
                    <div className="text-xs text-muted-foreground">Shipping</div>
                  </div>
                  {data.breakdown.customsTime && (
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">{data.breakdown.customsTime}d</div>
                      <div className="text-xs text-muted-foreground">Customs</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Alerts */}
              {data.alerts && data.alerts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Recent Alerts</h4>
                  <div className="space-y-2">
                    {data.alerts.map((alert, index) => (
                      <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg ${
                        alert.type === 'critical' ? 'bg-red-50 text-red-700' :
                        alert.type === 'error' ? 'bg-red-50 text-red-700' :
                        alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-blue-50 text-blue-700'
                      }`}>
                        {getAlertIcon(alert.type)}
                        <span className="flex-1">{alert.message}</span>
                        <span className="text-xs">
                          {new Date(alert.timestamp).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Bottlenecks & Risk Factors
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-sm">Bottlenecks:</span>
                      <ul className="list-disc list-inside text-sm text-red-600 ml-2">
                        {data.analysis.bottlenecks.map((bottleneck, index) => (
                          <li key={index}>{bottleneck}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-sm">Risk Factors:</span>
                      <ul className="list-disc list-inside text-sm text-red-600 ml-2">
                        {data.analysis.riskFactors.map((risk, index) => (
                          <li key={index}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                    {data.analysis.recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Forecast */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Lead Time Forecast
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{data.forecast.nextMonthPrediction} days</div>
                    <div className="text-muted-foreground">Next Month Prediction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{data.forecast.confidenceLevel}%</div>
                    <div className="text-muted-foreground">Confidence Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {data.forecast.seasonalAdjustment > 1 ? '+' : ''}{((data.forecast.seasonalAdjustment - 1) * 100).toFixed(1)}%
                    </div>
                    <div className="text-muted-foreground">Seasonal Adjustment</div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Recent Order History</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedSupplier(expandedSupplier === data.id ? null : data.id)}
                  >
                    {expandedSupplier === data.id ? 'Hide History' : 'Show History'}
                  </Button>
                </div>
                
                {expandedSupplier === data.id && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO Number</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actual</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead Time</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.orderHistory.map((order, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium">{order.poNumber}</td>
                            <td className="px-4 py-4 text-sm">
                              {new Date(order.orderDate).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {new Date(order.expectedDelivery).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              {new Date(order.actualDelivery).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium">{order.leadTimeDays} days</td>
                            <td className="px-4 py-4">{getStatusBadge(order.status)}</td>
                            <td className="px-4 py-4 text-sm text-gray-500">{order.delayReason || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Environmental Factors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Seasonal Impact</div>
                  <div className={`font-bold ${data.analysis.seasonalImpact ? 'text-orange-600' : 'text-green-600'}`}>
                    {data.analysis.seasonalImpact ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Weather Sensitive</div>
                  <div className={`font-bold ${data.analysis.weatherSensitive ? 'text-blue-600' : 'text-green-600'}`}>
                    {data.analysis.weatherSensitive ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Improvement Trend</div>
                  <div className="flex items-center justify-center space-x-1">
                    {getTrendIcon(data.performance.improvementTrend)}
                    <span className="font-bold">{data.performance.improvementTrend}</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">Risk Level</div>
                  {getRiskBadge(data.performance.riskLevel)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Export Analysis
                  </Button>
                  <Button variant="outline" size="sm">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Start Review
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule Meeting
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{data.supplier.contact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Analytics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Lead Time Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {avgLeadTime.toFixed(1)} days
              </div>
              <div className="text-sm text-muted-foreground">Average Lead Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {avgReliability.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Reliability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {onTimeRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">On-Time Delivery Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {filteredData.filter(d => d.performance.riskLevel === 'low').length}
              </div>
              <div className="text-sm text-muted-foreground">Low Risk Suppliers</div>
            </div>
          </div>
        </Card>
      </div>
    
  );
}
