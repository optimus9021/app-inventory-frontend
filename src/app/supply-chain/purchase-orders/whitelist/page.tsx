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
  Plus,
  Upload,
  Download,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Building,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  FileText,
  Star,
  Award,
  TrendingUp,
  Activity,
  Settings
} from 'lucide-react';

interface WhitelistPO {
  id: string;
  poNumber: string;
  supplier: {
    id: string;
    name: string;
    contact: string;
    rating: number;
    certifications: string[];
    whitelistStatus: 'active' | 'pending' | 'suspended' | 'expired';
    whitelistDate: string;
    expiryDate: string;
  };
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  whitelistReason: 'quality' | 'strategic' | 'exclusive' | 'compliance' | 'cost-effective' | 'reliability';
  totalValue: number;
  validityPeriod: string;
  terms: WhitelistTerm[];
  benefits: string[];
  requirements: string[];
  riskAssessment: 'low' | 'medium' | 'high';
  complianceScore: number;
  performanceMetrics: PerformanceMetric[];
  approvedBy?: string;
  approvedDate?: string;
  reviewDate: string;
  notes?: string;
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface WhitelistTerm {
  id: string;
  category: string;
  description: string;
  requirement: string;
  status: 'met' | 'pending' | 'not-met';
  verifiedBy?: string;
  verifiedDate?: string;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  target: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  trend: 'improving' | 'stable' | 'declining';
}

const mockWhitelistPOs: WhitelistPO[] = [
  {
    id: '1',
    poNumber: 'WL-PO-2025-001',
    supplier: {
      id: 'SUP-001',
      name: 'PT Premium Supplier',
      contact: 'premium@supplier.com',
      rating: 4.8,
      certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001'],
      whitelistStatus: 'active',
      whitelistDate: '2024-01-15T00:00:00Z',
      expiryDate: '2026-01-15T00:00:00Z'
    },
    category: 'Electronics',
    priority: 'critical',
    status: 'active',
    whitelistReason: 'strategic',
    totalValue: 250000000,
    validityPeriod: '24 months',
    terms: [
      {
        id: '1',
        category: 'Quality',
        description: 'Quality Management System',
        requirement: 'ISO 9001:2015 certification',
        status: 'met',
        verifiedBy: 'Quality Manager',
        verifiedDate: '2024-01-10T00:00:00Z'
      },
      {
        id: '2',
        category: 'Delivery',
        description: 'On-time delivery performance',
        requirement: 'Minimum 95% on-time delivery rate',
        status: 'met',
        verifiedBy: 'Supply Chain Manager',
        verifiedDate: '2024-01-12T00:00:00Z'
      },
      {
        id: '3',
        category: 'Financial',
        description: 'Financial stability',
        requirement: 'Annual revenue minimum 50B IDR',
        status: 'met',
        verifiedBy: 'Finance Director',
        verifiedDate: '2024-01-08T00:00:00Z'
      }
    ],
    benefits: [
      'Priority processing for all POs',
      'Extended payment terms (Net 45)',
      'Volume discount up to 15%',
      'Dedicated account manager',
      'Quarterly business review'
    ],
    requirements: [
      'Maintain quality certification',
      'Monthly performance reporting',
      'Compliance audit every 6 months',
      'Exclusive pricing agreement'
    ],
    riskAssessment: 'low',
    complianceScore: 98,
    performanceMetrics: [
      {
        metric: 'Quality Score',
        value: 98,
        target: 95,
        status: 'excellent',
        trend: 'improving'
      },
      {
        metric: 'Delivery Performance',
        value: 97,
        target: 95,
        status: 'excellent',
        trend: 'stable'
      },
      {
        metric: 'Cost Competitiveness',
        value: 92,
        target: 90,
        status: 'good',
        trend: 'improving'
      }
    ],
    approvedBy: 'Supply Chain Director',
    approvedDate: '2024-01-15T10:30:00Z',
    reviewDate: '2025-07-15T00:00:00Z',
    notes: 'Strategic partner untuk kategori electronics dengan track record excellent',
    createdBy: 'Procurement Manager',
    createdDate: '2023-12-20T14:20:00Z',
    lastModified: '2025-01-30T09:15:00Z'
  },
  {
    id: '2',
    poNumber: 'WL-PO-2025-002',
    supplier: {
      id: 'SUP-007',
      name: 'CV Textile Berkualitas',
      contact: 'quality@textile.com',
      rating: 4.5,
      certifications: ['OEKO-TEX Standard 100', 'GOTS'],
      whitelistStatus: 'pending',
      whitelistDate: '2025-01-20T00:00:00Z',
      expiryDate: '2027-01-20T00:00:00Z'
    },
    category: 'Fashion',
    priority: 'high',
    status: 'pending',
    whitelistReason: 'quality',
    totalValue: 150000000,
    validityPeriod: '24 months',
    terms: [
      {
        id: '4',
        category: 'Quality',
        description: 'Textile quality standards',
        requirement: 'OEKO-TEX Standard 100 certification',
        status: 'met',
        verifiedBy: 'Quality Manager',
        verifiedDate: '2025-01-18T00:00:00Z'
      },
      {
        id: '5',
        category: 'Sustainability',
        description: 'Environmental compliance',
        requirement: 'GOTS certification for organic textiles',
        status: 'pending',
        verifiedBy: undefined,
        verifiedDate: undefined
      },
      {
        id: '6',
        category: 'Capacity',
        description: 'Production capacity',
        requirement: 'Monthly production capacity 10,000 units',
        status: 'met',
        verifiedBy: 'Production Manager',
        verifiedDate: '2025-01-19T00:00:00Z'
      }
    ],
    benefits: [
      'Guaranteed quality standards',
      'Sustainable supply chain',
      'Competitive pricing for organic materials',
      'Monthly capacity allocation'
    ],
    requirements: [
      'Complete GOTS certification',
      'Weekly quality reports',
      'Sustainable sourcing commitment',
      'Minimum order commitment'
    ],
    riskAssessment: 'medium',
    complianceScore: 85,
    performanceMetrics: [
      {
        metric: 'Quality Score',
        value: 94,
        target: 90,
        status: 'excellent',
        trend: 'improving'
      },
      {
        metric: 'Sustainability Score',
        value: 78,
        target: 85,
        status: 'fair',
        trend: 'improving'
      },
      {
        metric: 'Delivery Performance',
        value: 89,
        target: 90,
        status: 'good',
        trend: 'stable'
      }
    ],
    reviewDate: '2025-07-20T00:00:00Z',
    notes: 'Menunggu completion GOTS certification untuk final approval',
    createdBy: 'Category Manager',
    createdDate: '2025-01-10T11:30:00Z',
    lastModified: '2025-01-30T14:45:00Z'
  },
  {
    id: '3',
    poNumber: 'WL-PO-2025-003',
    supplier: {
      id: 'SUP-012',
      name: 'PT Logistik Terpercaya',
      contact: 'ops@logistikterpercaya.com',
      rating: 4.3,
      certifications: ['ISO 28000:2007'],
      whitelistStatus: 'active',
      whitelistDate: '2024-06-01T00:00:00Z',
      expiryDate: '2025-06-01T00:00:00Z'
    },
    category: 'Logistics',
    priority: 'high',
    status: 'active',
    whitelistReason: 'reliability',
    totalValue: 75000000,
    validityPeriod: '12 months',
    terms: [
      {
        id: '7',
        category: 'Security',
        description: 'Supply chain security',
        requirement: 'ISO 28000:2007 certification',
        status: 'met',
        verifiedBy: 'Security Manager',
        verifiedDate: '2024-05-28T00:00:00Z'
      },
      {
        id: '8',
        category: 'Coverage',
        description: 'Geographic coverage',
        requirement: 'Coverage for all major cities in Indonesia',
        status: 'met',
        verifiedBy: 'Logistics Manager',
        verifiedDate: '2024-05-30T00:00:00Z'
      }
    ],
    benefits: [
      'Guaranteed delivery slots',
      'Real-time tracking system',
      'Dedicated customer service',
      'Emergency delivery options'
    ],
    requirements: [
      'Maintain 98% delivery success rate',
      'Real-time status updates',
      'Monthly performance reports',
      'Emergency response capability'
    ],
    riskAssessment: 'low',
    complianceScore: 92,
    performanceMetrics: [
      {
        metric: 'Delivery Success Rate',
        value: 98.5,
        target: 98,
        status: 'excellent',
        trend: 'stable'
      },
      {
        metric: 'Response Time',
        value: 95,
        target: 90,
        status: 'excellent',
        trend: 'improving'
      }
    ],
    approvedBy: 'Operations Director',
    approvedDate: '2024-06-01T15:20:00Z',
    reviewDate: '2025-03-01T00:00:00Z',
    notes: 'Renewal process akan dimulai bulan depan',
    createdBy: 'Logistics Manager',
    createdDate: '2024-05-15T09:45:00Z',
    lastModified: '2025-01-29T16:30:00Z'
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
    case 'active':
      return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
    case 'completed':
      return <Badge className="bg-purple-100 text-purple-800">Completed</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getWhitelistStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'suspended':
      return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
    case 'expired':
      return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
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
    case 'critical':
      return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getReasonBadge = (reason: string) => {
  switch (reason) {
    case 'quality':
      return <Badge className="bg-blue-100 text-blue-800">Quality</Badge>;
    case 'strategic':
      return <Badge className="bg-purple-100 text-purple-800">Strategic</Badge>;
    case 'exclusive':
      return <Badge className="bg-pink-100 text-pink-800">Exclusive</Badge>;
    case 'compliance':
      return <Badge className="bg-green-100 text-green-800">Compliance</Badge>;
    case 'cost-effective':
      return <Badge className="bg-orange-100 text-orange-800">Cost Effective</Badge>;
    case 'reliability':
      return <Badge className="bg-indigo-100 text-indigo-800">Reliability</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getTermStatusIcon = (status: string) => {
  switch (status) {
    case 'met':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'not-met':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getPerformanceStatusBadge = (status: string) => {
  switch (status) {
    case 'excellent':
      return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    case 'good':
      return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    case 'fair':
      return <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>;
    case 'poor':
      return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getRatingStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star 
      key={i} 
      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
    />
  ));
};

export default function WhitelistPOPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReason, setSelectedReason] = useState('all');

  const filteredPOs = mockWhitelistPOs.filter(po => {
    const matchesSearch = 
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplier.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || po.category === selectedCategory;
    const matchesReason = selectedReason === 'all' || po.whitelistReason === selectedReason;
    return matchesSearch && matchesStatus && matchesCategory && matchesReason;
  });

  const totalWhitelist = filteredPOs.length;
  const activeWhitelist = filteredPOs.filter(po => po.status === 'active').length;
  const pendingApproval = filteredPOs.filter(po => po.status === 'pending').length;
  const totalValue = filteredPOs.reduce((sum, po) => sum + po.totalValue, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Input PO Whitelist</h1>
            <p className="text-muted-foreground">
              Kelola daftar supplier terpercaya untuk purchase order prioritas
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Suppliers
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Whitelist
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add to Whitelist
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Whitelist</p>
                <p className="text-2xl font-bold text-green-600">{formatNumber(totalWhitelist)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                <p className="text-2xl font-bold text-blue-600">{formatNumber(activeWhitelist)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{formatNumber(pendingApproval)}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalValue)}</p>
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
                    placeholder="Cari whitelist PO atau supplier..."
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
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Sports">Sports</option>
                  <option value="Home & Living">Home & Living</option>
                </select>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Semua Alasan</option>
                  <option value="quality">Quality</option>
                  <option value="strategic">Strategic</option>
                  <option value="exclusive">Exclusive</option>
                  <option value="compliance">Compliance</option>
                  <option value="cost-effective">Cost Effective</option>
                  <option value="reliability">Reliability</option>
                </select>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
          </div>
        </Card>

        {/* Whitelist PO List */}
        <div className="space-y-6">
          {filteredPOs.map((po) => (
            <Card key={po.id} className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-xl">{po.poNumber}</span>
                      {getStatusBadge(po.status)}
                      {getPriorityBadge(po.priority)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Category: {po.category} • Validity: {po.validityPeriod}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-green-600">{formatCurrency(po.totalValue)}</div>
                  <div className="text-sm text-muted-foreground">Contract Value</div>
                </div>
              </div>

              {/* Supplier Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-lg">{po.supplier.name}</span>
                    <div className="flex items-center space-x-1">
                      {getRatingStars(po.supplier.rating)}
                      <span className="text-sm text-muted-foreground ml-1">({po.supplier.rating})</span>
                    </div>
                    {getWhitelistStatusBadge(po.supplier.whitelistStatus)}
                  </div>
                  {getReasonBadge(po.whitelistReason)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Contact</div>
                    <div className="font-medium">{po.supplier.contact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Whitelist Date</div>
                    <div className="font-medium">{new Date(po.supplier.whitelistDate).toLocaleDateString('id-ID')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Expiry Date</div>
                    <div className="font-medium">{new Date(po.supplier.expiryDate).toLocaleDateString('id-ID')}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-sm text-muted-foreground mb-2">Certifications</div>
                  <div className="flex flex-wrap gap-2">
                    {po.supplier.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms & Requirements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Whitelist Terms</h4>
                  <div className="space-y-3">
                    {po.terms.map((term) => (
                      <div key={term.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        {getTermStatusIcon(term.status)}
                        <div className="flex-1">
                          <div className="font-medium">{term.description}</div>
                          <div className="text-sm text-muted-foreground">{term.requirement}</div>
                          {term.verifiedBy && (
                            <div className="text-xs text-green-600 mt-1">
                              Verified by {term.verifiedBy} on {new Date(term.verifiedDate!).toLocaleDateString('id-ID')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    {po.performanceMetrics.map((metric, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{metric.metric}</span>
                          {getPerformanceStatusBadge(metric.status)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Value: {metric.value}%</span>
                              <span>Target: {metric.target}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  metric.status === 'excellent' ? 'bg-green-500' :
                                  metric.status === 'good' ? 'bg-blue-500' :
                                  metric.status === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className={`text-sm ${
                            metric.trend === 'improving' ? 'text-green-600' :
                            metric.trend === 'stable' ? 'text-blue-600' : 'text-red-600'
                          }`}>
                            {metric.trend === 'improving' ? '↗' : metric.trend === 'stable' ? '→' : '↘'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits & Requirements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Benefits</h4>
                  <div className="space-y-2">
                    {po.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Requirements</h4>
                  <div className="space-y-2">
                    {po.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compliance Score */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-800">Compliance Score</span>
                  <span className="font-bold text-2xl text-blue-600">{po.complianceScore}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${po.complianceScore}%` }}
                  ></div>
                </div>
                <div className="text-sm text-blue-700 mt-1">
                  {po.complianceScore >= 90 ? 'Excellent compliance' :
                   po.complianceScore >= 80 ? 'Good compliance' :
                   po.complianceScore >= 70 ? 'Fair compliance' : 'Poor compliance'}
                </div>
              </div>

              {po.notes && (
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-800 mb-1">Notes:</div>
                  <div className="text-sm text-gray-700">{po.notes}</div>
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
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Contract
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-1" />
                    Performance
                  </Button>
                  {po.status === 'draft' && (
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Next Review: {new Date(po.reviewDate).toLocaleDateString('id-ID')}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span>Add New Supplier</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Settings className="h-6 w-6" />
              <span>Whitelist Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Performance Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Compliance Audit</span>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
