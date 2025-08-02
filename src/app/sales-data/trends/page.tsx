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
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Eye,
  Lightbulb,
  Star
} from 'lucide-react';

interface MarketTrends {
  id: string;
  period: string;
  lastUpdated: string;
  categories: CategoryTrend[];
  platforms: PlatformTrend[];
  keywords: KeywordTrend[];
  competitors: CompetitorAnalysis[];
  opportunities: MarketOpportunity[];
  insights: MarketInsight[];
  predictions: TrendPrediction[];
  seasonal: SeasonalTrend[];
}

interface CategoryTrend {
  category: string;
  currentDemand: number;
  trendDirection: 'rising' | 'falling' | 'stable' | 'volatile';
  growthRate: number;
  marketShare: number;
  searchVolume: number;
  competitionLevel: 'low' | 'medium' | 'high' | 'very-high';
  priceIndex: number;
  priceChange: number;
  topProducts: string[];
  riskLevel: 'low' | 'medium' | 'high';
  forecast: number;
}

interface PlatformTrend {
  platform: string;
  userGrowth: number;
  salesGrowth: number;
  engagement: number;
  conversionRate: number;
  avgOrderValue: number;
  marketPenetration: number;
  trend: 'rising' | 'falling' | 'stable';
  competitorCount: number;
  opportunity: string;
}

interface KeywordTrend {
  keyword: string;
  searchVolume: number;
  growthRate: number;
  difficulty: number;
  cpc: number;
  intent: 'commercial' | 'informational' | 'navigational' | 'transactional';
  relatedProducts: string[];
  trending: boolean;
}

interface CompetitorAnalysis {
  competitor: string;
  marketShare: number;
  growthRate: number;
  priceIndex: number;
  productCount: number;
  avgRating: number;
  strengths: string[];
  weaknesses: string[];
  threat: 'low' | 'medium' | 'high';
}

interface MarketOpportunity {
  type: 'product' | 'market' | 'pricing' | 'channel' | 'seasonal';
  title: string;
  description: string;
  potential: number;
  timeframe: string;
  difficulty: 'low' | 'medium' | 'high';
  requirements: string[];
  riskLevel: 'low' | 'medium' | 'high';
  priority: 'high' | 'medium' | 'low';
}

interface MarketInsight {
  category: string;
  insight: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  actionRequired: boolean;
  recommendations: string[];
}

interface TrendPrediction {
  category: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number;
  factors: string[];
  recommendation: string;
}

interface SeasonalTrend {
  month: string;
  demandIndex: number;
  popularCategories: string[];
  priceFluctuation: number;
  keyEvents: string[];
}

