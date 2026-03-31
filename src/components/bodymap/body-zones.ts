/**
 * Body Zones - Définitions des zones anatomiques
 *
 * 48+ zones anatomiques pour une localisation précise de la douleur.
 * Chaque zone est définie avec ses métadonnées et sa position relative.
 */

import type { PainIntensity } from '../tokens'

/**
 * Identifiants des régions anatomiques
 */
export type BodyRegion =
  // Tête et cou
  | 'head'
  | 'neck_front'
  | 'neck_back'
  // Épaules
  | 'shoulder_left'
  | 'shoulder_right'
  // Bras
  | 'upper_arm_left_front'
  | 'upper_arm_left_back'
  | 'upper_arm_right_front'
  | 'upper_arm_right_back'
  | 'elbow_left'
  | 'elbow_right'
  | 'forearm_left_front'
  | 'forearm_left_back'
  | 'forearm_right_front'
  | 'forearm_right_back'
  | 'wrist_left'
  | 'wrist_right'
  | 'hand_left'
  | 'hand_right'
  // Tronc - Face
  | 'chest_left'
  | 'chest_right'
  | 'abdomen_upper'
  | 'abdomen_lower'
  // Tronc - Dos
  | 'upper_back_left'
  | 'upper_back_right'
  | 'mid_back_left'
  | 'mid_back_right'
  | 'lower_back_left'
  | 'lower_back_right'
  // Colonne vertébrale (détaillée)
  | 'cervical'
  | 'thoracic_upper'
  | 'thoracic_mid'
  | 'thoracic_lower'
  | 'lumbar_upper'
  | 'lumbar_lower'
  | 'sacrum'
  // Hanches et fessiers
  | 'hip_left_front'
  | 'hip_right_front'
  | 'gluteal_left'
  | 'gluteal_right'
  // Cuisses
  | 'thigh_left_front'
  | 'thigh_left_back'
  | 'thigh_left_inner'
  | 'thigh_left_outer'
  | 'thigh_right_front'
  | 'thigh_right_back'
  | 'thigh_right_inner'
  | 'thigh_right_outer'
  // Genoux
  | 'knee_left_front'
  | 'knee_left_back'
  | 'knee_right_front'
  | 'knee_right_back'
  // Jambes
  | 'shin_left'
  | 'shin_right'
  | 'calf_left'
  | 'calf_right'
  // Chevilles et pieds
  | 'ankle_left'
  | 'ankle_right'
  | 'foot_left_top'
  | 'foot_left_sole'
  | 'foot_right_top'
  | 'foot_right_sole'

/**
 * Vue du corps (face ou dos)
 */
export type BodyView = 'front' | 'back'

/**
 * Point de douleur sélectionné
 */
export interface PainPoint {
  /** Zone anatomique */
  zone: BodyRegion
  /** Intensité de la douleur (0-4) */
  intensity: PainIntensity
  /** Vue (face ou dos) */
  side: BodyView
  /** Notes optionnelles du patient */
  notes?: string
}

/**
 * Catégorie de zone corporelle
 */
export type ZoneCategory =
  | 'head_neck'
  | 'upper_limb'
  | 'trunk'
  | 'spine'
  | 'lower_limb'
  | 'foot'

/**
 * Définition d'une zone anatomique
 */
export interface BodyZoneDefinition {
  /** Identifiant unique */
  id: BodyRegion
  /** Label en français */
  label: string
  /** Label court pour l'affichage compact */
  shortLabel: string
  /** Catégorie */
  category: ZoneCategory
  /** Vue(s) où la zone est visible */
  visibleOn: BodyView[]
  /** Position relative (% du SVG viewBox) */
  position: {
    x: number
    y: number
  }
  /** Taille de la zone cliquable */
  hitArea: {
    width: number
    height: number
  }
}

/**
 * Définitions complètes des zones anatomiques
 *
 * Positions calibrées pour la nouvelle silhouette (viewBox 200x440):
 * - Tête: y=42 center (10%)
 * - Cou: y=70-88 (16-20%)
 * - Épaules: y=90 (20%)
 * - Bras: y=90-195 (20-44%)
 * - Mains: y=205 (47%)
 * - Torse: y=85-265 (19-60%)
 * - Hanches: y=260-270 (59-61%)
 * - Cuisses: y=270-350 (61-80%)
 * - Genoux: y=350-365 (80-83%)
 * - Jambes: y=365-410 (83-93%)
 * - Pieds: y=422 (96%)
 */
