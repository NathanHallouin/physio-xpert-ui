/**
 * DemoVideoPlayer - Lecteur de vidéo de démonstration
 *
 * Affiche une vidéo de démonstration avant une question.
 * Le patient doit regarder la vidéo et cliquer sur "J'ai compris" pour continuer.
 */

import { useState, useRef } from 'react'
import { Button } from '../button'
import { Play, CheckCircle, RotateCcw } from 'lucide-react'

export interface DemoVideoPlayerProps {
  /** URL de la vidéo (YouTube, Vimeo, ou lien direct) */
  videoUrl: string
  /** Instructions à afficher avec la vidéo */
  instructions?: string
  /** Callback appelé quand le patient a vu la vidéo */
  onContinue: () => void
}

/**
 * Extrait l'URL d'embed à partir de différents formats de liens vidéo
 */
function getEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'direct' | null; embedUrl: string | null } {
  if (!url) return { type: null, embedUrl: null }

  // YouTube
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return videoId
      ? { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${videoId}` }
      : { type: null, embedUrl: null }
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return videoId
      ? { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${videoId}` }
      : { type: null, embedUrl: null }
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    return videoId
      ? { type: 'vimeo', embedUrl: `https://player.vimeo.com/video/${videoId}` }
      : { type: null, embedUrl: null }
  }

  // Direct video URL
  if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    return { type: 'direct', embedUrl: url }
  }

  return { type: null, embedUrl: null }
}

export function DemoVideoPlayer({ videoUrl, instructions, onContinue }: DemoVideoPlayerProps) {
  const [hasWatched, setHasWatched] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { type, embedUrl } = getEmbedUrl(videoUrl)

  const handleVideoEnd = () => {
    setHasWatched(true)
    setIsPlaying(false)
  }

  const handlePlayDirect = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleReplay = () => {
    setHasWatched(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  if (!embedUrl) {
    // URL invalide, permettre de continuer quand même
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800 mb-4">
          La vidéo de démonstration n'a pas pu être chargée.
        </p>
        <Button onClick={onContinue} fullWidth size="lg">
          Continuer sans vidéo
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Instructions */}
      {instructions && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">{instructions}</p>
        </div>
      )}

      {/* Video Player */}
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {type === 'direct' ? (
          <>
            <video
              ref={videoRef}
              src={embedUrl}
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
              controls={isPlaying}
            />
            {!isPlaying && !hasWatched && (
              <button
                onClick={handlePlayDirect}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-10 h-10 text-cyan-600 ml-1" />
                </div>
              </button>
            )}
          </>
        ) : (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Vidéo de démonstration"
            onLoad={() => {
              // Pour YouTube/Vimeo, on considère que la vidéo a été vue après quelques secondes
              setTimeout(() => setHasWatched(true), 5000)
            }}
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {hasWatched && type === 'direct' && (
          <Button
            variant="outline"
            onClick={handleReplay}
            fullWidth
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Revoir la vidéo
          </Button>
        )}

        <Button
          variant="primary"
          onClick={onContinue}
          disabled={!hasWatched && type !== 'youtube' && type !== 'vimeo'}
          fullWidth
          size="lg"
          leftIcon={<CheckCircle className="w-5 h-5" />}
          className="shadow-md"
        >
          J'ai compris, continuer
        </Button>

        {!hasWatched && type === 'direct' && (
          <p className="text-xs text-center text-gray-500">
            Regardez la vidéo en entier pour pouvoir continuer
          </p>
        )}
      </div>
    </div>
  )
}
