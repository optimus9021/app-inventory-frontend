"use client"

import * as React from "react"
import { CheckCircle, X, AlertTriangle, Info, Loader2 } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all duration-300 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        loading: "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  onClose?: () => void
  autoClose?: boolean
  duration?: number
  title?: string
  description?: string
  action?: React.ReactNode
}

const iconMap = {
  success: CheckCircle,
  destructive: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
  default: Info,
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", onClose, autoClose = true, duration = 5000, title, description, action, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    const IconComponent = iconMap[variant || "default"]

    React.useEffect(() => {
      if (autoClose && isVisible) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => onClose?.(), 300) // Allow animation to complete
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [autoClose, duration, isVisible, onClose])

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), "pointer-events-auto", className)}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <IconComponent 
            className={cn(
              "h-5 w-5 mt-0.5 flex-shrink-0",
              variant === "loading" && "animate-spin"
            )} 
          />
          <div className="grid gap-1 flex-1">
            {title && (
              <div className="text-sm font-semibold">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm opacity-90">
                {description}
              </div>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
        {onClose && (
          <button
            className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose(), 300)
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

// Toast Container
interface ToastContainerProps {
  children: React.ReactNode
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4", 
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  children, 
  position = "top-right" 
}) => {
  return (
    <div className={cn(
      "fixed z-[60] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px] pointer-events-none",
      positionClasses[position]
    )}>
      {children}
    </div>
  )
}

// Toast Hook
interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning" | "info" | "loading"
  duration?: number
  action?: React.ReactNode
}

interface ToastContextType {
  addToast: (options: ToastOptions) => string
  removeToast: (id: string) => void
  toasts: Array<ToastOptions & { id: string }>
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<Array<ToastOptions & { id: string }>>([])

  const addToast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...options, id }])
    return id
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const contextValue = React.useMemo(
    () => ({ addToast, removeToast, toasts }),
    [addToast, removeToast, toasts]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { Toast, ToastContainer }
