'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Package,
  TrendingDown,
  DollarSign,
  Clock,
  Target,
  Download,
  User,
  Zap
} from 'lucide-react';

interface DeadstockItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  brand: string;
  sku: string;
  location: string;
  currentStock: number;
  unit: string;
  unitCost: number;
  totalValue: number;
  lastSaleDate?: string;
  lastOrderDate?: string;
  daysWithoutSale: number;
  daysWithoutOrder: number;
  deadstockReason: 'no-demand' | 'obsolete' | 'seasonal' | 'quality-issue' | 'expired' | 'overstock' | 'discontinued';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  agingCategory: '30-60-days' | '60-90-days' | '90-180-days' | '180-365-days' | '365+-days';
  actionStatus: 'identified' | 'action-planned' | 'discount-applied' | 'clearance' | 'liquidation' | 'disposed';
  actionPlan?: string;
  discountPercentage?: number;
  expectedDisposalDate?: string;
  responsibleTeam: string;
  identifiedDate: string;
  expiryDate?: string;
  notes?: string;
}

const mockDeadstockItems: DeadstockItem[] = [
  {
    id: '1',
    productCode: 'OLD-TAS-001',
    productName: 'Tas Vintage Collection 2023',
    category: 'Fashion',
    brand: 'VintageStyle',
    sku: 'VST-TAS-001',
    location: 'WH-A1-B15',
    currentStock: 85,
    unit: 'pcs',
    unitCost: 450000,
    totalValue: 38250000,
    lastSaleDate: '2024-08-15',
    lastOrderDate: '2024-06-20',
    daysWithoutSale: 153,
    daysWithoutOrder: 209,
    deadstockReason: 'no-demand',
    riskLevel: 'high',
    agingCategory: '90-180-days',
    actionStatus: 'discount-applied',
    actionPlan: 'Apply 40% discount for clearance sale',
    discountPercentage: 40,
    expectedDisposalDate: '2025-02-28',
    responsibleTeam: 'Sales Team',
    identifiedDate: '2024-12-01',
    notes: 'Model lama, trend sudah berubah'
  },
  {
    id: '2',
    productCode: 'EXP-SUP-002',
    productName: 'Suplemen Vitamin Expired',
    category: 'Health',
    brand: 'HealthPlus',
    sku: 'HP-VIT-002',
    location: 'WH-B2-EXP',
    currentStock: 200,
    unit: 'botol',
    unitCost: 125000,
    totalValue: 25000000,
    lastSaleDate: '2024-11-30',
    daysWithoutSale: 46,
    daysWithoutOrder: 180,
    deadstockReason: 'expired',
    riskLevel: 'critical',
    agingCategory: '30-60-days',
    actionStatus: 'liquidation',
    actionPlan: 'Immediate disposal required - expired products',
    expectedDisposalDate: '2025-01-20',
    responsibleTeam: 'Quality Control',
    identifiedDate: '2024-12-15',
    expiryDate: '2024-12-31',
    notes: 'Produk expired, harus dimusnahkan segera'
  },
  {
    id: '3',
    productCode: 'SEA-CLO-003',
    productName: 'Jaket Musim Dingin',
    category: 'Fashion',
    brand: 'WinterWear',
    sku: 'WW-JAK-003',
    location: 'WH-A2-S20',
    currentStock: 120,
    unit: 'pcs',
    unitCost: 350000,
    totalValue: 42000000,
    lastSaleDate: '2024-07-30',
    lastOrderDate: '2024-05-15',
    daysWithoutSale: 169,
    daysWithoutOrder: 245,
    deadstockReason: 'seasonal',
    riskLevel: 'medium',
    agingCategory: '90-180-days',
    actionStatus: 'action-planned',
    actionPlan: 'Hold until next winter season or transfer to cold region',
    expectedDisposalDate: '2025-05-01',
    responsibleTeam: 'Category Manager',
    identifiedDate: '2024-11-20',
    notes: 'Seasonal item - consider next winter demand'
  },
  {
    id: '4',
    productCode: 'OLD-PHN-004',
    productName: 'Smartphone Model Lama',
    category: 'Elektronik',
    brand: 'TechOld',
    sku: 'TO-PHN-004',
    location: 'WH-C1-T10',
    currentStock: 45,
    unit: 'pcs',
    unitCost: 2200000,
    totalValue: 99000000,
    lastSaleDate: '2024-09-10',
    lastOrderDate: '2024-04-25',
    daysWithoutSale: 127,
    daysWithoutOrder: 275,
    deadstockReason: 'obsolete',
    riskLevel: 'critical',
    agingCategory: '90-180-days',
    actionStatus: 'clearance',
    actionPlan: 'Deep discount clearance sale 60%',
    discountPercentage: 60,
    expectedDisposalDate: '2025-01-31',
    responsibleTeam: 'Electronics Team',
    identifiedDate: '2024-11-15',
    notes: 'Model sudah obsolete, teknologi tertinggal'
  },
  {
    id: '5',
    productCode: 'DEF-SHO-005',
    productName: 'Sepatu Defect Minor',
    category: 'Fashion',
    brand: 'SportBrand',
    sku: 'SB-SHO-005',
    location: 'WH-A3-DEF',
    currentStock: 65,
    unit: 'pcs',
    unitCost: 650000,
    totalValue: 42250000,
    lastSaleDate: '2024-10-20',
    daysWithoutSale: 87,
    daysWithoutOrder: 120,
    deadstockReason: 'quality-issue',
    riskLevel: 'medium',
    agingCategory: '60-90-days',
    actionStatus: 'discount-applied',
    actionPlan: 'Sell as B-grade with 50% discount',
    discountPercentage: 50,
    expectedDisposalDate: '2025-03-01',
    responsibleTeam: 'Quality Team',
    identifiedDate: '2024-12-20',
    notes: 'Minor defect, masih bisa dijual dengan disclaimer'
  },
  {
    id: '6',
    productCode: 'OVR-BAG-006',
    productName: 'Tas Overstock Promotion',
    category: 'Fashion',
    brand: 'PromoStyle',
    sku: 'PS-BAG-006',
    location: 'WH-A1-OVR',
    currentStock: 300,
    unit: 'pcs',
    unitCost: 180000,
    totalValue: 54000000,
    lastSaleDate: '2024-11-25',
    lastOrderDate: '2024-08-10',
    daysWithoutSale: 51,
    daysWithoutOrder: 158,
    deadstockReason: 'overstock',
    riskLevel: 'low',
    agingCategory: '30-60-days',
    actionStatus: 'identified',
    actionPlan: 'Bundle promotion with complementary items',
    responsibleTeam: 'Marketing Team',
    identifiedDate: '2025-01-05',
    notes: 'Overstock dari promo yang kurang efektif'
  }
];

