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
  Users,
  Heart,
  Star,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  UserCheck,
  UserX
} from 'lucide-react';

interface CustomerAnalysis {
  id: string;
  period: string;
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  churnedCustomers: number;
  customerGrowth: number;
  retentionRate: number;
  churnRate: number;
  segments: CustomerSegment[];
  demographics: CustomerDemographics;
  behavior: CustomerBehavior;
  lifecycle: CustomerLifecycle[];
  geography: CustomerGeography[];
  loyalty: LoyaltyAnalysis;
}

interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
  revenue: number;
  avgOrderValue: number;
  frequency: number;
  retention: number;
  description: string;
  growth: number;
  characteristics: string[];
}

interface CustomerDemographics {
  ageGroups: AgeGroup[];
  genders: GenderDistribution[];
  locations: LocationDistribution[];
  incomeRanges: IncomeRange[];
}

interface AgeGroup {
  range: string;
  count: number;
  percentage: number;
  revenue: number;
  avgOrderValue: number;
}

interface GenderDistribution {
  gender: string;
  count: number;
  percentage: number;
  revenue: number;
  preferences: string[];
}

interface LocationDistribution {
  region: string;
  count: number;
  percentage: number;
  revenue: number;
  growthRate: number;
}

interface IncomeRange {
  range: string;
  count: number;
  percentage: number;
  avgOrderValue: number;
  frequency: number;
}

interface CustomerBehavior {
  averageOrderValue: number;
  orderFrequency: number;
  sessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  cartAbandonmentRate: number;
  preferredPlatforms: PlatformPreference[];
  purchasePatterns: PurchasePattern[];
  productPreferences: ProductPreference[];
}

interface PlatformPreference {
  platform: string;
  customers: number;
  percentage: number;
  revenue: number;
  satisfaction: number;
}

interface PurchasePattern {
  pattern: string;
  customers: number;
  description: string;
  avgValue: number;
}

interface ProductPreference {
  category: string;
  customers: number;
  revenue: number;
  satisfaction: number;
}

interface CustomerLifecycle {
  stage: string;
  count: number;
  percentage: number;
  avgDuration: number;
  conversionRate: number;
  revenue: number;
}

interface CustomerGeography {
  city: string;
  customers: number;
  revenue: number;
  growth: number;
  penetration: number;
}

interface LoyaltyAnalysis {
  loyalCustomers: number;
  loyaltyRate: number;
  repeatPurchaseRate: number;
  referralRate: number;
  npsScore: number;
  satisfactionScore: number;
  tiers: LoyaltyTier[];
}

interface LoyaltyTier {
  tier: string;
  customers: number;
  revenue: number;
  benefits: string[];
  retention: number;
}

