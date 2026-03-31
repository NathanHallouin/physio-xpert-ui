/**
 * ZoneDetailSheet - Bottom sheet pour les détails d'une zone
 *
 * Affiche les détails complets d'une zone sélectionnée :
 * - Nom de la zone
 * - Sélecteur d'intensité
 * - Champ de notes
 * - Bouton de suppression
 */

import { useState, useCallback, useEffect } from 'react'
import { cn } from '../cn'
import { BottomSheet, BottomSheetActions } from '../bottom-sheet'
import { Button } from '../button'
import { type PainIntensity } from '../tokens'
import { IntensitySelector } from './intensity-selector'
import { type BodyZoneDefinition, type PainPoint, categoryLabels } from './body-zones'
import { Trash2 } from 'lucide-react'

export interface ZoneDetailSheetProps {
  /** État d'ouverture */
  open: boolean
  /** Callback de fermeture */
  onClose: () => void
  /** Définition de la zone */
  zone: BodyZoneDefinition
  /** Point de douleur existant (si sélectionné) */
  point: PainPoint | null
  /** Callback quand l'intensité change */
  onIntensityChange: (intensity: PainIntensity) => void
  /** Callback quand les notes changent */
  onNotesChange: (notes: string) => void
  /** Callback pour supprimer le point */
  onRemove: () => void
}

export function ZoneDetailSheet({
  open,
  onClose,
  zone,
  point,
  onIntensityChange,
  onNotesChange,
  onRemove,
}: ZoneDetailSheetProps) {
  // État local pour les notes (debounced)
  const [notes, setNotes] = useState(point?.notes ?? '')

  // Synchroniser les notes quand le point change
  useEffect(() => {
    setNotes(point?.notes ?? '')
  }, [point?.notes])

  // Debounce de la mise à jour des notes
  const handleNotesChange = useCallback(
    (value: string) => {
      setNotes(value)
      // Debounce la mise à jour vers le parent
      const timeout = setTimeout(() => {
        onNotesChange(value)
      }, 300)
      return () => clearTimeout(timeout)
    },
    [onNotesChange]
  )

  const handleRemove = useCallback(() => {
    onRemove()
    onClose()
  }, [onRemove, onClose])

  const handleSave = useCallback(() => {
    // S'assurer que les notes sont sauvegardées
    if (notes !== point?.notes) {
      onNotesChange(notes)
    }
    onClose()
  }, [notes, point?.notes, onNotesChange, onClose])

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={zone.label}
      description={categoryLabels[zone.category]}
      height="auto"
    >
      <div className="space-y-6">
        {/* Intensité de la douleur */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Intensité de la douleur
          </h3>
          <IntensitySelector
            value={point?.intensity ?? 1}
            onChange={onIntensityChange}
            size="md"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="zone-notes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Notes (optionnel)
          </label>
          <textarea
            id="zone-notes"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Décrivez la douleur (type, moment d'apparition, facteurs aggravants...)"
            rows={3}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
              'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
              'placeholder:text-gray-400 resize-none'
            )}
          />
        </div>

        {/* Informations sur la zone */}
        <div className="bg-gray-50 rounded-lg p-3">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Informations
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <span className="text-gray-500">Catégorie :</span>{' '}
              {categoryLabels[zone.category]}
            </li>
            <li>
              <span className="text-gray-500">Vue :</span>{' '}
              {zone.visibleOn.includes('front') && zone.visibleOn.includes('back')
                ? 'Face et dos'
                : zone.visibleOn.includes('front')
                  ? 'Face uniquement'
                  : 'Dos uniquement'}
            </li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <BottomSheetActions>
        {point && point.intensity > 0 && (
          <Button
            variant="outline"
            onClick={handleRemove}
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            Supprimer
          </Button>
        )}
        <Button variant="primary" onClick={handleSave} fullWidth>
          Enregistrer
        </Button>
      </BottomSheetActions>
    </BottomSheet>
  )
}
