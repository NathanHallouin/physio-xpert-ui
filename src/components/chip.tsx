import { forwardRef, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from './cn'

const chipVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1',
  {
    variants: {
      variant: {
        primary: '',
        accent: '',
        success: '',
        warning: '',
        error: '',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs gap-1 min-h-[28px] [&>svg]:w-3 [&>svg]:h-3',
        md: 'px-3 py-1 text-sm gap-1.5 min-h-[36px] [&>svg]:w-4 [&>svg]:h-4',
        lg: 'px-4 py-1.5 text-base gap-2 min-h-[44px] [&>svg]:w-5 [&>svg]:h-5',
      },
      selected: {
        true: '',
        false: 'bg-white text-gray-600 border-gray-300',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'cursor-pointer active:scale-95',
      },
    },
    compoundVariants: [
      { variant: 'primary', selected: true, className: 'bg-primary-100 text-primary-700 border-primary-300' },
      { variant: 'primary', selected: false, className: 'hover:bg-primary-50' },
      { variant: 'accent', selected: true, className: 'bg-accent-100 text-accent-700 border-accent-300' },
      { variant: 'accent', selected: false, className: 'hover:bg-accent-50' },
      { variant: 'success', selected: true, className: 'bg-green-100 text-green-700 border-green-300' },
      { variant: 'success', selected: false, className: 'hover:bg-green-50' },
      { variant: 'warning', selected: true, className: 'bg-orange-100 text-orange-700 border-orange-300' },
      { variant: 'warning', selected: false, className: 'hover:bg-orange-50' },
      { variant: 'error', selected: true, className: 'bg-red-100 text-red-700 border-red-300' },
      { variant: 'error', selected: false, className: 'hover:bg-red-50' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      selected: false,
      isDisabled: false,
    },
  }
)

const removeSizeStyles = {
  sm: 'w-4 h-4 -mr-0.5',
  md: 'w-5 h-5 -mr-1',
  lg: 'w-6 h-6 -mr-1',
} as const

export interface ChipProps extends Omit<VariantProps<typeof chipVariants>, 'selected' | 'isDisabled'> {
  children: ReactNode
  selected?: boolean
  onSelect?: () => void
  onRemove?: () => void
  disabled?: boolean
  icon?: ReactNode
  className?: string
}

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    children,
    selected = false,
    onSelect,
    onRemove,
    variant,
    size = 'md',
    disabled = false,
    icon,
    className,
  },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => !disabled && onSelect?.()}
      className={cn(
        chipVariants({ variant, size, selected, isDisabled: disabled }),
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label="Supprimer"
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) onRemove()
          }}
          disabled={disabled}
          className={cn(
            'shrink-0 rounded-full hover:bg-gray-200 transition-colors inline-flex items-center justify-center',
            removeSizeStyles[size!]
          )}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </button>
  )
})

export interface ChipGroupProps<T extends string> {
  options: { value: T; label: string; icon?: ReactNode }[]
  value: T[]
  onChange: (value: T[]) => void
  multiple?: boolean
  variant?: ChipProps['variant']
  size?: ChipProps['size']
  className?: string
}

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  multiple = true,
  variant,
  size,
  className,
}: ChipGroupProps<T>) {
  const handleSelect = (optionValue: T) => {
    if (multiple) {
      if (value.includes(optionValue)) {
        onChange(value.filter((v) => v !== optionValue))
      } else {
        onChange([...value, optionValue])
      }
    } else {
      onChange(value.includes(optionValue) ? [] : [optionValue])
    }
  }

  return (
    <div role="group" className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <Chip
          key={option.value}
          selected={value.includes(option.value)}
          onSelect={() => handleSelect(option.value)}
          variant={variant}
          size={size}
          icon={option.icon}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}

export { chipVariants }
