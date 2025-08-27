import React from "react"
import { cn } from "@/lib/utils"

export type AnimationType = 
  | 'fade' 
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right'
  | 'scale'
  | 'scale-up'
  | 'scale-down'
  | 'bounce'
  | 'pulse'
  | 'wiggle'
  | 'spin'
  | 'flip'
  | 'zoom'

export type AnimationDuration = 'fast' | 'normal' | 'slow' | 'slower'
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic'

export interface AnimationProps {
  type?: AnimationType
  duration?: AnimationDuration | number
  delay?: number
  easing?: AnimationEasing
  repeat?: boolean | number
  children: React.ReactNode
  className?: string
  trigger?: 'mount' | 'hover' | 'click' | 'focus' | 'scroll'
  threshold?: number // For scroll trigger
  onAnimationStart?: () => void
  onAnimationEnd?: () => void
}

const animationClasses: Record<AnimationType, string> = {
  'fade': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
  'scale': 'animate-scale',
  'scale-up': 'animate-scale-up',
  'scale-down': 'animate-scale-down',
  'bounce': 'animate-bounce',
  'pulse': 'animate-pulse',
  'wiggle': 'animate-wiggle',
  'spin': 'animate-spin',
  'flip': 'animate-flip',
  'zoom': 'animate-zoom'
}

const durationClasses: Record<AnimationDuration, string> = {
  'fast': 'duration-150',
  'normal': 'duration-300',
  'slow': 'duration-500',
  'slower': 'duration-700'
}

const easingClasses: Record<AnimationEasing, string> = {
  'linear': 'ease-linear',
  'ease': 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'bounce': 'ease-bounce',
  'elastic': 'ease-elastic'
}

export function AnimatedDiv({
  type = 'fade',
  duration = 'normal',
  delay = 0,
  easing = 'ease-in-out',
  repeat = false,
  children,
  className = "",
  trigger = 'mount',
  threshold = 0.1,
  onAnimationStart,
  onAnimationEnd
}: AnimationProps) {
  const [isVisible, setIsVisible] = React.useState(trigger === 'mount')
  const [shouldAnimate, setShouldAnimate] = React.useState(false)
  const elementRef = React.useRef<HTMLDivElement>(null)

  // Handle scroll trigger
  React.useEffect(() => {
    if (trigger !== 'scroll') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setShouldAnimate(true)
          }
        })
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [trigger, threshold])

  // Handle mount trigger
  React.useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(() => {
        setShouldAnimate(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [trigger, delay])

  const handleInteraction = () => {
    if (trigger === 'hover' || trigger === 'click' || trigger === 'focus') {
      setShouldAnimate(true)
      if (onAnimationStart) onAnimationStart()
    }
  }

  const handleAnimationEnd = () => {
    if (onAnimationEnd) onAnimationEnd()
    if (typeof repeat === 'number' && repeat > 1) {
      // Handle repeat count logic
      setTimeout(() => setShouldAnimate(false), 50)
      setTimeout(() => setShouldAnimate(true), 100)
    }
  }

  const getAnimationClasses = () => {
    const classes = []
    
    if (shouldAnimate) {
      classes.push(animationClasses[type])
      
      if (typeof duration === 'string') {
        classes.push(durationClasses[duration])
      } else {
        classes.push(`duration-[${duration}ms]`)
      }
      
      classes.push(easingClasses[easing])
      
      if (repeat === true) {
        classes.push('animate-infinite')
      } else if (typeof repeat === 'number' && repeat > 1) {
        classes.push(`animate-repeat-${repeat}`)
      }
    }
    
    return classes.join(' ')
  }

  const eventHandlers = {
    ...(trigger === 'hover' && {
      onMouseEnter: handleInteraction,
      onMouseLeave: () => setShouldAnimate(false)
    }),
    ...(trigger === 'click' && {
      onClick: handleInteraction
    }),
    ...(trigger === 'focus' && {
      onFocus: handleInteraction,
      onBlur: () => setShouldAnimate(false)
    })
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        getAnimationClasses(),
        !isVisible && trigger === 'scroll' && 'opacity-0',
        className
      )}
      style={{
        animationDelay: trigger === 'mount' ? `${delay}ms` : undefined
      }}
      onAnimationStart={onAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      {...eventHandlers}
    >
      {children}
    </div>
  )
}

// Specialized Animation Components
export function FadeIn({ children, ...props }: Omit<AnimationProps, 'type'>) {
  return <AnimatedDiv type="fade" {...props}>{children}</AnimatedDiv>
}

export function SlideUp({ children, ...props }: Omit<AnimationProps, 'type'>) {
  return <AnimatedDiv type="slide-up" {...props}>{children}</AnimatedDiv>
}

export function ScaleIn({ children, ...props }: Omit<AnimationProps, 'type'>) {
  return <AnimatedDiv type="scale" {...props}>{children}</AnimatedDiv>
}

export function Bounce({ children, ...props }: Omit<AnimationProps, 'type'>) {
  return <AnimatedDiv type="bounce" {...props}>{children}</AnimatedDiv>
}

// Stagger Animation Container
interface StaggerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 100, className = "" }: StaggerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedDiv
          type="fade"
          trigger="scroll"
          delay={index * staggerDelay}
          key={index}
        >
          {child}
        </AnimatedDiv>
      ))}
    </div>
  )
}

// Page Transition Component
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <AnimatedDiv
      type="fade"
      duration="fast"
      className={cn("min-h-screen", className)}
    >
      {children}
    </AnimatedDiv>
  )
}

// Loading Animation Components
export function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-current rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  )
}

export function LoadingSpinner({ size = 'md', className = "" }: { 
  size?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div
      className={cn(
        "border-2 border-current border-t-transparent rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
    />
  )
}

export function LoadingPulse({ className = "" }: { className?: string }) {
  return (
    <div className={cn("flex space-x-2", className)}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-3 h-8 bg-current rounded animate-pulse"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1.2s'
          }}
        />
      ))}
    </div>
  )
}

// Micro-interaction Components
interface ButtonAnimationProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function AnimatedButton({ children, className = "", onClick, disabled }: ButtonAnimationProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "hover:scale-105 active:scale-95 transition-transform duration-150",
        className
      )}
    >
      <AnimatedDiv
        type="scale"
        trigger="click"
        duration="fast"
      >
        {children}
      </AnimatedDiv>
    </button>
  )
}

export function FloatingElement({ children, className = "" }: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div
      className={cn(
        "animate-float",
        className
      )}
      style={{
        animation: 'float 3s ease-in-out infinite'
      }}
    >
      {children}
    </div>
  )
}

// Progress Animation
interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  duration?: number
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  className = "", 
  duration = 1000 
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  const percentage = Math.min((animatedValue / max) * 100, 100)

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700", className)}>
      <div
        className="bg-blue-600 h-2 rounded-full transition-all ease-out"
        style={{
          width: `${percentage}%`,
          transitionDuration: `${duration}ms`
        }}
      />
    </div>
  )
}

// Notification Animation
interface NotificationProps {
  children: React.ReactNode
  show: boolean
  position?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  className?: string
}

export function AnimatedNotification({ 
  children, 
  show, 
  position = 'top-right',
  className = "" 
}: NotificationProps) {
  const positionClasses = {
    'top': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  }

  if (!show) return null

  return (
    <AnimatedDiv
      type="slide-up"
      duration="fast"
      className={cn(
        "fixed z-50",
        positionClasses[position],
        className
      )}
    >
      {children}
    </AnimatedDiv>
  )
}
