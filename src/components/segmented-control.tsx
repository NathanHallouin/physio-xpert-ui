import { useId, useCallback, type KeyboardEvent } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const containerVariants = cva('inline-flex bg-gray-100 rounded-lg', {
  variants: {
    size: {
      sm: 'p-0.5 gap-0.5',
      md: 'p-1 gap-1',
      lg: 'p-1.5 gap-1',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const buttonVariants = cva(
  'flex-1 inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
  {
    variants: {
      size: {
        sm: 'px-3 py-1 text-xs min-h-[32px] [&>svg]:w-3.5 [&>svg]:h-3.5',
        md: 'px-4 py-2 text-sm min-h-[40px] [&>svg]:w-4 [&>svg]:h-4',
        lg: 'px-5 py-2.5 text-base min-h-[48px] [&>svg]:w-5 [&>svg]:h-5',
      },
      selected: {
        true: 'bg-white text-gray-900 shadow-sm',
        false: 'bg-transparent text-gray-600 hover:text-gray-900',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      selected: false,
      isDisabled: false,
    },
  }
)

export interface SegmentedControlOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string>
  extends VariantProps<typeof containerVariants> {
  value: T
  onChange: (value: T) => void
  options: SegmentedControlOption<T>[]
  className?: string
  'aria-label'?: string
}

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  size,
  fullWidth,
  className,
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const groupId = useId()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, _currentIndex: number) => {
      const enabledOptions = options.filter((opt) => !opt.disabled)
      const currentEnabledIndex = enabledOptions.findIndex((opt) => opt.value === value)

      let newIndex: number | null = null

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        newIndex = (currentEnabledIndex + 1) % enabledOptions.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        newIndex = (currentEnabledIndex - 1 + enabledOptions.length) % enabledOptions.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        newIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        newIndex = enabledOptions.length - 1
      }

      if (newIndex !== null) {
        onChange(enabledOptions[newIndex].value)
      }
    },
    [options, value, onChange]
  )

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(containerVariants({ size, fullWidth }), className)}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value
        const isDisabled = Boolean(option.disabled)

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            id={`${groupId}-${option.value}`}
            tabIndex={isSelected ? 0 : -1}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(option.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={buttonVariants({ size, selected: isSelected, isDisabled })}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export { containerVariants as segmentedControlVariants }
