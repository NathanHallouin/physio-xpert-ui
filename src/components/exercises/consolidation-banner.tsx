/**
 * ConsolidationBanner - Banniere d'information pour reprise apres pause
 *
 * Affiche un message bienveillant au patient qui reprend ses exercices
 * apres une pause prolongee (> 3 jours).
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../cn'

export type ConsolidationLevel = 'light' | 'moderate' | 'heavy' | 'restart'

export interface ConsolidationInfo {
  isActive: boolean
  daysSinceLastSession: number
  reductionPercent: number
  level: ConsolidationLevel
}

export interface ConsolidationBannerProps extends HTMLAttributes<HTMLDivElement> {
  consolidationInfo: ConsolidationInfo
  /** Affichage compact (moins de texte) */
  compact?: boolean
}

const LEVEL_CONFIG: Record<ConsolidationLevel, {
  icon: string
  title: string
  description: string
  color: string
  textColor: string
  subTextColor: string
}> = {
  light: {
    icon: '\uD83C\uDF31',
    title: 'Reprise en douceur',
    description: 'Votre seance est legerement adaptee pour une reprise confortable.',
    color: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-800',
    subTextColor: 'text-amber-600',
  },
  moderate: {
    icon: '\uD83C\uDF3F',
    title: 'Reprise progressive',
    description: 'Apres quelques jours de pause, nous adaptons les exercices pour reprendre sereinement.',
    color: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-800',
    subTextColor: 'text-orange-600',
  },
  heavy: {
    icon: '\uD83C\uDF33',
    title: 'Reprise prudente',
    description: 'Une pause prolongee demande une reprise tres progressive. C\'est normal !',
    color: 'bg-orange-50 border-orange-300',
    textColor: 'text-orange-800',
    subTextColor: 'text-orange-600',
  },
  restart: {
    icon: '\uD83C\uDF3B',
    title: 'Nouveau depart',
    description: 'Pas d\'inquietude ! Nous repartons ensemble avec une seance tres legere.',
    color: 'bg-red-50 border-red-200',
    textColor: 'text-red-800',
    subTextColor: 'text-red-600',
  },
}

export const ConsolidationBanner = forwardRef<HTMLDivElement, ConsolidationBannerProps>(
  function ConsolidationBanner(
    { consolidationInfo, compact = false, className, ...props },
    ref
  ) {
    if (!consolidationInfo?.isActive) return null

    const config = LEVEL_CONFIG[consolidationInfo.level] || LEVEL_CONFIG.light
    const days = consolidationInfo.daysSinceLastSession
    const reduction = consolidationInfo.reductionPercent

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2 p-3 rounded-lg border', config.color, className)}
          {...props}
        >
          <span className="text-xl">{config.icon}</span>
          <div className="flex-1">
            <span className={cn('text-sm font-medium', config.textColor)}>
              {config.title}
            </span>
            <span className={cn('text-xs ml-2', config.subTextColor)}>
              ({days}j de pause - -{reduction}%)
            </span>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('p-4 rounded-xl border', config.color, className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl">{config.icon}</div>
          <div className="flex-1">
            <h3 className={cn('font-semibold', config.textColor)}>
              {config.title}
            </h3>
            <p className={cn('text-sm mt-1', config.subTextColor)}>
              {config.description}
            </p>
            <div className={cn('flex items-center gap-3 mt-2 text-xs', config.subTextColor)}>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {days} jour{days > 1 ? 's' : ''} depuis la derniere seance
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Volume reduit de {reduction}%
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export { LEVEL_CONFIG as CONSOLIDATION_LEVEL_CONFIG }
