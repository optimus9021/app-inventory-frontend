'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Download,
  Package,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  BarChart3,
  Eye,
  RefreshCw,
  Trash2,
  Archive,
  Tag,
  Building,
  Activity,
  ArrowDown,
  ArrowUp,
  Minus,
  Target,
  ShoppingCart,
  Zap
} from 'lucide-react';

interface DeadStock {
  id: string;
  item: {
    name: string;
    sku: string;
    category: string;
    brand: string;
  };
  supplier: {
    name: string;
    contact: string;
  };
  purchaseOrder: {
    poNumber: string;
    orderDate: string;
    originalQuantity: number;
    unitCost: number;
  };
  inventory: {
    currentQuantity: number;
    lastMovementDate: string;
    daysSinceLastMovement: number;
    locationStored: string;
    storageCondition: 'excellent' | 'good' | 'fair' | 'poor';
  };
  financial: {
    totalInvestment: number;
    currentValue: number;
    depreciation: number;
    depreciationRate: number;
    carryingCost: number;
    monthlyCarryingCost: number;
  };
  analysis: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    deadstockCategory: 'slow-moving' | 'non-moving' | 'obsolete' | 'damaged' | 'expired';
    reasonCode: string;
    recommendation: string;
    actionPriority: 'low' | 'medium' | 'high' | 'urgent';
  };
  market: {
    demandTrend: 'increasing' | 'stable' | 'decreasing' | 'discontinued';
    marketPrice: number;
    competitorStock: boolean;
    seasonality: string;
  };
  disposal: {
    suggestedActions: string[];
    estimatedRecoveryValue: number;
    disposalCost: number;
    netRecovery: number;
  };
  aging: {
    ageInDays: number;
    ageCategory: '0-30' | '31-60' | '61-90' | '91-180' | '181-365' | '365+';
  };
  notes?: string;
  alerts?: Alert[];
}

interface Alert {
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
}

