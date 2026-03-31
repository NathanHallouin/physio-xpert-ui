/**
 * DeleteAccountModal - Confirmation modal for permanent account deletion
 *
 * Implements the "Right to Erasure" (GDPR Article 17) with safeguards:
 * 1. Textual confirmation: patient must type "SUPPRIMER"
 * 2. Double confirmation: button disabled until text matches
 * 3. Clear warning: lists all data that will be deleted
 *
 * @example
 * ```tsx
 * <DeleteAccountModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onConfirm={handleDeleteAccount}
 *   userEmail={user.email}
 * />
 * ```
 */

import { useState } from 'react'
import { cn } from '../cn'

export interface DeleteAccountModalProps {
  /** Controls modal visibility */
  isOpen: boolean
  /** Callback to close the modal */
  onClose: () => void
  /** Async callback to perform the deletion */
  onConfirm: () => Promise<void>
  /** User email (displayed in the modal) */
  userEmail: string
  /** Additional CSS classes for the overlay */
  className?: string
}

const CONFIRMATION_TEXT = 'SUPPRIMER'

export function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  userEmail,
  className,
}: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isConfirmValid = confirmText === CONFIRMATION_TEXT

  const handleConfirm = async () => {
    if (!isConfirmValid) return

    try {
      setDeleting(true)
      setError(null)
      await onConfirm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
      setDeleting(false)
    }
  }

  const handleClose = () => {
    if (deleting) return
    setConfirmText('')
    setError(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn',
      className
    )}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/20 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">Supprimer definitivement mon compte</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Main warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-900 mb-1">
                  Action irreversible !
                </h3>
                <p className="text-sm text-red-800">
                  Cette action supprimera <strong>definitivement et immediatement</strong> toutes vos donnees.
                </p>
              </div>
            </div>
          </div>

          {/* Data concerned */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Donnees qui seront supprimees :</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                { label: 'Profil patient', detail: 'Toutes vos informations personnelles (nom, date de naissance, etc.)' },
                { label: 'Historique de questionnaires', detail: 'Toutes vos reponses et evaluations' },
                { label: 'Compte utilisateur', detail: `Votre compte email ${userEmail}` },
                { label: 'Programmes d\'exercices', detail: 'Toutes vos seances et recommandations' },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span><strong>{item.label}</strong> : {item.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* GDPR info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-blue-800">
                <strong>Droit a l'effacement (RGPD Article 17)</strong> : Conformement a la reglementation, vos donnees seront definitivement supprimees de nos serveurs. Cette action ne peut pas etre annulee.
              </p>
            </div>
          </div>

          {/* Confirmation field */}
          <div>
            <label htmlFor="confirmText" className="block text-sm font-medium text-gray-900 mb-2">
              Pour confirmer, tapez <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-red-600">{CONFIRMATION_TEXT}</span>
            </label>
            <input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="Tapez SUPPRIMER"
              disabled={deleting}
              className="w-full px-4 py-2.5 text-sm bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              autoComplete="off"
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3">
          <button
            onClick={handleClose}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmValid || deleting}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {deleting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Suppression en cours...
              </span>
            ) : (
              'Supprimer definitivement'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
