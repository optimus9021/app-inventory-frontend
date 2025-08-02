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
  Calendar,
  CheckCircle,
  AlertTriangle,
  Package,
  Truck,
  Building,
  BarChart3,
  Eye,
  RefreshCw,
  Edit,
  Plus,
  FileText,
  Activity,
  Target,
  Play,
  Send,
  Zap,
  TrendingUp,
  MapPin,
  DollarSign
} from 'lucide-react';

interface ReleaseSchedule {
  id: string;
  releaseNumber: string;
  supplier: {
    name: string;
    code: string;
    contact: string;
    location: string;
    rating: number;
  };
  blanketOrder: {
    poNumber: string;
    totalQuantity: number;
    totalValue: number;
    validFrom: string;
    validTo: string;
    remainingQuantity: number;
    remainingValue: number;
  };
  currentRelease: {
    releaseNumber: number;
    quantity: number;
    value: number;
    requestedDate: string;
    requiredDate: string;
    scheduledDate: string;
    confirmedDate?: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'draft' | 'sent' | 'confirmed' | 'in-production' | 'ready' | 'shipped' | 'delivered' | 'cancelled';
  };
  items: ReleaseItem[];
  delivery: {
    method: string;
    address: string;
    contact: string;
    specialInstructions?: string;
    trackingInfo?: {
      carrier: string;
      trackingNumber: string;
      estimatedDelivery: string;
    };
  };
  compliance: {
    approvalRequired: boolean;
    approvedBy?: string;
    approvalDate?: string;
    budgetApproval: boolean;
    technicalApproval: boolean;
    qualityApproval: boolean;
  };
  forecast: {
    nextReleaseDate: string;
    estimatedQuantity: number;
    planningHorizon: number; // weeks
    seasonalFactor: number;
  };
  performance: {
    onTimeDeliveryRate: number;
    qualityScore: number;
    communicationRating: number;
    overallRating: number;
  };
  automation: {
    autoReleaseEnabled: boolean;
    triggerCondition: string;
    minStockLevel?: number;
    releaseFrequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'ondemand';
  };
  alerts?: Alert[];
  notes?: string;
}

interface ReleaseItem {
  id: string;
  name: string;
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications?: string;
  deliveryDate: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'ready' | 'shipped' | 'delivered';
}

interface Alert {
  type: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
}

