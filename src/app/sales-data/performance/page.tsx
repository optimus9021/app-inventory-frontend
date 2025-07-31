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
  TrendingUp,
  Target,
  Award,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SalesPerformance {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  salesTeam: SalesTeamPerformance[];
  products: ProductPerformance[];
  platforms: PlatformPerformance[];
  regions: RegionPerformance[];
  kpis: KPIMetrics;
  goals: SalesGoals;
}

interface SalesTeamPerformance {
  teamId: string;
  teamName: string;
  teamLead: string;
  memberCount: number;
  revenue: number;
  orders: number;
  units: number;
  target: number;
  achievement: number;
  growth: number;
  rating: number;
  efficiency: number;
  customerSatisfaction: number;
}

interface ProductPerformance {
  productCode: string;
  productName: string;
  category: string;
  revenue: number;
  units: number;
  target: number;
  achievement: number;
  growth: number;
  margin: number;
  velocity: number;
  rank: number;
}

interface PlatformPerformance {
  platform: string;
  revenue: number;
  orders: number;
  conversionRate: number;
  avgOrderValue: number;
  growth: number;
  marketShare: number;
  customerAcquisition: number;
  rating: number;
}

interface RegionPerformance {
  region: string;
  cities: number;
  revenue: number;
  orders: number;
  customers: number;
  growth: number;
  penetration: number;
  potential: number;
}

interface KPIMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  avgOrderValue: number;
  aovGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  customerRetention: number;
  retentionGrowth: number;
  grossMargin: number;
  marginGrowth: number;
}

interface SalesGoals {
  monthlyTarget: number;
  quarterlyTarget: number;
  yearlyTarget: number;
  monthlyAchievement: number;
  quarterlyAchievement: number;
  yearlyAchievement: number;
}

