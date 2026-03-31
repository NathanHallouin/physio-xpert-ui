/**
 * SportsPracticedInput - Sports selector with tags and suggestions
 *
 * Allows selecting sports via:
 * - Predefined suggestions (common sports)
 * - Free-text input for custom sports
 * - Clickable tags for easy removal
 *
 * @example
 * ```tsx
 * <SportsPracticedInput
 *   value="Course a pied, Natation"
 *   onChange={(value) => setFieldValue('sportsPracticed', value)}
 * />
 * ```
 */

import { useState, useRef, useEffect } from 'react'
import { X, Plus, Search } from 'lucide-react'
import { cn } from '../cn'

/** Default suggested sports (most common in France) */
export const SUGGESTED_SPORTS = [
  // Endurance
  'Course a pied',
  'Marche',
  'Randonnee',
  'Natation',
  'Cyclisme',
  'VTT',
  // Team sports
  'Football',
  'Basketball',
  'Volleyball',
  'Handball',
  'Rugby',
  // Racket sports
  'Tennis',
  'Badminton',
  'Padel',
  'Squash',
  'Tennis de table',
  // Fitness & strength
  'Musculation',
  'Fitness',
  'CrossFit',
  'Pilates',
  'Yoga',
  // Combat sports
  'Boxe',
  'Judo',
  'Karate',
  'MMA',
  // Other
  'Golf',
  'Equitation',
  'Escalade',
  'Ski',
  'Danse',
  'Gymnastique',
]

export interface SportsPracticedInputProps {
  /** Currently selected sports (comma-separated string) */
  value: string
  /** Callback when the list changes */
  onChange: (value: string) => void
  /** Disables the component */
  disabled?: boolean
  /** Label text */
  label?: string
  /** Additional CSS classes */
  className?: string
}

export function SportsPracticedInput({
  value,
  onChange,
  disabled = false,
  label = 'Sports pratiques',
  className,
}: SportsPracticedInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Convert string to array
  const selectedSports = value
    ? value.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  // Filter suggestions (not selected and matching search)
  const filteredSuggestions = SUGGESTED_SPORTS.filter(
    (sport) =>
      !selectedSports.some((s) => s.toLowerCase() === sport.toLowerCase()) &&
      sport.toLowerCase().includes(inputValue.toLowerCase())
  )

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const addSport = (sport: string) => {
    const trimmed = sport.trim()
    if (!trimmed) return

    if (selectedSports.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      return
    }

    const newSports = [...selectedSports, trimmed]
    onChange(newSports.join(', '))
    setInputValue('')
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const removeSport = (sportToRemove: string) => {
    const newSports = selectedSports.filter((s) => s !== sportToRemove)
    onChange(newSports.join(', '))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        addSport(inputValue)
      }
    } else if (e.key === 'Backspace' && !inputValue && selectedSports.length > 0) {
      removeSport(selectedSports[selectedSports.length - 1])
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {/* Tags + input zone */}
      <div
        className={cn(
          'min-h-[42px] px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-text focus-within:border-gray-300',
          disabled && 'bg-gray-50 cursor-not-allowed opacity-60'
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        <div className="flex flex-wrap gap-2 items-center min-h-[26px]">
          {/* Selected sport tags */}
          {selectedSports.map((sport) => (
            <span
              key={sport}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-200"
            >
              {sport}
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSport(sport)
                  }}
                  className="p-0.5 hover:bg-primary-200 rounded-full transition-colors"
                  aria-label={`Supprimer ${sport}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </span>
          ))}

          {/* Text input */}
          {!disabled && (
            <div className="flex-1 min-w-[120px] flex items-center gap-1.5">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder={selectedSports.length === 0 ? 'Rechercher un sport...' : 'Ajouter...'}
                className="flex-1 text-sm bg-transparent placeholder:text-gray-400"
                style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && !disabled && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Add custom sport button */}
          {inputValue.trim() && !filteredSuggestions.some(
            (s) => s.toLowerCase() === inputValue.toLowerCase()
          ) && (
            <button
              type="button"
              onClick={() => addSport(inputValue)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 border-b border-gray-100"
            >
              <Plus className="w-4 h-4 text-primary-600" />
              <span>
                Ajouter <span className="font-medium text-primary-600">&ldquo;{inputValue}&rdquo;</span>
              </span>
            </button>
          )}

          {/* Filtered suggestions */}
          {filteredSuggestions.length > 0 ? (
            <div className="py-1">
              {filteredSuggestions.slice(0, 10).map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => addSport(sport)}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                >
                  {sport}
                </button>
              ))}
              {filteredSuggestions.length > 10 && (
                <p className="px-3 py-2 text-xs text-gray-400">
                  +{filteredSuggestions.length - 10} autres...
                </p>
              )}
            </div>
          ) : inputValue ? (
            <p className="px-3 py-2 text-sm text-gray-500">
              Aucune suggestion. Appuyez sur Entree pour ajouter.
            </p>
          ) : null}
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-gray-500 mt-1.5">
        {selectedSports.length === 0
          ? 'Cliquez pour selectionner vos sports'
          : `${selectedSports.length} sport${selectedSports.length > 1 ? 's' : ''} selectionne${selectedSports.length > 1 ? 's' : ''}`}
      </p>
    </div>
  )
}
