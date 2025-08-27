import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, XCircle, Clock, Minus, AlertTriangle } from "lucide-react"

// Status Badge
interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'pending'
  text?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
  variant?: 'solid' | 'outline' | 'soft'
}

export function StatusBadge({
  status,
  text,
  size = 'md',
  showIcon = true,
  className = "",
  variant = 'soft'
}: StatusBadgeProps) {
  const getStatusConfig = (status: StatusBadgeProps['status']) => {
    const configs = {
      success: {
        icon: CheckCircle2,
        text: text || 'Success',
        colors: {
          solid: 'bg-green-500 text-white border-green-500',
          outline: 'bg-transparent text-green-600 border-green-500 dark:text-green-400',
          soft: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800'
        }
      },
      warning: {
        icon: AlertTriangle,
        text: text || 'Warning',
        colors: {
          solid: 'bg-yellow-500 text-white border-yellow-500',
          outline: 'bg-transparent text-yellow-600 border-yellow-500 dark:text-yellow-400',
          soft: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800'
        }
      },
      error: {
        icon: XCircle,
        text: text || 'Error',
        colors: {
          solid: 'bg-red-500 text-white border-red-500',
          outline: 'bg-transparent text-red-600 border-red-500 dark:text-red-400',
          soft: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800'
        }
      },
      info: {
        icon: AlertCircle,
        text: text || 'Info',
        colors: {
          solid: 'bg-blue-500 text-white border-blue-500',
          outline: 'bg-transparent text-blue-600 border-blue-500 dark:text-blue-400',
          soft: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800'
        }
      },
      neutral: {
        icon: Minus,
        text: text || 'Neutral',
        colors: {
          solid: 'bg-gray-500 text-white border-gray-500',
          outline: 'bg-transparent text-gray-600 border-gray-500 dark:text-gray-400',
          soft: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
        }
      },
      pending: {
        icon: Clock,
        text: text || 'Pending',
        colors: {
          solid: 'bg-orange-500 text-white border-orange-500',
          outline: 'bg-transparent text-orange-600 border-orange-500 dark:text-orange-400',
          soft: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800'
        }
      }
    }
    return configs[status]
  }

  const sizeClasses = {
    sm: {
      badge: 'px-2 py-1 text-xs',
      icon: 'h-3 w-3'
    },
    md: {
      badge: 'px-2.5 py-1.5 text-sm',
      icon: 'h-4 w-4'
    },
    lg: {
      badge: 'px-3 py-2 text-base',
      icon: 'h-5 w-5'
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 font-medium rounded-full border",
      sizeClasses[size].badge,
      config.colors[variant],
      className
    )}>
      {showIcon && (
        <Icon className={cn(sizeClasses[size].icon)} />
      )}
      {config.text}
    </span>
  )
}

// Status Dot
interface StatusDotProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'pending'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

export function StatusDot({
  status,
  size = 'md',
  animated = false,
  className = ""
}: StatusDotProps) {
  const getStatusColor = (status: StatusDotProps['status']) => {
    const colors = {
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      neutral: 'bg-gray-500',
      pending: 'bg-orange-500'
    }
    return colors[status]
  }

  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  }

  return (
    <span className={cn(
      "inline-block rounded-full",
      sizeClasses[size],
      getStatusColor(status),
      animated && "animate-pulse",
      className
    )} />
  )
}

// Status Card
interface StatusCardProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'pending'
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
  variant?: 'solid' | 'outline' | 'soft'
}

