/**
 * SupervisionPendingBanner - Pending supervision notice
 *
 * Displayed when a red session has triggered supervision.
 * The patient sees that their rehabilitation awaits professional validation.
 */

import { AlertTriangle, Clock, UserCheck } from 'lucide-react'
import { cn } from '../cn'

export interface SupervisionPendingBannerProps {
  /** Name of the exercise/session that triggered the alert */
  alertReason?: string
  /** Alert date (ISO string) */
  alertDate?: string
  /** Callback when the patient clicks "I understand" */
  onDismiss?: () => void
  /** Additional CSS classes */
  className?: string
}

export function SupervisionPendingBanner({
  alertReason,
  alertDate,
  onDismiss,
  className,
}: SupervisionPendingBannerProps) {
  return (
    <div className={cn(
      'rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg overflow-hidden',
      className
    )}>
      {/* Header with icon */}
      <div className="bg-amber-100 px-4 py-3 flex items-center gap-3">
        <div className="p-2 bg-amber-200 rounded-full">
          <Clock className="w-5 h-5 text-amber-700" />
        </div>
        <h3 className="font-semibold text-amber-900">
          Reeducation en cours de supervision
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="mb-2">
              Votre derniere seance a declenche une <strong>supervision par un kinesitherapeute</strong> pour assurer la securite de votre reeducation.
            </p>
            {alertReason && (
              <p className="text-amber-700 text-xs mb-2">
                Raison : {alertReason}
              </p>
            )}
            {alertDate && (
              <p className="text-amber-600 text-xs">
                Depuis le {new Date(alertDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </div>
        </div>

        {/* Reassurance message */}
        <div className="bg-white/60 rounded-lg p-3 border border-amber-100">
          <div className="flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="font-medium text-gray-900 mb-1">
                Votre prochaine seance attend l'expertise d'un professionnel
              </p>
              <p className="text-gray-600">
                Un kinesitherapeute va examiner votre dossier et valider ou adapter votre programme pour une continuite de la reeducation en toute securite.
              </p>
            </div>
          </div>
        </div>

        {/* Notification text */}
        <p className="text-xs text-amber-600 text-center">
          Vous serez notifie des que votre reeducation pourra reprendre.
        </p>

        {/* Optional dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-lg transition-colors text-sm"
          >
            J'ai compris
          </button>
        )}
      </div>
    </div>
  )
}
