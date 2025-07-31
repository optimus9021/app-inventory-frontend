"use client"

import React from "react"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Fixed Sidebar - Desktop */}
      <div className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 hidden lg:block ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-40 transition-transform duration-300 lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        <Sidebar isCollapsed={false} />
      </div>

      {/* Fixed Header */}
      <div className={`fixed top-0 right-0 h-16 z-20 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
      } left-0`}>
        <Header onToggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className={`h-full transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } ml-0`}>
        <div className="pt-16 h-full">
          <main className="h-full overflow-auto">
            <div className="p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
