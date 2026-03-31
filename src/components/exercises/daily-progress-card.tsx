/**
 * DailyProgressCard - Carte unifiee de progression quotidienne
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

    const getCardStyle = () => {
      if (dailyQuotaReached) {
        return {
          gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
          bgLight: 'from-emerald-50 to-teal-50',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          textLight: 'text-emerald-700',
          progressBg: 'bg-emerald-100',
          progressBar: 'from-emerald-400 to-teal-500',
        }
      }
      return {
        gradient: 'from-blue-500 via-blue-600 to-indigo-600',
        bgLight: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        textLight: 'text-blue-700',
        progressBg: 'bg-blue-100',
        progressBar: 'from-blue-400 to-indigo-500',
      }
    }

    const style = getCardStyle()

    return (
      <div
        ref={ref}
        className={cn(`bg-gradient-to-br ${style.bgLight} rounded-lg border ${style.border} overflow-hidden shadow-sm`, className)}
        {...props}
      >
        {/* Header avec gradient */}
        <div className={`bg-gradient-to-r ${style.gradient} px-5 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dailyQuotaReached ? (
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              ) : todayMinutesCompleted > 0 ? (
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold text-white">
                  {dailyQuotaReached
                    ? 'Objectif atteint !'
                    : todayMinutesCompleted > 0
                      ? 'Continuez votre effort !'
                      : 'Votre seance du jour'}
                </h2>
                <p className="text-sm text-white/80">
                  {dailyQuotaReached
                    ? 'Felicitations pour cette journee reussie'
                    : todayMinutesCompleted > 0
                      ? `Encore ${todayMinutesRemaining} min pour l'objectif`
                      : 'Pret a commencer votre reeducation ?'}
                </p>
              </div>
            </div>

            {currentStreak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
                <Flame className="w-4 h-4 text-orange-300" />
                <span className="text-sm font-semibold text-white">{currentStreak}j</span>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-5 space-y-4">
          {/* Message de motivation contextuel */}
          {motivationMessage && showMotivation && !dailyQuotaReached && (
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-white/80">
              <div className="text-xl flex-shrink-0">{motivationMessage.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-medium', style.text)}>
                  {motivationMessage.message}
                </p>
              </div>
              <button
                onClick={handleDismissMotivation}
                className={cn('p-1 hover:bg-white/50 rounded transition-colors flex-shrink-0', style.textLight)}
                aria-label="Fermer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Barre de progression */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className={cn('w-4 h-4', style.textLight)} />
                <span className={cn('text-sm font-medium', style.text)}>Objectif du jour</span>
              </div>
              {onOpenSettings && (
                <button
                  onClick={onOpenSettings}
                  className={cn('p-1.5 hover:bg-white/50 rounded-lg transition-colors', style.textLight)}
                  aria-label="Reglages"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className={cn('h-3 rounded-full overflow-hidden', style.progressBg)}>
              <div
                className={cn('h-full bg-gradient-to-r rounded-full transition-all duration-500', style.progressBar)}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className={cn('text-sm', style.textLight)}>
                {todaySessionsCount > 0
                  ? `${todaySessionsCount} seance${todaySessionsCount > 1 ? 's' : ''} aujourd'hui`
                  : 'Aucune seance'}
              </span>
              <span className={cn('text-sm font-bold', style.text)}>
                {todayMinutesCompleted}/{dailyAvailabilityMinutes} min
              </span>
            </div>
          </div>

          {/* CTA ou message de succes */}
          {dailyQuotaReached ? (
            <div className="flex items-center gap-3 p-4 bg-white/60 rounded-lg">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-emerald-800">Bravo !</p>
                <p className="text-sm text-emerald-600">
                  {currentStreak > 1
                    ? `${currentStreak} jours consecutifs d'exercices`
                    : 'Vous avez atteint votre objectif'}
                </p>
              </div>
            </div>
          ) : canStartSession && onStartSession ? (
            <button
              onClick={onStartSession}
              className={cn(
                'w-full flex items-center justify-center gap-3 px-5 py-4 bg-gradient-to-r hover:opacity-90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all group',
                style.gradient
              )}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>
                {todayMinutesCompleted > 0 ? 'Continuer ma seance' : 'Faire mes exercices'}
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : null}
        </div>

        {children}
      </div>
    )
  }
)
