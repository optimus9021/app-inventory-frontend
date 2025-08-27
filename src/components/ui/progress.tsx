import React from "react"
import { cn } from "@/lib/utils"
import { Loader2, CheckCircle2, AlertCircle, XCircle } from "lucide-react"

// Linear Progress Bar
interface ProgressBarProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  showValue?: boolean
  animated?: boolean
  striped?: boolean
  className?: string
  label?: string
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = false,
  animated = true,
  striped = false,
  className = "",
  label
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  
  const colorClasses = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        "w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorClasses[color],
            striped && "bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_100%]",
            animated && striped && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Circular Progress
interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: 'primary' | 'success' | 'warning' | 'error'
  showValue?: boolean
  animated?: boolean
  className?: string
  children?: React.ReactNode
}

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = 'primary',
  showValue = true,
  animated = true,
  className = "",
  children
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const colorClasses = {
    primary: 'stroke-blue-500',
    success: 'stroke-green-500',
    warning: 'stroke-yellow-500',
    error: 'stroke-red-500'
  }

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
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-gray-200 dark:stroke-gray-700"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : circumference}
          className={cn(
            "transition-all duration-1000 ease-out",
            colorClasses[color]
          )}
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showValue && (
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
    </div>
  )
}

// Step Progress
interface StepProgressStep {
  label: string
  description?: string
  status: 'pending' | 'current' | 'completed' | 'error'
}

interface StepProgressProps {
  steps: StepProgressStep[]
  direction?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StepProgress({
  steps,
  direction = 'horizontal',
  size = 'md',
  className = ""
}: StepProgressProps) {
  const sizeClasses = {
    sm: {
      circle: 'w-6 h-6',
      text: 'text-xs',
      spacing: direction === 'horizontal' ? 'gap-2' : 'gap-1'
    },
    md: {
      circle: 'w-8 h-8',
      text: 'text-sm',
      spacing: direction === 'horizontal' ? 'gap-4' : 'gap-2'
    },
    lg: {
      circle: 'w-10 h-10',
      text: 'text-base',
      spacing: direction === 'horizontal' ? 'gap-6' : 'gap-3'
    }
  }

  const getStepIcon = (step: StepProgressStep, index: number) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle2 className="w-full h-full text-white" />
      case 'error':
        return <XCircle className="w-full h-full text-white" />
      case 'current':
        return <div className="w-2 h-2 bg-white rounded-full" />
      default:
        return <span className="text-white text-xs font-medium">{index + 1}</span>
    }
  }

  const getStepColor = (status: StepProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500'
      case 'error':
        return 'bg-red-500 border-red-500'
      case 'current':
        return 'bg-blue-500 border-blue-500'
      default:
        return 'bg-gray-300 border-gray-300 dark:bg-gray-600 dark:border-gray-600'
    }
  }

  if (direction === 'vertical') {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* Step Circle */}
            <div className={cn(
              "rounded-full border-2 flex items-center justify-center flex-shrink-0",
              sizeClasses[size].circle,
              getStepColor(step.status)
            )}>
              {getStepIcon(step, index)}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium",
                sizeClasses[size].text,
                step.status === 'completed' ? 'text-green-700 dark:text-green-400' :
                step.status === 'current' ? 'text-blue-700 dark:text-blue-400' :
                step.status === 'error' ? 'text-red-700 dark:text-red-400' :
                'text-gray-500 dark:text-gray-400'
              )}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
              )}
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 mt-8 w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn(
      "flex items-center",
      sizeClasses[size].spacing,
      className
    )}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className="flex flex-col items-center">
            {/* Step Circle */}
            <div className={cn(
              "rounded-full border-2 flex items-center justify-center",
              sizeClasses[size].circle,
              getStepColor(step.status)
            )}>
              {getStepIcon(step, index)}
            </div>
            
            {/* Step Label */}
            <div className="text-center mt-2">
              <p className={cn(
                "font-medium",
                sizeClasses[size].text,
                step.status === 'completed' ? 'text-green-700 dark:text-green-400' :
                step.status === 'current' ? 'text-blue-700 dark:text-blue-400' :
                step.status === 'error' ? 'text-red-700 dark:text-red-400' :
                'text-gray-500 dark:text-gray-400'
              )}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-20">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-2",
              step.status === 'completed' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

// Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'success' | 'warning' | 'error' | 'white'
  className?: string
  text?: string
}

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = "",
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
    white: 'text-white'
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Loader2 className={cn(
        "animate-spin",
        sizeClasses[size],
        colorClasses[color]
      )} />
      {text && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {text}
        </span>
      )}
    </div>
  )
}

// Upload Progress
interface UploadProgressProps {
  files: Array<{
    name: string
    progress: number
    status: 'uploading' | 'completed' | 'error'
    error?: string
  }>
  className?: string
}

export function UploadProgress({
  files,
  className = ""
}: UploadProgressProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {files.map((file, index) => (
        <div key={index} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {file.name}
            </span>
            <div className="flex items-center gap-2">
              {file.status === 'uploading' && (
                <LoadingSpinner size="sm" />
              )}
              {file.status === 'completed' && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {file.status === 'error' && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {file.progress}%
              </span>
            </div>
          </div>
          
          <ProgressBar
            value={file.progress}
            size="sm"
            color={
              file.status === 'completed' ? 'success' :
              file.status === 'error' ? 'error' : 'primary'
            }
            animated={file.status === 'uploading'}
          />
          
          {file.status === 'error' && file.error && (
            <p className="text-xs text-red-500 mt-1">
              {file.error}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

// Pulse Loader
interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}

export function PulseLoader({
  size = 'md',
  color = 'primary',
  className = ""
}: PulseLoaderProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  const colorClasses = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  )
}