export function StatusCard({
  status,
  title,
  description,
  children,
  className = "",
  variant = 'soft'
}: StatusCardProps) {
  const getStatusConfig = (status: StatusCardProps['status']) => {
    const configs = {
      success: {
        icon: CheckCircle2,
        colors: {
          solid: 'bg-green-500 text-white border-green-500',
          outline: 'bg-white text-green-700 border-green-500 dark:bg-gray-900 dark:text-green-400',
          soft: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-950/10 dark:text-green-400 dark:border-green-800'
        }
      },
      warning: {
        icon: AlertTriangle,
        colors: {
          solid: 'bg-yellow-500 text-white border-yellow-500',
          outline: 'bg-white text-yellow-700 border-yellow-500 dark:bg-gray-900 dark:text-yellow-400',
          soft: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/10 dark:text-yellow-400 dark:border-yellow-800'
        }
      },
      error: {
        icon: XCircle,
        colors: {
          solid: 'bg-red-500 text-white border-red-500',
          outline: 'bg-white text-red-700 border-red-500 dark:bg-gray-900 dark:text-red-400',
          soft: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-950/10 dark:text-red-400 dark:border-red-800'
        }
      },
      info: {
        icon: AlertCircle,
        colors: {
          solid: 'bg-blue-500 text-white border-blue-500',
          outline: 'bg-white text-blue-700 border-blue-500 dark:bg-gray-900 dark:text-blue-400',
          soft: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/10 dark:text-blue-400 dark:border-blue-800'
        }
      },
      neutral: {
        icon: Minus,
        colors: {
          solid: 'bg-gray-500 text-white border-gray-500',
          outline: 'bg-white text-gray-700 border-gray-500 dark:bg-gray-900 dark:text-gray-400',
          soft: 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
        }
      },
      pending: {
        icon: Clock,
        colors: {
          solid: 'bg-orange-500 text-white border-orange-500',
          outline: 'bg-white text-orange-700 border-orange-500 dark:bg-gray-900 dark:text-orange-400',
          soft: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/10 dark:text-orange-400 dark:border-orange-800'
        }
      }
    }
    return configs[status]
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <div className={cn(
      "rounded-lg border p-4",
      config.colors[variant],
      className
    )}>
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{title}</h3>
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
          {children && (
            <div className="mt-3">{children}</div>
          )}
        </div>
      </div>
    </div>
  )
}

// Status List
interface StatusListItem {
  id: string
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'pending'
  title: string
  description?: string
  timestamp?: string
}

interface StatusListProps {
  items: StatusListItem[]
  showTimestamp?: boolean
  className?: string
}

export function StatusList({
  items,
  showTimestamp = false,
  className = ""
}: StatusListProps) {
  const getStatusConfig = (status: StatusListItem['status']) => {
    const configs = {
      success: { icon: CheckCircle2, color: 'text-green-500' },
      warning: { icon: AlertTriangle, color: 'text-yellow-500' },
      error: { icon: XCircle, color: 'text-red-500' },
      info: { icon: AlertCircle, color: 'text-blue-500' },
      neutral: { icon: Minus, color: 'text-gray-500' },
      pending: { icon: Clock, color: 'text-orange-500' }
    }
    return configs[status]
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const config = getStatusConfig(item.status)
        const Icon = config.icon

        return (
          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.color)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                {showTimestamp && item.timestamp && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">
                    {item.timestamp}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Health Status
interface HealthStatusProps {
  status: 'healthy' | 'warning' | 'critical' | 'unknown'
  label?: string
  details?: string
  className?: string
  showDetails?: boolean
}

export function HealthStatus({
  status,
  label,
  details,
  className = "",
  showDetails = true
}: HealthStatusProps) {
  const getHealthConfig = (status: HealthStatusProps['status']) => {
    const configs = {
      healthy: {
        icon: CheckCircle2,
        label: label || 'Healthy',
        color: 'text-green-500',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        borderColor: 'border-green-200 dark:border-green-800'
      },
      warning: {
        icon: AlertTriangle,
        label: label || 'Warning',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800'
      },
      critical: {
        icon: XCircle,
        label: label || 'Critical',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        borderColor: 'border-red-200 dark:border-red-800'
      },
      unknown: {
        icon: AlertCircle,
        label: label || 'Unknown',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50 dark:bg-gray-800',
        borderColor: 'border-gray-200 dark:border-gray-700'
      }
    }
    return configs[status]
  }

  const config = getHealthConfig(status)
  const Icon = config.icon

  return (
    <div className={cn(
      "rounded-lg border p-4",
      config.bgColor,
      config.borderColor,
      className
    )}>
      <div className="flex items-center gap-3">
        <Icon className={cn("h-6 w-6", config.color)} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              System Status:
            </span>
            <span className={cn("font-semibold", config.color)}>
              {config.label}
            </span>
          </div>
          {showDetails && details && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {details}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Connection Status
interface ConnectionStatusProps {
  connected: boolean
  label?: string
  showIndicator?: boolean
  className?: string
}

export function ConnectionStatus({
  connected,
  label,
  showIndicator = true,
  className = ""
}: ConnectionStatusProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIndicator && (
        <StatusDot 
          status={connected ? 'success' : 'error'} 
          size="sm" 
          animated={!connected}
        />
      )}
      <span className={cn(
        "text-sm font-medium",
        connected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      )}>
        {label || (connected ? 'Connected' : 'Disconnected')}
      </span>
    </div>
  )
}
