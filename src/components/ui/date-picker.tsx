import React from "react"
import { format, isValid, parse } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  value?: Date | string
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  format?: string
  showTime?: boolean
  minDate?: Date
  maxDate?: Date
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
}

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  showTime?: boolean
  className?: string
}

// Calendar component
function Calendar({
  selected,
  onSelect,
  disabled = false,
  minDate,
  maxDate,
  showTime = false,
  className = ""
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    if (selected && isValid(selected)) {
      return new Date(selected.getFullYear(), selected.getMonth(), 1)
    }
    return new Date()
  })

  const [timeInput, setTimeInput] = React.useState(() => {
    if (selected && isValid(selected)) {
      return format(selected, 'HH:mm')
    }
    return '00:00'
  })

  const today = new Date()
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startDay = firstDayOfMonth.getDay()

  // Get previous month's trailing days
  const prevMonth = new Date(currentYear, currentMonthIndex - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Navigation functions
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthIndex - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentYear, currentMonthIndex + 1, 1))
  }

  const goToPrevYear = () => {
    setCurrentMonth(new Date(currentYear - 1, currentMonthIndex, 1))
  }

  const goToNextYear = () => {
    setCurrentMonth(new Date(currentYear + 1, currentMonthIndex, 1))
  }

  // Check if date is disabled
  const isDateDisabled = (date: Date): boolean => {
    if (disabled) return true
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  // Handle date selection
  const handleDateSelect = (day: number, isCurrentMonth = true) => {
    let selectedDate: Date

    if (isCurrentMonth) {
      selectedDate = new Date(currentYear, currentMonthIndex, day)
    } else {
      // Handle previous/next month days
      if (day > 15) {
        // Previous month
        selectedDate = new Date(currentYear, currentMonthIndex - 1, day)
      } else {
        // Next month
        selectedDate = new Date(currentYear, currentMonthIndex + 1, day)
      }
    }

    // Apply time if showing time picker
    if (showTime) {
      const [hours, minutes] = timeInput.split(':').map(Number)
      selectedDate.setHours(hours, minutes, 0, 0)
    }

    if (!isDateDisabled(selectedDate)) {
      onSelect?.(selectedDate)
    }
  }

  // Handle time change
  const handleTimeChange = (newTime: string) => {
    setTimeInput(newTime)
    if (selected && isValid(selected)) {
      const [hours, minutes] = newTime.split(':').map(Number)
      const newDate = new Date(selected)
      newDate.setHours(hours, minutes, 0, 0)
      onSelect?.(newDate)
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const days: Array<{
      day: number
      isCurrentMonth: boolean
      isToday: boolean
      isSelected: boolean
      isDisabled: boolean
    }> = []

    // Previous month trailing days
    for (let i = startDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = new Date(currentYear, currentMonthIndex - 1, day)
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: isDateDisabled(date)
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonthIndex, day)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selected ? date.toDateString() === selected.toDateString() : false

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isDisabled: isDateDisabled(date)
      })
    }

    // Next month leading days (fill up to 42 days - 6 weeks)
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentYear, currentMonthIndex + 1, day)
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: isDateDisabled(date)
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className={cn("p-3 bg-white dark:bg-gray-900 border rounded-lg shadow-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevYear}
            disabled={disabled}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="h-3 w-3" />
            <ChevronLeft className="h-3 w-3 -ml-2" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevMonth}
            disabled={disabled}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {months[currentMonthIndex]} {currentYear}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextMonth}
            disabled={disabled}
            className="h-7 w-7 p-0"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextYear}
            disabled={disabled}
            className="h-7 w-7 p-0"
          >
            <ChevronRight className="h-3 w-3" />
            <ChevronRight className="h-3 w-3 -ml-2" />
          </Button>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayInfo, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => handleDateSelect(dayInfo.day, dayInfo.isCurrentMonth)}
            disabled={dayInfo.isDisabled}
            className={cn(
              "h-8 w-8 p-0 font-normal text-sm",
              !dayInfo.isCurrentMonth && "text-gray-400 dark:text-gray-600",
              dayInfo.isToday && "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
              dayInfo.isSelected && "bg-blue-600 text-white hover:bg-blue-700",
              dayInfo.isDisabled && "opacity-30 cursor-not-allowed"
            )}
          >
            {dayInfo.day}
          </Button>
        ))}
      </div>

      {/* Time picker */}
      {showTime && (
        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <Input
              type="time"
              value={timeInput}
              onChange={(e) => handleTimeChange(e.target.value)}
              disabled={disabled}
              className="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Main DatePicker component
export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  required = false,
  className = "",
  format: dateFormat = "MMM dd, yyyy",
  showTime = false,
  minDate,
  maxDate,
  clearable = true,
  size = 'md'
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Convert value to Date object
  const dateValue = React.useMemo(() => {
    if (!value) return undefined
    if (value instanceof Date) return isValid(value) ? value : undefined
    if (typeof value === 'string') {
      const parsed = parse(value, dateFormat, new Date())
      return isValid(parsed) ? parsed : undefined
    }
    return undefined
  }, [value, dateFormat])

  // Update input value when date changes
  React.useEffect(() => {
    if (dateValue) {
      setInputValue(format(dateValue, showTime ? `${dateFormat} HH:mm` : dateFormat))
    } else {
      setInputValue('')
    }
  }, [dateValue, dateFormat, showTime])

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    onChange?.(date)
    if (!showTime) {
      setIsOpen(false)
    }
  }

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(undefined)
  }

  // Handle input change (manual typing)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    if (newValue) {
      const parsed = parse(newValue, showTime ? `${dateFormat} HH:mm` : dateFormat, new Date())
      if (isValid(parsed)) {
        onChange?.(parsed)
      }
    } else {
      onChange?.(undefined)
    }
  }

  // Size classes
  const sizeClasses = {
    sm: 'h-8 text-xs px-2',
    md: 'h-9 text-sm px-3',
    lg: 'h-10 text-base px-4'
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "pr-8 cursor-pointer",
            sizeClasses[size]
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          readOnly={false}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {clearable && dateValue && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 mr-1 text-gray-400 hover:text-gray-600"
            >
              ×
            </Button>
          )}
          <CalendarIcon 
            className={cn(
              "h-4 w-4 text-gray-400 mr-2",
              size === 'sm' && "h-3 w-3",
              size === 'lg' && "h-5 w-5"
            )} 
          />
        </div>
      </div>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <Calendar
            selected={dateValue}
            onSelect={handleDateSelect}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            showTime={showTime}
          />
        </div>
      )}
    </div>
  )
}

