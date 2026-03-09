'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Eye,
  Heart,
  Share2,
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { LashDivider, GoldenParticles } from '@/components/animations'
import { CommentsSection } from '@/components/comments-section'

const galleryItems = [
  {
    id: 1,
    title: 'Pose classique naturelle',
    category: 'Avant / Après',
    description: 'Un regard sublimé tout en douceur',
    src: '/gallery/01-volume-russe.jpg',
  },
  {
    id: 2,
    title: 'Volume léger journée',
    category: 'Résultat',
    description: 'Parfait pour le quotidien',
    src: '/gallery/02-cil-naturel.jpg',
  },
  {
    id: 3,
    title: 'Effet fox eye',
    category: 'Résultat',
    description: 'Regard étiré et glamour',
    src: '/gallery/05-fox-eye.jpg',
  },
  {
    id: 4,
    title: 'Volume glamour',
    category: 'Avant / Après',
    description: 'Transformation spectaculaire',
    src: '/gallery/03-mega-volume.jpg',
  },
  {
    id: 5,
    title: 'Wet look sophistiqué',
    category: 'Résultat',
    description: 'Effet mouillé tendance',
    src: '/gallery/04-wet-look.jpg',
  },
  {
    id: 6,
    title: 'Pose spéciale évènement',
    category: 'Résultat',
    description: 'Pour les grandes occasions',
    src: '/gallery/06-hollywood.jpg',
  },
]

const filters = ['Tous', 'Avant / Après', 'Résultat']

export default function GalleryPrestationsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const filtered =
    activeFilter === 'Tous'
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

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

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
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedIndex])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Header */}
      <section ref={heroRef} className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <Image
            src="/gallery/01-volume-russe.jpg"
            alt=""
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/10 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]"
          />
        </div>

        <GoldenParticles count={25} speed={0.08} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20"
            >
              <Sparkles size={14} className="text-gold" />
              <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-medium">
                Nos Prestations
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white"
            >
              Galerie <span className="italic text-gold-light">Prestations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-base sm:text-lg max-w-xl mx-auto"
            >
              Découvre des exemples concrets de poses réalisées sur nos clientes
            </motion.p>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 80 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Sticky Filters */}
      <section className="sticky top-20 z-30 py-5 px-6 lg:px-8 bg-cream/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 sm:gap-3 p-2 rounded-full bg-white border border-gold/10 shadow-[0_4px_20px_rgba(200,169,126,0.08)]">
            {filters.map((filter, i) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => {
                  setActiveFilter(filter)
                  setSelectedIndex(null)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-5 sm:px-8 py-3 text-[11px] sm:text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#0a0a0a] text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-warm'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilterPrestations"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group relative"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    className="w-full text-left"
                  >
                    <div className="relative aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden bg-black/5 border border-border/50 group-hover:border-gold/40 transition-all duration-500 shadow-sm hover:shadow-[0_15px_50px_rgba(200,169,126,0.15)]">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                      {/* View button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Eye size={22} className="text-white" />
                        </div>
                      </div>

                      {/* Like button */}
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          liked.has(item.id)
                            ? 'bg-red-500 text-white scale-110'
                            : 'bg-black/30 text-white/70 backdrop-blur-sm hover:bg-black/50'
                        }`}
                      >
                        <Heart
                          size={18}
                          className={liked.has(item.id) ? 'fill-white' : ''}
                        />
                      </button>

                      {/* Info */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="inline-flex px-2.5 py-1 mb-2 rounded-full bg-gold/20 backdrop-blur-sm text-gold text-[10px] tracking-[0.12em] uppercase font-medium border border-gold/30">
                            {item.category}
                          </span>
                          <h3 className="font-playfair text-base sm:text-lg text-white drop-shadow-lg">
                            {item.title}
                          </h3>
                          <p className="text-white/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">
                Aucune prestation dans cette catégorie
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
            </div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main image */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl lg:rounded-3xl overflow-hidden border border-gold/20 shadow-2xl">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 80vw"
                  className="object-cover"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <div className="w-10 h-px bg-gold mb-4" />
                      <span className="inline-flex px-3 py-1 mb-3 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs tracking-[0.15em] uppercase">
                        {selectedItem.category}
                      </span>
                      <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
                        {selectedItem.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {selectedItem.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => toggleLike(selectedItem.id, e)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          liked.has(selectedItem.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        <Heart
                          size={20}
                          className={liked.has(selectedItem.id) ? 'fill-white' : ''}
                        />
                      </button>
                      <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-all">
                        <Share2 size={20} />
                      </button>
                      <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <span className="text-white/70 text-sm font-medium">
                          <span className="text-gold">{selectedIndex + 1}</span>
                          <span className="mx-2">/</span>
                          {filtered.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation arrows */}
                {selectedIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}
                {selectedIndex < filtered.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-gold hover:border-gold transition-all duration-300"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Keyboard hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden sm:flex items-center justify-center gap-6 mt-6 text-white/30 text-xs"
              >
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">
                    &larr;
                  </kbd>
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">
                    &rarr;
                  </kbd>
                  <span>Navigation</span>
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-2 py-1 rounded bg-white/10 border border-white/20">
                    Esc
                  </kbd>
                  <span>Fermer</span>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments Section */}
      <section className="bg-warm px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <LashDivider className="mb-6" />
            <h2 className="font-playfair text-3xl sm:text-4xl text-foreground mb-3">
              Elles donnent leur <span className="italic text-gold">avis</span>
            </h2>
            <p className="text-muted-foreground">
              Partagez votre expérience avec nous
            </p>
          </motion.div>

          <CommentsSection
            type="prestation"
            targetId="gallery-prestations"
            title=""
          />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[120px]" />
        <GoldenParticles count={20} speed={0.12} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gold/10 border border-gold/20"
          >
            <Sparkles size={28} className="text-gold" />
          </motion.div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white mb-5">
            Envie d&apos;un <span className="italic text-gold-light">nouveau regard</span>&nbsp;?
          </h2>

          <p className="text-white/50 text-base sm:text-lg mb-10">
            Réservez votre prestation et laissez-nous sublimer votre regard
          </p>

          <Button
            onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
            className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-10 sm:px-14 py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
          >
            Réserver ma Prestation
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
