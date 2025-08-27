import React from "react"
import { Upload, X, File, Image as ImageIcon, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FileUploadFile {
  id: string
  file: File
  preview?: string
  progress?: number
  status: 'uploading' | 'success' | 'error' | 'pending'
  error?: string
}

interface FileUploadProps {
  value?: FileUploadFile[]
  onChange?: (files: FileUploadFile[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  showPreview?: boolean
  uploadFunction?: (file: File) => Promise<string>
}

interface FileItemProps {
  file: FileUploadFile
  onRemove: (id: string) => void
  showPreview: boolean
}

// File item component
function FileItem({ file, onRemove, showPreview }: FileItemProps) {
  const getFileIcon = (file: File) => {
    const type = file.type
    if (type.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />
    } else if (type.startsWith('text/') || type.includes('document')) {
      return <FileText className="h-4 w-4" />
    } else {
      return <File className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: FileUploadFile['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
      {showPreview && file.preview && (
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={file.preview} 
            alt={file.file.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {(!showPreview || !file.preview) && (
        <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          {getFileIcon(file.file)}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {file.file.name}
          </p>
          {getStatusIcon(file.status)}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(file.file.size)}
        </p>

        {file.status === 'uploading' && typeof file.progress === 'number' && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {file.progress}% uploaded
            </p>
          </div>
        )}

        {file.status === 'error' && file.error && (
          <p className="text-xs text-red-500 mt-1">
            {file.error}
          </p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(file.id)}
        className="flex-shrink-0 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function FileUpload({
  value = [],
  onChange,
  accept = "*/*",
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  className = "",
  children,
  showPreview = true,
  uploadFunction
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const generateFileId = () => `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    }

    if (accept !== "*/*") {
      const acceptedTypes = accept.split(',').map(type => type.trim())
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        } else {
          return file.type.match(type.replace('*', '.*'))
        }
      })
      
      if (!isValidType) {
        return `File type not supported. Accepted types: ${accept}`
      }
    }

    return null
  }

  const createFilePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => resolve(undefined)
        reader.readAsDataURL(file)
      } else {
        resolve(undefined)
      }
    })
  }

  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const remainingSlots = maxFiles - value.length
    const filesToProcess = multiple ? fileArray.slice(0, remainingSlots) : [fileArray[0]]

    const newFiles: FileUploadFile[] = []

    for (const file of filesToProcess) {
      const error = validateFile(file)
      const preview = await createFilePreview(file)
      
      const fileUpload: FileUploadFile = {
        id: generateFileId(),
        file,
        preview,
        status: error ? 'error' : 'pending',
        error: error || undefined
      }

      newFiles.push(fileUpload)
    }

    const updatedFiles = multiple ? [...value, ...newFiles] : newFiles
    onChange?.(updatedFiles)

    // Auto upload if upload function is provided
    if (uploadFunction) {
      for (const fileUpload of newFiles) {
        if (fileUpload.status === 'pending') {
          uploadFile(fileUpload)
        }
      }
    }
  }

  const uploadFile = async (fileUpload: FileUploadFile) => {
    if (!uploadFunction) return

    // Update status to uploading
    const updatedFiles = value.map(f => 
      f.id === fileUpload.id 
        ? { ...f, status: 'uploading' as const, progress: 0 }
        : f
    )
    onChange?.(updatedFiles)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        const currentFiles = value.find(f => f.id === fileUpload.id)
        if (currentFiles && currentFiles.progress !== undefined && currentFiles.progress < 90) {
          const newProgress = Math.min(currentFiles.progress + Math.random() * 20, 90)
          const progressFiles = value.map(f => 
            f.id === fileUpload.id 
              ? { ...f, progress: newProgress }
              : f
          )
          onChange?.(progressFiles)
        }
      }, 200)

      await uploadFunction(fileUpload.file)
      clearInterval(progressInterval)

      // Update to success
      const successFiles = value.map(f => 
        f.id === fileUpload.id 
          ? { ...f, status: 'success' as const, progress: 100 }
          : f
      )
      onChange?.(successFiles)
    } catch (error) {
      // Update to error
      const errorFiles = value.map(f => 
        f.id === fileUpload.id 
          ? { ...f, status: 'error' as const, error: error instanceof Error ? error.message : 'Upload failed' }
          : f
      )
      onChange?.(errorFiles)
    }
  }

  const removeFile = (id: string) => {
    const updatedFiles = value.filter(f => f.id !== id)
    onChange?.(updatedFiles)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const canAddMore = value.length < maxFiles

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drop Zone */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg transition-colors cursor-pointer",
          isDragOver && !disabled 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20" 
            : "border-gray-300 dark:border-gray-600",
          disabled && "opacity-50 cursor-not-allowed",
          !canAddMore && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={canAddMore ? openFileDialog : undefined}
      >
        <div className="p-8 text-center">
          {children || (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {canAddMore ? "Drop files here or click to browse" : `Maximum ${maxFiles} files allowed`}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {accept === "*/*" ? "Any file type" : `Accepted types: ${accept}`}
                  {maxSize && ` • Max size: ${Math.round(maxSize / 1024 / 1024)}MB`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || !canAddMore}
      />

      {/* File list */}
      {value.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Files ({value.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {value.map((file) => (
              <FileItem
                key={file.id}
                file={file}
                onRemove={removeFile}
                showPreview={showPreview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}