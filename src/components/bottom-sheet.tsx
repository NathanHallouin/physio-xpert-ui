import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from './cn'

export interface BottomSheetProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
  showHandle?: boolean
  draggable?: boolean
  closeOnOverlayClick?: boolean
  height?: 'auto' | 'half' | 'full' | string
  className?: string
}

export interface BottomSheetRef {
  close: () => void
}

const heightStyles = {
  auto: 'max-h-[90vh]',
  half: 'h-[50vh]',
  full: 'h-[95vh]',
} as const

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(
    {
      open,
      onClose,
      children,
      title,
      description,
      showHandle = true,
      draggable = true,
      closeOnOverlayClick = true,
      height = 'auto',
      className,
    },
    ref
  ) {
    const sheetRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [dragY, setDragY] = useState(0)
    const startY = useRef(0)
    const [isVisible, setIsVisible] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)

    useImperativeHandle(ref, () => ({ close: onClose }))

    useEffect(() => {
      if (open) {
        setShouldRender(true)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setIsVisible(true))
        })
      } else {
        setIsVisible(false)
        const timer = setTimeout(() => setShouldRender(false), 300)
        return () => clearTimeout(timer)
      }
    }, [open])

    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = originalOverflow
        }
      }
    }, [open])

    useEffect(() => {
      if (!open) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    const handleDragStart = useCallback(
      (clientY: number) => {
        if (!draggable) return
        setIsDragging(true)
        startY.current = clientY
      },
      [draggable]
    )

    const handleDragMove = useCallback(
      (clientY: number) => {
        if (!isDragging) return
        const delta = clientY - startY.current
        setDragY(Math.max(0, delta))
      },
      [isDragging]
    )

    const handleDragEnd = useCallback(() => {
      if (!isDragging) return
      setIsDragging(false)
      if (dragY > 100) onClose()
      setDragY(0)
    }, [isDragging, dragY, onClose])

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => handleDragStart(e.clientY),
      [handleDragStart]
    )

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => handleDragStart(e.touches[0].clientY),
      [handleDragStart]
    )

    useEffect(() => {
      if (!isDragging) return

      const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientY)
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientY)
      const handleEnd = () => handleDragEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleEnd)
      }
    }, [isDragging, handleDragMove, handleDragEnd])

    const handleOverlayClick = useCallback(() => {
      if (closeOnOverlayClick) onClose()
    }, [closeOnOverlayClick, onClose])

    const heightStyle =
      height in heightStyles
        ? heightStyles[height as keyof typeof heightStyles]
        : height

    if (!shouldRender) return null

    return createPortal(
      <div
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'bottom-sheet-title' : undefined}
        aria-describedby={description ? 'bottom-sheet-description' : undefined}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/50 transition-opacity duration-300',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        <div
          ref={sheetRef}
          className={cn(
            'absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl flex flex-col transition-transform duration-300 ease-out',
            heightStyle,
            isVisible ? 'translate-y-0' : 'translate-y-full',
            className
          )}
          style={{
            transform: isVisible ? `translateY(${dragY}px)` : 'translateY(100%)',
          }}
        >
          {showHandle && (
            <div
              className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
          )}

          {(title || description) && (
            <div className="px-4 pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                {title && (
                  <h2
                    id="bottom-sheet-title"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {title}
                  </h2>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {description && (
                <p id="bottom-sheet-description" className="text-sm text-gray-500 mt-1">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)

export interface BottomSheetActionsProps {
  children: ReactNode
  className?: string
}

export function BottomSheetActions({ children, className }: BottomSheetActionsProps) {
  return (
    <div className={cn('flex gap-3 p-4 border-t border-gray-100 bg-white', className)}>
      {children}
    </div>
  )
}
