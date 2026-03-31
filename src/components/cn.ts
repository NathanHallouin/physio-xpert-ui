import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine et déduplique les classes Tailwind CSS.
 * Utilise clsx pour la logique conditionnelle et tailwind-merge pour la déduplication.
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-primary-500', className)
 * cn('text-sm text-gray-500', hasError && 'text-red-500') // text-red-500 gagne
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
