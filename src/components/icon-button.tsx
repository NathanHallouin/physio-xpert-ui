import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-400',
        primary:
          'bg-primary-100 text-primary-700 hover:bg-primary-200 active:bg-primary-300 focus:ring-primary-400',
        accent:
          'bg-accent-100 text-accent-700 hover:bg-accent-200 active:bg-accent-300 focus:ring-accent-400',
        ghost:
          'bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400',
        outline:
          'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-400',
      },
      size: {
        sm: 'w-9 h-9 min-w-[36px] min-h-[36px] [&>svg]:w-4 [&>svg]:h-4',
        md: 'w-11 h-11 min-w-[44px] min-h-[44px] [&>svg]:w-5 [&>svg]:h-5',
        lg: 'w-14 h-14 min-w-[56px] min-h-[56px] [&>svg]:w-6 [&>svg]:h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: ReactNode
  label: string
  loading?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, label, variant, size, loading = false, disabled, className, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={disabled || loading}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          icon
        )}
        <span className="sr-only">{label}</span>
      </button>
    )
  }
)

export { iconButtonVariants }
