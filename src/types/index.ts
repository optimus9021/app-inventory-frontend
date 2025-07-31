// Base Types
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// User Types
export interface User extends BaseEntity {
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  isActive: boolean
  lastLogin?: string
}

export type UserRole = "admin" | "manager" | "staff" | "viewer"

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

// Product Types
export interface Product extends BaseEntity {
  sku: string
  name: string
  description?: string
  category: ProductCategory
  price: number
  costPrice: number
  stock: number
  minStock: number
  maxStock: number
  unit: string
  barcode?: string
  images?: string[]
  status: ProductStatus
  supplier?: Supplier
  tags?: string[]
}

export interface ProductCategory extends BaseEntity {
  name: string
  description?: string
  parentId?: string
  children?: ProductCategory[]
}

export type ProductStatus = "active" | "inactive" | "discontinued" | "out_of_stock"

export interface StockMovement extends BaseEntity {
  productId: string
  product: Product
  type: StockMovementType
  quantity: number
  previousStock: number
  newStock: number
  reason: string
  reference?: string
  userId: string
  user: User
}

export type StockMovementType = "in" | "out" | "adjustment" | "transfer"

// Supply Chain Types
export interface Supplier extends BaseEntity {
  name: string
  code: string
  email?: string
  phone?: string
  address?: string
  contactPerson?: string
  paymentTerms?: string
  status: SupplierStatus
}

export type SupplierStatus = "active" | "inactive" | "blacklisted"

export interface PurchaseOrder extends BaseEntity {
  poNumber: string
  supplierId: string
  supplier: Supplier
  items: PurchaseOrderItem[]
  subtotal: number
  tax: number
  total: number
  status: PurchaseOrderStatus
  orderDate: string
  expectedDate?: string
  receivedDate?: string
  notes?: string
}

export interface PurchaseOrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  total: number
  receivedQuantity?: number
}

export type PurchaseOrderStatus = "draft" | "pending" | "approved" | "ordered" | "received" | "cancelled"

// Sales Types
export interface SalesData extends BaseEntity {
  orderNumber: string
  platform: Platform
  productId: string
  product: Product
  quantity: number
  unitPrice: number
  total: number
  discount?: number
  tax?: number
  finalTotal: number
  status: SalesStatus
  orderDate: string
  shippedDate?: string
  deliveredDate?: string
  customerInfo?: CustomerInfo
}

export type Platform = "tiktok" | "shopee" | "tokopedia" | "offline"

export type SalesStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned"

export interface CustomerInfo {
  name: string
  email?: string
  phone?: string
  address?: string
}

// Analytics Types
export interface AnalyticsData {
  period: string
  sales: SalesAnalytics
  products: ProductAnalytics
  platforms: PlatformAnalytics
}

export interface SalesAnalytics {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  topProducts: TopProduct[]
  salesByPlatform: PlatformSales[]
  salesTrend: SalesTrend[]
}

export interface ProductAnalytics {
  totalProducts: number
  activeProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  topSellingProducts: TopProduct[]
  deadstockProducts: Product[]
}

export interface PlatformAnalytics {
  platformPerformance: PlatformPerformance[]
  conversionRates: ConversionRate[]
}

export interface TopProduct {
  product: Product
  sales: number
  revenue: number
  growth: number
}

export interface PlatformSales {
  platform: Platform
  revenue: number
  orders: number
  percentage: number
}

export interface SalesTrend {
  date: string
  revenue: number
  orders: number
}

export interface PlatformPerformance {
  platform: Platform
  revenue: number
  orders: number
  conversionRate: number
  averageOrderValue: number
}

export interface ConversionRate {
  platform: Platform
  visitors: number
  orders: number
  conversionRate: number
}

// Dashboard Types
export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  lowStockAlerts: number
  revenueGrowth: number
  ordersGrowth: number
  productsGrowth: number
  alertsGrowth: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface SearchFilters {
  query?: string
  category?: string
  status?: string
  platform?: Platform
  dateFrom?: string
  dateTo?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Notification Types
export interface Notification extends BaseEntity {
  title: string
  message: string
  type: NotificationType
  isRead: boolean
  userId: string
  actionUrl?: string
}

export type NotificationType = "info" | "warning" | "error" | "success"
