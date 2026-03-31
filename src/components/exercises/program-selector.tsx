/**
 * ProgramSelector - Selecteur de programme de reeducation
 *
 * Permet au patient de basculer entre ses differents programmes actifs
 * (ex: lombaire, cervical) quand il en a plusieurs.
 *
 * @component
 */

import { type HTMLAttributes, forwardRef } from 'react'
import {
  ArrowLeft,
  Grip,
  Dumbbell,
  Footprints,
  Hand,
  Bone,
  Heart,
  ClipboardList,
  Check,
  AlertTriangle,
  FileQuestion,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../cn'

export interface ProgramStats {
  treatmentFileId: string
  questionnaire?: {
    bodyRegion?: string | null
    title?: string
  }
  questionnaireCompleted?: boolean
  todayCompleted?: boolean
  medicalAlertActive?: boolean
}

export interface ProgramSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  programs: ProgramStats[]
  selectedProgram: ProgramStats | null
  onSelectProgram: (treatmentFileId: string) => void
}

const BODY_REGION_ICONS: Record<string, LucideIcon> = {
  lumbar: ArrowLeft,
  cervical: Grip,
  shoulder: Dumbbell,
  knee: Footprints,
  ankle: Footprints,
  hip: Bone,
  thoracic: Heart,
  elbow: Dumbbell,
  wrist: Hand,
}

function getBodyRegionIcon(region: string | null | undefined): LucideIcon {
  if (region && BODY_REGION_ICONS[region]) return BODY_REGION_ICONS[region]
  return ClipboardList
}

function getBodyRegionLabel(region: string | null | undefined): string {
  switch (region) {
    case 'lumbar': return 'Lombaire'
    case 'cervical': return 'Cervical'
    case 'shoulder': return 'Epaule'
    case 'knee': return 'Genou'
    case 'ankle': return 'Cheville'
    case 'hip': return 'Hanche'
    case 'thoracic': return 'Thoracique'
    case 'elbow': return 'Coude'
    case 'wrist': return 'Poignet'
    default: return 'Programme'
  }
}

export const ProgramSelector = forwardRef<HTMLDivElement, ProgramSelectorProps>(
  function ProgramSelector(
    { programs, selectedProgram, onSelectProgram, className, ...props },
    ref
  ) {
    if (programs.length <= 1) return null

    return (
      <div ref={ref} className={cn('mb-4', className)} {...props}>
        <p className="text-xs text-gray-500 mb-2">
          {programs.length} programmes actifs - Selectionnez celui a afficher :
        </p>
        <div className="flex flex-wrap gap-2">
          {programs.map((program) => {
            const isSelected = selectedProgram?.treatmentFileId === program.treatmentFileId
            const region = program.questionnaire?.bodyRegion
            const IconComponent = getBodyRegionIcon(region)
            const label = program.questionnaire?.title || getBodyRegionLabel(region)
            const hasCompletedQuestionnaire = program.questionnaireCompleted

            return (
              <button
                key={program.treatmentFileId}
                onClick={() => onSelectProgram(program.treatmentFileId)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                  isSelected
                    ? hasCompletedQuestionnaire
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-amber-500 text-white shadow-md'
                    : hasCompletedQuestionnaire
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                )}
                title={!hasCompletedQuestionnaire ? 'Questionnaire non complete' : undefined}
              >
                <IconComponent className={cn('w-4 h-4', isSelected ? 'text-white' : hasCompletedQuestionnaire ? 'text-gray-500' : 'text-amber-500')} />
                <span className="truncate max-w-[120px]">{label}</span>
                {!hasCompletedQuestionnaire && (
                  <FileQuestion className={cn('w-4 h-4 ml-1', isSelected ? 'text-white/80' : 'text-amber-500')} />
                )}
                {hasCompletedQuestionnaire && program.todayCompleted && (
                  <Check className={cn('w-4 h-4 ml-1', isSelected ? 'text-white/80' : 'text-green-600')} />
                )}
                {program.medicalAlertActive && (
                  <AlertTriangle className={cn('w-4 h-4 ml-1', isSelected ? 'text-white/80' : 'text-red-500')} />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
)

export { BODY_REGION_ICONS, getBodyRegionIcon, getBodyRegionLabel }
