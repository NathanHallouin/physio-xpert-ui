/**
 * PhaseIndicator - Indicateur visuel de la phase de reeducation (1-4)
 *
 * Les 4 phases : Antalgique, Stabilisation, Consolidation, Prevention
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import { HeartPulse, Construction, Dumbbell, Shield, type LucideIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

const phaseIndicatorVariants = cva('flex flex-col gap-3', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    theme: {
      light: '',
      dark: '',
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'dark',
  },
})

export interface PhaseIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof phaseIndicatorVariants> {
  /** Phase actuelle du patient (1 = Antalgique, 2 = Stabilisation, 3 = Consolidation, 4 = Prevention) */
  currentPhase: number
  /** Afficher le nom de la phase */
  showLabel?: boolean
  /** Afficher la description de la phase */
  showDescription?: boolean
}

const PHASES: Array<{
  number: number
  name: string
  description: string
  color: string
  textColor: string
  textColorDark: string
  Icon: LucideIcon
}> = [
  {
    number: 1,
    name: 'Antalgique',
    description: 'Soulagement de la douleur',
    color: 'bg-primary-500',
    textColor: 'text-primary-500',
    textColorDark: 'text-primary-400',
    Icon: HeartPulse,
  },
  {
    number: 2,
    name: 'Stabilisation',
    description: 'Renforcement progressif',
    color: 'bg-cyan-500',
    textColor: 'text-cyan-500',
    textColorDark: 'text-cyan-400',
    Icon: Construction,
  },
  {
    number: 3,
    name: 'Consolidation',
    description: 'Optimisation des acquis',
    color: 'bg-teal-500',
    textColor: 'text-teal-600',
    textColorDark: 'text-teal-400',
    Icon: Dumbbell,
  },
  {
    number: 4,
    name: 'Prevention',
    description: 'Maintien a long terme',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    textColorDark: 'text-emerald-400',
    Icon: Shield,
  },
]

function getColorHex(colorClass: string): string {
  const colors: Record<string, string> = {
    'bg-primary-500': '#3b82f6',
    'bg-cyan-500': '#06b6d4',
    'bg-teal-500': '#14b8a6',
    'bg-emerald-500': '#10b981',
  }
  return colors[colorClass] || '#6b7280'
}

export const PhaseIndicator = forwardRef<HTMLDivElement, PhaseIndicatorProps>(
  function PhaseIndicator(
    {
      currentPhase,
      size = 'md',
      showLabel = true,
      showDescription = false,
      theme = 'dark',
      className,
      ...props
    },
    ref
  ) {
    const phase = PHASES.find((p) => p.number === currentPhase) || PHASES[0]
    const isLight = theme === 'light'

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }

    const dotSizes = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    }

    const connectorWidth = {
      sm: 'w-6',
      md: 'w-8',
      lg: 'w-10',
    }

    return (
      <div
        ref={ref}
        className={cn(phaseIndicatorVariants({ size, theme }), className)}
        {...props}
      >
        {/* Phase progress bar */}
        <div className="flex items-center">
          {PHASES.map((p, index) => (
            <div key={p.number} className="flex items-center">
              <div className="relative">
                <div
                  className={cn(
                    dotSizes[size || 'md'],
                    'rounded-full transition-all duration-500 ease-out',
                    p.number <= currentPhase ? p.color : isLight ? 'bg-gray-300' : 'bg-gray-600',
                    p.number === currentPhase && 'ring-2 ring-offset-2 ring-offset-white shadow-lg scale-110'
                  )}
                  style={{
                    ['--tw-ring-color' as string]: p.number === currentPhase ? getColorHex(p.color) : undefined,
                    boxShadow: p.number === currentPhase ? `0 0 12px ${getColorHex(p.color)}40` : undefined,
                  }}
                />
                {p.number < currentPhase && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {index < PHASES.length - 1 && (
                <div
                  className={cn(
                    connectorWidth[size || 'md'],
                    'h-1 mx-1 rounded-full transition-all duration-500',
                    p.number < currentPhase ? p.color : isLight ? 'bg-gray-200' : 'bg-gray-700'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {showLabel && (
          <div className={cn('flex items-center gap-2', sizeClasses[size || 'md'])}>
            <phase.Icon className={cn('w-5 h-5', isLight ? phase.textColor : phase.textColorDark)} />
            <span className={cn('font-semibold', isLight ? phase.textColor : phase.textColorDark)}>
              Phase {phase.number}: {phase.name}
            </span>
          </div>
        )}

        {showDescription && (
          <p className={cn('text-sm', isLight ? 'text-gray-600' : 'text-gray-400')}>
            {phase.description}
          </p>
        )}
      </div>
    )
  }
)

/**
 * PhaseCard - Carte detaillee affichant la phase actuelle
 */
export interface PhaseCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Phase actuelle du patient (1-4) */
  currentPhase: number
  /** Theme clair ou sombre */
  theme?: 'light' | 'dark'
}

export const PhaseCard = forwardRef<HTMLDivElement, PhaseCardProps>(
  function PhaseCard({ currentPhase, theme = 'dark', className, ...props }, ref) {
    const phase = PHASES.find((p) => p.number === currentPhase) || PHASES[0]
    const isLight = theme === 'light'

    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-xl border-2 transition-all',
          phase.color.replace('bg-', 'border-').replace('500', '500/50'),
          isLight ? phase.color.replace('500', '50') : phase.color.replace('500', '500/10'),
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center shadow-lg',
            phase.color
          )}>
            <phase.Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={cn('font-bold', isLight ? phase.textColor : phase.textColorDark)}>
              Phase {phase.number}
            </h3>
            <p className={cn('font-medium', isLight ? 'text-gray-900' : 'text-white')}>
              {phase.name}
            </p>
          </div>
        </div>

        <p className={cn('text-sm', isLight ? 'text-gray-600' : 'text-gray-400')}>
          {phase.description}
        </p>

        {currentPhase < 4 && (
          <div className={cn('mt-4 pt-4 border-t', isLight ? 'border-gray-200' : 'border-gray-700')}>
            <div className={cn('flex items-center justify-between text-xs', isLight ? 'text-gray-500' : 'text-gray-500')}>
              <span>Progression vers Phase {currentPhase + 1}</span>
              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>
                {'>='}70% Vert sur 2 seances
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)

export { phaseIndicatorVariants, PHASES }
