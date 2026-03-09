'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  GraduationCap,
  PartyPopper,
  ArrowRight,
  Sparkles,
  Eye,
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { LashDivider, GoldenParticles } from '@/components/animations'

const galleryItems = [
  {
    id: 1,
    title: 'Volume Russe Classic',
    category: 'Volume',
    src: '/gallery/01-volume-russe.jpg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Cil à Cil Naturel',
    category: 'Naturel',
    src: '/gallery/02-cil-naturel.jpg',
    size: 'small',
  },
  {
    id: 3,
    title: 'Mega Volume Glam',
    category: 'Volume',
    src: '/gallery/03-mega-volume.jpg',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Wet Look Moderne',
    category: 'Créatif',
    src: '/gallery/04-wet-look.jpg',
    size: 'small',
  },
  {
    id: 5,
    title: 'Fox Eye Lift',
    category: 'Créatif',
    src: '/gallery/05-fox-eye.jpg',
    size: 'large',
  },
  {
    id: 6,
    title: 'Hollywood Glamour',
    category: 'Volume',
    src: '/gallery/06-hollywood.jpg',
    size: 'medium',
  },
  {
    id: 7,
    title: 'Colorée Artistique',
    category: 'Créatif',
    src: '/gallery/07-whispy.jpg',
    size: 'small',
  },
  {
    id: 8,
    title: 'Pose en Salon',
    category: 'Volume',
    src: '/gallery/08-kim-k.jpg',
    size: 'medium',
  },
  {
    id: 9,
    title: 'Naturel Quotidien',
    category: 'Naturel',
    src: '/gallery/09-naturel.jpg',
    size: 'small',
  },
]

const filters = ['Tous', 'Volume', 'Naturel', 'Créatif']

const galleryCategories = [
  {
    title: 'Prestations',
    description: 'Nos plus beaux avant/après et résultats',
    icon: Camera,
    href: '/gallery/prestations',
    image: '/gallery/01-volume-russe.jpg',
  },
  {
    title: 'Formations',
    description: 'Moments capturés de nos sessions',
    icon: GraduationCap,
    href: '/gallery/formations',
    image: '/gallery/03-mega-volume.jpg',
  },
  {
    title: 'Événements',
    description: 'Salons, masterclass et célébrations',
    icon: PartyPopper,
    href: '/gallery/evenements',
    image: '/gallery/06-hollywood.jpg',
  },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <Image
            src="/gallery/06-hollywood.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/[0.05] rounded-full"
          />
        </div>

        <GoldenParticles count={30} speed={0.08} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20"
            >
              <Camera size={14} className="text-gold" />
              <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-medium">
                Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
            >
              Galerie
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Découvrez nos plus beaux travaux et les transformations que nous créons
            </motion.p>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 100 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Categories */}
      <section className="py-20 px-6 lg:px-8 bg-warm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Sparkles size={12} />
              Explorez par catégorie
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl text-foreground">
              Nos <span className="italic text-gold">collections</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryCategories.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={category.href} className="group block">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-14 h-14 mb-4 rounded-2xl bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
                          <category.icon size={24} className="text-gold" />
                        </div>
                        <h3 className="font-playfair text-2xl text-white mb-2">
                          {category.title}
                        </h3>
                        <p className="text-white/60 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 text-gold text-sm font-medium">
                          <span>Voir la galerie</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 py-6 px-6 lg:px-8 bg-cream/95 backdrop-blur-xl border-b border-border/50">
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
                className={`relative px-6 sm:px-8 py-3 text-[12px] sm:text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#0a0a0a] text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-warm'
                }`}
              >
                {filter}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid - Bento style */}
      <section className="py-12 sm:py-16 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[280px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => {
                const rowSpan =
                  item.size === 'large'
                    ? 'row-span-2'
                    : item.size === 'medium'
                    ? 'md:row-span-2 lg:row-span-1'
                    : ''

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    onClick={() => setSelectedIndex(i)}
                    className={`cursor-pointer group relative ${rowSpan}`}
                  >
                    <div className="image-shine relative h-full overflow-hidden rounded-2xl lg:rounded-3xl border border-border/50 group-hover:border-gold/40 transition-all duration-500 shadow-sm hover:shadow-[0_10px_40px_rgba(200,169,126,0.15)]">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <Eye size={20} className="text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom info */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <div className="w-8 h-px bg-gold mb-3" />
                        <p className="text-gold text-[10px] sm:text-xs tracking-[0.1em] uppercase mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-playfair text-sm sm:text-base lg:text-lg text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox modal */}
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
            </div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main image container */}
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

                {/* Bottom info */}
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
                      <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-white">
                        {selectedItem.title}
                      </h3>
                    </div>

                    {/* Counter */}
                    <div className="flex items-center gap-4">
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
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <LashDivider className="mb-8 sm:mb-12" color="#d4b896" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white mb-5"
          >
            Envie de sublimer votre <em className="italic text-gold-light">regard</em>&nbsp;?
          </motion.h2>

          <p className="text-white/50 text-base sm:text-lg mb-10">
            Découvrez comment nous pouvons créer le style parfait pour vous
          </p>

          <Button
            onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
            className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-10 sm:px-14 py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
          >
            Réserver une Consultation
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
