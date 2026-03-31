/**
 * BodySilhouette - Composant SVG de la silhouette humaine
 *
 * Affiche une silhouette anatomique avec des formes séparées
 * pour une meilleure fiabilité du rendu.
 */

import { memo } from 'react'
import { cn } from '../cn'
import {
  SVG_VIEWBOX,
  BODY_COMPONENTS,
  DETAIL_PATHS_FRONT,
  DETAIL_PATHS_BACK,
} from './body-paths'
import { type BodyView } from './body-zones'

export interface BodySilhouetteProps {
  /** Vue actuelle (face ou dos) */
  view: BodyView
  /** Afficher les détails anatomiques */
  showDetails?: boolean
  /** Classes CSS additionnelles */
  className?: string
}

/**
 * Couleur de remplissage pour la silhouette
 */
const FILL_COLOR = '#e5e7eb'
const STROKE_COLOR = '#9ca3af'

export const BodySilhouette = memo(function BodySilhouette({
  view,
  showDetails = true,
  className,
}: BodySilhouetteProps) {
  const { head, neck, torso, leftArm, rightArm, leftHand, rightHand, leftLeg, rightLeg, leftFoot, rightFoot } = BODY_COMPONENTS

  return (
    <svg
      viewBox={SVG_VIEWBOX.viewBox}
      className={cn('w-full h-full', className)}
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>Silhouette du corps humain - vue de {view === 'front' ? 'face' : 'dos'}</title>

      {/* Groupe silhouette avec style commun */}
      <g fill={FILL_COLOR} stroke={STROKE_COLOR} strokeWidth="1.5" strokeLinejoin="round">
        {/* Tête */}
        <ellipse cx={head.cx} cy={head.cy} rx={head.rx} ry={head.ry} />

        {/* Cou */}
        <rect x={neck.x} y={neck.y} width={neck.width} height={neck.height} rx={neck.rx} />

        {/* Torse */}
        <path d={torso.d} />

        {/* Bras gauche */}
        <path d={leftArm.d} />

        {/* Bras droit */}
        <path d={rightArm.d} />

        {/* Main gauche */}
        <ellipse cx={leftHand.cx} cy={leftHand.cy} rx={leftHand.rx} ry={leftHand.ry} />

        {/* Main droite */}
        <ellipse cx={rightHand.cx} cy={rightHand.cy} rx={rightHand.rx} ry={rightHand.ry} />

        {/* Jambe gauche */}
        <path d={leftLeg.d} />

        {/* Jambe droite */}
        <path d={rightLeg.d} />

        {/* Pied gauche */}
        <ellipse cx={leftFoot.cx} cy={leftFoot.cy} rx={leftFoot.rx} ry={leftFoot.ry} />

        {/* Pied droit */}
        <ellipse cx={rightFoot.cx} cy={rightFoot.cy} rx={rightFoot.rx} ry={rightFoot.ry} />
      </g>

      {/* Détails anatomiques */}
      {showDetails && (
        <g stroke="#c4c8cd" strokeWidth="0.75" fill="none" opacity="0.6">
          {view === 'front' ? (
            <>
              <path d={DETAIL_PATHS_FRONT.centerLine} />
              <path d={DETAIL_PATHS_FRONT.clavicles} />
              <path d={DETAIL_PATHS_FRONT.leftPec} />
              <path d={DETAIL_PATHS_FRONT.rightPec} />
              <path d={DETAIL_PATHS_FRONT.abs} />
              <path d={DETAIL_PATHS_FRONT.navel} />
              <path d={DETAIL_PATHS_FRONT.leftKnee} />
              <path d={DETAIL_PATHS_FRONT.rightKnee} />
            </>
          ) : (
            <>
              <path d={DETAIL_PATHS_BACK.spine} strokeWidth="1" />
              <path d={DETAIL_PATHS_BACK.leftScapula} />
              <path d={DETAIL_PATHS_BACK.rightScapula} />
              <path d={DETAIL_PATHS_BACK.trapezius} />
              <path d={DETAIL_PATHS_BACK.leftGluteal} />
              <path d={DETAIL_PATHS_BACK.rightGluteal} />
              <path d={DETAIL_PATHS_BACK.leftCalf} />
              <path d={DETAIL_PATHS_BACK.rightCalf} />
            </>
          )}
        </g>
      )}
    </svg>
  )
})
