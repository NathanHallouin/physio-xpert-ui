import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from './cn'

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

/**
 * Slot - Composant de composition polymorphique (pattern asChild).
 *
 * Fusionne ses props (className, style, event handlers) avec son enfant unique.
 * Utilisé en interne par les composants UI qui supportent `asChild`.
 *
 * @example
 * ```tsx
 * // Le Slot fusionne ses props avec le <a>
 * <Slot className="text-primary-500" onClick={handler}>
 *   <a href="/page">Lien</a>
 * </Slot>
 * // Résultat : <a href="/page" className="text-primary-500" onClick={handler}>Lien</a>
 * ```
 */
export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...props },
  ref
) {
  const child = Children.only(children)

  if (!isValidElement(child)) {
    return null
  }

  return cloneElement(child, {
    ...mergeProps(props, child.props as Record<string, unknown>),
    ref,
  } as Record<string, unknown>)
})

/**
 * Fusionne deux ensembles de props en combinant className et les event handlers.
 */
function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...childProps }

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key]
    const childValue = childProps[key]

    if (key === 'className') {
      merged[key] = cn(slotValue as string, childValue as string)
    } else if (key === 'style') {
      merged[key] = { ...(slotValue as object), ...(childValue as object) }
    } else if (key.startsWith('on') && typeof slotValue === 'function') {
      // Chaîner les event handlers
      if (typeof childValue === 'function') {
        merged[key] = (...args: unknown[]) => {
          ;(childValue as (...args: unknown[]) => void)(...args)
          ;(slotValue as (...args: unknown[]) => void)(...args)
        }
      } else {
        merged[key] = slotValue
      }
    } else if (!(key in childProps)) {
      merged[key] = slotValue
    }
  }

  return merged
}
