// Core Types
export interface InventoryItem {
  id: number;
  name: string;
  description?: string;
  sku: string;
  quantity: number;
  price: number;
  cost: number;
  category: Category;
  supplier: Supplier;
  location?: Location;
  minStock: number;
  maxStock: number;
  reorderPoint: number;
  images?: string[];
  barcode?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'discontinued';
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  createdAt: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId?: string;
  paymentTerms: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  type: 'warehouse' | 'store' | 'distribution_center';
  capacity: number;
  currentOccupancy: number;
  managerId?: number;
  isActive: boolean;
}

export interface Purchase {
  id: number;
  purchaseOrderNumber: string;
  supplier: Supplier;
  items: PurchaseItem[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
  orderDate: string;
  expectedDate?: string;
  receivedDate?: string;
  notes?: string;
  createdBy: number;
}

export interface PurchaseItem {
  id: number;
  inventoryItem: InventoryItem;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity?: number;
}

export interface Sale {
  id: number;
  saleOrderNumber: string;
  customer: Customer;
  items: SaleItem[];
  totalAmount: number;
  status: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippedDate?: string;
  deliveredDate?: string;
  paymentStatus: 'pending' | 'paid' | 'overdue';
  notes?: string;
}

export interface SaleItem {
  id: number;
  inventoryItem: InventoryItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount?: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  customerType: 'individual' | 'business';
  creditLimit?: number;
  currentBalance: number;
  isActive: boolean;
  createdAt: string;
}

export interface StockMovement {
  id: number;
  inventoryItem: InventoryItem;
  movementType: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  fromLocation?: Location;
  toLocation?: Location;
  reason: string;
  reference?: string;
  performedBy: number;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  pendingOrders: number;
  totalSalesThisMonth: number;
  totalPurchasesThisMonth: number;
  topSellingProducts: InventoryItem[];
  recentMovements: StockMovement[];
  supplierPerformance: SupplierPerformance[];
}

export interface SupplierPerformance {
  supplier: Supplier;
  totalOrders: number;
  onTimeDeliveries: number;
  averageRating: number;
  totalPurchaseValue: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  searchTerm: string;
  category?: number;
  supplier?: number;
  location?: number;
  stockStatus?: 'all' | 'in-stock' | 'low-stock' | 'out-of-stock';
  status?: 'active' | 'inactive' | 'discontinued';
  priceRange?: {
    min: number;
    max: number;
  };
}

export type SortField = 'name' | 'quantity' | 'price' | 'createdAt' | 'category' | 'supplier';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FormErrors {
  [key: string]: string | undefined;
}