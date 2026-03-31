/**
 * PositionSelector - Selecteur des positions que le patient peut adopter
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import {
  User,
  Armchair,
  BedSingle,
  Sofa,
  Bed,
  Dog,
  PersonStanding,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../cn'

export interface Position {
  key: string
  label: string
  iconKey: string
}

const POSITION_ICONS: Record<string, LucideIcon> = {
  'user': User,
  'armchair': Armchair,
  'bed-single': BedSingle,
  'sofa': Sofa,
  'bed': Bed,
  'dog': Dog,
  'person-standing': PersonStanding,
}

export interface PositionSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Liste des positions que le patient peut adopter */
  selectedPositions: string[]
  /** Callback appele lorsque la selection change */
  onChange: (positions: string[]) => void
  /** Liste des positions disponibles */
  availablePositions: Position[]
  /** Desactive le selecteur */
  disabled?: boolean
  /** Mode compact : badges en ligne au lieu de grille */
  compact?: boolean
  /** Label affiche au-dessus */
  label?: string
  /** Positions de base pour la selection rapide */
  basicPositionKeys?: string[]
}

export const PositionSelector = forwardRef<HTMLDivElement, PositionSelectorProps>(
  function PositionSelector(
    {
      selectedPositions,
      onChange,
      availablePositions,
      disabled = false,
      compact = false,
      label = 'Positions possibles',
      basicPositionKeys = ['debout', 'assis'],
      className,
      ...props
    },
    ref
  ) {
    const togglePosition = (key: string) => {
      if (disabled) return

      if (selectedPositions.includes(key)) {
        if (selectedPositions.length === 1) return
        onChange(selectedPositions.filter((k) => k !== key))
      } else {
        onChange([...selectedPositions, key])
      }
    }

    const selectAll = () => {
      if (disabled) return
      onChange(availablePositions.map((p) => p.key))
    }

    const selectBasic = () => {
      if (disabled) return
      onChange(basicPositionKeys)
    }

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
          {...props}
        >
          <div className="flex flex-wrap gap-2">
            {availablePositions.map((position) => {
              const isSelected = selectedPositions.includes(position.key)
              return (
                <button
                  key={position.key}
                  onClick={() => togglePosition(position.key)}
                  disabled={disabled}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all',
                    isSelected
                      ? 'bg-cyan-100 border-cyan-500 text-cyan-700 border'
                      : 'bg-gray-100 border-gray-300 text-gray-600 border hover:border-gray-400'
                  )}
                >
                  {(() => {
                    const IconComponent = POSITION_ICONS[position.iconKey]
                    return IconComponent ? (
                      <IconComponent className={cn('w-4 h-4', isSelected ? 'text-cyan-600' : 'text-gray-500')} />
                    ) : null
                  })()}
                  <span>{position.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              disabled={disabled}
              className="text-xs text-cyan-600 hover:text-cyan-700 transition-colors"
            >
              Toutes
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={selectBasic}
              disabled={disabled}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Basiques
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {availablePositions.map((position) => {
            const isSelected = selectedPositions.includes(position.key)

            return (
              <button
                key={position.key}
                onClick={() => togglePosition(position.key)}
                disabled={disabled}
                className={cn(
                  'relative flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200',
                  isSelected
                    ? 'bg-cyan-50 border-cyan-500 scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center bg-cyan-500">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {(() => {
                  const IconComponent = POSITION_ICONS[position.iconKey]
                  return IconComponent ? (
                    <IconComponent className={cn('w-6 h-6', isSelected ? 'text-cyan-600' : 'text-gray-500')} />
                  ) : null
                })()}

                <span className={cn('text-xs font-medium', isSelected ? 'text-cyan-700' : 'text-gray-700')}>
                  {position.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 text-xs text-gray-500 text-center">
          Selectionnez les positions que vous pouvez maintenir confortablement
        </div>

        {selectedPositions.length <= 2 && (
          <div className="mt-2 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs text-amber-700">
              Moins de positions = moins d'exercices disponibles
            </span>
          </div>
        )}
      </div>
    )
  }
)

export { POSITION_ICONS }
