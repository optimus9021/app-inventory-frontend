'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Search, 
  Plus, 
  Eye,
  Calendar,
  Package,
  CheckCircle,
  AlertTriangle,
  Truck,
  DollarSign,
  BarChart3,
  Target,
  Download,
  FileText,
  Building,
  User,
  Clock
} from 'lucide-react';

interface SupplyChainOutput {
  id: string;
  outputNumber: string;
  outputType: 'production' | 'procurement' | 'transfer' | 'return' | 'adjustment';
  sourceLocation: string;
  destinationLocation: string;
  outputDate: string;
  plannedDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  currency: string;
  responsibleTeam: string;
  approvedBy?: string;
  actualCompletionDate?: string;
  delayDays?: number;
  completionPercentage: number;
  notes?: string;
  items: OutputItem[];
}

interface OutputItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  plannedQty: number;
  actualQty?: number;
  unit: string;
  unitValue: number;
  totalValue: number;
  qualityStatus: 'passed' | 'failed' | 'pending' | 'na';
  batchNumber?: string;
  expiryDate?: string;
  notes?: string;
}

const mockSupplyChainOutputs: SupplyChainOutput[] = [
  {
    id: '1',
    outputNumber: 'OUT-2025-001',
    outputType: 'production',
    sourceLocation: 'Production Line A',
    destinationLocation: 'Main Warehouse',
    outputDate: '2025-01-15',
    plannedDate: '2025-01-15',
    status: 'completed',
    priority: 'high',
    totalItems: 5,
    totalQuantity: 500,
    totalValue: 125000000,
    currency: 'IDR',
    responsibleTeam: 'Production Team',
    approvedBy: 'Production Manager',
    actualCompletionDate: '2025-01-15',
    completionPercentage: 100,
    notes: 'Production completed on schedule with excellent quality',
    items: [
      {
        id: '1-1',
        productCode: 'TAS-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        plannedQty: 100,
        actualQty: 100,
        unit: 'pcs',
        unitValue: 500000,
        totalValue: 50000000,
        qualityStatus: 'passed',
        batchNumber: 'BATCH-001-2025',
        expiryDate: '2027-01-15'
      },
      {
        id: '1-2',
        productCode: 'SEP-002',
        productName: 'Sepatu Sport Running',
        category: 'Fashion',
        plannedQty: 150,
        actualQty: 150,
        unit: 'pcs',
        unitValue: 750000,
        totalValue: 112500000,
        qualityStatus: 'passed',
        batchNumber: 'BATCH-002-2025'
      }
    ]
  },
  {
    id: '2',
    outputNumber: 'OUT-2025-002',
    outputType: 'procurement',
    sourceLocation: 'Supplier Warehouse',
    destinationLocation: 'Central Warehouse',
    outputDate: '2025-01-14',
    plannedDate: '2025-01-12',
    status: 'completed',
    priority: 'medium',
    totalItems: 3,
    totalQuantity: 200,
    totalValue: 80000000,
    currency: 'IDR',
    responsibleTeam: 'Procurement Team',
    approvedBy: 'Procurement Manager',
    actualCompletionDate: '2025-01-14',
    delayDays: 2,
    completionPercentage: 100,
    notes: 'Received with 2 days delay due to supplier logistics issue',
    items: [
      {
        id: '2-1',
        productCode: 'ELK-001',
        productName: 'Smartphone Android 128GB',
        category: 'Elektronik',
        plannedQty: 100,
        actualQty: 100,
        unit: 'pcs',
        unitValue: 2500000,
        totalValue: 250000000,
        qualityStatus: 'passed',
        batchNumber: 'ELK-BATCH-001'
      }
    ]
  },
  {
    id: '3',
    outputNumber: 'OUT-2025-003',
    outputType: 'transfer',
    sourceLocation: 'Main Warehouse',
    destinationLocation: 'Regional Warehouse Surabaya',
    outputDate: '2025-01-16',
    plannedDate: '2025-01-16',
    status: 'in-progress',
    priority: 'medium',
    totalItems: 4,
    totalQuantity: 300,
    totalValue: 90000000,
    currency: 'IDR',
    responsibleTeam: 'Logistics Team',
    completionPercentage: 65,
    notes: 'Transfer in progress, expected completion today',
    items: [
      {
        id: '3-1',
        productCode: 'KMJ-001',
        productName: 'Kemeja Formal Katun',
        category: 'Fashion',
        plannedQty: 200,
        actualQty: 130,
        unit: 'pcs',
        unitValue: 200000,
        totalValue: 40000000,
        qualityStatus: 'pending',
        batchNumber: 'KMJ-BATCH-003'
      }
    ]
  },
  {
    id: '4',
    outputNumber: 'OUT-2025-004',
    outputType: 'return',
    sourceLocation: 'Customer Returns',
    destinationLocation: 'Quality Check Area',
    outputDate: '2025-01-13',
    plannedDate: '2025-01-13',
    status: 'completed',
    priority: 'low',
    totalItems: 2,
    totalQuantity: 25,
    totalValue: 12500000,
    currency: 'IDR',
    responsibleTeam: 'Customer Service Team',
    approvedBy: 'CS Manager',
    actualCompletionDate: '2025-01-13',
    completionPercentage: 100,
    notes: 'Customer returns processed and quality checked',
    items: [
      {
        id: '4-1',
        productCode: 'JAM-001',
        productName: 'Jam Tangan Digital',
        category: 'Aksesoris',
        plannedQty: 25,
        actualQty: 25,
        unit: 'pcs',
        unitValue: 300000,
        totalValue: 7500000,
        qualityStatus: 'failed',
        notes: 'Quality issue - need repair'
      }
    ]
  },
  {
    id: '5',
    outputNumber: 'OUT-2025-005',
    outputType: 'adjustment',
    sourceLocation: 'Warehouse B',
    destinationLocation: 'Warehouse A',
    outputDate: '2025-01-17',
    plannedDate: '2025-01-17',
    status: 'planned',
    priority: 'urgent',
    totalItems: 3,
    totalQuantity: 150,
    totalValue: 45000000,
    currency: 'IDR',
    responsibleTeam: 'Inventory Team',
    completionPercentage: 0,
    notes: 'Stock adjustment due to inventory discrepancy',
    items: [
      {
        id: '5-1',
        productCode: 'BOL-001',
        productName: 'Bola Sepak Official',
        category: 'Olahraga',
        plannedQty: 50,
        unit: 'pcs',
        unitValue: 500000,
        totalValue: 25000000,
        qualityStatus: 'na'
      }
    ]
  },
  {
    id: '6',
    outputNumber: 'OUT-2025-006',
    outputType: 'production',
    sourceLocation: 'Production Line B',
    destinationLocation: 'Quality Control',
    outputDate: '2025-01-18',
    plannedDate: '2025-01-16',
    status: 'delayed',
    priority: 'high',
    totalItems: 4,
    totalQuantity: 400,
    totalValue: 160000000,
    currency: 'IDR',
    responsibleTeam: 'Production Team B',
    delayDays: 2,
    completionPercentage: 75,
    notes: 'Production delayed due to equipment maintenance',
    items: [
      {
        id: '6-1',
        productCode: 'CEL-001',
        productName: 'Celana Jeans Premium',
        category: 'Fashion',
        plannedQty: 200,
        actualQty: 150,
        unit: 'pcs',
        unitValue: 400000,
        totalValue: 80000000,
        qualityStatus: 'pending',
        batchNumber: 'CEL-BATCH-001'
      }
    ]
  }
];

