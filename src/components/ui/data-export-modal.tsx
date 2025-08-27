import React from "react"
import { Download, FileSpreadsheet, FileText, Database, X, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json'
export type ExportStatus = 'idle' | 'preparing' | 'exporting' | 'completed' | 'error'

export interface ExportField {
  key: string
  label: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage'
  required?: boolean
  description?: string
  category?: string
}

export interface ExportTemplate {
  id: string
  name: string
  description?: string
  format: ExportFormat
  fields: string[]
  filters?: Record<string, unknown>
  isDefault?: boolean
  lastUsed?: Date
}

export interface ExportProgress {
  current: number
  total: number
  message: string
  percentage: number
}

interface DataExportModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  fields: ExportField[]
  templates?: ExportTemplate[]
  onExport: (config: ExportConfig) => Promise<void>
  onSaveTemplate?: (template: Omit<ExportTemplate, 'id' | 'lastUsed'>) => void
  exportStatus?: ExportStatus
  exportProgress?: ExportProgress
  className?: string
  allowCustomFields?: boolean
  maxRecords?: number
  supportedFormats?: ExportFormat[]
}

export interface ExportConfig {
  format: ExportFormat
  fields: string[]
  filters: Record<string, unknown>
  filename: string
  includeHeaders: boolean
  dateRange?: {
    from: string
    to: string
  }
  limit?: number
}

const formatIcons: Record<ExportFormat, React.ReactNode> = {
  csv: <FileText className="h-4 w-4" />,
  excel: <FileSpreadsheet className="h-4 w-4" />,
  pdf: <FileText className="h-4 w-4" />,
  json: <Database className="h-4 w-4" />
}

const formatLabels: Record<ExportFormat, string> = {
  csv: 'CSV',
  excel: 'Excel',
  pdf: 'PDF',
  json: 'JSON'
}

