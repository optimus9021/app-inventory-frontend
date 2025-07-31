'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Eye,
  Settings,
  Brain,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Calculator
} from 'lucide-react';

interface SalesForecasting {
  id: string;
  forecastPeriod: string;
  generatedDate: string;
  methodology: 'statistical' | 'machine-learning' | 'hybrid' | 'manual';
  accuracy: number;
  confidence: number;
  scenarios: ForecastScenario[];
  products: ProductForecast[];
  platforms: PlatformForecast[];
  trends: TrendAnalysis[];
  seasonality: SeasonalityData[];
  recommendations: ForecastRecommendation[];
}

interface ForecastScenario {
  scenario: 'conservative' | 'realistic' | 'optimistic';
  probability: number;
  totalRevenue: number;
  totalOrders: number;
  totalUnits: number;
  growth: number;
  confidence: number;
  riskFactors: string[];
  opportunities: string[];
}

interface ProductForecast {
  productCode: string;
  productName: string;
  category: string;
  currentRevenue: number;
  forecastRevenue: number;
  currentUnits: number;
  forecastUnits: number;
  growth: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable' | 'volatile';
  seasonalFactor: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface PlatformForecast {
  platform: string;
  currentRevenue: number;
  forecastRevenue: number;
  currentOrders: number;
  forecastOrders: number;
  growth: number;
  marketShare: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface TrendAnalysis {
  period: string;
  revenue: number;
  orders: number;
  trend: number;
  seasonalIndex: number;
  anomalyDetected: boolean;
}

interface SeasonalityData {
  month: string;
  index: number;
  revenue: number;
  description: string;
}

interface ForecastRecommendation {
  type: 'inventory' | 'marketing' | 'pricing' | 'capacity' | 'risk';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  timeline: string;
}

const mockSalesForecasting: SalesForecasting = {
  id: '1',
  forecastPeriod: 'February - April 2025',
  generatedDate: '2025-01-30T10:00:00Z',
  methodology: 'hybrid',
  accuracy: 87.5,
  confidence: 92.3,
  scenarios: [
    {
      scenario: 'conservative',
      probability: 25,
      totalRevenue: 2150000000,
      totalOrders: 7650,
      totalUnits: 13500,
      growth: 5.2,
      confidence: 95.8,
      riskFactors: ['Economic uncertainty', 'Supply chain disruption'],
      opportunities: ['Cost optimization', 'Market consolidation']
    },
    {
      scenario: 'realistic',
      probability: 50,
      totalRevenue: 2650000000,
      totalOrders: 9450,
      totalUnits: 16700,
      growth: 12.8,
      confidence: 92.3,
      riskFactors: ['Competition increase', 'Platform policy changes'],
      opportunities: ['New product launch', 'Market expansion']
    },
    {
      scenario: 'optimistic',
      probability: 25,
      totalRevenue: 3200000000,
      totalOrders: 11400,
      totalUnits: 20100,
      growth: 22.5,
      confidence: 78.5,
      riskFactors: ['Resource constraints', 'Quality control'],
      opportunities: ['Viral marketing', 'Partnership expansion']
    }
  ],
  products: [
    {
      productCode: 'TAS-001',
      productName: 'Tas Ransel Premium',
      category: 'Fashion',
      currentRevenue: 145000000,
      forecastRevenue: 168000000,
      currentUnits: 725,
      forecastUnits: 840,
      growth: 15.9,
      confidence: 88.2,
      trend: 'increasing',
      seasonalFactor: 1.2,
      riskLevel: 'low'
    },
    {
      productCode: 'ELK-001',
      productName: 'Smartphone Android 128GB',
      category: 'Elektronik',
      currentRevenue: 135000000,
      forecastRevenue: 142000000,
      currentUnits: 450,
      forecastUnits: 473,
      growth: 5.2,
      confidence: 75.8,
      trend: 'stable',
      seasonalFactor: 0.9,
      riskLevel: 'medium'
    },
    {
      productCode: 'SEP-002',
      productName: 'Sepatu Sport Running',
      category: 'Olahraga',
      currentRevenue: 98000000,
      forecastRevenue: 125000000,
      currentUnits: 490,
      forecastUnits: 625,
      growth: 27.6,
      confidence: 91.5,
      trend: 'increasing',
      seasonalFactor: 1.4,
      riskLevel: 'low'
    },
    {
      productCode: 'JAM-001',
      productName: 'Jam Tangan Digital',
      category: 'Aksesoris',
      currentRevenue: 87500000,
      forecastRevenue: 78000000,
      currentUnits: 350,
      forecastUnits: 312,
      growth: -10.9,
      confidence: 82.1,
      trend: 'decreasing',
      seasonalFactor: 0.8,
      riskLevel: 'high'
    },
    {
      productCode: 'KMJ-001',
      productName: 'Kemeja Formal Katun',
      category: 'Fashion',
      currentRevenue: 76000000,
      forecastRevenue: 89000000,
      currentUnits: 380,
      forecastUnits: 445,
      growth: 17.1,
      confidence: 86.7,
      trend: 'increasing',
      seasonalFactor: 1.1,
      riskLevel: 'low'
    }
  ],
  platforms: [
    {
      platform: 'TikTok Shop',
      currentRevenue: 980000000,
      forecastRevenue: 1150000000,
      currentOrders: 3500,
      forecastOrders: 4100,
      growth: 17.3,
      marketShare: 42.5,
      confidence: 89.4,
      trend: 'increasing'
    },
    {
      platform: 'Shopee',
      currentRevenue: 857500000,
      forecastRevenue: 950000000,
      currentOrders: 3060,
      forecastOrders: 3380,
      growth: 10.8,
      marketShare: 35.1,
      confidence: 91.2,
      trend: 'stable'
    },
    {
      platform: 'Tokopedia',
      currentRevenue: 612500000,
      forecastRevenue: 585000000,
      currentOrders: 2190,
      forecastOrders: 2090,
      growth: -4.5,
      marketShare: 21.6,
      confidence: 76.8,
      trend: 'decreasing'
    }
  ],
  trends: [
    {
      period: '2025-02',
      revenue: 2250000000,
      orders: 8050,
      trend: 8.5,
      seasonalIndex: 0.95,
      anomalyDetected: false
    },
    {
      period: '2025-03',
      revenue: 2750000000,
      orders: 9800,
      trend: 15.2,
      seasonalIndex: 1.15,
      anomalyDetected: false
    },
    {
      period: '2025-04',
      revenue: 2850000000,
      orders: 10150,
      trend: 18.8,
      seasonalIndex: 1.25,
      anomalyDetected: true
    }
  ],
  seasonality: [
    { month: 'Jan', index: 0.85, revenue: 2100000000, description: 'Post-holiday slowdown' },
    { month: 'Feb', index: 0.95, revenue: 2350000000, description: 'Valentine promotion' },
    { month: 'Mar', index: 1.15, revenue: 2840000000, description: 'Spring collection launch' },
    { month: 'Apr', index: 1.25, revenue: 3090000000, description: 'Ramadan preparation' },
    { month: 'May', index: 1.35, revenue: 3340000000, description: 'Eid celebration' },
    { month: 'Jun', index: 1.10, revenue: 2720000000, description: 'Mid-year sale' }
  ],
  recommendations: [
    {
      type: 'inventory',
      priority: 'high',
      title: 'Increase Tas Ransel Premium Stock',
      description: 'Forecasted 15.9% growth requires 25% inventory increase to avoid stockouts',
      impact: 'Prevent 23M IDR potential lost sales',
      timeline: 'Next 2 weeks'
    },
    {
      type: 'marketing',
      priority: 'high',
      title: 'Boost TikTok Shop Campaign',
      description: 'Platform showing strongest growth potential with 17.3% forecast increase',
      impact: 'Capture additional 170M IDR revenue',
      timeline: 'Next 4 weeks'
    },
    {
      type: 'pricing',
      priority: 'medium',
      title: 'Review Jam Tangan Digital Pricing',
      description: 'Declining trend (-10.9%) suggests price optimization needed',
      impact: 'Improve product competitiveness',
      timeline: 'Next 6 weeks'
    },
    {
      type: 'capacity',
      priority: 'medium',
      title: 'Prepare for April Peak',
      description: 'Seasonal index 1.25 indicates 25% above average demand expected',
      impact: 'Ensure service quality during peak',
      timeline: 'Next 8 weeks'
    },
    {
      type: 'risk',
      priority: 'low',
      title: 'Monitor Tokopedia Performance',
      description: 'Platform showing decline (-4.5%) requires attention',
      impact: 'Prevent further market share loss',
      timeline: 'Ongoing monitoring'
    }
  ]
};

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

const formatPercentage = (num: number) => {
  return `${num.toFixed(1)}%`;
};

const getGrowthIcon = (growth: number) => {
  if (growth > 0) return <ArrowUpRight className="h-3 w-3 text-green-600" />;
  if (growth < 0) return <ArrowDownRight className="h-3 w-3 text-red-600" />;
  return <Minus className="h-3 w-3 text-gray-600" />;
};

const getGrowthColor = (growth: number) => {
  if (growth > 0) return 'text-green-600';
  if (growth < 0) return 'text-red-600';
  return 'text-gray-600';
};

const getTrendBadge = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <Badge className="bg-green-100 text-green-800">Increasing</Badge>;
    case 'decreasing':
      return <Badge className="bg-red-100 text-red-800">Decreasing</Badge>;
    case 'stable':
      return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>;
    case 'volatile':
      return <Badge className="bg-yellow-100 text-yellow-800">Volatile</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
    case 'high':
      return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-100 text-red-800">High</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'inventory':
      return <Activity className="h-4 w-4 text-blue-600" />;
    case 'marketing':
      return <Zap className="h-4 w-4 text-purple-600" />;
    case 'pricing':
      return <Calculator className="h-4 w-4 text-green-600" />;
    case 'capacity':
      return <Target className="h-4 w-4 text-orange-600" />;
    case 'risk':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <CheckCircle className="h-4 w-4 text-gray-600" />;
  }
};

