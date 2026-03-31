/**
 * LocationProfileSelector - Selection rapide de profils Maison/Bureau
 *
 * Permet au patient de selectionner rapidement un profil sauvegarde,
 * sauvegarder la configuration actuelle, ou supprimer un profil.
 *
 * @component
 */

import { useState, type HTMLAttributes, forwardRef } from 'react'
import { Home, Building2, Save, Check, X, Trash2 } from 'lucide-react'
import { cn } from '../cn'

export type LocationProfileType = 'home' | 'office'

export interface LocationProfile {
  accessories: string[]
  positions: string[]
}

export interface LocationProfileSelectorProps extends HTMLAttributes<HTMLDivElement> {
  /** Profil maison sauvegarde (ou null si non configure) */
  homeProfile: LocationProfile | null
  /** Profil bureau sauvegarde (ou null si non configure) */
  officeProfile: LocationProfile | null
  /** Accessoires actuellement selectionnes */
  currentAccessories: string[]
  /** Positions actuellement selectionnees */
  currentPositions: string[]
  /** Callback quand un profil est selectionne */
  onSelectProfile: (accessories: string[], positions: string[]) => void
  /** Callback pour sauvegarder le profil actuel */
  onSaveProfile: (profileType: LocationProfileType) => Promise<void>
  /** Callback pour supprimer un profil */
  onDeleteProfile: (profileType: LocationProfileType) => Promise<void>
  /** Desactiver les interactions */
  disabled?: boolean
}

