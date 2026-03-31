/**
 * SessionMessages - Affiche les messages et alertes generes par l'algorithme
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import {
  Target,
  Clock,
  BarChart3,
  RefreshCw,
  Lightbulb,
  BookOpen,
  Info,
  AlertCircle,
  AlertTriangle,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../cn'

export interface SessionMessagesProps extends HTMLAttributes<HTMLDivElement> {
  /** Messages informatifs de l'algorithme */
  messages: string[]
  /** Alertes importantes a afficher en priorite */
  alerts: string[]
  /** N'afficher que les alertes, pas les messages */
  alertsOnly?: boolean
  /** Mode compact : juste un badge avec le nombre */
  compact?: boolean
  /** Callback pour fermer/masquer une alerte */
  onDismissAlert?: (index: number) => void
}

function classifyMessage(msg: string): { Icon: LucideIcon; color: string; bgColor: string } {
  const msgLower = msg.toLowerCase()

  if (msgLower.includes('progression') || msgLower.includes('bravo') || msgLower.includes('felicit')) {
    return { Icon: Target, color: 'text-green-400', bgColor: 'bg-green-500/10' }
  }
  if (msgLower.includes('duree') || msgLower.includes('minute') || msgLower.includes('temps')) {
    return { Icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-500/10' }
  }
  if (msgLower.includes('difficile') || msgLower.includes('facile') || msgLower.includes('intensite')) {
    return { Icon: BarChart3, color: 'text-purple-400', bgColor: 'bg-purple-500/10' }
  }
  if (msgLower.includes('limite') || msgLower.includes('remplace') || msgLower.includes('alternatif')) {
    return { Icon: RefreshCw, color: 'text-amber-400', bgColor: 'bg-amber-500/10' }
  }
  if (msgLower.includes('conseil') || msgLower.includes('attention') || msgLower.includes('important')) {
    return { Icon: Lightbulb, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' }
  }
  if (msgLower.includes('educati') || msgLower.includes('apprendre') || msgLower.includes('savoir')) {
    return { Icon: BookOpen, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' }
  }

  return { Icon: Info, color: 'text-gray-400', bgColor: 'bg-gray-500/10' }
}

function classifyAlert(alert: string): { Icon: LucideIcon; color: string; bgColor: string; borderColor: string } {
  const alertLower = alert.toLowerCase()

  if (alertLower.includes('danger') || alertLower.includes('stopper') || alertLower.includes('urgence') || alertLower.includes('douleur aigue')) {
    return { Icon: AlertCircle, color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' }
  }
  if (alertLower.includes('attention') || alertLower.includes('vigilance') || alertLower.includes('surveiller') || alertLower.includes('prudence')) {
    return { Icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' }
  }
  if (alertLower.includes('conseil') || alertLower.includes('recommand') || alertLower.includes('sugger')) {
    return { Icon: Lightbulb, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' }
  }

  return { Icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' }
}

export const SessionMessages = forwardRef<HTMLDivElement, SessionMessagesProps>(
  function SessionMessages(
    { messages, alerts, alertsOnly = false, compact = false, onDismissAlert, className, ...props },
    ref
  ) {
    const hasMessages = messages && messages.length > 0
    const hasAlerts = alerts && alerts.length > 0

    if (!hasMessages && !hasAlerts) {
      return null
    }

    if (compact) {
      return (
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {hasAlerts && (
            <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-sm text-orange-700">{alerts[0]}</span>
                {alerts.length > 1 && (
                  <span className="text-xs text-orange-500 block mt-1">
                    +{alerts.length - 1} autre{alerts.length > 2 ? 's' : ''} alerte{alerts.length > 2 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          )}

          {!alertsOnly && hasMessages && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span className="text-sm text-blue-700">
                {messages[0]}
                {messages.length > 1 && (
                  <span className="text-xs text-blue-500 block mt-1">
                    +{messages.length - 1} autre{messages.length > 2 ? 's' : ''} info{messages.length > 2 ? 's' : ''}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {hasAlerts && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Alertes</span>
            </h4>
            <div className="space-y-2">
              {alerts.map((alert, index) => {
                const style = classifyAlert(alert)
                return (
                  <div
                    key={index}
                    className={cn('relative flex items-start gap-3 p-3 rounded-xl border', style.bgColor, style.borderColor)}
                  >
                    <style.Icon className={cn('w-5 h-5 shrink-0', style.color)} />
                    <p className={cn('text-sm flex-1', style.color)}>{alert}</p>
                    {onDismissAlert && (
                      <button
                        onClick={() => onDismissAlert(index)}
                        className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                        aria-label="Fermer l'alerte"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!alertsOnly && hasMessages && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Informations</span>
            </h4>
            <div className="space-y-2">
              {messages.map((message, index) => {
                const style = classifyMessage(message)
                return (
                  <div
                    key={index}
                    className={cn('flex items-start gap-3 p-3 rounded-xl', style.bgColor)}
                  >
                    <style.Icon className={cn('w-5 h-5 shrink-0', style.color)} />
                    <p className={cn('text-sm', style.color)}>{message}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
)
