/**
 * ProgressionBadge - Badge affichant le message de progression
 *
 * Affiche sur l'ecran d'exercice pour informer le patient de sa progression.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { TrendingUp, RefreshCw, TrendingDown, Dumbbell, type LucideIcon } from 'lucide-react'
import { cn } from '../cn'

export interface ProgressionBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Message de progression a afficher */
  message: string
}

export const ProgressionBadge = forwardRef<HTMLDivElement, ProgressionBadgeProps>(
  function ProgressionBadge({ message, className, ...props }, ref) {
    const isProgression = message.startsWith('\u2191')
    const isConsolidation = message.toLowerCase().includes('reprise') || message.toLowerCase().includes('consolidation')
    const isRegression = message.startsWith('\u2193')

    const getStyles = (): { container: string; text: string; Icon: LucideIcon } => {
      if (isProgression) {
        return {
          container: 'bg-emerald-900/60 border-emerald-500/50',
          text: 'text-emerald-300',
          Icon: TrendingUp,
        }
      }
      if (isConsolidation) {
        return {
          container: 'bg-amber-900/60 border-amber-500/50',
          text: 'text-amber-300',
          Icon: RefreshCw,
        }
      }
      if (isRegression) {
        return {
          container: 'bg-orange-900/60 border-orange-500/50',
          text: 'text-orange-300',
          Icon: TrendingDown,
        }
      }
      return {
        container: 'bg-cyan-900/60 border-cyan-500/50',
        text: 'text-cyan-300',
        Icon: Dumbbell,
      }
    }

    const styles = getStyles()

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border', styles.container, className)}
        {...props}
      >
        <styles.Icon className={cn('w-4 h-4', styles.text)} />
        <span className={cn('text-xs font-medium', styles.text)}>
          {message}
        </span>
      </div>
    )
  }
)
