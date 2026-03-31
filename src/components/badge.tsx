import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const badgeVariants = cva('inline-flex items-center gap-1.5 font-medium rounded-full', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-primary-100 text-primary-700',
      accent: 'bg-accent-100 text-accent-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-orange-100 text-orange-700',
      error: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    },
    outline: {
      true: 'bg-transparent border',
    },
  },
  compoundVariants: [
    { variant: 'default', outline: true, className: 'border-gray-300 text-gray-700' },
    { variant: 'primary', outline: true, className: 'border-primary-300 text-primary-700' },
    { variant: 'accent', outline: true, className: 'border-accent-300 text-accent-700' },
    { variant: 'success', outline: true, className: 'border-green-300 text-green-700' },
    { variant: 'warning', outline: true, className: 'border-orange-300 text-orange-700' },
    { variant: 'error', outline: true, className: 'border-red-300 text-red-700' },
    { variant: 'info', outline: true, className: 'border-blue-300 text-blue-700' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const dotVariants = cva('rounded-full', {
  variants: {
    variant: {
      default: 'bg-gray-500',
      primary: 'bg-primary-500',
      accent: 'bg-accent-500',
      success: 'bg-green-500',
      warning: 'bg-orange-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    },
    size: {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, variant, size, outline, dot = false, className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, outline }), className)}
      {...props}
    >
      {dot && (
        <span
          className={dotVariants({ variant, size })}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
})

export { badgeVariants }
