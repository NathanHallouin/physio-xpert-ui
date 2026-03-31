"use client"

import { useEffect, useRef, useCallback, forwardRef, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from './cn'

type DialogVariant = 'danger' | 'warning' | 'info'

const confirmButtonVariants = cva(
  'flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        warning: 'bg-amber-600 hover:bg-amber-700 text-white',
        info: 'bg-primary-500 hover:bg-primary-600 text-white',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

const iconBgVariants = cva(
  'w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center',
  {
    variants: {
      variant: {
        danger: 'bg-red-100',
        warning: 'bg-amber-100',
        info: 'bg-blue-100',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

/**
 * Default icons for each variant
 */
const defaultIcons: Record<DialogVariant, ReactNode> = {
  danger: (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean
  /** Callback when the dialog is closed */
  onClose: () => void
  /** Callback when the action is confirmed */
  onConfirm: () => void
  /** Dialog title */
  title: string
  /** Dialog description */
  description?: string
  /** Confirm button label */
  confirmLabel?: string
  /** Cancel button label */
  cancelLabel?: string
  /** Visual variant */
  variant?: DialogVariant
  /** Loading state for the confirm button */
  loading?: boolean
  /** Custom icon (replaces the default icon) */
  icon?: ReactNode
  /** Loading text shown in the confirm button */
  loadingText?: string
  /** Additional CSS classes for the dialog panel */
  className?: string
}

/**
 * ConfirmDialog - Modal confirmation dialog for destructive actions.
 *
 * Features:
 * - Dark overlay with click-outside to close
 * - Escape key to close
 * - Focus management (restores previous focus on close)
 * - Visual variants (danger, warning, info)
 * - Body scroll lock while open
 */
export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  function ConfirmDialog(
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      description,
      confirmLabel = 'Confirmer',
      cancelLabel = 'Annuler',
      variant = 'info',
      loading = false,
      icon,
      loadingText = 'Chargement...',
      className,
    },
    ref
  ) {
    const previousFocusRef = useRef<HTMLElement | null>(null)

    // Save previous focus and restore on close
    useEffect(() => {
      if (isOpen) {
        previousFocusRef.current = document.activeElement as HTMLElement
      } else if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }, [isOpen])

    // Handle Escape key
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && !loading) {
          onClose()
        }
      },
      [isOpen, loading, onClose]
    )

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Prevent body scroll while open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    if (!isOpen) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={description ? 'confirm-dialog-description' : undefined}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity"
          onClick={loading ? undefined : onClose}
          aria-hidden="true"
        />

        {/* Dialog */}
        <div
          ref={ref}
          className={cn(
            'relative bg-white rounded-xl shadow-xl max-w-sm w-full mx-auto transform transition-all animate-in fade-in zoom-in-95 duration-200',
            className
          )}
        >
          <div className="p-6">
            {/* Icon */}
            <div className={iconBgVariants({ variant })}>
              {icon || defaultIcons[variant]}
            </div>

            {/* Title */}
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold text-gray-900 text-center mb-2"
            >
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p
                id="confirm-dialog-description"
                className="text-sm text-gray-600 text-center mb-6"
              >
                {description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={confirmButtonVariants({ variant })}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {loadingText}
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export { confirmButtonVariants, iconBgVariants }
export type { DialogVariant }
