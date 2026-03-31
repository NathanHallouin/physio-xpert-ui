/**
 * QuestionnaireProgress - Indicateur de progression dans les questionnaires
 *
 * Composant affichant la progression du patient dans le questionnaire.
 * Inclut une barre de progression et l'indication du module actuel.
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const questionnaireProgressVariants = cva('bg-white', {
  variants: {
    variant: {
      compact: '',
      full: '',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
})

export interface QuestionnaireProgressProps extends VariantProps<typeof questionnaireProgressVariants> {
  /** Numéro du module actuel (1-indexed) */
  currentModule: number
  /** Nombre total de modules */
  totalModules: number
  /** Nom du module actuel */
  moduleName?: string
  /** Numéro de la question actuelle dans le module (1-indexed) */
  currentQuestion?: number
  /** Nombre total de questions dans le module */
  totalQuestionsInModule?: number
  /** Nombre total de questions répondues dans tout le questionnaire */
  totalAnswered?: number
  /** Nombre total de questions dans tout le questionnaire */
  totalQuestions?: number
  /** Classes CSS additionnelles */
  className?: string
  /** Callback pour fermer/quitter le questionnaire */
  onClose?: () => void
}

/**
 * Composant QuestionnaireProgress
 * Affiche la progression dans un questionnaire
 */
export function QuestionnaireProgress({
  currentModule,
  totalModules,
  moduleName,
  currentQuestion,
  totalQuestionsInModule,
  totalAnswered = 0,
  totalQuestions = 0,
  variant = 'full',
  className,
  onClose,
}: QuestionnaireProgressProps) {
  // Calcul du pourcentage de progression
  const progressPercent = totalQuestions > 0
    ? Math.round((totalAnswered / totalQuestions) * 100)
    : Math.round((currentModule / totalModules) * 100)

  const isCompact = variant === 'compact'

  return (
    <div className={cn(questionnaireProgressVariants({ variant }), className)}>
      {/* Version compacte */}
      {isCompact ? (
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <span>Module {currentModule}/{totalModules}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : (
        /* Version complète */
        <div className="max-w-4xl mx-auto px-4 py-3 border-b border-gray-100">
          {/* En-tête avec bouton fermer, module et pourcentage */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {/* Bouton fermer */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Quitter le questionnaire"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {/* Indicateur de module */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalModules }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
                      i < currentModule ? 'bg-primary-500' : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                Module {currentModule}/{totalModules}
              </span>
            </div>
            <span className="text-sm font-medium text-primary-600">
              {progressPercent}%
            </span>
          </div>

          {/* Barre de progression */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progression: ${progressPercent}%`}
            />
          </div>

          {/* Informations détaillées */}
          <div className="flex items-center justify-between">
            {/* Nom du module */}
            {moduleName && (
              <div className="flex items-center gap-1.5 text-sm text-gray-700">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium truncate max-w-[200px]">{moduleName}</span>
              </div>
            )}

            {/* Compteur de questions */}
            {currentQuestion !== undefined && totalQuestionsInModule !== undefined && (
              <span className="text-xs text-gray-500 shrink-0">
                Question {currentQuestion}/{totalQuestionsInModule}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
