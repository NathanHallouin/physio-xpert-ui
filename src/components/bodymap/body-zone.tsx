/**
 * BodyZone - Zone anatomique cliquable
 *
 * Zone interactive avec indication visuelle subtile.
 * S'illumine au survol et affiche la couleur d'intensité quand sélectionnée.
 */

import { memo, useCallback, useRef, useState } from 'react'
import { cn } from '../cn'
import { type PainIntensity, getPainColor } from '../tokens'
import { type BodyZoneDefinition } from './body-zones'
import { SVG_VIEWBOX } from './body-paths'

export interface BodyZoneProps {
  /** Définition de la zone */
  zone: BodyZoneDefinition
  /** Intensité de la douleur (null = non sélectionné) */
  intensity: PainIntensity | null
  /** Callback au clic */
  onClick: (zoneId: string) => void
  /** Callback au long press */
  onLongPress?: (zoneId: string) => void
  /** Zone désactivée */
  disabled?: boolean
  /** Afficher le label */
  showLabel?: boolean
}

export const BodyZone = memo(function BodyZone({
  zone,
  intensity,
  onClick,
  onLongPress,
  disabled = false,
  showLabel = false,
}: BodyZoneProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const longPressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Convertir la position en coordonnées SVG (viewBox 200x440)
  const cx = (zone.position.x / 100) * SVG_VIEWBOX.width
  const cy = (zone.position.y / 100) * SVG_VIEWBOX.height
  const rx = (zone.hitArea.width / 100) * SVG_VIEWBOX.width / 2
  const ry = (zone.hitArea.height / 100) * SVG_VIEWBOX.height / 2

  // Zone sélectionnée ?
  const isSelected = intensity !== null && intensity > 0

  const handleClick = useCallback(() => {
    if (!disabled) {
      onClick(zone.id)
    }
  }, [disabled, onClick, zone.id])

  const handlePointerDown = useCallback(() => {
    setIsPressed(true)
    if (onLongPress && !disabled) {
      longPressTimeout.current = setTimeout(() => {
        onLongPress(zone.id)
      }, 500)
    }
  }, [onLongPress, disabled, zone.id])

  const handlePointerUp = useCallback(() => {
    setIsPressed(false)
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current)
      longPressTimeout.current = null
    }
  }, [])

  // Couleurs selon l'état
  const getFillColor = () => {
    if (isSelected) return getPainColor(intensity)
    if (isPressed) return '#3b82f6'
    if (isHovered) return '#60a5fa'
    return 'transparent'
  }

  const getFillOpacity = () => {
    if (isSelected) return 0.6
    if (isPressed) return 0.3
    if (isHovered) return 0.15
    return 0
  }

  const getStrokeColor = () => {
    if (isSelected) return getPainColor(intensity)
    if (isPressed) return '#2563eb'
    if (isHovered) return '#3b82f6'
    return '#94a3b8'
  }

  const getStrokeOpacity = () => {
    if (isSelected) return 1
    if (isPressed || isHovered) return 0.8
    return 0.3
  }

  const getStrokeWidth = () => {
    if (isSelected) return 2
    if (isPressed) return 1.5
    if (isHovered) return 1
    return 0.5
  }

  return (
    <g
      role="button"
      aria-label={zone.label}
      aria-pressed={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        handlePointerUp()
        setIsHovered(false)
      }}
      onPointerEnter={() => setIsHovered(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      className={cn(
        'outline-none',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      )}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Zone cliquable avec bordure subtile visible */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={getFillColor()}
        fillOpacity={getFillOpacity()}
        stroke={getStrokeColor()}
        strokeWidth={getStrokeWidth()}
        strokeOpacity={getStrokeOpacity()}
        strokeDasharray={isSelected || isHovered || isPressed ? 'none' : '2,2'}
        className="transition-all duration-150"
      />

      {/* Point central pour les zones sélectionnées */}
      {isSelected && (
        <circle
          cx={cx}
          cy={cy}
          r={Math.min(rx, ry) * 0.4}
          fill={getPainColor(intensity)}
          stroke="white"
          strokeWidth="1.5"
          className="transition-all duration-150"
        />
      )}

      {/* Label optionnel */}
      {showLabel && (
        <text
          x={cx}
          y={cy + ry + 10}
          textAnchor="middle"
          fontSize="7"
          fill="#6b7280"
          className="pointer-events-none select-none"
        >
          {zone.shortLabel}
        </text>
      )}
    </g>
  )
})
