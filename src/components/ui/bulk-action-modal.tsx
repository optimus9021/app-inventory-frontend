import React from "react"
import { Play, Square, RotateCcw, CheckCircle, AlertCircle, Clock, X, AlertTriangle, Trash2, Edit, Archive, Eye } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type BulkActionType = 'delete' | 'update' | 'archive' | 'restore' | 'export' | 'move' | 'duplicate' | 'approve' | 'reject' | 'custom'
export type BulkActionStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error' | 'cancelled'

export interface BulkAction {
  id: string
  type: BulkActionType
  label: string
  description?: string
  icon?: React.ReactNode
  confirmationRequired?: boolean
  destructive?: boolean
  customComponent?: React.ComponentType<BulkActionCustomProps>
}

export interface BulkActionCustomProps {
  selectedItems: unknown[]
  onConfigChange: (config: Record<string, unknown>) => void
}

export interface BulkActionProgress {
  current: number
  total: number
  message: string
  percentage: number
  errors: Array<{
    item: unknown
    error: string
  }>
  completed: unknown[]
  failed: unknown[]
}

export interface BulkActionConfig {
  action: BulkAction
  selectedItems: unknown[]
  parameters: Record<string, unknown>
  dryRun?: boolean
  batchSize?: number
  confirmDestructive?: boolean
}

interface BulkActionModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  actions: BulkAction[]
  selectedItems: unknown[]
  onExecute: (config: BulkActionConfig) => Promise<void>
  status?: BulkActionStatus
  progress?: BulkActionProgress
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
  getItemLabel?: (item: unknown) => string
  getItemId?: (item: unknown) => string | number
  className?: string
  allowDryRun?: boolean
  maxBatchSize?: number
}

const actionIcons: Record<BulkActionType, React.ReactNode> = {
  delete: <Trash2 className="h-4 w-4" />,
  update: <Edit className="h-4 w-4" />,
  archive: <Archive className="h-4 w-4" />,
  restore: <RotateCcw className="h-4 w-4" />,
  export: <Play className="h-4 w-4" />,
  move: <Play className="h-4 w-4" />,
  duplicate: <Play className="h-4 w-4" />,
  approve: <CheckCircle className="h-4 w-4" />,
  reject: <X className="h-4 w-4" />,
  custom: <Play className="h-4 w-4" />
}

