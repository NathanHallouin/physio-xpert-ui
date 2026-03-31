/**
 * VideoPlayer - Lecteur video avec controles avances
 *
 * Fonctionnalites :
 * - Play/Pause avec touche espace
 * - Barre de progression cliquable
 * - Controle de vitesse (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
 * - Replay, Mode plein ecran, Compteur de temps
 *
 * @component
 */

import { useRef, useState, useEffect, useCallback, type HTMLAttributes, forwardRef } from 'react'
import { cn } from '../cn'

export interface VideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onPlay' | 'onPause'> {
  /** URL de la video */
  src: string
  /** Lancer automatiquement */
  autoPlay?: boolean
  /** Boucler la video */
  loop?: boolean
  /** Afficher les controles natifs en fallback */
  showNativeControls?: boolean
  /** Callback quand la video se termine */
  onEnded?: () => void
  /** Callback quand la video demarre */
  onPlay?: () => void
  /** Callback quand la video est en pause */
  onPause?: () => void
  /** Controle externe du play/pause */
  isPlaying?: boolean
  /** Poster/thumbnail */
  poster?: string
}

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2]

export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  function VideoPlayer(
    {
      src,
      autoPlay = false,
      loop = false,
      showNativeControls = false,
      onEnded,
      onPlay,
      onPause,
      isPlaying: externalIsPlaying,
      poster,
      className,
      ...props
    },
    ref
  ) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [showControls, setShowControls] = useState(true)
    const [showSpeedMenu, setShowSpeedMenu] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const togglePlay = useCallback(() => {
      const video = videoRef.current
      if (!video) return

      if (video.paused) {
        video.play()
        setIsPlaying(true)
        onPlay?.()
      } else {
        video.pause()
        setIsPlaying(false)
        onPause?.()
      }
    }, [onPlay, onPause])

    const handleReplay = useCallback(() => {
      const video = videoRef.current
      if (!video) return

      video.currentTime = 0
      video.play()
      setIsPlaying(true)
      onPlay?.()
    }, [onPlay])

    const handleSpeedChange = useCallback((rate: number) => {
      const video = videoRef.current
      if (!video) return

      video.playbackRate = rate
      setPlaybackRate(rate)
      setShowSpeedMenu(false)
    }, [])

    const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current
      const progress = progressRef.current
      if (!video || !progress) return

      const rect = progress.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * duration

      video.currentTime = newTime
      setCurrentTime(newTime)
    }, [duration])

    const toggleFullscreen = useCallback(() => {
      const container = containerRef.current
      if (!container) return

      if (!document.fullscreenElement) {
        container.requestFullscreen().then(() => {
          setIsFullscreen(true)
        }).catch(() => {})
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        }).catch(() => {})
      }
    }, [])

    const showControlsWithTimeout = useCallback(() => {
      setShowControls(true)

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }

      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
          setShowSpeedMenu(false)
        }, 3000)
      }
    }, [isPlaying])

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return
        }

        const video = videoRef.current
        if (!video) return

        switch (e.key) {
          case ' ':
            e.preventDefault()
            togglePlay()
            break
          case 'ArrowLeft':
            e.preventDefault()
            video.currentTime = Math.max(0, video.currentTime - 5)
            break
          case 'ArrowRight':
            e.preventDefault()
            video.currentTime = Math.min(duration, video.currentTime + 5)
            break
          case 'f':
          case 'F':
            e.preventDefault()
            toggleFullscreen()
            break
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [togglePlay, toggleFullscreen, duration])

    useEffect(() => {
      const video = videoRef.current
      if (!video || externalIsPlaying === undefined) return

      if (externalIsPlaying && video.paused) {
        video.play()
        setIsPlaying(true)
      } else if (!externalIsPlaying && !video.paused) {
        video.pause()
        setIsPlaying(false)
      }
    }, [externalIsPlaying])

    useEffect(() => {
      const video = videoRef.current
      if (!video) return

      const handleTimeUpdate = () => setCurrentTime(video.currentTime)
      const handleLoadedMetadata = () => setDuration(video.duration)
      const handleEnded = () => { setIsPlaying(false); onEnded?.() }
      const handlePlay = () => { setIsPlaying(true); onPlay?.() }
      const handlePause = () => { setIsPlaying(false); onPause?.() }

      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('ended', handleEnded)
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('ended', handleEnded)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
      }
    }, [onEnded, onPlay, onPause])

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
      }
      document.addEventListener('fullscreenchange', handleFullscreenChange)
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    useEffect(() => {
      return () => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
      }
    }, [])

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
      <div
        ref={(node) => {
          // Merge refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={cn('relative bg-black group', className)}
        onMouseMove={showControlsWithTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        {...props}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          loop={loop}
          muted
          playsInline
          autoPlay={autoPlay}
          controls={showNativeControls}
          className="w-full h-full object-contain"
          onClick={togglePlay}
        />

        {!showNativeControls && (
          <div
            className={cn(
              'absolute inset-0 flex flex-col justify-end transition-opacity duration-300',
              showControls ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <div className={cn(
                'w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center transition-transform',
                showControls ? 'scale-100' : 'scale-0'
              )}>
                {isPlaying ? (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </button>

            <div className="relative z-10 px-4 pb-4 space-y-2">
              <div
                ref={progressRef}
                className="h-1 bg-white/30 rounded-full cursor-pointer group/progress"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-cyan-500 rounded-full relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-cyan-400 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={handleReplay}
                    className="text-white hover:text-cyan-400 transition-colors"
                    aria-label="Replay"
                    title="Replay"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>

                  <span className="text-white text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="text-white hover:text-cyan-400 transition-colors text-sm font-medium px-2 py-1 rounded bg-white/10"
                      aria-label="Vitesse de lecture"
                      title="Vitesse de lecture"
                    >
                      {playbackRate}x
                    </button>

                    {showSpeedMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        {PLAYBACK_RATES.map((rate) => (
                          <button
                            key={rate}
                            onClick={() => handleSpeedChange(rate)}
                            className={cn(
                              'block w-full px-4 py-2 text-sm text-left transition-colors',
                              playbackRate === rate
                                ? 'bg-cyan-500 text-white'
                                : 'text-gray-300 hover:bg-gray-700'
                            )}
                          >
                            {rate}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-cyan-400 transition-colors"
                    aria-label={isFullscreen ? 'Quitter le plein ecran' : 'Plein ecran'}
                    title={isFullscreen ? 'Quitter le plein ecran' : 'Plein ecran'}
                  >
                    {isFullscreen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {duration === 0 && src && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>
    )
  }
)

export { PLAYBACK_RATES }
