'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GraduationCap, ArrowRight, Sparkles } from 'lucide-react'
import { formations } from '@/lib/formations'

const FIRST_DELAY = 12000   // 12s pour la première apparition
const REAPPEAR_DELAY = 120000 // 2 min entre chaque réapparition
const VISIBLE_DURATION = 15000 // reste visible 15s puis disparaît seul

export function FormationPromo() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  const isFormationsPage = pathname?.startsWith('/formations')

  const show = useCallback(() => {
    if (isFormationsPage) return
    setVisible(true)

    // Auto-hide après VISIBLE_DURATION
    const hideTimer = setTimeout(() => setVisible(false), VISIBLE_DURATION)
    return hideTimer
  }, [isFormationsPage])

  useEffect(() => {
    if (isFormationsPage) {
      setVisible(false)
      return
    }

    // Première apparition
    const firstTimer = setTimeout(() => {
      show()
    }, FIRST_DELAY)

    // Réapparitions toutes les 2 min (décalé de FIRST_DELAY + REAPPEAR_DELAY)
    const interval = setInterval(() => {
      show()
    }, REAPPEAR_DELAY)

    return () => {
      clearTimeout(firstTimer)
      clearInterval(interval)
    }
  }, [isFormationsPage, show])

  const dismiss = () => {
    setVisible(false)
  }

  const featured = formations[formations.length - 1] // Certification Pro
  const starter = formations[0] // Fondamentaux

  if (isFormationsPage) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:max-w-[380px]"
        >
          <div className="promo-card-pulse relative rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-gold/30">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="absolute inset-0 dot-pattern" />
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold/10 rounded-full blur-[60px]" />

            <div className="relative z-10 p-4 sm:p-5">
              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                aria-label="Fermer"
              >
                <X size={14} />
              </button>

              {/* Sparkle badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="promo-badge-blink inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/30">
                  <Sparkles size={10} />
                  Nouveau
                </span>
              </div>

              {/* Title */}
              <h3 className="font-playfair font-bold text-base sm:text-lg text-white leading-tight mb-1.5">
                Formations disponibles
              </h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                Devenez experte en extensions de cils avec nos formations complètes.
              </p>

              {/* Two formation previews */}
              <div className="space-y-2.5 mb-4">
                {/* Starter */}
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={14} className="text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{starter.title}</p>
                      <p className="text-white/40 text-[10px] sm:text-[11px]">{starter.levelLabel} · {starter.modulesCount} modules</p>
                    </div>
                  </div>
                  <span className="text-gold font-playfair font-bold text-sm sm:text-base flex-shrink-0">
                    {starter.priceDisplay}
                  </span>
                </div>

                {/* Featured / Pro */}
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-gold/[0.08] border border-gold/20">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs sm:text-sm font-medium truncate">{featured.title}</p>
                      <p className="text-gold/60 text-[10px] sm:text-[11px]">{featured.levelLabel} · {featured.modulesCount} modules</p>
                    </div>
                  </div>
                  <span className="text-gold font-playfair font-bold text-sm sm:text-base flex-shrink-0">
                    {featured.priceDisplay}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link href="/formations" onClick={dismiss}>
                <button className="cta-shimmer w-full flex items-center justify-center gap-2 py-3 bg-gold hover:bg-gold-dark text-white text-xs sm:text-sm font-semibold tracking-[0.05em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,169,126,0.4)]">
                  Voir toutes les formations
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
