/**
 * VORBadge - Badge affichant le statut V/O/R (Vert/Orange/Rouge)
 *
 * Le systeme V/O/R est le coeur de la micro-gestion des exercices :
 * - VERT : Bien tolere, progression possible
 * - ORANGE : A la limite, maintien du niveau
 * - ROUGE : Mal tolere, cooldown ou regression
 *
 * @component
 */

import { memo, type HTMLAttributes, forwardRef } from 'react'
import { Circle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'

/** Couleur du statut V/O/R */
export type StatusColor = 'vert' | 'orange' | 'rouge'

const STATUS_CONFIG: Record<StatusColor, {
  label: string
  iconColor: string
  fillColor: string
  bgColor: string
  textColor: string
  borderColor: string
  description: string
}> = {
  vert: {
    label: 'Vert',
    iconColor: 'text-green-500',
    fillColor: 'fill-green-500',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-500',
    description: 'Excellent ! Continuez comme ca',
  },
  orange: {
    label: 'Orange',
    iconColor: 'text-orange-500',
    fillColor: 'fill-orange-500',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500',
    description: 'Attention, surveillez votre douleur',
  },
  rouge: {
    label: 'Rouge',
    iconColor: 'text-red-500',
    fillColor: 'fill-red-500',
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-400',
    borderColor: 'border-red-500',
    description: 'Arret conseille, consultez si persistant',
  },
}

const vorBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border',
  {
    variants: {
      status: {
        vert: 'bg-green-500/20 border-green-500',
        orange: 'bg-orange-500/20 border-orange-500',
        rouge: 'bg-red-500/20 border-red-500',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      status: 'vert',
      size: 'md',
    },
  }
)

const ICON_SIZE = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export interface VORBadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'status'>,
    VariantProps<typeof vorBadgeVariants> {
  /** Couleur du statut V/O/R */
  status: StatusColor
  /** Afficher le texte "Vert/Orange/Rouge" ? */
  showLabel?: boolean
  /** Animation de pulsation (utile pour ROUGE) ? */
  animated?: boolean
}

export const VORBadge = memo(
  forwardRef<HTMLDivElement, VORBadgeProps>(
    function VORBadge(
      { status, size = 'md', showLabel = true, animated = false, className, ...props },
      ref
    ) {
      const config = STATUS_CONFIG[status]

      return (
        <div
          ref={ref}
          className={cn(
            vorBadgeVariants({ status, size }),
            animated && status === 'rouge' && 'animate-pulse',
            className
          )}
          {...props}
        >
          <Circle className={cn(ICON_SIZE[size || 'md'], config.iconColor, config.fillColor)} />
          {showLabel && (
            <span className={cn('font-medium', config.textColor)}>
              {config.label}
            </span>
          )}
        </div>
      )
    }
  )
)

/**
 * VORStats - Affiche les statistiques V/O/R avec camembert
 */
export interface VORStatsProps extends HTMLAttributes<HTMLDivElement> {
  vert: number
  orange: number
  rouge: number
  showPieChart?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export const VORStats = memo(
  forwardRef<HTMLDivElement, VORStatsProps>(
    function VORStats(
      { vert, orange, rouge, showPieChart = true, size = 'md', className, ...props },
      ref
    ) {
      const total = vert + orange + rouge

      if (total === 0) {
        return (
          <div ref={ref} className={cn('text-gray-500 text-sm', className)} {...props}>
            Aucune evaluation
          </div>
        )
      }

      const vertPercent = Math.round((vert / total) * 100)
      const orangePercent = Math.round((orange / total) * 100)
      const rougePercent = Math.round((rouge / total) * 100)

      const vertAngle = (vert / total) * 360
      const orangeAngle = (orange / total) * 360

      const pieSize = size === 'sm' ? 48 : size === 'lg' ? 80 : 64

      const conicGradient = `conic-gradient(
        #22c55e 0deg ${vertAngle}deg,
        #f97316 ${vertAngle}deg ${vertAngle + orangeAngle}deg,
        #ef4444 ${vertAngle + orangeAngle}deg 360deg
      )`

      return (
        <div ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
          {showPieChart && (
            <div
              className="rounded-full flex-shrink-0"
              style={{
                width: pieSize,
                height: pieSize,
                background: conicGradient,
              }}
            >
              <div
                className="bg-white rounded-full flex items-center justify-center shadow-inner"
                style={{
                  width: pieSize - 16,
                  height: pieSize - 16,
                  margin: 8,
                }}
              >
                <span className="text-gray-900 font-bold text-xs">{total}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-green-400 fill-green-400" />
              <span className="text-white font-medium">{vert}</span>
              <span className="text-gray-500 text-sm">({vertPercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="text-white font-medium">{orange}</span>
              <span className="text-gray-500 text-sm">({orangePercent}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-4 h-4 text-red-400 fill-red-400" />
              <span className="text-white font-medium">{rouge}</span>
              <span className="text-gray-500 text-sm">({rougePercent}%)</span>
            </div>
          </div>
        </div>
      )
    }
  )
)

/**
 * VORProgressBar - Barre de progression V/O/R horizontale
 */
export interface VORProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  vert: number
  orange: number
  rouge: number
  height?: number
}

export const VORProgressBar = memo(
  forwardRef<HTMLDivElement, VORProgressBarProps>(
    function VORProgressBar(
      { vert, orange, rouge, height = 8, className, ...props },
      ref
    ) {
      const total = vert + orange + rouge

      if (total === 0) {
        return (
          <div
            ref={ref}
            className={cn('w-full bg-gray-700 rounded-full', className)}
            style={{ height }}
            {...props}
          />
        )
      }

      const vertWidth = (vert / total) * 100
      const orangeWidth = (orange / total) * 100
      const rougeWidth = (rouge / total) * 100

      return (
        <div
          ref={ref}
          className={cn('w-full flex rounded-full overflow-hidden', className)}
          style={{ height }}
          {...props}
        >
          {vertWidth > 0 && (
            <div
              className="bg-green-500 transition-all duration-500"
              style={{ width: `${vertWidth}%` }}
            />
          )}
          {orangeWidth > 0 && (
            <div
              className="bg-orange-500 transition-all duration-500"
              style={{ width: `${orangeWidth}%` }}
            />
          )}
          {rougeWidth > 0 && (
            <div
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${rougeWidth}%` }}
            />
          )}
        </div>
      )
    }
  )
)

export { vorBadgeVariants, STATUS_CONFIG }
