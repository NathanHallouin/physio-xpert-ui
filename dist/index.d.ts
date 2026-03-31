import { AnchorHTMLAttributes } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { ImgHTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { LucideIcon } from 'lucide-react';
import { NamedExoticComponent } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { SelectHTMLAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

export declare interface Accessory {
    key: string;
    label: string;
    iconKey: string;
}

export declare const ACCESSORY_ICONS: Record<string, LucideIcon>;

export declare const AccessorySelector: ForwardRefExoticComponent<AccessorySelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface AccessorySelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Liste des accessoires actuellement selectionnes */
    selectedAccessories: string[];
    /** Callback appele lorsque la selection change */
    onChange: (accessories: string[]) => void;
    /** Liste des accessoires disponibles */
    availableAccessories: Accessory[];
    /** Desactive le selecteur */
    disabled?: boolean;
    /** Mode compact : badges en ligne au lieu de grille */
    compact?: boolean;
    /** Label affiche au-dessus */
    label?: string;
}

export declare const Alert: ForwardRefExoticComponent<AlertProps & RefAttributes<HTMLDivElement>>;

export declare interface AlertProps extends VariantProps<typeof alertVariants> {
    title?: string;
    children: ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: ReactNode;
    className?: string;
}

export declare const alertVariants: (props?: ({
    variant?: "success" | "warning" | "error" | "info" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function AnatomicalBodyMap({ value, onChange, mode, showLabels, initialView, disabledZones, size, className, }: AnatomicalBodyMapProps): JSX.Element;

export declare interface AnatomicalBodyMapProps extends VariantProps<typeof bodyMapContainerVariants> {
    /** Points de douleur sélectionnés */
    value: PainPoint[];
    /** Callback quand les points changent */
    onChange: (points: PainPoint[]) => void;
    /** Mode: sélection simple ou multiple */
    mode?: 'single' | 'multiple';
    /** Afficher les labels des zones */
    showLabels?: boolean;
    /** Vue initiale */
    initialView?: BodyView;
    /** Zones désactivées */
    disabledZones?: BodyRegion[];
    /** Classes CSS additionnelles */
    className?: string;
}

export declare const Avatar: ForwardRefExoticComponent<AvatarProps & RefAttributes<HTMLDivElement>>;

export declare function AvatarGroup({ children, max, size, className, }: AvatarGroupProps): JSX.Element;

export declare interface AvatarGroupProps {
    children: React.ReactNode;
    max?: number;
    size?: AvatarProps['size'];
    className?: string;
}

export declare interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>, VariantProps<typeof avatarVariants> {
    src?: string | null;
    name?: string;
}

export declare const avatarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
    shape?: "circle" | "square" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Badge: ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLSpanElement>>;

export declare interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    children: ReactNode;
    dot?: boolean;
}

export declare const badgeVariants: (props?: ({
    variant?: "primary" | "accent" | "default" | "success" | "warning" | "error" | "info" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    outline?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Composants de la silhouette - formes séparées pour fiabilité
 */
export declare const BODY_COMPONENTS: {
    head: {
        type: "ellipse";
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
    neck: {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
        rx: number;
    };
    torso: {
        type: "path";
        d: string;
    };
    leftArm: {
        type: "path";
        d: string;
    };
    rightArm: {
        type: "path";
        d: string;
    };
    leftHand: {
        type: "ellipse";
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
    rightHand: {
        type: "ellipse";
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
    leftLeg: {
        type: "path";
        d: string;
    };
    rightLeg: {
        type: "path";
        d: string;
    };
    leftFoot: {
        type: "ellipse";
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
    rightFoot: {
        type: "ellipse";
        cx: number;
        cy: number;
        rx: number;
        ry: number;
    };
};

export declare const BODY_REGION_ICONS: Record<string, LucideIcon>;

declare const bodyMapContainerVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Identifiants des régions anatomiques
 */
export declare type BodyRegion = 'head' | 'neck_front' | 'neck_back' | 'shoulder_left' | 'shoulder_right' | 'upper_arm_left_front' | 'upper_arm_left_back' | 'upper_arm_right_front' | 'upper_arm_right_back' | 'elbow_left' | 'elbow_right' | 'forearm_left_front' | 'forearm_left_back' | 'forearm_right_front' | 'forearm_right_back' | 'wrist_left' | 'wrist_right' | 'hand_left' | 'hand_right' | 'chest_left' | 'chest_right' | 'abdomen_upper' | 'abdomen_lower' | 'upper_back_left' | 'upper_back_right' | 'mid_back_left' | 'mid_back_right' | 'lower_back_left' | 'lower_back_right' | 'cervical' | 'thoracic_upper' | 'thoracic_mid' | 'thoracic_lower' | 'lumbar_upper' | 'lumbar_lower' | 'sacrum' | 'hip_left_front' | 'hip_right_front' | 'gluteal_left' | 'gluteal_right' | 'thigh_left_front' | 'thigh_left_back' | 'thigh_left_inner' | 'thigh_left_outer' | 'thigh_right_front' | 'thigh_right_back' | 'thigh_right_inner' | 'thigh_right_outer' | 'knee_left_front' | 'knee_left_back' | 'knee_right_front' | 'knee_right_back' | 'shin_left' | 'shin_right' | 'calf_left' | 'calf_right' | 'ankle_left' | 'ankle_right' | 'foot_left_top' | 'foot_left_sole' | 'foot_right_top' | 'foot_right_sole';

export declare const BodySilhouette: NamedExoticComponent<BodySilhouetteProps>;

export declare interface BodySilhouetteProps {
    /** Vue actuelle (face ou dos) */
    view: BodyView;
    /** Afficher les détails anatomiques */
    showDetails?: boolean;
    /** Classes CSS additionnelles */
    className?: string;
}

/**
 * Vue du corps (face ou dos)
 */
export declare type BodyView = 'front' | 'back';

export declare const BodyZone: NamedExoticComponent<BodyZoneProps>;

/**
 * Définition d'une zone anatomique
 */
export declare interface BodyZoneDefinition {
    /** Identifiant unique */
    id: BodyRegion;
    /** Label en français */
    label: string;
    /** Label court pour l'affichage compact */
    shortLabel: string;
    /** Catégorie */
    category: ZoneCategory;
    /** Vue(s) où la zone est visible */
    visibleOn: BodyView[];
    /** Position relative (% du SVG viewBox) */
    position: {
        x: number;
        y: number;
    };
    /** Taille de la zone cliquable */
    hitArea: {
        width: number;
        height: number;
    };
}

export declare interface BodyZoneProps {
    /** Définition de la zone */
    zone: BodyZoneDefinition;
    /** Intensité de la douleur (null = non sélectionné) */
    intensity: PainIntensity | null;
    /** Callback au clic */
    onClick: (zoneId: string) => void;
    /** Callback au long press */
    onLongPress?: (zoneId: string) => void;
    /** Zone désactivée */
    disabled?: boolean;
    /** Afficher le label */
    showLabel?: boolean;
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
export declare const bodyZones: Record<BodyRegion, BodyZoneDefinition>;

export declare const BottomSheet: ForwardRefExoticComponent<BottomSheetProps & RefAttributes<BottomSheetRef>>;

export declare function BottomSheetActions({ children, className }: BottomSheetActionsProps): JSX.Element;

export declare interface BottomSheetActionsProps {
    children: ReactNode;
    className?: string;
}

export declare interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    description?: string;
    showHandle?: boolean;
    draggable?: boolean;
    closeOnOverlayClick?: boolean;
    height?: 'auto' | 'half' | 'full' | string;
    className?: string;
}

export declare interface BottomSheetRef {
    close: () => void;
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export declare interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    children: ReactNode;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    asChild?: boolean;
}

export declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "gradient" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

export declare const CardContent: ForwardRefExoticComponent<CardContentProps & RefAttributes<HTMLDivElement>>;

export declare interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export declare const CardFooter: ForwardRefExoticComponent<CardFooterProps & RefAttributes<HTMLDivElement>>;

export declare interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export declare const CardHeader: ForwardRefExoticComponent<CardHeaderProps & RefAttributes<HTMLDivElement>>;

export declare interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    action?: ReactNode;
}

export declare interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    children: ReactNode;
}

export declare const cardVariants: (props?: ({
    variant?: "ghost" | "elevated" | "outlined" | "filled" | null | undefined;
    padding?: "none" | "sm" | "md" | "lg" | null | undefined;
    rounded?: "sm" | "md" | "lg" | "xl" | null | undefined;
    clickable?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Labels des catégories en français
 */
export declare const categoryLabels: Record<ZoneCategory, string>;

export declare const Chip: ForwardRefExoticComponent<ChipProps & RefAttributes<HTMLButtonElement>>;

export declare function ChipGroup<T extends string>({ options, value, onChange, multiple, variant, size, className, }: ChipGroupProps<T>): JSX.Element;

export declare interface ChipGroupProps<T extends string> {
    options: {
        value: T;
        label: string;
        icon?: ReactNode;
    }[];
    value: T[];
    onChange: (value: T[]) => void;
    multiple?: boolean;
    variant?: ChipProps['variant'];
    size?: ChipProps['size'];
    className?: string;
}

export declare interface ChipProps extends Omit<VariantProps<typeof chipVariants>, 'selected' | 'isDisabled'> {
    children: ReactNode;
    selected?: boolean;
    onSelect?: () => void;
    onRemove?: () => void;
    disabled?: boolean;
    icon?: ReactNode;
    className?: string;
}

export declare const chipVariants: (props?: ({
    variant?: "primary" | "accent" | "success" | "warning" | "error" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    selected?: boolean | null | undefined;
    isDisabled?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

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
export declare function cn(...inputs: ClassValue[]): string;

/**
 * Palette de couleurs
 * Note: Utiliser les classes Tailwind quand possible (ex: 'bg-primary-500')
 * Ces valeurs hex sont pour les cas spéciaux (SVG, canvas, etc.)
 */
export declare const colors: {
    readonly primary: {
        readonly 50: "#eff6ff";
        readonly 100: "#dbeafe";
        readonly 200: "#bfdbfe";
        readonly 300: "#93c5fd";
        readonly 400: "#60a5fa";
        readonly 500: "#3b82f6";
        readonly 600: "#2563eb";
        readonly 700: "#1d4ed8";
        readonly 800: "#1e40af";
        readonly 900: "#1e3a8a";
    };
    readonly accent: {
        readonly 50: "#f5f3ff";
        readonly 100: "#ede9fe";
        readonly 200: "#ddd6fe";
        readonly 300: "#c4b5fd";
        readonly 400: "#a78bfa";
        readonly 500: "#8b5cf6";
        readonly 600: "#7c3aed";
        readonly 700: "#6d28d9";
        readonly 800: "#5b21b6";
        readonly 900: "#4c1d95";
    };
    readonly success: {
        readonly 50: "#f0fdf4";
        readonly 100: "#dcfce7";
        readonly 200: "#bbf7d0";
        readonly 300: "#86efac";
        readonly 400: "#4ade80";
        readonly 500: "#22c55e";
        readonly 600: "#16a34a";
        readonly 700: "#15803d";
    };
    readonly warning: {
        readonly 50: "#fffbeb";
        readonly 100: "#fef3c7";
        readonly 200: "#fde68a";
        readonly 300: "#fcd34d";
        readonly 400: "#fbbf24";
        readonly 500: "#f97316";
        readonly 600: "#ea580c";
        readonly 700: "#c2410c";
    };
    readonly error: {
        readonly 50: "#fef2f2";
        readonly 100: "#fee2e2";
        readonly 200: "#fecaca";
        readonly 300: "#fca5a5";
        readonly 400: "#f87171";
        readonly 500: "#ef4444";
        readonly 600: "#dc2626";
        readonly 700: "#b91c1c";
    };
    readonly gray: {
        readonly 50: "#f9fafb";
        readonly 100: "#f3f4f6";
        readonly 200: "#e5e7eb";
        readonly 300: "#d1d5db";
        readonly 400: "#9ca3af";
        readonly 500: "#6b7280";
        readonly 600: "#4b5563";
        readonly 700: "#374151";
        readonly 800: "#1f2937";
        readonly 900: "#111827";
    };
};

/**
 * Computed score result
 */
export declare interface ComputedScore {
    key: string;
    label: string;
    rawValue: number;
    normalizedValue?: number;
    interpretation?: string;
    color?: InterpretationColor;
    description?: string;
}

export declare const confirmButtonVariants: (props?: ({
    variant?: "warning" | "info" | "danger" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * ConfirmDialog - Modal confirmation dialog for destructive actions.
 *
 * Features:
 * - Dark overlay with click-outside to close
 * - Escape key to close
 * - Focus management (restores previous focus on close)
 * - Visual variants (danger, warning, info)
 * - Body scroll lock while open
 */
export declare const ConfirmDialog: ForwardRefExoticComponent<ConfirmDialogProps & RefAttributes<HTMLDivElement>>;

export declare interface ConfirmDialogProps {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Callback when the dialog is closed */
    onClose: () => void;
    /** Callback when the action is confirmed */
    onConfirm: () => void;
    /** Dialog title */
    title: string;
    /** Dialog description */
    description?: string;
    /** Confirm button label */
    confirmLabel?: string;
    /** Cancel button label */
    cancelLabel?: string;
    /** Visual variant */
    variant?: DialogVariant;
    /** Loading state for the confirm button */
    loading?: boolean;
    /** Custom icon (replaces the default icon) */
    icon?: ReactNode;
    /** Loading text shown in the confirm button */
    loadingText?: string;
    /** Additional CSS classes for the dialog panel */
    className?: string;
}

export declare const CONSOLIDATION_LEVEL_CONFIG: Record<ConsolidationLevel, {
    icon: string;
    title: string;
    description: string;
    color: string;
    textColor: string;
    subTextColor: string;
}>;

export declare const ConsolidationBanner: ForwardRefExoticComponent<ConsolidationBannerProps & RefAttributes<HTMLDivElement>>;

export declare interface ConsolidationBannerProps extends HTMLAttributes<HTMLDivElement> {
    consolidationInfo: ConsolidationInfo;
    /** Affichage compact (moins de texte) */
    compact?: boolean;
}

export declare interface ConsolidationInfo {
    isActive: boolean;
    daysSinceLastSession: number;
    reductionPercent: number;
    level: ConsolidationLevel;
}

export declare type ConsolidationLevel = 'light' | 'moderate' | 'heavy' | 'restart';

export declare const CooldownAlert: ForwardRefExoticComponent<CooldownAlertProps & RefAttributes<HTMLDivElement>>;

export declare interface CooldownAlertProps extends HTMLAttributes<HTMLDivElement> {
    /** Liste des cooldowns crees apres la seance */
    cooldowns: CooldownCreated[];
    /** Fonction pour recuperer le titre d'un exercice par son ID */
    getExerciseTitle?: (exerciseId: string) => string | undefined;
    /** Mode compact : juste un badge avec le nombre de cooldowns */
    compact?: boolean;
}

export declare const CooldownBadge: ForwardRefExoticComponent<CooldownBadgeProps & RefAttributes<HTMLDivElement>>;

export declare interface CooldownBadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cooldownBadgeVariants> {
}

export declare const cooldownBadgeVariants: (props?: ({
    compact?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare interface CooldownCreated {
    exerciseId: string;
    cooldownDays: number;
    reason?: string;
}

export declare const DailyAvailabilitySettings: ForwardRefExoticComponent<DailyAvailabilitySettingsProps & RefAttributes<HTMLDivElement>>;

export declare interface DailyAvailabilitySettingsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Valeur actuelle en minutes (5-60) */
    value: number;
    /** Callback appele quand la valeur change */
    onChange?: (minutes: number) => void;
    /** Callback pour sauvegarder (remplace l'appel API direct) */
    onSave?: (minutes: number) => Promise<boolean>;
    /** Desactiver l'interaction ? */
    disabled?: boolean;
    /** Mode compact pour affichage dans une carte */
    compact?: boolean;
}

export declare function DailyMotivationBanner({ message, onDismiss, onAction, className, }: DailyMotivationBannerProps): JSX.Element | null;

export declare interface DailyMotivationBannerProps {
    /** The motivation message to display */
    message: MotivationMessage;
    /** Callback when the banner is dismissed */
    onDismiss: () => void;
    /** Callback when the action button is clicked */
    onAction?: () => void;
    /** Additional CSS classes */
    className?: string;
}

export declare const DailyProgressCard: ForwardRefExoticComponent<DailyProgressCardProps & RefAttributes<HTMLDivElement>>;

export declare interface DailyProgressCardProps extends HTMLAttributes<HTMLDivElement> {
    /** Disponibilite journaliere en minutes */
    dailyAvailabilityMinutes: number;
    /** Minutes completees aujourd'hui */
    todayMinutesCompleted: number;
    /** Minutes restantes aujourd'hui */
    todayMinutesRemaining: number;
    /** Nombre de seances aujourd'hui */
    todaySessionsCount: number;
    /** Objectif quotidien atteint */
    dailyQuotaReached: boolean;
    /** Serie de jours consecutifs */
    currentStreak: number;
    /** Le patient peut demarrer une seance */
    canStartSession: boolean;
    /** Message de motivation */
    motivationMessage?: MotivationMessage_2 | null;
    /** Callback pour demarrer une seance */
    onStartSession?: () => void;
    /** Callback pour fermer le message de motivation */
    onDismissMotivation?: () => void;
    /** Callback pour ouvrir les reglages */
    onOpenSettings?: () => void;
    /** Contenu supplementaire (ex: RestDaySuggestionModal) */
    children?: ReactNode;
}

export declare function DeleteAccountModal({ isOpen, onClose, onConfirm, userEmail, className, }: DeleteAccountModalProps): JSX.Element | null;

/**
 * DeleteAccountModal - Confirmation modal for permanent account deletion
 *
 * Implements the "Right to Erasure" (GDPR Article 17) with safeguards:
 * 1. Textual confirmation: patient must type "SUPPRIMER"
 * 2. Double confirmation: button disabled until text matches
 * 3. Clear warning: lists all data that will be deleted
 *
 * @example
 * ```tsx
 * <DeleteAccountModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onConfirm={handleDeleteAccount}
 *   userEmail={user.email}
 * />
 * ```
 */
export declare interface DeleteAccountModalProps {
    /** Controls modal visibility */
    isOpen: boolean;
    /** Callback to close the modal */
    onClose: () => void;
    /** Async callback to perform the deletion */
    onConfirm: () => Promise<void>;
    /** User email (displayed in the modal) */
    userEmail: string;
    /** Additional CSS classes for the overlay */
    className?: string;
}

export declare function DemoVideoPlayer({ videoUrl, instructions, onContinue }: DemoVideoPlayerProps): JSX.Element;

/**
 * DemoVideoPlayer - Lecteur de vidéo de démonstration
 *
 * Affiche une vidéo de démonstration avant une question.
 * Le patient doit regarder la vidéo et cliquer sur "J'ai compris" pour continuer.
 */
export declare interface DemoVideoPlayerProps {
    /** URL de la vidéo (YouTube, Vimeo, ou lien direct) */
    videoUrl: string;
    /** Instructions à afficher avec la vidéo */
    instructions?: string;
    /** Callback appelé quand le patient a vu la vidéo */
    onContinue: () => void;
}

/**
 * Détails anatomiques - Vue de dos
 */
export declare const DETAIL_PATHS_BACK: {
    spine: string;
    leftScapula: string;
    rightScapula: string;
    trapezius: string;
    leftGluteal: string;
    rightGluteal: string;
    leftCalf: string;
    rightCalf: string;
};

/**
 * Détails anatomiques - Vue de face
 */
export declare const DETAIL_PATHS_FRONT: {
    centerLine: string;
    clavicles: string;
    leftPec: string;
    rightPec: string;
    abs: string;
    navel: string;
    leftKnee: string;
    rightKnee: string;
};

export declare function determineFallbackLevel(report: FilteringReport): FallbackLevel;

export declare type DialogVariant = 'danger' | 'warning' | 'info';

export declare const DIFFICULTY_OPTIONS: {
    value: DifficultyPerception;
    label: string;
    Icon: LucideIcon;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}[];

/** Perception de difficulte */
export declare type DifficultyPerception = 'facile' | 'normal' | 'difficile';

export declare const DifficultySelector: ForwardRefExoticComponent<DifficultySelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface DifficultySelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Valeur actuellement selectionnee */
    value: DifficultyPerception | null;
    /** Callback appele lorsque l'utilisateur change la selection */
    onChange: (value: DifficultyPerception) => void;
    /** Desactive le selecteur */
    disabled?: boolean;
    /** Label affiche au-dessus */
    label?: string;
}

export declare function EmergencyScreen({ triggeredFlag, onExit, practitionerName, practitionerPhone }: EmergencyScreenProps): JSX.Element;

export declare interface EmergencyScreenProps {
    /** Le flag red flag qui a déclenché l'écran d'urgence */
    triggeredFlag: Flag;
    /** Callback pour quitter et retourner à l'accueil */
    onExit: () => void;
    /** Nom du praticien (optionnel) */
    practitionerName?: string;
    /** Numéro du praticien (optionnel) */
    practitionerPhone?: string;
}

/**
 * EmptyState - Reusable component for empty states with illustration, title,
 * description and optional action button.
 */
export declare function EmptyState({ variant, title, description, action, className, icon, }: EmptyStateProps): JSX.Element;

export declare const emptyStateActionVariants: (props?: ({
    variant?: "primary" | "secondary" | null | undefined;
} & ClassProp) | undefined) => string;

export declare interface EmptyStateProps {
    /** Visual variant (determines the illustration) */
    variant?: EmptyStateVariant;
    /** Main title */
    title: string;
    /** Secondary description */
    description?: string;
    /** Optional action button */
    action?: {
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary';
    };
    /** Additional CSS classes */
    className?: string;
    /** Custom icon (replaces the default illustration) */
    icon?: ReactNode;
}

export declare type EmptyStateVariant = 'questionnaires' | 'questionnaires-completed' | 'exercises' | 'exercises-history' | 'generic';

export declare const EVA_COLORS: string[];

export declare const EVA_ICONS: Array<{
    Icon: LucideIcon;
    color: string;
}>;

/**
 * Contrainte de direction pour le slider
 * - 'below': La valeur doit etre inferieure a referenceValue
 * - 'above': La valeur doit etre superieure a referenceValue
 * - 'equal': La valeur est verrouillee a referenceValue
 */
export declare type EVAConstraint = 'below' | 'above' | 'equal' | null;

export declare const EVASlider: ForwardRefExoticComponent<EVASliderProps & RefAttributes<HTMLDivElement>>;

export declare interface EVASliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Valeur actuelle (0-10) */
    value: number;
    /** Callback appele quand la valeur change */
    onChange: (value: number) => void;
    /** Label affiche au-dessus du slider */
    label?: string;
    /** Afficher un emoji correspondant a la douleur ? */
    showEmoji?: boolean;
    /** Desactiver l'interaction ? */
    disabled?: boolean;
    /** Valeur de reference (EVA pre-seance) a afficher comme indicateur */
    referenceValue?: number | null;
    /** Contrainte de direction basee sur l'evolution de la douleur */
    constraint?: EVAConstraint;
}

export declare const FALLBACK_LEVELS: Record<FallbackLevel, {
    label: string;
    description: string;
    Icon: LucideIcon;
    color: string;
    bgColor: string;
    borderColor: string;
    progressColor: string;
    percentage: number;
}>;

export declare const FallbackIndicator: ForwardRefExoticComponent<FallbackIndicatorProps & RefAttributes<HTMLDivElement>>;

export declare interface FallbackIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    /** Rapport de filtrage retourne par l'Edge Function */
    filteringReport?: FilteringReport;
    /** Mode compact : juste un badge colore */
    compact?: boolean;
    /** Afficher les details techniques du filtrage */
    showDetails?: boolean;
}

export declare type FallbackLevel = 'optimal' | 'niveau1' | 'niveau2' | 'niveau3' | 'niveau4';

export declare type FieldState = 'idle' | 'valid' | 'error';

export declare interface FilteringReport {
    initialCount: number;
    finalCount: number;
    afterRegionFilter?: number;
    afterPhaseFilter?: number;
    afterBdkFilter?: number;
    afterAccessoryFilter?: number;
    afterCooldownFilter?: number;
    patientProfile?: {
        ageCategory: string;
        sportLevel?: string;
    };
}

/**
 * EmergencyScreen - Écran d'urgence affiché lors de la détection d'un Red Flag
 *
 * Ce composant bloque complètement le questionnaire lorsqu'un "red flag" médical
 * est détecté. Les red flags sont des signaux d'alerte graves nécessitant une
 * consultation médicale urgente.
 */
/**
 * Flag type for red flag detection
 */
export declare interface Flag {
    id: string;
    key: string;
    label: Record<string, string> | string;
    color: string;
    description: Record<string, string> | string | null;
    questionnaireId: string | null;
    isGlobal: boolean | null;
    isRedFlag: boolean | null;
    status: string;
}

/**
 * FormField - Form input with label, validation icons, and error/help messages.
 *
 * Features:
 * - Automatic label with required indicator
 * - Visual validation state (idle, valid, error)
 * - Integrated error message with icon
 * - Help text support
 * - Full accessibility (aria-invalid, aria-describedby)
 */
export declare const FormField: ForwardRefExoticComponent<FormFieldProps & RefAttributes<HTMLInputElement>>;

export declare const formFieldInputVariants: (props?: ({
    state?: "error" | "idle" | "valid" | null | undefined;
} & ClassProp) | undefined) => string;

export declare interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size'> {
    /** Unique field ID */
    id: string;
    /** Field label */
    label: string;
    /** Validation state */
    state?: FieldState;
    /** Error message */
    error?: string | null;
    /** Help text displayed below the input */
    helpText?: string;
    /** Additional CSS classes for the container */
    className?: string;
    /** Custom content rendered after the input (e.g., icons) */
    adornment?: ReactNode;
}

export declare function getBodyRegionIcon(region: string | null | undefined): LucideIcon;

export declare function getBodyRegionLabel(region: string | null | undefined): string;

/**
 * Retourne la couleur hex pour une intensité donnée
 */
export declare function getPainColor(intensity: PainIntensity): string;

/**
 * Retourne le label français pour une intensité donnée
 */
export declare function getPainLabel(intensity: PainIntensity): string;

/**
 * Retourne les zones par catégorie
 */
export declare function getZonesByCategory(category: ZoneCategory): BodyZoneDefinition[];

/**
 * Retourne les zones visibles pour une vue donnée
 */
export declare function getZonesForView(view: BodyView): BodyZoneDefinition[];

export declare const iconBgVariants: (props?: ({
    variant?: "warning" | "info" | "danger" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const IconButton: ForwardRefExoticComponent<IconButtonProps & RefAttributes<HTMLButtonElement>>;

export declare interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
    icon: ReactNode;
    label: string;
    loading?: boolean;
}

export declare const iconButtonVariants: (props?: ({
    variant?: "primary" | "accent" | "outline" | "ghost" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Main component for displaying individual scores
 */
export declare function IndividualScoresDisplay({ scores, title, showDetails }: IndividualScoresDisplayProps): JSX.Element | null;

export declare interface IndividualScoresDisplayProps {
    scores: SessionScoreResult[];
    title?: string;
    showDetails?: boolean;
}

export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, Omit<VariantProps<typeof inputVariants>, 'hasError'> {
    label?: string;
    error?: string | null;
    helpText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export declare const inputVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    hasError?: boolean | null | undefined;
    fullWidth?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const IntensitySelector: NamedExoticComponent<IntensitySelectorProps>;

export declare const IntensitySelectorCompact: NamedExoticComponent<IntensitySelectorCompactProps>;

/**
 * IntensitySelectorCompact - Version compacte pour usage inline
 */
export declare interface IntensitySelectorCompactProps {
    value: PainIntensity;
    onChange: (intensity: PainIntensity) => void;
    className?: string;
}

export declare interface IntensitySelectorProps extends VariantProps<typeof intensitySelectorVariants> {
    /** Intensité sélectionnée */
    value: PainIntensity;
    /** Callback quand l'intensité change */
    onChange: (intensity: PainIntensity) => void;
    /** Label de la zone sélectionnée */
    zoneLabel?: string;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Classes CSS additionnelles */
    className?: string;
}

declare const intensitySelectorVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Mapping intensité numérique → clé couleur
 */
export declare const intensityToColorKey: Record<PainIntensity, keyof typeof painColors>;

/**
 * ScoreDisplay Component
 *
 * Displays computed scores from validated questionnaires (STarT Back, LEFS, KOOS, etc.)
 * with color-coded interpretations.
 */
/**
 * Interpretation color type
 */
export declare type InterpretationColor = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray';

/**
 * IndividualScoresDisplay Component
 *
 * Displays individualized scores from the new scoring system (session_score_result).
 * Each score is linked to a score_definition with its own interpretation ranges.
 */
/**
 * Interpretation color type
 */
declare type InterpretationColor_2 = 'green' | 'yellow' | 'orange' | 'red' | 'blue' | 'gray';

/**
 * LoadingSpinner - Reusable loading indicator.
 *
 * Can be used inline or as a full-screen overlay.
 *
 * @example
 * ```tsx
 * <LoadingSpinner fullScreen message="Loading data..." />
 * <LoadingSpinner size="sm" />
 * ```
 */
export declare const LoadingSpinner: ForwardRefExoticComponent<LoadingSpinnerProps & RefAttributes<HTMLDivElement>>;

export declare interface LoadingSpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof loadingSpinnerVariants> {
    /** Message displayed below the spinner */
    message?: string;
    /** Display in full screen mode */
    fullScreen?: boolean;
}

export declare const loadingSpinnerTextVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const loadingSpinnerVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    color?: "primary" | "accent" | "gray" | "white" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Localized text (multilingual JSONB)
 */
export declare type LocalizedText = {
    fr?: string;
    en?: string;
} | string | null | undefined;

export declare interface LocationProfile {
    accessories: string[];
    positions: string[];
}

export declare const LocationProfileSelector: ForwardRefExoticComponent<LocationProfileSelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface LocationProfileSelectorProps extends HTMLAttributes<HTMLDivElement> {
    /** Profil maison sauvegarde (ou null si non configure) */
    homeProfile: LocationProfile | null;
    /** Profil bureau sauvegarde (ou null si non configure) */
    officeProfile: LocationProfile | null;
    /** Accessoires actuellement selectionnes */
    currentAccessories: string[];
    /** Positions actuellement selectionnees */
    currentPositions: string[];
    /** Callback quand un profil est selectionne */
    onSelectProfile: (accessories: string[], positions: string[]) => void;
    /** Callback pour sauvegarder le profil actuel */
    onSaveProfile: (profileType: LocationProfileType) => Promise<void>;
    /** Callback pour supprimer un profil */
    onDeleteProfile: (profileType: LocationProfileType) => Promise<void>;
    /** Desactiver les interactions */
    disabled?: boolean;
}

export declare type LocationProfileType = 'home' | 'office';

export declare const MedicalAlertCR2: ForwardRefExoticComponent<MedicalAlertCR2Props & RefAttributes<HTMLDivElement>>;

export declare interface MedicalAlertCR2Props extends HTMLAttributes<HTMLDivElement> {
    /** Nombre de jours depuis le declenchement de l'alerte */
    daysSinceAlert?: number;
    /** Callback pour contacter le praticien */
    onContactPractitioner?: () => void;
    /** Callback pour fermer l'alerte */
    onDismiss?: () => void;
    /** Affichage en mode compact (banniere au lieu de modal) */
    compact?: boolean;
}

/** Motivation message data */
export declare interface MotivationMessage {
    type: MotivationType;
    variant: MotivationVariant;
    title: string;
    message: string;
    actionLabel?: string;
    actionPath?: string;
}

declare interface MotivationMessage_2 {
    emoji: string;
    message: string;
}

/**
 * DailyMotivationBanner - Contextual daily motivation banner
 *
 * Displays encouraging messages based on time of day, daily goal progress,
 * streak milestones, and end-of-day reminders.
 *
 * @example
 * ```tsx
 * <DailyMotivationBanner
 *   message={motivationMessage}
 *   onDismiss={() => markDayAsOpened()}
 *   onAction={() => navigate(message.actionPath)}
 * />
 * ```
 */
/** Motivation message type identifier */
export declare type MotivationType = 'first_opening' | 'returning' | 'streak_milestone' | 'quota_reminder' | 'almost_done' | 'comeback' | 'evening_reminder' | 'congratulations';

/** Visual variant for the banner */
export declare type MotivationVariant = 'info' | 'success' | 'warning' | 'celebration';

/**
 * OfflineBanner - Fixed banner shown when the device is offline.
 *
 * Prop-based API: the consumer provides `isOffline` and optionally `wasOffline`
 * instead of relying on an internal hook.
 *
 * @example
 * ```tsx
 * const { isOnline, wasOffline, resetWasOffline } = useOnlineStatus()
 * <OfflineBanner
 *   isOffline={!isOnline}
 *   wasOffline={wasOffline}
 *   onReconnectedDismiss={resetWasOffline}
 * />
 * ```
 */
export declare const OfflineBanner: ForwardRefExoticComponent<OfflineBannerProps & RefAttributes<HTMLDivElement>>;

export declare interface OfflineBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, VariantProps<typeof offlineBannerVariants> {
    /** Whether the device is currently offline */
    isOffline: boolean;
    /** Whether the device was previously offline (triggers reconnected message) */
    wasOffline?: boolean;
    /** Callback to reset the wasOffline state after showing reconnected message */
    onReconnectedDismiss?: () => void;
    /** Duration in ms to show the reconnected message (default: 3000) */
    reconnectedDuration?: number;
    /** Offline message text */
    offlineText?: string;
    /** Reconnected message text */
    reconnectedText?: string;
}

export declare const offlineBannerVariants: (props?: ({
    status?: "offline" | "reconnected" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const PAIN_EVOLUTION_OPTIONS: {
    value: PainEvolution;
    label: string;
    Icon: LucideIcon;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}[];

/**
 * Classes Tailwind pour les couleurs de douleur (background)
 */
export declare const painBgClasses: Record<PainIntensity, string>;

/**
 * Classes Tailwind pour les couleurs de douleur (border)
 */
export declare const painBorderClasses: Record<PainIntensity, string>;

/**
 * Couleurs pour l'échelle de douleur (5 niveaux)
 * Utilisées dans AnatomicalBodyMap et EVASlider
 */
export declare const painColors: {
    /** Niveau 0 - Aucune douleur */
    readonly none: "#22c55e";
    /** Niveau 1 - Douleur légère */
    readonly mild: "#84cc16";
    /** Niveau 2 - Douleur modérée */
    readonly moderate: "#eab308";
    /** Niveau 3 - Douleur sévère */
    readonly severe: "#f97316";
    /** Niveau 4 - Douleur extrême */
    readonly extreme: "#ef4444";
};

/** Evolution de la douleur */
export declare type PainEvolution = 'diminuee' | 'aucune' | 'augmentee';

export declare const PainEvolutionSelector: ForwardRefExoticComponent<PainEvolutionSelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface PainEvolutionSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Valeur actuellement selectionnee */
    value: PainEvolution | null;
    /** Callback appele lorsque l'utilisateur change la selection */
    onChange: (value: PainEvolution) => void;
    /** Desactive le selecteur */
    disabled?: boolean;
    /** Label affiche au-dessus */
    label?: string;
}

/**
 * Type pour les niveaux d'intensité de douleur (0-4)
 */
export declare type PainIntensity = 0 | 1 | 2 | 3 | 4;

/**
 * Labels français pour les niveaux de douleur
 */
export declare const painLabels: {
    readonly none: "Aucune";
    readonly mild: "Légère";
    readonly moderate: "Modérée";
    readonly severe: "Sévère";
    readonly extreme: "Extrême";
};

/**
 * Point de douleur sélectionné
 */
export declare interface PainPoint {
    /** Zone anatomique */
    zone: BodyRegion;
    /** Intensité de la douleur (0-4) */
    intensity: PainIntensity;
    /** Vue (face ou dos) */
    side: BodyView;
    /** Notes optionnelles du patient */
    notes?: string;
}

/**
 * Classes Tailwind pour les couleurs de douleur (text)
 */
export declare const painTextClasses: Record<PainIntensity, string>;

/**
 * PatientProfileView - Read-only patient profile display
 *
 * Displays patient information in a read-only context with conditional sections:
 * 1. Account: Email
 * 2. Identity: First name, Last name, Birth date, Gender, Profession
 * 3. Morphology: Weight (kg), Height (cm)
 * 4. Physical activity: Sport level, Sports practiced
 *
 * Each section is only displayed if it contains data.
 *
 * @example
 * ```tsx
 * <PatientProfileView
 *   data={{
 *     email: 'patient@example.com',
 *     firstName: 'Jean',
 *     lastName: 'Dupont',
 *     birthDate: '1990-01-15',
 *     gender: 'male',
 *   }}
 *   showTitle={true}
 * />
 * ```
 */
/** Gender type */
export declare type PatientGender = 'male' | 'female' | 'other';

/** Patient profile data */
export declare interface PatientProfileData {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    gender?: PatientGender;
    profession?: string;
    weight?: number | string;
    height?: number | string;
    sportLevel?: PatientSportLevel;
    sportsPracticed?: string;
}

export declare function PatientProfileView({ data, className, showTitle, loading, error, }: PatientProfileViewProps): JSX.Element;

export declare interface PatientProfileViewProps {
    /** Patient data to display */
    data: PatientProfileData;
    /** Additional CSS classes */
    className?: string;
    /** Show section titles (Account, Identity, etc.) */
    showTitle?: boolean;
    /** Whether the component is in a loading state */
    loading?: boolean;
    /** Error message to display */
    error?: string | null;
}

/** Sport level type */
export declare type PatientSportLevel = 'sedentary' | 'light' | 'moderate' | 'intense' | 'very_intense';

declare type Phase = 'idle' | 'concentric' | 'pause' | 'eccentric';

export declare const PHASE_COLORS: Record<Phase, string>;

export declare const PHASE_LABELS: Record<Phase, string>;

export declare const PhaseCard: ForwardRefExoticComponent<PhaseCardProps & RefAttributes<HTMLDivElement>>;

/**
 * PhaseCard - Carte detaillee affichant la phase actuelle
 */
export declare interface PhaseCardProps extends HTMLAttributes<HTMLDivElement> {
    /** Phase actuelle du patient (1-4) */
    currentPhase: number;
    /** Theme clair ou sombre */
    theme?: 'light' | 'dark';
}

export declare const PhaseIndicator: ForwardRefExoticComponent<PhaseIndicatorProps & RefAttributes<HTMLDivElement>>;

export declare interface PhaseIndicatorProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof phaseIndicatorVariants> {
    /** Phase actuelle du patient (1 = Antalgique, 2 = Stabilisation, 3 = Consolidation, 4 = Prevention) */
    currentPhase: number;
    /** Afficher le nom de la phase */
    showLabel?: boolean;
    /** Afficher la description de la phase */
    showDescription?: boolean;
}

export declare const phaseIndicatorVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    theme?: "light" | "dark" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const PHASES: Array<{
    number: number;
    name: string;
    description: string;
    color: string;
    textColor: string;
    textColorDark: string;
    Icon: LucideIcon;
}>;

export declare const PLAYBACK_RATES: number[];

export declare interface Position {
    key: string;
    label: string;
    iconKey: string;
}

export declare const POSITION_ICONS: Record<string, LucideIcon>;

export declare const PositionSelector: ForwardRefExoticComponent<PositionSelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface PositionSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Liste des positions que le patient peut adopter */
    selectedPositions: string[];
    /** Callback appele lorsque la selection change */
    onChange: (positions: string[]) => void;
    /** Liste des positions disponibles */
    availablePositions: Position[];
    /** Desactive le selecteur */
    disabled?: boolean;
    /** Mode compact : badges en ligne au lieu de grille */
    compact?: boolean;
    /** Label affiche au-dessus */
    label?: string;
    /** Positions de base pour la selection rapide */
    basicPositionKeys?: string[];
}

export declare const PRESET_OPTIONS: {
    value: number;
    label: string;
    description: string;
}[];

export declare const ProgramSelector: ForwardRefExoticComponent<ProgramSelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface ProgramSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    programs: ProgramStats[];
    selectedProgram: ProgramStats | null;
    onSelectProgram: (treatmentFileId: string) => void;
}

export declare interface ProgramStats {
    treatmentFileId: string;
    questionnaire?: {
        bodyRegion?: string | null;
        title?: string;
    };
    questionnaireCompleted?: boolean;
    todayCompleted?: boolean;
    medicalAlertActive?: boolean;
}

export declare const Progress: ForwardRefExoticComponent<ProgressProps & RefAttributes<HTMLDivElement>>;

export declare const progressBarVariants: (props?: ({
    variant?: "gradient" | "default" | "success" | "warning" | "error" | null | undefined;
    animated?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const ProgressionBadge: ForwardRefExoticComponent<ProgressionBadgeProps & RefAttributes<HTMLDivElement>>;

export declare interface ProgressionBadgeProps extends HTMLAttributes<HTMLDivElement> {
    /** Message de progression a afficher */
    message: string;
}

export declare interface ProgressProps extends VariantProps<typeof progressBarVariants>, VariantProps<typeof progressTrackVariants> {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    valueFormat?: (value: number, max: number) => string;
    className?: string;
}

export declare const progressTrackVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Composant QuestionnaireProgress
 * Affiche la progression dans un questionnaire
 */
export declare function QuestionnaireProgress({ currentModule, totalModules, moduleName, currentQuestion, totalQuestionsInModule, totalAnswered, totalQuestions, variant, className, onClose, }: QuestionnaireProgressProps): JSX.Element;

export declare interface QuestionnaireProgressProps extends VariantProps<typeof questionnaireProgressVariants> {
    /** Numéro du module actuel (1-indexed) */
    currentModule: number;
    /** Nombre total de modules */
    totalModules: number;
    /** Nom du module actuel */
    moduleName?: string;
    /** Numéro de la question actuelle dans le module (1-indexed) */
    currentQuestion?: number;
    /** Nombre total de questions dans le module */
    totalQuestionsInModule?: number;
    /** Nombre total de questions répondues dans tout le questionnaire */
    totalAnswered?: number;
    /** Nombre total de questions dans tout le questionnaire */
    totalQuestions?: number;
    /** Classes CSS additionnelles */
    className?: string;
    /** Callback pour fermer/quitter le questionnaire */
    onClose?: () => void;
}

declare const questionnaireProgressVariants: (props?: ({
    variant?: "full" | "compact" | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Rayons de bordure en pixels
 */
export declare const radius: {
    readonly sm: 4;
    readonly md: 8;
    readonly lg: 12;
    readonly xl: 16;
    readonly full: 9999;
};

export declare const RestDaySuggestionModal: ForwardRefExoticComponent<RestDaySuggestionModalProps & RefAttributes<HTMLDivElement>>;

export declare interface RestDaySuggestionModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Modal ouverte ou fermee */
    isOpen: boolean;
    /** Nombre de jours consecutifs d'exercices */
    consecutiveDays: number;
    /** Callback quand le patient choisit de se reposer */
    onTakeRestDay: () => void;
    /** Callback quand le patient veut continuer quand meme */
    onContinueAnyway: () => void;
}

export declare const RIR_LEVELS: Array<{
    value: number;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    Icon: LucideIcon;
}>;

export declare const RIRSelector: ForwardRefExoticComponent<RIRSelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface RIRSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: number | null;
    onChange: (value: number) => void;
    targetMin?: number;
    targetMax?: number;
    disabled?: boolean;
}

export declare const RPE_LEVELS: {
    value: number;
    label: string;
    color: string;
    description: string;
}[];

export declare const RPESelector: ForwardRefExoticComponent<RPESelectorProps & RefAttributes<HTMLDivElement>>;

export declare interface RPESelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value: number | null;
    onChange: (value: number) => void;
    targetMin?: number;
    targetMax?: number;
    disabled?: boolean;
}

/**
 * Score definition from the database
 */
export declare interface ScoreDefinition {
    id: string;
    questionnaireId: string;
    key: string;
    name: LocalizedText;
    description?: LocalizedText;
    minValue: number;
    maxValue: number;
    displayOrder: number;
    higherIsBetter: boolean;
}

/**
 * Main score display component
 */
export declare function ScoreDisplay({ result, title }: ScoreDisplayProps): JSX.Element;

export declare interface ScoreDisplayProps {
    result: ScoringResult;
    title?: string;
}

/**
 * Full scoring result
 */
export declare interface ScoringResult {
    mainScore: ComputedScore;
    subScores: ComputedScore[];
    recommendations: string[];
    computedAt: string;
}

export declare function SegmentedControl<T extends string>({ value, onChange, options, size, fullWidth, className, 'aria-label': ariaLabel, }: SegmentedControlProps<T>): JSX.Element;

export declare interface SegmentedControlOption<T extends string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export declare interface SegmentedControlProps<T extends string> extends VariantProps<typeof segmentedControlVariants> {
    value: T;
    onChange: (value: T) => void;
    options: SegmentedControlOption<T>[];
    className?: string;
    'aria-label'?: string;
}

export declare const segmentedControlVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>>;

export declare interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export declare interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, Omit<VariantProps<typeof selectVariants>, 'hasError' | 'hasValue'> {
    label?: string;
    options: SelectOption[];
    placeholder?: string;
    error?: string | null;
    helpText?: string;
}

export declare const selectVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    hasError?: boolean | null | undefined;
    hasValue?: boolean | null | undefined;
    fullWidth?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const SessionMessages: ForwardRefExoticComponent<SessionMessagesProps & RefAttributes<HTMLDivElement>>;

export declare interface SessionMessagesProps extends HTMLAttributes<HTMLDivElement> {
    /** Messages informatifs de l'algorithme */
    messages: string[];
    /** Alertes importantes a afficher en priorite */
    alerts: string[];
    /** N'afficher que les alertes, pas les messages */
    alertsOnly?: boolean;
    /** Mode compact : juste un badge avec le nombre */
    compact?: boolean;
    /** Callback pour fermer/masquer une alerte */
    onDismissAlert?: (index: number) => void;
}

/**
 * Individual score result stored in session_score_result
 */
export declare interface SessionScoreResult {
    id: string;
    sessionResultId: string;
    scoreDefinitionId: string;
    value: number;
    interpretation: {
        label: LocalizedText;
        color: InterpretationColor_2;
    } | null;
    createdAt: string;
    scoreDefinition?: ScoreDefinition;
}

/**
 * SkipLink - Keyboard navigation skip link (WCAG 2.1 level A, criterion 2.4.1).
 *
 * Visually hidden but becomes visible on focus, allowing keyboard and
 * screen reader users to skip directly to the main content.
 */
export declare const SkipLink: ForwardRefExoticComponent<SkipLinkProps & RefAttributes<HTMLAnchorElement>>;

export declare interface SkipLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** ID of the target element (without the #) */
    targetId?: string;
    /** Link text */
    children?: React.ReactNode;
}

export declare function Slider({ value, onChange, min, max, step, showValue, label, disabled, className, trackColor, thumbColor, showMarks, minLabel, maxLabel, }: SliderProps): JSX.Element;

export declare interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    showValue?: boolean;
    label?: string;
    disabled?: boolean;
    className?: string;
    trackColor?: string;
    thumbColor?: string;
    showMarks?: boolean;
    minLabel?: string;
    maxLabel?: string;
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
export declare const Slot: ForwardRefExoticComponent<SlotProps & RefAttributes<HTMLElement>>;

export declare interface SlotProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
}

/**
 * Espacements en pixels
 * Utilisés pour margins, paddings, gaps
 */
export declare const spacing: {
    readonly xs: 4;
    readonly sm: 8;
    readonly md: 16;
    readonly lg: 24;
    readonly xl: 32;
};

export declare function SportsPracticedInput({ value, onChange, disabled, label, className, }: SportsPracticedInputProps): JSX.Element;

export declare interface SportsPracticedInputProps {
    /** Currently selected sports (comma-separated string) */
    value: string;
    /** Callback when the list changes */
    onChange: (value: string) => void;
    /** Disables the component */
    disabled?: boolean;
    /** Label text */
    label?: string;
    /** Additional CSS classes */
    className?: string;
}

export declare const STATUS_CONFIG: Record<StatusColor, {
    label: string;
    iconColor: string;
    fillColor: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
    description: string;
}>;

/** Couleur du statut V/O/R */
export declare type StatusColor = 'vert' | 'orange' | 'rouge';

export declare function StepProgress({ currentStep, totalSteps, labels, size, className, }: StepProgressProps): JSX.Element;

export declare interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
    labels?: string[];
    size?: 'sm' | 'md';
    className?: string;
}

/** Default suggested sports (most common in France) */
export declare const SUGGESTED_SPORTS: string[];

export declare function SupervisionApprovedBanner({ practitionerNotes, onStartSession, onDismiss, className, }: SupervisionApprovedBannerProps): JSX.Element;

/**
 * SupervisionApprovedBanner - Rehabilitation resumption notification
 *
 * Displayed when the physiotherapist has approved the next session.
 * The patient can resume their rehabilitation.
 */
export declare interface SupervisionApprovedBannerProps {
    /** Practitioner notes (optional) */
    practitionerNotes?: string;
    /** Callback to start the session */
    onStartSession?: () => void;
    /** Callback to dismiss the banner */
    onDismiss?: () => void;
    /** Additional CSS classes */
    className?: string;
}

export declare function SupervisionPendingBanner({ alertReason, alertDate, onDismiss, className, }: SupervisionPendingBannerProps): JSX.Element;

/**
 * SupervisionPendingBanner - Pending supervision notice
 *
 * Displayed when a red session has triggered supervision.
 * The patient sees that their rehabilitation awaits professional validation.
 */
export declare interface SupervisionPendingBannerProps {
    /** Name of the exercise/session that triggered the alert */
    alertReason?: string;
    /** Alert date (ISO string) */
    alertDate?: string;
    /** Callback when the patient clicks "I understand" */
    onDismiss?: () => void;
    /** Additional CSS classes */
    className?: string;
}

/**
 * Body Paths - Silhouette SVG anatomique
 *
 * Approche simplifiée avec formes basiques pour une meilleure fiabilité.
 * ViewBox: 0 0 200 440
 */
export declare const SVG_VIEWBOX: {
    width: number;
    height: number;
    viewBox: string;
};

export declare const Switch: ForwardRefExoticComponent<SwitchProps & RefAttributes<HTMLButtonElement>>;

export declare interface SwitchProps extends Omit<VariantProps<typeof switchVariants>, 'checked'> {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
}

export declare const switchVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    checked?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

export declare const TempoMetronome: ForwardRefExoticComponent<TempoMetronomeProps & RefAttributes<HTMLDivElement>>;

export declare interface TempoMetronomeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onComplete'> {
    /** Tempo au format "X-Y-Z" (ex: "3-0-3") */
    tempo: string;
    /** Nombre de repetitions a faire */
    repetitions?: number;
    /** Callback quand toutes les repetitions sont terminees */
    onComplete?: () => void;
    /** Afficher en mode compact */
    compact?: boolean;
}

export declare const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>>;

export declare interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, Omit<VariantProps<typeof textareaVariants>, 'hasError'> {
    label?: string;
    error?: string | null;
    helpText?: string;
    showCount?: boolean;
}

export declare const textareaVariants: (props?: ({
    hasError?: boolean | null | undefined;
    fullWidth?: boolean | null | undefined;
} & ClassProp) | undefined) => string;

/**
 * Taille minimum des zones tactiles (accessibilité iOS/Android)
 */
export declare const touchTarget: {
    readonly min: 44;
};

export declare const VideoPlayer: ForwardRefExoticComponent<VideoPlayerProps & RefAttributes<HTMLDivElement>>;

export declare interface VideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onPlay' | 'onPause'> {
    /** URL de la video */
    src: string;
    /** Lancer automatiquement */
    autoPlay?: boolean;
    /** Boucler la video */
    loop?: boolean;
    /** Afficher les controles natifs en fallback */
    showNativeControls?: boolean;
    /** Callback quand la video se termine */
    onEnded?: () => void;
    /** Callback quand la video demarre */
    onPlay?: () => void;
    /** Callback quand la video est en pause */
    onPause?: () => void;
    /** Controle externe du play/pause */
    isPlaying?: boolean;
    /** Poster/thumbnail */
    poster?: string;
}

export declare const VORBadge: NamedExoticComponent<VORBadgeProps & RefAttributes<HTMLDivElement>>;

export declare interface VORBadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'status'>, VariantProps<typeof vorBadgeVariants> {
    /** Couleur du statut V/O/R */
    status: StatusColor;
    /** Afficher le texte "Vert/Orange/Rouge" ? */
    showLabel?: boolean;
    /** Animation de pulsation (utile pour ROUGE) ? */
    animated?: boolean;
}

export declare const vorBadgeVariants: (props?: ({
    status?: "orange" | "vert" | "rouge" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const VORProgressBar: NamedExoticComponent<VORProgressBarProps & RefAttributes<HTMLDivElement>>;

/**
 * VORProgressBar - Barre de progression V/O/R horizontale
 */
export declare interface VORProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    vert: number;
    orange: number;
    rouge: number;
    height?: number;
}

export declare const VORStats: NamedExoticComponent<VORStatsProps & RefAttributes<HTMLDivElement>>;

/**
 * VORStats - Affiche les statistiques V/O/R avec camembert
 */
export declare interface VORStatsProps extends HTMLAttributes<HTMLDivElement> {
    vert: number;
    orange: number;
    rouge: number;
    showPieChart?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Catégorie de zone corporelle
 */
export declare type ZoneCategory = 'head_neck' | 'upper_limb' | 'trunk' | 'spine' | 'lower_limb' | 'foot';

export declare function ZoneDetailSheet({ open, onClose, zone, point, onIntensityChange, onNotesChange, onRemove, }: ZoneDetailSheetProps): JSX.Element;

export declare interface ZoneDetailSheetProps {
    /** État d'ouverture */
    open: boolean;
    /** Callback de fermeture */
    onClose: () => void;
    /** Définition de la zone */
    zone: BodyZoneDefinition;
    /** Point de douleur existant (si sélectionné) */
    point: PainPoint | null;
    /** Callback quand l'intensité change */
    onIntensityChange: (intensity: PainIntensity) => void;
    /** Callback quand les notes changent */
    onNotesChange: (notes: string) => void;
    /** Callback pour supprimer le point */
    onRemove: () => void;
}

export { }
