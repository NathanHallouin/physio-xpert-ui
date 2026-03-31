import { type InputHTMLAttributes, type ReactNode, forwardRef, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const inputVariants = cva(
  'bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'px-3 py-1.5 text-sm h-9',
        md: 'px-4 py-2.5 text-sm h-10',
        lg: 'px-4 py-3 text-base h-12',
      },
      hasError: {
        true: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        false: 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      fullWidth: true,
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputVariants>, 'hasError'> {
  label?: string
  error?: string | null
  helpText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    helpText,
    size,
    leftIcon,
    rightIcon,
    fullWidth,
    className,
    id,
    required,
    disabled,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hasError = Boolean(error)

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

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
          }
          className={cn(
            inputVariants({ size, hasError, fullWidth }),
            leftIcon && 'pl-10',
            (rightIcon || hasError) && 'pr-10',
            className
          )}
          {...props}
        />

        {(rightIcon || hasError) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {hasError ? (
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
            ) : (
              <span className="text-gray-400">{rightIcon}</span>
            )}
          </div>
        )}
      </div>

      {hasError && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {helpText && !hasError && (
        <p id={`${inputId}-help`} className="mt-1.5 text-xs text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  )
})

export { inputVariants }
