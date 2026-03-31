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

import { cn } from '../cn'

/** Gender type */
export type PatientGender = 'male' | 'female' | 'other'

/** Sport level type */
export type PatientSportLevel = 'sedentary' | 'light' | 'moderate' | 'intense' | 'very_intense'

/** Patient profile data */
export interface PatientProfileData {
  email?: string
  firstName?: string
  lastName?: string
  birthDate?: string
  gender?: PatientGender
  profession?: string
  weight?: number | string
  height?: number | string
  sportLevel?: PatientSportLevel
  sportsPracticed?: string
}

export interface PatientProfileViewProps {
  /** Patient data to display */
  data: PatientProfileData
  /** Additional CSS classes */
  className?: string
  /** Show section titles (Account, Identity, etc.) */
  showTitle?: boolean
  /** Whether the component is in a loading state */
  loading?: boolean
  /** Error message to display */
  error?: string | null
}

const GENDER_LABELS: Record<PatientGender, string> = {
  male: 'Homme',
  female: 'Femme',
  other: 'Autre',
}

const SPORT_LEVEL_LABELS: Record<PatientSportLevel, string> = {
  sedentary: 'Sedentaire',
  light: 'Leger (1-2x/semaine)',
  moderate: 'Modere (3-4x/semaine)',
  intense: 'Intense (5-6x/semaine)',
  very_intense: 'Tres intense (quotidien)',
}

function FieldDisplay({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
        {value}
      </div>
    </div>
  )
}

export function PatientProfileView({
  data,
  className,
  showTitle = true,
  loading = false,
  error = null,
}: PatientProfileViewProps) {
  const {
    email,
    firstName,
    lastName,
    birthDate,
    gender,
    profession,
    weight,
    height,
    sportLevel,
    sportsPracticed,
  } = data

  const weightStr = weight?.toString() || ''
  const heightStr = height?.toString() || ''

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full" />
          <p className="text-gray-500 text-sm">Chargement du profil...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      {/* Section: Account */}
      <div className="mb-6">
        {showTitle && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Compte</h3>}
        <div className="space-y-4">
          {email && <FieldDisplay label="Email" value={email} />}
        </div>
      </div>

      {/* Section: Identity */}
      {(firstName || lastName || birthDate || gender || profession) && (
        <div className="mb-6 border-t border-gray-200 pt-6">
          {showTitle && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Identite</h3>}
          <div className="space-y-4">
            {(firstName || lastName) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {firstName && <FieldDisplay label="Prenom" value={firstName} />}
                {lastName && <FieldDisplay label="Nom" value={lastName} />}
              </div>
            )}

            {(birthDate || gender) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {birthDate && (
                  <FieldDisplay
                    label="Date de naissance"
                    value={new Date(birthDate).toLocaleDateString('fr-FR')}
                  />
                )}
                {gender && (
                  <FieldDisplay label="Genre" value={GENDER_LABELS[gender]} />
                )}
              </div>
            )}

            {profession && <FieldDisplay label="Profession" value={profession} />}
          </div>
        </div>
      )}

      {/* Section: Morphology */}
      {(weightStr || heightStr) && (
        <div className="mb-6 border-t border-gray-200 pt-6">
          {showTitle && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Morphologie</h3>}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weightStr && <FieldDisplay label="Poids" value={`${weightStr} kg`} />}
              {heightStr && <FieldDisplay label="Taille" value={`${heightStr} cm`} />}
            </div>
          </div>
        </div>
      )}

      {/* Section: Physical activity */}
      {(sportLevel || sportsPracticed) && (
        <div className="mb-6 border-t border-gray-200 pt-6">
          {showTitle && <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Activite physique</h3>}
          <div className="space-y-4">
            {sportLevel && (
              <FieldDisplay
                label="Niveau d'activite physique"
                value={SPORT_LEVEL_LABELS[sportLevel]}
              />
            )}
            {sportsPracticed && (
              <FieldDisplay label="Sports pratiques" value={sportsPracticed} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
