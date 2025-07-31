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
  Package,
  Truck,
  CheckCircle,
  AlertTriangle,
  Target,
  Building,
  FileText,
  BarChart3,
  Eye,
  RefreshCw,
  Calendar,
  Activity,
  DollarSign
} from 'lucide-react';

interface POOutput {
  id: string;
  poNumber: string;
  supplier: {
    name: string;
    contact: string;
    performance: number;
  };
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  status: 'pending' | 'in-transit' | 'partial' | 'delivered' | 'delayed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  items: OutputItem[];
  summary: {
    totalItems: number;
    expectedQuantity: number;
    deliveredQuantity: number;
    completionRate: number;
    totalValue: number;
    deliveredValue: number;
  };
  delivery: {
    method: string;
    carrier: string;
    trackingNumber?: string;
    location: string;
    coordinates?: string;
  };
  qualityMetrics: {
    defectRate: number;
    acceptanceRate: number;
    returnRate: number;
    qualityScore: number;
  };
  performance: {
    onTimeDelivery: boolean;
    leadTimeVariance: number;
    deliveryAccuracy: number;
    communicationRating: number;
  };
  financials: {
    invoiceStatus: 'pending' | 'received' | 'paid' | 'overdue';
    paymentTerms: string;
    discountApplied?: number;
    penaltyApplied?: number;
  };
  notes?: string;
  alerts?: Alert[];
}

interface OutputItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  expectedQuantity: number;
  deliveredQuantity: number;
  unitPrice: number;
  totalValue: number;
  deliveredValue: number;
  condition: 'excellent' | 'good' | 'damaged' | 'defective';
  batchNumber?: string;
  expiryDate?: string;
  location: string;
  qcStatus: 'pending' | 'passed' | 'failed' | 'conditional';
  notes?: string;
}

