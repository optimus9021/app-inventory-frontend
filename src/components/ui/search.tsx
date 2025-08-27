import React from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Basic Search Input
interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showSearchButton?: boolean
  clearable?: boolean
  onKeyDown?: (e: React.KeyboardEvent) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  disabled = false,
  loading = false,
  size = 'md',
  className = "",
  showSearchButton = false,
  clearable = true,
  onKeyDown,
  onFocus,
  onBlur
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(value)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleChange = (newValue: string) => {
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleSearch = () => {
    onSearch?.(internalValue)
  }

  const handleClear = () => {
    setInternalValue("")
    onChange?.("")
    onSearch?.("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          ref={ref}
          value={internalValue}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={cn(
            "pl-10",
            clearable && internalValue && "pr-20",
            !clearable && showSearchButton && "pr-12",
            sizeClasses[size]
          )}
        />
        
        {/* Clear button */}
        {clearable && internalValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
        
        {/* Search button */}
        {showSearchButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            disabled={disabled || loading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <Search className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  )
})

SearchInput.displayName = "SearchInput"

// Quick Search with Suggestions
interface SearchSuggestion {
  id: string
  title: string
  subtitle?: string
  category?: string
  icon?: React.ReactNode
}

interface QuickSearchProps {
  value?: string
  onChange?: (value: string) => void
  onSelect?: (suggestion: SearchSuggestion) => void
  suggestions?: SearchSuggestion[]
  loading?: boolean
  placeholder?: string
  className?: string
  maxSuggestions?: number
}

export function QuickSearch({
  value = "",
  onChange,
  onSelect,
  suggestions = [],
  loading = false,
  placeholder = "Quick search...",
  className = "",
  maxSuggestions = 5
}: QuickSearchProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredSuggestions = suggestions.slice(0, maxSuggestions)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          handleSelect(filteredSuggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = (suggestion: SearchSuggestion) => {
    onSelect?.(suggestion)
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = () => {
    // Delay closing to allow suggestion clicks
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className={cn("relative", className)}>
      <SearchInput
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        loading={loading}
      />

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer transition-colors",
                "hover:bg-gray-50 dark:hover:bg-gray-700",
                index === selectedIndex && "bg-gray-50 dark:bg-gray-700"
              )}
            >
              {suggestion.icon && (
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-600">
                  {suggestion.icon}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {suggestion.title}
                </p>
                {suggestion.subtitle && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {suggestion.subtitle}
                  </p>
                )}
              </div>
              
              {suggestion.category && (
                <Badge variant="secondary" className="text-xs">
                  {suggestion.category}
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Search Results Header
interface SearchResultsHeaderProps {
  query?: string
  totalResults?: number
  className?: string
}

export function SearchResultsHeader({
  query,
  totalResults,
  className = ""
}: SearchResultsHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg", className)}>
      <div className="flex items-center gap-4">
        <div>
          {query && (
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Results for &ldquo;<span className="text-blue-600 dark:text-blue-400">{query}</span>&rdquo;
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {totalResults !== undefined ? `${totalResults} results found` : 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  )
}
