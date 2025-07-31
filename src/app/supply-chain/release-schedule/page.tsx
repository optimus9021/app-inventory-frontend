'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Search, 
  Plus, 
  Eye,
  Edit2,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  Truck,
  Building,
  User,
  Target,
  Download,
  Filter,
  PlayCircle,
  PauseCircle,
  FileText
} from 'lucide-react';

interface ReleaseSchedule {
  id: string;
  scheduleNumber: string;
  releaseName: string;
  releaseType: 'production' | 'inventory' | 'transfer' | 'shipment' | 'procurement';
  plannedDate: string;
  actualDate?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sourceLocation: string;
  destinationLocation?: string;
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  currency: string;
  completionPercentage: number;
  responsibleTeam: string;
  assignedTo: string;
  approvedBy?: string;
  dependencies?: string[];
  estimatedDuration: number; // in hours
  actualDuration?: number;
  delayReason?: string;
  notes?: string;
  items: ReleaseItem[];
}

interface ReleaseItem {
  id: string;
  productCode: string;
  productName: string;
  category: string;
  plannedQty: number;
  actualQty?: number;
  unit: string;
  priority: 'normal' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  location: string;
  notes?: string;
}

const mockReleaseSchedules: ReleaseSchedule[] = [
  {
    id: '1',
    scheduleNumber: 'REL-2025-001',
    releaseName: 'Q1 Fashion Collection Release',
    releaseType: 'production',
    plannedDate: '2025-01-20',
    actualDate: '2025-01-20',
    status: 'completed',
    priority: 'high',
    sourceLocation: 'Production Line A',
    destinationLocation: 'Main Warehouse',
    totalItems: 8,
    totalQuantity: 500,
    totalValue: 150000000,
    currency: 'IDR',
    completionPercentage: 100,
    responsibleTeam: 'Production Team',
    assignedTo: 'Production Manager',
    approvedBy: 'Operations Director',
    estimatedDuration: 48,
    actualDuration: 46,
    notes: 'Successfully completed ahead of schedule',
    items: [
      {
        id: '1-1',
        productCode: 'TAS-001',
        productName: 'Tas Ransel Premium',
        category: 'Fashion',
        plannedQty: 100,
        actualQty: 100,
        unit: 'pcs',
        priority: 'high',
        status: 'completed',
        location: 'WH-A1'
      },
      {
        id: '1-2',
        productCode: 'SEP-002',
        productName: 'Sepatu Sport Running',
        category: 'Fashion',
        plannedQty: 200,
        actualQty: 200,
        unit: 'pcs',
        priority: 'normal',
        status: 'completed',
        location: 'WH-A2'
      }
    ]
  },
  {
    id: '2',
    scheduleNumber: 'REL-2025-002',
    releaseName: 'Electronics Batch Release',
    releaseType: 'inventory',
    plannedDate: '2025-01-22',
    status: 'in-progress',
    priority: 'medium',
    sourceLocation: 'Central Warehouse',
    destinationLocation: 'Regional Stores',
    totalItems: 5,
    totalQuantity: 300,
    totalValue: 225000000,
    currency: 'IDR',
    completionPercentage: 65,
    responsibleTeam: 'Logistics Team',
    assignedTo: 'Logistics Manager',
    approvedBy: 'Supply Chain Manager',
    dependencies: ['REL-2025-001'],
    estimatedDuration: 24,
    notes: 'Waiting for final quality checks',
    items: [
      {
        id: '2-1',
        productCode: 'ELK-001',
        productName: 'Smartphone Android 128GB',
        category: 'Elektronik',
        plannedQty: 150,
        actualQty: 98,
        unit: 'pcs',
        priority: 'high',
        status: 'in-progress',
        location: 'WH-B1'
      }
    ]
  },
  {
    id: '3',
    scheduleNumber: 'REL-2025-003',
    releaseName: 'Regional Transfer - Surabaya',
    releaseType: 'transfer',
    plannedDate: '2025-01-25',
    status: 'planned',
    priority: 'medium',
    sourceLocation: 'Jakarta Main Warehouse',
    destinationLocation: 'Surabaya Regional Warehouse',
    totalItems: 6,
    totalQuantity: 400,
    totalValue: 120000000,
    currency: 'IDR',
    completionPercentage: 0,
    responsibleTeam: 'Transfer Team',
    assignedTo: 'Transfer Coordinator',
    dependencies: ['REL-2025-002'],
    estimatedDuration: 72,
    notes: 'Pending completion of previous release',
    items: [
      {
        id: '3-1',
        productCode: 'KMJ-001',
        productName: 'Kemeja Formal Katun',
        category: 'Fashion',
        plannedQty: 250,
        unit: 'pcs',
        priority: 'normal',
        status: 'pending',
        location: 'WH-A3'
      }
    ]
  },
  {
    id: '4',
    scheduleNumber: 'REL-2025-004',
    releaseName: 'Urgent Accessories Release',
    releaseType: 'shipment',
    plannedDate: '2025-01-18',
    actualDate: '2025-01-21',
    status: 'delayed',
    priority: 'urgent',
    sourceLocation: 'Supplier Warehouse',
    destinationLocation: 'Customer Direct',
    totalItems: 3,
    totalQuantity: 150,
    totalValue: 45000000,
    currency: 'IDR',
    completionPercentage: 80,
    responsibleTeam: 'Shipping Team',
    assignedTo: 'Shipping Coordinator',
    estimatedDuration: 12,
    actualDuration: 18,
    delayReason: 'Weather conditions affected shipping',
    notes: 'Delayed due to external factors',
    items: [
      {
        id: '4-1',
        productCode: 'JAM-001',
        productName: 'Jam Tangan Digital',
        category: 'Aksesoris',
        plannedQty: 75,
        actualQty: 60,
        unit: 'pcs',
        priority: 'critical',
        status: 'in-progress',
        location: 'Ship-001'
      }
    ]
  },
  {
    id: '5',
    scheduleNumber: 'REL-2025-005',
    releaseName: 'Sports Equipment Procurement',
    releaseType: 'procurement',
    plannedDate: '2025-01-30',
    status: 'on-hold',
    priority: 'low',
    sourceLocation: 'Supplier Factory',
    destinationLocation: 'Main Warehouse',
    totalItems: 4,
    totalQuantity: 200,
    totalValue: 80000000,
    currency: 'IDR',
    completionPercentage: 0,
    responsibleTeam: 'Procurement Team',
    assignedTo: 'Procurement Specialist',
    estimatedDuration: 96,
    delayReason: 'Budget approval pending',
    notes: 'On hold pending budget approval',
    items: [
      {
        id: '5-1',
        productCode: 'BOL-001',
        productName: 'Bola Sepak Official',
        category: 'Olahraga',
        plannedQty: 100,
        unit: 'pcs',
        priority: 'normal',
        status: 'blocked',
        location: 'Supplier'
      }
    ]
  }
];