const mockSalesPerformance: SalesPerformance = {
  id: '1',
  period: 'January 2025',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  salesTeam: [
    {
      teamId: '1',
      teamName: 'Digital Sales Team',
      teamLead: 'Ahmad Rizky',
      memberCount: 8,
      revenue: 1470000000,
      orders: 5250,
      units: 9200,
      target: 1400000000,
      achievement: 105.0,
      growth: 18.5,
      rating: 4.7,
      efficiency: 92.3,
      customerSatisfaction: 4.6
    },
    {
      teamId: '2',
      teamName: 'Regional Sales Team',
      teamLead: 'Sari Dewi',
      memberCount: 12,
      revenue: 980000000,
      orders: 3500,
      units: 6220,
      target: 1000000000,
      achievement: 98.0,
      growth: 12.8,
      rating: 4.5,
      efficiency: 87.6,
      customerSatisfaction: 4.4
    },
    {
      teamId: '3',
      teamName: 'B2B Sales Team',
      teamLead: 'Budi Santoso',
      memberCount: 6,
      revenue: 735000000,
      orders: 1850,
      units: 4100,
      target: 800000000,
      achievement: 91.9,
      growth: 8.3,
      rating: 4.3,
      efficiency: 84.2,
      customerSatisfaction: 4.2
    }
  ],
  products: [
    {
      productCode: 'TAS-001',
      productName: 'Tas Ransel Premium',
      category: 'Fashion',
      revenue: 145000000,
      units: 725,
      target: 130000000,
      achievement: 111.5,
      growth: 25.8,
      margin: 35.2,
      velocity: 8.5,
      rank: 1
    },
    {
      productCode: 'ELK-001',
      productName: 'Smartphone Android 128GB',
      category: 'Elektronik',
      revenue: 135000000,
      units: 450,
      target: 140000000,
      achievement: 96.4,
      growth: 18.2,
      margin: 22.1,
      velocity: 7.8,
      rank: 2
    },
    {
      productCode: 'SEP-002',
      productName: 'Sepatu Sport Running',
      category: 'Olahraga',
      revenue: 98000000,
      units: 490,
      target: 95000000,
      achievement: 103.2,
      growth: 12.5,
      margin: 28.7,
      velocity: 6.9,
      rank: 3
    }
  ],
  platforms: [
    {
      platform: 'TikTok Shop',
      revenue: 980000000,
      orders: 3500,
      conversionRate: 3.8,
      avgOrderValue: 280000,
      growth: 15.5,
      marketShare: 40.0,
      customerAcquisition: 1250,
      rating: 4.6
    },
    {
      platform: 'Shopee',
      revenue: 857500000,
      orders: 3060,
      conversionRate: 3.2,
      avgOrderValue: 280000,
      growth: 8.2,
      marketShare: 35.0,
      customerAcquisition: 980,
      rating: 4.4
    },
    {
      platform: 'Tokopedia',
      revenue: 612500000,
      orders: 2190,
      conversionRate: 2.9,
      avgOrderValue: 280000,
      growth: -2.1,
      marketShare: 25.0,
      customerAcquisition: 670,
      rating: 4.1
    }
  ],
  regions: [
    {
      region: 'Jakarta & Sekitarnya',
      cities: 8,
      revenue: 1225000000,
      orders: 4375,
      customers: 12500,
      growth: 16.2,
      penetration: 8.5,
      potential: 15.2
    },
    {
      region: 'Jawa Barat',
      cities: 15,
      revenue: 735000000,
      orders: 2625,
      customers: 8200,
      growth: 12.8,
      penetration: 5.2,
      potential: 12.8
    },
    {
      region: 'Jawa Tengah & DIY',
      cities: 12,
      revenue: 490000000,
      orders: 1750,
      customers: 5800,
      growth: 8.5,
      penetration: 4.1,
      potential: 10.5
    }
  ],
  kpis: {
    totalRevenue: 2450000000,
    revenueGrowth: 14.2,
    totalOrders: 8750,
    orderGrowth: 12.8,
    avgOrderValue: 280000,
    aovGrowth: 3.5,
    conversionRate: 3.2,
    conversionGrowth: 0.5,
    customerRetention: 68.5,
    retentionGrowth: 5.2,
    grossMargin: 28.4,
    marginGrowth: 2.1
  },
  goals: {
    monthlyTarget: 2300000000,
    quarterlyTarget: 7200000000,
    yearlyTarget: 32000000000,
    monthlyAchievement: 106.5,
    quarterlyAchievement: 34.0,
    yearlyAchievement: 7.7
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

const getAchievementBadge = (achievement: number) => {
  if (achievement >= 100) return <Badge className="bg-green-100 text-green-800">Achieved</Badge>;
  if (achievement >= 80) return <Badge className="bg-yellow-100 text-yellow-800">On Track</Badge>;
  return <Badge className="bg-red-100 text-red-800">Below Target</Badge>;
};

const getPerformanceIcon = (achievement: number) => {
  if (achievement >= 100) return <CheckCircle className="h-4 w-4 text-green-600" />;
  if (achievement >= 80) return <Activity className="h-4 w-4 text-yellow-600" />;
  return <AlertTriangle className="h-4 w-4 text-red-600" />;
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
    />
  ));
};

