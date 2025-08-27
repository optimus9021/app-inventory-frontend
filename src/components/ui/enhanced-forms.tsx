import React from "react"
import { Eye, EyeOff, Check, X, AlertCircle, Info, Calendar, Clock, Search, ChevronDown, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

// Form Context
interface FormContextType {
  errors: Record<string, string>
  values: Record<string, unknown>
  touched: Record<string, boolean>
  isSubmitting: boolean
  setValue: (name: string, value: unknown) => void
  setError: (name: string, error: string) => void
  clearError: (name: string) => void
}

const FormContext = React.createContext<FormContextType | null>(null)

export function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}

// Form Provider
interface FormProviderProps {
  children: React.ReactNode
  initialValues?: Record<string, unknown>
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>
}

export function FormProvider({ children, initialValues = {}, onSubmit }: FormProviderProps) {
  const [values, setValues] = React.useState<Record<string, unknown>>(initialValues)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const setValue = React.useCallback((name: string, value: unknown) => {
    setValues(prev => ({ ...prev, [name]: value }))
    setTouched(prev => ({ ...prev, [name]: true }))
    // Clear error when value changes
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const setError = React.useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [])

  const clearError = React.useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!onSubmit || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contextValue: FormContextType = {
    errors,
    values,
    touched,
    isSubmitting,
    setValue,
    setError,
    clearError
  }

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  )
}

// Base Form Field
interface FormFieldProps {
  children: React.ReactNode
  name: string
  label?: string
  description?: string
  required?: boolean
  className?: string
}

export function FormField({ children, name, label, description, required, className = "" }: FormFieldProps) {
  const { errors, touched } = useFormContext()
  const hasError = touched[name] && errors[name]

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {description && !hasError && (
        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Info className="h-3 w-3" />
          {description}
        </p>
      )}
      {hasError && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {errors[name]}
        </p>
      )}
    </div>
  )
}

// Enhanced Input Component
interface EnhancedInputProps {
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  validation?: (value: string) => string | undefined
  className?: string
  maxLength?: number
  minLength?: number
  pattern?: string
  autoComplete?: string
}

export function EnhancedInput({
  name,
  type = 'text',
  placeholder,
  disabled,
  readOnly,
  prefix,
  suffix,
  validation,
  className = "",
  maxLength,
  minLength,
  pattern,
  autoComplete
}: EnhancedInputProps) {
  const { values, setValue, setError, errors, touched } = useFormContext()
  const [showPassword, setShowPassword] = React.useState(false)
  const value = values[name] as string || ""
  const hasError = touched[name] && errors[name]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(name, newValue)
    
    if (validation) {
      const error = validation(newValue)
      if (error) {
        setError(name, error)
      }
    }
  }

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className="relative">
      {prefix && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {prefix}
        </div>
      )}
      
      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        autoComplete={autoComplete}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          prefix && "pl-10",
          (suffix || type === 'password') && "pr-10",
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />

      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}

      {suffix && type !== 'password' && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {suffix}
        </div>
      )}
    </div>
  )
}

// Enhanced Textarea
interface EnhancedTextareaProps {
  name: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  rows?: number
  maxLength?: number
  showCharCount?: boolean
  autoResize?: boolean
  validation?: (value: string) => string | undefined
  className?: string
}

export function EnhancedTextarea({
  name,
  placeholder,
  disabled,
  readOnly,
  rows = 3,
  maxLength,
  showCharCount,
  autoResize,
  validation,
  className = ""
}: EnhancedTextareaProps) {
  const { values, setValue, setError, errors, touched } = useFormContext()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const value = values[name] as string || ""
  const hasError = touched[name] && errors[name]

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(name, newValue)
    
    if (validation) {
      const error = validation(newValue)
      if (error) {
        setError(name, error)
      }
    }

    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  React.useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value, autoResize])

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={autoResize ? 1 : rows}
        maxLength={maxLength}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          autoResize && "resize-none overflow-hidden",
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />
      
      {showCharCount && maxLength && (
        <div className="flex justify-end">
          <span className={cn(
            "text-xs",
            value.length > maxLength * 0.8 ? "text-orange-500" : "text-gray-500",
            value.length >= maxLength && "text-red-500"
          )}>
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
}

// Enhanced Select
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

interface EnhancedSelectProps {
  name: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  validation?: (value: unknown) => string | undefined
  className?: string
}

export function EnhancedSelect({
  name,
  options,
  placeholder = "Select an option",
  disabled,
  multiple,
  searchable,
  clearable,
  validation,
  className = ""
}: EnhancedSelectProps) {
  const { values, setValue, setError, errors, touched } = useFormContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const value = values[name]
  const hasError = touched[name] && errors[name]

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchQuery) return options
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery, searchable])

  const selectedOptions = React.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter(option => value.includes(option.value))
    }
    return options.filter(option => option.value === value)
  }, [options, value, multiple])

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : []
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value]
      setValue(name, newValues)
    } else {
      setValue(name, option.value)
      setIsOpen(false)
    }

    if (validation) {
      const error = validation(multiple ? value : option.value)
      if (error) {
        setError(name, error)
      }
    }
  }

  const handleClear = () => {
    setValue(name, multiple ? [] : "")
    setSearchQuery("")
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-red-500 focus:ring-red-500",
          className
        )}
      >
        <div className="flex items-center gap-2 flex-1 truncate">
          {selectedOptions.length > 0 ? (
            multiple ? (
              <div className="flex flex-wrap gap-1">
                {selectedOptions.slice(0, 2).map(option => (
                  <span
                    key={option.value}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded dark:bg-blue-900/20 dark:text-blue-400"
                  >
                    {option.icon}
                    {option.label}
                  </span>
                ))}
                {selectedOptions.length > 2 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded dark:bg-gray-800 dark:text-gray-400">
                    +{selectedOptions.length - 2} more
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {selectedOptions[0].icon}
                {selectedOptions[0].label}
              </div>
            )
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {clearable && selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "transform rotate-180"
          )} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 max-h-60 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search options..."
                  className="w-full pl-8 pr-2 py-1 text-sm border border-gray-200 rounded dark:border-gray-600 dark:bg-gray-700"
                />
              </div>
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = multiple 
                  ? Array.isArray(value) && value.includes(option.value)
                  : value === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !option.disabled && handleSelect(option)}
                    disabled={option.disabled}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700",
                      isSelected && "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {multiple && (
                      <div className={cn(
                        "w-4 h-4 border border-gray-300 rounded flex items-center justify-center",
                        isSelected && "bg-blue-600 border-blue-600"
                      )}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                    )}
                    {option.icon}
                    <span className="flex-1">{option.label}</span>
                    {!multiple && isSelected && <Check className="h-4 w-4 text-blue-600" />}
                  </button>
                )
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Number Input with Stepper
interface NumberInputProps {
  name: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
  prefix?: string
  suffix?: string
  validation?: (value: number | undefined) => string | undefined
  className?: string
}

