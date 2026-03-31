/**
 * Design System Tokens - PhysioXpert Mobile
 *
 * Constantes de design pour assurer la cohérence visuelle de l'application.
 * Ces valeurs sont synchronisées avec les classes Tailwind CSS.
 */

/**
 * Espacements en pixels
 * Utilisés pour margins, paddings, gaps
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const

/**
 * Rayons de bordure en pixels
 */
export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

/**
 * Taille minimum des zones tactiles (accessibilité iOS/Android)
 */
export const touchTarget = {
  min: 44,
} as const

/**
 * Palette de couleurs
 * Note: Utiliser les classes Tailwind quand possible (ex: 'bg-primary-500')
 * Ces valeurs hex sont pour les cas spéciaux (SVG, canvas, etc.)
 */
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  accent: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const

/**
 * Couleurs pour l'échelle de douleur (5 niveaux)
 * Utilisées dans AnatomicalBodyMap et EVASlider
 */
export const painColors = {
  /** Niveau 0 - Aucune douleur */
  none: '#22c55e',
  /** Niveau 1 - Douleur légère */
  mild: '#84cc16',
  /** Niveau 2 - Douleur modérée */
  moderate: '#eab308',
  /** Niveau 3 - Douleur sévère */
  severe: '#f97316',
  /** Niveau 4 - Douleur extrême */
  extreme: '#ef4444',
} as const

/**
 * Labels français pour les niveaux de douleur
 */
export const painLabels = {
  none: 'Aucune',
  mild: 'Légère',
  moderate: 'Modérée',
  severe: 'Sévère',
  extreme: 'Extrême',
} as const

/**
 * Type pour les niveaux d'intensité de douleur (0-4)
 */
export type PainIntensity = 0 | 1 | 2 | 3 | 4

/**
 * Mapping intensité numérique → clé couleur
 */
export const intensityToColorKey: Record<PainIntensity, keyof typeof painColors> = {
  0: 'none',
  1: 'mild',
  2: 'moderate',
  3: 'severe',
  4: 'extreme',
}

/**
 * Retourne la couleur hex pour une intensité donnée
 */
export function getPainColor(intensity: PainIntensity): string {
  return painColors[intensityToColorKey[intensity]]
}

/**
 * Retourne le label français pour une intensité donnée
 */
export function getPainLabel(intensity: PainIntensity): string {
  return painLabels[intensityToColorKey[intensity]]
}

/**
 * Classes Tailwind pour les couleurs de douleur (background)
 */
export const painBgClasses: Record<PainIntensity, string> = {
  0: 'bg-green-500',
  1: 'bg-lime-500',
  2: 'bg-yellow-500',
  3: 'bg-orange-500',
  4: 'bg-red-500',
}

/**
 * Classes Tailwind pour les couleurs de douleur (text)
 */
export const painTextClasses: Record<PainIntensity, string> = {
  0: 'text-green-500',
  1: 'text-lime-500',
  2: 'text-yellow-500',
  3: 'text-orange-500',
  4: 'text-red-500',
}

/**
 * Classes Tailwind pour les couleurs de douleur (border)
 */
export const painBorderClasses: Record<PainIntensity, string> = {
  0: 'border-green-500',
  1: 'border-lime-500',
  2: 'border-yellow-500',
  3: 'border-orange-500',
  4: 'border-red-500',
}
