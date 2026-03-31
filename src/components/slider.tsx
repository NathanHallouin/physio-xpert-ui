import { useId, useCallback, useRef, useState, useEffect } from 'react'
import { cn } from './cn'

export interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  label?: string
  disabled?: boolean
  className?: string
  trackColor?: string
  thumbColor?: string
  showMarks?: boolean
  minLabel?: string
  maxLabel?: string
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  label,
  disabled = false,
  className,
  trackColor = 'bg-primary-500',
  thumbColor = 'bg-primary-600',
  showMarks = false,
  minLabel,
  maxLabel,
}: SliderProps) {
  const id = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const percentage = ((value - min) / (max - min)) * 100
  const stepsCount = Math.floor((max - min) / step)

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return

      const rect = trackRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = Math.max(0, Math.min(1, x / rect.width))
      const rawValue = min + pct * (max - min)
      const steppedValue = Math.round(rawValue / step) * step
      const clampedValue = Math.max(min, Math.min(max, steppedValue))

      if (clampedValue !== value) {
        onChange(clampedValue)
      }
    },
    [min, max, step, value, onChange, disabled]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValue(e.clientX)
    },
    [disabled, updateValue]
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return
      setIsDragging(true)
      updateValue(e.touches[0].clientX)
    },
    [disabled, updateValue]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => updateValue(e.clientX)
    const handleTouchMove = (e: TouchEvent) => updateValue(e.touches[0].clientX)
    const handleEnd = () => setIsDragging(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleEnd)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, updateValue])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = value
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(max, value + step)
          break
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(min, value - step)
          break
        case 'Home':
          newValue = min
          break
        case 'End':
          newValue = max
          break
        default:
          return
      }
      e.preventDefault()
      onChange(newValue)
    },
    [value, min, max, step, disabled, onChange]
  )

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}

      <div
        ref={trackRef}
        className={cn(
          'relative h-6 flex items-center',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute w-full h-2 bg-gray-200 rounded-full" />

        <div
          className={cn('absolute h-2 rounded-full transition-all', trackColor)}
          style={{ width: `${percentage}%` }}
        />

        {showMarks && stepsCount <= 20 && (
          <div className="absolute w-full">
            {Array.from({ length: stepsCount + 1 }).map((_, i) => {
              const markPercentage = (i / stepsCount) * 100
              const markValue = min + i * step
              const isActive = markValue <= value
              return (
                <div
                  key={i}
                  className={cn(
                    'absolute w-1 h-1 rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2',
                    isActive ? trackColor : 'bg-gray-300'
                  )}
                  style={{ left: `${markPercentage}%` }}
                />
              )
            })}
          </div>
        )}

        <div
          role="slider"
          id={id}
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          className={cn(
            'absolute w-6 h-6 rounded-full shadow-md -translate-x-1/2 transition-transform focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            thumbColor,
            isDragging && 'scale-110',
            !disabled && 'hover:scale-105'
          )}
          style={{ left: `${percentage}%` }}
        >
          {showValue && (
            <div
              className={cn(
                'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded transition-opacity whitespace-nowrap',
                isDragging ? 'opacity-100' : 'opacity-0'
              )}
            >
              {value}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
            </div>
          )}
        </div>
      </div>

      {showValue && !isDragging && (
        <div className="text-center mt-1 text-sm font-medium text-gray-700">{value}</div>
      )}
    </div>
  )
}