// Date Range Picker
interface DateRangePickerProps {
  value?: {
    start?: Date
    end?: Date
  }
  onChange?: (range: { start?: Date; end?: Date }) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  format?: string
  minDate?: Date
  maxDate?: Date
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function DateRangePicker({
  value = {},
  onChange,
  placeholder = "Select date range",
  disabled = false,
  required = false,
  className = "",
  format: dateFormat = "MMM dd, yyyy",
  minDate,
  maxDate,
  clearable = true,
  size = 'md'
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectingStart, setSelectingStart] = React.useState(true)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const displayValue = React.useMemo(() => {
    if (value.start && value.end) {
      return `${format(value.start, dateFormat)} - ${format(value.end, dateFormat)}`
    } else if (value.start) {
      return format(value.start, dateFormat)
    }
    return ''
  }, [value, dateFormat])

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (selectingStart || !value.start) {
      onChange?.({ start: date, end: undefined })
      setSelectingStart(false)
    } else {
      if (date < value.start) {
        onChange?.({ start: date, end: value.start })
      } else {
        onChange?.({ start: value.start, end: date })
      }
      setIsOpen(false)
      setSelectingStart(true)
    }
  }

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.({})
    setSelectingStart(true)
  }

  // Size classes
  const sizeClasses = {
    sm: 'h-8 text-xs px-2',
    md: 'h-9 text-sm px-3',
    lg: 'h-10 text-base px-4'
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Input
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "pr-8 cursor-pointer",
            sizeClasses[size]
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          readOnly
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {clearable && (value.start || value.end) && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 mr-1 text-gray-400 hover:text-gray-600"
            >
              ×
            </Button>
          )}
          <CalendarIcon 
            className={cn(
              "h-4 w-4 text-gray-400 mr-2",
              size === 'sm' && "h-3 w-3",
              size === 'lg' && "h-5 w-5"
            )} 
          />
        </div>
      </div>

      {/* Calendar dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <div className="p-2 bg-white dark:bg-gray-900 border rounded-lg shadow-lg">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
              {selectingStart ? 'Select start date' : 'Select end date'}
            </div>
            <Calendar
              selected={selectingStart ? value.start : value.end}
              onSelect={handleDateSelect}
              disabled={disabled}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
      )}
    </div>
  )
}
