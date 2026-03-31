/**
 * ScoreDisplay Component
 *
 * Displays computed scores from validated questionnaires (STarT Back, LEFS, KOOS, etc.)
 * with color-coded interpretations.
 */

import { cn } from '../cn'

/**
 * Interpretation color type
 */
export type InterpretationColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray'

/**
 * Computed score result
 */
export interface ComputedScore {
  key: string
  label: string
  rawValue: number
  normalizedValue?: number
  interpretation?: string
  color?: InterpretationColor
  description?: string
}

/**
 * Full scoring result
 */
export interface ScoringResult {
  mainScore: ComputedScore
  subScores: ComputedScore[]
  recommendations: string[]
  computedAt: string
}

export interface ScoreDisplayProps {
  result: ScoringResult
  title?: string
}

/**
 * Get background and text colors for interpretation
 */
function getInterpretationColors(color?: InterpretationColor): { bg: string; text: string; border: string } {
  switch (color) {
    case 'green':
      return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' }
    case 'yellow':
      return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' }
    case 'orange':
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    case 'red':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
    case 'blue':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
    case 'gray':
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
  }
}

/**
 * Single score card component
 */
function ScoreCard({ score, isMain }: { score: ComputedScore; isMain?: boolean }) {
  const colors = getInterpretationColors(score.color)

  return (
    <div className={cn('rounded-xl border', colors.border, colors.bg, isMain ? 'p-6' : 'p-4')}>
      {/* Label */}
      <div className={cn(
        'text-sm font-medium',
        isMain ? 'text-gray-600 mb-2' : 'text-gray-500 mb-1'
      )}>
        {score.label}
      </div>

      {/* Score value */}
      <div className="flex items-baseline gap-2">
        <span className={cn('font-bold', isMain ? 'text-4xl' : 'text-2xl', colors.text)}>
          {score.rawValue}
        </span>
        {score.normalizedValue !== undefined && (
          <span className="text-sm text-gray-500">
            ({score.normalizedValue.toFixed(0)}%)
          </span>
        )}
      </div>

      {/* Interpretation */}
      {score.interpretation && (
        <div className={cn('mt-2 px-3 py-1.5 rounded-lg border inline-block', colors.bg, colors.border)}>
          <span className={cn('text-sm font-semibold', colors.text)}>
            {score.interpretation}
          </span>
        </div>
      )}

      {/* Description */}
      {score.description && (
        <p className="mt-3 text-sm text-gray-600">
          {score.description}
        </p>
      )}
    </div>
  )
}

/**
 * Main score display component
 */
export function ScoreDisplay({ result, title }: ScoreDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Title */}
      {title && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
      )}

      {/* Main score */}
      <ScoreCard score={result.mainScore} isMain />

      {/* Sub-scores */}
      {result.subScores.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Sous-scores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.subScores.map((score) => (
              <ScoreCard key={score.key} score={score} />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wide mb-3">
            Recommandations
          </h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                <span className="text-blue-500 mt-0.5">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-center text-xs text-gray-400">
        Calculé le {new Date(result.computedAt).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  )
}
