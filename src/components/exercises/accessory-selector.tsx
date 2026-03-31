/**
 * AccessorySelector - Selecteur d'accessoires/equipements disponibles
 *
 * L'algorithme de generation de seance filtre les exercices selon
 * les accessoires que le patient possede.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import {
  Hand,
  Ribbon,
  Circle,
  Dumbbell,
  Minus,
  Armchair,
  Box,
  Square,
  Cylinder,
  Weight,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../cn'

export interface Accessory {
  key: string
  label: string
  iconKey: string
}

const ACCESSORY_ICONS: Record<string, LucideIcon> = {
  'hand': Hand,
  'ribbon': Ribbon,
  'circle': Circle,
  'pillow': Square,
  'dumbbell': Dumbbell,
  'weight': Weight,
  'cylinder': Cylinder,
  'minus': Minus,
  'armchair': Armchair,
  'box': Box,
  'square': Square,
}

export interface AccessorySelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Liste des accessoires actuellement selectionnes */
  selectedAccessories: string[]
  /** Callback appele lorsque la selection change */
  onChange: (accessories: string[]) => void
  /** Liste des accessoires disponibles */
  availableAccessories: Accessory[]
  /** Desactive le selecteur */
  disabled?: boolean
  /** Mode compact : badges en ligne au lieu de grille */
  compact?: boolean
  /** Label affiche au-dessus */
  label?: string
}

export const AccessorySelector = forwardRef<HTMLDivElement, AccessorySelectorProps>(
  function AccessorySelector(
    {
      selectedAccessories,
      onChange,
      availableAccessories,
      disabled = false,
      compact = false,
      label = 'Materiel a disposition',
      className,
      ...props
    },
    ref
  ) {
    const toggleAccessory = (key: string) => {
      if (disabled) return

      if (selectedAccessories.includes(key)) {
        if (key === 'aucun' && selectedAccessories.length === 1) return
        onChange(selectedAccessories.filter((k) => k !== key))
      } else {
        if (key === 'aucun') {
          onChange(['aucun'])
        } else {
          const withoutAucun = selectedAccessories.filter((k) => k !== 'aucun')
          onChange([...withoutAucun, key])
        }
      }
    }

    const selectAll = () => {
      if (disabled) return
      onChange(availableAccessories.filter((a) => a.key !== 'aucun').map((a) => a.key))
    }

    const selectNone = () => {
      if (disabled) return
      onChange(['aucun'])
    }

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('w-full', disabled && 'opacity-50 pointer-events-none', className)}
          {...props}
        >
          <div className="flex flex-wrap gap-2">
            {availableAccessories.map((accessory) => {
              const isSelected = selectedAccessories.includes(accessory.key)
              return (
                <button
                  key={accessory.key}
                  onClick={() => toggleAccessory(accessory.key)}
                  disabled={disabled}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all',
                    isSelected
                      ? 'bg-primary-100 border-primary-500 text-primary-700 border'
                      : 'bg-gray-100 border-gray-300 text-gray-600 border hover:border-gray-400'
                  )}
                >
                  {(() => {
                    const IconComponent = ACCESSORY_ICONS[accessory.iconKey]
                    return IconComponent ? (
                      <IconComponent className={cn('w-4 h-4', isSelected ? 'text-primary-600' : 'text-gray-500')} />
                    ) : null
                  })()}
                  <span>{accessory.label.split(' / ')[0]}</span>
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
              className="text-xs text-primary-600 hover:text-primary-700 transition-colors"
            >
              Tout selectionner
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={selectNone}
              disabled={disabled}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Aucun
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {availableAccessories.map((accessory) => {
            const isSelected = selectedAccessories.includes(accessory.key)
            const isAucun = accessory.key === 'aucun'

            return (
              <button
                key={accessory.key}
                onClick={() => toggleAccessory(accessory.key)}
                disabled={disabled}
                className={cn(
                  'relative flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200',
                  isSelected
                    ? isAucun
                      ? 'bg-gray-100 border-gray-400 scale-[1.02]'
                      : 'bg-primary-50 border-primary-500 scale-[1.02]'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                )}
              >
                {isSelected && (
                  <div className={cn('absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center', isAucun ? 'bg-gray-500' : 'bg-primary-500')}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {(() => {
                  const IconComponent = ACCESSORY_ICONS[accessory.iconKey]
                  return IconComponent ? (
                    <IconComponent className={cn('w-5 h-5 shrink-0', isSelected ? (isAucun ? 'text-gray-600' : 'text-primary-600') : 'text-gray-500')} />
                  ) : null
                })()}

                <span className={cn('text-sm font-medium text-left', isSelected ? (isAucun ? 'text-gray-700' : 'text-primary-700') : 'text-gray-700')}>
                  {accessory.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 text-xs text-gray-500 text-center">
          {selectedAccessories.includes('aucun')
            ? 'Exercices sans materiel uniquement'
            : `${selectedAccessories.length} accessoire${selectedAccessories.length > 1 ? 's' : ''} selectionne${selectedAccessories.length > 1 ? 's' : ''}`
          }
        </div>
      </div>
    )
  }
)

export { ACCESSORY_ICONS }
