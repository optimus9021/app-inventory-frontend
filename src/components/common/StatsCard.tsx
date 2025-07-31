"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon?: React.ElementType
  description?: string
  type?: "currency" | "number" | "percentage"
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description,
  type = "number"
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val
    
    switch (type) {
      case "currency":
        return formatCurrency(val)
      case "percentage":
        return formatPercentage(val)
      default:
        return formatNumber(val)
    }
  }

  const getChangeBadgeVariant = () => {
    if (!change) return "secondary"
    return changeType === "increase" ? "success" : "destructive"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatValue(value)}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant={getChangeBadgeVariant()} className="flex items-center space-x-1">
              {changeType === "increase" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{Math.abs(change)}%</span>
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              from last month
            </span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
