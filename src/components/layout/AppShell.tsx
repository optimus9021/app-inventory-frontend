"use client"

import React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { useAppShell } from "@/context/AppShellContext"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    mobileMenuOpen, 
    setMobileMenuOpen 
  } = useAppShell()

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      {/* Fixed Sidebar - Desktop */}
      <div className={cn(
        "fixed left-0 top-0 h-full z-30 transition-all duration-300 hidden lg:block",
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}>
        <Sidebar isCollapsed={sidebarCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full z-40 transition-transform duration-300 lg:hidden w-64",
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar isCollapsed={false} />
      </div>

      {/* Fixed Header */}
      <div className={cn(
        "fixed top-0 right-0 h-16 z-50 transition-all duration-300 left-0",
        sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
      )}>
        <Header onToggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area - This is where pages will render */}
      <div className={cn(
        "h-full transition-all duration-300 ml-0",
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}>
        <div className="pt-16 h-full">
          <main className="h-full overflow-auto">
            <div className="p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
