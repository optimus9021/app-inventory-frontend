'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowUpCircle, 
  ArrowDownCircle,
  Search, 
  Download, 
  RefreshCw, 
  Calendar,
  User,
  MapPin,
  TrendingUp,
  Activity
} from 'lucide-react';

interface StockMovement {
  id: string;
  date: string;
  time: string;
  productCode: string;
  productName: string;
  movementType: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  unit: string;
  fromLocation?: string;
  toLocation?: string;
  reference: string;
  reason: string;
  user: string;
  notes?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const mockMovements: StockMovement[] = [
  {
    id: '1',
    date: '2025-01-15',
    time: '14:30',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    movementType: 'in',
    quantity: 50,
    unit: 'pcs',
    toLocation: 'WH-A1',
    reference: 'PO-2025-001',
    reason: 'Purchase Order',
    user: 'Admin User',
    notes: 'Stock masuk dari supplier utama',
    status: 'completed'
  },
  {
    id: '2',
    date: '2025-01-15',
    time: '13:15',
    productCode: 'PRD-002',
    productName: 'Sepatu Sport Running',
    movementType: 'out',
    quantity: 15,
    unit: 'pcs',
    fromLocation: 'WH-B2',
    reference: 'SO-2025-045',
    reason: 'Sales Order',
    user: 'Sales Team',
    status: 'completed'
  },
  {
    id: '3',
    date: '2025-01-15',
    time: '12:45',
    productCode: 'PRD-003',
    productName: 'Kemeja Formal Katun',
    movementType: 'transfer',
    quantity: 25,
    unit: 'pcs',
    fromLocation: 'WH-A2',
    toLocation: 'WH-B1',
    reference: 'TRF-2025-008',
    reason: 'Stock Transfer',
    user: 'Warehouse Team',
    notes: 'Transfer untuk optimasi lokasi',
    status: 'completed'
  },
  {
    id: '4',
    date: '2025-01-15',
    time: '11:30',
    productCode: 'PRD-004',
    productName: 'Jam Tangan Digital',
    movementType: 'adjustment',
    quantity: -3,
    unit: 'pcs',
    fromLocation: 'WH-C1',
    reference: 'ADJ-2025-012',
    reason: 'Stock Opname',
    user: 'Inventory Team',
    notes: 'Koreksi stock opname bulanan',
    status: 'completed'
  },
  {
    id: '5',
    date: '2025-01-15',
    time: '10:15',
    productCode: 'PRD-005',
    productName: 'Celana Jeans Premium',
    movementType: 'in',
    quantity: 30,
    unit: 'pcs',
    toLocation: 'WH-A3',
    reference: 'RTN-2025-003',
    reason: 'Return from Customer',
    user: 'Customer Service',
    status: 'pending'
  },
  {
    id: '6',
    date: '2025-01-14',
    time: '16:20',
    productCode: 'PRD-001',
    productName: 'Tas Ransel Premium',
    movementType: 'out',
    quantity: 20,
    unit: 'pcs',
    fromLocation: 'WH-A1',
    reference: 'SO-2025-044',
    reason: 'Sales Order',
    user: 'Sales Team',
    status: 'completed'
  }
];

const getMovementIcon = (type: string) => {
  switch (type) {
    case 'in':
      return <ArrowUpCircle className="h-5 w-5 text-green-600" />;
    case 'out':
      return <ArrowDownCircle className="h-5 w-5 text-red-600" />;
    case 'transfer':
      return <Activity className="h-5 w-5 text-blue-600" />;
    case 'adjustment':
      return <TrendingUp className="h-5 w-5 text-yellow-600" />;
    default:
      return null;
  }
};

const getMovementBadge = (type: string) => {
  switch (type) {
    case 'in':
      return <Badge className="bg-green-100 text-green-800">Masuk</Badge>;
    case 'out':
      return <Badge className="bg-red-100 text-red-800">Keluar</Badge>;
    case 'transfer':
      return <Badge className="bg-blue-100 text-blue-800">Transfer</Badge>;
    case 'adjustment':
      return <Badge className="bg-yellow-100 text-yellow-800">Adjustment</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Dibatalkan</Badge>;
    default:
      return <Badge>-</Badge>;
  }
};

export default function StockMovementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const filteredMovements = mockMovements.filter(movement => {
    const matchesSearch = movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || movement.movementType === selectedType;
    const matchesStatus = selectedStatus === 'all' || movement.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalIn = filteredMovements
    .filter(m => m.movementType === 'in')
    .reduce((sum, m) => sum + m.quantity, 0);
  
  const totalOut = filteredMovements
    .filter(m => m.movementType === 'out')
    .reduce((sum, m) => sum + Math.abs(m.quantity), 0);
  
  const totalTransfers = filteredMovements
    .filter(m => m.movementType === 'transfer').length;
  
  const totalAdjustments = filteredMovements
    .filter(m => m.movementType === 'adjustment').length;

  return (
    
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
            <p className="text-muted-foreground">
              Monitor dan lacak semua pergerakan stok produk
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <ArrowUpCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Masuk</p>
                <p className="text-2xl font-bold text-green-600">{totalIn}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <ArrowDownCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Keluar</p>
                <p className="text-2xl font-bold text-red-600">{totalOut}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Transfer</p>
                <p className="text-2xl font-bold text-blue-600">{totalTransfers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Adjustment</p>
                <p className="text-2xl font-bold text-yellow-600">{totalAdjustments}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari produk, kode, atau referensi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Tipe</option>
              <option value="in">Masuk</option>
              <option value="out">Keluar</option>
              <option value="transfer">Transfer</option>
              <option value="adjustment">Adjustment</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Semua Status</option>
              <option value="completed">Selesai</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="today">Hari Ini</option>
              <option value="week">7 Hari Terakhir</option>
              <option value="month">30 Hari Terakhir</option>
              <option value="all">Semua</option>
            </select>
          </div>
        </Card>

        {/* Movements Table */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Riwayat Pergerakan Stok</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Waktu</th>
                    <th className="text-left p-4">Produk</th>
                    <th className="text-center p-4">Tipe</th>
                    <th className="text-right p-4">Jumlah</th>
                    <th className="text-left p-4">Lokasi</th>
                    <th className="text-left p-4">Referensi</th>
                    <th className="text-left p-4">User</th>
                    <th className="text-center p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => (
                    <tr key={movement.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{movement.date}</div>
                            <div className="text-sm text-muted-foreground">{movement.time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{movement.productName}</div>
                          <div className="text-sm text-muted-foreground">{movement.productCode}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getMovementIcon(movement.movementType)}
                          {getMovementBadge(movement.movementType)}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-medium ${
                          movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity} {movement.unit}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div className="text-sm">
                            {movement.fromLocation && (
                              <span className="text-red-600">{movement.fromLocation}</span>
                            )}
                            {movement.fromLocation && movement.toLocation && (
                              <span className="mx-1">→</span>
                            )}
                            {movement.toLocation && (
                              <span className="text-green-600">{movement.toLocation}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{movement.reference}</div>
                          <div className="text-sm text-muted-foreground">{movement.reason}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{movement.user}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {getStatusBadge(movement.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Movement Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ringkasan Hari Ini</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <ArrowUpCircle className="h-4 w-4 mr-2 text-green-600" />
                  Stock Masuk
                </span>
                <span className="font-medium text-green-600">+{totalIn} items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center">
                  <ArrowDownCircle className="h-4 w-4 mr-2 text-red-600" />
                  Stock Keluar
                </span>
                <span className="font-medium text-red-600">-{totalOut} items</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Net Movement</span>
                <span className={`font-bold ${
                  (totalIn - totalOut) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {totalIn - totalOut > 0 ? '+' : ''}{totalIn - totalOut} items
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {filteredMovements.slice(0, 5).map((movement) => (
                <div key={movement.id} className="flex items-center space-x-3 text-sm">
                  {getMovementIcon(movement.movementType)}
                  <div className="flex-1">
                    <span className="font-medium">{movement.productName}</span>
                    <span className="text-muted-foreground ml-2">
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity} {movement.unit}
                    </span>
                  </div>
                  <span className="text-muted-foreground">{movement.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
