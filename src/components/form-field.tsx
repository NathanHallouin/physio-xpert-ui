"use client"

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

type FieldState = 'idle' | 'valid' | 'error'

const formFieldInputVariants = cva(
  'w-full px-4 py-2.5 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed',
  {
    variants: {
      state: {
        idle: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
        valid: 'border-green-500 focus:ring-green-500 focus:border-green-500 pr-10',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500 pr-10',
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  }
)

export interface FormFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
  /** Unique field ID */
  id: string
  /** Field label */
  label: string
  /** Validation state */
  state?: FieldState
  /** Error message */
  error?: string | null
  /** Help text displayed below the input */
  helpText?: string
  /** Additional CSS classes for the container */
  className?: string
  /** Custom content rendered after the input (e.g., icons) */
  adornment?: ReactNode
}

/**
 * FormField - Form input with label, validation icons, and error/help messages.
 *
 * Features:
 * - Automatic label with required indicator
 * - Visual validation state (idle, valid, error)
 * - Integrated error message with icon
 * - Help text support
 * - Full accessibility (aria-invalid, aria-describedby)
 */
export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    {
      id,
      label,
      type = 'text',
      state = 'idle',
      error,
      required = false,
      helpText,
      className,
      adornment,
      ...props
    },
    ref
  ) {
    const hasError = state === 'error' && error
    const isValid = state === 'valid'

    return (
      <div className={className}>
        {/* Label */}
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-600 ml-0.5">*</span>}
        </label>

        {/* Input container */}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={type}
            required={required}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={
              hasError ? `${id}-error` : helpText ? `${id}-help` : undefined
            }
            className={formFieldInputVariants({ state })}
            {...props}
          />

          {/* Validation icon */}
          {(isValid || hasError) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {isValid && (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {hasError && (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}

          {adornment}
        </div>

        {/* Error message */}
        {hasError && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            role="alert"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {/* Help text */}
        {helpText && !hasError && (
          <p id={`${id}-help`} className="mt-1.5 text-xs text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

export { formFieldInputVariants }
export type { FieldState }
