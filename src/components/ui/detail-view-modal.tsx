import * as React from "react"
import { Eye, X, ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react"
import { Modal, ModalHeader, ModalBody, ModalTitle } from "./modal"
import { Button } from "./button"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

export interface DetailViewItem {
  label: string
  value: React.ReactNode
  type?: "text" | "badge" | "image" | "date" | "currency" | "custom"
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export interface DetailViewSection {
  title: string
  items: DetailViewItem[]
  className?: string
}

export interface DetailViewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  sections: DetailViewSection[]
  actions?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
}

const DetailViewModal: React.FC<DetailViewModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  sections,
  actions,
  size = "lg",
  className
}) => {
  const renderValue = (item: DetailViewItem) => {
    switch (item.type) {
      case "badge":
        return (
          <Badge variant={item.variant as "default" | "secondary" | "destructive" | "outline"} className="capitalize">
            {item.value}
          </Badge>
        )
      case "image":
        return (
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.value as string} 
              alt={item.label}
              className="h-16 w-16 object-cover rounded-lg border"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        )
      case "date":
        return (
          <span className="text-sm">
            {item.value ? new Date(item.value as string).toLocaleDateString() : "-"}
          </span>
        )
      case "currency":
        return (
          <span className="font-medium">
            {typeof item.value === "number" 
              ? `Rp ${item.value.toLocaleString()}`
              : item.value || "-"
            }
          </span>
        )
      default:
        return <span className="text-sm">{item.value || "-"}</span>
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size={size}
      className={className}
    >
      <ModalHeader>
        <div className="flex items-start justify-between w-full">
          <div className="flex-1">
            <ModalTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              {title}
            </ModalTitle>
            {subtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 ml-4">
              {actions}
            </div>
          )}
        </div>
      </ModalHeader>

      <ModalBody className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={cn("space-y-4", section.className)}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex}
                  className="flex flex-col space-y-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </label>
                  <div className="flex-1">
                    {renderValue(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ModalBody>
    </Modal>
  )
}

// Image viewer modal for detailed image viewing
export interface ImageViewerModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex?: number
  title?: string
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex = 0,
  title = "Image Viewer"
}) => {
  const [index, setIndex] = React.useState(currentIndex)
  const [zoom, setZoom] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)

  React.useEffect(() => {
    setIndex(currentIndex)
  }, [currentIndex])

  const handlePrevious = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    setZoom(1)
    setRotation(0)
  }

  const handleNext = () => {
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    setZoom(1)
    setRotation(0)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)
  
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = images[index]
    link.download = `image-${index + 1}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      className="p-0"
    >
      <div className="relative h-full bg-black">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-sm text-gray-300">
                {index + 1} of {images.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleRotate}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex items-center justify-center h-full pt-16 pb-4 px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt={`Image ${index + 1}`}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`
            }}
          />
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={handlePrevious}
            >
              ←
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              onClick={handleNext}
            >
              →
            </Button>
          </>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
            <div className="flex justify-center gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                    idx === index 
                      ? "border-blue-500" 
                      : "border-transparent hover:border-gray-400"
                  )}
                  onClick={() => {
                    setIndex(idx)
                    setZoom(1)
                    setRotation(0)
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export { DetailViewModal }