const mockCustomerAnalysis: CustomerAnalysis = {
  id: '1',
  period: 'January 2025',
  totalCustomers: 18750,
  newCustomers: 2340,
  returningCustomers: 14250,
  churnedCustomers: 890,
  customerGrowth: 14.2,
  retentionRate: 75.8,
  churnRate: 4.7,
  segments: [
    {
      segment: 'High Value Customers',
      count: 1875,
      percentage: 10.0,
      revenue: 980000000,
      avgOrderValue: 520000,
      frequency: 4.2,
      retention: 92.5,
      description: 'Top 10% customers by lifetime value',
      growth: 18.5,
      characteristics: ['Premium products', 'Multiple platforms', 'Brand loyal']
    },
    {
      segment: 'Regular Customers',
      count: 9375,
      percentage: 50.0,
      revenue: 1225000000,
      avgOrderValue: 280000,
      frequency: 2.8,
      retention: 78.2,
      description: 'Steady purchase behavior',
      growth: 12.8,
      characteristics: ['Price conscious', 'Seasonal buyers', 'Platform loyal']
    },
    {
      segment: 'Occasional Buyers',
      count: 5625,
      percentage: 30.0,
      revenue: 490000000,
      avgOrderValue: 185000,
      frequency: 1.5,
      retention: 45.8,
      description: 'Infrequent purchase behavior',
      growth: 8.5,
      characteristics: ['Deal seekers', 'Single platform', 'Price sensitive']
    },
    {
      segment: 'New Customers',
      count: 1875,
      percentage: 10.0,
      revenue: 245000000,
      avgOrderValue: 165000,
      frequency: 1.2,
      retention: 25.4,
      description: 'Recently acquired customers',
      growth: 25.8,
      characteristics: ['Experimental', 'Diverse interests', 'Platform agnostic']
    }
  ],
  demographics: {
    ageGroups: [
      { range: '18-25', count: 4500, percentage: 24.0, revenue: 635000000, avgOrderValue: 225000 },
      { range: '26-35', count: 7500, percentage: 40.0, revenue: 1225000000, avgOrderValue: 285000 },
      { range: '36-45', count: 4875, percentage: 26.0, revenue: 980000000, avgOrderValue: 320000 },
      { range: '46-55', count: 1500, percentage: 8.0, revenue: 345000000, avgOrderValue: 280000 },
      { range: '55+', count: 375, percentage: 2.0, revenue: 95000000, avgOrderValue: 250000 }
    ],
    genders: [
      { 
        gender: 'Female', 
        count: 11250, 
        percentage: 60.0, 
        revenue: 1470000000,
        preferences: ['Fashion', 'Beauty', 'Home & Living']
      },
      { 
        gender: 'Male', 
        count: 7125, 
        percentage: 38.0, 
        revenue: 980000000,
        preferences: ['Electronics', 'Sports', 'Automotive']
      },
      { 
        gender: 'Other', 
        count: 375, 
        percentage: 2.0, 
        revenue: 90000000,
        preferences: ['Fashion', 'Books', 'Electronics']
      }
    ],
    locations: [
      { region: 'Jakarta', count: 5625, percentage: 30.0, revenue: 1225000000, growthRate: 15.2 },
      { region: 'Surabaya', count: 2812, percentage: 15.0, revenue: 612500000, growthRate: 12.8 },
      { region: 'Bandung', count: 2250, percentage: 12.0, revenue: 490000000, growthRate: 18.5 },
      { region: 'Medan', count: 1875, percentage: 10.0, revenue: 367500000, growthRate: 8.2 },
      { region: 'Other Cities', count: 6188, percentage: 33.0, revenue: 735000000, growthRate: 14.8 }
    ],
    incomeRanges: [
      { range: '< 5M', count: 3750, percentage: 20.0, avgOrderValue: 165000, frequency: 1.8 },
      { range: '5M - 10M', count: 7500, percentage: 40.0, avgOrderValue: 235000, frequency: 2.5 },
      { range: '10M - 20M', count: 4875, percentage: 26.0, avgOrderValue: 325000, frequency: 3.2 },
      { range: '20M - 50M', count: 2250, percentage: 12.0, avgOrderValue: 485000, frequency: 4.1 },
      { range: '> 50M', count: 375, percentage: 2.0, avgOrderValue: 850000, frequency: 5.8 }
    ]
  },
  behavior: {
    averageOrderValue: 285000,
    orderFrequency: 2.8,
    sessionDuration: 18.5,
    bounceRate: 38.2,
    conversionRate: 3.2,
    cartAbandonmentRate: 68.5,
    preferredPlatforms: [
      { platform: 'TikTok Shop', customers: 7500, percentage: 40.0, revenue: 980000000, satisfaction: 4.5 },
      { platform: 'Shopee', customers: 6562, percentage: 35.0, revenue: 857500000, satisfaction: 4.3 },
      { platform: 'Tokopedia', customers: 4688, percentage: 25.0, revenue: 612500000, satisfaction: 4.1 }
    ],
    purchasePatterns: [
      { pattern: 'Impulse Buyers', customers: 5625, description: 'Quick decision makers', avgValue: 185000 },
      { pattern: 'Research-driven', customers: 7500, description: 'Compare before buying', avgValue: 325000 },
      { pattern: 'Seasonal Shoppers', customers: 3750, description: 'Holiday and sale periods', avgValue: 245000 },
      { pattern: 'Loyal Repeat', customers: 1875, description: 'Consistent brand loyalty', avgValue: 485000 }
    ],
    productPreferences: [
      { category: 'Fashion', customers: 11250, revenue: 1225000000, satisfaction: 4.4 },
      { category: 'Electronics', customers: 8437, revenue: 980000000, satisfaction: 4.2 },
      { category: 'Sports', customers: 5625, revenue: 490000000, satisfaction: 4.3 },
      { category: 'Home & Living', customers: 4687, revenue: 367500000, satisfaction: 4.1 }
    ]
  },
  lifecycle: [
    { stage: 'Prospect', count: 5000, percentage: 26.7, avgDuration: 15, conversionRate: 12.5, revenue: 0 },
    { stage: 'First Purchase', count: 2340, percentage: 12.5, avgDuration: 7, conversionRate: 45.8, revenue: 245000000 },
    { stage: 'Active', count: 9375, percentage: 50.0, avgDuration: 180, conversionRate: 78.2, revenue: 1715000000 },
    { stage: 'At Risk', count: 1500, percentage: 8.0, avgDuration: 45, conversionRate: 25.4, revenue: 195000000 },
    { stage: 'Churned', count: 535, percentage: 2.8, avgDuration: 90, conversionRate: 5.2, revenue: 45000000 }
  ],
  geography: [
    { city: 'Jakarta', customers: 5625, revenue: 1225000000, growth: 15.2, penetration: 8.5 },
    { city: 'Surabaya', customers: 2812, revenue: 612500000, growth: 12.8, penetration: 6.2 },
    { city: 'Bandung', customers: 2250, revenue: 490000000, growth: 18.5, penetration: 7.8 },
    { city: 'Medan', customers: 1875, revenue: 367500000, growth: 8.2, penetration: 4.5 },
    { city: 'Semarang', customers: 1312, revenue: 280000000, growth: 22.1, penetration: 5.8 }
  ],
  loyalty: {
    loyalCustomers: 7125,
    loyaltyRate: 38.0,
    repeatPurchaseRate: 65.4,
    referralRate: 12.8,
    npsScore: 42,
    satisfactionScore: 4.3,
    tiers: [
      { tier: 'Bronze', customers: 12000, revenue: 1470000000, benefits: ['Basic support'], retention: 65.8 },
      { tier: 'Silver', customers: 4500, revenue: 735000000, benefits: ['Priority support', '5% discount'], retention: 78.5 },
      { tier: 'Gold', customers: 1875, revenue: 612500000, benefits: ['Premium support', '10% discount', 'Free shipping'], retention: 85.2 },
      { tier: 'Platinum', customers: 375, revenue: 367500000, benefits: ['Dedicated manager', '15% discount', 'Exclusive access'], retention: 92.8 }
    ]
  }
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

const getRetentionBadge = (retention: number) => {
  if (retention >= 80) return <Badge className="bg-green-100 text-green-800">High</Badge>;
  if (retention >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
  return <Badge className="bg-red-100 text-red-800">Low</Badge>;
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
    />
  ));
};

