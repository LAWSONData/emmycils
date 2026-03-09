'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, Calendar, PartyPopper, Camera, MapPin, ArrowRight, Eye } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'

const galleryItems = [
  { id: 1, title: 'Salon de la Beauté 2024', category: 'Salon', date: 'Mars 2024', src: '/gallery/01-volume-russe.jpg' },
  { id: 2, title: 'Masterclass Exclusive', category: 'Masterclass', date: 'Février 2024', src: '/gallery/02-cil-naturel.jpg' },
  { id: 3, title: 'Remise des Diplômes', category: 'Cérémonie', date: 'Janvier 2024', src: '/gallery/03-mega-volume.jpg' },
  { id: 4, title: 'Workshop Tendances', category: 'Masterclass', date: 'Décembre 2023', src: '/gallery/04-wet-look.jpg' },
  { id: 5, title: 'Journée Portes Ouvertes', category: 'Salon', date: 'Novembre 2023', src: '/gallery/05-fox-eye.jpg' },
  { id: 6, title: 'Anniversaire du Salon', category: 'Cérémonie', date: 'Octobre 2023', src: '/gallery/06-hollywood.jpg' },
]

const filters = ['Tous', 'Salon', 'Masterclass', 'Cérémonie']

const categoryIcons: Record<string, typeof Calendar> = {
  'Salon': MapPin,
  'Masterclass': Camera,
  'Cérémonie': PartyPopper,
}

export default function GalleryEvenementsPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section - Festive */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[450px] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#100d0a] to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[url('/gallery/03-mega-volume.jpg')] bg-cover bg-center opacity-25 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        </motion.div>

        {/* Confetti-like elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-3 bg-gold/40 rounded-full"
              style={{
                left: `${5 + i * 6}%`,
                top: '-10%',
              }}
              animate={{
                y: ['0vh', '110vh'],
                rotate: [0, 360],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px]"
        />

        <GoldenParticles count={30} speed={0.06} />

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
              <PartyPopper size={14} className="text-gold" />
              <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-medium">
                Moments Mémorables
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl text-white mb-4"
            >
              Nos <span className="italic text-gold-light">Événements</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg max-w-xl mx-auto"
            >
              Revivez les moments forts de notre communauté à travers ces souvenirs
            </motion.p>

            {/* Event count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-8"
            >
              {[
                { value: '20+', label: 'Événements organisés' },
                { value: '500+', label: 'Participantes' },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="font-playfair text-2xl text-gold mb-0.5">{stat.value}</p>
                  <p className="text-white/40 text-xs">{stat.label}</p>
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
            {filters.map((filter) => {
              const Icon = categoryIcons[filter] || Calendar
              return (
                <motion.button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter)
                    setSelectedIndex(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-2 px-5 sm:px-7 py-3 text-[12px] sm:text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#0a0a0a] text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter !== 'Tous' && <Icon size={14} className={activeFilter === filter ? 'text-gold' : ''} />}
                  {filter}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Timeline style */}
      <section className="py-12 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedIndex(i)}
                  className="cursor-pointer group"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-white border border-border hover:border-gold/30 shadow-sm hover:shadow-[0_10px_40px_rgba(200,169,126,0.15)] transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* View button on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          <Eye size={20} className="text-white" />
                        </div>
                      </div>

                      {/* Date badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-foreground flex items-center gap-1.5 shadow-sm">
                        <Calendar size={12} className="text-gold" />
                        {item.date}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[10px] tracking-[0.1em] uppercase font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-playfair text-xl text-foreground group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
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
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-gold/20">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs tracking-[0.1em] uppercase">
                      {selectedItem.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/50 text-sm">
                      <Calendar size={14} />
                      {selectedItem.date}
                    </span>
                  </div>
                  <h3 className="font-playfair text-3xl text-white">{selectedItem.title}</h3>
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
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gold/10 border border-gold/20"
          >
            <PartyPopper size={28} className="text-gold" />
          </motion.div>

          <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-6">
            Restez informée de nos <span className="italic text-gold-light">événements</span>
          </h2>

          <p className="text-white/40 text-lg mb-10">
            Suivez-nous sur les réseaux sociaux pour ne manquer aucun de nos prochains rendez-vous
          </p>

          <Button
            asChild
            className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-10 py-5 h-auto text-sm tracking-[0.1em] uppercase rounded-full font-semibold"
          >
            <Link href="/contact">
              Nous Contacter
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
