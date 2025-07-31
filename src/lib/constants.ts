// App Constants
export const APP_NAME = "Inventory Management System"
export const APP_VERSION = "2.0.0"

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Navigation Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  ANALYTICS: "/dashboard/analytics",
  PRODUCTS: "/products",
  SUPPLY_CHAIN: "/supply-chain",
  SALES_DATA: "/sales-data",
  SETTINGS: "/settings",
  REPORTS: "/reports",
  NOTIFICATIONS: "/notifications",
} as const

// Dashboard Analytics Routes
export const ANALYTICS_ROUTES = {
  SALES_REALIZATION: "/dashboard/analytics/sales-realization",
  PRODUCTION_RECOMMENDATION: "/dashboard/analytics/production-recommendation",
  DEADSTOCK_RECOMMENDATION: "/dashboard/analytics/deadstock-recommendation",
  PARETO_PRODUCT: "/dashboard/analytics/pareto-product",
  SALES_PROJECTION: "/dashboard/analytics/sales-projection",
  TARGET_RECAP: "/dashboard/analytics/target-recap",
  CONVERSION_DATA: "/dashboard/analytics/conversion-data",
} as const

// Product Routes
export const PRODUCT_ROUTES = {
  STOCK: "/products/stock",
  FINAL_STOCK: "/products/stock/final-stock",
  MOVEMENTS: "/products/stock/movements",
  MASTER: "/products/master",
  CATEGORIES: "/products/master/categories",
  PRICING: "/products/master/pricing",
  INPUT: "/products/input",
  INBOUND: "/products/input/inbound",
  REJECT: "/products/input/reject",
  CLEARANCE: "/products/clearance",
} as const

// Supply Chain Routes
export const SUPPLY_CHAIN_ROUTES = {
  PURCHASE_ORDERS: "/supply-chain/purchase-orders",
  PO_PRODUCT: "/supply-chain/purchase-orders/product",
  PO_EXCESS: "/supply-chain/purchase-orders/excess",
  PO_WHITELIST: "/supply-chain/purchase-orders/whitelist",
  PO_TIMELINE: "/supply-chain/purchase-orders/timeline",
  PO_OUTPUT: "/supply-chain/purchase-orders/output",
  DEADSTOCK: "/supply-chain/deadstock",
  LEAD_TIME: "/supply-chain/lead-time",
  RELEASE_SCHEDULE: "/supply-chain/release-schedule",
} as const

// Sales Data Routes
export const SALES_DATA_ROUTES = {
  SALES: "/sales-data/sales",
  CANCELLED: "/sales-data/sales/cancelled",
  PLATFORMS: "/sales-data/platforms",
  TIKTOK: "/sales-data/platforms/tiktok",
  SHOPEE: "/sales-data/platforms/shopee",
  TOKOPEDIA: "/sales-data/platforms/tokopedia",
} as const

// Status Constants
export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  IN_STOCK: "in_stock",
  OUT_OF_STOCK: "out_of_stock",
  LOW_STOCK: "low_stock",
} as const

// Platform Constants
export const PLATFORMS = {
  TIKTOK: "tiktok",
  SHOPEE: "shopee",
  TOKOPEDIA: "tokopedia",
  OFFLINE: "offline",
} as const

// Permission Constants
export const PERMISSIONS = {
  READ: "read",
  WRITE: "write",
  DELETE: "delete",
  ADMIN: "admin",
} as const

// Table Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: "#3b82f6",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#06b6d4",
  GRAY: "#6b7280",
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: "dd/MM/yyyy",
  LONG: "dd MMMM yyyy",
  WITH_TIME: "dd/MM/yyyy HH:mm",
  TIME_ONLY: "HH:mm",
} as const
