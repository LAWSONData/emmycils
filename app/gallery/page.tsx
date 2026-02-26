'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LashDivider, GoldenParticles } from '@/components/animations'

const galleryItems = [
  {
    id: 1,
    title: 'Volume Russe Classic',
    category: 'Volume',
    src: '/gallery/01-volume-russe.jpg',
  },
  {
    id: 2,
    title: 'Cil à Cil Naturel',
    category: 'Naturel',
    src: '/gallery/02-cil-naturel.jpg',
  },
  {
    id: 3,
    title: 'Mega Volume Glam',
    category: 'Volume',
    src: '/gallery/03-mega-volume.jpg',
  },
  {
    id: 4,
    title: 'Wet Look Moderne',
    category: 'Créatif',
    src: '/gallery/04-wet-look.jpg',
  },
  {
    id: 5,
    title: 'Fox Eye Lift',
    category: 'Créatif',
    src: '/gallery/05-fox-eye.jpg',
  },
  {
    id: 6,
    title: 'Hollywood Glamour',
    category: 'Volume',
    src: '/gallery/06-hollywood.jpg',
  },
  {
    id: 7,
    title: 'Colorée Artistique',
    category: 'Créatif',
    src: '/gallery/07-whispy.jpg',
  },
  {
    id: 8,
    title: 'Pose en Salon',
    category: 'Volume',
    src: '/gallery/08-kim-k.jpg',
  },
  {
    id: 9,
    title: 'Naturel Quotidien',
    category: 'Naturel',
    src: '/gallery/09-naturel.jpg',
  },
]

const filters = ['Tous', 'Volume', 'Naturel', 'Créatif']

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered =
    activeFilter === 'Tous'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter)

  const selectedItem = selectedIndex !== null ? filtered[selectedIndex] : null

  const goNext = () => {
    if (selectedIndex !== null && selectedIndex < filtered.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-6 lg:px-8 bg-warm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-5"
          >
            <p className="text-gold text-[13px] tracking-[0.2em] uppercase font-medium">
              Nos réalisations
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Galerie
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Découvrez nos plus beaux travaux et les transformations que nous créons
            </motion.p>
            <LashDivider className="pt-2" />
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 lg:px-8 bg-cream border-b border-border">
        <div className="max-w-7xl mx-auto flex justify-center gap-2 flex-wrap">
          {filters.map((filter, i) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => {
                setActiveFilter(filter)
                setSelectedIndex(null)
              }}
              className={`px-6 py-2 text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gold text-white shadow-[0_2px_12px_rgba(200,169,126,0.3)]'
                  : 'bg-warm text-muted-foreground hover:text-foreground hover:bg-warm'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-10 sm:py-16 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  onClick={() => setSelectedIndex(i)}
                  className="cursor-pointer group"
                >
                  <div className="image-shine relative overflow-hidden rounded-lg aspect-[4/5] border border-border group-hover:border-gold/40 transition-all duration-500">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                      <div className="p-4 sm:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <div className="w-6 h-px bg-gold mb-2" />
                        <p className="text-gold text-xs tracking-[0.1em] uppercase mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-playfair text-base sm:text-lg text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: 8 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-lg md:max-w-2xl lg:max-w-3xl w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/3] rounded-xl overflow-hidden"
              style={{ perspective: 800 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedItem.src}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 95vw, (max-width: 1024px) 70vw, 50vw"
                className="object-cover"
                priority
              />

              {/* Bottom info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-8 h-px bg-gold mb-3" />
                  <p className="text-gold text-xs tracking-[0.15em] uppercase mb-1">
                    {selectedItem.category}
                  </p>
                  <h3 className="font-playfair text-xl sm:text-2xl text-white">
                    {selectedItem.title}
                  </h3>
                </motion.div>
              </div>

              {/* Navigation */}
              {selectedIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              {selectedIndex < filtered.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
              >
                <X size={18} />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                <span className="text-white/70 text-xs font-medium">
                  {selectedIndex + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="relative py-16 sm:py-24 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[100px]" />
        <GoldenParticles count={15} speed={0.12} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <LashDivider className="mb-6 sm:mb-10" color="#d4b896" />

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-4"
          >
            Envie de sublimer votre <em className="italic text-gold-light">regard</em>&nbsp;?
          </motion.h2>
          <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-10">
            Découvrez comment nous pouvons créer le style parfait pour vous
          </p>
          <Button
            onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
            className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 sm:px-12 py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
          >
            Réserver une Consultation
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
