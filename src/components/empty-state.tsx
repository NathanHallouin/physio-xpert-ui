"use client"

import { type ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from './cn'

type EmptyStateVariant =
  | 'questionnaires'
  | 'questionnaires-completed'
  | 'exercises'
  | 'exercises-history'
  | 'generic'

const emptyStateActionVariants = cva(
  'inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-medium',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

/**
 * SVG illustrations for each variant
 */
const illustrations: Record<EmptyStateVariant, ReactNode> = {
  questionnaires: (
    <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="70" height="90" rx="6" fill="#E5E7EB" />
      <rect x="30" y="20" width="60" height="80" rx="4" fill="#F9FAFB" />
      <path d="M50 85h20" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 75h40" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="50" r="18" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
      <path d="M55 45c0-2.8 2.2-5 5-5s5 2.2 5 5c0 2-1.2 3.6-3 4.5V52a2 2 0 01-4 0v-3.5c0-.8.5-1.6 1.2-1.8.9-.4 1.8-1.3 1.8-2.7 0-1.7-1.3-3-3-3s-3 1.3-3 3" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="58" r="1.5" fill="#0EA5E9" />
    </svg>
  ),
  'questionnaires-completed': (
    <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="15" width="70" height="90" rx="6" fill="#E5E7EB" />
      <rect x="30" y="20" width="60" height="80" rx="4" fill="#F9FAFB" />
      <path d="M40 45h20" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 55h30" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 65h25" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 75h35" stroke="#D1D5DB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="85" cy="80" r="20" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <path d="M76 80l6 6 12-12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  exercises: (
    <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="30" r="12" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <path d="M60 45v25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 50l-15 15" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 50l15 15" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 70l-12 25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 70l12 25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <rect x="82" y="55" width="25" height="8" rx="2" fill="#E5E7EB" />
      <rect x="80" y="52" width="6" height="14" rx="2" fill="#9CA3AF" />
      <rect x="103" y="52" width="6" height="14" rx="2" fill="#9CA3AF" />
      <circle cx="25" cy="90" r="15" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <path d="M25 83v10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="25" cy="96" r="1.5" fill="#3B82F6" />
    </svg>
  ),
  'exercises-history': (
    <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="25" width="80" height="75" rx="6" fill="#E5E7EB" />
      <rect x="20" y="25" width="80" height="20" rx="6" fill="#8B5CF6" />
      <rect x="25" y="50" width="70" height="45" rx="3" fill="#F9FAFB" />
      <rect x="30" y="55" width="12" height="12" rx="2" fill="#DDD6FE" />
      <rect x="47" y="55" width="12" height="12" rx="2" fill="#DDD6FE" />
      <rect x="64" y="55" width="12" height="12" rx="2" fill="#DDD6FE" />
      <rect x="81" y="55" width="12" height="12" rx="2" fill="#DDD6FE" />
      <rect x="30" y="72" width="12" height="12" rx="2" fill="#E5E7EB" />
      <rect x="47" y="72" width="12" height="12" rx="2" fill="#E5E7EB" />
      <rect x="64" y="72" width="12" height="12" rx="2" fill="#E5E7EB" />
      <rect x="81" y="72" width="12" height="12" rx="2" fill="#E5E7EB" />
      <circle cx="95" cy="95" r="18" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
      <path d="M95 85v10l6 4" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  generic: (
    <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 25L20 45v35l40 20 40-20V45L60 25z" fill="#E5E7EB" />
      <path d="M60 25L20 45l40 20 40-20L60 25z" fill="#F9FAFB" />
      <path d="M60 65v35M20 45l40 20M100 45L60 65" stroke="#D1D5DB" strokeWidth="2" />
      <circle cx="60" cy="85" r="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <path d="M60 82v3M60 88h.01" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
}

export interface EmptyStateProps {
  /** Visual variant (determines the illustration) */
  variant?: EmptyStateVariant
  /** Main title */
  title: string
  /** Secondary description */
  description?: string
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  /** Additional CSS classes */
  className?: string
  /** Custom icon (replaces the default illustration) */
  icon?: ReactNode
}

/**
 * EmptyState - Reusable component for empty states with illustration, title,
 * description and optional action button.
 */
export function EmptyState({
  variant = 'generic',
  title,
  description,
  action,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4',
        className
      )}
      role="status"
      aria-label={title}
    >
      {/* Illustration or custom icon */}
      <div className="mb-4 sm:mb-6 opacity-80" aria-hidden="true">
        {icon || illustrations[variant]}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 max-w-sm mb-4 sm:mb-6">
          {description}
        </p>
      )}

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className={emptyStateActionVariants({ variant: action.variant ?? 'primary' })}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export { emptyStateActionVariants }
export type { EmptyStateVariant }
