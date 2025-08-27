import React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// Base chart container
interface ChartContainerProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  loading?: boolean
}

export function ChartContainer({ 
  children, 
  className = "", 
  title, 
  description,
  loading = false 
}: ChartContainerProps) {
  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        {title && (
          <div className="mb-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2 animate-pulse" />
            {description && (
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
            )}
          </div>
        )}
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </Card>
    )
  }

  return (
    <Card className={cn("p-6", className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </Card>
  )
}

// Simple Bar Chart
interface BarChartData {
  label: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarChartData[]
  height?: number
  showValues?: boolean
  className?: string
  animated?: boolean
}

export function BarChart({ 
  data, 
  height = 200, 
  showValues = false,
  className = "",
  animated = true
}: BarChartProps) {
  const maxValue = Math.max(...data.map(item => item.value))
  
  return (
    <div className={cn("w-full", className)}>
      <div 
        className="flex items-end gap-2 p-4"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100
          const color = item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
          
          return (
            <div 
              key={index}
              className="flex-1 flex flex-col items-center group"
            >
              <div className="relative w-full flex flex-col items-center">
                {showValues && (
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {item.value}
                  </span>
                )}
                <div 
                  className={cn(
                    "w-full rounded-t-md transition-all duration-500 hover:opacity-80",
                    animated && "animate-in slide-in-from-bottom duration-700"
                  )}
                  style={{ 
                    height: `${percentage}%`,
                    backgroundColor: color,
                    minHeight: item.value > 0 ? '4px' : '0px'
                  }}
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Simple Line Chart
interface LineChartData {
  label: string
  value: number
}

interface LineChartProps {
  data: LineChartData[]
  height?: number
  color?: string
  strokeWidth?: number
  showDots?: boolean
  className?: string
  animated?: boolean
}

export function LineChart({ 
  data, 
  height = 200,
  color = "#3b82f6",
  strokeWidth = 2,
  showDots = true,
  className = "",
  animated = true
}: LineChartProps) {
  const maxValue = Math.max(...data.map(item => item.value))
  const minValue = Math.min(...data.map(item => item.value))
  const range = maxValue - minValue
  
  // Generate SVG path
  const generatePath = () => {
    if (data.length === 0) return ""
    
    const width = 400 // SVG viewBox width
    const chartHeight = height - 40 // Leave space for labels
    
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width
      const y = chartHeight - ((item.value - minValue) / range) * chartHeight
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <svg 
          width="100%" 
          height={height}
          viewBox={`0 0 400 ${height}`}
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern 
              id="grid" 
              width="40" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 40 0 L 0 0 0 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
              />
            </pattern>
          </defs>
          <rect 
            width="400" 
            height={height - 40} 
            fill="url(#grid)" 
          />
          
          {/* Line */}
          <path
            d={generatePath()}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            className={cn(
              "transition-all duration-500",
              animated && "animate-in slide-in-from-left duration-1000"
            )}
          />
          
          {/* Dots */}
          {showDots && data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = (height - 40) - ((item.value - minValue) / range) * (height - 40)
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className={cn(
                  "transition-all duration-300 hover:r-6",
                  animated && "animate-in zoom-in duration-700"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            )
          })}
          
          {/* Labels */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            
            return (
              <text
                key={index}
                x={x}
                y={height - 10}
                textAnchor="middle"
                className="text-xs fill-current text-gray-600 dark:text-gray-400"
              >
                {item.label}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// Simple Pie Chart
interface PieChartData {
  label: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieChartData[]
  size?: number
  showLabels?: boolean
  showValues?: boolean
  className?: string
  animated?: boolean
}

export function PieChart({ 
  data, 
  size = 200,
  showLabels = true,
  showValues = false,
  className = "",
  animated = true
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = size / 2 - 20
  const center = size / 2
  
  let currentAngle = -90 // Start from top
  
  const generateSlices = () => {
    return data.map((item, index) => {
      const percentage = (item.value / total) * 100
      const angle = (item.value / total) * 360
      const color = item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
      
      const startAngle = currentAngle
      const endAngle = currentAngle + angle
      currentAngle = endAngle
      
      // Convert to radians
      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180
      
      // Calculate arc path
      const x1 = center + radius * Math.cos(startRad)
      const y1 = center + radius * Math.sin(startRad)
      const x2 = center + radius * Math.cos(endRad)
      const y2 = center + radius * Math.sin(endRad)
      
      const largeArc = angle > 180 ? 1 : 0
      const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
      
      return {
        path,
        color,
        percentage: percentage.toFixed(1),
        label: item.label,
        value: item.value
      }
    })
  }

  const slices = generateSlices()

  return (
    <div className={cn("flex items-center gap-6", className)}>
      {/* Chart */}
      <div className="relative">
        <svg 
          width={size} 
          height={size}
          className="overflow-visible"
        >
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.path}
              fill={slice.color}
              className={cn(
                "transition-all duration-300 hover:scale-105 cursor-pointer",
                animated && "animate-in zoom-in duration-700"
              )}
              style={{ 
                transformOrigin: `${size/2}px ${size/2}px`,
                animationDelay: `${index * 150}ms`
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      {showLabels && (
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {slice.label}
                {showValues && ` (${slice.value})`}
                <span className="text-xs ml-1">
                  {slice.percentage}%
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Area Chart
interface AreaChartProps extends LineChartProps {
  fillColor?: string
  fillOpacity?: number
}

export function AreaChart({ 
  data, 
  height = 200,
  color = "#3b82f6",
  fillColor,
  fillOpacity = 0.2,
  strokeWidth = 2,
  showDots = true,
  className = "",
  animated = true
}: AreaChartProps) {
  const maxValue = Math.max(...data.map(item => item.value))
  const minValue = Math.min(...data.map(item => item.value))
  const range = maxValue - minValue
  const chartHeight = height - 40
  
  // Generate SVG path for area
  const generateAreaPath = (): { linePath: string; areaPath: string } => {
    if (data.length === 0) {
      return { linePath: "", areaPath: "" }
    }
    
    const width = 400
    
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * width
      const y = chartHeight - ((item.value - minValue) / range) * chartHeight
      return { x, y }
    })
    
    const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
    const areaPath = `${linePath} L ${points[points.length - 1].x},${chartHeight} L ${points[0].x},${chartHeight} Z`
    
    return { linePath, areaPath }
  }

  const { linePath, areaPath } = generateAreaPath()
  const fill = fillColor || color

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        <svg 
          width="100%" 
          height={height}
          viewBox={`0 0 400 ${height}`}
          className="overflow-visible"
        >
          {/* Grid */}
          <defs>
            <pattern 
              id="grid-area" 
              width="40" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 40 0 L 0 0 0 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                className="text-gray-200 dark:text-gray-700"
              />
            </pattern>
          </defs>
          <rect 
            width="400" 
            height={chartHeight} 
            fill="url(#grid-area)" 
          />
          
          {/* Area */}
          <path
            d={areaPath}
            fill={fill}
            fillOpacity={fillOpacity}
            className={cn(
              "transition-all duration-500",
              animated && "animate-in slide-in-from-bottom duration-1000"
            )}
          />
          
          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            className={cn(
              "transition-all duration-500",
              animated && "animate-in slide-in-from-left duration-1000"
            )}
          />
          
          {/* Dots */}
          {showDots && data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            const y = chartHeight - ((item.value - minValue) / range) * chartHeight
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className={cn(
                  "transition-all duration-300 hover:r-6",
                  animated && "animate-in zoom-in duration-700"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              />
            )
          })}
          
          {/* Labels */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400
            
            return (
              <text
                key={index}
                x={x}
                y={height - 10}
                textAnchor="middle"
                className="text-xs fill-current text-gray-600 dark:text-gray-400"
              >
                {item.label}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// Progress Ring
interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showValue?: boolean
  className?: string
  animated?: boolean
}

export function ProgressRing({ 
  value, 
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  backgroundColor = "#e5e7eb",
  showValue = true,
  className = "",
  animated = true
}: ProgressRingProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : 0}
          className={cn(
            "transition-all duration-1000 ease-out",
            animated && "animate-in"
          )}
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}