export default function CustomerAnalysisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const analysis = mockCustomerAnalysis;

  const filteredSegments = analysis.segments.filter(segment => {
    const matchesSearch = segment.segment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Analysis</h1>
            <p className="text-muted-foreground">
              Analisis mendalam perilaku, segmentasi, dan karakteristik pelanggan
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
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Customer Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{formatNumber(analysis.totalCustomers)}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(analysis.customerGrowth)}
              <span className={getGrowthColor(analysis.customerGrowth)}>
                {formatPercentage(analysis.customerGrowth)} growth
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatPercentage(analysis.retentionRate)}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {formatNumber(analysis.returningCustomers)} returning customers
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatPercentage(analysis.churnRate)}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {formatNumber(analysis.churnedCustomers)} churned customers
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Loyalty Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatPercentage(analysis.loyalty.loyaltyRate)}
                </p>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              NPS Score: {analysis.loyalty.npsScore}
            </div>
          </Card>
        </div>

        {/* Customer Segments */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Customer Segments</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari segment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="revenue">Revenue</option>
                  <option value="count">Customer Count</option>
                  <option value="aov">Avg Order Value</option>
                  <option value="frequency">Frequency</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSegments.map((segment, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {formatPercentage(segment.percentage)}
                      </Badge>
                      {getRetentionBadge(segment.retention)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-muted-foreground">Customers</div>
                      <div className="font-medium">{formatNumber(segment.count)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Revenue</div>
                      <div className="font-medium text-green-600">
                        {formatCurrency(segment.revenue)}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg Order Value</div>
                      <div className="font-medium">{formatCurrency(segment.avgOrderValue)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Frequency</div>
                      <div className="font-medium">{segment.frequency}x/month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className={`flex items-center ${getGrowthColor(segment.growth)}`}>
                      {getGrowthIcon(segment.growth)}
                      <span className="ml-1">{formatPercentage(segment.growth)} growth</span>
                    </div>
                    <div className="text-muted-foreground">
                      Retention: {formatPercentage(segment.retention)}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-1">Characteristics:</div>
                    <div className="flex flex-wrap gap-1">
                      {segment.characteristics.map((char, charIndex) => (
                        <Badge key={charIndex} variant="outline" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Demographics & Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Demographics</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Age Distribution</h4>
                <div className="space-y-2">
                  {analysis.demographics.ageGroups.map((age, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{age.range} years</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {formatNumber(age.count)} ({formatPercentage(age.percentage)})
                        </span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(age.avgOrderValue)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Geographic Distribution</h4>
                <div className="space-y-2">
                  {analysis.demographics.locations.slice(0, 4).map((location, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{location.region}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {formatPercentage(location.percentage)}
                        </span>
                        <div className={`flex items-center ${getGrowthColor(location.growthRate)}`}>
                          {getGrowthIcon(location.growthRate)}
                          <span className="ml-1">{formatPercentage(location.growthRate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Behavior</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Avg Order Value</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(analysis.behavior.averageOrderValue)}
                  </div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Order Frequency</div>
                  <div className="text-lg font-bold text-blue-600">
                    {analysis.behavior.orderFrequency}x/month
                  </div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-lg font-bold text-purple-600">
                    {formatPercentage(analysis.behavior.conversionRate)}
                  </div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Cart Abandonment</div>
                  <div className="text-lg font-bold text-red-600">
                    {formatPercentage(analysis.behavior.cartAbandonmentRate)}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Platform Preferences</h4>
                <div className="space-y-2">
                  {analysis.behavior.preferredPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{platform.platform}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">
                          {formatPercentage(platform.percentage)}
                        </span>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(platform.satisfaction)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer Lifecycle & Loyalty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer Lifecycle</h3>
            <div className="space-y-3">
              {analysis.lifecycle.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{stage.stage}</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {formatPercentage(stage.percentage)}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatNumber(stage.count)} customers</span>
                      <span>Conversion: {formatPercentage(stage.conversionRate)}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Loyalty Program</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">NPS Score</div>
                  <div className="text-2xl font-bold text-blue-600">{analysis.loyalty.npsScore}</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                  <div className="flex items-center justify-center space-x-1">
                    {getRatingStars(analysis.loyalty.satisfactionScore)}
                    <span className="ml-1 font-medium">{analysis.loyalty.satisfactionScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Loyalty Tiers</h4>
                <div className="space-y-2">
                  {analysis.loyalty.tiers.map((tier, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded text-sm">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">{tier.tier}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">
                          {formatNumber(tier.customers)} customers
                        </span>
                        <span className="text-green-600 font-medium">
                          {formatCurrency(tier.revenue)}
                        </span>
                        <span className="text-blue-600">
                          {formatPercentage(tier.retention)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    
  );
}
