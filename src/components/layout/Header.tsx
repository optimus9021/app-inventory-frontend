"use client"

import React from "react"
import Link from "next/link"
import { Menu, Search, Bell, User, Sun, Moon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/context/ThemeContext"

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = React.useState(false)
  const notificationRef = React.useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const mockNotifications = [
    { id: 1, title: "Low Stock Alert", message: "Product ABC running low", time: "2 min ago", unread: true },
    { id: 2, title: "New Order", message: "Order #12345 received", time: "5 min ago", unread: true },
    { id: 3, title: "Shipment Update", message: "Delivery completed", time: "1 hour ago", unread: false }
  ]

  return (
    <header className="h-16 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/80 dark:border-gray-700/80 px-4 flex items-center justify-between shadow-sm transition-all duration-300">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
          <Input
            placeholder="Search products, orders, customers..."
            className="pl-10 w-64 lg:w-96 bg-gray-50/80 dark:bg-gray-800/80 border-gray-200/80 dark:border-gray-700/80 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <div className="relative overflow-hidden">
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-500 animate-in spin-in-180 duration-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400 animate-in spin-in-180 duration-500" />
            )}
          </div>
        </Button>
        
        <div className="relative" ref={notificationRef}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center min-w-[20px] animate-pulse shadow-lg"
            >
              3
            </Badge>
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 rounded-lg shadow-xl z-50 transition-all duration-300">
              <div className="p-3 border-b border-gray-200/80 dark:border-gray-700/80">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">Notifications</h3>
                  <Link href="/notifications" className="text-xs text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300">
                    View all
                  </Link>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="p-3 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 border-b border-gray-100/80 dark:border-gray-700/80 last:border-b-0 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 transition-colors duration-300 ${notification.unread ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate transition-colors duration-300">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate transition-colors duration-300">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 transition-colors duration-300">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block transition-colors duration-300">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Admin User
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              admin@company.com
            </p>
          </div>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
              <User className="h-5 w-5 transition-colors duration-300" />
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:text-red-500">
            <LogOut className="h-5 w-5 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </header>
  )
}