export function BulkActionModal({
  isOpen,
  onClose,
  title = "Bulk Actions",
  actions,
  selectedItems,
  onExecute,
  status = 'idle',
  progress,
  onPause,
  onResume,
  onCancel,
  getItemLabel = (item: unknown) => {
    if (item && typeof item === 'object') {
      const obj = item as Record<string, unknown>
      return (obj.name as string) || (obj.title as string) || 'Item'
    }
    return 'Item'
  },
  getItemId = (item: unknown) => {
    if (item && typeof item === 'object') {
      const obj = item as Record<string, unknown>
      return (obj.id as string | number) || Math.random()
    }
    return Math.random()
  },
  className = "",
  allowDryRun = true,
  maxBatchSize = 100
}: BulkActionModalProps) {
  const [selectedAction, setSelectedAction] = React.useState<BulkAction | null>(null)
  const [actionConfig, setActionConfig] = React.useState<Record<string, unknown>>({})
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const [isDryRun, setIsDryRun] = React.useState(false)
  const [batchSize, setBatchSize] = React.useState(50)
  const [activeTab, setActiveTab] = React.useState<'actions' | 'preview' | 'progress'>('actions')

  React.useEffect(() => {
    if (isOpen) {
      setSelectedAction(null)
      setActionConfig({})
      setShowConfirmation(false)
      setActiveTab('actions')
    }
  }, [isOpen])

  React.useEffect(() => {
    if (status === 'running' || status === 'paused') {
      setActiveTab('progress')
    }
  }, [status])

  const handleActionSelect = (action: BulkAction) => {
    setSelectedAction(action)
    setActionConfig({})
    setActiveTab('preview')
  }

  const handleExecute = () => {
    if (!selectedAction) return

    if (selectedAction.confirmationRequired || selectedAction.destructive) {
      setShowConfirmation(true)
      return
    }

    executeAction()
  }

  const executeAction = async () => {
    if (!selectedAction) return

    const config: BulkActionConfig = {
      action: selectedAction,
      selectedItems,
      parameters: actionConfig,
      dryRun: isDryRun,
      batchSize,
      confirmDestructive: selectedAction.destructive
    }

    try {
      await onExecute(config)
      setShowConfirmation(false)
    } catch (error) {
      console.error('Bulk action failed:', error)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case 'paused':
        return <Square className="h-4 w-4 text-yellow-500" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'cancelled':
        return <X className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'running':
        return progress?.message || 'Processing items...'
      case 'paused':
        return 'Operation paused'
      case 'completed':
        return `Completed successfully! ${progress?.completed.length || 0} items processed.`
      case 'error':
        return `Operation failed. ${progress?.failed.length || 0} items had errors.`
      case 'cancelled':
        return 'Operation cancelled'
      default:
        return null
    }
  }

  const isOperationActive = status === 'running' || status === 'paused'

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className={className}
      size="xl"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Play className="h-5 w-5 text-gray-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {selectedItems.length} items selected
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isOperationActive}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Bar */}
        {status !== 'idle' && (
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon()}
                <span className="text-sm font-medium">
                  {getStatusMessage()}
                </span>
                {progress && (
                  <Badge variant="secondary" className="text-xs">
                    {progress.current}/{progress.total}
                  </Badge>
                )}
              </div>
              
              {isOperationActive && (
                <div className="flex gap-2">
                  {status === 'running' && onPause && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onPause}
                    >
                      <Square className="h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  {status === 'paused' && onResume && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onResume}
                    >
                      <Play className="h-4 w-4" />
                      Resume
                    </Button>
                  )}
                  {onCancel && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onCancel}
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {progress && (status === 'running' || status === 'paused') && (
              <ProgressBar 
                value={progress.percentage} 
                className="mt-2"
                size="sm"
              />
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          {['actions', 'preview', 'progress'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              disabled={tab === 'preview' && !selectedAction}
              className={cn(
                "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
                tab === 'preview' && !selectedAction && "opacity-50 cursor-not-allowed"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'progress' && progress?.errors.length ? (
                <Badge variant="destructive" className="ml-2 text-xs">
                  {progress.errors.length}
                </Badge>
              ) : null}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Choose an action to perform on {selectedItems.length} selected items
              </h3>
              
              <div className="grid gap-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionSelect(action)}
                    disabled={isOperationActive}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-lg border text-left transition-colors",
                      selectedAction?.id === action.id
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                        : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
                      action.destructive && "border-red-200 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                    )}
                  >
                    <div className="mt-1">
                      {action.icon || actionIcons[action.type]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {action.label}
                        </span>
                        {action.destructive && (
                          <Badge variant="destructive" className="text-xs">
                            Destructive
                          </Badge>
                        )}
                        {action.confirmationRequired && (
                          <Badge variant="outline" className="text-xs">
                            Requires Confirmation
                          </Badge>
                        )}
                      </div>
                      {action.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {action.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preview' && selectedAction && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  {selectedAction.icon || actionIcons[selectedAction.type]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {selectedAction.label}
                  </h3>
                  {selectedAction.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedAction.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Custom Action Component */}
              {selectedAction.customComponent && (
                <div className="p-4 border rounded-lg dark:border-gray-700">
                  <selectedAction.customComponent
                    selectedItems={selectedItems}
                    onConfigChange={setActionConfig}
                  />
                </div>
              )}

              {/* Operation Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Operation Settings
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Batch Size
                    </label>
                    <input
                      type="number"
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value) || 50)}
                      min="1"
                      max={maxBatchSize}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isOperationActive}
                    />
                    <p className="text-xs text-gray-500">
                      Number of items to process at once (max: {maxBatchSize})
                    </p>
                  </div>
                </div>

                {allowDryRun && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isDryRun}
                      onChange={(e) => setIsDryRun(e.target.checked)}
                      disabled={isOperationActive}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Dry run (preview changes without applying them)
                    </span>
                  </label>
                )}
              </div>

              {/* Selected Items Preview */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Selected Items ({selectedItems.length})
                </h4>
                <div className="max-h-48 overflow-y-auto border rounded-lg dark:border-gray-700">
                  <div className="p-4 space-y-2">
                    {selectedItems.slice(0, 10).map((item, index) => (
                      <div
                        key={getItemId(item)}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="text-gray-500">#{index + 1}</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {getItemLabel(item)}
                        </span>
                      </div>
                    ))}
                    {selectedItems.length > 10 && (
                      <div className="text-sm text-gray-500 italic">
                        ... and {selectedItems.length - 10} more items
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Warning for destructive actions */}
              {selectedAction.destructive && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-700">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Destructive Action Warning
                      </h5>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        This action cannot be undone. Please review your selection carefully before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              {progress ? (
                <>
                  {/* Progress Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {progress.completed.length}
                      </div>
                      <div className="text-sm text-gray-500">Completed</div>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {progress.failed.length}
                      </div>
                      <div className="text-sm text-gray-500">Failed</div>
                    </div>
                    <div className="p-4 border rounded-lg dark:border-gray-700">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {progress.total - progress.current}
                      </div>
                      <div className="text-sm text-gray-500">Remaining</div>
                    </div>
                  </div>

                  {/* Error Details */}
                  {progress.errors.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">
                        Errors ({progress.errors.length})
                      </h4>
                      <div className="max-h-64 overflow-y-auto border rounded-lg dark:border-gray-700">
                        <div className="p-4 space-y-3">
                          {progress.errors.map((error, index) => (
                            <div
                              key={index}
                              className="p-3 bg-red-50 border border-red-200 rounded dark:bg-red-900/20 dark:border-red-700"
                            >
                              <div className="flex items-start gap-3">
                                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-red-800 dark:text-red-200">
                                    {getItemLabel(error.item)}
                                  </div>
                                  <div className="text-sm text-red-600 dark:text-red-300 mt-1">
                                    {error.error}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    No Operation in Progress
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select an action to begin bulk processing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t dark:border-gray-700">
          <div className="flex items-center gap-3">
            {selectedAction && (
              <Badge variant="outline" className="text-xs">
                Action: {selectedAction.label}
              </Badge>
            )}
            {isDryRun && (
              <Badge variant="secondary" className="text-xs">
                Dry Run Mode
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isOperationActive}
            >
              {isOperationActive ? 'Close' : 'Cancel'}
            </Button>
            
            {activeTab === 'preview' && selectedAction && (
              <Button
                onClick={handleExecute}
                disabled={isOperationActive}
                variant={selectedAction.destructive ? 'destructive' : 'default'}
                className="flex items-center gap-2"
              >
                {selectedAction.icon || actionIcons[selectedAction.type]}
                {isDryRun ? 'Preview Changes' : selectedAction.label}
              </Button>
            )}
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && selectedAction && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Confirm Action
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Are you sure you want to perform &quot;{selectedAction.label}&quot; on {selectedItems.length} items?
                    {selectedAction.destructive && " This action cannot be undone."}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={selectedAction.destructive ? 'destructive' : 'default'}
                  onClick={executeAction}
                  className="flex items-center gap-2"
                >
                  {selectedAction.icon || actionIcons[selectedAction.type]}
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
