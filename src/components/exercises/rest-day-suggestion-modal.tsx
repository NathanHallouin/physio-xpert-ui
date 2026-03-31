/**
 * RestDaySuggestionModal - Modal de suggestion de jour de repos
 *
 * Affichee lorsque le patient a fait 7 jours consecutifs d'exercices.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Coffee, Dumbbell, Heart, AlertCircle } from 'lucide-react'
import { cn } from '../cn'

export interface RestDaySuggestionModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Modal ouverte ou fermee */
  isOpen: boolean
  /** Nombre de jours consecutifs d'exercices */
  consecutiveDays: number
  /** Callback quand le patient choisit de se reposer */
  onTakeRestDay: () => void
  /** Callback quand le patient veut continuer quand meme */
  onContinueAnyway: () => void
}

export const RestDaySuggestionModal = forwardRef<HTMLDivElement, RestDaySuggestionModalProps>(
  function RestDaySuggestionModal(
    { isOpen, consecutiveDays, onTakeRestDay, onContinueAnyway, className, ...props },
    ref
  ) {
    if (!isOpen) return null

    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50', className)}
        {...props}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Bravo pour votre regularite !
            </h2>
            <p className="text-amber-100 text-sm mt-1">
              {consecutiveDays} jours d'exercices consecutifs
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Heart className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Un jour de repos serait benefique
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Le repos fait partie de la reeducation. Il permet a votre corps de recuperer et de progresser plus efficacement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Faire trop d'exercices sans pause peut etre contre-productif et augmenter le risque de douleurs.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={onTakeRestDay}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg shadow-lg transition-all"
              >
                <Coffee className="w-5 h-5" />
                Prendre un jour de repos
              </button>

              <button
                onClick={onContinueAnyway}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Dumbbell className="w-5 h-5" />
                Continuer quand meme
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
