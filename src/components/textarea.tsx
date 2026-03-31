import { type TextareaHTMLAttributes, forwardRef, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const textareaVariants = cva(
  'bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed resize-y min-h-[100px] px-4 py-2.5 text-sm',
  {
    variants: {
      hasError: {
        true: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        false: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      hasError: false,
      fullWidth: true,
    },
  }
)

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, 'hasError'> {
  label?: string
  error?: string | null
  helpText?: string
  showCount?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      error,
      helpText,
      showCount = false,
      maxLength,
      fullWidth,
      className,
      id,
      required,
      disabled,
      value,
      rows = 4,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hasError = Boolean(error)
    const charCount = typeof value === 'string' ? value.length : 0

    return (
      <div className={cn(fullWidth !== false && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          value={value}
          rows={rows}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
          }
          className={cn(textareaVariants({ hasError, fullWidth }), className)}
          {...props}
        />

        <div className="flex justify-between items-start mt-1.5">
          <div className="flex-1">
            {hasError && (
              <p id={`${inputId}-error`} className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            {helpText && !hasError && (
              <p id={`${inputId}-help`} className="text-xs text-gray-500">
                {helpText}
              </p>
            )}
          </div>

          {showCount && (
            <span
              className={cn(
                'text-xs ml-2',
                maxLength && charCount >= maxLength ? 'text-red-500' : 'text-gray-400'
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      </div>
    )
  }
)

export { textareaVariants }
