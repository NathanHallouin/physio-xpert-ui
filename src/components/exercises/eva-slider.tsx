/**
 * EVASlider - Echelle Visuelle Analogique pour mesurer la douleur
 *
 * L'EVA mesure la douleur du patient sur une echelle de 0 a 10.
 * - 0 = Aucune douleur
 * - 1-3 = Douleur legere (vert)
 * - 4-6 = Douleur moderee (jaune/orange)
 * - 7-10 = Douleur intense (rouge) - declenche le mode "antalgique"
 *
 * @component
 */

import { useState, useEffect, type HTMLAttributes, forwardRef } from 'react'
import {
  Smile,
  Meh,
  Frown,
  Angry,
  Skull,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../cn'

/**
 * Contrainte de direction pour le slider
 * - 'below': La valeur doit etre inferieure a referenceValue
 * - 'above': La valeur doit etre superieure a referenceValue
 * - 'equal': La valeur est verrouillee a referenceValue
 */
export type EVAConstraint = 'below' | 'above' | 'equal' | null

export interface EVASliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Valeur actuelle (0-10) */
  value: number
  /** Callback appele quand la valeur change */
  onChange: (value: number) => void
  /** Label affiche au-dessus du slider */
  label?: string
  /** Afficher un emoji correspondant a la douleur ? */
  showEmoji?: boolean
  /** Desactiver l'interaction ? */
  disabled?: boolean
  /** Valeur de reference (EVA pre-seance) a afficher comme indicateur */
  referenceValue?: number | null
  /** Contrainte de direction basee sur l'evolution de la douleur */
  constraint?: EVAConstraint
}

const EVA_COLORS = [
  '#22c55e', // 0 - vert
  '#4ade80', // 1
  '#86efac', // 2
  '#bef264', // 3
  '#fde047', // 4 - jaune
  '#fbbf24', // 5
  '#fb923c', // 6 - orange
  '#f97316', // 7
  '#ef4444', // 8 - rouge
  '#dc2626', // 9
  '#b91c1c', // 10 - rouge fonce
]

const EVA_ICONS: Array<{ Icon: LucideIcon; color: string }> = [
  { Icon: Smile, color: 'text-green-500' },
  { Icon: Smile, color: 'text-green-400' },
  { Icon: Smile, color: 'text-lime-500' },
  { Icon: Meh, color: 'text-lime-400' },
  { Icon: Meh, color: 'text-yellow-500' },
  { Icon: Meh, color: 'text-amber-500' },
  { Icon: Frown, color: 'text-orange-500' },
  { Icon: Frown, color: 'text-orange-600' },
  { Icon: Angry, color: 'text-red-500' },
  { Icon: Angry, color: 'text-red-600' },
  { Icon: Skull, color: 'text-red-700' },
]