const getReleaseTypeBadge = (type: string) => {
  switch (type) {
    case 'production':
      return <Badge className="bg-blue-100 text-blue-800">Production</Badge>;
    case 'inventory':
      return <Badge className="bg-green-100 text-green-800">Inventory</Badge>;
    case 'transfer':
      return <Badge className="bg-purple-100 text-purple-800">Transfer</Badge>;
    case 'shipment':
      return <Badge className="bg-orange-100 text-orange-800">Shipment</Badge>;
    case 'procurement':
      return <Badge className="bg-yellow-100 text-yellow-800">Procurement</Badge>;
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
    case 'delayed':
      return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
    case 'cancelled':
      return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
    case 'on-hold':
      return <Badge className="bg-yellow-100 text-yellow-800">On Hold</Badge>;
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
      return <PlayCircle className="h-4 w-4 text-blue-600" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'delayed':
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    case 'cancelled':
      return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    case 'on-hold':
      return <PauseCircle className="h-4 w-4 text-yellow-600" />;
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

export default function ReleaseSchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredSchedules = mockReleaseSchedules.filter(schedule => {
    const matchesSearch = schedule.releaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.scheduleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.sourceLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || schedule.releaseType === selectedType;
    const matchesStatus = selectedStatus === 'all' || schedule.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalSchedules = filteredSchedules.length;
  const completedSchedules = filteredSchedules.filter(s => s.status === 'completed').length;
  const delayedSchedules = filteredSchedules.filter(s => s.status === 'delayed').length;
  const totalValue = filteredSchedules.reduce((sum, schedule) => sum + schedule.totalValue, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Release Schedule</h1>
            <p className="text-muted-foreground">
              Kelola jadwal release untuk semua operasi supply chain
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Release
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Schedules</p>
                <p className="text-2xl font-bold">{totalSchedules}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedSchedules}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-red-600">{delayedSchedules}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
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
                  placeholder="Cari release name, schedule number, lokasi..."
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
              <option value="inventory">Inventory</option>
              <option value="transfer">Transfer</option>
              <option value="shipment">Shipment</option>
              <option value="procurement">Procurement</option>
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
              <option value="delayed">Delayed</option>
              <option value="cancelled">Cancelled</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </Card>

        {/* Release Schedule Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Release Schedules</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Release Info</th>
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
                  {filteredSchedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{schedule.releaseName}</div>
                          <div className="text-sm text-muted-foreground">
                            {schedule.scheduleNumber}
                          </div>
                          <div className="text-xs text-blue-600">
                            {schedule.totalItems} items • {schedule.totalQuantity} qty
                          </div>
                          <div className="text-xs text-gray-500">
                            Est: {schedule.estimatedDuration}h
                            {schedule.actualDuration && ` • Actual: ${schedule.actualDuration}h`}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getReleaseTypeBadge(schedule.releaseType)}
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1 text-blue-600" />
                            From: {schedule.sourceLocation}
                          </div>
                          {schedule.destinationLocation && (
                            <div className="flex items-center mt-1">
                              <Truck className="h-3 w-3 mr-1 text-green-600" />
                              To: {schedule.destinationLocation}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(schedule.status)}
                          {getStatusBadge(schedule.status)}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getPriorityBadge(schedule.priority)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center">
                          <Target className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="font-medium">{schedule.completionPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              schedule.status === 'delayed' ? 'bg-red-500' : 
                              schedule.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${schedule.completionPercentage}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-medium text-green-600">
                          {formatCurrency(schedule.totalValue)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {schedule.currency}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                            Planned: {schedule.plannedDate}
                          </div>
                          {schedule.actualDate && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-green-600" />
                              Actual: {schedule.actualDate}
                            </div>
                          )}
                          <div className="flex items-center text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            {schedule.assignedTo}
                          </div>
                          {schedule.delayReason && (
                            <div className="text-xs text-red-600">
                              Delay: {schedule.delayReason}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {schedule.status !== 'completed' && (
                            <Button variant="outline" size="sm">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4" />
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

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Release Type Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-blue-600" />
                  Production Release
                </span>
                <Badge className="bg-blue-100 text-blue-800">
                  {filteredSchedules.filter(s => s.releaseType === 'production').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Building className="h-4 w-4 mr-2 text-green-600" />
                  Inventory Release
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {filteredSchedules.filter(s => s.releaseType === 'inventory').length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-purple-600" />
                  Transfer & Shipment
                </span>
                <Badge className="bg-purple-100 text-purple-800">
                  {filteredSchedules.filter(s => ['transfer', 'shipment'].includes(s.releaseType)).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-yellow-600" />
                  Procurement
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {filteredSchedules.filter(s => s.releaseType === 'procurement').length}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Critical Releases</h3>
            <div className="space-y-3">
              {filteredSchedules
                .filter(s => s.priority === 'urgent' && ['planned', 'in-progress'].includes(s.status))
                .sort((a, b) => new Date(a.plannedDate).getTime() - new Date(b.plannedDate).getTime())
                .slice(0, 5)
                .map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(schedule.status)}
                      <div>
                        <div className="font-medium">{schedule.releaseName}</div>
                        <div className="text-muted-foreground">
                          {getReleaseTypeBadge(schedule.releaseType)} • {getPriorityBadge(schedule.priority)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-600">
                        {schedule.plannedDate}
                      </div>
                      <div className="text-muted-foreground">
                        {schedule.completionPercentage}% complete
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
