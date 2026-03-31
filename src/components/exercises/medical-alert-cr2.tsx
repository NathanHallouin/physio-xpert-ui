/**
 * MedicalAlertCR2 - Alerte medicale pour douleur persistante elevee
 *
 * Affiche quand la regle CR-2 est declenchee :
 * EVA >= 7 pendant >= 10 jours (>= 5 seances).
 *
 * @component
 */

import { useEffect, useRef, type HTMLAttributes, forwardRef } from 'react'
import { AlertTriangle } from 'lucide-react'
import { cn } from '../cn'

export interface MedicalAlertCR2Props extends HTMLAttributes<HTMLDivElement> {
  /** Nombre de jours depuis le declenchement de l'alerte */
  daysSinceAlert?: number
  /** Callback pour contacter le praticien */
  onContactPractitioner?: () => void
  /** Callback pour fermer l'alerte */
  onDismiss?: () => void
  /** Affichage en mode compact (banniere au lieu de modal) */
  compact?: boolean
}

export const MedicalAlertCR2 = forwardRef<HTMLDivElement, MedicalAlertCR2Props>(
  function MedicalAlertCR2(
    { daysSinceAlert, onContactPractitioner, onDismiss, compact = false, className, ...props },
    ref
  ) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!compact && modalRef.current) {
        modalRef.current.focus()
      }
    }, [compact])

    useEffect(() => {
      if (compact) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onDismiss) {
          onDismiss()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [compact, onDismiss])

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('bg-red-900/80 border border-red-500 rounded-lg p-4', className)}
          role="alert"
          aria-live="assertive"
          {...props}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-300 animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-100 font-semibold text-sm">
                Alerte medicale active
              </h3>
              <p className="text-red-200/80 text-xs mt-1">
                Votre douleur reste elevee depuis plusieurs seances.
                Nous vous recommandons de consulter un professionnel de sante.
              </p>
              {onContactPractitioner && (
                <button
                  onClick={onContactPractitioner}
                  className="mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-medium rounded-md transition-colors"
                >
                  Contacter mon praticien
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="medical-alert-title"
        {...props}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className="bg-gradient-to-br from-red-600 to-rose-600 border-2 border-red-400 rounded-xl p-6 max-w-sm w-full shadow-2xl"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-red-500/30 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-red-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h2 id="medical-alert-title" className="text-xl font-bold text-red-100 text-center mb-2">
            Alerte medicale
          </h2>

          <p className="text-red-200/90 text-center text-sm mb-4">
            Votre niveau de douleur reste eleve depuis plusieurs seances.
            {daysSinceAlert && daysSinceAlert > 0 && (
              <span className="block mt-1 text-red-300/70 text-xs">
                (Alerte active depuis {daysSinceAlert} jour{daysSinceAlert > 1 ? 's' : ''})
              </span>
            )}
          </p>

          <div className="bg-red-950/50 border border-red-700/50 rounded-lg p-3 mb-5">
            <p className="text-red-100 text-sm font-medium mb-1">Recommandation</p>
            <p className="text-red-200/80 text-xs">
              Nous vous recommandons de consulter votre medecin ou
              kinesitherapeute avant de poursuivre vos exercices.
            </p>
          </div>

          <div className="space-y-2">
            {onContactPractitioner && (
              <button
                onClick={onContactPractitioner}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contacter mon praticien
              </button>
            )}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="w-full py-2.5 bg-red-900/50 hover:bg-red-800/50 text-red-200 font-medium rounded-xl transition-colors text-sm"
              >
                J'ai compris, fermer
              </button>
            )}
          </div>

          <p className="text-red-300/50 text-xs text-center mt-4">
            En cas d'urgence, appelez le 15 (SAMU) ou le 112.
          </p>
        </div>
      </div>
    )
  }
)
