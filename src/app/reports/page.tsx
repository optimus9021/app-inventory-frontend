'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  AlertTriangle,
  Download,
  Filter,
  FileText
} from 'lucide-react';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Mock data untuk charts
  const salesData = [
    { month: 'Jan', sales: 120000000, purchases: 80000000 },
    { month: 'Feb', sales: 150000000, purchases: 95000000 },
    { month: 'Mar', sales: 180000000, purchases: 120000000 },
    { month: 'Apr', sales: 220000000, purchases: 140000000 },
    { month: 'May', sales: 200000000, purchases: 130000000 },
    { month: 'Jun', sales: 240000000, purchases: 160000000 }
  ];

  const inventoryTrendData = [
    { date: '1 Jun', stock: 450 },
    { date: '8 Jun', stock: 480 },
    { date: '15 Jun', stock: 420 },
    { date: '22 Jun', stock: 390 },
    { date: '29 Jun', stock: 460 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#8884d8' },
    { name: 'Furniture', value: 25, color: '#82ca9d' },
    { name: 'Office Supplies', value: 20, color: '#ffc658' },
    { name: 'Others', value: 10, color: '#ff7300' }
  ];

  const topProducts = [
    { name: 'Laptop Dell XPS 13', sold: 45, revenue: 832500000 },
    { name: 'iPhone 14 Pro', sold: 32, revenue: 511968000 },
    { name: 'Monitor Samsung 24"', sold: 28, revenue: 168000000 },
    { name: 'Keyboard Mechanical', sold: 55, revenue: 82500000 },
    { name: 'Mouse Wireless', sold: 67, revenue: 67000000 }
  ];

  const lowStockItems = [
    { name: 'Laptop Dell XPS 13', current: 5, minimum: 10, status: 'critical' },
    { name: 'Printer Canon', current: 8, minimum: 15, status: 'warning' },
    { name: 'Webcam Logitech', current: 12, minimum: 20, status: 'warning' },
    { name: 'Headset Sony', current: 3, minimum: 10, status: 'critical' }
  ];

  const formatCurrency = (amount: number) => {
    if (!mounted) return `Rp ${amount.toLocaleString()}`;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Analisis performa bisnis dan inventori</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 1.11B</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900">Rp 456M</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    <span className="text-sm text-red-600">-2.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">{lowStockItems.length}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-orange-600">Perlu perhatian</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales vs Purchases Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales vs Purchases Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar dataKey="purchases" fill="#82ca9d" name="Purchases" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Inventory Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Level Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inventoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="stock" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sold} units sold
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        {formatCurrency(product.revenue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Current: {item.current} | Min: {item.minimum}
                      </div>
                    </div>
                    <Badge 
                      className={
                        item.status === 'critical' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-orange-100 text-orange-800'
                      }
                    >
                      {item.status === 'critical' ? 'Critical' : 'Warning'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Report Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <FileText className="w-6 h-6 mb-1" />
                <span className="text-sm">Inventory Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <DollarSign className="w-6 h-6 mb-1" />
                <span className="text-sm">Sales Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <ShoppingCart className="w-6 h-6 mb-1" />
                <span className="text-sm">Purchase Report</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <TrendingUp className="w-6 h-6 mb-1" />
                <span className="text-sm">Profitability</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
