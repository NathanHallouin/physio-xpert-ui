/**
 * SupervisionApprovedBanner - Rehabilitation resumption notification
 *
 * Displayed when the physiotherapist has approved the next session.
 * The patient can resume their rehabilitation.
 */

import { CheckCircle, Play, Sparkles } from 'lucide-react'
import { cn } from '../cn'

export interface SupervisionApprovedBannerProps {
  /** Practitioner notes (optional) */
  practitionerNotes?: string
  /** Callback to start the session */
  onStartSession?: () => void
  /** Callback to dismiss the banner */
  onDismiss?: () => void
  /** Additional CSS classes */
  className?: string
}

export function SupervisionApprovedBanner({
  practitionerNotes,
  onStartSession,
  onDismiss,
  className,
}: SupervisionApprovedBannerProps) {
  return (
    <div className={cn(
      'rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg overflow-hidden',
      className
    )}>
      {/* Header with icon */}
      <div className="bg-green-100 px-4 py-3 flex items-center gap-3">
        <div className="p-2 bg-green-200 rounded-full animate-pulse">
          <Sparkles className="w-5 h-5 text-green-700" />
        </div>
        <h3 className="font-semibold text-green-900">
          Vous pouvez reprendre votre reeducation !
        </h3>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-800">
            <p className="mb-2">
              Un kinesitherapeute a examine votre dossier et <strong>valide votre prochaine seance</strong>.
            </p>
            <p className="text-green-700">
              Votre programme a peut-etre ete adapte pour mieux correspondre a vos capacites actuelles.
            </p>
          </div>
        </div>

        {/* Practitioner notes */}
        {practitionerNotes && (
          <div className="bg-white/60 rounded-lg p-3 border border-green-100">
            <p className="text-xs font-medium text-green-700 mb-1">
              Message du kinesitherapeute :
            </p>
            <p className="text-sm text-gray-700 italic">
              &ldquo;{practitionerNotes}&rdquo;
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-1 py-2.5 px-4 bg-white border border-green-200 text-green-700 font-medium rounded-lg transition-colors text-sm hover:bg-green-50"
            >
              Plus tard
            </button>
          )}
          {onStartSession && (
            <button
              onClick={onStartSession}
              className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Commencer la seance
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