const getOutputTypeBadge = (type: string) => {
  switch (type) {
    case 'production':
      return <Badge className="bg-blue-100 text-blue-800">Production</Badge>;
    case 'procurement':
      return <Badge className="bg-green-100 text-green-800">Procurement</Badge>;
    case 'transfer':
      return <Badge className="bg-purple-100 text-purple-800">Transfer</Badge>;
    case 'return':
      return <Badge className="bg-orange-100 text-orange-800">Return</Badge>;
    case 'adjustment':
      return <Badge className="bg-yellow-100 text-yellow-800">Adjustment</Badge>;
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
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    case 'delayed':
      return <Badge className="bg-orange-100 text-orange-800">Delayed</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'low':
      return <Badge className="bg-green-100 text-green-800">Low</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
    case 'high':
      return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
    case 'urgent':
      return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'planned':
      return <Calendar className="h-4 w-4 text-gray-600" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'cancelled':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'delayed':
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
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

export default function SupplyChainOutputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOutputs = mockSupplyChainOutputs.filter(output => {
    const matchesSearch = output.outputNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         output.sourceLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         output.destinationLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || output.outputType === selectedType;
    const matchesStatus = selectedStatus === 'all' || output.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalOutputs = filteredOutputs.length;
  const completedOutputs = filteredOutputs.filter(o => o.status === 'completed').length;
  const delayedOutputs = filteredOutputs.filter(o => o.delayDays && o.delayDays > 0).length;
  const totalValue = filteredOutputs.reduce((sum, output) => sum + output.totalValue, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Output Supply Chain</h1>
            <p className="text-muted-foreground">
              Monitor dan kelola output dari seluruh supply chain operations
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Output
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Outputs</p>
                <p className="text-2xl font-bold">{totalOutputs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedOutputs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-orange-600">{delayedOutputs}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalValue)}
                </p>
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
                  placeholder="Cari output number, lokasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Tipe</option>
              <option value="production">Production</option>
              <option value="procurement">Procurement</option>
              <option value="transfer">Transfer</option>
              <option value="return">Return</option>
              <option value="adjustment">Adjustment</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="planned">Planned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </Card>

        {/* Output Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Supply Chain Outputs</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Output Info</th>
                    <th className="text-center p-4">Type</th>
                    <th className="text-left p-4">Location Flow</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Priority</th>
                    <th className="text-center p-4">Progress</th>
                    <th className="text-right p-4">Value</th>
                    <th className="text-left p-4">Schedule</th>
                    <th className="text-center p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutputs.map((output) => (
                    <tr key={output.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{output.outputNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {output.totalItems} items • {output.totalQuantity} qty
                          </div>
                          <div className="text-xs text-blue-600">
                            Team: {output.responsibleTeam}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getOutputTypeBadge(output.outputType)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1 text-blue-600" />
                            From: {output.sourceLocation}
                          </div>
                          <div className="flex items-center mt-1">
                            <Truck className="h-3 w-3 mr-1 text-green-600" />
                            To: {output.destinationLocation}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(output.status)}
                          {getStatusBadge(output.status)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getPriorityBadge(output.priority)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Target className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">{output.completionPercentage}%</span>
                        </div>
                        {output.delayDays && (
                          <div className="text-xs text-red-600 mt-1">
                            +{output.delayDays} days delay
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(output.totalValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {output.currency}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                            Planned: {output.plannedDate}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-green-600" />
                            Actual: {output.actualCompletionDate || 'TBD'}
                          </div>
                          {output.approvedBy && (
                            <div className="flex items-center text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              {output.approvedBy}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {output.status !== 'completed' && (
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4" />
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
            <h3 className="text-lg font-semibold mb-4">Output Type Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                  Production Output
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredOutputs.filter(o => o.outputType === 'production').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-green-600" />
                  Procurement
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredOutputs.filter(o => o.outputType === 'procurement').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-purple-600" />
                  Transfer
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredOutputs.filter(o => o.outputType === 'transfer').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                  Returns
                </span>
                <Badge className="bg-orange-100 text-orange-800">
                  {filteredOutputs.filter(o => o.outputType === 'return').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent High Priority Outputs</h3>
            <div className="space-y-3">
              {filteredOutputs
                .filter(o => ['high', 'urgent'].includes(o.priority))
                .sort((a, b) => new Date(b.outputDate).getTime() - new Date(a.outputDate).getTime())
                .slice(0, 5)
                .map((output) => (
                  <div key={output.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(output.status)}
                      <div>
                        <div className="font-medium">{output.outputNumber}</div>
                        <div className="text-muted-foreground">
                          {getOutputTypeBadge(output.outputType)} • {getPriorityBadge(output.priority)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        {formatCurrency(output.totalValue)}
                      </div>
                      <div className="text-muted-foreground">
                        {output.completionPercentage}% complete
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
