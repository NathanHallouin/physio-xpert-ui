/**
 * IntensitySelector - Sélecteur d'intensité de douleur
 *
 * Permet de choisir un niveau d'intensité de douleur (0-4).
 * Affiche une échelle visuelle avec 5 niveaux colorés.
 */

import { memo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'
import {
  type PainIntensity,
  getPainColor,
  getPainLabel,
  painColors,
} from '../tokens'

const intensitySelectorVariants = cva('flex flex-col', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const intensityButtonVariants = cva(
  'rounded-full font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-11 h-11 text-sm',
        lg: 'w-14 h-14 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const intensityGapVariants = cva('', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const intensityLabelVariants = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface IntensitySelectorProps extends VariantProps<typeof intensitySelectorVariants> {
  /** Intensité sélectionnée */
  value: PainIntensity
  /** Callback quand l'intensité change */
  onChange: (intensity: PainIntensity) => void
  /** Label de la zone sélectionnée */
  zoneLabel?: string
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Classes CSS additionnelles */
  className?: string
}

const intensityLevels: PainIntensity[] = [0, 1, 2, 3, 4]

export const IntensitySelector = memo(function IntensitySelector({
  value,
  onChange,
  zoneLabel,
  orientation = 'horizontal',
  size = 'md',
  className,
}: IntensitySelectorProps) {
  const isVertical = orientation === 'vertical'

  return (
    <div className={cn(intensitySelectorVariants({ size }), className)}>
      {/* Zone label */}
      {zoneLabel && (
        <div className={cn('font-medium text-gray-900 mb-3', intensityLabelVariants({ size }))}>
          {zoneLabel}
        </div>
      )}

      {/* Intensity buttons */}
      <div
        role="radiogroup"
        aria-label="Intensité de la douleur"
        className={cn(
          'flex',
          isVertical ? 'flex-col' : 'flex-row',
          intensityGapVariants({ size })
        )}
      >
        {intensityLevels.map((level) => {
          const isSelected = value === level
          const color = getPainColor(level)
          const label = getPainLabel(level)

          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${label} (niveau ${level})`}
              onClick={() => onChange(level)}
              className={cn(
                intensityButtonVariants({ size }),
                isSelected
                  ? 'ring-2 ring-offset-2 scale-110 shadow-md'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              )}
              style={{
                backgroundColor: color,
                color: level >= 2 ? 'white' : '#1f2937',
                // @ts-expect-error - CSS custom property for ring color
                '--tw-ring-color': color,
              }}
            >
              {level}
            </button>
          )
        })}
      </div>

      {/* Selected intensity label */}
      <div className="mt-3 text-center">
        <span
          className={cn('font-semibold', intensityLabelVariants({ size }))}
          style={{ color: getPainColor(value) }}
        >
          {getPainLabel(value)}
        </span>
        <span className={cn('text-gray-500 ml-2', intensityLabelVariants({ size }))}>
          (niveau {value}/4)
        </span>
      </div>

      {/* Visual gradient bar */}
      <div className="mt-3 h-2 rounded-full overflow-hidden flex">
        {Object.values(painColors).map((color, index) => (
          <div
            key={index}
            className="flex-1 transition-opacity duration-200"
            style={{
              backgroundColor: color,
              opacity: index <= value ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
})

/**
 * IntensitySelectorCompact - Version compacte pour usage inline
 */
export interface IntensitySelectorCompactProps {
  value: PainIntensity
  onChange: (intensity: PainIntensity) => void
  className?: string
}

export const IntensitySelectorCompact = memo(function IntensitySelectorCompact({
  value,
  onChange,
  className,
}: IntensitySelectorCompactProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Intensité de la douleur"
      className={cn('inline-flex gap-1', className)}
    >
      {intensityLevels.map((level) => {
        const isSelected = value === level
        const color = getPainColor(level)

        return (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${getPainLabel(level)} (niveau ${level})`}
            onClick={() => onChange(level)}
            className={cn(
              'w-6 h-6 rounded-full text-xs font-medium',
              'flex items-center justify-center',
              'transition-all duration-150',
              'focus:outline-none focus:ring-1 focus:ring-offset-1',
              isSelected ? 'ring-1 ring-offset-1 scale-110' : 'opacity-60 hover:opacity-100'
            )}
            style={{
              backgroundColor: color,
              color: level >= 2 ? 'white' : '#1f2937',
            }}
          >
            {level}
          </button>
        )
      })}
    </div>
  )
})
