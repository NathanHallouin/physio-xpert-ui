/**
 * CooldownBadge - Badge indiquant un exercice de retour au calme
 *
 * Affiche sur l'ecran d'exercice quand l'exercice actuel est
 * le "retour au calme" de fin de seance.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const cooldownBadgeVariants = cva('', {
  variants: {
    compact: {
      true: 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-900/80 text-indigo-300 text-xs font-medium',
      false: 'bg-indigo-900/50 border border-indigo-500/50 rounded-lg p-3',
    },
  },
  defaultVariants: {
    compact: false,
  },
})

export interface CooldownBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cooldownBadgeVariants> {}

export const CooldownBadge = forwardRef<HTMLDivElement, CooldownBadgeProps>(
  function CooldownBadge({ compact = false, className, ...props }, ref) {
    if (compact) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(cooldownBadgeVariants({ compact: true }), className)}
          {...(props as HTMLAttributes<HTMLSpanElement>)}
        >
          <span>{'\uD83E\uDDD8'}</span>
          Retour au calme
        </span>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(cooldownBadgeVariants({ compact: false }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{'\uD83E\uDDD8'}</span>
          <div>
            <span className="text-indigo-300 font-medium text-sm">Retour au calme</span>
            <p className="text-indigo-400/80 text-xs mt-0.5">
              Terminez votre seance en douceur pour une meilleure recuperation
            </p>
          </div>
        </div>
      </div>
    )
  }
)

export { cooldownBadgeVariants }
