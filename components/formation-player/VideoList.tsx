'use client'

import { Play, CheckCircle, Clock, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Video {
  name: string
  filename: string
}

interface VideoProgress {
  video_filename: string
  watched_seconds: number
  total_seconds: number
  completed: boolean
}

interface VideoListProps {
  videos: Video[]
  progress: VideoProgress[]
  currentVideo: string | null
  onSelectVideo: (filename: string) => void
}

export function VideoList({ videos, progress, currentVideo, onSelectVideo }: VideoListProps) {
  const getVideoProgress = (filename: string) => {
    return progress.find((p) => p.video_filename === filename)
  }

  const completedCount = progress.filter((p) => p.completed).length
  const overallProgress = videos.length > 0 ? (completedCount / videos.length) * 100 : 0

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {/* Header avec progression globale */}
      <div className="p-4 sm:p-5 border-b border-border bg-warm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-playfair font-semibold text-lg text-foreground">
            Contenu de la formation
          </h3>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{videos.length}
          </span>
        </div>

        {/* Barre de progression globale */}
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {Math.round(overallProgress)}% complété
        </p>
      </div>

      {/* Liste des vidéos */}
      <div className="max-h-[60vh] overflow-y-auto">
        {videos.map((video, index) => {
          const videoProgress = getVideoProgress(video.filename)
          const isCompleted = videoProgress?.completed || false
          const isActive = currentVideo === video.filename
          const progressPercent = videoProgress
            ? (videoProgress.watched_seconds / videoProgress.total_seconds) * 100
            : 0

          return (
            <button
              key={video.filename}
              onClick={() => onSelectVideo(video.filename)}
              className={cn(
                'w-full flex items-start gap-3 p-4 text-left border-b border-border/50 last:border-0 transition-colors',
                isActive
                  ? 'bg-gold/10'
                  : 'hover:bg-warm'
              )}
            >
              {/* Numéro / Icône */}
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  isCompleted
                    ? 'bg-green-100 text-green-600'
                    : isActive
                    ? 'bg-gold text-white'
                    : 'bg-border text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <CheckCircle size={16} />
                ) : isActive ? (
                  <Play size={14} fill="white" />
                ) : (
                  index + 1
                )}
              </div>

              {/* Contenu */}
              <div className="flex-grow min-w-0">
                <p
                  className={cn(
                    'text-sm font-medium truncate',
                    isActive ? 'text-gold' : 'text-foreground'
                  )}
                >
                  {video.name}
                </p>

                {/* Barre de progression individuelle */}
                {videoProgress && !isCompleted && progressPercent > 0 && (
                  <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold/60 transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}

                {isCompleted && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <CheckCircle size={10} />
                    Terminé
                  </p>
                )}
              </div>

              {/* Indicateur actif */}
              {isActive && (
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
