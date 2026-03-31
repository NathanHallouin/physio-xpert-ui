/**
 * DailyAvailabilitySettings - Reglage de la disponibilite journaliere
 *
 * Permet au patient de definir combien de minutes par jour
 * il souhaite consacrer a ses exercices.
 *
 * @component
 */

import { useState, useEffect, type HTMLAttributes, forwardRef } from 'react'
import { Clock, Minus, Plus, Check } from 'lucide-react'
import { cn } from '../cn'

export interface DailyAvailabilitySettingsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Valeur actuelle en minutes (5-60) */
  value: number
  /** Callback appele quand la valeur change */
  onChange?: (minutes: number) => void
  /** Callback pour sauvegarder (remplace l'appel API direct) */
  onSave?: (minutes: number) => Promise<boolean>
  /** Desactiver l'interaction ? */
  disabled?: boolean
  /** Mode compact pour affichage dans une carte */
  compact?: boolean
}

const PRESET_OPTIONS = [
  { value: 5, label: '5 min', description: '1 seance courte' },
  { value: 10, label: '10 min', description: '1-2 seances' },
  { value: 15, label: '15 min', description: '2-3 seances' },
  { value: 30, label: '30 min', description: '3-4 seances' },
  { value: 45, label: '45 min', description: '4-5 seances' },
  { value: 60, label: '60 min', description: '5+ seances' },
]

export const DailyAvailabilitySettings = forwardRef<HTMLDivElement, DailyAvailabilitySettingsProps>(
  function DailyAvailabilitySettings(
    { value, onChange, onSave, disabled = false, compact = false, className, ...props },
    ref
  ) {
    const [localValue, setLocalValue] = useState(value)
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const handleSave = async (minutes: number) => {
      if (isSaving || disabled) return

      setIsSaving(true)
      setError(null)
      setShowSuccess(false)

      try {
        let success = true

        if (onSave) {
          success = await onSave(minutes)
        }

        if (success) {
          setLocalValue(minutes)
          setShowSuccess(true)
          onChange?.(minutes)
          setTimeout(() => setShowSuccess(false), 2000)
        } else {
          setError('Erreur lors de la sauvegarde')
        }
      } catch {
        setError('Erreur inattendue')
      } finally {
        setIsSaving(false)
      }
    }

    const handleIncrement = () => {
      const newValue = Math.min(60, localValue + 5)
      handleSave(newValue)
    }

    const handleDecrement = () => {
      const newValue = Math.max(5, localValue - 5)
      handleSave(newValue)
    }

    const handlePresetClick = (presetValue: number) => {
      if (presetValue !== localValue) {
        handleSave(presetValue)
      }
    }

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn(disabled && 'opacity-50 pointer-events-none', className)}
          {...props}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Objectif journalier</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                disabled={isSaving || localValue <= 5}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="w-16 text-center font-semibold text-gray-900">
                {isSaving ? '...' : `${localValue} min`}
              </span>
              <button
                onClick={handleIncrement}
                disabled={isSaving || localValue >= 60}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          {showSuccess && (
            <div className="flex items-center justify-end gap-1 mt-1 text-green-600 text-xs">
              <Check className="w-3 h-3" />
              Sauvegarde
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(disabled && 'opacity-50 pointer-events-none', className)}
        {...props}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Disponibilite journaliere</h3>
            <p className="text-sm text-gray-500">
              Temps que vous souhaitez consacrer a vos exercices chaque jour
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-primary-50 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrement}
              disabled={isSaving || localValue <= 5}
              className="w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all disabled:opacity-50 disabled:shadow-none"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center min-w-[100px]">
              <span className="text-4xl font-bold text-gray-900">
                {isSaving ? '...' : localValue}
              </span>
              <span className="text-xl text-gray-500 ml-1">min</span>
              {showSuccess && (
                <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-sm">
                  <Check className="w-4 h-4" />
                  Sauvegarde
                </div>
              )}
            </div>

            <button
              onClick={handleIncrement}
              disabled={isSaving || localValue >= 60}
              className="w-12 h-12 rounded-full bg-white shadow-sm hover:shadow-md flex items-center justify-center transition-all disabled:opacity-50 disabled:shadow-none"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PRESET_OPTIONS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              disabled={isSaving}
              className={cn(
                'px-3 py-2 rounded-lg text-center transition-all disabled:opacity-50',
                localValue === preset.value
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <div className="font-semibold text-sm">{preset.label}</div>
              <div className={cn('text-xs', localValue === preset.value ? 'text-cyan-100' : 'text-gray-500')}>
                {preset.description}
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-3 text-center text-red-600 text-sm">{error}</div>
        )}

        <p className="mt-4 text-xs text-gray-400 text-center">
          Vous pouvez faire plusieurs seances courtes jusqu'a atteindre votre objectif
        </p>
      </div>
    )
  }
)

export { PRESET_OPTIONS }