const mockReleaseSchedules: ReleaseSchedule[] = [
  {
    id: '1',
    releaseNumber: 'REL-2025-001',
    supplier: {
      name: 'PT Electronics Supplier',
      code: 'SUP-ELEC-001',
      contact: 'orders@electronics-sup.com',
      location: 'Jakarta, Indonesia',
      rating: 4.5
    },
    blanketOrder: {
      poNumber: 'BPO-2025-001',
      totalQuantity: 10000,
      totalValue: 5000000000,
      validFrom: '2025-01-01T00:00:00Z',
      validTo: '2025-12-31T23:59:59Z',
      remainingQuantity: 7500,
      remainingValue: 3750000000
    },
    currentRelease: {
      releaseNumber: 3,
      quantity: 500,
      value: 250000000,
      requestedDate: '2025-02-15T00:00:00Z',
      requiredDate: '2025-02-28T00:00:00Z',
      scheduledDate: '2025-02-25T00:00:00Z',
      confirmedDate: '2025-02-16T00:00:00Z',
      priority: 'high',
      status: 'confirmed'
    },
    items: [
      {
        id: '1',
        name: 'Smartphone Component A',
        sku: 'SCA-001',
        description: 'High-quality processor chip',
        quantity: 300,
        unitPrice: 400000,
        totalPrice: 120000000,
        specifications: 'ARM Cortex A78, 5nm process',
        deliveryDate: '2025-02-25T00:00:00Z',
        status: 'confirmed'
      },
      {
        id: '2',
        name: 'Smartphone Component B',
        sku: 'SCB-001',
        description: 'Memory module 8GB',
        quantity: 200,
        unitPrice: 650000,
        totalPrice: 130000000,
        specifications: 'LPDDR5, 8GB capacity',
        deliveryDate: '2025-02-25T00:00:00Z',
        status: 'confirmed'
      }
    ],
    delivery: {
      method: 'Express Delivery',
      address: 'Jl. Industri No. 123, Jakarta Timur',
      contact: 'Warehouse Manager (+62-21-1234567)',
      specialInstructions: 'Handle with care - sensitive electronic components',
      trackingInfo: {
        carrier: 'PT Express Logistics',
        trackingNumber: 'EXP-2025-0216-001',
        estimatedDelivery: '2025-02-25T14:00:00Z'
      }
    },
    compliance: {
      approvalRequired: true,
      approvedBy: 'Manager Procurement',
      approvalDate: '2025-02-16T10:30:00Z',
      budgetApproval: true,
      technicalApproval: true,
      qualityApproval: true
    },
    forecast: {
      nextReleaseDate: '2025-03-15T00:00:00Z',
      estimatedQuantity: 600,
      planningHorizon: 12,
      seasonalFactor: 1.2
    },
    performance: {
      onTimeDeliveryRate: 92,
      qualityScore: 95,
      communicationRating: 88,
      overallRating: 91
    },
    automation: {
      autoReleaseEnabled: true,
      triggerCondition: 'Stock level below 100 units',
      minStockLevel: 100,
      releaseFrequency: 'monthly'
    },
    alerts: [
      {
        type: 'info',
        message: 'Release confirmed by supplier - production scheduled',
        timestamp: '2025-02-16T11:00:00Z'
      }
    ],
    notes: 'High priority release for upcoming product launch'
  },
  {
    id: '2',
    releaseNumber: 'REL-2025-002',
    supplier: {
      name: 'CV Manufacturing Partner',
      code: 'SUP-MFG-002',
      contact: 'production@mfgpartner.com',
      location: 'Surabaya, Indonesia',
      rating: 4.2
    },
    blanketOrder: {
      poNumber: 'BPO-2025-002',
      totalQuantity: 5000,
      totalValue: 1500000000,
      validFrom: '2025-01-01T00:00:00Z',
      validTo: '2025-12-31T23:59:59Z',
      remainingQuantity: 3200,
      remainingValue: 960000000
    },
    currentRelease: {
      releaseNumber: 2,
      quantity: 300,
      value: 90000000,
      requestedDate: '2025-02-10T00:00:00Z',
      requiredDate: '2025-03-05T00:00:00Z',
      scheduledDate: '2025-03-01T00:00:00Z',
      priority: 'medium',
      status: 'sent'
    },
    items: [
      {
        id: '3',
        name: 'Industrial Bracket Set',
        sku: 'IBS-001',
        description: 'Steel mounting bracket assembly',
        quantity: 300,
        unitPrice: 300000,
        totalPrice: 90000000,
        specifications: 'Galvanized steel, load capacity 50kg',
        deliveryDate: '2025-03-01T00:00:00Z',
        status: 'pending'
      }
    ],
    delivery: {
      method: 'Standard Freight',
      address: 'Kawasan Industri Surabaya, Blok A-15',
      contact: 'Site Manager (+62-31-7654321)'
    },
    compliance: {
      approvalRequired: false,
      budgetApproval: true,
      technicalApproval: true,
      qualityApproval: false
    },
    forecast: {
      nextReleaseDate: '2025-04-01T00:00:00Z',
      estimatedQuantity: 400,
      planningHorizon: 8,
      seasonalFactor: 1.0
    },
    performance: {
      onTimeDeliveryRate: 78,
      qualityScore: 85,
      communicationRating: 72,
      overallRating: 78
    },
    automation: {
      autoReleaseEnabled: false,
      triggerCondition: 'Manual approval required',
      releaseFrequency: 'quarterly'
    },
    alerts: [
      {
        type: 'warning',
        message: 'Waiting for supplier confirmation - follow up required',
        timestamp: '2025-02-14T09:00:00Z'
      }
    ]
  },
  {
    id: '3',
    releaseNumber: 'REL-2025-003',
    supplier: {
      name: 'PT Furniture Craftsman',
      code: 'SUP-FUR-003',
      contact: 'orders@furniturecraft.com',
      location: 'Jepara, Indonesia',
      rating: 4.8
    },
    blanketOrder: {
      poNumber: 'BPO-2025-003',
      totalQuantity: 200,
      totalValue: 600000000,
      validFrom: '2025-01-01T00:00:00Z',
      validTo: '2025-12-31T23:59:59Z',
      remainingQuantity: 150,
      remainingValue: 450000000
    },
    currentRelease: {
      releaseNumber: 1,
      quantity: 25,
      value: 75000000,
      requestedDate: '2025-02-20T00:00:00Z',
      requiredDate: '2025-03-20T00:00:00Z',
      scheduledDate: '2025-03-15T00:00:00Z',
      confirmedDate: '2025-02-21T00:00:00Z',
      priority: 'low',
      status: 'in-production'
    },
    items: [
      {
        id: '4',
        name: 'Executive Desk Premium',
        sku: 'EDP-001',
        description: 'Handcrafted mahogany executive desk',
        quantity: 25,
        unitPrice: 3000000,
        totalPrice: 75000000,
        specifications: 'Mahogany wood, 180x90x75cm, leather inlay',
        deliveryDate: '2025-03-15T00:00:00Z',
        status: 'in-production'
      }
    ],
    delivery: {
      method: 'Specialized Furniture Transport',
      address: 'Office Complex Jakarta, Tower A Floor 15',
      contact: 'Facilities Manager (+62-21-9876543)',
      specialInstructions: 'Assembly service required, coordinate with building management'
    },
    compliance: {
      approvalRequired: true,
      approvedBy: 'Director Operations',
      approvalDate: '2025-02-20T16:45:00Z',
      budgetApproval: true,
      technicalApproval: true,
      qualityApproval: true
    },
    forecast: {
      nextReleaseDate: '2025-05-01T00:00:00Z',
      estimatedQuantity: 30,
      planningHorizon: 16,
      seasonalFactor: 0.8
    },
    performance: {
      onTimeDeliveryRate: 96,
      qualityScore: 98,
      communicationRating: 94,
      overallRating: 96
    },
    automation: {
      autoReleaseEnabled: false,
      triggerCondition: 'Custom orders only',
      releaseFrequency: 'ondemand'
    },
    alerts: [
      {
        type: 'info',
        message: 'Production started - craftsmanship in progress',
        timestamp: '2025-02-22T08:00:00Z'
      }
    ],
    notes: 'Custom furniture order with specific design requirements'
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
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    case 'sent':
      return <Badge className="bg-blue-100 text-blue-800">Sent</Badge>;
    case 'confirmed':
      return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
    case 'in-production':
      return <Badge className="bg-purple-100 text-purple-800">In Production</Badge>;
    case 'ready':
      return <Badge className="bg-cyan-100 text-cyan-800">Ready</Badge>;
    case 'shipped':
      return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
    case 'delivered':
      return <Badge className="bg-emerald-100 text-emerald-800">Delivered</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
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

const getItemStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'confirmed':
      return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
    case 'in-production':
      return <Badge className="bg-purple-100 text-purple-800">In Production</Badge>;
    case 'ready':
      return <Badge className="bg-cyan-100 text-cyan-800">Ready</Badge>;
    case 'shipped':
      return <Badge className="bg-indigo-100 text-indigo-800">Shipped</Badge>;
    case 'delivered':
      return <Badge className="bg-emerald-100 text-emerald-800">Delivered</Badge>;
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

const getRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  if (hasHalfStar) {
    stars.push('☆');
  }
  while (stars.length < 5) {
    stars.push('☆');
  }
  
  return stars.join('');
};

export default function ReleaseSchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedRelease, setExpandedRelease] = useState<string | null>(null);

  const filteredReleases = mockReleaseSchedules.filter(release => {
    const matchesSearch = 
      release.releaseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.blanketOrder.poNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || release.currentRelease.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || release.currentRelease.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalReleases = filteredReleases.length;
  const confirmedReleases = filteredReleases.filter(r => r.currentRelease.status === 'confirmed').length;
  const inProductionReleases = filteredReleases.filter(r => r.currentRelease.status === 'in-production').length;
  const totalValue = filteredReleases.reduce((sum, r) => sum + r.currentRelease.value, 0);
  const avgRating = filteredReleases.reduce((sum, r) => sum + r.performance.overallRating, 0) / filteredReleases.length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Release Schedule</h1>
            <p className="text-muted-foreground">
              Management jadwal release untuk blanket purchase orders dan supplier scheduling
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Release
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Schedule
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
                <p className="text-sm font-medium text-muted-foreground">Active Releases</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(totalReleases)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(confirmedReleases)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Play className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Production</p>
                <p className="text-2xl font-bold text-purple-600">{formatNumber(inProductionReleases)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-xl font-bold text-emerald-600">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold text-orange-600">{avgRating.toFixed(1)}%</p>
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
                    placeholder="Cari release number, supplier, atau PO..."
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
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-production">In Production</option>
                  <option value="ready">Ready</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
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

        {/* Release Schedule List */}
        <div className="space-y-6">
          {filteredReleases.map((release) => (
            <Card key={release.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-xl">{release.releaseNumber}</span>
                      {getStatusBadge(release.currentRelease.status)}
                      {getPriorityBadge(release.currentRelease.priority)}
                      <Badge variant="outline">Release #{release.currentRelease.releaseNumber}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supplier: {release.supplier.name} • Blanket PO: {release.blanketOrder.poNumber} • 
                      Rating: {getRatingStars(release.supplier.rating)} ({release.supplier.rating})
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-green-600">{formatCurrency(release.currentRelease.value)}</div>
                  <div className="text-sm text-muted-foreground">
                    Qty: {formatNumber(release.currentRelease.quantity)}
                  </div>
                </div>
              </div>

              {/* Key Dates */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Requested</div>
                  <div className="text-lg font-bold text-blue-600">
                    {new Date(release.currentRelease.requestedDate).toLocaleDateString('id-ID')}
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Required</div>
                  <div className="text-lg font-bold text-orange-600">
                    {new Date(release.currentRelease.requiredDate).toLocaleDateString('id-ID')}
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Scheduled</div>
                  <div className="text-lg font-bold text-purple-600">
                    {new Date(release.currentRelease.scheduledDate).toLocaleDateString('id-ID')}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Confirmed</div>
                  <div className="text-lg font-bold text-green-600">
                    {release.currentRelease.confirmedDate ? 
                      new Date(release.currentRelease.confirmedDate).toLocaleDateString('id-ID') :
                      'Pending'
                    }
                  </div>
                </div>
              </div>

              {/* Blanket Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Blanket Order Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Quantity:</span>
                      <span className="font-medium">{formatNumber(release.blanketOrder.totalQuantity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value:</span>
                      <span className="font-medium">{formatCurrency(release.blanketOrder.totalValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Qty:</span>
                      <span className="font-medium text-blue-600">{formatNumber(release.blanketOrder.remainingQuantity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Value:</span>
                      <span className="font-medium text-blue-600">{formatCurrency(release.blanketOrder.remainingValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Valid Period:</span>
                      <span className="font-medium text-xs">
                        {new Date(release.blanketOrder.validFrom).toLocaleDateString('id-ID')} - 
                        {new Date(release.blanketOrder.validTo).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>On-Time Rate:</span>
                      <span className="font-medium text-green-600">{release.performance.onTimeDeliveryRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality Score:</span>
                      <span className="font-medium text-blue-600">{release.performance.qualityScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communication:</span>
                      <span className="font-medium text-purple-600">{release.performance.communicationRating}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overall Rating:</span>
                      <span className="font-medium text-emerald-600">{release.performance.overallRating}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Delivery Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Delivery Address:</span>
                    </div>
                    <p className="text-gray-600 ml-6">{release.delivery.address}</p>
                    <p className="text-gray-600 ml-6">{release.delivery.contact}</p>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-medium">Method:</span> {release.delivery.method}
                    </div>
                    {release.delivery.trackingInfo && (
                      <div>
                        <div><span className="font-medium">Carrier:</span> {release.delivery.trackingInfo.carrier}</div>
                        <div><span className="font-medium">Tracking:</span> {release.delivery.trackingInfo.trackingNumber}</div>
                        <div><span className="font-medium">Est. Delivery:</span> {new Date(release.delivery.trackingInfo.estimatedDelivery).toLocaleString('id-ID')}</div>
                      </div>
                    )}
                  </div>
                </div>
                {release.delivery.specialInstructions && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded">
                    <span className="font-medium text-yellow-800">Special Instructions:</span>
                    <p className="text-yellow-700 text-sm mt-1">{release.delivery.specialInstructions}</p>
                  </div>
                )}
              </div>

              {/* Compliance & Approval */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Compliance & Approval
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Approval Required:</span>
                      <Badge className={release.compliance.approvalRequired ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}>
                        {release.compliance.approvalRequired ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    {release.compliance.approvedBy && (
                      <>
                        <div className="flex justify-between">
                          <span>Approved By:</span>
                          <span className="font-medium">{release.compliance.approvedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Approval Date:</span>
                          <span className="font-medium">{new Date(release.compliance.approvalDate!).toLocaleDateString('id-ID')}</span>
                        </div>
                      </>
                    )}
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="text-center">
                        <div className={`text-xs ${release.compliance.budgetApproval ? 'text-green-600' : 'text-red-600'}`}>
                          {release.compliance.budgetApproval ? '✓' : '✗'} Budget
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xs ${release.compliance.technicalApproval ? 'text-green-600' : 'text-red-600'}`}>
                          {release.compliance.technicalApproval ? '✓' : '✗'} Technical
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xs ${release.compliance.qualityApproval ? 'text-green-600' : 'text-red-600'}`}>
                          {release.compliance.qualityApproval ? '✓' : '✗'} Quality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Automation & Forecast
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Auto Release:</span>
                      <Badge className={release.automation.autoReleaseEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {release.automation.autoReleaseEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Frequency:</span>
                      <span className="font-medium">{release.automation.releaseFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Release:</span>
                      <span className="font-medium text-blue-600">
                        {new Date(release.forecast.nextReleaseDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Quantity:</span>
                      <span className="font-medium text-purple-600">{formatNumber(release.forecast.estimatedQuantity)}</span>
                    </div>
                    {release.automation.minStockLevel && (
                      <div className="flex justify-between">
                        <span>Min Stock Level:</span>
                        <span className="font-medium text-orange-600">{release.automation.minStockLevel}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {release.alerts && release.alerts.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Recent Alerts</h4>
                  <div className="space-y-2">
                    {release.alerts.map((alert, index) => (
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

              {/* Items Detail */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Release Items ({release.items.length})</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedRelease(expandedRelease === release.id ? null : release.id)}
                  >
                    {expandedRelease === release.id ? 'Hide Items' : 'Show Items'}
                  </Button>
                </div>
                
                {expandedRelease === release.id && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {release.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.sku}</div>
                                {item.specifications && (
                                  <div className="text-xs text-gray-400 mt-1">{item.specifications}</div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">{formatNumber(item.quantity)}</td>
                            <td className="px-4 py-4">{formatCurrency(item.unitPrice)}</td>
                            <td className="px-4 py-4 font-medium">{formatCurrency(item.totalPrice)}</td>
                            <td className="px-4 py-4 text-sm">
                              {new Date(item.deliveryDate).toLocaleDateString('id-ID')}
                            </td>
                            <td className="px-4 py-4">{getItemStatusBadge(item.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Notes */}
              {release.notes && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm text-blue-700">{release.notes}</p>
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
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Release
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Send to Supplier
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Generate Report
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{release.supplier.contact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Release Schedule Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatCurrency(totalValue)}
              </div>
              <div className="text-sm text-muted-foreground">Total Release Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {((confirmedReleases / totalReleases) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Confirmation Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {avgRating.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {filteredReleases.filter(r => r.automation.autoReleaseEnabled).length}
              </div>
              <div className="text-sm text-muted-foreground">Automated Releases</div>
            </div>
          </div>
        </Card>
      </div>
    
  );
}