interface Alert {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

const mockPOOutputs: POOutput[] = [
  {
    id: '1',
    poNumber: 'PO-PRD-2025-001',
    supplier: {
      name: 'PT Supplier Utama',
      contact: 'supplier@utama.com',
      performance: 92
    },
    orderDate: '2025-01-29T00:00:00Z',
    expectedDelivery: '2025-02-15T00:00:00Z',
    actualDelivery: '2025-02-14T00:00:00Z',
    status: 'delivered',
    priority: 'high',
    items: [
      {
        id: '1',
        name: 'Smartphone Pro Max 256GB',
        sku: 'SPH-PM-256',
        category: 'Electronics',
        expectedQuantity: 100,
        deliveredQuantity: 100,
        unitPrice: 12000000,
        totalValue: 1200000000,
        deliveredValue: 1200000000,
        condition: 'excellent',
        batchNumber: 'BT-2025-0214',
        location: 'Warehouse A-1',
        qcStatus: 'passed',
        notes: 'All units passed quality inspection'
      },
      {
        id: '2',
        name: 'Wireless Charger Fast 15W',
        sku: 'WCH-F15',
        category: 'Accessories',
        expectedQuantity: 200,
        deliveredQuantity: 200,
        unitPrice: 250000,
        totalValue: 50000000,
        deliveredValue: 50000000,
        condition: 'excellent',
        batchNumber: 'BT-2025-0214',
        location: 'Warehouse A-2',
        qcStatus: 'passed'
      }
    ],
    summary: {
      totalItems: 2,
      expectedQuantity: 300,
      deliveredQuantity: 300,
      completionRate: 100,
      totalValue: 1250000000,
      deliveredValue: 1250000000
    },
    delivery: {
      method: 'Express Delivery',
      carrier: 'PT Express Logistics',
      trackingNumber: 'EXP-2025-0214-001',
      location: 'Jakarta Warehouse',
      coordinates: '-6.2088,106.8456'
    },
    qualityMetrics: {
      defectRate: 0,
      acceptanceRate: 100,
      returnRate: 0,
      qualityScore: 98
    },
    performance: {
      onTimeDelivery: true,
      leadTimeVariance: -1,
      deliveryAccuracy: 100,
      communicationRating: 95
    },
    financials: {
      invoiceStatus: 'received',
      paymentTerms: 'Net 30',
      discountApplied: 2.5
    },
    notes: 'Excellent delivery performance, arrived 1 day early',
    alerts: [
      {
        type: 'success',
        message: 'Delivery completed successfully - 1 day ahead of schedule',
        timestamp: '2025-02-14T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    poNumber: 'PO-PRD-2025-002',
    supplier: {
      name: 'CV Elektronik Jaya',
      contact: 'sales@elektronikjaya.com',
      performance: 78
    },
    orderDate: '2025-01-29T00:00:00Z',
    expectedDelivery: '2025-02-05T00:00:00Z',
    actualDelivery: '2025-02-12T00:00:00Z',
    status: 'partial',
    priority: 'urgent',
    items: [
      {
        id: '3',
        name: 'Gaming Laptop RTX 4080',
        sku: 'LAP-GM-4080',
        category: 'Computers',
        expectedQuantity: 50,
        deliveredQuantity: 35,
        unitPrice: 25000000,
        totalValue: 1250000000,
        deliveredValue: 875000000,
        condition: 'good',
        batchNumber: 'BT-2025-0212',
        location: 'Warehouse B-1',
        qcStatus: 'conditional',
        notes: 'Minor packaging issues, functionality intact'
      }
    ],
    summary: {
      totalItems: 1,
      expectedQuantity: 50,
      deliveredQuantity: 35,
      completionRate: 70,
      totalValue: 1250000000,
      deliveredValue: 875000000
    },
    delivery: {
      method: 'Standard Delivery',
      carrier: 'PT Logistik Nusantara',
      trackingNumber: 'LOG-2025-0212-002',
      location: 'Jakarta Warehouse'
    },
    qualityMetrics: {
      defectRate: 5,
      acceptanceRate: 95,
      returnRate: 0,
      qualityScore: 85
    },
    performance: {
      onTimeDelivery: false,
      leadTimeVariance: 7,
      deliveryAccuracy: 70,
      communicationRating: 75
    },
    financials: {
      invoiceStatus: 'pending',
      paymentTerms: 'Net 15',
      penaltyApplied: 5
    },
    notes: 'Partial delivery due to production delays. Remaining 15 units expected next week.',
    alerts: [
      {
        type: 'warning',
        message: 'Delivery delayed by 7 days - remaining 15 units pending',
        timestamp: '2025-02-12T10:00:00Z'
      },
      {
        type: 'info',
        message: 'Supplier confirmed remaining units will arrive Feb 20',
        timestamp: '2025-02-12T15:30:00Z'
      }
    ]
  },
  {
    id: '3',
    poNumber: 'PO-PRD-2025-003',
    supplier: {
      name: 'PT Furniture Modern',
      contact: 'order@furnituremodern.com',
      performance: 88
    },
    orderDate: '2025-01-28T00:00:00Z',
    expectedDelivery: '2025-02-25T00:00:00Z',
    status: 'in-transit',
    priority: 'medium',
    items: [
      {
        id: '4',
        name: 'Executive Office Chair',
        sku: 'FUR-EOC-001',
        category: 'Furniture',
        expectedQuantity: 20,
        deliveredQuantity: 0,
        unitPrice: 3350000,
        totalValue: 67000000,
        deliveredValue: 0,
        condition: 'excellent',
        location: 'In Transit',
        qcStatus: 'pending'
      }
    ],
    summary: {
      totalItems: 1,
      expectedQuantity: 20,
      deliveredQuantity: 0,
      completionRate: 0,
      totalValue: 67000000,
      deliveredValue: 0
    },
    delivery: {
      method: 'Specialized Furniture Delivery',
      carrier: 'PT Furniture Express',
      trackingNumber: 'FUR-2025-0220-003',
      location: 'En Route to Jakarta'
    },
    qualityMetrics: {
      defectRate: 0,
      acceptanceRate: 0,
      returnRate: 0,
      qualityScore: 0
    },
    performance: {
      onTimeDelivery: true,
      leadTimeVariance: 0,
      deliveryAccuracy: 0,
      communicationRating: 90
    },
    financials: {
      invoiceStatus: 'pending',
      paymentTerms: 'Net 30'
    },
    alerts: [
      {
        type: 'info',
        message: 'Shipment in transit - expected arrival Feb 22',
        timestamp: '2025-02-20T08:00:00Z'
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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'in-transit':
      return <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>;
    case 'partial':
      return <Badge className="bg-orange-100 text-orange-800">Partial</Badge>;
    case 'delivered':
      return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
    case 'delayed':
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
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
      return <Badge>Unknown</Badge>;
  }
};

const getConditionBadge = (condition: string) => {
  switch (condition) {
    case 'excellent':
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    case 'good':
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    case 'damaged':
      return <Badge className="bg-orange-100 text-orange-800">Damaged</Badge>;
    case 'defective':
      return <Badge className="bg-red-100 text-red-800">Defective</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getQCStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending QC</Badge>;
    case 'passed':
      return <Badge className="bg-green-100 text-green-800">QC Passed</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-800">QC Failed</Badge>;
    case 'conditional':
      return <Badge className="bg-orange-100 text-orange-800">Conditional</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getInvoiceStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'received':
      return <Badge className="bg-blue-100 text-blue-800">Received</Badge>;
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    case 'overdue':
      return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'info':
      return <Activity className="h-4 w-4 text-blue-600" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

export default function POOutputPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedPO, setExpandedPO] = useState<string | null>(null);

  const filteredPOs = mockPOOutputs.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || po.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalPOs = filteredPOs.length;
  const deliveredPOs = filteredPOs.filter(po => po.status === 'delivered').length;
  const partialPOs = filteredPOs.filter(po => po.status === 'partial').length;
  const avgCompletion = filteredPOs.reduce((sum, po) => sum + po.summary.completionRate, 0) / filteredPOs.length;
  const totalValue = filteredPOs.reduce((sum, po) => sum + po.summary.totalValue, 0);
  const deliveredValue = filteredPOs.reduce((sum, po) => sum + po.summary.deliveredValue, 0);

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">PO Output</h1>
            <p className="text-muted-foreground">
              Monitor hasil delivery dan performance purchase order dari supplier
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
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total POs</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(totalPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(deliveredPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partial</p>
                <p className="text-2xl font-bold text-orange-600">{formatNumber(partialPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold text-purple-600">{avgCompletion.toFixed(1)}%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value Rate</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {((deliveredValue / totalValue) * 100).toFixed(1)}%
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
                    placeholder="Cari PO number atau supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="partial">Partial</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Prioritas</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* PO Output List */}
        <div className="space-y-6">
          {filteredPOs.map((po) => (
            <Card key={po.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-xl">{po.poNumber}</span>
                      {getStatusBadge(po.status)}
                      {getPriorityBadge(po.priority)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supplier: {po.supplier.name} • Performance: {po.supplier.performance}% • 
                      Expected: {new Date(po.expectedDelivery).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-green-600">{formatCurrency(po.summary.deliveredValue)}</div>
                  <div className="text-sm text-muted-foreground">
                    of {formatCurrency(po.summary.totalValue)}
                  </div>
                </div>
              </div>

              {/* Progress and Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{po.summary.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{po.qualityMetrics.qualityScore}%</div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{po.performance.deliveryAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Delivery Accuracy</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {po.performance.onTimeDelivery ? 'On Time' : `+${po.performance.leadTimeVariance}d`}
                  </div>
                  <div className="text-sm text-muted-foreground">Delivery Performance</div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Delivery Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Method:</span> {po.delivery.method}</div>
                    <div><span className="font-medium">Carrier:</span> {po.delivery.carrier}</div>
                    {po.delivery.trackingNumber && (
                      <div><span className="font-medium">Tracking:</span> {po.delivery.trackingNumber}</div>
                    )}
                    <div><span className="font-medium">Location:</span> {po.delivery.location}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Financial Status
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Invoice Status:</span>
                      {getInvoiceStatusBadge(po.financials.invoiceStatus)}
                    </div>
                    <div><span className="font-medium">Payment Terms:</span> {po.financials.paymentTerms}</div>
                    {po.financials.discountApplied && (
                      <div className="text-green-600">
                        <span className="font-medium">Discount:</span> {po.financials.discountApplied}%
                      </div>
                    )}
                    {po.financials.penaltyApplied && (
                      <div className="text-red-600">
                        <span className="font-medium">Penalty:</span> {po.financials.penaltyApplied}%
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {po.alerts && po.alerts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Recent Updates</h4>
                  <div className="space-y-2">
                    {po.alerts.map((alert, index) => (
                      <div key={index} className={`flex items-center space-x-2 p-3 rounded-lg ${
                        alert.type === 'success' ? 'bg-green-50 text-green-700' :
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

              {/* Items Table */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Order Items ({po.items.length})</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedPO(expandedPO === po.id ? null : po.id)}
                  >
                    {expandedPO === po.id ? 'Hide Details' : 'Show Details'}
                  </Button>
                </div>
                
                {expandedPO === po.id && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expected</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivered</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">QC Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {po.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.sku}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">{formatNumber(item.expectedQuantity)}</td>
                            <td className="px-4 py-4 text-center">
                              <span className={
                                item.deliveredQuantity === item.expectedQuantity ? 'text-green-600 font-medium' :
                                item.deliveredQuantity === 0 ? 'text-gray-500' : 'text-orange-600 font-medium'
                              }>
                                {formatNumber(item.deliveredQuantity)}
                              </span>
                            </td>
                            <td className="px-4 py-4">{getConditionBadge(item.condition)}</td>
                            <td className="px-4 py-4">{getQCStatusBadge(item.qcStatus)}</td>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium">{formatCurrency(item.deliveredValue)}</div>
                                <div className="text-sm text-gray-500">of {formatCurrency(item.totalValue)}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm">{item.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Notes */}
              {po.notes && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-blue-700">{po.notes}</p>
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
                    <FileText className="h-4 w-4 mr-1" />
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule QC
                  </Button>
                  {po.delivery.trackingNumber && (
                    <Button variant="outline" size="sm">
                      <Truck className="h-4 w-4 mr-1" />
                      Track Shipment
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{po.supplier.contact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(deliveredValue)}
              </div>
              <div className="text-sm text-muted-foreground">Total Delivered Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {((deliveredValue / totalValue) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Value Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {filteredPOs.filter(po => po.performance.onTimeDelivery).length}
              </div>
              <div className="text-sm text-muted-foreground">On-Time Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {filteredPOs.reduce((sum, po) => sum + po.qualityMetrics.qualityScore, 0) / filteredPOs.length}%
              </div>
              <div className="text-sm text-muted-foreground">Average Quality Score</div>
            </div>
          </div>
        </Card>
      </div>
    
  );
}
