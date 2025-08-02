import * as React from "react"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalDescription } from "./modal"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive" | "warning" | "success"
  loading?: boolean
  icon?: React.ReactNode
}

const variantConfig = {
  default: {
    icon: Info,
    iconClass: "text-blue-600",
    confirmClass: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  destructive: {
    icon: AlertTriangle,
    iconClass: "text-red-600",
    confirmClass: "bg-red-600 hover:bg-red-700 text-white"
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-yellow-600",
    confirmClass: "bg-yellow-600 hover:bg-yellow-700 text-white"
  },
  success: {
    icon: CheckCircle,
    iconClass: "text-green-600",
    confirmClass: "bg-green-600 hover:bg-green-700 text-white"
  }
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
  icon
}) => {
  const config = variantConfig[variant]
  const IconComponent = icon ? () => icon : config.icon

  const handleConfirm = () => {
    onConfirm()
    if (!loading) {
      onClose()
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
    >
      <ModalHeader>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-full bg-gray-100 dark:bg-gray-800", config.iconClass)}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div>
            <ModalTitle>{title}</ModalTitle>
            {description && (
              <ModalDescription>{description}</ModalDescription>
            )}
          </div>
        </div>
      </ModalHeader>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          className={config.confirmClass}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
