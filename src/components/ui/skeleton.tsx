import * as React from "react"
import { cn } from "@/lib/utils"

// Skeleton component untuk loading states
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
      className
    )}
    {...props}
  />
))
Skeleton.displayName = "Skeleton"

// Skeleton presets untuk berbagai use cases
const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("p-6 space-y-4", className)}>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  </div>
)

const SkeletonTable: React.FC<{ rows?: number; columns?: number; className?: string }> = ({ 
  rows = 5, 
  columns = 4, 
  className 
}) => (
  <div className={cn("space-y-4", className)}>
    {/* Header */}
    <div className="flex space-x-4">
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} className="h-6 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-8 flex-1" />
        ))}
      </div>
    ))}
  </div>
)

const SkeletonForm: React.FC<{ fields?: number; className?: string }> = ({ 
  fields = 5, 
  className 
}) => (
  <div className={cn("space-y-6", className)}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index} className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <div className="flex space-x-2 pt-4">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
)

const SkeletonChart: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("space-y-4", className)}>
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="space-y-2">
      <div className="flex items-end space-x-2 h-48">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton 
            key={index} 
            className="flex-1"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </div>
    <div className="flex justify-center space-x-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  </div>
)

const SkeletonStats: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="p-6 border rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    ))}
  </div>
)

const SkeletonList: React.FC<{ items?: number; className?: string }> = ({ 
  items = 8, 
  className 
}) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-8 w-16" />
      </div>
    ))}
  </div>
)

const SkeletonModal: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("space-y-6 p-6", className)}>
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
    
    {/* Content */}
    <div className="space-y-4">
      <SkeletonForm fields={3} />
    </div>
    
    {/* Footer */}
    <div className="flex justify-end space-x-2 pt-4 border-t">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
)

const SkeletonNavigation: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 p-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 flex-1" />
      </div>
    ))}
  </div>
)

export {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonForm,
  SkeletonChart,
  SkeletonStats,
  SkeletonList,
  SkeletonModal,
  SkeletonNavigation
}
