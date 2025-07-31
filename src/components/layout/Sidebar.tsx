"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  ShoppingCart, 
  Settings, 
  FileBarChart,
  Bell,
  BarChart3,
  TrendingUp,
  Users,
  Archive,
  ShoppingBag,
  TrendingDown,
  Target,
  Layers,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  isCollapsed: boolean
}

interface MenuItem {
  title: string
  icon: React.ElementType
  href?: string
  badge?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    children: [
      { title: "Realisasi Penjualan", icon: TrendingUp, href: "/dashboard/analytics/sales-realization" },
      { title: "Rekomendasi Produksi", icon: Target, href: "/dashboard/analytics/production-recommendation" },
      { title: "Rekomendasi Deadstock", icon: TrendingDown, href: "/dashboard/analytics/deadstock-recommendation" },
      { title: "Pareto Product", icon: BarChart3, href: "/dashboard/analytics/pareto-product" },
      { title: "Proyeksi Penjualan", icon: TrendingUp, href: "/dashboard/analytics/sales-projection" },
      { title: "Rekapitulasi Target", icon: Target, href: "/dashboard/analytics/target-recap" },
      { title: "Data Konversi", icon: Layers, href: "/dashboard/analytics/conversion-data" }
    ]
  },
  {
    title: "Products",
    icon: Package,
    children: [
      { title: "Stock Produk", icon: Package, href: "/products/stock" },
      { title: "Data Master", icon: Archive, href: "/products/master" },
      { title: "Input Operations", icon: ShoppingBag, href: "/products/input" },
      { title: "Clearance Sale", icon: TrendingDown, href: "/products/clearance" }
    ]
  },
  {
    title: "Supply Chain",
    icon: Truck,
    children: [
      { title: "Purchase Orders", icon: ShoppingCart, href: "/supply-chain/purchase-orders" },
      { title: "Deadstock", icon: TrendingDown, href: "/supply-chain/deadstock" },
      { title: "Lead Time", icon: Target, href: "/supply-chain/lead-time" },
      { title: "Release Schedule", icon: Layers, href: "/supply-chain/release-schedule" }
    ]
  },
  {
    title: "Sales Data",
    icon: ShoppingCart,
    children: [
      { title: "Data Sales", icon: ShoppingCart, href: "/sales-data/sales" },
      { title: "Platform TikTok", icon: ShoppingBag, href: "/sales-data/platforms/tiktok" },
      { title: "Platform Shopee", icon: ShoppingBag, href: "/sales-data/platforms/shopee" },
      { title: "Platform Tokopedia", icon: ShoppingBag, href: "/sales-data/platforms/tokopedia" }
    ]
  },
  {
    title: "Reports",
    icon: FileBarChart,
    href: "/reports"
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "User Management", icon: Users, href: "/settings/users" },
      { title: "System Settings", icon: Settings, href: "/settings/system" }
    ]
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/notifications",
    badge: "3"
  }
]

interface SidebarItemProps {
  item: MenuItem
  isCollapsed: boolean
  level?: number
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, isCollapsed, level = 0 }) => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href ? pathname === item.href : false
  const hasActiveChild = hasChildren && item.children?.some(child => 
    child.href && pathname.startsWith(child.href)
  )

  React.useEffect(() => {
    if (hasActiveChild) {
      setIsExpanded(true)
    }
  }, [hasActiveChild])

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }

  const itemContent = (
    <div 
      className={cn(
        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        {
          "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300": isActive,
          "text-gray-700 dark:text-gray-300": !isActive,
          "pl-6": level > 0,
          "pl-9": level > 1,
        }
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <item.icon className={cn("h-5 w-5", {
          "h-4 w-4": level > 0
        })} />
        {!isCollapsed && (
          <span className="font-medium">{item.title}</span>
        )}
      </div>
      
      {!isCollapsed && (
        <div className="flex items-center space-x-2">
          {item.badge && (
            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            isExpanded ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  )

  return (
    <div>
      {item.href ? (
        <Link href={item.href}>
          {itemContent}
        </Link>
      ) : (
        <button className="w-full text-left">
          {itemContent}
        </button>
      )}
      
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child, index) => (
            <SidebarItem 
              key={index} 
              item={child} 
              isCollapsed={isCollapsed} 
              level={level + 1} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div className={cn(
      "h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
      {
        "w-64": !isCollapsed,
        "w-16": isCollapsed
      }
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Inventory
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Management System
              </p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="px-4 pb-4 space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            item={item} 
            isCollapsed={isCollapsed} 
          />
        ))}
      </nav>
    </div>
  )
}
