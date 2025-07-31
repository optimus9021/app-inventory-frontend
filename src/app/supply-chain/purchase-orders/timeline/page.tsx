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
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  Building,
  Eye,
  Edit,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  PlayCircle,
  PauseCircle,
  RefreshCw
} from 'lucide-react';

interface POTimeline {
  id: string;
  poNumber: string;
  supplier: {
    name: string;
    contact: string;
  };
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'production' | 'shipping' | 'delivered' | 'completed' | 'cancelled' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  totalValue: number;
  itemCount: number;
  timeline: TimelineEvent[];
  estimatedCompletion: string;
  actualCompletion?: string;
  delayDays: number;
  completionPercentage: number;
  nextMilestone?: string;
  nextMilestoneDate?: string;
  riskLevel: 'low' | 'medium' | 'high';
  createdDate: string;
  lastUpdated: string;
}

interface TimelineEvent {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed' | 'cancelled';
  estimatedDate: string;
  actualDate?: string;
  duration: number; // in days
  assignedTo: string;
  dependencies?: string[];
  notes?: string;
  attachments?: string[];
  alerts?: Alert[];
}

interface Alert {
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

const mockPOTimelines: POTimeline[] = [
  {
    id: '1',
    poNumber: 'PO-PRD-2025-001',
    supplier: {
      name: 'PT Supplier Utama',
      contact: 'supplier@utama.com'
    },
    status: 'production',
    priority: 'high',
    totalValue: 50000000,
    itemCount: 2,
    timeline: [
      {
        id: '1',
        phase: 'Planning',
        title: 'PO Creation',
        description: 'Purchase order created and reviewed',
        status: 'completed',
        estimatedDate: '2025-01-29T00:00:00Z',
        actualDate: '2025-01-29T14:20:00Z',
        duration: 1,
        assignedTo: 'Procurement Team',
        notes: 'PO created based on demand forecast'
      },
      {
        id: '2',
        phase: 'Approval',
        title: 'PO Approval',
        description: 'Management approval for purchase order',
        status: 'completed',
        estimatedDate: '2025-01-30T00:00:00Z',
        actualDate: '2025-01-30T10:30:00Z',
        duration: 1,
        assignedTo: 'Manager Procurement',
        notes: 'Approved with minor adjustments'
      },
      {
        id: '3',
        phase: 'Ordering',
        title: 'Order Confirmation',
        description: 'Supplier confirms order and delivery schedule',
        status: 'completed',
        estimatedDate: '2025-01-31T00:00:00Z',
        actualDate: '2025-01-31T09:15:00Z',
        duration: 1,
        assignedTo: 'Supplier',
        notes: 'Confirmed with 2-week lead time'
      },
      {
        id: '4',
        phase: 'Production',
        title: 'Manufacturing',
        description: 'Product manufacturing and quality control',
        status: 'in-progress',
        estimatedDate: '2025-02-10T00:00:00Z',
        duration: 10,
        assignedTo: 'Supplier Production Team',
        alerts: [
          {
            type: 'info',
            message: 'Production started on schedule',
            timestamp: '2025-02-01T08:00:00Z'
          }
        ]
      },
      {
        id: '5',
        phase: 'Quality Control',
        title: 'QC Inspection',
        description: 'Quality inspection and testing',
        status: 'pending',
        estimatedDate: '2025-02-11T00:00:00Z',
        duration: 1,
        assignedTo: 'QC Team',
        dependencies: ['4']
      },
      {
        id: '6',
        phase: 'Shipping',
        title: 'Logistics & Delivery',
        description: 'Product packaging and shipment',
        status: 'pending',
        estimatedDate: '2025-02-15T00:00:00Z',
        duration: 3,
        assignedTo: 'Logistics Team',
        dependencies: ['5']
      }
    ],
    estimatedCompletion: '2025-02-15T00:00:00Z',
    delayDays: 0,
    completionPercentage: 60,
    nextMilestone: 'QC Inspection',
    nextMilestoneDate: '2025-02-11T00:00:00Z',
    riskLevel: 'low',
    createdDate: '2025-01-29T14:20:00Z',
    lastUpdated: '2025-02-01T08:00:00Z'
  },
  {
    id: '2',
    poNumber: 'PO-PRD-2025-002',
    supplier: {
      name: 'CV Elektronik Jaya',
      contact: 'sales@elektronikjaya.com'
    },
    status: 'delayed',
    priority: 'urgent',
    totalValue: 83250000,
    itemCount: 1,
    timeline: [
      {
        id: '7',
        phase: 'Planning',
        title: 'Urgent PO Creation',
        description: 'Emergency purchase order for product launch',
        status: 'completed',
        estimatedDate: '2025-01-29T00:00:00Z',
        actualDate: '2025-01-29T09:15:00Z',
        duration: 1,
        assignedTo: 'Lead Product Manager'
      },
      {
        id: '8',
        phase: 'Approval',
        title: 'Fast Track Approval',
        description: 'Director approval for urgent order',
        status: 'completed',
        estimatedDate: '2025-01-29T00:00:00Z',
        actualDate: '2025-01-29T11:00:00Z',
        duration: 1,
        assignedTo: 'Director'
      },
      {
        id: '9',
        phase: 'Production',
        title: 'Priority Manufacturing',
        description: 'Expedited production for urgent delivery',
        status: 'delayed',
        estimatedDate: '2025-02-05T00:00:00Z',
        duration: 7,
        assignedTo: 'Supplier Production',
        alerts: [
          {
            type: 'error',
            message: 'Production delayed due to component shortage',
            timestamp: '2025-02-03T14:30:00Z'
          },
          {
            type: 'warning',
            message: 'New estimated completion: Feb 12',
            timestamp: '2025-02-04T10:00:00Z'
          }
        ]
      },
      {
        id: '10',
        phase: 'Shipping',
        title: 'Express Delivery',
        description: 'Same-day shipping after production',
        status: 'pending',
        estimatedDate: '2025-02-12T00:00:00Z',
        duration: 1,
        assignedTo: 'Express Logistics',
        dependencies: ['9']
      }
    ],
    estimatedCompletion: '2025-02-12T00:00:00Z',
    delayDays: 7,
    completionPercentage: 45,
    nextMilestone: 'Priority Manufacturing',
    nextMilestoneDate: '2025-02-12T00:00:00Z',
    riskLevel: 'high',
    createdDate: '2025-01-29T09:15:00Z',
    lastUpdated: '2025-02-04T10:00:00Z'
  },
  {
    id: '3',
    poNumber: 'PO-PRD-2025-003',
    supplier: {
      name: 'PT Furniture Modern',
      contact: 'order@furnituremodern.com'
    },
    status: 'delivered',
    priority: 'medium',
    totalValue: 67000000,
    itemCount: 1,
    timeline: [
      {
        id: '11',
        phase: 'Planning',
        title: 'Furniture Order Planning',
        description: 'Custom furniture order specification',
        status: 'completed',
        estimatedDate: '2025-01-28T00:00:00Z',
        actualDate: '2025-01-28T13:30:00Z',
        duration: 1,
        assignedTo: 'Sales Representative'
      },
      {
        id: '12',
        phase: 'Production',
        title: 'Custom Manufacturing',
        description: 'Handcrafted furniture production',
        status: 'completed',
        estimatedDate: '2025-02-15T00:00:00Z',
        actualDate: '2025-02-10T00:00:00Z',
        duration: 14,
        assignedTo: 'Craftsman Team',
        notes: 'Completed 5 days ahead of schedule'
      },
      {
        id: '13',
        phase: 'Shipping',
        title: 'Partial Delivery',
        description: 'First batch of 12 units delivered',
        status: 'completed',
        estimatedDate: '2025-02-20T00:00:00Z',
        actualDate: '2025-02-15T00:00:00Z',
        duration: 2,
        assignedTo: 'Delivery Team',
        notes: 'Remaining 8 units scheduled for next week'
      }
    ],
    estimatedCompletion: '2025-02-25T00:00:00Z',
    actualCompletion: '2025-02-15T00:00:00Z',
    delayDays: -10,
    completionPercentage: 100,
    riskLevel: 'low',
    createdDate: '2025-01-28T13:30:00Z',
    lastUpdated: '2025-02-15T16:45:00Z'
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
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'approved':
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    case 'ordered':
      return <Badge className="bg-blue-100 text-blue-800">Ordered</Badge>;
    case 'production':
      return <Badge className="bg-purple-100 text-purple-800">Production</Badge>;
    case 'shipping':
      return <Badge className="bg-indigo-100 text-indigo-800">Shipping</Badge>;
    case 'delivered':
      return <Badge className="bg-cyan-100 text-cyan-800">Delivered</Badge>;
    case 'completed':
      return <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    case 'delayed':
      return <Badge className="bg-orange-100 text-orange-800">Delayed</Badge>;
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

const getEventStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in-progress':
      return <PlayCircle className="h-5 w-5 text-blue-600" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-gray-400" />;
    case 'delayed':
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    case 'cancelled':
      return <PauseCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};

const getAlertIcon = (type: string) => {
  switch (type) {
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

export default function POTimelinePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');

  const filteredPOs = mockPOTimelines.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || po.priority === selectedPriority;
    const matchesRisk = selectedRisk === 'all' || po.riskLevel === selectedRisk;
    return matchesSearch && matchesStatus && matchesPriority && matchesRisk;
  });

  const totalPOs = filteredPOs.length;
  const onTimePOs = filteredPOs.filter(po => po.delayDays <= 0).length;
  const delayedPOs = filteredPOs.filter(po => po.delayDays > 0).length;
  const avgProgress = filteredPOs.reduce((sum, po) => sum + po.completionPercentage, 0) / filteredPOs.length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">PO Timeline</h1>
            <p className="text-muted-foreground">
              Monitor progress dan timeline purchase order dari creation hingga delivery
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Timeline
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active POs</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(totalPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(onTimePOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-red-600">{formatNumber(delayedPOs)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{avgProgress.toFixed(1)}%</p>
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
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="ordered">Ordered</option>
                  <option value="production">Production</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delayed">Delayed</option>
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
                <select
                  value={selectedRisk}
                  onChange={(e) => setSelectedRisk(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Risk Level</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* PO Timeline List */}
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
                      {getRiskBadge(po.riskLevel)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supplier: {po.supplier.name} • Items: {po.itemCount} • 
                      Created: {new Date(po.createdDate).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-green-600">{formatCurrency(po.totalValue)}</div>
                  <div className="text-sm text-muted-foreground">
                    {po.delayDays > 0 ? (
                      <span className="text-red-600">+{po.delayDays} days delay</span>
                    ) : po.delayDays < 0 ? (
                      <span className="text-green-600">{Math.abs(po.delayDays)} days early</span>
                    ) : (
                      <span className="text-blue-600">On schedule</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span className="font-medium">{po.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      po.completionPercentage === 100 ? 'bg-green-500' :
                      po.delayDays > 0 ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${po.completionPercentage}%` }}
                  ></div>
                </div>
                {po.nextMilestone && (
                  <div className="text-sm text-muted-foreground mt-1">
                    Next: {po.nextMilestone} ({new Date(po.nextMilestoneDate!).toLocaleDateString('id-ID')})
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h4 className="font-semibold mb-4">Timeline Events</h4>
                <div className="space-y-4">
                  {po.timeline.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        {getEventStatusIcon(event.status)}
                        {index < po.timeline.length - 1 && (
                          <div className="w-px h-8 bg-gray-300 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium">{event.title}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {event.phase}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.actualDate ? 
                              new Date(event.actualDate).toLocaleDateString('id-ID') :
                              new Date(event.estimatedDate).toLocaleDateString('id-ID')
                            }
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Assigned to: {event.assignedTo}</span>
                          <span>Duration: {event.duration} days</span>
                          {event.status === 'completed' && event.actualDate && (
                            <span className="text-green-600">✓ Completed</span>
                          )}
                        </div>

                        {event.notes && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                            {event.notes}
                          </div>
                        )}

                        {event.alerts && event.alerts.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {event.alerts.map((alert, alertIndex) => (
                              <div key={alertIndex} className={`flex items-center space-x-2 p-2 rounded text-sm ${
                                alert.type === 'error' ? 'bg-red-50 text-red-700' :
                                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-blue-50 text-blue-700'
                              }`}>
                                {getAlertIcon(alert.type)}
                                <span>{alert.message}</span>
                                <span className="text-xs">
                                  {new Date(alert.timestamp).toLocaleString('id-ID')}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Completion</div>
                  <div className="font-medium">
                    {new Date(po.estimatedCompletion).toLocaleDateString('id-ID')}
                  </div>
                </div>
                {po.actualCompletion && (
                  <div>
                    <div className="text-sm text-muted-foreground">Actual Completion</div>
                    <div className="font-medium text-green-600">
                      {new Date(po.actualCompletion).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="font-medium">
                    {new Date(po.lastUpdated).toLocaleDateString('id-ID')}
                  </div>
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
                    <Edit className="h-4 w-4 mr-1" />
                    Update Timeline
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Export Timeline
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule Meeting
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">{po.supplier.contact}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Timeline Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {((onTimePOs / totalPOs) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">On-Time Performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {avgProgress.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Completion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {filteredPOs.filter(po => po.riskLevel === 'low').length}
              </div>
              <div className="text-sm text-muted-foreground">Low Risk POs</div>
            </div>
          </div>
        </Card>
      </div>
    
  );
}