export default function SalesPerformancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const performance = mockSalesPerformance;

  const filteredTeams = performance.salesTeam.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.teamLead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || team.teamId === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales Performance Tracking</h1>
            <p className="text-muted-foreground">
              Monitor dan analisis performa penjualan tim, produk, dan platform
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

        {/* Period & Goals */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Period: {performance.period}</span>
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="text-center">
                <div className="text-muted-foreground">Monthly Target</div>
                <div className="font-bold text-blue-600">
                  {formatCurrency(performance.goals.monthlyTarget)}
                </div>
                <div className={`text-xs ${getGrowthColor(performance.goals.monthlyAchievement - 100)}`}>
                  {formatPercentage(performance.goals.monthlyAchievement)} achieved
                </div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Quarterly Progress</div>
                <div className="font-bold text-purple-600">
                  {formatPercentage(performance.goals.quarterlyAchievement)}
                </div>
                <div className="text-xs text-muted-foreground">of target</div>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(performance.kpis.totalRevenue)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.revenueGrowth)}
              <span className={getGrowthColor(performance.kpis.revenueGrowth)}>
                {formatPercentage(performance.kpis.revenueGrowth)} vs last period
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatNumber(performance.kpis.totalOrders)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.orderGrowth)}
              <span className={getGrowthColor(performance.kpis.orderGrowth)}>
                {formatPercentage(performance.kpis.orderGrowth)} vs last period
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(performance.kpis.avgOrderValue)}
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.aovGrowth)}
              <span className={getGrowthColor(performance.kpis.aovGrowth)}>
                {formatPercentage(performance.kpis.aovGrowth)} vs last period
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatPercentage(performance.kpis.conversionRate)}
                </p>
              </div>
              <PieChart className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.conversionGrowth)}
              <span className={getGrowthColor(performance.kpis.conversionGrowth)}>
                {formatPercentage(performance.kpis.conversionGrowth)} vs last period
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Retention</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatPercentage(performance.kpis.customerRetention)}
                </p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.retentionGrowth)}
              <span className={getGrowthColor(performance.kpis.retentionGrowth)}>
                {formatPercentage(performance.kpis.retentionGrowth)} vs last period
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Gross Margin</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {formatPercentage(performance.kpis.grossMargin)}
                </p>
              </div>
              <Award className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              {getGrowthIcon(performance.kpis.marginGrowth)}
              <span className={getGrowthColor(performance.kpis.marginGrowth)}>
                {formatPercentage(performance.kpis.marginGrowth)} vs last period
              </span>
            </div>
          </Card>
        </div>

        {/* Sales Team Performance */}
        <Card>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Sales Team Performance</h3>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari tim..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Tim</option>
                  {performance.salesTeam.map((team) => (
                    <option key={team.teamId} value={team.teamId}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Team</th>
                    <th className="text-right p-4">Revenue</th>
                    <th className="text-center p-4">Achievement</th>
                    <th className="text-center p-4">Growth</th>
                    <th className="text-center p-4">Orders</th>
                    <th className="text-center p-4">Rating</th>
                    <th className="text-center p-4">Efficiency</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((team) => (
                    <tr key={team.teamId} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{team.teamName}</div>
                          <div className="text-sm text-muted-foreground">
                            Led by {team.teamLead} • {team.memberCount} members
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(team.revenue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Target: {formatCurrency(team.target)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getPerformanceIcon(team.achievement)}
                          <span className="font-medium">{formatPercentage(team.achievement)}</span>
                        </div>
                        <div className="mt-1">
                          {getAchievementBadge(team.achievement)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`flex items-center justify-center ${getGrowthColor(team.growth)}`}>
                          {getGrowthIcon(team.growth)}
                          <span className="ml-1 font-medium">{formatPercentage(team.growth)}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium">{formatNumber(team.orders)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatNumber(team.units)} units
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          {getRatingStars(team.rating)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {team.rating.toFixed(1)}/5.0
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-medium text-blue-600">
                          {formatPercentage(team.efficiency)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          CS: {team.customerSatisfaction.toFixed(1)}/5.0
                        </div>
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

        {/* Platform & Regional Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
            <div className="space-y-4">
              {performance.platforms.map((platform, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{platform.platform}</span>
                      <div className="flex items-center space-x-1">
                        {getRatingStars(platform.rating)}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(platform.revenue)}</span>
                      <span>{formatNumber(platform.orders)} orders</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>Conversion: {formatPercentage(platform.conversionRate)}</span>
                      <div className={`flex items-center ${getGrowthColor(platform.growth)}`}>
                        {getGrowthIcon(platform.growth)}
                        <span className="ml-1">{formatPercentage(platform.growth)}</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${platform.marketShare}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Regional Performance</h3>
            <div className="space-y-4">
              {performance.regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{region.region}</span>
                      <div className={`flex items-center ${getGrowthColor(region.growth)}`}>
                        {getGrowthIcon(region.growth)}
                        <span className="ml-1 text-sm">{formatPercentage(region.growth)}</span>
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(region.revenue)}</span>
                      <span>{formatNumber(region.customers)} customers</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span>Penetration: {formatPercentage(region.penetration)}</span>
                      <span>Potential: {formatPercentage(region.potential)}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(region.penetration / region.potential) * 100}%` }}
                      ></div>
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
