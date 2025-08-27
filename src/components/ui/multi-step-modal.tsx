import React from "react"
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface MultiStepModalStep {
  id: string
  title: string
  description?: string
  component: React.ComponentType<{
    onNext: () => void
    onPrevious: () => void
    onComplete: () => void
    stepData?: unknown
    updateStepData?: (data: unknown) => void
  }>
  validation?: (data?: unknown) => boolean | string
  optional?: boolean
}

interface MultiStepModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  steps: MultiStepModalStep[]
  currentStep?: number
  onComplete: (data: Record<string, unknown>) => void
  onStepChange?: (step: number) => void
  allowStepNavigation?: boolean
  showProgress?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function MultiStepModal({
  isOpen,
  onClose,
  title,
  description,
  steps,
  currentStep: controlledCurrentStep,
  onComplete,
  onStepChange,
  allowStepNavigation = false,
  showProgress = true,
  className = "",
  size = 'lg'
}: MultiStepModalProps) {
  const [internalCurrentStep, setInternalCurrentStep] = React.useState(0)
  const [stepData, setStepData] = React.useState<Record<string, unknown>>({})
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set())
  const [errors, setErrors] = React.useState<Record<number, string>>({})

  const currentStep = controlledCurrentStep ?? internalCurrentStep
  const currentStepConfig = steps[currentStep]

  const updateStepData = (stepId: string, data: unknown) => {
    setStepData(prev => ({ ...prev, [stepId]: data }))
    // Clear error when data is updated
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[currentStep]
      return newErrors
    })
  }

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    const data = stepData[step.id]

    if (step.validation) {
      const result = step.validation(data)
      if (typeof result === 'string') {
        setErrors(prev => ({ ...prev, [stepIndex]: result }))
        return false
      } else if (!result) {
        setErrors(prev => ({ ...prev, [stepIndex]: 'Please complete this step' }))
        return false
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[stepIndex]
      return newErrors
    })
    return true
  }

  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return

    const newStep = Math.max(0, Math.min(stepIndex, steps.length - 1))
    
    if (controlledCurrentStep !== undefined) {
      onStepChange?.(newStep)
    } else {
      setInternalCurrentStep(newStep)
    }
  }

  const goToNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
      
      if (currentStep < steps.length - 1) {
        goToStep(currentStep + 1)
      } else {
        // All steps completed
        handleComplete()
      }
    }
  }

  const goToPrevious = () => {
    goToStep(currentStep - 1)
  }

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]))
      onComplete(stepData)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (!allowStepNavigation) return

    // Can only navigate to completed steps or the next immediate step
    const canNavigate = completedSteps.has(stepIndex) || 
                       stepIndex === currentStep ||
                       (stepIndex === currentStep + 1 && validateStep(currentStep))

    if (canNavigate) {
      if (stepIndex > currentStep) {
        // Validate current step before moving forward
        if (validateStep(currentStep)) {
          setCompletedSteps(prev => new Set([...prev, currentStep]))
          goToStep(stepIndex)
        }
      } else {
        goToStep(stepIndex)
      }
    }
  }

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.has(stepIndex)) return 'completed'
    if (stepIndex === currentStep) return 'current'
    if (errors[stepIndex]) return 'error'
    return 'pending'
  }

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  React.useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setInternalCurrentStep(0)
      setStepData({})
      setCompletedSteps(new Set())
      setErrors({})
    }
  }, [isOpen])

  const StepComponent = currentStepConfig?.component

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className={className}
      size={size}
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="flex-shrink-0 ml-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Steps */}
        {showProgress && (
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const status = getStepStatus(index)
                const isClickable = allowStepNavigation && (
                  completedSteps.has(index) || 
                  index === currentStep ||
                  (index === currentStep + 1 && !errors[currentStep])
                )

                return (
                  <React.Fragment key={step.id}>
                    {/* Step */}
                    <div 
                      className={cn(
                        "flex flex-col items-center",
                        isClickable && "cursor-pointer group"
                      )}
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Step Circle */}
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                        status === 'completed' && "bg-green-500 text-white",
                        status === 'current' && "bg-blue-500 text-white",
                        status === 'error' && "bg-red-500 text-white",
                        status === 'pending' && "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
                        isClickable && "group-hover:scale-110"
                      )}>
                        {status === 'completed' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="text-center mt-2">
                        <p className={cn(
                          "text-xs font-medium",
                          status === 'current' && "text-blue-600 dark:text-blue-400",
                          status === 'completed' && "text-green-600 dark:text-green-400",
                          status === 'error' && "text-red-600 dark:text-red-400",
                          status === 'pending' && "text-gray-500 dark:text-gray-400"
                        )}>
                          {step.title}
                        </p>
                        {step.optional && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Optional
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-2",
                        completedSteps.has(index) ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                      )} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Current Step Description */}
            {currentStepConfig?.description && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {currentStepConfig.description}
                </p>
              </div>
            )}

            {/* Error Message */}
            {errors[currentStep] && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">
                  {errors[currentStep]}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {StepComponent && (
            <StepComponent
              onNext={goToNext}
              onPrevious={goToPrevious}
              onComplete={handleComplete}
              stepData={stepData[currentStepConfig.id]}
              updateStepData={(data) => updateStepData(currentStepConfig.id, data)}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {isLastStep ? (
              <Button
                onClick={handleComplete}
                className="flex items-center gap-2"
              >
                Complete
                <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={goToNext}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}
