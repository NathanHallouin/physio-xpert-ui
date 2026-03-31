/**
 * DifficultySelector - Selecteur de perception de difficulte d'un exercice
 *
 * La perception de difficulte est l'un des 3 criteres pour le statut V/O/R.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Dumbbell, ThumbsUp, Frown, type LucideIcon } from 'lucide-react'
import { cn } from '../cn'

/** Perception de difficulte */
export type DifficultyPerception = 'facile' | 'normal' | 'difficile'

export interface DifficultySelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Valeur actuellement selectionnee */
  value: DifficultyPerception | null
  /** Callback appele lorsque l'utilisateur change la selection */
  onChange: (value: DifficultyPerception) => void
  /** Desactive le selecteur */
  disabled?: boolean
  /** Label affiche au-dessus */
  label?: string
}

const OPTIONS: {
  value: DifficultyPerception
  label: string
  Icon: LucideIcon
  description: string
  color: string
  bgColor: string
  borderColor: string
}[] = [
  {
    value: 'facile',
    label: 'Facile',
    Icon: Dumbbell,
    description: 'Je pourrais faire plus',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500',
  },
  {
    value: 'normal',
    label: 'Normal',
    Icon: ThumbsUp,
    description: 'Effort adapte',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500',
  },
  {
    value: 'difficile',
    label: 'Difficile',
    Icon: Frown,
    description: 'C\'etait dur',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500',
  },
]

export const DifficultySelector = forwardRef<HTMLDivElement, DifficultySelectorProps>(
  function DifficultySelector(
    {
      value,
      onChange,
      disabled = false,
      label = 'Comment avez-vous trouve cet exercice ?',
      className,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
        {...props}
      >
        <label className="block text-sm font-medium text-gray-600 mb-3">
          {label}
        </label>

        <div className="grid grid-cols-3 gap-3">
          {OPTIONS.map((option) => {
            const isSelected = value === option.value

            return (
              <button
                key={option.value}
                onClick={() => onChange(option.value)}
                disabled={disabled}
                className={cn(
                  'relative flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200',
                  isSelected
                    ? `${option.bgColor} ${option.borderColor} scale-105`
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                )}
              >
                {isSelected && (
                  <div className={cn('absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center', option.bgColor, option.borderColor)}>
                    <svg className={cn('w-4 h-4', option.color)} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <option.Icon className={cn('w-8 h-8 mb-2', isSelected ? option.color : 'text-gray-400')} />

                <span className={cn('font-semibold', isSelected ? option.color : 'text-gray-900')}>
                  {option.label}
                </span>

                <span className="text-xs text-gray-500 mt-1 text-center">
                  {option.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

export { OPTIONS as DIFFICULTY_OPTIONS }
