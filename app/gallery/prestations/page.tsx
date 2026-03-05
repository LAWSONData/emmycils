'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, Sparkles, Eye, Star } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { LashDivider, GoldenParticles } from '@/components/animations'

const galleryItems = [
  { id: 1, title: 'Volume Russe Classic', category: 'Volume', src: '/gallery/01-volume-russe.jpg' },
  { id: 2, title: 'Cil à Cil Naturel', category: 'Naturel', src: '/gallery/02-cil-naturel.jpg' },
  { id: 3, title: 'Mega Volume Glam', category: 'Volume', src: '/gallery/03-mega-volume.jpg' },
  { id: 4, title: 'Wet Look Moderne', category: 'Créatif', src: '/gallery/04-wet-look.jpg' },
  { id: 5, title: 'Fox Eye Lift', category: 'Créatif', src: '/gallery/05-fox-eye.jpg' },
  { id: 6, title: 'Hollywood Glamour', category: 'Volume', src: '/gallery/06-hollywood.jpg' },
  { id: 7, title: 'Colorée Artistique', category: 'Créatif', src: '/gallery/07-whispy.jpg' },
  { id: 8, title: 'Pose en Salon', category: 'Volume', src: '/gallery/08-kim-k.jpg' },
  { id: 9, title: 'Naturel Quotidien', category: 'Naturel', src: '/gallery/09-naturel.jpg' },
]

const filters = ['Tous', 'Volume', 'Naturel', 'Créatif']

const filterIcons: Record<string, typeof Star> = {
  'Tous': Sparkles,
  'Volume': Star,
  'Naturel': Eye,
  'Créatif': Sparkles,
}

export default function GalleryPrestationsPage() {
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

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section - Cinematic */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        {/* Background avec parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[url('/gallery/01-volume-russe.jpg')] bg-cover bg-center opacity-30 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a]" />
        </motion.div>

        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-gold/10"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-gold/5"
          />
        </div>

        <GoldenParticles count={30} speed={0.08} />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Badge premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-gold/10 backdrop-blur-sm border border-gold/20"
            >
              <Sparkles size={14} className="text-gold" />
              <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium">
                Collection Exclusive
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6"
            >
              <span className="block">Nos</span>
              <span className="block italic text-gold-light">Prestations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
            >
              Découvrez l&apos;art de sublimer chaque regard à travers nos créations uniques
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-8 mt-10"
            >
              {[
                { value: '500+', label: 'Clientes satisfaites' },
                { value: '9', label: 'Styles signature' },
                { value: '5★', label: 'Avis Google' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="font-playfair text-2xl md:text-3xl text-gold mb-1">{stat.value}</div>
                  <div className="text-white/40 text-xs tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div className="w-1 h-2 bg-gold rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Filters - Floating Style */}
      <section className="sticky top-20 z-30 py-6 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center gap-2 sm:gap-3 p-2 rounded-full bg-white/80 backdrop-blur-xl border border-gold/10 shadow-[0_8px_40px_rgba(200,169,126,0.1)]">
            {filters.map((filter, i) => {
              const Icon = filterIcons[filter]
              return (
                <motion.button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter)
                    setSelectedIndex(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-2 px-5 sm:px-8 py-3 text-[12px] sm:text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-500 ${
                    activeFilter === filter
                      ? 'bg-[#0a0a0a] text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon size={14} className={activeFilter === filter ? 'text-gold' : ''} />
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#0a0a0a] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* Gallery Grid - Masonry Style */}
      <section className="py-10 sm:py-16 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onClick={() => setSelectedIndex(i)}
                  className={`cursor-pointer group ${
                    i % 5 === 0 ? 'md:row-span-2' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden rounded-2xl border border-border/50 group-hover:border-gold/40 transition-all duration-700 ${
                    i % 5 === 0 ? 'aspect-[3/5]' : 'aspect-[4/5]'
                  }`}>
                    {/* Image */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Gold shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 via-transparent to-transparent" />
                    </div>

                    {/* Content on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                      <motion.div
                        initial={false}
                        className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                      >
                        {/* Category badge */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold text-[10px] tracking-[0.1em] uppercase">
                          <Sparkles size={10} />
                          {item.category}
                        </span>

                        {/* Title */}
                        <h3 className="font-playfair text-lg sm:text-xl text-white leading-tight">
                          {item.title}
                        </h3>

                        {/* View indicator */}
                        <div className="flex items-center gap-2 mt-3 text-white/60 text-xs">
                          <Eye size={12} />
                          <span>Voir en détail</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold to-transparent" />
                      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal - Cinematic */}
      <AnimatePresence>
        {selectedItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 dot-pattern opacity-50" />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full mx-4 sm:mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-gold/20 shadow-[0_0_100px_rgba(200,169,126,0.15)]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />

                {/* Overlay info */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 sm:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold text-xs tracking-[0.1em] uppercase">
                      <Sparkles size={12} />
                      {selectedItem.category}
                    </span>
                    <h3 className="font-playfair text-3xl sm:text-4xl text-white mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-white/50 text-sm max-w-md">
                      Réalisation exclusive par Emmy Cils — Excellence et précision pour un regard unique
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Navigation */}
              {selectedIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(selectedIndex - 1)
                  }}
                  className="absolute left-0 sm:-left-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-gold/30 transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              {selectedIndex < filtered.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex(selectedIndex + 1)
                  }}
                  className="absolute right-0 sm:-right-20 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-gold/30 transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-4 -right-4 sm:top-4 sm:right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all"
              >
                <X size={20} />
              </button>

              {/* Counter */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="text-white/50 text-sm font-medium">
                  <span className="text-gold">{selectedIndex + 1}</span>
                  <span className="mx-2">/</span>
                  {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]" />
        <GoldenParticles count={25} speed={0.1} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gold/10 border border-gold/20"
          >
            <Sparkles size={32} className="text-gold" />
          </motion.div>

          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-white mb-6">
            Envie de sublimer
            <br />
            <span className="italic text-gold-light">votre regard ?</span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Réservez votre consultation personnalisée et découvrez le style parfait pour vous
          </p>

          <Button
            onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
            className="cta-shimmer cta-glow group bg-gold hover:bg-gold-dark text-white px-12 py-5 h-auto text-sm tracking-[0.1em] uppercase rounded-full font-semibold"
          >
            <span className="mr-3">Réserver une Consultation</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
