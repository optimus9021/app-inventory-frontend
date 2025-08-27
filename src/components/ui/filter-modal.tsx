import React from "react"
import { X, Filter, RotateCcw, Search } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface FilterField {
  key: string
  label: string
  type: 'text' | 'select' | 'multiselect' | 'date' | 'daterange' | 'number' | 'range' | 'boolean'
  placeholder?: string
  options?: Array<{ label: string; value: string | number }>
  validation?: (value: unknown) => boolean | string
  dependencies?: string[] // Fields that this field depends on
  category?: string // Group filters by category
}

export interface FilterValues {
  [key: string]: unknown
}

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  fields: FilterField[]
  values: FilterValues
  onChange: (values: FilterValues) => void
  onApply: (values: FilterValues) => void
  onReset: () => void
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  allowPartialApplication?: boolean
}

export function FilterModal({
  isOpen,
  onClose,
  title = "Advanced Filters",
  description,
  fields,
  values,
  onChange,
  onApply,
  onReset,
  showSearch = true,
  searchValue = "",
  onSearchChange,
  className = "",
  size = 'lg',
  allowPartialApplication = true
}: FilterModalProps) {
  const [localValues, setLocalValues] = React.useState<FilterValues>(values)
  const [searchQuery, setSearchQuery] = React.useState(searchValue)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  // Group fields by category
  const categorizedFields = React.useMemo(() => {
    const categories: Record<string, FilterField[]> = {}
    
    fields.forEach(field => {
      const category = field.category || 'General'
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(field)
    })
    
    return categories
  }, [fields])

  React.useEffect(() => {
    setLocalValues(values)
  }, [values])

  React.useEffect(() => {
    setSearchQuery(searchValue)
  }, [searchValue])

  const validateField = (field: FilterField, value: unknown): boolean => {
    if (field.validation) {
      const result = field.validation(value)
      if (typeof result === 'string') {
        setErrors(prev => ({ ...prev, [field.key]: result }))
        return false
      } else if (!result) {
        setErrors(prev => ({ ...prev, [field.key]: 'Invalid value' }))
        return false
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field.key]
      return newErrors
    })
    return true
  }

  const handleFieldChange = (field: FilterField, value: unknown) => {
    const newValues = { ...localValues, [field.key]: value }
    setLocalValues(newValues)
    
    if (allowPartialApplication) {
      onChange(newValues)
    }

    // Validate field
    validateField(field, value)
  }

  const handleApply = () => {
    // Validate all fields
    let hasErrors = false
    const newErrors: Record<string, string> = {}

    fields.forEach(field => {
      const value = localValues[field.key]
      if (field.validation) {
        const result = field.validation(value)
        if (typeof result === 'string') {
          newErrors[field.key] = result
          hasErrors = true
        } else if (!result && value !== undefined && value !== null && value !== '') {
          newErrors[field.key] = 'Invalid value'
          hasErrors = true
        }
      }
    })

    setErrors(newErrors)

    if (!hasErrors) {
      const finalValues = { ...localValues }
      if (showSearch && searchQuery.trim()) {
        finalValues.search = searchQuery.trim()
      }
      onApply(finalValues)
      onClose()
    }
  }

  const handleReset = () => {
    setLocalValues({})
    setSearchQuery("")
    setErrors({})
    onReset()
    if (onSearchChange) {
      onSearchChange("")
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const getActiveFilterCount = () => {
    let count = Object.values(localValues).filter(value => 
      value !== undefined && value !== null && value !== '' && 
      (Array.isArray(value) ? value.length > 0 : true)
    ).length
    
    if (searchQuery.trim()) {
      count += 1
    }
    
    return count
  }

  const renderFieldInput = (field: FilterField) => {
    const value = localValues[field.key]
    const hasError = !!errors[field.key]

    // Check dependencies
    const isDependencyMet = !field.dependencies || field.dependencies.every(dep => {
      const depValue = localValues[dep]
      return depValue !== undefined && depValue !== null && depValue !== ''
    })

    if (!isDependencyMet) {
      return (
        <div className="text-sm text-gray-400 italic">
          Requires: {field.dependencies?.join(', ')}
        </div>
      )
    }

    switch (field.type) {
      case 'text':
        return (
          <Input
            value={value as string || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            placeholder={field.placeholder || field.label}
            className={cn(hasError && "border-red-500")}
          />
        )

      case 'number':
        return (
          <Input
            type="number"
            value={value as number || ""}
            onChange={(e) => handleFieldChange(field, e.target.value ? parseFloat(e.target.value) : undefined)}
            placeholder={field.placeholder || field.label}
            className={cn(hasError && "border-red-500")}
          />
        )

      case 'select':
        return (
          <select
            value={value as string || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-red-500"
            )}
          >
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'multiselect':
        const selectedValues = (value as string[]) || []
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {selectedValues.map((val) => {
                const option = field.options?.find(opt => opt.value === val)
                return (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="text-xs cursor-pointer"
                    onClick={() => {
                      const newValues = selectedValues.filter(v => v !== val)
                      handleFieldChange(field, newValues)
                    }}
                  >
                    {option?.label || val}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )
              })}
            </div>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value && !selectedValues.includes(e.target.value)) {
                  handleFieldChange(field, [...selectedValues, e.target.value])
                }
              }}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">{field.placeholder || `Add ${field.label}`}</option>
              {field.options?.filter(opt => !selectedValues.includes(opt.value as string)).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )

      case 'date':
        return (
          <Input
            type="date"
            value={value as string || ""}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            className={cn(hasError && "border-red-500")}
          />
        )

      case 'daterange':
        const dateRange = (value as { from?: string; to?: string }) || {}
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={dateRange.from || ""}
              onChange={(e) => handleFieldChange(field, { ...dateRange, from: e.target.value })}
              placeholder="From"
              className={cn(hasError && "border-red-500")}
            />
            <Input
              type="date"
              value={dateRange.to || ""}
              onChange={(e) => handleFieldChange(field, { ...dateRange, to: e.target.value })}
              placeholder="To"
              className={cn(hasError && "border-red-500")}
            />
          </div>
        )

      case 'range':
        const range = (value as { min?: number; max?: number }) || {}
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={range.min || ""}
              onChange={(e) => handleFieldChange(field, { 
                ...range, 
                min: e.target.value ? parseFloat(e.target.value) : undefined 
              })}
              placeholder="Min"
              className={cn(hasError && "border-red-500")}
            />
            <Input
              type="number"
              value={range.max || ""}
              onChange={(e) => handleFieldChange(field, { 
                ...range, 
                max: e.target.value ? parseFloat(e.target.value) : undefined 
              })}
              placeholder="Max"
              className={cn(hasError && "border-red-500")}
            />
          </div>
        )

      case 'boolean':
        return (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value as boolean || false}
              onChange={(e) => handleFieldChange(field, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm">{field.placeholder || field.label}</span>
          </label>
        )

      default:
        return null
    }
  }

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
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="p-6 border-b dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {Object.entries(categorizedFields).map(([category, categoryFields]) => (
              <div key={category} className="space-y-4">
                {Object.keys(categorizedFields).length > 1 && (
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">
                    {category}
                  </h3>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                      </label>
                      {renderFieldInput(field)}
                      {errors[field.key] && (
                        <p className="text-xs text-red-500">
                          {errors[field.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t dark:border-gray-700">
          <div className="flex items-center gap-3">
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} filters active
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={getActiveFilterCount() === 0}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
