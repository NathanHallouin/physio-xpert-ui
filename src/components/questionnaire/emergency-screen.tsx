/**
 * EmergencyScreen - Écran d'urgence affiché lors de la détection d'un Red Flag
 *
 * Ce composant bloque complètement le questionnaire lorsqu'un "red flag" médical
 * est détecté. Les red flags sont des signaux d'alerte graves nécessitant une
 * consultation médicale urgente.
 */

import { cn } from '../cn'

/**
 * Flag type for red flag detection
 */
export interface Flag {
  id: string
  key: string
  label: Record<string, string> | string
  color: string
  description: Record<string, string> | string | null
  questionnaireId: string | null
  isGlobal: boolean | null
  isRedFlag: boolean | null
  status: string
}

export interface EmergencyScreenProps {
  /** Le flag red flag qui a déclenché l'écran d'urgence */
  triggeredFlag: Flag
  /** Callback pour quitter et retourner à l'accueil */
  onExit: () => void
  /** Nom du praticien (optionnel) */
  practitionerName?: string
  /** Numéro du praticien (optionnel) */
  practitionerPhone?: string
}

/**
 * Extrait le texte français d'un label JSONB
 */
function getLabel(label: Record<string, string> | string): string {
  if (typeof label === 'string') return label
  if (label?.fr) return label.fr
  if (label?.en) return label.en
  return 'Alerte médicale détectée'
}

/**
 * Extrait la description française d'un flag
 */
function getDescription(description: Record<string, string> | string | null): string | null {
  if (!description) return null
  if (typeof description === 'string') return description
  if (description?.fr) return description.fr
  if (description?.en) return description.en
  return null
}

export function EmergencyScreen({
  triggeredFlag,
  onExit,
  practitionerName,
  practitionerPhone
}: EmergencyScreenProps) {
  const flagLabel = getLabel(triggeredFlag.label)
  const flagDescription = getDescription(triggeredFlag.description)

  const handleCallEmergency = () => {
    // En France: 15 (SAMU) ou 112 (urgences européennes)
    window.location.href = 'tel:15'
  }

  const handleCallPractitioner = () => {
    if (practitionerPhone) {
      window.location.href = `tel:${practitionerPhone}`
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col">
      {/* Header sobre */}
      <div className="flex-shrink-0 pt-safe-top px-4 pt-8 pb-4 bg-white border-b border-slate-200">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 text-center">
          Une consultation médicale est recommandée
        </h1>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Message explicatif - ton rassurant */}
          <div className="bg-white rounded-xl p-5 mb-5 shadow-sm border border-slate-200">
            <p className="text-slate-700 text-base leading-relaxed">
              D'après vos réponses, certains symptômes méritent d'être{' '}
              <strong className="text-slate-800">évalués par un professionnel de santé</strong>.
            </p>
            <p className="text-slate-500 text-sm mt-3">
              Il s'agit d'une précaution. Votre médecin pourra vous examiner
              et vous orienter au mieux.
            </p>
          </div>

          {/* Info sur le symptôme détecté - discret */}
          <div className="bg-slate-100 rounded-lg p-4 mb-6">
            <p className="text-slate-500 text-xs mb-1 uppercase tracking-wide">Symptôme identifié</p>
            <p className="text-slate-700 font-medium">{flagLabel}</p>
            {flagDescription && (
              <p className="text-slate-500 text-sm mt-1">{flagDescription}</p>
            )}
          </div>

          {/* Actions - plus sobres */}
          <div className="space-y-3">
            {/* Appeler le praticien en premier (plus rassurant) */}
            {practitionerPhone && (
              <button
                onClick={handleCallPractitioner}
                className={cn(
                  'w-full flex items-center justify-center gap-3',
                  'bg-cyan-500 text-white font-semibold py-4 px-6 rounded-xl',
                  'hover:bg-cyan-600 active:scale-[0.98] transition-all'
                )}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Appeler {practitionerName || 'mon praticien'}
              </button>
            )}

            {/* Appeler les urgences - secondaire */}
            <button
              onClick={handleCallEmergency}
              className={cn(
                'w-full flex items-center justify-center gap-3',
                'bg-white text-slate-700 font-medium py-3.5 px-6 rounded-xl',
                'border border-slate-300 hover:bg-slate-50 active:scale-[0.98] transition-all'
              )}
            >
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Appeler le 15 (SAMU)
            </button>

            {/* Numéro européen - discret */}
            <p className="text-center text-slate-400 text-sm py-2">
              En cas d'urgence vitale : <a href="tel:112" className="text-slate-600 font-medium hover:underline">112</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer sobre */}
      <div className="flex-shrink-0 px-4 py-4 pb-safe-bottom bg-white border-t border-slate-200">
        <div className="max-w-md mx-auto">
          <p className="text-slate-400 text-xs text-center mb-3">
            Vos réponses ont été sauvegardées et seront accessibles à votre praticien.
          </p>
          <button
            onClick={onExit}
            className="w-full text-slate-500 text-sm py-2 hover:text-slate-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}
