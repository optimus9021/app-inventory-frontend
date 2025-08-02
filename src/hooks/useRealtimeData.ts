"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAppShell } from '@/context/AppShellContext'

interface RealtimeData {
  notifications: Notification[]
  stats: DashboardStats
  activities: Activity[]
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  unread: boolean
  type: 'info' | 'warning' | 'error' | 'success'
}

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  lowStockAlerts: number
  revenueGrowth: number
  ordersGrowth: number
  productsGrowth: number
  alertsGrowth: number
}

interface Activity {
  id: number
  type: string
  message: string
  time: string
  amount?: number
  level?: string
}

export function useRealtimeData() {
  const { setNotificationCount } = useAppShell()
  const [data, setData] = useState<RealtimeData>({
    notifications: [
      { 
        id: '1', 
        title: "Low Stock Alert", 
        message: "Product ABC running low", 
        time: "2 min ago", 
        unread: true,
        type: 'warning'
      },
      { 
        id: '2', 
        title: "New Order", 
        message: "Order #12345 received", 
        time: "5 min ago", 
        unread: true,
        type: 'success'
      },
      { 
        id: '3', 
        title: "Shipment Update", 
        message: "Delivery completed", 
        time: "1 hour ago", 
        unread: false,
        type: 'info'
      }
    ],
    stats: {
      totalRevenue: 1250000000,
      totalOrders: 1250,
      totalProducts: 450,
      lowStockAlerts: 12,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      productsGrowth: 5.2,
      alertsGrowth: -15.2
    },
    activities: [
      {
        id: 1,
        type: "order",
        message: "New order #INV-001 from TikTok Shop",
        time: "2 minutes ago",
        amount: 150000
      },
      {
        id: 2,
        type: "stock",
        message: "Low stock alert for Product A",
        time: "10 minutes ago",
        level: "warning"
      },
      {
        id: 3,
        type: "production",
        message: "Production batch PB-123 completed",
        time: "1 hour ago"
      }
    ]
  })

    // Update notification count whenever notifications change
  useEffect(() => {
    const unreadCount = data.notifications.filter(n => n.unread).length
    setNotificationCount(unreadCount)
  }, [data.notifications, setNotificationCount]) // Update when notifications change

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new notifications occasionally
      if (Math.random() < 0.3) {
        setData(prev => {
          const newNotification: Notification = {
            id: Date.now().toString(),
            title: "New Alert",
            message: "System notification",
            time: "Just now",
            unread: true,
            type: Math.random() > 0.5 ? "info" : "warning"
          }
          
          const updatedNotifications = [newNotification, ...prev.notifications.slice(0, 9)]
          
          return {
            ...prev,
            notifications: updatedNotifications
          }
        })
      }

      // Simulate stats updates
      setData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalRevenue: prev.stats.totalRevenue + Math.floor(Math.random() * 100000),
          totalOrders: prev.stats.totalOrders + Math.floor(Math.random() * 5),
          revenueGrowth: Number((prev.stats.revenueGrowth + (Math.random() - 0.5) * 2).toFixed(1))
        }
      }))
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [setNotificationCount])

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setData(prev => {
      const updatedNotifications = prev.notifications.map(n => 
        n.id === notificationId ? { ...n, unread: false } : n
      )
      
      return {
        ...prev,
        notifications: updatedNotifications
      }
    })
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setData(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, unread: false }))
    }))
  }, [])

  return {
    notifications: data.notifications,
    stats: data.stats,
    activities: data.activities,
    markNotificationAsRead,
    markAllNotificationsAsRead
  }
}
