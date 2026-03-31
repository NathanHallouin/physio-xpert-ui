import { forwardRef, useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const trackVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'w-8 h-5 p-0.5',
        md: 'w-11 h-6 p-0.5',
        lg: 'w-14 h-7 p-0.5',
      },
      checked: {
        true: 'bg-primary-600',
        false: 'bg-gray-200',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
    },
  }
)

const thumbVariants = cva(
  'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'w-3.5 h-3.5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const thumbTranslate = {
  sm: 'translate-x-3.5',
  md: 'translate-x-5',
  lg: 'translate-x-7',
} as const

export interface SwitchProps extends Omit<VariantProps<typeof trackVariants>, 'checked'> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  id?: string
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    { checked, onChange, label, description, size = 'md', disabled = false, className, id },
    ref
  ) {
    const generatedId = useId()
    const switchId = id || generatedId

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          aria-describedby={description ? `${switchId}-desc` : undefined}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={trackVariants({ size, checked })}
        >
          <span
            className={cn(
              thumbVariants({ size }),
              checked ? thumbTranslate[size!] : 'translate-x-0'
            )}
          />
        </button>

        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                id={`${switchId}-label`}
                htmlFor={switchId}
                className={cn(
                  'block text-sm font-medium cursor-pointer',
                  disabled ? 'text-gray-400' : 'text-gray-900'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${switchId}-desc`}
                className={cn(
                  'text-xs mt-0.5',
                  disabled ? 'text-gray-300' : 'text-gray-500'
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

export { trackVariants as switchVariants }