const getDeadstockReasonBadge = (reason: string) => {
  switch (reason) {
    case 'no-demand':
      return <Badge className="bg-orange-100 text-orange-800">No Demand</Badge>;
    case 'obsolete':
      return <Badge className="bg-red-100 text-red-800">Obsolete</Badge>;
    case 'seasonal':
      return <Badge className="bg-blue-100 text-blue-800">Seasonal</Badge>;
    case 'quality-issue':
      return <Badge className="bg-yellow-100 text-yellow-800">Quality Issue</Badge>;
    case 'expired':
      return <Badge className="bg-purple-100 text-purple-800">Expired</Badge>;
    case 'overstock':
      return <Badge className="bg-green-100 text-green-800">Overstock</Badge>;
    case 'discontinued':
      return <Badge className="bg-gray-100 text-gray-800">Discontinued</Badge>;
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

const getActionStatusBadge = (status: string) => {
  switch (status) {
    case 'identified':
      return <Badge className="bg-gray-100 text-gray-800">Identified</Badge>;
    case 'action-planned':
      return <Badge className="bg-blue-100 text-blue-800">Action Planned</Badge>;
    case 'discount-applied':
      return <Badge className="bg-yellow-100 text-yellow-800">Discount Applied</Badge>;
    case 'clearance':
      return <Badge className="bg-orange-100 text-orange-800">Clearance</Badge>;
    case 'liquidation':
      return <Badge className="bg-red-100 text-red-800">Liquidation</Badge>;
    case 'disposed':
      return <Badge className="bg-green-100 text-green-800">Disposed</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getAgingBadge = (aging: string) => {
  switch (aging) {
    case '30-60-days':
      return <Badge className="bg-yellow-100 text-yellow-800">30-60 Days</Badge>;
    case '60-90-days':
      return <Badge className="bg-orange-100 text-orange-800">60-90 Days</Badge>;
    case '90-180-days':
      return <Badge className="bg-red-100 text-red-800">90-180 Days</Badge>;
    case '180-365-days':
      return <Badge className="bg-purple-100 text-purple-800">180-365 Days</Badge>;
    case '365+-days':
      return <Badge className="bg-gray-100 text-gray-800">365+ Days</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getRiskIcon = (risk: string) => {
  switch (risk) {
    case 'low':
      return <Target className="h-4 w-4 text-green-600" />;
    case 'medium':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'high':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case 'critical':
      return <Zap className="h-4 w-4 text-red-600" />;
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

export default function DeadstockManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReason, setSelectedReason] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const filteredDeadstock = mockDeadstockItems.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = selectedReason === 'all' || item.deadstockReason === selectedReason;
    const matchesRisk = selectedRisk === 'all' || item.riskLevel === selectedRisk;
    
    return matchesSearch && matchesReason && matchesRisk;
  });

  const totalDeadstock = filteredDeadstock.length;
  const totalValue = filteredDeadstock.reduce((sum, item) => sum + item.totalValue, 0);
  const criticalItems = filteredDeadstock.filter(item => item.riskLevel === 'critical').length;
  const totalQuantity = filteredDeadstock.reduce((sum, item) => sum + item.currentStock, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deadstock Management</h1>
            <p className="text-muted-foreground">
              Kelola dan analisis inventory deadstock untuk optimasi supply chain
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Deadstock
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Deadstock</p>
                <p className="text-2xl font-bold text-red-600">{totalDeadstock}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(totalValue)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                <p className="text-2xl font-bold text-purple-600">{criticalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalQuantity} units</p>
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
                  placeholder="Cari produk, kode, brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Alasan</option>
              <option value="no-demand">No Demand</option>
              <option value="obsolete">Obsolete</option>
              <option value="seasonal">Seasonal</option>
              <option value="quality-issue">Quality Issue</option>
              <option value="expired">Expired</option>
              <option value="overstock">Overstock</option>
              <option value="discontinued">Discontinued</option>
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
              <option value="critical">Critical Risk</option>
            </select>
          </div>
        </Card>

        {/* Deadstock Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Deadstock Inventory</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product Info</th>
                    <th className="text-center p-4">Reason</th>
                    <th className="text-center p-4">Risk Level</th>
                    <th className="text-center p-4">Aging</th>
                    <th className="text-right p-4">Stock Value</th>
                    <th className="text-center p-4">Action Status</th>
                    <th className="text-left p-4">Action Plan</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeadstock.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{item.productName}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.productCode} • {item.brand}
                          </div>
                          <div className="text-xs text-blue-600">
                            {item.currentStock} {item.unit} • {item.location}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Last sale: {item.lastSaleDate || 'Never'} ({item.daysWithoutSale} days ago)
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getDeadstockReasonBadge(item.deadstockReason)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getRiskIcon(item.riskLevel)}
                          {getRiskBadge(item.riskLevel)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getAgingBadge(item.agingCategory)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-red-600">
                          {formatCurrency(item.totalValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(item.unitCost)}/unit
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getActionStatusBadge(item.actionStatus)}
                        {item.discountPercentage && (
                          <div className="text-xs text-green-600 mt-1">
                            {item.discountPercentage}% discount
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs">
                          {item.actionPlan && (
                            <div className="font-medium text-sm">{item.actionPlan}</div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {item.responsibleTeam}
                            </div>
                            {item.expectedDisposalDate && (
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {item.expectedDisposalDate}
                              </div>
                            )}
                          </div>
                          {item.expiryDate && (
                            <div className="text-xs text-red-600 mt-1">
                              Expires: {item.expiryDate}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {item.actionStatus !== 'disposed' && (
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {item.riskLevel === 'critical' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
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
            <h3 className="text-lg font-semibold mb-4">Deadstock Reason Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <TrendingDown className="h-4 w-4 mr-2 text-orange-600" />
                  No Demand
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredDeadstock.filter(item => item.deadstockReason === 'no-demand').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                  Obsolete
                </span>
                <Badge className="bg-red-100 text-red-800">
                  {filteredDeadstock.filter(item => item.deadstockReason === 'obsolete').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Seasonal
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredDeadstock.filter(item => item.deadstockReason === 'seasonal').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-green-600" />
                  Overstock
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredDeadstock.filter(item => item.deadstockReason === 'overstock').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Critical Action Required</h3>
            <div className="space-y-3">
              {filteredDeadstock
                .filter(item => item.riskLevel === 'critical')
                .sort((a, b) => new Date(a.expectedDisposalDate || '9999-12-31').getTime() - new Date(b.expectedDisposalDate || '9999-12-31').getTime())
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(item.riskLevel)}
                      <div>
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-muted-foreground">
                          {getDeadstockReasonBadge(item.deadstockReason)} • {getActionStatusBadge(item.actionStatus)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">
                        {formatCurrency(item.totalValue)}
                      </div>
                      <div className="text-muted-foreground">
                        Due: {item.expectedDisposalDate || 'TBD'}
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