export const LocationProfileSelector = forwardRef<HTMLDivElement, LocationProfileSelectorProps>(
  function LocationProfileSelector(
    {
      homeProfile,
      officeProfile,
      currentAccessories,
      currentPositions,
      onSelectProfile,
      onSaveProfile,
      onDeleteProfile,
      disabled = false,
      className,
      ...props
    },
    ref
  ) {
    const [activeProfile, setActiveProfile] = useState<LocationProfileType | null>(null)
    const [savingProfile, setSavingProfile] = useState<LocationProfileType | null>(null)
    const [showSaveConfirm, setShowSaveConfirm] = useState<LocationProfileType | null>(null)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<LocationProfileType | null>(null)

    const handleSelectProfile = (profileType: LocationProfileType) => {
      const profile = profileType === 'home' ? homeProfile : officeProfile
      if (profile) {
        setActiveProfile(profileType)
        onSelectProfile(profile.accessories, profile.positions)
      }
    }

    const handleSaveProfile = async (profileType: LocationProfileType) => {
      setSavingProfile(profileType)
      try {
        await onSaveProfile(profileType)
        setShowSaveConfirm(null)
        setActiveProfile(profileType)
      } finally {
        setSavingProfile(null)
      }
    }

    const handleDeleteProfile = async (profileType: LocationProfileType) => {
      try {
        await onDeleteProfile(profileType)
        setShowDeleteConfirm(null)
        if (activeProfile === profileType) setActiveProfile(null)
      } catch (error) {
        console.error('Error deleting profile:', error)
      }
    }

    const formatProfileInfo = (profile: LocationProfile | null): string => {
      if (!profile) return 'Non configure'
      const accCount = profile.accessories.filter(a => a !== 'aucun').length
      const posCount = profile.positions.length
      const parts = []
      if (accCount > 0) parts.push(`${accCount} accessoire${accCount > 1 ? 's' : ''}`)
      if (posCount > 0) parts.push(`${posCount} position${posCount > 1 ? 's' : ''}`)
      return parts.join(', ') || 'Aucun accessoire'
    }

    const isProfileActive = (profileType: LocationProfileType): boolean => {
      return activeProfile === profileType
    }

    const canSaveToProfile = (profileType: LocationProfileType): boolean => {
      const profile = profileType === 'home' ? homeProfile : officeProfile
      if (!profile) return true

      const sameAccessories = JSON.stringify([...currentAccessories].sort()) ===
                             JSON.stringify([...profile.accessories].sort())
      const samePositions = JSON.stringify([...currentPositions].sort()) ===
                           JSON.stringify([...profile.positions].sort())

      return !sameAccessories || !samePositions
    }

    return (
      <div ref={ref} className={cn('space-y-3', className)} {...props}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">Profils rapides</h4>
          <span className="text-xs text-gray-500">Selection en 1 clic</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Profil Maison */}
          <div className="relative">
            <button
              onClick={() => homeProfile && handleSelectProfile('home')}
              disabled={disabled || !homeProfile}
              className={cn(
                'w-full p-3 rounded-lg border-2 transition-all text-left',
                isProfileActive('home')
                  ? 'border-emerald-500 bg-emerald-50'
                  : homeProfile
                    ? 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                    : 'border-dashed border-gray-300 bg-gray-50 cursor-default',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-start gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  isProfileActive('home')
                    ? 'bg-emerald-500 text-white'
                    : homeProfile ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'
                )}>
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className={cn('text-sm font-medium', homeProfile ? 'text-gray-900' : 'text-gray-500')}>
                      Maison
                    </span>
                    {isProfileActive('home') && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{formatProfileInfo(homeProfile)}</p>
                </div>
              </div>
            </button>

            <div className="absolute -top-1 -right-1 flex gap-1">
              {homeProfile && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm('home') }}
                  className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                  title="Supprimer le profil"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {canSaveToProfile('home') && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSaveConfirm('home') }}
                  className="w-5 h-5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 flex items-center justify-center transition-colors"
                  title="Sauvegarder comme profil maison"
                >
                  <Save className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Profil Bureau */}
          <div className="relative">
            <button
              onClick={() => officeProfile && handleSelectProfile('office')}
              disabled={disabled || !officeProfile}
              className={cn(
                'w-full p-3 rounded-lg border-2 transition-all text-left',
                isProfileActive('office')
                  ? 'border-blue-500 bg-blue-50'
                  : officeProfile
                    ? 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                    : 'border-dashed border-gray-300 bg-gray-50 cursor-default',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-start gap-2">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                  isProfileActive('office')
                    ? 'bg-blue-500 text-white'
                    : officeProfile ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'
                )}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className={cn('text-sm font-medium', officeProfile ? 'text-gray-900' : 'text-gray-500')}>
                      Bureau
                    </span>
                    {isProfileActive('office') && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{formatProfileInfo(officeProfile)}</p>
                </div>
              </div>
            </button>

            <div className="absolute -top-1 -right-1 flex gap-1">
              {officeProfile && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm('office') }}
                  className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                  title="Supprimer le profil"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              {canSaveToProfile('office') && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSaveConfirm('office') }}
                  className="w-5 h-5 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                  title="Sauvegarder comme profil bureau"
                >
                  <Save className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {!homeProfile && !officeProfile && (
          <p className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-2">
            Configurez vos accessoires et positions ci-dessous, puis cliquez sur
            <Save className="w-3 h-3 inline mx-1" />
            pour sauvegarder un profil.
          </p>
        )}

        {/* Modal de confirmation sauvegarde */}
        {showSaveConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', showSaveConfirm === 'home' ? 'bg-emerald-100' : 'bg-blue-100')}>
                  {showSaveConfirm === 'home'
                    ? <Home className="w-5 h-5 text-emerald-600" />
                    : <Building2 className="w-5 h-5 text-blue-600" />
                  }
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Sauvegarder le profil {showSaveConfirm === 'home' ? 'Maison' : 'Bureau'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Cette action remplacera le profil existant
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600">
                <p className="font-medium mb-1">Configuration actuelle :</p>
                <p>- {currentAccessories.filter(a => a !== 'aucun').length || 'Aucun'} accessoire(s)</p>
                <p>- {currentPositions.length} position(s)</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveConfirm(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleSaveProfile(showSaveConfirm)}
                  disabled={savingProfile === showSaveConfirm}
                  className={cn(
                    'flex-1 py-2.5 px-4 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2',
                    showSaveConfirm === 'home' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'
                  )}
                >
                  {savingProfile === showSaveConfirm ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Sauvegarder
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmation suppression */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Supprimer le profil {showDeleteConfirm === 'home' ? 'Maison' : 'Bureau'}
                  </h3>
                  <p className="text-sm text-gray-500">Cette action est irreversible</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDeleteProfile(showDeleteConfirm)}
                  className="flex-1 py-2.5 px-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)
