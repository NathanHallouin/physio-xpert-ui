/**
 * CooldownAlert - Alerte affichant les exercices mis en pause (cooldown)
 *
 * Un "cooldown" est une periode de repos forcee pour un exercice
 * quand il est mal tolere (statut ROUGE).
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { Shield, Circle, Info } from 'lucide-react'
import { cn } from '../cn'

export interface CooldownCreated {
  exerciseId: string
  cooldownDays: number
  reason?: string
}

export interface CooldownAlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Liste des cooldowns crees apres la seance */
  cooldowns: CooldownCreated[]
  /** Fonction pour recuperer le titre d'un exercice par son ID */
  getExerciseTitle?: (exerciseId: string) => string | undefined
  /** Mode compact : juste un badge avec le nombre de cooldowns */
  compact?: boolean
}

export const CooldownAlert = forwardRef<HTMLDivElement, CooldownAlertProps>(
  function CooldownAlert(
    { cooldowns, getExerciseTitle, compact = false, className, ...props },
    ref
  ) {
    if (!cooldowns || cooldowns.length === 0) {
      return null
    }

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2 p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg', className)}
          {...props}
        >
          <Shield className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-orange-300">
            {cooldowns.length} exercice{cooldowns.length > 1 ? 's' : ''} mis en pause
          </span>
        </div>
      )
    }

    const groupedByDuration = cooldowns.reduce(
      (acc, cooldown) => {
        const key = cooldown.cooldownDays
        if (!acc[key]) acc[key] = []
        acc[key].push(cooldown)
        return acc
      },
      {} as Record<number, CooldownCreated[]>
    )

    const getDurationLabel = (days: number): string => {
      if (days === 1) return '1 jour'
      if (days === 7) return '1 semaine'
      if (days === 14) return '2 semaines'
      return `${days} jours`
    }

    const getSeverityColor = (days: number) => {
      if (days >= 14) return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', iconColor: 'text-red-500', fillColor: 'fill-red-500' }
      if (days >= 7) return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', iconColor: 'text-orange-500', fillColor: 'fill-orange-500' }
      return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', iconColor: 'text-yellow-500', fillColor: 'fill-yellow-500' }
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)} {...props}>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-400" />
          <h3 className="text-sm font-semibold text-gray-200">
            Protection automatique activee
          </h3>
        </div>

        <p className="text-xs text-gray-400">
          Certains exercices ont ete signales comme douloureux ou difficiles.
          Ils seront temporairement retires de vos futures seances.
        </p>

        <div className="space-y-2">
          {Object.entries(groupedByDuration)
            .sort(([a], [b]) => Number(b) - Number(a))
            .map(([days, items]) => {
              const daysNum = Number(days)
              const colors = getSeverityColor(daysNum)

              return (
                <div
                  key={days}
                  className={cn('p-3 rounded-xl border', colors.bg, colors.border)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Circle className={cn('w-4 h-4', colors.iconColor, colors.fillColor)} />
                    <span className={cn('text-sm font-medium', colors.text)}>
                      Pause de {getDurationLabel(daysNum)}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {items.map((cooldown, index) => {
                      const title = getExerciseTitle?.(cooldown.exerciseId) || 'Exercice'

                      return (
                        <div
                          key={`${cooldown.exerciseId}-${index}`}
                          className="flex items-start gap-2"
                        >
                          <span className="text-gray-500 text-xs mt-0.5">-</span>
                          <div className="flex-1">
                            <span className="text-sm text-gray-200">{title}</span>
                            {cooldown.reason && (
                              <span className="text-xs text-gray-500 block">
                                {cooldown.reason}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>

        <div className="flex items-start gap-2 p-2 bg-gray-800/50 rounded-lg">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-400">
            Ces exercices reapparaitront automatiquement une fois la periode de repos terminee.
            Cette protection preserve votre progression et evite les surcharges.
          </p>
        </div>
      </div>
    )
  }
)
