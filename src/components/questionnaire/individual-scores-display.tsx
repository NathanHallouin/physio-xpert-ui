/**
 * IndividualScoresDisplay Component
 *
 * Displays individualized scores from the new scoring system (session_score_result).
 * Each score is linked to a score_definition with its own interpretation ranges.
 */

import { cn } from '../cn'

/**
 * Interpretation color type
 */
export type InterpretationColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray'

/**
 * Localized text (multilingual JSONB)
 */
export type LocalizedText = { fr?: string; en?: string } | string | null | undefined

/**
 * Score definition from the database
 */
export interface ScoreDefinition {
  id: string
  questionnaireId: string
  key: string
  name: LocalizedText
  description?: LocalizedText
  minValue: number
  maxValue: number
  displayOrder: number
  higherIsBetter: boolean
}

/**
 * Individual score result stored in session_score_result
 */
export interface SessionScoreResult {
  id: string
  sessionResultId: string
  scoreDefinitionId: string
  value: number
  interpretation: {
    label: LocalizedText
    color: InterpretationColor
  } | null
  createdAt: string
  scoreDefinition?: ScoreDefinition
}

export interface IndividualScoresDisplayProps {
  scores: SessionScoreResult[]
  title?: string
  showDetails?: boolean
}

/**
 * Get background and text colors for interpretation
 */
function getInterpretationColors(color?: InterpretationColor): { bg: string; text: string; border: string; bar: string } {
  switch (color) {
    case 'green':
      return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', bar: 'bg-green-500' }
    case 'yellow':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', bar: 'bg-yellow-500' }
    case 'orange':
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', bar: 'bg-orange-500' }
    case 'red':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', bar: 'bg-red-500' }
    case 'blue':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-blue-500' }
    case 'gray':
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', bar: 'bg-gray-500' }
  }
}

/**
 * Get localized text (French by default)
 */
function getLocalizedText(text: LocalizedText): string {
  if (!text) return ''
  if (typeof text === 'string') return text
  return text.fr || text.en || ''
}

/**
 * Single score card component with progress bar
 */
function IndividualScoreCard({ scoreResult, showDetails }: { scoreResult: SessionScoreResult; showDetails?: boolean }) {
  const scoreDef = scoreResult.scoreDefinition
  const colors = getInterpretationColors(scoreResult.interpretation?.color)

  // Calculate percentage for progress bar
  const minValue = scoreDef?.minValue ?? 0
  const maxValue = scoreDef?.maxValue ?? 100
  const range = maxValue - minValue
  const percentage = range > 0 ? ((scoreResult.value - minValue) / range) * 100 : 0
  const clampedPercentage = Math.max(0, Math.min(100, percentage))

  // For scores where lower is better, we might want to show the bar differently
  const higherIsBetter = scoreDef?.higherIsBetter ?? true

  return (
    <div className={cn('rounded-xl border p-4', colors.border, colors.bg)}>
      {/* Score name */}
      <div className="text-sm font-medium text-gray-600 mb-2">
        {getLocalizedText(scoreDef?.name) || scoreDef?.key || 'Score'}
      </div>

      {/* Score value and range */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className={cn('text-3xl font-bold', colors.text)}>
            {scoreResult.value}
          </span>
          <span className="text-sm text-gray-500">
            / {maxValue}
          </span>
        </div>
        {!higherIsBetter && (
          <span className="text-xs text-gray-400 italic">
            (bas = meilleur)
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className={cn('absolute inset-y-0 left-0 transition-all duration-500 rounded-full', colors.bar)}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>

      {/* Interpretation badge */}
      {scoreResult.interpretation && (
        <div className={cn('inline-flex items-center px-3 py-1.5 rounded-lg border', colors.bg, colors.border)}>
          <span className={cn('text-sm font-semibold', colors.text)}>
            {getLocalizedText(scoreResult.interpretation.label)}
          </span>
        </div>
      )}

      {/* Description (optional) */}
      {showDetails && scoreDef?.description && (
        <p className="mt-3 text-sm text-gray-600">
          {getLocalizedText(scoreDef.description)}
        </p>
      )}
    </div>
  )
}

/**
 * Main component for displaying individual scores
 */
export function IndividualScoresDisplay({ scores, title, showDetails = false }: IndividualScoresDisplayProps) {
  if (!scores || scores.length === 0) {
    return null
  }

  // Sort scores by displayOrder if available
  const sortedScores = [...scores].sort((a, b) => {
    const orderA = a.scoreDefinition?.displayOrder ?? 0
    const orderB = b.scoreDefinition?.displayOrder ?? 0
    return orderA - orderB
  })

  return (
    <div className="space-y-4">
      {/* Title */}
      {title && (
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-500 rounded-full" />
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      )}

      {/* Score cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedScores.map((scoreResult) => (
          <IndividualScoreCard
            key={scoreResult.id}
            scoreResult={scoreResult}
            showDetails={showDetails}
          />
        ))}
      </div>

      {/* Info text */}
      <p className="text-xs text-gray-400 text-center">
        Ces scores sont calculés selon les barèmes officiels du questionnaire.
      </p>
    </div>
  )
}
