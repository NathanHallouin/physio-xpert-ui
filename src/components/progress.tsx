import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const progressTrackVariants = cva('w-full bg-gray-200 rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const progressBarVariants = cva('h-full rounded-full transition-all duration-300 ease-out', {
  variants: {
    variant: {
      default: 'bg-primary-500',
      gradient: 'bg-gradient-to-r from-cyan-500 to-green-500',
      success: 'bg-green-500',
      warning: 'bg-amber-500',
      error: 'bg-red-500',
    },
    animated: {
      true: 'animate-pulse',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ProgressProps
  extends VariantProps<typeof progressBarVariants>,
    VariantProps<typeof progressTrackVariants> {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  valueFormat?: (value: number, max: number) => string
  className?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    { value, max = 100, label, showValue = false, valueFormat, variant, size, animated, className },
    ref
  ) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const displayValue = valueFormat ? valueFormat(value, max) : `${Math.round(percentage)}%`

    return (
      <div ref={ref} className={className}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1.5">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            {showValue && <span className="text-sm text-gray-500">{displayValue}</span>}
          </div>
        )}

        <div
          className={progressTrackVariants({ size })}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className={progressBarVariants({ variant, animated })}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

const stepCircleVariants = cva(
  'rounded-full flex items-center justify-center font-medium transition-colors duration-200',
  {
    variants: {
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
      },
      state: {
        completed: 'bg-primary-600 text-white',
        current: 'bg-primary-600 text-white ring-4 ring-primary-100',
        upcoming: 'bg-gray-200 text-gray-500',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'upcoming',
    },
  }
)

const stepLineVariants = cva('flex-1 mx-2 transition-colors duration-200', {
  variants: {
    size: {
      sm: 'h-0.5',
      md: 'h-1',
    },
    completed: {
      true: 'bg-primary-600',
      false: 'bg-gray-200',
    },
  },
  defaultVariants: {
    size: 'md',
    completed: false,
  },
})

export interface StepProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  size?: 'sm' | 'md'
  className?: string
}

export function StepProgress({
  currentStep,
  totalSteps,
  labels,
  size = 'md',
  className,
}: StepProgressProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isLast = stepNumber === totalSteps
          const state = isCompleted ? 'completed' : isCurrent ? 'current' : 'upcoming'

          return (
            <div key={stepNumber} className={cn('flex items-center', !isLast && 'flex-1')}>
              <div className={stepCircleVariants({ size, state })}>
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {!isLast && (
                <div className={stepLineVariants({ size, completed: isCompleted })} />
              )}
            </div>
          )
        })}
      </div>

      {labels && labels.length > 0 && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(
                'text-xs text-center',
                index + 1 <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-500'
              )}
              style={{ width: `${100 / totalSteps}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export { progressBarVariants, progressTrackVariants }
