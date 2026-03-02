'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VideoPlayer } from '@/components/formation-player/VideoPlayer'
import { VideoList } from '@/components/formation-player/VideoList'
import type { Formation } from '@/lib/formations'

interface VideoProgress {
  video_filename: string
  watched_seconds: number
  total_seconds: number
  completed: boolean
}

interface FormationContentProps {
  formation: Formation
  accessToken: string
  initialProgress: VideoProgress[]
}

export function FormationContent({
  formation,
  accessToken,
  initialProgress,
}: FormationContentProps) {
  const [currentVideo, setCurrentVideo] = useState<string | null>(
    formation.includes.videos[0]?.filename || null
  )
  const [progress, setProgress] = useState<VideoProgress[]>(initialProgress)

  const videoBaseUrl = process.env.NEXT_PUBLIC_VIDEO_BASE_URL || '/videos'

  const currentVideoData = formation.includes.videos.find(
    (v) => v.filename === currentVideo
  )

  const currentVideoProgress = progress.find(
    (p) => p.video_filename === currentVideo
  )

  const completedCount = progress.filter((p) => p.completed).length
  const overallProgress = formation.includes.videos.length > 0
    ? (completedCount / formation.includes.videos.length) * 100
    : 0

  // Mettre à jour la progression locale après sauvegarde
  const handleProgressUpdate = useCallback(
    (watchedSeconds: number, totalSeconds: number, completed: boolean) => {
      if (!currentVideo) return

      setProgress((prev) => {
        const existing = prev.find((p) => p.video_filename === currentVideo)
        if (existing) {
          return prev.map((p) =>
            p.video_filename === currentVideo
              ? { ...p, watched_seconds: watchedSeconds, total_seconds: totalSeconds, completed }
              : p
          )
        }
        return [
          ...prev,
          {
            video_filename: currentVideo,
            watched_seconds: watchedSeconds,
            total_seconds: totalSeconds,
            completed,
          },
        ]
      })
    },
    [currentVideo]
  )

  // Passer à la vidéo suivante
  const handleVideoEnded = useCallback(() => {
    const currentIndex = formation.includes.videos.findIndex(
      (v) => v.filename === currentVideo
    )
    const nextVideo = formation.includes.videos[currentIndex + 1]
    if (nextVideo) {
      setCurrentVideo(nextVideo.filename)
    }
  }, [currentVideo, formation.includes.videos])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Accueil
                </Button>
              </Link>
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                  <span className="font-playfair font-bold text-sm text-gold">E</span>
                </div>
                <span className="font-playfair text-white">Emmy Cils</span>
              </div>
            </div>

            {/* Progression globale */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-white/40">Progression</p>
                <p className="text-sm text-gold font-medium">
                  {completedCount}/{formation.includes.videos.length} vidéos
                </p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-gold/30 flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-white/10"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${overallProgress * 1.256} 125.6`}
                    className="text-gold transition-all duration-500"
                  />
                </svg>
                <span className="text-xs font-bold text-white">
                  {Math.round(overallProgress)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Titre de la formation */}
      <div className="border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={24} className="text-gold" />
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Formation en cours
              </p>
              <h1 className="font-playfair text-xl sm:text-2xl text-white">
                {formation.title}
              </h1>
              <p className="text-white/50 text-sm mt-1">{formation.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Lecteur vidéo */}
          <div className="lg:col-span-2 space-y-4">
            {currentVideo && currentVideoData && (
              <>
                <VideoPlayer
                  videoUrl={`${videoBaseUrl}/${formation.slug}/${currentVideo}`}
                  videoFilename={currentVideo}
                  accessToken={accessToken}
                  initialProgress={currentVideoProgress?.watched_seconds}
                  onProgressUpdate={handleProgressUpdate}
                  onEnded={handleVideoEnded}
                />

                {/* Info vidéo actuelle */}
                <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-playfair text-lg text-white mb-1">
                        {currentVideoData.name}
                      </h2>
                      <p className="text-white/50 text-sm">
                        Vidéo {formation.includes.videos.findIndex((v) => v.filename === currentVideo) + 1} sur {formation.includes.videos.length}
                      </p>
                    </div>
                    {currentVideoProgress?.completed && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs">
                        <CheckCircle size={12} />
                        Terminé
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Liste des vidéos */}
          <div className="lg:col-span-1">
            <VideoList
              videos={formation.includes.videos}
              progress={progress}
              currentVideo={currentVideo}
              onSelectVideo={setCurrentVideo}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-white/30 text-xs">
              © 2026 Emmy Cils — Accès personnel et non transférable
            </p>
            <a
              href="mailto:contact@emmycils.fr"
              className="text-gold/60 hover:text-gold text-xs transition-colors"
            >
              Besoin d'aide ? contact@emmycils.fr
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