export const EVASlider = forwardRef<HTMLDivElement, EVASliderProps>(
  function EVASlider(
    {
      value,
      onChange,
      label = 'Niveau de douleur',
      showEmoji = true,
      disabled = false,
      referenceValue = null,
      constraint = null,
      className,
      ...props
    },
    ref
  ) {
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const applyConstraint = (newValue: number): number => {
      if (!constraint || referenceValue === null) return newValue

      switch (constraint) {
        case 'below':
          return Math.min(newValue, Math.max(0, referenceValue - 1))
        case 'above':
          return Math.max(newValue, Math.min(10, referenceValue + 1))
        case 'equal':
          return referenceValue
        default:
          return newValue
      }
    }

    const getConstrainedBounds = (): { min: number; max: number } => {
      if (!constraint || referenceValue === null) return { min: 0, max: 10 }

      switch (constraint) {
        case 'below':
          return { min: 0, max: Math.max(0, referenceValue - 1) }
        case 'above':
          return { min: Math.min(10, referenceValue + 1), max: 10 }
        case 'equal':
          return { min: referenceValue, max: referenceValue }
        default:
          return { min: 0, max: 10 }
      }
    }

    const bounds = getConstrainedBounds()

    const handleChange = (newValue: number) => {
      const constrainedValue = applyConstraint(newValue)
      setLocalValue(constrainedValue)
      onChange(constrainedValue)
    }

    const getColor = (val: number) => EVA_COLORS[Math.min(val, 10)]
    const getIconConfig = (val: number) => EVA_ICONS[Math.min(val, 10)]

    const getDescription = (val: number): string => {
      if (val === 0) return 'Aucune douleur'
      if (val <= 2) return 'Douleur legere'
      if (val <= 4) return 'Douleur moderee'
      if (val <= 6) return 'Douleur importante'
      if (val <= 8) return 'Douleur intense'
      return 'Douleur insupportable'
    }

    return (
      <div
        ref={ref}
        className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
        {...props}
      >
        {/* Label */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <div className="flex items-center gap-2">
            {showEmoji && (() => {
              const iconConfig = getIconConfig(localValue)
              return <iconConfig.Icon className={cn('w-7 h-7', iconConfig.color)} />
            })()}
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: getColor(localValue) }}
            >
              {localValue}
            </span>
          </div>
        </div>

        {/* Slider container */}
        <div className="relative">
          {/* Track background with gradient */}
          <div className="h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 opacity-30" />

          {/* Active track */}
          <div
            className="absolute top-0 h-3 rounded-full transition-all duration-150"
            style={{
              width: `${(localValue / 10) * 100}%`,
              background: `linear-gradient(to right, #22c55e, ${getColor(localValue)})`,
            }}
          />

          {/* Reference marker (EVA pre-seance) */}
          {referenceValue !== null && referenceValue !== undefined && (
            <div
              className="absolute top-0 h-3 flex items-center justify-center pointer-events-none z-10"
              style={{ left: `${(referenceValue / 10) * 100}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-0.5 h-5 bg-blue-500 rounded-full shadow-sm" />
              <div className="absolute -top-6 whitespace-nowrap">
                <span className="text-xs font-medium text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">
                  Avant : {referenceValue}
                </span>
              </div>
            </div>
          )}

          {/* Constrained zone indicator */}
          {constraint && referenceValue !== null && constraint !== 'equal' && (
            <div
              className="absolute top-0 h-3 bg-gray-400/30 rounded-full pointer-events-none"
              style={{
                left: constraint === 'below' ? `${((referenceValue) / 10) * 100}%` : '0%',
                right: constraint === 'above' ? `${100 - ((referenceValue) / 10) * 100}%` : '0%',
                width: constraint === 'below'
                  ? `${100 - ((referenceValue) / 10) * 100}%`
                  : `${((referenceValue) / 10) * 100}%`,
              }}
            />
          )}

          {/* Input slider */}
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step="1"
            value={localValue}
            onChange={(e) => handleChange(parseInt(e.target.value))}
            className={cn(
              'absolute top-0 w-full h-3 appearance-none bg-transparent cursor-pointer',
              '[&::-webkit-slider-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-6',
              '[&::-webkit-slider-thumb]:h-6',
              '[&::-webkit-slider-thumb]:rounded-full',
              '[&::-webkit-slider-thumb]:bg-white',
              '[&::-webkit-slider-thumb]:shadow-lg',
              '[&::-webkit-slider-thumb]:border-2',
              '[&::-webkit-slider-thumb]:border-gray-300',
              '[&::-webkit-slider-thumb]:cursor-pointer',
              '[&::-webkit-slider-thumb]:transition-transform',
              '[&::-webkit-slider-thumb]:hover:scale-110',
              '[&::-moz-range-thumb]:w-6',
              '[&::-moz-range-thumb]:h-6',
              '[&::-moz-range-thumb]:rounded-full',
              '[&::-moz-range-thumb]:bg-white',
              '[&::-moz-range-thumb]:shadow-lg',
              '[&::-moz-range-thumb]:border-2',
              '[&::-moz-range-thumb]:border-gray-300',
              '[&::-moz-range-thumb]:cursor-pointer',
            )}
            disabled={disabled || constraint === 'equal'}
          />
        </div>

        {/* Scale labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>

        {/* Description */}
        <p className="text-center text-sm mt-2" style={{ color: getColor(localValue) }}>
          {getDescription(localValue)}
        </p>
      </div>
    )
  }
)

export { EVA_COLORS, EVA_ICONS }
