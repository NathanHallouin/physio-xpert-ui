/**
 * AnatomicalBodyMap - Cartographie anatomique interactive
 *
 * Composant principal pour la localisation précise de la douleur.
 * Permet de sélectionner des zones anatomiques et définir l'intensité.
 *
 * @example
 * ```tsx
 * const [painPoints, setPainPoints] = useState<PainPoint[]>([])
 *
 * <AnatomicalBodyMap
 *   value={painPoints}
 *   onChange={setPainPoints}
 *   mode="multiple"
 * />
 * ```
 */

import { useState, useCallback, useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../cn'
import { SegmentedControl } from '../segmented-control'
import { type PainIntensity } from '../tokens'
import { BodySilhouette } from './body-silhouette'
import { BodyZone } from './body-zone'
import { IntensitySelector } from './intensity-selector'
import { ZoneDetailSheet } from './zone-detail-sheet'
import {
  type BodyRegion,
  type BodyView,
  type PainPoint,
  bodyZones,
  getZonesForView,
} from './body-zones'
import { SVG_VIEWBOX } from './body-paths'

const bodyMapContainerVariants = cva('mx-auto', {
  variants: {
    size: {
      sm: 'max-w-[280px]',
      md: 'max-w-[340px]',
      lg: 'max-w-[400px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const bodyMapHeightVariants = cva(
  'relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-[350px]',
        md: 'h-[420px]',
        lg: 'h-[500px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AnatomicalBodyMapProps extends VariantProps<typeof bodyMapContainerVariants> {
  /** Points de douleur sélectionnés */
  value: PainPoint[]
  /** Callback quand les points changent */
  onChange: (points: PainPoint[]) => void
  /** Mode: sélection simple ou multiple */
  mode?: 'single' | 'multiple'
  /** Afficher les labels des zones */
  showLabels?: boolean
  /** Vue initiale */
  initialView?: BodyView
  /** Zones désactivées */
  disabledZones?: BodyRegion[]
  /** Classes CSS additionnelles */
  className?: string
}

export function AnatomicalBodyMap({
  value,
  onChange,
  mode = 'multiple',
  showLabels = false,
  initialView = 'front',
  disabledZones = [],
  size = 'md',
  className,
}: AnatomicalBodyMapProps) {
  // État local
  const [view, setView] = useState<BodyView>(initialView)
  const [selectedZone, setSelectedZone] = useState<BodyRegion | null>(null)
  const [showIntensitySelector, setShowIntensitySelector] = useState(false)
  const [showDetailSheet, setShowDetailSheet] = useState(false)

  // Zones visibles pour la vue actuelle
  const visibleZones = useMemo(() => getZonesForView(view), [view])

  // Map des intensités par zone
  const intensityMap = useMemo(() => {
    const map: Record<string, PainIntensity> = {}
    value.forEach((point) => {
      if (point.side === view) {
        map[point.zone] = point.intensity
      }
    })
    return map
  }, [value, view])

  // Obtenir l'intensité d'une zone
  const getZoneIntensity = useCallback(
    (zoneId: BodyRegion): PainIntensity | null => {
      return intensityMap[zoneId] ?? null
    },
    [intensityMap]
  )

  // Gérer le clic sur une zone
  const handleZoneClick = useCallback(
    (zoneId: string) => {
      const region = zoneId as BodyRegion
      setSelectedZone(region)
      setShowIntensitySelector(true)
    },
    []
  )

  // Gérer le long press sur une zone
  const handleZoneLongPress = useCallback((zoneId: string) => {
    const region = zoneId as BodyRegion
    setSelectedZone(region)
    setShowDetailSheet(true)
  }, [])

  // Mettre à jour l'intensité d'une zone
  const updateZoneIntensity = useCallback(
    (zoneId: BodyRegion, intensity: PainIntensity) => {
      // En mode single, on supprime les autres points
      let newPoints = mode === 'single' ? [] : [...value]

      // Supprimer le point existant pour cette zone/vue
      newPoints = newPoints.filter(
        (p) => !(p.zone === zoneId && p.side === view)
      )

      // Ajouter le nouveau point si intensité > 0
      if (intensity > 0) {
        newPoints.push({
          zone: zoneId,
          intensity,
          side: view,
        })
      }

      onChange(newPoints)
      setShowIntensitySelector(false)
    },
    [mode, value, view, onChange]
  )

  // Mettre à jour les notes d'une zone
  const updateZoneNotes = useCallback(
    (zoneId: BodyRegion, notes: string) => {
      const newPoints = value.map((p) =>
        p.zone === zoneId && p.side === view ? { ...p, notes } : p
      )
      onChange(newPoints)
    },
    [value, view, onChange]
  )

  // Supprimer un point
  const removePoint = useCallback(
    (zoneId: BodyRegion) => {
      const newPoints = value.filter(
        (p) => !(p.zone === zoneId && p.side === view)
      )
      onChange(newPoints)
      setShowDetailSheet(false)
    },
    [value, view, onChange]
  )

  // Obtenir les infos du point sélectionné
  const selectedPoint = useMemo(() => {
    if (!selectedZone) return null
    return value.find((p) => p.zone === selectedZone && p.side === view) ?? null
  }, [selectedZone, value, view])

  return (
    <div className={cn(bodyMapContainerVariants({ size }), className)}>
      {/* Toggle Vue Face/Dos */}
      <div className="mb-4">
        <SegmentedControl
          value={view}
          onChange={setView}
          options={[
            { value: 'front', label: 'Face' },
            { value: 'back', label: 'Dos' },
          ]}
          fullWidth
          aria-label="Vue du corps"
        />
      </div>

      {/* Carte du corps */}
      <div className={bodyMapHeightVariants({ size })}>
        {/* Silhouette SVG */}
        <svg
          viewBox={SVG_VIEWBOX.viewBox}
          className="w-full h-full"
          role="img"
          aria-label={`Corps humain vue de ${view === 'front' ? 'face' : 'dos'}`}
        >
          {/* Silhouette de fond */}
          <g className="pointer-events-none">
            <BodySilhouette view={view} />
          </g>

          {/* Zones cliquables */}
          {visibleZones.map((zone) => (
            <BodyZone
              key={zone.id}
              zone={zone}
              intensity={getZoneIntensity(zone.id)}
              onClick={handleZoneClick}
              onLongPress={handleZoneLongPress}
              disabled={disabledZones.includes(zone.id)}
              showLabel={showLabels}
            />
          ))}
        </svg>

        {/* Indicateur de nombre de zones sélectionnées */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            {value.filter((p) => p.side === view).length} zone
            {value.filter((p) => p.side === view).length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Sélecteur d'intensité (inline, sous la carte) */}
      {showIntensitySelector && selectedZone && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-900">
              {bodyZones[selectedZone].label}
            </span>
            <button
              type="button"
              onClick={() => {
                setShowIntensitySelector(false)
                setSelectedZone(null)
              }}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <IntensitySelector
            value={selectedPoint?.intensity ?? 1}
            onChange={(intensity) => updateZoneIntensity(selectedZone, intensity)}
            size="md"
          />
        </div>
      )}

      {/* Zone Detail Sheet */}
      {selectedZone && (
        <ZoneDetailSheet
          open={showDetailSheet}
          onClose={() => {
            setShowDetailSheet(false)
            setSelectedZone(null)
          }}
          zone={bodyZones[selectedZone]}
          point={selectedPoint}
          onIntensityChange={(intensity) =>
            updateZoneIntensity(selectedZone, intensity)
          }
          onNotesChange={(notes) => updateZoneNotes(selectedZone, notes)}
          onRemove={() => removePoint(selectedZone)}
        />
      )}
    </div>
  )
}

/**
 * Export du type PainPoint pour usage externe
 */
export type { PainPoint, BodyRegion, BodyView }
