/**
 * TempoMetronome - Metronome visuel pour le tempo des exercices HSR
 *
 * Le tempo definit la vitesse d'execution d'un exercice :
 * Format "X-Y-Z" (ex: "3-0-3")
 * X = concentrique, Y = pause, Z = excentrique
 *
 * @component
 */

import { useState, useEffect, useRef, type HTMLAttributes, forwardRef } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'
import { cn } from '../cn'

export interface TempoMetronomeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onComplete'> {
  /** Tempo au format "X-Y-Z" (ex: "3-0-3") */
  tempo: string
  /** Nombre de repetitions a faire */
  repetitions?: number
  /** Callback quand toutes les repetitions sont terminees */
  onComplete?: () => void
  /** Afficher en mode compact */
  compact?: boolean
}

type Phase = 'idle' | 'concentric' | 'pause' | 'eccentric'

const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Pret',
  concentric: 'Montee',
  pause: 'Pause',
  eccentric: 'Descente',
}

const PHASE_COLORS: Record<Phase, string> = {
  idle: '#6b7280',
  concentric: '#3b82f6',
  pause: '#8b5cf6',
  eccentric: '#f59e0b',
}

export const TempoMetronome = forwardRef<HTMLDivElement, TempoMetronomeProps>(
  function TempoMetronome(
    { tempo, repetitions, onComplete, compact = false, className, ...props },
    ref
  ) {
    const [concentric, pauseDuration, eccentric] = tempo.split('-').map(Number)

    const [isRunning, setIsRunning] = useState(false)
    const [currentPhase, setCurrentPhase] = useState<Phase>('idle')
    const [timeInPhase, setTimeInPhase] = useState(0)
    const [currentRep, setCurrentRep] = useState(0)
    const [totalReps, setTotalReps] = useState(0)

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const getPhaseDuration = (phase: Phase): number => {
      switch (phase) {
        case 'concentric': return concentric
        case 'pause': return pauseDuration
        case 'eccentric': return eccentric
        default: return 0
      }
    }

    const getNextPhase = (phase: Phase): Phase => {
      switch (phase) {
        case 'idle':
        case 'eccentric': return 'concentric'
        case 'concentric': return pauseDuration > 0 ? 'pause' : 'eccentric'
        case 'pause': return 'eccentric'
        default: return 'concentric'
      }
    }

    useEffect(() => {
      if (isRunning) {
        intervalRef.current = setInterval(() => {
          setTimeInPhase((prev) => {
            const phaseDuration = getPhaseDuration(currentPhase)
            if (prev >= phaseDuration - 1) {
              const nextPhase = getNextPhase(currentPhase)

              if (currentPhase === 'eccentric') {
                const newRep = currentRep + 1
                setCurrentRep(newRep)
                setTotalReps((t) => t + 1)

                if (repetitions && newRep >= repetitions) {
                  setIsRunning(false)
                  setCurrentPhase('idle')
                  onComplete?.()
                  return 0
                }
              }

              setCurrentPhase(nextPhase)
              return 0
            }
            return prev + 1
          })
        }, 1000)
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [isRunning, currentPhase, currentRep, repetitions, concentric, eccentric, pauseDuration, onComplete])

    const handlePlayPause = () => {
      if (isRunning) {
        setIsRunning(false)
      } else {
        if (currentPhase === 'idle') setCurrentPhase('concentric')
        setIsRunning(true)
      }
    }

    const handleReset = () => {
      setIsRunning(false)
      setCurrentPhase('idle')
      setTimeInPhase(0)
      setCurrentRep(0)
    }

    const phaseDuration = getPhaseDuration(currentPhase)
    const progress = phaseDuration > 0 ? timeInPhase / phaseDuration : 0
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference * (1 - progress)

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200', className)}
          {...props}
        >
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span
                className="text-lg font-bold"
                style={{ color: PHASE_COLORS[currentPhase] }}
              >
                {PHASE_LABELS[currentPhase]}
              </span>
              <span className="text-sm text-gray-500">
                {phaseDuration - timeInPhase}s
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Tempo: {tempo}
              {repetitions && ` | Rep ${currentRep + 1}/${repetitions}`}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('bg-white rounded-xl border border-gray-200 p-4', className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Tempo</h3>
            <p className="text-sm text-gray-500">
              {concentric}s montee - {pauseDuration}s pause - {eccentric}s descente
            </p>
          </div>
          {repetitions && (
            <div className="text-right">
              <p className="text-lg font-bold text-primary-600">
                {currentRep}/{repetitions}
              </p>
              <p className="text-xs text-gray-500">repetitions</p>
            </div>
          )}
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <circle
                cx="64" cy="64" r="45" fill="none"
                stroke={PHASE_COLORS[currentPhase]}
                strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-3xl font-bold tabular-nums"
                style={{ color: PHASE_COLORS[currentPhase] }}
              >
                {phaseDuration - timeInPhase}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: PHASE_COLORS[currentPhase] }}
              >
                {PHASE_LABELS[currentPhase]}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {(['concentric', 'pause', 'eccentric'] as const).map((phase) => (
            <div
              key={phase}
              className={cn(
                'flex flex-col items-center',
                currentPhase === phase ? 'opacity-100' : 'opacity-40'
              )}
            >
              <div
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: PHASE_COLORS[phase] }}
              />
              <span className="text-xs text-gray-600">
                {phase === 'concentric' ? `${concentric}s` : phase === 'pause' ? `${pauseDuration}s` : `${eccentric}s`}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
        </div>

        {totalReps > 0 && (
          <p className="text-center text-xs text-gray-500 mt-3">
            {totalReps} repetition{totalReps > 1 ? 's' : ''} completee{totalReps > 1 ? 's' : ''}
          </p>
        )}
      </div>
    )
  }
)

export { PHASE_LABELS, PHASE_COLORS }
