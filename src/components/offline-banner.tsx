"use client"

import { useEffect, useState, forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from './cn'

const offlineBannerVariants = cva(
  'fixed top-0 left-0 right-0 text-white px-4 py-2 z-50 flex items-center justify-center gap-2 animate-slide-down',
  {
    variants: {
      status: {
        offline: 'bg-orange-500',
        reconnected: 'bg-emerald-500',
      },
    },
    defaultVariants: {
      status: 'offline',
    },
  }
)

export interface OfflineBannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof offlineBannerVariants> {
  /** Whether the device is currently offline */
  isOffline: boolean
  /** Whether the device was previously offline (triggers reconnected message) */
  wasOffline?: boolean
  /** Callback to reset the wasOffline state after showing reconnected message */
  onReconnectedDismiss?: () => void
  /** Duration in ms to show the reconnected message (default: 3000) */
  reconnectedDuration?: number
  /** Offline message text */
  offlineText?: string
  /** Reconnected message text */
  reconnectedText?: string
}

/**
 * OfflineBanner - Fixed banner shown when the device is offline.
 *
 * Prop-based API: the consumer provides `isOffline` and optionally `wasOffline`
 * instead of relying on an internal hook.
 *
 * @example
 * ```tsx
 * const { isOnline, wasOffline, resetWasOffline } = useOnlineStatus()
 * <OfflineBanner
 *   isOffline={!isOnline}
 *   wasOffline={wasOffline}
 *   onReconnectedDismiss={resetWasOffline}
 * />
 * ```
 */
export const OfflineBanner = forwardRef<HTMLDivElement, OfflineBannerProps>(
  function OfflineBanner(
    {
      isOffline,
      wasOffline = false,
      onReconnectedDismiss,
      reconnectedDuration = 3000,
      offlineText = 'Vous \u00eates hors ligne',
      reconnectedText = 'Connexion r\u00e9tablie',
      className,
      ...props
    },
    ref
  ) {
    const [showReconnected, setShowReconnected] = useState(false)

    // Show reconnected message temporarily
    useEffect(() => {
      if (wasOffline && !isOffline) {
        setShowReconnected(true)
        const timer = setTimeout(() => {
          setShowReconnected(false)
          onReconnectedDismiss?.()
        }, reconnectedDuration)
        return () => clearTimeout(timer)
      }
    }, [wasOffline, isOffline, onReconnectedDismiss, reconnectedDuration])

    // Offline banner
    if (isOffline) {
      return (
        <div
          ref={ref}
          className={cn(offlineBannerVariants({ status: 'offline' }), className)}
          role="alert"
          aria-live="assertive"
          {...props}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
          <span className="text-sm font-medium">
            {offlineText}
          </span>
        </div>
      )
    }

    // Reconnected message
    if (showReconnected) {
      return (
        <div
          ref={ref}
          className={cn(offlineBannerVariants({ status: 'reconnected' }), className)}
          role="status"
          aria-live="polite"
          {...props}
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
          <span className="text-sm font-medium">
            {reconnectedText}
          </span>
        </div>
      )
    }

    return null
  }
)

export { offlineBannerVariants }