export function NumberInput({
  name,
  min,
  max,
  step = 1,
  placeholder,
  disabled,
  prefix,
  suffix,
  validation,
  className = ""
}: NumberInputProps) {
  const { values, setValue, setError, errors, touched } = useFormContext()
  const value = values[name] as number | undefined
  const hasError = touched[name] && errors[name]

  const handleChange = (newValue: number | undefined) => {
    setValue(name, newValue)
    
    if (validation) {
      const error = validation(newValue)
      if (error) {
        setError(name, error)
      }
    }
  }

  const increment = () => {
    const newValue = (value || 0) + step
    if (max === undefined || newValue <= max) {
      handleChange(newValue)
    }
  }

  const decrement = () => {
    const newValue = (value || 0) - step
    if (min === undefined || newValue >= min) {
      handleChange(newValue)
    }
  }

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {prefix}
        </span>
      )}
      
      <input
        id={name}
        name={name}
        type="number"
        value={value || ""}
        onChange={(e) => handleChange(e.target.value ? parseFloat(e.target.value) : undefined)}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          prefix && "pl-8",
          "pr-16", // Always add right padding for stepper buttons
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />

      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && (value || 0) >= max)}
          className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-700"
        >
          <Plus className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || (min !== undefined && (value || 0) <= min)}
          className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-700"
        >
          <Minus className="h-3 w-3" />
        </button>
      </div>

      {suffix && (
        <span className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {suffix}
        </span>
      )}
    </div>
  )
}

// Enhanced Date Time Input
interface DateTimeInputProps {
  name: string
  type?: 'date' | 'time' | 'datetime-local'
  placeholder?: string
  disabled?: boolean
  min?: string
  max?: string
  validation?: (value: string) => string | undefined
  className?: string
}

export function DateTimeInput({
  name,
  type = 'date',
  placeholder,
  disabled,
  min,
  max,
  validation,
  className = ""
}: DateTimeInputProps) {
  const { values, setValue, setError, errors, touched } = useFormContext()
  const value = values[name] as string || ""
  const hasError = touched[name] && errors[name]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(name, newValue)
    
    if (validation) {
      const error = validation(newValue)
      if (error) {
        setError(name, error)
      }
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'time':
        return <Clock className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {getIcon()}
      </div>
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-red-500 focus-visible:ring-red-500",
          className
        )}
      />
    </div>
  )
}

// Form Validation Helpers
export const validators = {
  required: (message = "This field is required") => (value: unknown) => {
    if (value === undefined || value === null || value === "" || 
        (Array.isArray(value) && value.length === 0)) {
      return message
    }
    return undefined
  },

  email: (message = "Please enter a valid email address") => (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return message
    }
    return undefined
  },

  minLength: (min: number, message?: string) => (value: string) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters`
    }
    return undefined
  },

  maxLength: (max: number, message?: string) => (value: string) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters`
    }
    return undefined
  },

  pattern: (regex: RegExp, message = "Invalid format") => (value: string) => {
    if (value && !regex.test(value)) {
      return message
    }
    return undefined
  },

  numeric: (message = "Must be a number") => (value: string) => {
    if (value && isNaN(Number(value))) {
      return message
    }
    return undefined
  },

  min: (minimum: number, message?: string) => (value: number) => {
    if (value !== undefined && value < minimum) {
      return message || `Must be at least ${minimum}`
    }
    return undefined
  },

  max: (maximum: number, message?: string) => (value: number) => {
    if (value !== undefined && value > maximum) {
      return message || `Must be no more than ${maximum}`
    }
    return undefined
  }
}

// Combine multiple validators
export function combineValidators(...validators: Array<(value: unknown) => string | undefined>) {
  return (value: unknown) => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return undefined
  }
}
