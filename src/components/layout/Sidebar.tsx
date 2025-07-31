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
        "flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-xl transition-all duration-200 relative group",
        "hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm hover:scale-[1.02]",
        {
          "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:from-blue-900/50 dark:to-blue-800/30 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-700": isActive,
          "text-gray-700 dark:text-gray-300": !isActive,
          "pl-6": level > 0,
          "pl-9": level > 1,
          "bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 dark:hover:from-orange-900/30 dark:hover:to-yellow-900/30 border border-orange-200 dark:border-orange-700": item.title === "Notifications" && item.badge,
        }
      )}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <item.icon className={cn("transition-all duration-200 group-hover:scale-110", {
          "h-5 w-5": level === 0,
          "h-4 w-4": level > 0
        })} />
        {!isCollapsed && (
          <span className="font-medium transition-all duration-200">{item.title}</span>
        )}
      </div>
      
      {isCollapsed && item.badge && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center min-w-[16px] animate-pulse shadow-lg"
        >
          {item.badge}
        </Badge>
      )}
      
      {!isCollapsed && (
        <div className="flex items-center space-x-2">
          {item.badge && (
            <Badge 
              variant="destructive" 
              className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center min-w-[20px] animate-pulse shadow-sm"
            >
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <div className="transition-transform duration-200">
              {isExpanded ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronRight className="h-4 w-4" />
              }
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div className="relative">
      {item.href ? (
        <Link href={item.href} className="block">
          {itemContent}
        </Link>
      ) : (
        <button className="w-full text-left">
          {itemContent}
        </button>
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && level === 0 && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
          {item.title}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-r-4 border-r-gray-900 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
        </div>
      )}
      
      {hasChildren && isExpanded && !isCollapsed && (
        <div className="mt-1 space-y-1 ml-2">
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
      "h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-200/80 dark:border-gray-700/80 transition-all duration-300 shadow-xl flex flex-col",
      {
        "w-64": !isCollapsed,
        "w-16": isCollapsed
      }
    )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200/80 dark:border-gray-700/80">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-lg flex items-center justify-center shadow-lg transition-colors duration-300">
            <Package className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="transition-all duration-300 opacity-100">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Inventory
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Management System
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            item={item} 
            isCollapsed={isCollapsed} 
          />
        ))}
      </nav>

      {/* Footer Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200/80 dark:border-gray-700/80">
          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
              © 2025 Inventory System
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
