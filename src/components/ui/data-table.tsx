import React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string
  title: string
  width?: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, record: T, index: number) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

export interface DataTableAction<T = Record<string, unknown>> {
  key: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick: (record: T, index: number) => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  disabled?: (record: T) => boolean
  hidden?: (record: T) => boolean
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    showSizeChanger?: boolean
    showQuickJumper?: boolean
    showTotal?: boolean
    onChange: (page: number, pageSize: number) => void
  }
  selection?: {
    selectedRowKeys: (string | number)[]
    onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
    getRowKey?: (record: T, index: number) => string | number
  }
  actions?: DataTableAction<T>[]
  searchable?: boolean
  filterable?: boolean
  exportable?: boolean
  onSearch?: (value: string) => void
  onFilter?: (filters: Record<string, unknown>) => void
  onExport?: () => void
  emptyText?: string
  className?: string
  size?: 'small' | 'medium' | 'large'
  bordered?: boolean
  striped?: boolean
  hover?: boolean
}

interface SortState {
  key: string
  direction: 'asc' | 'desc' | null
}

export function DataTable<T = Record<string, unknown>>({
  columns,
  data,
  loading = false,
  pagination,
  selection,
  actions,
  searchable = false,
  filterable = false,
  exportable = false,
  onSearch,
  onExport,
  emptyText = "No data available",
  className = "",
  size = 'medium',
  bordered = true,
  striped = true,
  hover = true
}: DataTableProps<T>) {
  const [sortState, setSortState] = React.useState<SortState>({ key: '', direction: null })
  const [searchValue, setSearchValue] = React.useState('')
  const [filterOpen, setFilterOpen] = React.useState(false)

  // Table size classes
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }

  const paddingClasses = {
    small: 'px-2 py-1',
    medium: 'px-3 py-2',
    large: 'px-4 py-3'
  }

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey)
    if (!column?.sortable) return

    let direction: 'asc' | 'desc' | null = 'asc'
    if (sortState.key === columnKey) {
      direction = sortState.direction === 'asc' ? 'desc' : sortState.direction === 'desc' ? null : 'asc'
    }

    setSortState({ key: columnKey, direction })
  }

  // Handle search
  const handleSearch = (value: string) => {
    setSearchValue(value)
    onSearch?.(value)
  }

  // Handle row selection
  const isRowSelected = (record: T, index: number): boolean => {
    if (!selection) return false
    const key = selection.getRowKey ? selection.getRowKey(record, index) : index
    return selection.selectedRowKeys.includes(key)
  }

  const handleRowSelect = (record: T, index: number, checked: boolean) => {
    if (!selection) return

    const key = selection.getRowKey ? selection.getRowKey(record, index) : index
    let newSelectedKeys = [...selection.selectedRowKeys]
    const newSelectedRows: T[] = []

    if (checked) {
      newSelectedKeys.push(key)
    } else {
      newSelectedKeys = newSelectedKeys.filter(k => k !== key)
    }

    // Get selected rows
    data.forEach((item, idx) => {
      const itemKey = selection.getRowKey ? selection.getRowKey(item, idx) : idx
      if (newSelectedKeys.includes(itemKey)) {
        newSelectedRows.push(item)
      }
    })

    selection.onChange(newSelectedKeys, newSelectedRows)
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (!selection) return

    const newSelectedKeys: (string | number)[] = []
    const newSelectedRows: T[] = []

    if (checked) {
      data.forEach((record, index) => {
        const key = selection.getRowKey ? selection.getRowKey(record, index) : index
        newSelectedKeys.push(key)
        newSelectedRows.push(record)
      })
    }

    selection.onChange(newSelectedKeys, newSelectedRows)
  }

  const isAllSelected = selection ? 
    data.length > 0 && data.every((record, index) => {
      const key = selection.getRowKey ? selection.getRowKey(record, index) : index
      return selection.selectedRowKeys.includes(key)
    }) : false

  const isIndeterminate = selection ? 
    selection.selectedRowKeys.length > 0 && !isAllSelected : false

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    if (sortState.key !== columnKey) {
      return <ArrowUpDown className="h-3 w-3 opacity-50" />
    }
    if (sortState.direction === 'asc') {
      return <ArrowUp className="h-3 w-3" />
    }
    if (sortState.direction === 'desc') {
      return <ArrowDown className="h-3 w-3" />
    }
    return <ArrowUpDown className="h-3 w-3 opacity-50" />
  }

  // Render action menu
  const renderActions = (record: T, index: number) => {
    if (!actions || actions.length === 0) return null

    const visibleActions = actions.filter(action => !action.hidden?.(record))
    if (visibleActions.length === 0) return null

    return (
      <div className="flex items-center gap-1">
        {visibleActions.slice(0, 2).map(action => {
          const Icon = action.icon
          return (
            <Button
              key={action.key}
              variant={action.variant || "ghost"}
              size="sm"
              onClick={() => action.onClick(record, index)}
              disabled={action.disabled?.(record)}
              className="h-6 w-6 p-0"
            >
              {Icon && <Icon className="h-3 w-3" />}
            </Button>
          )
        })}
        {visibleActions.length > 2 && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        
        {/* Table skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Header */}
      {(searchable || filterable || exportable) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-7 w-64"
                />
              </div>
            )}
            {filterable && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-3 w-3 mr-1" />
                Filters
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {selection && selection.selectedRowKeys.length > 0 && (
              <Badge variant="secondary">
                {selection.selectedRowKeys.length} selected
              </Badge>
            )}
            {exportable && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`rounded-lg overflow-hidden ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
        <div className="overflow-x-auto">
          <table className={`w-full ${sizeClasses[size]}`}>
            {/* Table Header */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {selection && (
                  <th className={`${paddingClasses[size]} text-left`}>
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`${paddingClasses[size]} font-medium text-gray-700 dark:text-gray-300 ${
                      column.align === 'center' ? 'text-center' : 
                      column.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-1">
                      <span>{column.title}</span>
                      {column.sortable && (
                        <button
                          onClick={() => handleSort(column.key)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
                        >
                          {renderSortIcon(column.key)}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className={`${paddingClasses[size]} text-center font-medium text-gray-700 dark:text-gray-300`}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (selection ? 1 : 0) + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <Search className="h-6 w-6 text-gray-400" />
                      </div>
                      <p>{emptyText}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((record, index) => (
                  <tr
                    key={selection?.getRowKey ? selection.getRowKey(record, index) : index}
                    className={`
                      ${hover ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                      ${striped && index % 2 === 1 ? 'bg-gray-25 dark:bg-gray-825' : ''}
                      ${isRowSelected(record, index) ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    `}
                  >
                    {selection && (
                      <td className={paddingClasses[size]}>
                        <input
                          type="checkbox"
                          checked={isRowSelected(record, index)}
                          onChange={(e) => handleRowSelect(record, index, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${paddingClasses[size]} text-gray-900 dark:text-gray-100 ${
                          column.align === 'center' ? 'text-center' : 
                          column.align === 'right' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {column.render 
                          ? column.render((record as Record<string, unknown>)[column.key], record, index)
                          : String((record as Record<string, unknown>)[column.key] ?? '')
                        }
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className={`${paddingClasses[size]} text-center`}>
                        {renderActions(record, index)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {pagination.showTotal && (
              <span>
                Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
                {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
                {pagination.total} entries
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {pagination.showSizeChanger && (
              <Select
                value={pagination.pageSize.toString()}
                onValueChange={(value) => {
                  const stringValue = Array.isArray(value) ? String(value[0]) : String(value)
                  const numValue = parseInt(stringValue)
                  pagination.onChange(1, numValue)
                }}
                options={[
                  { value: '10', label: '10 / page' },
                  { value: '25', label: '25 / page' },
                  { value: '50', label: '50 / page' },
                  { value: '100', label: '100 / page' }
                ]}
              />
            )}
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange(1, pagination.pageSize)}
                disabled={pagination.current === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
                disabled={pagination.current === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
              
              {pagination.showQuickJumper && (
                <div className="flex items-center gap-1 px-2">
                  <span className="text-sm">Page</span>
                  <Input
                    type="number"
                    min={1}
                    max={Math.ceil(pagination.total / pagination.pageSize)}
                    value={pagination.current}
                    onChange={(e) => {
                      const page = parseInt(e.target.value) || 1
                      pagination.onChange(page, pagination.pageSize)
                    }}
                    className="w-16 h-8 text-center"
                  />
                  <span className="text-sm">of {Math.ceil(pagination.total / pagination.pageSize)}</span>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
                disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => pagination.onChange(Math.ceil(pagination.total / pagination.pageSize), pagination.pageSize)}
                disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
