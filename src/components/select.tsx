import { type SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const selectVariants = cva(
  'bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none cursor-pointer pr-10',
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
      hasValue: {
        true: 'text-gray-900',
        false: 'text-gray-400',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      size: 'md',
      hasError: false,
      hasValue: false,
      fullWidth: true,
    },
  }
)

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    Omit<VariantProps<typeof selectVariants>, 'hasError' | 'hasValue'> {
  label?: string
  options: SelectOption[]
  placeholder?: string
  error?: string | null
  helpText?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      options,
      placeholder,
      error,
      helpText,
      size,
      fullWidth,
      className,
      id,
      required,
      disabled,
      value,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const inputId = id || generatedId
    const hasError = Boolean(error)
    const hasValue = value !== '' && value !== undefined

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
          <select
            ref={ref}
            id={inputId}
            required={required}
            disabled={disabled}
            value={value}
            aria-invalid={hasError || undefined}
            aria-describedby={
              hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
            }
            className={cn(
              selectVariants({ size, hasError, hasValue, fullWidth }),
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className={cn('w-5 h-5', hasError ? 'text-red-500' : 'text-gray-400')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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
  }
)

export { selectVariants }
