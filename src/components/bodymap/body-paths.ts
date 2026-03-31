/**
 * Body Paths - Silhouette SVG anatomique
 *
 * Approche simplifiée avec formes basiques pour une meilleure fiabilité.
 * ViewBox: 0 0 200 440
 */

export const SVG_VIEWBOX = {
  width: 200,
  height: 440,
  viewBox: '0 0 200 440',
}

/**
 * Composants de la silhouette - formes séparées pour fiabilité
 */
export const BODY_COMPONENTS = {
  // Tête - ellipse
  head: {
    type: 'ellipse' as const,
    cx: 100,
    cy: 42,
    rx: 28,
    ry: 32,
  },
  // Cou - rectangle arrondi
  neck: {
    type: 'rect' as const,
    x: 90,
    y: 70,
    width: 20,
    height: 18,
    rx: 4,
  },
  // Torse - path pour forme naturelle
  torso: {
    type: 'path' as const,
    d: `
      M 60 88
      Q 60 85 70 85
      L 130 85
      Q 140 85 140 88
      L 145 180
      Q 148 220 140 260
      L 130 265
      Q 100 270 70 265
      L 60 260
      Q 52 220 55 180
      Z
    `,
  },
  // Bras gauche
  leftArm: {
    type: 'path' as const,
    d: `
      M 60 90
      Q 45 95 35 120
      L 25 160
      Q 20 180 22 195
      L 30 195
      Q 35 180 38 165
      L 48 125
      Q 55 105 60 100
      Z
    `,
  },
  // Bras droit
  rightArm: {
    type: 'path' as const,
    d: `
      M 140 90
      Q 155 95 165 120
      L 175 160
      Q 180 180 178 195
      L 170 195
      Q 165 180 162 165
      L 152 125
      Q 145 105 140 100
      Z
    `,
  },
  // Main gauche
  leftHand: {
    type: 'ellipse' as const,
    cx: 26,
    cy: 205,
    rx: 8,
    ry: 12,
  },
  // Main droite
  rightHand: {
    type: 'ellipse' as const,
    cx: 174,
    cy: 205,
    rx: 8,
    ry: 12,
  },
  // Jambe gauche
  leftLeg: {
    type: 'path' as const,
    d: `
      M 70 265
      Q 65 270 62 290
      L 58 350
      Q 55 380 58 410
      L 68 410
      Q 72 380 74 350
      L 78 295
      Q 82 275 85 268
      L 70 265
      Z
    `,
  },
  // Jambe droite
  rightLeg: {
    type: 'path' as const,
    d: `
      M 130 265
      Q 135 270 138 290
      L 142 350
      Q 145 380 142 410
      L 132 410
      Q 128 380 126 350
      L 122 295
      Q 118 275 115 268
      L 130 265
      Z
    `,
  },
  // Pied gauche
  leftFoot: {
    type: 'ellipse' as const,
    cx: 63,
    cy: 422,
    rx: 12,
    ry: 8,
  },
  // Pied droit
  rightFoot: {
    type: 'ellipse' as const,
    cx: 137,
    cy: 422,
    rx: 12,
    ry: 8,
  },
}

/**
 * Legacy exports pour compatibilité
 */
export const BODY_FILLED_FRONT = ''
export const BODY_FILLED_BACK = ''
export const BODY_SILHOUETTE_FRONT = ''
export const BODY_SILHOUETTE_BACK = ''
export const BODY_PARTS = {}

/**
 * Détails anatomiques - Vue de face
 */
export const DETAIL_PATHS_FRONT = {
  centerLine: 'M100,90 L100,250',
  clavicles: 'M65,92 Q100,100 135,92',
  leftPec: 'M68,110 Q82,130 100,118',
  rightPec: 'M132,110 Q118,130 100,118',
  abs: `
    M92,145 L108,145
    M92,165 L108,165
    M92,185 L108,185
    M92,205 L108,205
  `,
  navel: 'M100,225 a3,3 0 1,0 0.1,0',
  leftKnee: 'M60,355 Q63,365 66,355',
  rightKnee: 'M134,355 Q137,365 140,355',
}

/**
 * Détails anatomiques - Vue de dos
 */
export const DETAIL_PATHS_BACK = {
  spine: 'M100,90 L100,255',
  leftScapula: 'M68,105 Q78,125 68,145 Q85,135 100,120',
  rightScapula: 'M132,105 Q122,125 132,145 Q115,135 100,120',
  trapezius: 'M65,92 Q100,105 135,92',
  leftGluteal: 'M75,268 Q85,290 100,280',
  rightGluteal: 'M125,268 Q115,290 100,280',
  leftCalf: 'M60,365 Q62,385 62,405',
  rightCalf: 'M140,365 Q138,385 138,405',
}