const mockMarketTrends: MarketTrends = {
  id: '1',
  period: 'January 2025',
  lastUpdated: '2025-01-30T10:00:00Z',
  categories: [
    {
      category: 'Fashion',
      currentDemand: 85,
      trendDirection: 'rising',
      growthRate: 18.5,
      marketShare: 35.2,
      searchVolume: 125000,
      competitionLevel: 'high',
      priceIndex: 105.2,
      priceChange: 3.8,
      topProducts: ['Tas Ransel Premium', 'Kemeja Formal Katun'],
      riskLevel: 'medium',
      forecast: 142
    },
    {
      category: 'Electronics',
      currentDemand: 92,
      trendDirection: 'stable',
      growthRate: 12.3,
      marketShare: 28.7,
      searchVolume: 98000,
      competitionLevel: 'very-high',
      priceIndex: 98.5,
      priceChange: -1.2,
      topProducts: ['Smartphone Android 128GB'],
      riskLevel: 'high',
      forecast: 103
    },
    {
      category: 'Sports',
      currentDemand: 78,
      trendDirection: 'rising',
      growthRate: 22.8,
      marketShare: 18.5,
      searchVolume: 67000,
      competitionLevel: 'medium',
      priceIndex: 102.1,
      priceChange: 2.1,
      topProducts: ['Sepatu Sport Running'],
      riskLevel: 'low',
      forecast: 125
    },
    {
      category: 'Accessories',
      currentDemand: 65,
      trendDirection: 'falling',
      growthRate: -5.2,
      marketShare: 12.8,
      searchVolume: 45000,
      competitionLevel: 'low',
      priceIndex: 96.8,
      priceChange: -3.2,
      topProducts: ['Jam Tangan Digital'],
      riskLevel: 'high',
      forecast: 58
    },
    {
      category: 'Home & Living',
      currentDemand: 88,
      trendDirection: 'volatile',
      growthRate: 8.7,
      marketShare: 4.8,
      searchVolume: 38000,
      competitionLevel: 'medium',
      priceIndex: 107.5,
      priceChange: 7.5,
      topProducts: ['Furniture Modern'],
      riskLevel: 'medium',
      forecast: 95
    }
  ],
  platforms: [
    {
      platform: 'TikTok Shop',
      userGrowth: 45.2,
      salesGrowth: 38.5,
      engagement: 8.7,
      conversionRate: 4.2,
      avgOrderValue: 285000,
      marketPenetration: 65.8,
      trend: 'rising',
      competitorCount: 1250,
      opportunity: 'Live streaming commerce expansion'
    },
    {
      platform: 'Shopee',
      userGrowth: 15.8,
      salesGrowth: 12.3,
      engagement: 6.5,
      conversionRate: 3.8,
      avgOrderValue: 265000,
      marketPenetration: 78.2,
      trend: 'stable',
      competitorCount: 2150,
      opportunity: 'Premium segment penetration'
    },
    {
      platform: 'Tokopedia',
      userGrowth: 8.2,
      salesGrowth: 5.8,
      engagement: 5.2,
      conversionRate: 3.1,
      avgOrderValue: 295000,
      marketPenetration: 71.5,
      trend: 'falling',
      competitorCount: 1890,
      opportunity: 'B2B marketplace expansion'
    },
    {
      platform: 'Lazada',
      userGrowth: 12.5,
      salesGrowth: 18.7,
      engagement: 4.8,
      conversionRate: 2.9,
      avgOrderValue: 320000,
      marketPenetration: 45.2,
      trend: 'rising',
      competitorCount: 980,
      opportunity: 'Cross-border e-commerce'
    }
  ],
  keywords: [
    {
      keyword: 'tas ransel premium',
      searchVolume: 25000,
      growthRate: 35.8,
      difficulty: 65,
      cpc: 1250,
      intent: 'commercial',
      relatedProducts: ['Tas Ransel Premium', 'Tas Laptop'],
      trending: true
    },
    {
      keyword: 'smartphone murah',
      searchVolume: 45000,
      growthRate: 18.2,
      difficulty: 85,
      cpc: 2150,
      intent: 'commercial',
      relatedProducts: ['Smartphone Android 128GB'],
      trending: true
    },
    {
      keyword: 'sepatu olahraga',
      searchVolume: 35000,
      growthRate: 28.5,
      difficulty: 55,
      cpc: 980,
      intent: 'commercial',
      relatedProducts: ['Sepatu Sport Running'],
      trending: true
    },
    {
      keyword: 'jam tangan digital',
      searchVolume: 18000,
      growthRate: -8.5,
      difficulty: 45,
      cpc: 750,
      intent: 'commercial',
      relatedProducts: ['Jam Tangan Digital'],
      trending: false
    }
  ],
  competitors: [
    {
      competitor: 'CompetitorA',
      marketShare: 28.5,
      growthRate: 15.8,
      priceIndex: 102.5,
      productCount: 1250,
      avgRating: 4.2,
      strengths: ['Strong brand', 'Wide distribution'],
      weaknesses: ['High prices', 'Limited innovation'],
      threat: 'high'
    },
    {
      competitor: 'CompetitorB',
      marketShare: 18.2,
      growthRate: 22.3,
      priceIndex: 95.8,
      productCount: 850,
      avgRating: 4.5,
      strengths: ['Competitive pricing', 'Fast delivery'],
      weaknesses: ['Limited product range'],
      threat: 'medium'
    },
    {
      competitor: 'CompetitorC',
      marketShare: 12.8,
      growthRate: 8.5,
      priceIndex: 110.2,
      productCount: 2100,
      avgRating: 3.9,
      strengths: ['Product variety', 'Premium quality'],
      weaknesses: ['Poor customer service'],
      threat: 'low'
    }
  ],
  opportunities: [
    {
      type: 'product',
      title: 'Sustainable Fashion Line',
      description: 'Growing demand for eco-friendly fashion products',
      potential: 85,
      timeframe: '3-6 months',
      difficulty: 'medium',
      requirements: ['Supplier partnerships', 'Certification'],
      riskLevel: 'medium',
      priority: 'high'
    },
    {
      type: 'market',
      title: 'B2B Sports Equipment',
      description: 'Untapped B2B market for sports equipment',
      potential: 65,
      timeframe: '6-12 months',
      difficulty: 'high',
      requirements: ['Sales team', 'B2B platform'],
      riskLevel: 'medium',
      priority: 'medium'
    },
    {
      type: 'channel',
      title: 'Live Commerce',
      description: 'Expanding live streaming sales on TikTok',
      potential: 92,
      timeframe: '1-3 months',
      difficulty: 'low',
      requirements: ['Content creators', 'Live setup'],
      riskLevel: 'low',
      priority: 'high'
    },
    {
      type: 'pricing',
      title: 'Dynamic Pricing Strategy',
      description: 'AI-powered dynamic pricing optimization',
      potential: 45,
      timeframe: '6-9 months',
      difficulty: 'high',
      requirements: ['AI technology', 'Data integration'],
      riskLevel: 'high',
      priority: 'low'
    }
  ],
  insights: [
    {
      category: 'Fashion',
      insight: 'Premium bags showing 35% growth in search volume',
      impact: 'positive',
      confidence: 92,
      actionRequired: true,
      recommendations: ['Increase inventory', 'Expand premium line']
    },
    {
      category: 'Electronics',
      insight: 'Smartphone market reaching saturation point',
      impact: 'negative',
      confidence: 85,
      actionRequired: true,
      recommendations: ['Focus on accessories', 'Explore emerging tech']
    },
    {
      category: 'Sports',
      insight: 'Running equipment demand surging post-pandemic',
      impact: 'positive',
      confidence: 88,
      actionRequired: true,
      recommendations: ['Expand sports category', 'Partner with fitness influencers']
    }
  ],
  predictions: [
    {
      category: 'Fashion',
      currentValue: 35.2,
      predictedValue: 42.8,
      timeframe: '3 months',
      confidence: 87,
      factors: ['Seasonal trends', 'Social media influence'],
      recommendation: 'Increase inventory by 25%'
    },
    {
      category: 'Electronics',
      currentValue: 28.7,
      predictedValue: 25.5,
      timeframe: '6 months',
      confidence: 78,
      factors: ['Market saturation', 'Economic factors'],
      recommendation: 'Diversify product range'
    },
    {
      category: 'Sports',
      currentValue: 18.5,
      predictedValue: 24.2,
      timeframe: '4 months',
      confidence: 92,
      factors: ['Health awareness', 'Olympic influence'],
      recommendation: 'Expand sports equipment portfolio'
    }
  ],
  seasonal: [
    {
      month: 'February',
      demandIndex: 95,
      popularCategories: ['Fashion', 'Gifts'],
      priceFluctuation: 2.5,
      keyEvents: ['Valentine\'s Day', 'Chinese New Year']
    },
    {
      month: 'March',
      demandIndex: 115,
      popularCategories: ['Fashion', 'Sports'],
      priceFluctuation: 5.8,
      keyEvents: ['Spring season', 'School reopening']
    },
    {
      month: 'April',
      demandIndex: 125,
      popularCategories: ['Fashion', 'Sports', 'Electronics'],
      priceFluctuation: 8.2,
      keyEvents: ['Ramadan preparation', 'Summer preparation']
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
    case 'rising':
      return <Badge className="bg-green-100 text-green-800">Rising</Badge>;
    case 'falling':
      return <Badge className="bg-red-100 text-red-800">Falling</Badge>;
    case 'stable':
      return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>;
    case 'volatile':
      return <Badge className="bg-yellow-100 text-yellow-800">Volatile</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getCompetitionBadge = (level: string) => {
  switch (level) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case 'high':
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case 'very-high':
      return <Badge className="bg-red-100 text-red-800">Very High</Badge>;
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

const getImpactIcon = (impact: string) => {
  switch (impact) {
    case 'positive':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'negative':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'neutral':
      return <Minus className="h-4 w-4 text-gray-600" />;
    default:
      return null;
  }
};

const getThreatBadge = (threat: string) => {
  switch (threat) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low Threat</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Threat</Badge>;
    case 'high':
      return <Badge className="bg-red-100 text-red-800">High Threat</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
    />
  ));
};

export default function MarketTrendsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrend, setSelectedTrend] = useState('all');

  const trends = mockMarketTrends;

  const filteredCategories = trends.categories.filter(category => {
    const matchesSearch = category.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTrend = selectedTrend === 'all' || category.trendDirection === selectedTrend;
    return matchesSearch && matchesTrend;
  });

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Market Trends Analysis</h1>
            <p className="text-muted-foreground">
              Analisis tren pasar, kompetitor, dan peluang bisnis berdasarkan data real-time
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Trend Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Globe className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold">Market Overview</h3>
                <p className="text-sm text-muted-foreground">
                  Period: {trends.period} • Last Updated: {new Date(trends.lastUpdated).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground">Categories Tracked</div>
                <div className="font-bold text-blue-600">{trends.categories.length}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Competitors</div>
                <div className="font-bold text-purple-600">{trends.competitors.length}</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Opportunities</div>
                <div className="font-bold text-green-600">{trends.opportunities.length}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Category Trends */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Category Trends</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedTrend}
                  onChange={(e) => setSelectedTrend(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Tren</option>
                  <option value="rising">Rising</option>
                  <option value="falling">Falling</option>
                  <option value="stable">Stable</option>
                  <option value="volatile">Volatile</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Category</th>
                    <th className="text-center p-4">Demand</th>
                    <th className="text-center p-4">Trend</th>
                    <th className="text-center p-4">Growth</th>
                    <th className="text-center p-4">Competition</th>
                    <th className="text-center p-4">Price Index</th>
                    <th className="text-center p-4">Risk</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{category.category}</div>
                          <div className="text-sm text-muted-foreground">
                            Market Share: {formatPercentage(category.marketShare)}
                          </div>
                          <div className="text-sm text-blue-600">
                            {formatNumber(category.searchVolume)} searches/month
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Activity className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">{category.currentDemand}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${category.currentDemand}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getTrendBadge(category.trendDirection)}
                      </td>
                      <td className="p-4 text-center">
                        <div className={`flex items-center justify-center ${getGrowthColor(category.growthRate)}`}>
                          {getGrowthIcon(category.growthRate)}
                          <span className="ml-1 font-medium">{formatPercentage(category.growthRate)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getCompetitionBadge(category.competitionLevel)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">{category.priceIndex.toFixed(1)}</div>
                        <div className={`text-sm ${getGrowthColor(category.priceChange)}`}>
                          {getGrowthIcon(category.priceChange)}
                          <span className="ml-1">{formatPercentage(category.priceChange)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getRiskBadge(category.riskLevel)}
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

        {/* Platform Performance & Market Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Trends</h3>
            <div className="space-y-4">
              {trends.platforms.map((platform, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{platform.platform}</span>
                    {getTrendBadge(platform.trend)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground">User Growth</div>
                      <div className={`font-medium ${getGrowthColor(platform.userGrowth)}`}>
                        {formatPercentage(platform.userGrowth)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Sales Growth</div>
                      <div className={`font-medium ${getGrowthColor(platform.salesGrowth)}`}>
                        {formatPercentage(platform.salesGrowth)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conversion Rate</div>
                      <div className="font-medium text-blue-600">
                        {formatPercentage(platform.conversionRate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Market Penetration</div>
                      <div className="font-medium text-purple-600">
                        {formatPercentage(platform.marketPenetration)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-muted-foreground mb-1">Opportunity:</div>
                    <div className="text-green-600 font-medium">{platform.opportunity}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Market Opportunities</h3>
            <div className="space-y-3">
              {trends.opportunities.map((opportunity, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">{opportunity.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(opportunity.priority)}
                      <Target className="h-3 w-3 text-gray-600" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs mb-2">
                    <div>
                      <span className="text-muted-foreground">Potential: </span>
                      <span className="font-medium text-green-600">{opportunity.potential}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timeframe: </span>
                      <span className="font-medium">{opportunity.timeframe}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline" className="capitalize">{opportunity.type}</Badge>
                    {getRiskBadge(opportunity.riskLevel)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Market Insights & Competitor Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
            <div className="space-y-3">
              {trends.insights.map((insight, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {getImpactIcon(insight.impact)}
                    <span className="font-medium">{insight.category}</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{insight.insight}</p>
                  
                  {insight.actionRequired && (
                    <div className="text-xs">
                      <div className="text-muted-foreground mb-1">Recommendations:</div>
                      <div className="space-y-1">
                        {insight.recommendations.map((rec, recIndex) => (
                          <div key={recIndex} className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Competitor Analysis</h3>
            <div className="space-y-4">
              {trends.competitors.map((competitor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{competitor.competitor}</span>
                    <div className="flex items-center space-x-2">
                      {getThreatBadge(competitor.threat)}
                      <div className="flex items-center space-x-1">
                        {getRatingStars(competitor.avgRating)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground">Market Share</div>
                      <div className="font-medium text-purple-600">
                        {formatPercentage(competitor.marketShare)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Growth Rate</div>
                      <div className={`font-medium ${getGrowthColor(competitor.growthRate)}`}>
                        {formatPercentage(competitor.growthRate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Price Index</div>
                      <div className="font-medium">{competitor.priceIndex.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Products</div>
                      <div className="font-medium">{formatNumber(competitor.productCount)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-green-600 font-medium mb-1">Strengths:</div>
                      {competitor.strengths.slice(0, 2).map((strength, sIndex) => (
                        <div key={sIndex} className="text-green-600">• {strength}</div>
                      ))}
                    </div>
                    <div>
                      <div className="text-red-600 font-medium mb-1">Weaknesses:</div>
                      {competitor.weaknesses.slice(0, 2).map((weakness, wIndex) => (
                        <div key={wIndex} className="text-red-600">• {weakness}</div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Trending Keywords */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Trending Keywords</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trends.keywords.map((keyword, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{keyword.keyword}</span>
                  {keyword.trending && (
                    <Zap className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volume:</span>
                    <span className="font-medium">{formatNumber(keyword.searchVolume)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growth:</span>
                    <div className={`flex items-center ${getGrowthColor(keyword.growthRate)}`}>
                      {getGrowthIcon(keyword.growthRate)}
                      <span className="ml-1">{formatPercentage(keyword.growthRate)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPC:</span>
                    <span className="font-medium">{formatCurrency(keyword.cpc)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span className="font-medium">{keyword.difficulty}/100</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="capitalize text-xs mt-2">
                  {keyword.intent}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    
  );
}
