/**
 * PhysioXpert UI - Design System
 *
 * Bibliothèque de composants React réutilisable inspirée de Spark Web (Leboncoin).
 * Utilise CVA (Class Variance Authority) pour la gestion des variantes,
 * cn() (clsx + tailwind-merge) pour la composition de classes,
 * et le pattern Slot/asChild pour le polymorphisme.
 *
 * ## Installation
 *
 * ```typescript
 * // Dans votre app, importez les composants :
 * import { Button, Card, Input, Alert, Badge, cn } from 'physio-xpert-ui'
 *
 * // Et le CSS theme (dans votre fichier CSS principal) :
 * import 'physio-xpert-ui/styles'
 * ```
 *
 * @module PhysioXpertUI
 */

// Import theme CSS pour qu'il soit inclus dans le bundle
import './styles/theme.css'

// ============================================
// Utilities
// ============================================
export { cn } from './components/cn'
export { Slot, type SlotProps } from './components/slot'

// ============================================
// Design Tokens
// ============================================
export {
  spacing,
  radius,
  touchTarget,
  colors,
  painColors,
  painLabels,
  type PainIntensity,
  intensityToColorKey,
  getPainColor,
  getPainLabel,
  painBgClasses,
  painTextClasses,
  painBorderClasses,
} from './components/tokens'

// ============================================
// Core Components
// ============================================
export { Button, buttonVariants, type ButtonProps } from './components/button'
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
} from './components/card'
export { Badge, badgeVariants, type BadgeProps } from './components/badge'
export { IconButton, iconButtonVariants, type IconButtonProps } from './components/icon-button'

// ============================================
// Form Components
// ============================================
export { Input, inputVariants, type InputProps } from './components/input'
export { Textarea, textareaVariants, type TextareaProps } from './components/textarea'
export { Select, selectVariants, type SelectProps, type SelectOption } from './components/select'
export { Switch, switchVariants, type SwitchProps } from './components/switch'

// ============================================
// Selection Components
// ============================================
export {
  SegmentedControl,
  segmentedControlVariants,
  type SegmentedControlProps,
  type SegmentedControlOption,
} from './components/segmented-control'
export { Chip, ChipGroup, chipVariants, type ChipProps, type ChipGroupProps } from './components/chip'
export { Slider, type SliderProps } from './components/slider'

// ============================================
// Feedback Components
// ============================================
export { Alert, alertVariants, type AlertProps } from './components/alert'
export {
  Progress,
  StepProgress,
  progressBarVariants,
  progressTrackVariants,
  type ProgressProps,
  type StepProgressProps,
} from './components/progress'

// ============================================
// Display Components
// ============================================
export {
  Avatar,
  AvatarGroup,
  avatarVariants,
  type AvatarProps,
  type AvatarGroupProps,
} from './components/avatar'

// ============================================
// Overlay Components
// ============================================
export {
  BottomSheet,
  BottomSheetActions,
  type BottomSheetProps,
  type BottomSheetRef,
  type BottomSheetActionsProps,
} from './components/bottom-sheet'
export {
  ConfirmDialog,
  confirmButtonVariants,
  iconBgVariants,
  type ConfirmDialogProps,
  type DialogVariant,
} from './components/confirm-dialog'

// ============================================
// State Components
// ============================================
export {
  EmptyState,
  emptyStateActionVariants,
  type EmptyStateProps,
  type EmptyStateVariant,
} from './components/empty-state'
export {
  LoadingSpinner,
  loadingSpinnerVariants,
  loadingSpinnerTextVariants,
  type LoadingSpinnerProps,
} from './components/loading-spinner'
export {
  OfflineBanner,
  offlineBannerVariants,
  type OfflineBannerProps,
} from './components/offline-banner'

// ============================================
// Form Components (extended)
// ============================================
export {
  FormField,
  formFieldInputVariants,
  type FormFieldProps,
  type FieldState,
} from './components/form-field'

// ============================================
// Accessibility Components
// ============================================
export { SkipLink, type SkipLinkProps } from './components/skip-link'

// ============================================
// Notification Components
// ============================================
export {
  DailyMotivationBanner,
  type DailyMotivationBannerProps,
  type MotivationMessage,
  type MotivationType,
  type MotivationVariant,
} from './components/notifications'

// ============================================
// Supervision Components
// ============================================
export {
  SupervisionPendingBanner,
  type SupervisionPendingBannerProps,
  SupervisionApprovedBanner,
  type SupervisionApprovedBannerProps,
} from './components/supervision'

