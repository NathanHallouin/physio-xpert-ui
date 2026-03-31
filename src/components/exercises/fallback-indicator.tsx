/**
 * FallbackIndicator - Indicateur du niveau de "fallback" de l'algorithme
 *
 * Le "fallback" permet a l'algorithme de TOUJOURS generer une seance,
 * meme si les criteres du patient sont tres restrictifs.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Sparkles, ThumbsUp, RefreshCw, Zap, Shield, type LucideIcon } from 'lucide-react'
import { cn } from '../cn'

export interface FilteringReport {
  initialCount: number
  finalCount: number
  afterRegionFilter?: number
  afterPhaseFilter?: number
  afterBdkFilter?: number
  afterAccessoryFilter?: number
  afterCooldownFilter?: number
  patientProfile?: {
    ageCategory: string
    sportLevel?: string
  }
}

export interface FallbackIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Rapport de filtrage retourne par l'Edge Function */
  filteringReport?: FilteringReport
  /** Mode compact : juste un badge colore */
  compact?: boolean
  /** Afficher les details techniques du filtrage */
  showDetails?: boolean
}

export type FallbackLevel = 'optimal' | 'niveau1' | 'niveau2' | 'niveau3' | 'niveau4'

function determineFallbackLevel(report: FilteringReport): FallbackLevel {
  if (report.finalCount <= 1 && report.initialCount > 10) {
    if (report.afterAccessoryFilter !== undefined && report.afterAccessoryFilter <= 2) {
      return 'niveau2'
    }
    if (report.afterPhaseFilter !== undefined && report.afterPhaseFilter <= 2) {
      return 'niveau3'
    }
    return 'niveau4'
  }

  const filterRatio = report.finalCount / report.initialCount
  if (filterRatio < 0.1) return 'niveau2'
  if (filterRatio < 0.25) return 'niveau1'

  return 'optimal'
}

const FALLBACK_LEVELS: Record<
  FallbackLevel,
  {
    label: string
    description: string
    Icon: LucideIcon
    color: string
    bgColor: string
    borderColor: string
    progressColor: string
    percentage: number
  }
> = {
  optimal: {
    label: 'Seance optimale',
    description: 'Tous les exercices correspondent a vos criteres',
    Icon: Sparkles,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    progressColor: 'bg-green-500',
    percentage: 100,
  },
  niveau1: {
    label: 'Seance adaptee',
    description: 'Quelques ajustements mineurs pour correspondre a vos accessoires',
    Icon: ThumbsUp,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    progressColor: 'bg-blue-500',
    percentage: 80,
  },
  niveau2: {
    label: 'Seance ajustee',
    description: 'Des exercices alternatifs ont ete selectionnes',
    Icon: RefreshCw,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    progressColor: 'bg-amber-500',
    percentage: 60,
  },
  niveau3: {
    label: 'Seance de secours',
    description: 'Pool limite - positions alternatives utilisees',
    Icon: Zap,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    progressColor: 'bg-orange-500',
    percentage: 40,
  },
  niveau4: {
    label: 'Seance minimale',
    description: 'Exercices generiques selectionnes pour garantir votre seance',
    Icon: Shield,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    progressColor: 'bg-red-500',
    percentage: 20,
  },
}

export const FallbackIndicator = forwardRef<HTMLDivElement, FallbackIndicatorProps>(
  function FallbackIndicator(
    { filteringReport, compact = false, showDetails = false, className, ...props },
    ref
  ) {
    const level = filteringReport ? determineFallbackLevel(filteringReport) : 'optimal'
    const config = FALLBACK_LEVELS[level]

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border',
            config.bgColor, config.color, config.borderColor,
            className
          )}
          {...props}
        >
          <config.Icon className="w-3.5 h-3.5" />
          <span className="font-medium">{config.label}</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('p-4 rounded-xl border', config.bgColor, config.borderColor, className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <config.Icon className={cn('w-5 h-5', config.color)} />
            <span className={cn('font-semibold', config.color)}>{config.label}</span>
          </div>
          <span className={cn('text-sm font-medium', config.color)}>{config.percentage}%</span>
        </div>

        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className={cn('h-full transition-all duration-500 ease-out', config.progressColor)}
            style={{ width: `${config.percentage}%` }}
          />
        </div>

        <p className="text-xs text-gray-400">{config.description}</p>

        {showDetails && filteringReport && (
          <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Details du filtrage
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Exercices initiaux:</span>
                <span className="text-gray-300">{filteringReport.initialCount}</span>
              </div>

              {filteringReport.afterRegionFilter !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Apres region:</span>
                  <span className="text-gray-300">{filteringReport.afterRegionFilter}</span>
                </div>
              )}

              {filteringReport.afterPhaseFilter !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Apres phase:</span>
                  <span className="text-gray-300">{filteringReport.afterPhaseFilter}</span>
                </div>
              )}

              {filteringReport.afterBdkFilter !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Apres BDK:</span>
                  <span className="text-gray-300">{filteringReport.afterBdkFilter}</span>
                </div>
              )}

              {filteringReport.afterAccessoryFilter !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Apres accessoires:</span>
                  <span className="text-gray-300">{filteringReport.afterAccessoryFilter}</span>
                </div>
              )}

              {filteringReport.afterCooldownFilter !== undefined && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Apres cooldowns:</span>
                  <span className="text-gray-300">{filteringReport.afterCooldownFilter}</span>
                </div>
              )}

              <div className="flex justify-between col-span-2 pt-1 border-t border-gray-700/30">
                <span className="text-gray-400 font-medium">Selectionnes:</span>
                <span className={cn('font-medium', config.color)}>{filteringReport.finalCount}</span>
              </div>
            </div>

            {filteringReport.patientProfile && (
              <div className="mt-2 pt-2 border-t border-gray-700/30">
                <span className="text-xs text-gray-500">
                  Profil: {filteringReport.patientProfile.ageCategory},{' '}
                  {filteringReport.patientProfile.sportLevel || 'N/A'}
                </span>
              </div>
            )}
          </div>
        )}

        {level !== 'optimal' && (
          <div className="mt-3 flex items-start gap-2 p-2 bg-gray-800/50 rounded-lg">
            <span className="text-blue-400 text-sm mt-0.5">{'💡'}</span>
            <p className="text-xs text-gray-400">
              {level === 'niveau1' && 'Votre seance est bien adaptee a vos besoins.'}
              {level === 'niveau2' && 'Ajoutez plus d\'accessoires pour debloquer plus d\'exercices.'}
              {level === 'niveau3' && 'Essayez d\'elargir les positions possibles pour plus de variete.'}
              {level === 'niveau4' && 'Parlez a votre praticien des limitations rencontrees.'}
            </p>
          </div>
        )}
      </div>
    )
  }
)

export { FALLBACK_LEVELS, determineFallbackLevel }
