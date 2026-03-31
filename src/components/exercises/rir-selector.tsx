/**
 * RIRSelector - Selecteur des repetitions en reserve
 *
 * Le RIR (Repetitions In Reserve) indique combien de repetitions
 * le patient aurait pu faire en plus.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Battery, BatteryFull, BatteryLow, BatteryMedium, BatteryWarning, type LucideIcon } from 'lucide-react'
import { cn } from '../cn'

export interface RIRSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number | null
  onChange: (value: number) => void
  targetMin?: number
  targetMax?: number
  disabled?: boolean
}

const RIR_LEVELS: Array<{
  value: number
  label: string
  description: string
  color: string
  bgColor: string
  Icon: LucideIcon
}> = [
  {
    value: 0,
    label: 'Echec',
    description: 'Impossible d\'en faire plus',
    color: '#dc2626',
    bgColor: '#fef2f2',
    Icon: BatteryWarning,
  },
  {
    value: 1,
    label: '1 de plus',
    description: 'Juste une de plus possible',
    color: '#f97316',
    bgColor: '#fff7ed',
    Icon: BatteryLow,
  },
  {
    value: 2,
    label: '2 de plus',
    description: 'Zone ideale HSR',
    color: '#eab308',
    bgColor: '#fefce8',
    Icon: BatteryMedium,
  },
  {
    value: 3,
    label: '3 de plus',
    description: 'Effort significatif',
    color: '#84cc16',
    bgColor: '#f7fee7',
    Icon: BatteryMedium,
  },
  {
    value: 4,
    label: '4 de plus',
    description: 'Effort modere',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    Icon: BatteryFull,
  },
  {
    value: 5,
    label: '5+ de plus',
    description: 'Peut progresser',
    color: '#10b981',
    bgColor: '#ecfdf5',
    Icon: BatteryFull,
  },
]

export const RIRSelector = forwardRef<HTMLDivElement, RIRSelectorProps>(
  function RIRSelector(
    { value, onChange, targetMin, targetMax, disabled = false, className, ...props },
    ref
  ) {
    const selectedLevel = value !== null ? RIR_LEVELS.find((l) => l.value === value) : null
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
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Battery className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Repetitions en reserve</h3>
              <p className="text-xs text-gray-500">Combien de plus auriez-vous pu faire ?</p>
            </div>
          </div>
        </div>

        {/* Target zone indicator */}
        {hasTarget && (
          <div className="mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-xs text-emerald-700">
              Zone cible : <span className="font-semibold">{targetMin} - {targetMax} RIR</span>
            </p>
          </div>
        )}

        {/* RIR Options */}
        <div className="grid grid-cols-2 gap-2">
          {RIR_LEVELS.map((level) => {
            const isSelected = value === level.value
            const isInTarget =
              hasTarget &&
              level.value >= (targetMin || 0) &&
              level.value <= (targetMax || 5)
            const Icon = level.Icon

            return (
              <button
                key={level.value}
                onClick={() => onChange(level.value)}
                className={cn(
                  'relative flex items-center gap-3 p-3 rounded-xl transition-all text-left',
                  isSelected
                    ? 'ring-2 ring-offset-1 shadow-md'
                    : isInTarget
                      ? 'bg-emerald-50/50 border border-emerald-200'
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                )}
                style={{
                  backgroundColor: isSelected ? level.bgColor : undefined,
                  borderColor: isSelected ? level.color : undefined,
                  ['--tw-ring-color' as string]: isSelected ? level.color : undefined,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: isSelected ? `${level.color}20` : '#f3f4f6' }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isSelected ? level.color : '#6b7280' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-bold text-lg"
                      style={{ color: level.color }}
                    >
                      {level.value === 5 ? '5+' : level.value}
                    </span>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-gray-900' : 'text-gray-600'
                      )}
                    >
                      {level.label}
                    </span>
                  </div>
                  {isSelected && (
                    <p className="text-xs text-gray-500 mt-0.5">{level.description}</p>
                  )}
                </div>
                {isInTarget && !isSelected && (
                  <div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500"
                    title="Zone cible"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {selectedLevel && hasTarget && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              {value !== null && value >= (targetMin || 0) && value <= (targetMax || 5) ? (
                <span className="text-emerald-600 font-medium">
                  Parfait ! Vous etes dans la zone cible
                </span>
              ) : value !== null && value < (targetMin || 0) ? (
                <span className="text-amber-600 font-medium">
                  Effort eleve - Pensez a reduire la charge
                </span>
              ) : (
                <span className="text-primary-600 font-medium">
                  Vous pouvez progresser la prochaine fois
                </span>
              )}
            </p>
          </div>
        )}

        {/* HSR zone indicator */}
        {selectedLevel && value !== null && value >= 1 && value <= 2 && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-800 text-center">
              <span className="font-semibold">Zone optimale HSR !</span> Le tendon recoit
              une charge mecanique maximale.
            </p>
          </div>
        )}
      </div>
    )
  }
)

export { RIR_LEVELS }
