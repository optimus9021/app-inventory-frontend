"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, Bell, User, Sun, Moon, LogOut, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/context/ThemeContext"
import { useAppShell } from "@/context/AppShellContext"
import { useRealtimeData } from "@/hooks/useRealtimeData"
import { useToast } from "@/components/ui/toast"

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme()
  const { notificationCount, userProfile } = useAppShell()
  const { notifications, markNotificationAsRead } = useRealtimeData()
  const { addToast } = useToast()
  
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  
  const notificationRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId)
    addToast({
      title: "Notification",
      description: "Notification marked as read",
      variant: "success"
    })
  }

  const handleToggleTheme = () => {
    toggleTheme()
    addToast({
      title: "Theme Changed",
      description: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      variant: "success"
    })
  }

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowUserMenu(false) // Close other dropdown
  }

  const handleToggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    setShowNotifications(false) // Close other dropdown
  }

  const handleLogout = () => {
    addToast({
      title: "Logout",
      description: "Logged out successfully",
      variant: "warning"
    })
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5 pointer-events-auto" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors pointer-events-auto ${
              searchFocused ? 'text-primary' : 'text-muted-foreground'
            }`} />
            <Input
              placeholder="Search anything..."
              className={`w-64 pl-10 transition-all duration-200 lg:w-96 ${
                searchFocused 
                  ? 'ring-2 ring-primary/20 border-primary/50' 
                  : 'border-border'
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2">
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleTheme}
            className="relative overflow-hidden"
          >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-all duration-300 hover:scale-110 pointer-events-auto" />
              ) : (
                <Moon className="h-5 w-5 transition-all duration-300 hover:scale-110 pointer-events-auto" />
              )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleNotifications}
              className="relative"
            >
              <Bell className={`h-5 w-5 transition-all duration-200 pointer-events-auto ${
                showNotifications ? 'scale-110 text-primary' : ''
              }`} />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -right-1 -top-1 h-5 w-5 min-w-[20px] p-0 text-xs animate-pulse flex items-center justify-center rounded-full"
                >
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-popover p-0 shadow-lg animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <Link 
                    href="/notifications" 
                    className="text-sm text-primary hover:underline"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications && notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <div 
                        key={notification.id} 
                        className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-0"
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className={`mt-2 h-2 w-2 rounded-full ${
                          notification.unread ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {notification.title || 'Notification'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.message || 'No message'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time || 'Just now'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : notificationCount > 0 ? (
                    // Show placeholder when count exists but no notification data
                    <div className="p-4">
                      {[...Array(Math.min(notificationCount, 3))].map((_, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-0"
                        >
                          <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              New Notification
                            </p>
                            <p className="text-xs text-muted-foreground">
                              You have a new notification waiting
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Just now
                            </p>
                          </div>
                        </div>
                      ))}
                      {notificationCount > 3 && (
                        <div className="p-3 text-center text-xs text-muted-foreground border-t">
                          +{notificationCount - 3} more notifications
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <div className="flex items-center gap-3">
              {/* User Info - Hidden on mobile */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.email}</p>
              </div>
              
              {/* User Avatar Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleUserMenu}
                className={`relative rounded-full transition-all duration-200 ${
                  showUserMenu ? 'ring-2 ring-primary/20 bg-muted' : ''
                }`}
              >
                <User className="h-5 w-5 pointer-events-auto" />
                <span className="sr-only">User menu</span>
              </Button>
            </div>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-popover p-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </div>
                
                <div className="py-1">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="h-4 w-4 pointer-events-auto" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                  >
                    <LogOut className="h-4 w-4 pointer-events-auto" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
