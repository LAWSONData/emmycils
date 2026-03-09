'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, GraduationCap, Users, Star, Play, ArrowRight, Eye } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'

const galleryItems = [
  { id: 1, title: 'Session Volume Russe', category: 'Technique', src: '/gallery/01-volume-russe.jpg' },
  { id: 2, title: 'Atelier Cil à Cil', category: 'Initiation', src: '/gallery/02-cil-naturel.jpg' },
  { id: 3, title: 'Formation Mega Volume', category: 'Avancé', src: '/gallery/03-mega-volume.jpg' },
  { id: 4, title: 'Masterclass Wet Look', category: 'Technique', src: '/gallery/04-wet-look.jpg' },
  { id: 5, title: 'Cours Fox Eye', category: 'Avancé', src: '/gallery/05-fox-eye.jpg' },
  { id: 6, title: 'Session Pratique', category: 'Initiation', src: '/gallery/06-hollywood.jpg' },
]

const filters = ['Tous', 'Initiation', 'Technique', 'Avancé']

export default function GalleryFormationsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const filtered = activeFilter === 'Tous'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  const selectedItem = selectedIndex !== null ? filtered[selectedIndex] : null

  const goNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }, [selectedIndex, filtered.length])

  const goPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }, [selectedIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') setSelectedIndex(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, goNext, goPrev])

  // Lock scroll when lightbox open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  const categoryColors: Record<string, string> = {
    'Initiation': 'from-emerald-500/20 border-emerald-500/30 text-emerald-400',
    'Technique': 'from-gold/20 border-gold/30 text-gold',
    'Avancé': 'from-purple-500/20 border-purple-500/30 text-purple-400',
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#12100d] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[url('/gallery/06-hollywood.jpg')] bg-cover bg-center opacity-20 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/5 rounded-full"
          />
        </div>

        <GoldenParticles count={25} speed={0.08} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20"
            >
              <GraduationCap size={14} className="text-gold" />
              <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-medium">
                Nos Formations
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl text-white mb-4"
            >
              Galerie <span className="italic text-gold-light">Formations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg max-w-xl mx-auto"
            >
              Découvrez nos sessions de formation et les résultats de nos élèves
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 mt-8"
            >
              {[
                { icon: Users, value: '100+', label: 'Élèves formées' },
                { icon: Star, value: '4.9', label: 'Note moyenne' },
                { icon: Play, value: '6', label: 'Formations' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon size={16} className="text-gold" />
                    <span className="font-playfair text-2xl text-white">{stat.value}</span>
                  </div>
                  <span className="text-white/40 text-xs">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 py-6 px-6 lg:px-8 bg-cream/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 sm:gap-3 p-2 rounded-full bg-white border border-gold/10 shadow-[0_4px_20px_rgba(200,169,126,0.08)]">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter)
                  setSelectedIndex(null)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 sm:px-8 py-3 text-[12px] sm:text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#0a0a0a] text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => setSelectedIndex(i)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 group-hover:border-gold/30 transition-all duration-500">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[item.category]} border backdrop-blur-sm text-[10px] tracking-[0.1em] uppercase font-medium`}>
                      {item.category}
                    </div>

                    {/* View button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Eye size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Title on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-8 h-px bg-gold mb-2" />
                      <h3 className="font-playfair text-lg text-white">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold/20">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <span className={`inline-flex px-3 py-1 mb-3 rounded-full bg-gradient-to-r ${categoryColors[selectedItem.category]} border text-xs tracking-[0.1em] uppercase`}>
                    {selectedItem.category}
                  </span>
                  <h3 className="font-playfair text-2xl sm:text-3xl text-white">{selectedItem.title}</h3>
                </div>
              </div>

              {/* Navigation */}
              {selectedIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {selectedIndex < filtered.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <X size={20} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-white/70 text-sm font-medium">
                  <span className="text-gold">{selectedIndex + 1}</span> / {filtered.length}
                </span>
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden sm:flex items-center justify-center gap-6 mt-6 text-white/30 text-xs"
            >
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">&larr;</kbd>
                <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">&rarr;</kbd>
                <span>Navigation</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">Esc</kbd>
                <span>Fermer</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="relative py-24 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <GoldenParticles count={20} speed={0.1} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gold/10 border border-gold/20">
            <GraduationCap size={28} className="text-gold" />
          </div>

          <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-6">
            Prête à devenir <span className="italic text-gold-light">experte ?</span>
          </h2>

          <p className="text-white/40 text-lg mb-10">
            Rejoignez nos formations et développez vos compétences
          </p>

          <Button
            asChild
            className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-10 py-5 h-auto text-sm tracking-[0.1em] uppercase rounded-full font-semibold"
          >
            <Link href="/formations">
              Découvrir nos Formations
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
