'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface VideoPlayerProps {
  videoUrl: string
  videoFilename: string
  accessToken: string
  initialProgress?: number
  onProgressUpdate?: (watchedSeconds: number, totalSeconds: number, completed: boolean) => void
  onEnded?: () => void
}

export function VideoPlayer({
  videoUrl,
  videoFilename,
  accessToken,
  initialProgress = 0,
  onProgressUpdate,
  onEnded,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const lastSaveRef = useRef(0)

  // Formater le temps en mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Sauvegarder la progression
  const saveProgress = useCallback(async (watchedSeconds: number, totalSeconds: number) => {
    const completed = totalSeconds > 0 && (watchedSeconds / totalSeconds) >= 0.9

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken,
          videoFilename,
          watchedSeconds,
          totalSeconds,
        }),
      })

      onProgressUpdate?.(watchedSeconds, totalSeconds, completed)
    } catch (err) {
      console.error('Failed to save progress:', err)
    }
  }, [accessToken, videoFilename, onProgressUpdate])

  // Gérer la mise à jour du temps
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setCurrentTime(video.currentTime)

    // Sauvegarder toutes les 10 secondes
    if (video.currentTime - lastSaveRef.current >= 10) {
      lastSaveRef.current = video.currentTime
      saveProgress(video.currentTime, video.duration)
    }
  }, [saveProgress])

  // Charger les métadonnées
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setDuration(video.duration)

    // Reprendre à la position sauvegardée
    if (initialProgress > 0 && initialProgress < video.duration - 5) {
      video.currentTime = initialProgress
      setCurrentTime(initialProgress)
    }
  }, [initialProgress])

  // Fin de la vidéo
  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setIsPlaying(false)
    saveProgress(video.duration, video.duration)
    onEnded?.()
  }, [saveProgress, onEnded])

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // Mute/Unmute
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // Seek
  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  // Fullscreen
  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      container.requestFullscreen()
    }
  }

  // Reculer de 10 secondes
  const rewind = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, video.currentTime - 10)
  }

  // Sauvegarder à la fermeture
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleBeforeUnload = () => {
      if (video.currentTime > 0) {
        saveProgress(video.currentTime, video.duration)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      if (video.currentTime > 0) {
        saveProgress(video.currentTime, video.duration)
      }
    }
  }, [saveProgress])

  // Masquer les contrôles après inactivité
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeout)
    }
  }, [isPlaying])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group aspect-video"
      onMouseEnter={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* Overlay de lecture */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
        >
          <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center hover:bg-gold transition-colors">
            <Play size={32} className="text-white ml-1" fill="white" />
          </div>
        </button>
      )}

      {/* Contrôles */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Barre de progression */}
        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>

        {/* Boutons de contrôle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={rewind}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw size={18} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>

            <span className="text-white text-sm ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs">
              {Math.round(progress)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Maximize size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
