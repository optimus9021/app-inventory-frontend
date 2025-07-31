import * as React from "react"
import { Loader2 } from "lucide-react"
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDescription } from "./modal"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, FormDataEntryValue>) => void | Promise<void>
  title: string
  description?: string
  submitText?: string
  cancelText?: string
  loading?: boolean
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  submitText = "Save",
  cancelText = "Cancel",
  loading = false,
  children,
  size = "md",
  className
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting || loading) return

    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data = Object.fromEntries(formData.entries())
      
      await onSubmit(data)
      
      if (!loading) {
        onClose()
      }
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isProcessing = isSubmitting || loading

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size={size}
      closeOnOverlayClick={!isProcessing}
      closeOnEscape={!isProcessing}
      className={className}
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <ModalHeader>
          <div>
            <ModalTitle>{title}</ModalTitle>
            {description && (
              <ModalDescription>{description}</ModalDescription>
            )}
          </div>
        </ModalHeader>

        <ModalBody className={cn("flex-1 overflow-y-auto", className)}>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            disabled={isProcessing}
            className="min-w-[100px]"
          >
            {isProcessing && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isProcessing ? "Saving..." : submitText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