const mockDeadStock: DeadStock[] = [
  {
    id: '1',
    item: {
      name: 'Smartphone Model X 128GB',
      sku: 'SPH-MX-128',
      category: 'Electronics',
      brand: 'TechBrand'
    },
    supplier: {
      name: 'PT Electronic Supplier',
      contact: 'supply@electronic.com'
    },
    purchaseOrder: {
      poNumber: 'PO-PRD-2024-045',
      orderDate: '2024-06-15T00:00:00Z',
      originalQuantity: 200,
      unitCost: 8500000
    },
    inventory: {
      currentQuantity: 45,
      lastMovementDate: '2024-10-20T00:00:00Z',
      daysSinceLastMovement: 115,
      locationStored: 'Warehouse B-3',
      storageCondition: 'good'
    },
    financial: {
      totalInvestment: 382500000,
      currentValue: 287000000,
      depreciation: 95500000,
      depreciationRate: 25,
      carryingCost: 15300000,
      monthlyCarryingCost: 3825000
    },
    analysis: {
      riskLevel: 'high',
      deadstockCategory: 'obsolete',
      reasonCode: 'New model launched, demand dropped significantly',
      recommendation: 'Liquidate through discount sale or return to supplier',
      actionPriority: 'high'
    },
    market: {
      demandTrend: 'decreasing',
      marketPrice: 6000000,
      competitorStock: false,
      seasonality: 'Year-round'
    },
    disposal: {
      suggestedActions: ['Discount sale (30-40%)', 'Return to supplier', 'Liquidation company'],
      estimatedRecoveryValue: 225000000,
      disposalCost: 5000000,
      netRecovery: 220000000
    },
    aging: {
      ageInDays: 260,
      ageCategory: '181-365'
    },
    alerts: [
      {
        type: 'critical',
        message: 'High depreciation rate - immediate action required',
        timestamp: '2025-02-15T09:00:00Z'
      },
      {
        type: 'warning',
        message: 'Carrying cost exceeding 10% of inventory value monthly',
        timestamp: '2025-02-10T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    item: {
      name: 'Winter Jacket Premium XL',
      sku: 'WJP-XL-001',
      category: 'Apparel',
      brand: 'FashionWear'
    },
    supplier: {
      name: 'CV Fashion Distributor',
      contact: 'order@fashiondist.com'
    },
    purchaseOrder: {
      poNumber: 'PO-PRD-2024-078',
      orderDate: '2024-08-30T00:00:00Z',
      originalQuantity: 150,
      unitCost: 750000
    },
    inventory: {
      currentQuantity: 89,
      lastMovementDate: '2024-12-15T00:00:00Z',
      daysSinceLastMovement: 65,
      locationStored: 'Warehouse A-2',
      storageCondition: 'excellent'
    },
    financial: {
      totalInvestment: 66750000,
      currentValue: 53400000,
      depreciation: 13350000,
      depreciationRate: 20,
      carryingCost: 8010000,
      monthlyCarryingCost: 1335000
    },
    analysis: {
      riskLevel: 'medium',
      deadstockCategory: 'slow-moving',
      reasonCode: 'Seasonal item, demand decreased after winter season',
      recommendation: 'Hold until next winter season or promote in cold regions',
      actionPriority: 'medium'
    },
    market: {
      demandTrend: 'stable',
      marketPrice: 600000,
      competitorStock: true,
      seasonality: 'Winter peak (Oct-Feb)'
    },
    disposal: {
      suggestedActions: ['Store for next season', 'Export to cold climate regions', 'Off-season discount'],
      estimatedRecoveryValue: 40050000,
      disposalCost: 2000000,
      netRecovery: 38050000
    },
    aging: {
      ageInDays: 170,
      ageCategory: '91-180'
    },
    alerts: [
      {
        type: 'info',
        message: 'Seasonal item - consider storage for next winter',
        timestamp: '2025-02-14T10:00:00Z'
      }
    ]
  },
  {
    id: '3',
    item: {
      name: 'Gaming Chair RGB Pro',
      sku: 'GCR-RGB-001',
      category: 'Furniture',
      brand: 'GameComfort'
    },
    supplier: {
      name: 'PT Furniture Gaming',
      contact: 'sales@furnituregaming.com'
    },
    purchaseOrder: {
      poNumber: 'PO-PRD-2024-120',
      orderDate: '2024-11-10T00:00:00Z',
      originalQuantity: 30,
      unitCost: 4500000
    },
    inventory: {
      currentQuantity: 22,
      lastMovementDate: '2025-01-05T00:00:00Z',
      daysSinceLastMovement: 45,
      locationStored: 'Warehouse C-1',
      storageCondition: 'excellent'
    },
    financial: {
      totalInvestment: 99000000,
      currentValue: 89100000,
      depreciation: 9900000,
      depreciationRate: 10,
      carryingCost: 8910000,
      monthlyCarryingCost: 2970000
    },
    analysis: {
      riskLevel: 'low',
      deadstockCategory: 'slow-moving',
      reasonCode: 'Niche market product, steady but slow sales',
      recommendation: 'Continue normal sales activities, consider gaming events promotion',
      actionPriority: 'low'
    },
    market: {
      demandTrend: 'stable',
      marketPrice: 4050000,
      competitorStock: true,
      seasonality: 'Gaming season peaks'
    },
    disposal: {
      suggestedActions: ['Gaming event promotions', 'Online gaming community marketing', 'Bundle with accessories'],
      estimatedRecoveryValue: 79200000,
      disposalCost: 1000000,
      netRecovery: 78200000
    },
    aging: {
      ageInDays: 100,
      ageCategory: '91-180'
    },
    alerts: [
      {
        type: 'info',
        message: 'Gaming chair market stable - monitor for gaming events',
        timestamp: '2025-02-12T11:00:00Z'
      }
    ]
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

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

const getCategoryBadge = (category: string) => {
  switch (category) {
    case 'slow-moving':
      return <Badge className="bg-blue-100 text-blue-800">Slow Moving</Badge>;
    case 'non-moving':
      return <Badge className="bg-gray-100 text-gray-800">Non Moving</Badge>;
    case 'obsolete':
      return <Badge className="bg-red-100 text-red-800">Obsolete</Badge>;
    case 'damaged':
      return <Badge className="bg-orange-100 text-orange-800">Damaged</Badge>;
    case 'expired':
      return <Badge className="bg-purple-100 text-purple-800">Expired</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
    case 'high':
      return <Badge className="bg-orange-100 text-orange-800">High Priority</Badge>;
    case 'urgent':
      return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getConditionBadge = (condition: string) => {
  switch (condition) {
    case 'excellent':
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    case 'good':
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    case 'fair':
      return <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>;
    case 'poor':
      return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <ArrowUp className="h-4 w-4 text-green-600" />;
    case 'stable':
      return <Minus className="h-4 w-4 text-blue-600" />;
    case 'decreasing':
      return <ArrowDown className="h-4 w-4 text-red-600" />;
    case 'discontinued':
      return <TrendingDown className="h-4 w-4 text-gray-600" />;
    default:
      return <Minus className="h-4 w-4 text-gray-600" />;
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

export default function DeadStockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  const filteredItems = mockDeadStock.filter(item => {
    const matchesSearch = 
      item.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || item.analysis.riskLevel === selectedRisk;
    const matchesCategory = selectedCategory === 'all' || item.analysis.deadstockCategory === selectedCategory;
    const matchesAge = selectedAge === 'all' || item.aging.ageCategory === selectedAge;
    return matchesSearch && matchesRisk && matchesCategory && matchesAge;
  });

  const totalItems = filteredItems.length;
  const totalInvestment = filteredItems.reduce((sum, item) => sum + item.financial.totalInvestment, 0);
  const totalCurrentValue = filteredItems.reduce((sum, item) => sum + item.financial.currentValue, 0);
  const totalDepreciation = filteredItems.reduce((sum, item) => sum + item.financial.depreciation, 0);
  const totalCarryingCost = filteredItems.reduce((sum, item) => sum + item.financial.carryingCost, 0);
  const avgDepreciationRate = filteredItems.reduce((sum, item) => sum + item.financial.depreciationRate, 0) / filteredItems.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dead Stock Management</h1>
            <p className="text-muted-foreground">
              Analisis dan management inventory yang tidak bergerak atau slow-moving
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Detailed Analytics
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dead Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(totalItems)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investment</p>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Depreciation</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(totalDepreciation)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carrying Cost</p>
                <p className="text-xl font-bold text-purple-600">{formatCurrency(totalCarryingCost)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {((totalCurrentValue / totalInvestment) * 100).toFixed(1)}%
                </p>
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
                    placeholder="Cari nama item, SKU, atau brand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
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
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Category</option>
                  <option value="slow-moving">Slow Moving</option>
                  <option value="non-moving">Non Moving</option>
                  <option value="obsolete">Obsolete</option>
                  <option value="damaged">Damaged</option>
                  <option value="expired">Expired</option>
                </select>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Age Range</option>
                  <option value="0-30">0-30 days</option>
                  <option value="31-60">31-60 days</option>
                  <option value="61-90">61-90 days</option>
                  <option value="91-180">91-180 days</option>
                  <option value="181-365">181-365 days</option>
                  <option value="365+">365+ days</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Dead Stock List */}
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-xl">{item.item.name}</span>
                      {getRiskBadge(item.analysis.riskLevel)}
                      {getCategoryBadge(item.analysis.deadstockCategory)}
                      {getPriorityBadge(item.analysis.actionPriority)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      SKU: {item.item.sku} • Brand: {item.item.brand} • 
                      Category: {item.item.category} • Age: {item.aging.ageInDays} days
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-red-600">
                    -{formatCurrency(item.financial.depreciation)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.financial.depreciationRate}% depreciation
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(item.inventory.currentQuantity)}</div>
                  <div className="text-sm text-muted-foreground">Current Stock</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{item.inventory.daysSinceLastMovement}</div>
                  <div className="text-sm text-muted-foreground">Days Since Movement</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(item.financial.currentValue)}</div>
                  <div className="text-sm text-muted-foreground">Current Value</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(item.disposal.netRecovery)}</div>
                  <div className="text-sm text-muted-foreground">Est. Recovery</div>
                </div>
              </div>

              {/* Financial Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Financial Impact
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Original Investment:</span>
                      <span className="font-medium">{formatCurrency(item.financial.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Value:</span>
                      <span className="font-medium text-green-600">{formatCurrency(item.financial.currentValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Depreciation:</span>
                      <span className="font-medium text-red-600">-{formatCurrency(item.financial.depreciation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Carrying Cost:</span>
                      <span className="font-medium text-orange-600">{formatCurrency(item.financial.monthlyCarryingCost)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Market Analysis
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Demand Trend:</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(item.market.demandTrend)}
                        <span className="font-medium">{item.market.demandTrend}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Price:</span>
                      <span className="font-medium">{formatCurrency(item.market.marketPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Competitor Stock:</span>
                      <span className={`font-medium ${item.market.competitorStock ? 'text-red-600' : 'text-green-600'}`}>
                        {item.market.competitorStock ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seasonality:</span>
                      <span className="font-medium">{item.market.seasonality}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Inventory Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Storage Location:</span>
                      <span className="font-medium">{item.inventory.locationStored}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Condition:</span>
                      {getConditionBadge(item.inventory.storageCondition)}
                    </div>
                    <div className="flex justify-between">
                      <span>Last Movement:</span>
                      <span className="font-medium">
                        {new Date(item.inventory.lastMovementDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Age Category:</span>
                      <Badge className="text-xs">{item.aging.ageCategory}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Analysis & Recommendation
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Reason:</span>
                      <p className="text-gray-600 mt-1">{item.analysis.reasonCode}</p>
                    </div>
                    <div>
                      <span className="font-medium">Recommendation:</span>
                      <p className="text-blue-600 mt-1">{item.analysis.recommendation}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {item.alerts && item.alerts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Critical Alerts</h4>
                  <div className="space-y-2">
                    {item.alerts.map((alert, index) => (
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

              {/* Suggested Actions */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Suggested Disposal Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {item.disposal.suggestedActions.map((action, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-medium">{action}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-emerald-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Recovery Value:</span>
                    <span className="font-bold text-emerald-600">
                      {formatCurrency(item.disposal.estimatedRecoveryValue)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Disposal Cost:</span>
                    <span className="font-medium text-red-600">
                      -{formatCurrency(item.disposal.disposalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2 mt-2">
                    <span className="font-medium">Net Recovery:</span>
                    <span className="font-bold text-emerald-700">
                      {formatCurrency(item.disposal.netRecovery)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Order Details */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Original Purchase Order</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">PO Number:</span>
                    <div>{item.purchaseOrder.poNumber}</div>
                  </div>
                  <div>
                    <span className="font-medium">Order Date:</span>
                    <div>{new Date(item.purchaseOrder.orderDate).toLocaleDateString('id-ID')}</div>
                  </div>
                  <div>
                    <span className="font-medium">Original Quantity:</span>
                    <div>{formatNumber(item.purchaseOrder.originalQuantity)}</div>
                  </div>
                  <div>
                    <span className="font-medium">Unit Cost:</span>
                    <div>{formatCurrency(item.purchaseOrder.unitCost)}</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {item.notes && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Additional Notes</h4>
                  <p className="text-sm text-blue-700">{item.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tag className="h-4 w-4 mr-1" />
                    Mark for Sale
                  </Button>
                  <Button variant="outline" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Create Promo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-1" />
                    Archive Item
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Dispose
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{item.supplier.contact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Analytics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Dead Stock Impact Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {formatCurrency(totalDepreciation)}
              </div>
              <div className="text-sm text-muted-foreground">Total Depreciation Loss</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {formatCurrency(totalCarryingCost)}
              </div>
              <div className="text-sm text-muted-foreground">Annual Carrying Cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {avgDepreciationRate.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Depreciation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {((totalCurrentValue / totalInvestment) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Recovery Potential</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