export default function SalesForecastingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('realistic');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const forecasting = mockSalesForecasting;

  const filteredProducts = forecasting.products.filter(product => {
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedScenarioData = forecasting.scenarios.find(s => s.scenario === selectedScenario);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Forecasting</h1>
            <p className="text-muted-foreground">
              Prediksi dan analisis proyeksi penjualan berdasarkan data historis dan tren pasar
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Model Settings
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Forecast
            </Button>
          </div>
        </div>

        {/* Forecast Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Brain className="h-6 w-6 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold">Forecast Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Period: {forecasting.forecastPeriod} • Generated: {new Date(forecasting.generatedDate).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground">Methodology</div>
                <Badge className="bg-purple-100 text-purple-800 capitalize">
                  {forecasting.methodology.replace('-', ' ')}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Accuracy</div>
                <div className="font-bold text-green-600">{formatPercentage(forecasting.accuracy)}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Confidence</div>
                <div className="font-bold text-blue-600">{formatPercentage(forecasting.confidence)}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Scenario Analysis */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Scenario Analysis</h3>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {forecasting.scenarios.map((scenario) => (
                <option key={scenario.scenario} value={scenario.scenario}>
                  {scenario.scenario.charAt(0).toUpperCase() + scenario.scenario.slice(1)} Scenario
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {forecasting.scenarios.map((scenario) => (
              <div
                key={scenario.scenario}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedScenario === scenario.scenario 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedScenario(scenario.scenario)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{scenario.scenario}</span>
                  <Badge className="bg-gray-100 text-gray-800">
                    {formatPercentage(scenario.probability)}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(scenario.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth:</span>
                    <div className={`flex items-center ${getGrowthColor(scenario.growth)}`}>
                      {getGrowthIcon(scenario.growth)}
                      <span className="ml-1">{formatPercentage(scenario.growth)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className="font-medium text-blue-600">
                      {formatPercentage(scenario.confidence)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedScenarioData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-red-600">Risk Factors</h4>
                <div className="space-y-2">
                  {selectedScenarioData.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-green-600">Opportunities</h4>
                <div className="space-y-2">
                  {selectedScenarioData.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Product Forecasts */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Product Forecasts</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari produk..."
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
                  <option value="Fashion">Fashion</option>
                  <option value="Elektronik">Elektronik</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Aksesoris">Aksesoris</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4">Current</th>
                    <th className="text-center p-4">Forecast</th>
                    <th className="text-center p-4">Growth</th>
                    <th className="text-center p-4">Confidence</th>
                    <th className="text-center p-4">Trend</th>
                    <th className="text-center p-4">Risk</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.productCode} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{product.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.productCode} • {product.category}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-blue-600">
                            {formatCurrency(product.currentRevenue)}
                          </div>
                          <div className="text-muted-foreground">
                            {formatNumber(product.currentUnits)} units
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="text-sm">
                          <div className="font-medium text-green-600">
                            {formatCurrency(product.forecastRevenue)}
                          </div>
                          <div className="text-muted-foreground">
                            {formatNumber(product.forecastUnits)} units
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`flex items-center justify-center ${getGrowthColor(product.growth)}`}>
                          {getGrowthIcon(product.growth)}
                          <span className="ml-1 font-medium">{formatPercentage(product.growth)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-medium text-blue-600">
                          {formatPercentage(product.confidence)}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {getTrendBadge(product.trend)}
                      </td>
                      <td className="p-4 text-center">
                        {getRiskBadge(product.riskLevel)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
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

        {/* Platform Forecasts & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Forecasts</h3>
            <div className="space-y-4">
              {forecasting.platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{platform.platform}</span>
                      {getTrendBadge(platform.trend)}
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Current Revenue</div>
                        <div className="font-medium text-blue-600">
                          {formatCurrency(platform.currentRevenue)}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Forecast Revenue</div>
                        <div className="font-medium text-green-600">
                          {formatCurrency(platform.forecastRevenue)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>Market Share: {formatPercentage(platform.marketShare)}</span>
                      <div className={`flex items-center ${getGrowthColor(platform.growth)}`}>
                        {getGrowthIcon(platform.growth)}
                        <span className="ml-1">{formatPercentage(platform.growth)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Action Recommendations</h3>
            <div className="space-y-3">
              {forecasting.recommendations.map((rec, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getRecommendationIcon(rec.type)}
                      <span className="font-medium">{rec.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(rec.priority)}
                      <Clock className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600 font-medium">{rec.impact}</span>
                    <span className="text-gray-600">{rec.timeline}</span>
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