export function DataExportModal({
  isOpen,
  onClose,
  title = "Export Data",
  description,
  fields,
  templates = [],
  onExport,
  onSaveTemplate,
  exportStatus = 'idle',
  exportProgress,
  className = "",
  allowCustomFields = true,
  maxRecords,
  supportedFormats = ['csv', 'excel', 'pdf', 'json']
}: DataExportModalProps) {
  const [selectedFormat, setSelectedFormat] = React.useState<ExportFormat>('csv')
  const [selectedFields, setSelectedFields] = React.useState<string[]>([])
  const [filename, setFilename] = React.useState('')
  const [includeHeaders, setIncludeHeaders] = React.useState(true)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null)
  const [showTemplateForm, setShowTemplateForm] = React.useState(false)
  const [templateName, setTemplateName] = React.useState('')
  const [templateDescription, setTemplateDescription] = React.useState('')
  const [dateRange, setDateRange] = React.useState<{ from: string; to: string }>({ from: '', to: '' })
  const [recordLimit, setRecordLimit] = React.useState<number | undefined>(undefined)
  const [activeTab, setActiveTab] = React.useState<'fields' | 'options' | 'templates'>('fields')

  // Group fields by category
  const categorizedFields = React.useMemo(() => {
    const categories: Record<string, ExportField[]> = {}
    
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
    if (isOpen) {
      // Reset form when modal opens
      setSelectedFields(fields.filter(f => f.required).map(f => f.key))
      setFilename(`export_${new Date().toISOString().split('T')[0]}`)
      setSelectedTemplate(null)
      setShowTemplateForm(false)
    }
  }, [isOpen, fields])

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setSelectedFormat(template.format)
      setSelectedFields(template.fields)
      setActiveTab('fields')
    }
  }

  const handleFieldToggle = (fieldKey: string) => {
    const field = fields.find(f => f.key === fieldKey)
    if (field?.required) return // Cannot deselect required fields

    setSelectedFields(prev =>
      prev.includes(fieldKey)
        ? prev.filter(key => key !== fieldKey)
        : [...prev, fieldKey]
    )
  }

  const handleSelectAll = () => {
    setSelectedFields(fields.map(f => f.key))
  }

  const handleSelectRequired = () => {
    setSelectedFields(fields.filter(f => f.required).map(f => f.key))
  }

  const handleExport = async () => {
    if (selectedFields.length === 0) return

    const config: ExportConfig = {
      format: selectedFormat,
      fields: selectedFields,
      filters: {},
      filename: filename || `export_${new Date().toISOString().split('T')[0]}`,
      includeHeaders,
      dateRange: dateRange.from && dateRange.to ? dateRange : undefined,
      limit: recordLimit
    }

    try {
      await onExport(config)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !onSaveTemplate) return

    const template: Omit<ExportTemplate, 'id' | 'lastUsed'> = {
      name: templateName.trim(),
      description: templateDescription.trim() || undefined,
      format: selectedFormat,
      fields: selectedFields,
      filters: {}
    }

    onSaveTemplate(template)
    setShowTemplateForm(false)
    setTemplateName('')
    setTemplateDescription('')
  }

  const getStatusIcon = () => {
    switch (exportStatus) {
      case 'preparing':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case 'exporting':
        return <Download className="h-4 w-4 text-blue-500 animate-pulse" />
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusMessage = () => {
    switch (exportStatus) {
      case 'preparing':
        return 'Preparing export...'
      case 'exporting':
        return exportProgress?.message || 'Exporting data...'
      case 'completed':
        return 'Export completed successfully!'
      case 'error':
        return 'Export failed. Please try again.'
      default:
        return null
    }
  }

  const isExporting = exportStatus === 'preparing' || exportStatus === 'exporting'

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
            <Download className="h-5 w-5 text-gray-500" />
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
            disabled={isExporting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Status Bar */}
        {exportStatus !== 'idle' && (
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {getStatusMessage()}
              </span>
              {exportProgress && (
                <Badge variant="secondary" className="text-xs">
                  {exportProgress.current}/{exportProgress.total}
                </Badge>
              )}
            </div>
            {exportProgress && exportStatus === 'exporting' && (
              <ProgressBar 
                value={exportProgress.percentage} 
                className="mt-2"
                size="sm"
              />
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          {['fields', 'options', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={cn(
                "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              )}
              disabled={isExporting}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'fields' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Select Fields to Export
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectRequired}
                    disabled={isExporting}
                  >
                    Required Only
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    disabled={isExporting}
                  >
                    Select All
                  </Button>
                </div>
              </div>

              {Object.entries(categorizedFields).map(([category, categoryFields]) => (
                <div key={category} className="space-y-3">
                  {Object.keys(categorizedFields).length > 1 && (
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                      {category}
                    </h4>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryFields.map((field) => (
                      <label
                        key={field.key}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                          selectedFields.includes(field.key)
                            ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",
                          field.required && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field.key)}
                          onChange={() => handleFieldToggle(field.key)}
                          disabled={field.required || isExporting}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {field.label}
                            </span>
                            {field.required && (
                              <Badge variant="secondary" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          {field.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {field.description}
                            </p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'options' && (
            <div className="space-y-6">
              {/* Format Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Export Format
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {supportedFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      disabled={isExporting}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border transition-colors",
                        selectedFormat === format
                          ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400"
                          : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      )}
                    >
                      {formatIcons[format]}
                      <span className="text-sm font-medium">
                        {formatLabels[format]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filename */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filename
                </label>
                <Input
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Enter filename"
                  disabled={isExporting}
                />
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date Range (Optional)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">From</label>
                    <Input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                      disabled={isExporting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">To</label>
                    <Input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                      disabled={isExporting}
                    />
                  </div>
                </div>
              </div>

              {/* Record Limit */}
              {maxRecords && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Record Limit (Max: {maxRecords.toLocaleString()})
                  </label>
                  <Input
                    type="number"
                    value={recordLimit || ""}
                    onChange={(e) => setRecordLimit(e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder={`Max ${maxRecords.toLocaleString()} records`}
                    max={maxRecords}
                    disabled={isExporting}
                  />
                </div>
              )}

              {/* Options */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Export Options
                </h4>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    disabled={isExporting}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Include column headers
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              {/* Saved Templates */}
              {templates.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Saved Templates
                  </h3>
                  <div className="grid gap-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-colors",
                          selectedTemplate === template.id
                            ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                            : "bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        )}
                        onClick={() => handleTemplateSelect(template.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {template.name}
                              </span>
                              {template.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                            {template.description && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {template.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                {formatIcons[template.format]}
                                {formatLabels[template.format]}
                              </div>
                              <span className="text-xs text-gray-500">
                                {template.fields.length} fields
                              </span>
                              {template.lastUsed && (
                                <span className="text-xs text-gray-500">
                                  Last used: {template.lastUsed.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save Current as Template */}
              {onSaveTemplate && allowCustomFields && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Save Current Configuration
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTemplateForm(true)}
                      disabled={selectedFields.length === 0 || isExporting}
                    >
                      Save as Template
                    </Button>
                  </div>

                  {showTemplateForm && (
                    <div className="p-4 border rounded-lg dark:border-gray-700 space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Template Name
                        </label>
                        <Input
                          value={templateName}
                          onChange={(e) => setTemplateName(e.target.value)}
                          placeholder="Enter template name"
                          disabled={isExporting}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description (Optional)
                        </label>
                        <Input
                          value={templateDescription}
                          onChange={(e) => setTemplateDescription(e.target.value)}
                          placeholder="Enter template description"
                          disabled={isExporting}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={handleSaveTemplate}
                          disabled={!templateName.trim() || isExporting}
                        >
                          Save Template
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowTemplateForm(false)}
                          disabled={isExporting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {selectedFields.length} fields selected
            </Badge>
            {selectedTemplate && (
              <Badge variant="outline" className="text-xs">
                Template: {templates.find(t => t.id === selectedTemplate)?.name}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={selectedFields.length === 0 || isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  {exportStatus === 'preparing' ? 'Preparing...' : 'Exporting...'}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