// ============================================
// Patient Components
// ============================================
export {
  DeleteAccountModal,
  type DeleteAccountModalProps,
  SportsPracticedInput,
  SUGGESTED_SPORTS,
  type SportsPracticedInputProps,
  PatientProfileView,
  type PatientProfileViewProps,
  type PatientProfileData,
  type PatientGender,
  type PatientSportLevel,
} from './components/patient'

// ============================================
// Bodymap Components
// ============================================
export {
  AnatomicalBodyMap,
  type AnatomicalBodyMapProps,
  type PainPoint,
  type BodyRegion,
  type BodyView,
  BodySilhouette,
  type BodySilhouetteProps,
  BodyZone,
  type BodyZoneProps,
  IntensitySelector,
  IntensitySelectorCompact,
  type IntensitySelectorProps,
  type IntensitySelectorCompactProps,
  ZoneDetailSheet,
  type ZoneDetailSheetProps,
  bodyZones,
  getZonesForView,
  getZonesByCategory,
  categoryLabels,
  type BodyZoneDefinition,
  type ZoneCategory,
  SVG_VIEWBOX,
  BODY_COMPONENTS,
  DETAIL_PATHS_FRONT,
  DETAIL_PATHS_BACK,
} from './components/bodymap'

// ============================================
// Questionnaire Components
// ============================================
export {
  QuestionnaireProgress,
  type QuestionnaireProgressProps,
  IndividualScoresDisplay,
  type IndividualScoresDisplayProps,
  type SessionScoreResult,
  type ScoreDefinition,
  type LocalizedText,
  ScoreDisplay,
  type ScoreDisplayProps,
  type ScoringResult,
  type ComputedScore,
  type InterpretationColor,
  DemoVideoPlayer,
  type DemoVideoPlayerProps,
  EmergencyScreen,
  type EmergencyScreenProps,
  type Flag,
} from './components/questionnaire'

// ============================================
// Exercise Components
// ============================================
export {
  EVASlider,
  EVA_COLORS,
  EVA_ICONS,
  type EVASliderProps,
  type EVAConstraint,
  VORBadge,
  VORStats,
  VORProgressBar,
  vorBadgeVariants,
  STATUS_CONFIG,
  type VORBadgeProps,
  type VORStatsProps,
  type VORProgressBarProps,
  type StatusColor,
  PhaseIndicator,
  PhaseCard,
  phaseIndicatorVariants,
  PHASES,
  type PhaseIndicatorProps,
  type PhaseCardProps,
  DifficultySelector,
  DIFFICULTY_OPTIONS,
  type DifficultySelectorProps,
  type DifficultyPerception,
  RPESelector,
  RPE_LEVELS,
  type RPESelectorProps,
  RIRSelector,
  RIR_LEVELS,
  type RIRSelectorProps,
  PainEvolutionSelector,
  PAIN_EVOLUTION_OPTIONS,
  type PainEvolutionSelectorProps,
  type PainEvolution,
  ProgressionBadge,
  type ProgressionBadgeProps,
  ConsolidationBanner,
  CONSOLIDATION_LEVEL_CONFIG,
  type ConsolidationBannerProps,
  type ConsolidationInfo,
  type ConsolidationLevel,
  CooldownAlert,
  type CooldownAlertProps,
  type CooldownCreated,
  CooldownBadge,
  cooldownBadgeVariants,
  type CooldownBadgeProps,
  FallbackIndicator,
  FALLBACK_LEVELS,
  determineFallbackLevel,
  type FallbackIndicatorProps,
  type FilteringReport,
  type FallbackLevel,
  SessionMessages,
  type SessionMessagesProps,
  VideoPlayer,
  PLAYBACK_RATES,
  type VideoPlayerProps,
  AccessorySelector,
  ACCESSORY_ICONS,
  type AccessorySelectorProps,
  type Accessory,
  PositionSelector,
  POSITION_ICONS,
  type PositionSelectorProps,
  type Position,
  TempoMetronome,
  PHASE_LABELS,
  PHASE_COLORS,
  type TempoMetronomeProps,
  MedicalAlertCR2,
  type MedicalAlertCR2Props,
  RestDaySuggestionModal,
  type RestDaySuggestionModalProps,
  ProgramSelector,
  BODY_REGION_ICONS,
  getBodyRegionIcon,
  getBodyRegionLabel,
  type ProgramSelectorProps,
  type ProgramStats,
  DailyProgressCard,
  type DailyProgressCardProps,
  DailyAvailabilitySettings,
  PRESET_OPTIONS,
  type DailyAvailabilitySettingsProps,
  LocationProfileSelector,
  type LocationProfileSelectorProps,
  type LocationProfile,
  type LocationProfileType,
} from './components/exercises'
