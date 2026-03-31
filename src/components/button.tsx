"use client"

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'
import { Slot } from './slot'

const buttonVariants = cva(
  'font-medium transition-all duration-200 rounded-lg inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md focus:ring-primary-500',
        secondary:
          'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 shadow-sm hover:shadow-md focus:ring-gray-500',
        accent:
          'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm hover:shadow-md focus:ring-accent-500',
        outline:
          'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500',
        ghost:
          'text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500',
        gradient:
          'bg-gradient-primary text-white shadow-md hover:shadow-lg focus:ring-primary-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm h-9',
        md: 'px-4 py-2.5 text-sm h-10',
        lg: 'px-6 py-3 text-base h-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
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
        )}
        {!loading && leftIcon && <span>{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </Comp>
    )
  }
)

export { buttonVariants }
