"use client"

import React, { createContext, useContext, useState, useCallback } from 'react'

interface AppShellContextType {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  notificationCount: number
  setNotificationCount: (count: number) => void
  userProfile: {
    name: string
    email: string
    avatar?: string
  }
  setUserProfile: (profile: { name: string; email: string; avatar?: string }) => void
}

const AppShellContext = createContext<AppShellContextType | undefined>(undefined)

export function AppShellProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [userProfile, setUserProfile] = useState({
    name: "Admin User",
    email: "admin@company.com"
  })

  const toggleSidebar = useCallback(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileMenuOpen(!mobileMenuOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }, [sidebarCollapsed, mobileMenuOpen])

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const value = {
    sidebarCollapsed,
    toggleSidebar,
    mobileMenuOpen,
    setMobileMenuOpen,
    notificationCount,
    setNotificationCount,
    userProfile,
    setUserProfile
  }

  return (
    <AppShellContext.Provider value={value}>
      {children}
    </AppShellContext.Provider>
  )
}

export function useAppShell() {
  const context = useContext(AppShellContext)
  if (context === undefined) {
    return {
      sidebarCollapsed: false,
      toggleSidebar: () => {},
      mobileMenuOpen: false,
      setMobileMenuOpen: () => {},
      notificationCount: 0,
      setNotificationCount: () => {},
      userProfile: { name: "User", email: "user@example.com" },
      setUserProfile: () => {}
    }
  }
  return context
}
