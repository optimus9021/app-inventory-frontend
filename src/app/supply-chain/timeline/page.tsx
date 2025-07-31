'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Search, 
  Plus, 
  Eye,
  Calendar,
  Truck,
  Package,
  CheckCircle,
  AlertTriangle,
  MapPin,
  User,
  Building,
  Download,
  Filter,
  BarChart3,
  Timer
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  eventType: 'order-created' | 'order-approved' | 'production-start' | 'production-complete' | 'shipment-start' | 'in-transit' | 'customs-clearance' | 'delivered' | 'received' | 'quality-check' | 'stock-in';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  responsibleParty: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed' | 'cancelled';
  duration?: number; // in hours
  documents?: string[];
  notes?: string;
}

interface SupplyChainTimeline {
  id: string;
  orderNumber: string;
  supplierName: string;
  supplierCode: string;
  productCategory: string;
  totalItems: number;
  totalValue: number;
  currency: string;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  currentStatus: string;
  completionPercentage: number;
  leadTime: number; // in days
  delayDays?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  events: TimelineEvent[];
}

const mockSupplyChainTimelines: SupplyChainTimeline[] = [
  {
    id: '1',
    orderNumber: 'PO-2025-001',
    supplierName: 'PT Supplier Fashion Jakarta',
    supplierCode: 'SUP-001',
    productCategory: 'Fashion',
    totalItems: 5,
    totalValue: 125000000,
    currency: 'IDR',
    orderDate: '2025-01-10',
    expectedDelivery: '2025-01-25',
    actualDelivery: '2025-01-26',
    currentStatus: 'Delivered',
    completionPercentage: 100,
    leadTime: 16,
    delayDays: 1,
    priority: 'high',
    events: [
      {
        id: '1-1',
        eventType: 'order-created',
        title: 'Purchase Order Created',
        description: 'PO dibuat oleh purchasing team',
        timestamp: '2025-01-10 09:00',
        location: 'Jakarta Office',
        responsibleParty: 'Purchasing Manager',
        status: 'completed',
        duration: 2,
        documents: ['PO-2025-001.pdf']
      },
      {
        id: '1-2',
        eventType: 'order-approved',
        title: 'Order Approved',
        description: 'PO disetujui oleh management',
        timestamp: '2025-01-10 14:30',
        location: 'Jakarta Office',
        responsibleParty: 'Operations Director',
        status: 'completed',
        duration: 1,
        documents: ['Approval-001.pdf']
      },
      {
        id: '1-3',
        eventType: 'production-start',
        title: 'Production Started',
        description: 'Supplier memulai produksi',
        timestamp: '2025-01-12 08:00',
        location: 'Supplier Factory',
        responsibleParty: 'Production Manager',
        status: 'completed',
        duration: 48,
        notes: 'Produksi dimulai sesuai jadwal'
      },
      {
        id: '1-4',
        eventType: 'production-complete',
        title: 'Production Completed',
        description: 'Produksi selesai dan siap kirim',
        timestamp: '2025-01-14 16:00',
        location: 'Supplier Factory',
        responsibleParty: 'QC Team',
        status: 'completed',
        duration: 8,
        documents: ['QC-Report-001.pdf']
      },
      {
        id: '1-5',
        eventType: 'shipment-start',
        title: 'Shipment Started',
        description: 'Barang mulai dikirim dari supplier',
        timestamp: '2025-01-15 10:00',
        location: 'Supplier Warehouse',
        responsibleParty: 'Logistics Team',
        status: 'completed',
        duration: 4,
        documents: ['Shipping-Doc-001.pdf']
      },
      {
        id: '1-6',
        eventType: 'delivered',
        title: 'Goods Delivered',
        description: 'Barang tiba di warehouse',
        timestamp: '2025-01-26 13:30',
        location: 'Main Warehouse',
        responsibleParty: 'Warehouse Manager',
        status: 'completed',
        duration: 6,
        notes: 'Delivery terlambat 1 hari dari jadwal'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'PO-2025-002',
    supplierName: 'CV Elektronik Nusantara',
    supplierCode: 'SUP-002',
    productCategory: 'Elektronik',
    totalItems: 3,
    totalValue: 225000000,
    currency: 'IDR',
    orderDate: '2025-01-12',
    expectedDelivery: '2025-01-27',
    currentStatus: 'In Transit',
    completionPercentage: 75,
    leadTime: 15,
    priority: 'medium',
    events: [
      {
        id: '2-1',
        eventType: 'order-created',
        title: 'Purchase Order Created',
        description: 'PO dibuat untuk produk elektronik',
        timestamp: '2025-01-12 10:30',
        location: 'Jakarta Office',
        responsibleParty: 'Inventory Manager',
        status: 'completed',
        duration: 3
      },
      {
        id: '2-2',
        eventType: 'order-approved',
        title: 'Order Approved',
        description: 'PO disetujui untuk eksekusi',
        timestamp: '2025-01-12 16:00',
        location: 'Jakarta Office',
        responsibleParty: 'Purchasing Director',
        status: 'completed',
        duration: 1
      },
      {
        id: '2-3',
        eventType: 'production-start',
        title: 'Production Started',
        description: 'Supplier mulai menyiapkan barang',
        timestamp: '2025-01-14 09:00',
        location: 'Supplier Facility',
        responsibleParty: 'Production Team',
        status: 'completed',
        duration: 72
      },
      {
        id: '2-4',
        eventType: 'shipment-start',
        title: 'Shipment In Progress',
        description: 'Barang dalam perjalanan',
        timestamp: '2025-01-17 11:00',
        location: 'In Transit',
        responsibleParty: 'Logistics Partner',
        status: 'in-progress',
        notes: 'Expected arrival 27 Jan 2025'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'PO-2025-003',
    supplierName: 'PT Tekstil Modern',
    supplierCode: 'SUP-003',
    productCategory: 'Fashion',
    totalItems: 4,
    totalValue: 90000000,
    currency: 'IDR',
    orderDate: '2025-01-08',
    expectedDelivery: '2025-01-22',
    currentStatus: 'Production Delay',
    completionPercentage: 40,
    leadTime: 14,
    delayDays: 3,
    priority: 'low',
    events: [
      {
        id: '3-1',
        eventType: 'order-created',
        title: 'Purchase Order Created',
        description: 'PO untuk produk tekstil',
        timestamp: '2025-01-08 14:00',
        location: 'Jakarta Office',
        responsibleParty: 'Category Manager',
        status: 'completed',
        duration: 2
      },
      {
        id: '3-2',
        eventType: 'order-approved',
        title: 'Order Approved',
        description: 'PO mendapat persetujuan',
        timestamp: '2025-01-09 09:30',
        location: 'Jakarta Office',
        responsibleParty: 'Operations Manager',
        status: 'completed',
        duration: 1
      },
      {
        id: '3-3',
        eventType: 'production-start',
        title: 'Production Delayed',
        description: 'Produksi mengalami keterlambatan',
        timestamp: '2025-01-11 10:00',
        location: 'Supplier Factory',
        responsibleParty: 'Production Manager',
        status: 'delayed',
        notes: 'Delay karena shortage bahan baku'
      }
    ]
  },
  {
    id: '4',
    orderNumber: 'PO-2025-004',
    supplierName: 'PT Aksesoris Premium',
    supplierCode: 'SUP-004',
    productCategory: 'Aksesoris',
    totalItems: 6,
    totalValue: 60000000,
    currency: 'IDR',
    orderDate: '2025-01-15',
    expectedDelivery: '2025-01-30',
    currentStatus: 'Order Processing',
    completionPercentage: 25,
    leadTime: 15,
    priority: 'medium',
    events: [
      {
        id: '4-1',
        eventType: 'order-created',
        title: 'Purchase Order Created',
        description: 'PO untuk aksesoris premium',
        timestamp: '2025-01-15 11:00',
        location: 'Jakarta Office',
        responsibleParty: 'Purchasing Staff',
        status: 'completed',
        duration: 2
      },
      {
        id: '4-2',
        eventType: 'order-approved',
        title: 'Waiting Approval',
        description: 'Menunggu persetujuan dari management',
        timestamp: '2025-01-15 15:30',
        location: 'Jakarta Office',
        responsibleParty: 'Purchasing Manager',
        status: 'pending',
        notes: 'Under review for budget approval'
      }
    ]
  }
];

const getEventIcon = (eventType: string) => {
  switch (eventType) {
    case 'order-created':
      return <Plus className="h-4 w-4" />;
    case 'order-approved':
      return <CheckCircle className="h-4 w-4" />;
    case 'production-start':
      return <BarChart3 className="h-4 w-4" />;
    case 'production-complete':
      return <Package className="h-4 w-4" />;
    case 'shipment-start':
      return <Truck className="h-4 w-4" />;
    case 'in-transit':
      return <MapPin className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'received':
      return <Package className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-100';
    case 'in-progress':
      return 'text-blue-600 bg-blue-100';
    case 'pending':
      return 'text-yellow-600 bg-yellow-100';
    case 'delayed':
      return 'text-red-600 bg-red-100';
    case 'cancelled':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'delayed':
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function SupplyChainTimelinePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const filteredTimelines = mockSupplyChainTimelines.filter(timeline => {
    const matchesSearch = timeline.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         timeline.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         timeline.productCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || timeline.currentStatus.toLowerCase().includes(selectedStatus.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || timeline.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalTimelines = filteredTimelines.length;
  const completedOrders = filteredTimelines.filter(t => t.completionPercentage === 100).length;
  const delayedOrders = filteredTimelines.filter(t => t.delayDays && t.delayDays > 0).length;
  const avgLeadTime = filteredTimelines.reduce((sum, t) => sum + t.leadTime, 0) / filteredTimelines.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Timeline Supply Chain</h1>
            <p className="text-muted-foreground">
              Pantau timeline dan progres supply chain secara real-time
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Timelines</p>
                <p className="text-2xl font-bold">{totalTimelines}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed Orders</p>
                <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Delayed Orders</p>
                <p className="text-2xl font-bold text-red-600">{delayedOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Timer className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Lead Time</p>
                <p className="text-2xl font-bold">{avgLeadTime.toFixed(1)} days</p>
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
                  placeholder="Cari PO number, supplier, kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="processing">Order Processing</option>
              <option value="production">Production</option>
              <option value="transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delay">Delayed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </Card>

        {/* Timeline Cards */}
        <div className="space-y-6">
          {filteredTimelines.map((timeline) => (
            <Card key={timeline.id} className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{timeline.orderNumber}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {timeline.supplierName}
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {timeline.productCategory}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Lead Time: {timeline.leadTime} days
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getPriorityBadge(timeline.priority)}
                  <Badge className={`${timeline.delayDays ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {timeline.completionPercentage}% Complete
                  </Badge>
                  {timeline.delayDays && (
                    <Badge className="bg-orange-100 text-orange-800">
                      +{timeline.delayDays} days delay
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress: {timeline.currentStatus}</span>
                  <span>{timeline.completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${timeline.delayDays ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${timeline.completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline Events */}
              <div className="space-y-4">
                <h4 className="font-medium">Timeline Events</h4>
                <div className="relative">
                  {timeline.events.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4 pb-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                        {getEventIcon(event.eventType)}
                      </div>
                      {index < timeline.events.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-12 bg-gray-200"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.timestamp}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {event.responsibleParty}
                              </div>
                              {event.duration && (
                                <div className="flex items-center">
                                  <Timer className="h-3 w-3 mr-1" />
                                  {event.duration}h
                                </div>
                              )}
                            </div>
                            {event.notes && (
                              <p className="text-xs text-orange-600 mt-1">{event.notes}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(event.status)}
                            {event.documents && event.documents.length > 0 && (
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order Value:</span>
                    <p className="font-medium text-green-600">{formatCurrency(timeline.totalValue)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Items:</span>
                    <p className="font-medium">{timeline.totalItems} items</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Delivery:</span>
                    <p className="font-medium">{timeline.expectedDelivery}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Actual Delivery:</span>
                    <p className="font-medium">{timeline.actualDelivery || 'TBD'}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