export const bodyZones: Record<BodyRegion, BodyZoneDefinition> = {
  // === TÊTE ET COU ===
  head: {
    id: 'head',
    label: 'Tête',
    shortLabel: 'Tête',
    category: 'head_neck',
    visibleOn: ['front', 'back'],
    position: { x: 50, y: 10 },
    hitArea: { width: 16, height: 10 },
  },
  neck_front: {
    id: 'neck_front',
    label: 'Cou (avant)',
    shortLabel: 'Cou',
    category: 'head_neck',
    visibleOn: ['front'],
    position: { x: 50, y: 18 },
    hitArea: { width: 7, height: 3 },
  },
  neck_back: {
    id: 'neck_back',
    label: 'Nuque',
    shortLabel: 'Nuque',
    category: 'head_neck',
    visibleOn: ['back'],
    position: { x: 50, y: 18 },
    hitArea: { width: 7, height: 3 },
  },

  // === ÉPAULES ===
  shoulder_left: {
    id: 'shoulder_left',
    label: 'Épaule gauche',
    shortLabel: 'Ép. G',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 27, y: 21 },
    hitArea: { width: 10, height: 5 },
  },
  shoulder_right: {
    id: 'shoulder_right',
    label: 'Épaule droite',
    shortLabel: 'Ép. D',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 73, y: 21 },
    hitArea: { width: 10, height: 5 },
  },

  // === BRAS SUPÉRIEURS ===
  upper_arm_left_front: {
    id: 'upper_arm_left_front',
    label: 'Bras gauche (avant)',
    shortLabel: 'Bras G',
    category: 'upper_limb',
    visibleOn: ['front'],
    position: { x: 20, y: 28 },
    hitArea: { width: 7, height: 8 },
  },
  upper_arm_left_back: {
    id: 'upper_arm_left_back',
    label: 'Bras gauche (arrière)',
    shortLabel: 'Bras G',
    category: 'upper_limb',
    visibleOn: ['back'],
    position: { x: 20, y: 28 },
    hitArea: { width: 7, height: 8 },
  },
  upper_arm_right_front: {
    id: 'upper_arm_right_front',
    label: 'Bras droit (avant)',
    shortLabel: 'Bras D',
    category: 'upper_limb',
    visibleOn: ['front'],
    position: { x: 80, y: 28 },
    hitArea: { width: 7, height: 8 },
  },
  upper_arm_right_back: {
    id: 'upper_arm_right_back',
    label: 'Bras droit (arrière)',
    shortLabel: 'Bras D',
    category: 'upper_limb',
    visibleOn: ['back'],
    position: { x: 80, y: 28 },
    hitArea: { width: 7, height: 8 },
  },

  // === COUDES ===
  elbow_left: {
    id: 'elbow_left',
    label: 'Coude gauche',
    shortLabel: 'Coude G',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 15, y: 37 },
    hitArea: { width: 5, height: 4 },
  },
  elbow_right: {
    id: 'elbow_right',
    label: 'Coude droit',
    shortLabel: 'Coude D',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 85, y: 37 },
    hitArea: { width: 5, height: 4 },
  },

  // === AVANT-BRAS ===
  forearm_left_front: {
    id: 'forearm_left_front',
    label: 'Avant-bras gauche (avant)',
    shortLabel: 'Av-bras G',
    category: 'upper_limb',
    visibleOn: ['front'],
    position: { x: 14, y: 42 },
    hitArea: { width: 5, height: 5 },
  },
  forearm_left_back: {
    id: 'forearm_left_back',
    label: 'Avant-bras gauche (arrière)',
    shortLabel: 'Av-bras G',
    category: 'upper_limb',
    visibleOn: ['back'],
    position: { x: 14, y: 42 },
    hitArea: { width: 5, height: 5 },
  },
  forearm_right_front: {
    id: 'forearm_right_front',
    label: 'Avant-bras droit (avant)',
    shortLabel: 'Av-bras D',
    category: 'upper_limb',
    visibleOn: ['front'],
    position: { x: 86, y: 42 },
    hitArea: { width: 5, height: 5 },
  },
  forearm_right_back: {
    id: 'forearm_right_back',
    label: 'Avant-bras droit (arrière)',
    shortLabel: 'Av-bras D',
    category: 'upper_limb',
    visibleOn: ['back'],
    position: { x: 86, y: 42 },
    hitArea: { width: 5, height: 5 },
  },

  // === POIGNETS ===
  wrist_left: {
    id: 'wrist_left',
    label: 'Poignet gauche',
    shortLabel: 'Poig. G',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 13, y: 44 },
    hitArea: { width: 4, height: 2 },
  },
  wrist_right: {
    id: 'wrist_right',
    label: 'Poignet droit',
    shortLabel: 'Poig. D',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 87, y: 44 },
    hitArea: { width: 4, height: 2 },
  },

  // === MAINS ===
  hand_left: {
    id: 'hand_left',
    label: 'Main gauche',
    shortLabel: 'Main G',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 13, y: 47 },
    hitArea: { width: 5, height: 4 },
  },
  hand_right: {
    id: 'hand_right',
    label: 'Main droite',
    shortLabel: 'Main D',
    category: 'upper_limb',
    visibleOn: ['front', 'back'],
    position: { x: 87, y: 47 },
    hitArea: { width: 5, height: 4 },
  },

  // === TRONC - FACE ===
  chest_left: {
    id: 'chest_left',
    label: 'Poitrine gauche',
    shortLabel: 'Poit. G',
    category: 'trunk',
    visibleOn: ['front'],
    position: { x: 38, y: 26 },
    hitArea: { width: 12, height: 8 },
  },
  chest_right: {
    id: 'chest_right',
    label: 'Poitrine droite',
    shortLabel: 'Poit. D',
    category: 'trunk',
    visibleOn: ['front'],
    position: { x: 62, y: 26 },
    hitArea: { width: 12, height: 8 },
  },
  abdomen_upper: {
    id: 'abdomen_upper',
    label: 'Abdomen supérieur',
    shortLabel: 'Abd. sup',
    category: 'trunk',
    visibleOn: ['front'],
    position: { x: 50, y: 38 },
    hitArea: { width: 20, height: 8 },
  },
  abdomen_lower: {
    id: 'abdomen_lower',
    label: 'Abdomen inférieur',
    shortLabel: 'Abd. inf',
    category: 'trunk',
    visibleOn: ['front'],
    position: { x: 50, y: 50 },
    hitArea: { width: 20, height: 8 },
  },

  // === TRONC - DOS ===
  upper_back_left: {
    id: 'upper_back_left',
    label: 'Haut du dos gauche',
    shortLabel: 'Dos sup G',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 38, y: 26 },
    hitArea: { width: 12, height: 8 },
  },
  upper_back_right: {
    id: 'upper_back_right',
    label: 'Haut du dos droit',
    shortLabel: 'Dos sup D',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 62, y: 26 },
    hitArea: { width: 12, height: 8 },
  },
  mid_back_left: {
    id: 'mid_back_left',
    label: 'Milieu du dos gauche',
    shortLabel: 'Dos mid G',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 38, y: 38 },
    hitArea: { width: 12, height: 8 },
  },
  mid_back_right: {
    id: 'mid_back_right',
    label: 'Milieu du dos droit',
    shortLabel: 'Dos mid D',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 62, y: 38 },
    hitArea: { width: 12, height: 8 },
  },
  lower_back_left: {
    id: 'lower_back_left',
    label: 'Bas du dos gauche',
    shortLabel: 'Dos inf G',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 38, y: 50 },
    hitArea: { width: 12, height: 8 },
  },
  lower_back_right: {
    id: 'lower_back_right',
    label: 'Bas du dos droit',
    shortLabel: 'Dos inf D',
    category: 'trunk',
    visibleOn: ['back'],
    position: { x: 62, y: 50 },
    hitArea: { width: 12, height: 8 },
  },

  // === COLONNE VERTÉBRALE ===
  cervical: {
    id: 'cervical',
    label: 'Cervicales (C1-C7)',
    shortLabel: 'Cervical',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 18 },
    hitArea: { width: 4, height: 4 },
  },
  thoracic_upper: {
    id: 'thoracic_upper',
    label: 'Thoraciques hautes (T1-T4)',
    shortLabel: 'Thor. sup',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 24 },
    hitArea: { width: 4, height: 4 },
  },
  thoracic_mid: {
    id: 'thoracic_mid',
    label: 'Thoraciques moyennes (T5-T8)',
    shortLabel: 'Thor. mid',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 32 },
    hitArea: { width: 4, height: 4 },
  },
  thoracic_lower: {
    id: 'thoracic_lower',
    label: 'Thoraciques basses (T9-T12)',
    shortLabel: 'Thor. inf',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 40 },
    hitArea: { width: 4, height: 4 },
  },
  lumbar_upper: {
    id: 'lumbar_upper',
    label: 'Lombaires hautes (L1-L3)',
    shortLabel: 'Lomb. sup',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 48 },
    hitArea: { width: 4, height: 4 },
  },
  lumbar_lower: {
    id: 'lumbar_lower',
    label: 'Lombaires basses (L4-L5)',
    shortLabel: 'Lomb. inf',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 55 },
    hitArea: { width: 4, height: 4 },
  },
  sacrum: {
    id: 'sacrum',
    label: 'Sacrum',
    shortLabel: 'Sacrum',
    category: 'spine',
    visibleOn: ['back'],
    position: { x: 50, y: 61 },
    hitArea: { width: 6, height: 4 },
  },

  // === HANCHES ET FESSIERS ===
  hip_left_front: {
    id: 'hip_left_front',
    label: 'Hanche gauche (avant)',
    shortLabel: 'Hanche G',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 38, y: 58 },
    hitArea: { width: 12, height: 6 },
  },
  hip_right_front: {
    id: 'hip_right_front',
    label: 'Hanche droite (avant)',
    shortLabel: 'Hanche D',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 62, y: 58 },
    hitArea: { width: 12, height: 6 },
  },
  gluteal_left: {
    id: 'gluteal_left',
    label: 'Fessier gauche',
    shortLabel: 'Fessier G',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 38, y: 61 },
    hitArea: { width: 12, height: 6 },
  },
  gluteal_right: {
    id: 'gluteal_right',
    label: 'Fessier droit',
    shortLabel: 'Fessier D',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 62, y: 61 },
    hitArea: { width: 12, height: 6 },
  },

  // === CUISSES ===
  thigh_left_front: {
    id: 'thigh_left_front',
    label: 'Cuisse gauche (avant)',
    shortLabel: 'Cuisse G',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 35, y: 70 },
    hitArea: { width: 10, height: 12 },
  },
  thigh_left_back: {
    id: 'thigh_left_back',
    label: 'Cuisse gauche (arrière)',
    shortLabel: 'Cuisse G',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 35, y: 72 },
    hitArea: { width: 10, height: 12 },
  },
  thigh_left_inner: {
    id: 'thigh_left_inner',
    label: 'Cuisse gauche (intérieur)',
    shortLabel: 'Cuisse G int',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 42, y: 72 },
    hitArea: { width: 5, height: 10 },
  },
  thigh_left_outer: {
    id: 'thigh_left_outer',
    label: 'Cuisse gauche (extérieur)',
    shortLabel: 'Cuisse G ext',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 28, y: 72 },
    hitArea: { width: 5, height: 10 },
  },
  thigh_right_front: {
    id: 'thigh_right_front',
    label: 'Cuisse droite (avant)',
    shortLabel: 'Cuisse D',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 65, y: 70 },
    hitArea: { width: 10, height: 12 },
  },
  thigh_right_back: {
    id: 'thigh_right_back',
    label: 'Cuisse droite (arrière)',
    shortLabel: 'Cuisse D',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 65, y: 72 },
    hitArea: { width: 10, height: 12 },
  },
  thigh_right_inner: {
    id: 'thigh_right_inner',
    label: 'Cuisse droite (intérieur)',
    shortLabel: 'Cuisse D int',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 58, y: 72 },
    hitArea: { width: 5, height: 10 },
  },
  thigh_right_outer: {
    id: 'thigh_right_outer',
    label: 'Cuisse droite (extérieur)',
    shortLabel: 'Cuisse D ext',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 72, y: 72 },
    hitArea: { width: 5, height: 10 },
  },

  // === GENOUX ===
  knee_left_front: {
    id: 'knee_left_front',
    label: 'Genou gauche (avant)',
    shortLabel: 'Genou G',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 33, y: 80 },
    hitArea: { width: 7, height: 5 },
  },
  knee_left_back: {
    id: 'knee_left_back',
    label: 'Genou gauche (arrière)',
    shortLabel: 'Genou G',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 33, y: 81 },
    hitArea: { width: 7, height: 5 },
  },
  knee_right_front: {
    id: 'knee_right_front',
    label: 'Genou droit (avant)',
    shortLabel: 'Genou D',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 67, y: 80 },
    hitArea: { width: 7, height: 5 },
  },
  knee_right_back: {
    id: 'knee_right_back',
    label: 'Genou droit (arrière)',
    shortLabel: 'Genou D',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 67, y: 81 },
    hitArea: { width: 7, height: 5 },
  },

  // === JAMBES ===
  shin_left: {
    id: 'shin_left',
    label: 'Tibia gauche',
    shortLabel: 'Tibia G',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 32, y: 88 },
    hitArea: { width: 6, height: 8 },
  },
  shin_right: {
    id: 'shin_right',
    label: 'Tibia droit',
    shortLabel: 'Tibia D',
    category: 'lower_limb',
    visibleOn: ['front'],
    position: { x: 68, y: 88 },
    hitArea: { width: 6, height: 8 },
  },
  calf_left: {
    id: 'calf_left',
    label: 'Mollet gauche',
    shortLabel: 'Mollet G',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 32, y: 88 },
    hitArea: { width: 6, height: 8 },
  },
  calf_right: {
    id: 'calf_right',
    label: 'Mollet droit',
    shortLabel: 'Mollet D',
    category: 'lower_limb',
    visibleOn: ['back'],
    position: { x: 68, y: 88 },
    hitArea: { width: 6, height: 8 },
  },

  // === CHEVILLES ===
  ankle_left: {
    id: 'ankle_left',
    label: 'Cheville gauche',
    shortLabel: 'Chev. G',
    category: 'foot',
    visibleOn: ['front', 'back'],
    position: { x: 32, y: 94 },
    hitArea: { width: 5, height: 3 },
  },
  ankle_right: {
    id: 'ankle_right',
    label: 'Cheville droite',
    shortLabel: 'Chev. D',
    category: 'foot',
    visibleOn: ['front', 'back'],
    position: { x: 68, y: 94 },
    hitArea: { width: 5, height: 3 },
  },

  // === PIEDS ===
  foot_left_top: {
    id: 'foot_left_top',
    label: 'Pied gauche (dessus)',
    shortLabel: 'Pied G',
    category: 'foot',
    visibleOn: ['front'],
    position: { x: 32, y: 96 },
    hitArea: { width: 7, height: 3 },
  },
  foot_left_sole: {
    id: 'foot_left_sole',
    label: 'Pied gauche (plante)',
    shortLabel: 'Plante G',
    category: 'foot',
    visibleOn: ['back'],
    position: { x: 32, y: 96 },
    hitArea: { width: 7, height: 3 },
  },
  foot_right_top: {
    id: 'foot_right_top',
    label: 'Pied droit (dessus)',
    shortLabel: 'Pied D',
    category: 'foot',
    visibleOn: ['front'],
    position: { x: 68, y: 96 },
    hitArea: { width: 7, height: 3 },
  },
  foot_right_sole: {
    id: 'foot_right_sole',
    label: 'Pied droit (plante)',
    shortLabel: 'Plante D',
    category: 'foot',
    visibleOn: ['back'],
    position: { x: 68, y: 96 },
    hitArea: { width: 7, height: 3 },
  },
}

/**
 * Retourne les zones visibles pour une vue donnée
 */
export function getZonesForView(view: BodyView): BodyZoneDefinition[] {
  return Object.values(bodyZones).filter((zone) => zone.visibleOn.includes(view))
}

/**
 * Retourne les zones par catégorie
 */
export function getZonesByCategory(category: ZoneCategory): BodyZoneDefinition[] {
  return Object.values(bodyZones).filter((zone) => zone.category === category)
}

/**
 * Labels des catégories en français
 */
export const categoryLabels: Record<ZoneCategory, string> = {
  head_neck: 'Tête et cou',
  upper_limb: 'Membres supérieurs',
  trunk: 'Tronc',
  spine: 'Colonne vertébrale',
  lower_limb: 'Membres inférieurs',
  foot: 'Pieds',
}
