/**
 * DailyMotivationBanner - Contextual daily motivation banner
 *
 * Displays encouraging messages based on time of day, daily goal progress,
 * streak milestones, and end-of-day reminders.
 *
 * @example
 * ```tsx
 * <DailyMotivationBanner
 *   message={motivationMessage}
 *   onDismiss={() => markDayAsOpened()}
 *   onAction={() => navigate(message.actionPath)}
 * />
 * ```
 */

import { useState, useEffect, type ReactNode } from 'react'
import { X, ChevronRight, Sparkles, Trophy, Clock, Target, PartyPopper } from 'lucide-react'
import { cn } from '../cn'

/** Motivation message type identifier */
export type MotivationType =
  | 'first_opening'
  | 'returning'
  | 'streak_milestone'
  | 'quota_reminder'
  | 'almost_done'
  | 'comeback'
  | 'evening_reminder'
  | 'congratulations'

/** Visual variant for the banner */
export type MotivationVariant = 'info' | 'success' | 'warning' | 'celebration'

/** Motivation message data */
export interface MotivationMessage {
  type: MotivationType
  variant: MotivationVariant
  title: string
  message: string
  actionLabel?: string
  actionPath?: string
}

export interface DailyMotivationBannerProps {
  /** The motivation message to display */
  message: MotivationMessage
  /** Callback when the banner is dismissed */
  onDismiss: () => void
  /** Callback when the action button is clicked */
  onAction?: () => void
  /** Additional CSS classes */
  className?: string
}

// Visual variant configuration
const VARIANT_STYLES = {
  info: {
    container: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-900',
    message: 'text-blue-700',
    button: 'bg-blue-500 hover:bg-blue-600 text-white',
    dismiss: 'text-blue-400 hover:text-blue-600 hover:bg-blue-100',
  },
  success: {
    container: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200',
    icon: 'bg-emerald-100 text-emerald-600',
    title: 'text-emerald-900',
    message: 'text-emerald-700',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    dismiss: 'text-emerald-400 hover:text-emerald-600 hover:bg-emerald-100',
  },
  warning: {
    container: 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200',
    icon: 'bg-amber-100 text-amber-600',
    title: 'text-amber-900',
    message: 'text-amber-700',
    button: 'bg-amber-500 hover:bg-amber-600 text-white',
    dismiss: 'text-amber-400 hover:text-amber-600 hover:bg-amber-100',
  },
  celebration: {
    container: 'bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    title: 'text-purple-900',
    message: 'text-purple-700',
    button: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
    dismiss: 'text-purple-400 hover:text-purple-600 hover:bg-purple-100',
  },
}

// Icons per message type
const TYPE_ICONS: Record<MotivationType, ReactNode> = {
  first_opening: <Sparkles className="w-5 h-5" />,
  returning: <Target className="w-5 h-5" />,
  streak_milestone: <Trophy className="w-5 h-5" />,
  quota_reminder: <Clock className="w-5 h-5" />,
  almost_done: <Target className="w-5 h-5" />,
  comeback: <Sparkles className="w-5 h-5" />,
  evening_reminder: <Clock className="w-5 h-5" />,
  congratulations: <PartyPopper className="w-5 h-5" />,
}

export function DailyMotivationBanner({
  message,
  onDismiss,
  onAction,
  className,
}: DailyMotivationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimating, setIsAnimating] = useState(true)

  const styles = VARIANT_STYLES[message.variant]
  const icon = TYPE_ICONS[message.type]

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(), 200)
  }

  const handleAction = () => {
    onAction?.()
    handleDismiss()
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out',
        styles.container,
        isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Decorative effect for celebration variant */}
      {message.variant === 'celebration' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-200/30 rounded-full blur-2xl" />
        </div>
      )}

      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn('flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center', styles.icon)}>
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className={cn('font-semibold text-sm', styles.title)}>
                  {message.title}
                </h3>
                <p className={cn('text-sm mt-0.5', styles.message)}>
                  {message.message}
                </p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className={cn('flex-shrink-0 p-1 rounded-lg transition-colors', styles.dismiss)}
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action button */}
            {message.actionLabel && onAction && (
              <button
                onClick={handleAction}
                className={cn(
                  'mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  styles.button
                )}
              >
                {message.actionLabel}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
