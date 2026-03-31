import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const cardVariants = cva('', {
  variants: {
    variant: {
      elevated: 'bg-white shadow-md border border-gray-100',
      outlined: 'bg-white border border-gray-200',
      filled: 'bg-gray-50 border border-gray-100',
      ghost: 'bg-transparent',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
    rounded: {
      sm: 'rounded',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
    },
    clickable: {
      true: 'cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-gray-300 active:scale-[0.99]',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
    rounded: 'lg',
  },
})

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, variant, padding, rounded, clickable, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, rounded, clickable }), className)}
      {...props}
    >
      {children}
    </div>
  )
})

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  action?: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ children, action, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between mb-3', className)}
        {...props}
      >
        <div className="font-semibold text-gray-900">{children}</div>
        {action && <div>{action}</div>}
      </div>
    )
  }
)

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent({ children, className, ...props }, ref) {
    return (
      <div ref={ref} className={cn('text-gray-600', className)} {...props}>
        {children}
      </div>
    )
  }
)

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4 pt-4 border-t border-gray-100 flex items-center gap-2',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export { cardVariants }
