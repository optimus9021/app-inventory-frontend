import * as React from "react"
import { ChevronDown, Check, X, Search } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "./button"
import { Input } from "./input"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  description?: string
}

export interface SelectProps extends VariantProps<typeof selectVariants> {
  options: SelectOption[]
  value?: string | number | (string | number)[]
  defaultValue?: string | number | (string | number)[]
  onValueChange?: (value: string | number | (string | number)[]) => void
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  loading?: boolean
  maxHeight?: number
  className?: string
  dropdownClassName?: string
  emptyMessage?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option...",
    disabled = false,
    multiple = false,
    searchable = false,
    clearable = false,
    loading = false,
    maxHeight = 200,
    className,
    dropdownClassName,
    emptyMessage = "No options found",
    variant,
    size,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [internalValue, setInternalValue] = React.useState<string | number | (string | number)[]>(
      value !== undefined ? value : defaultValue || (multiple ? [] : "")
    )
    
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const selectRef = React.useRef<HTMLDivElement>(null)

    // Handle outside clicks
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          selectRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Sync external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value)
      }
    }, [value])

    // Filter options based on search
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, searchable])

    // Get selected options for display
    const selectedOptions = React.useMemo(() => {
      if (multiple && Array.isArray(internalValue)) {
        return options.filter(option => internalValue.includes(option.value))
      }
      return options.filter(option => option.value === internalValue)
    }, [options, internalValue, multiple])

    const handleSelect = (optionValue: string | number) => {
      let newValue: string | number | (string | number)[]

      if (multiple && Array.isArray(internalValue)) {
        if (internalValue.includes(optionValue)) {
          newValue = internalValue.filter(v => v !== optionValue)
        } else {
          newValue = [...internalValue, optionValue]
        }
      } else {
        newValue = optionValue
        setIsOpen(false)
      }

      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    const handleClear = () => {
      const newValue = multiple ? [] : ""
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    const getDisplayText = () => {
      if (selectedOptions.length === 0) return placeholder
      
      if (multiple) {
        if (selectedOptions.length === 1) {
          return selectedOptions[0].label
        }
        return `${selectedOptions.length} selected`
      }
      
      return selectedOptions[0]?.label || placeholder
    }

    return (
      <div ref={ref} className="relative w-full" {...props}>
        <div
          ref={selectRef}
          className={cn(selectVariants({ variant, size }), className, {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled
          })}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {multiple && selectedOptions.length > 1 ? (
              <div className="flex items-center gap-1 flex-wrap">
                {selectedOptions.slice(0, 2).map(option => (
                  <Badge key={option.value} variant="secondary" className="text-xs">
                    {option.label}
                  </Badge>
                ))}
                {selectedOptions.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{selectedOptions.length - 2}
                  </Badge>
                )}
              </div>
            ) : (
              <span className={cn(
                "truncate",
                selectedOptions.length === 0 && "text-muted-foreground"
              )}>
                {getDisplayText()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {clearable && selectedOptions.length > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {isOpen && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg",
              dropdownClassName
            )}
          >
            {searchable && (
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search options..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            )}
            
            <div
              className="py-1 overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {loading ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = multiple && Array.isArray(internalValue)
                    ? internalValue.includes(option.value)
                    : internalValue === option.value

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "relative flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground",
                        {
                          "bg-accent text-accent-foreground": isSelected,
                          "opacity-50 cursor-not-allowed": option.disabled
                        }
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {multiple && (
                          <div className={cn(
                            "w-4 h-4 border border-primary rounded-sm flex items-center justify-center",
                            isSelected && "bg-primary"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          )}
                        </div>
                      </div>
                      {!multiple && isSelected && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select }
