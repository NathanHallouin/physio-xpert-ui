/**
 * DailyProgressCard - Carte de progression quotidienne
 *
 * Combine en une seule carte :
 * - Message de motivation contextuel
 * - Objectif du jour avec barre de progression
 * - CTA pour demarrer/continuer une seance
 * - Streak et statistiques cles
 *
 * @component
 */

import { useState, type HTMLAttributes, forwardRef, type ReactNode } from 'react'
import {
  Play,
  Clock,
  Flame,
  Target,
  ChevronRight,
  Trophy,
  Sparkles,
  Settings,
  CheckCircle,
} from 'lucide-react'
import { cn } from '../cn'

export interface MotivationMessage {
  emoji: string
  message: string
}

export interface DailyProgressCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Disponibilite journaliere en minutes */
  dailyAvailabilityMinutes: number
  /** Minutes completees aujourd'hui */
  todayMinutesCompleted: number
  /** Minutes restantes aujourd'hui */
  todayMinutesRemaining: number
  /** Nombre de seances aujourd'hui */
  todaySessionsCount: number
  /** Objectif quotidien atteint */
  dailyQuotaReached: boolean
  /** Serie de jours consecutifs */
  currentStreak: number
  /** Le patient peut demarrer une seance */
  canStartSession: boolean
  /** Message de motivation */
  motivationMessage?: MotivationMessage | null
  /** Callback pour demarrer une seance */
  onStartSession?: () => void
  /** Callback pour fermer le message de motivation */
  onDismissMotivation?: () => void
  /** Callback pour ouvrir les reglages */
  onOpenSettings?: () => void
  /** Contenu supplementaire (ex: RestDaySuggestionModal) */
  children?: ReactNode
}

export const DailyProgressCard = forwardRef<HTMLDivElement, DailyProgressCardProps>(
  function DailyProgressCard(
    {
      dailyAvailabilityMinutes,
      todayMinutesCompleted,
      todayMinutesRemaining,
      todaySessionsCount,
      dailyQuotaReached,
      currentStreak,
      canStartSession,
      motivationMessage,
      onStartSession,
      onDismissMotivation,
      onOpenSettings,
      children,
      className,
      ...props
    },
    ref
  ) {
    const [showMotivation, setShowMotivation] = useState(true)

    const progressPercent = Math.min(100, (todayMinutesCompleted / dailyAvailabilityMinutes) * 100)

    const handleDismissMotivation = () => {
      setShowMotivation(false)
      onDismissMotivation?.()
    }

    const isCompleted = dailyQuotaReached

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border overflow-hidden',
          isCompleted
            ? 'bg-[#f0f7f4] border-[#bbdece]'
            : 'bg-white border-[#e8e6de]',
          className
        )}
        style={{ boxShadow: '0 1px 3px rgba(26,26,24,0.05), 0 1px 2px rgba(26,26,24,0.03)' }}
        {...props}
      >
        {/* Header */}
        <div className={cn(
          'px-5 py-4',
          isCompleted
            ? 'bg-[#2a7554]'
            : 'bg-[#3a9169]'
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dailyQuotaReached ? (
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              ) : todayMinutesCompleted > 0 ? (
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-base font-semibold text-white">
                  {dailyQuotaReached
                    ? 'Objectif atteint !'
                    : todayMinutesCompleted > 0
                      ? 'Continuez votre effort'
                      : 'Votre seance du jour'}
                </h2>
                <p className="text-sm text-white/75">
                  {dailyQuotaReached
                    ? 'Felicitations pour cette journee'
                    : todayMinutesCompleted > 0
                      ? `Encore ${todayMinutesRemaining} min pour l'objectif`
                      : 'Pret a commencer votre reeducation ?'}
                </p>
              </div>
            </div>

            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-sm font-semibold text-white">{currentStreak}j</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Motivation message */}
          {motivationMessage && showMotivation && !dailyQuotaReached && (
            <div className={cn(
              'flex items-start gap-3 p-3 rounded-xl border',
              isCompleted
                ? 'bg-[#dceee5]/50 border-[#bbdece]'
                : 'bg-[#f5f4ef] border-[#e8e6de]'
            )}>
              <div className="text-lg flex-shrink-0 mt-0.5">{motivationMessage.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#504d45]">
                  {motivationMessage.message}
                </p>
              </div>
              <button
                onClick={handleDismissMotivation}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors flex-shrink-0 text-[#9f9a8c]"
                aria-label="Fermer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#726d60]" />
                <span className="text-sm font-medium text-[#504d45]">Objectif du jour</span>
              </div>
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className="p-1.5 hover:bg-black/5 rounded-lg transition-colors text-[#9f9a8c]"
                  aria-label="Reglages"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="h-2 rounded-full overflow-hidden bg-[#e8e6de]">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  isCompleted ? 'bg-[#3a9169]' : 'bg-[#3a9169]'
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-[#726d60]">
                {todaySessionsCount > 0
                  ? `${todaySessionsCount} seance${todaySessionsCount > 1 ? 's' : ''} aujourd'hui`
                  : 'Aucune seance'}
              </span>
              <span className="text-sm font-bold text-[#504d45]">
                {todayMinutesCompleted}/{dailyAvailabilityMinutes} min
              </span>
            </div>
          </div>

          {/* CTA or success */}
          {dailyQuotaReached ? (
            <div className="flex items-center gap-3 p-4 bg-[#f0f7f4] rounded-xl border border-[#bbdece]">
              <div className="w-11 h-11 bg-[#3a9169] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1f4b38]">Bravo !</p>
                <p className="text-sm text-[#3a9169]">
                  {currentStreak > 1
                    ? `${currentStreak} jours consecutifs d'exercices`
                    : 'Vous avez atteint votre objectif'}
                </p>
              </div>
            </div>
          ) : canStartSession && onStartSession ? (
            <button
              onClick={onStartSession}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-[#3a9169] hover:bg-[#2a7554] text-white font-medium rounded-xl transition-colors group"
              style={{ boxShadow: '0 1px 3px rgba(26,26,24,0.1)' }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>
                {todayMinutesCompleted > 0 ? 'Continuer ma seance' : 'Faire mes exercices'}
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : null}
        </div>

        {children}
      </div>
    )
  }
)
