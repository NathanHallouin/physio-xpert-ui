/**
 * RPESelector - Selecteur de l'effort percu (Rate of Perceived Exertion)
 *
 * Echelle de 1 a 10 mesurant l'effort ressenti par le patient.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Gauge } from 'lucide-react'
import { cn } from '../cn'

export interface RPESelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number | null
  onChange: (value: number) => void
  targetMin?: number
  targetMax?: number
  disabled?: boolean
}

const RPE_LEVELS = [
  { value: 1, label: 'Repos', color: '#22c55e', description: 'Aucun effort' },
  { value: 2, label: 'Tres facile', color: '#4ade80', description: 'Presque rien' },
  { value: 3, label: 'Facile', color: '#86efac', description: 'Leger effort' },
  { value: 4, label: 'Leger', color: '#bef264', description: 'Echauffement' },
  { value: 5, label: 'Modere', color: '#fde047', description: 'Travail leger' },
  { value: 6, label: 'Modere+', color: '#fbbf24', description: 'Travail modere' },
  { value: 7, label: 'Difficile', color: '#fb923c', description: 'Effort significatif' },
  { value: 8, label: 'Tres difficile', color: '#f97316', description: 'Effort important' },
  { value: 9, label: 'Tres dur', color: '#ef4444', description: 'Proche du max' },
  { value: 10, label: 'Maximum', color: '#dc2626', description: 'Epuisement total' },
]

export const RPESelector = forwardRef<HTMLDivElement, RPESelectorProps>(
  function RPESelector(
    { value, onChange, targetMin, targetMax, disabled = false, className, ...props },
    ref
  ) {
    const selectedLevel = value ? RPE_LEVELS[value - 1] : null
    const hasTarget = targetMin !== undefined && targetMax !== undefined

    return (
      <div
        ref={ref}
        className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gauge className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Effort percu (RPE)</h3>
              <p className="text-xs text-gray-500">A quel point c'etait dur ?</p>
            </div>
          </div>
          {value && (
            <span
              className="text-3xl font-bold tabular-nums"
              style={{ color: selectedLevel?.color }}
            >
              {value}
            </span>
          )}
        </div>

        {/* Target zone indicator */}
        {hasTarget && (
          <div className="mb-3 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-xs text-primary-700">
              Zone cible : <span className="font-semibold">{targetMin} - {targetMax}</span>
            </p>
          </div>
        )}

        {/* RPE Grid */}
        <div className="grid grid-cols-5 gap-2">
          {RPE_LEVELS.map((level) => {
            const isSelected = value === level.value
            const isInTarget =
              hasTarget &&
              level.value >= (targetMin || 0) &&
              level.value <= (targetMax || 10)

            return (
              <button
                key={level.value}
                onClick={() => onChange(level.value)}
                className={cn(
                  'relative flex flex-col items-center justify-center p-2 rounded-lg transition-all',
                  isSelected
                    ? 'ring-2 ring-offset-2 shadow-md'
                    : 'hover:bg-gray-50',
                  isInTarget && !isSelected ? 'bg-primary-50/50' : 'bg-white border border-gray-200'
                )}
                style={{
                  borderColor: isSelected ? level.color : undefined,
                  ['--tw-ring-color' as string]: isSelected ? level.color : undefined,
                }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: level.color }}
                >
                  {level.value}
                </span>
                <span className="text-[10px] text-gray-500 text-center leading-tight mt-0.5">
                  {level.label}
                </span>
                {isInTarget && (
                  <div
                    className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary-500"
                    title="Zone cible"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Selected description */}
        {selectedLevel && (
          <div className="mt-3 text-center">
            <p className="text-sm" style={{ color: selectedLevel.color }}>
              {selectedLevel.description}
            </p>
            {hasTarget && (
              <p className="text-xs text-gray-500 mt-1">
                {value && value >= (targetMin || 0) && value <= (targetMax || 10) ? (
                  <span className="text-green-600">Dans la zone cible</span>
                ) : value && value < (targetMin || 0) ? (
                  <span className="text-amber-600">En dessous de la cible</span>
                ) : (
                  <span className="text-red-600">Au-dessus de la cible</span>
                )}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

export { RPE_LEVELS }
