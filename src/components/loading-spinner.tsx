"use client"

import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const loadingSpinnerVariants = cva(
  'animate-spin rounded-full border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-5 w-5 border-2',
        md: 'h-8 w-8 border-4',
        lg: 'h-12 w-12 border-4',
      },
      color: {
        primary: 'border-primary-500',
        gray: 'border-gray-500',
        white: 'border-white',
        accent: 'border-accent-500',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

const loadingSpinnerTextVariants = cva('text-gray-500', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface LoadingSpinnerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof loadingSpinnerVariants> {
  /** Message displayed below the spinner */
  message?: string
  /** Display in full screen mode */
  fullScreen?: boolean
}

/**
 * LoadingSpinner - Reusable loading indicator.
 *
 * Can be used inline or as a full-screen overlay.
 *
 * @example
 * ```tsx
 * <LoadingSpinner fullScreen message="Loading data..." />
 * <LoadingSpinner size="sm" />
 * ```
 */
export const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  function LoadingSpinner(
    { size, color, message, fullScreen = false, className, ...props },
    ref
  ) {
    const spinnerContent = (
      <div
        ref={fullScreen ? undefined : ref}
        className={cn('flex flex-col items-center gap-3', !fullScreen && className)}
        role="status"
        aria-live="polite"
        {...(!fullScreen ? props : {})}
      >
        <div
          className={loadingSpinnerVariants({ size, color })}
          aria-hidden="true"
        />
        {message && (
          <p className={loadingSpinnerTextVariants({ size })}>{message}</p>
        )}
        <span className="sr-only">{message || 'Chargement en cours...'}</span>
      </div>
    )

    if (fullScreen) {
      return (
        <div
          ref={ref}
          className={cn(
            'min-h-screen bg-gray-50 flex items-center justify-center pb-16',
            className
          )}
          {...props}
        >
          {spinnerContent}
        </div>
      )
    }

    return spinnerContent
  }
)

export { loadingSpinnerVariants, loadingSpinnerTextVariants }
