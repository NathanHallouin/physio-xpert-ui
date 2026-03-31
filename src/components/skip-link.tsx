"use client"

import { forwardRef, type AnchorHTMLAttributes } from 'react'
import { cn } from './cn'

export interface SkipLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** ID of the target element (without the #) */
  targetId?: string
  /** Link text */
  children?: React.ReactNode
}

/**
 * SkipLink - Keyboard navigation skip link (WCAG 2.1 level A, criterion 2.4.1).
 *
 * Visually hidden but becomes visible on focus, allowing keyboard and
 * screen reader users to skip directly to the main content.
 */
export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(
  function SkipLink(
    {
      targetId = 'main-content',
      children = 'Aller au contenu principal',
      className,
      ...props
    },
    ref
  ) {
    return (
      <a
        ref={ref}
        href={`#${targetId}`}
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-primary-600 focus:font-medium focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-primary-500 focus:outline-none',
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
