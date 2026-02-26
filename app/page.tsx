'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Heart, Smile, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GoldenParticles, LashDivider, MagneticCard, CountUp, FloatingElement } from '@/components/animations'

const rotatingWords = [
  'enchante',
  'captive',
  'séduit',
  'illumine',
  'fascine',
  'éblouit',
  'envoûte',
  'sublime',
]

const services = [
  {
    id: 1,
    name: 'Cil à Cil',
    price: '70€',
    description: 'Extensions naturelles pour un regard élégant et raffiné',
  },
  {
    id: 2,
    name: 'Volume Russe',
    price: '90€',
    description: 'Volume subtil pour une densité et un éclat sublimes',
  },
  {
    id: 3,
    name: 'Mega Volume',
    price: '150€',
    description: 'Volume spectaculaire pour un regard inoubliable',
  },
  {
    id: 4,
    name: 'Retouche',
    price: '50€',
    description: 'Maintenance experte pour prolonger votre beauté',
  },
]

const features = [
  {
    icon: Sparkles,
    title: 'Expertise',
    description:
      "Années d'expérience et formation continue pour un résultat impeccable",
  },
  {
    icon: Heart,
    title: 'Personnalisé',
    description:
      'Consultation complète pour trouver le style qui vous met en valeur',
  },
  {
    icon: Smile,
    title: 'Confort',
    description:
      'Environnement calme et relaxant pour une expérience agréable',
  },
  {
    icon: Zap,
    title: 'Résultats',
    description:
      'Extensions durables et naturelles qui subliment votre regard',
  },
]

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0)
  const openCalendly = () => window.open('https://calendly.com/emmycils', 'calendly')
  const openStripe = () => window.open('https://checkout.stripe.com', '_blank')

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/hero-lashes-bw.jpg"
          alt="Extensions de cils professionnelles"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        {/* Grain texture */}
        <div className="absolute inset-0 grain" />
        {/* Golden particles floating */}
        <GoldenParticles count={35} speed={0.2} />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-8"
          >
            {/* Animated gold line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            />

            <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)]">
              <motion.span
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                Un regard qui
              </motion.span>
              <br />
              <span className="inline-block relative h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.em
                    key={rotatingWords[wordIndex]}
                    initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="italic text-gold-light block drop-shadow-[0_0_40px_rgba(200,169,126,0.3)]"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.em>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)]"
            >
              Extensions de cils personnalisées par Emmy
              <br className="hidden sm:block" />à Sainte-Geneviève-des-Bois
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center pt-2 sm:pt-4"
            >
              <Link href="/services" className="w-full sm:w-auto">
                <Button className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 sm:px-12 py-3.5 sm:py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold">
                  <Sparkles size={16} className="mr-2" />
                  Découvrir nos Services
                </Button>
              </Link>
              <Button
                onClick={openCalendly}
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-gold/60 px-8 sm:px-12 py-3.5 sm:py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 bg-transparent font-semibold"
              >
                Réserver un RDV
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why Emmy Cils ─── */}
      <section className="py-14 md:py-20 lg:py-28 px-6 lg:px-8 bg-warm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 lg:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              L&apos;excellence au service de votre regard
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground"
            >
              Pourquoi Emmy Cils ?
            </motion.h2>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500 breathe-glow">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair font-semibold text-base sm:text-lg text-foreground mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Services populaires ─── */}
      <section className="py-14 md:py-20 lg:py-28 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16 lg:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Nos prestations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground"
            >
              Services Populaires
            </motion.h2>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <MagneticCard className="h-full">
                  <Card className="card-lift p-5 sm:p-7 lg:p-8 h-full bg-white border border-border hover:border-gold/40 group flex flex-col">
                    <h3 className="font-playfair font-semibold text-lg sm:text-xl text-foreground mb-2">
                      {service.name}
                    </h3>
                    <p className="text-2xl sm:text-3xl font-playfair text-gold mb-3">
                      {service.price}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
                      {service.description}
                    </p>
                    <Link href="/services" className="block">
                      <span className="gold-underline-draw inline-flex items-center gap-2 text-sm font-medium text-foreground/60 group-hover:text-gold transition-colors duration-300">
                        Découvrir
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Card>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ─── */}
      <section className="relative py-16 sm:py-24 lg:py-36 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
        {/* Golden particles in dark section */}
        <GoldenParticles count={25} speed={0.15} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <FloatingElement speed={0.08} direction="up" className="absolute -top-4 left-[12%] hidden sm:block pointer-events-none">
            <span className="text-gold/30 text-2xl">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.12} direction="down" className="absolute top-8 right-[15%] hidden sm:block pointer-events-none">
            <span className="text-gold/20 text-lg">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.06} direction="up" className="absolute bottom-12 left-[20%] hidden sm:block pointer-events-none">
            <span className="text-gold/25 text-base">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.1} direction="down" className="absolute bottom-4 right-[22%] hidden sm:block pointer-events-none">
            <span className="text-gold/30 text-xl">&#10022;</span>
          </FloatingElement>

          <LashDivider className="mb-6 sm:mb-10" color="#d4b896" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gold text-[11px] sm:text-[13px] tracking-[0.25em] uppercase font-medium mb-4 sm:mb-6"
          >
            Votre transformation commence ici
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight"
          >
            Prête pour votre
            <br />
            <em className="italic text-gold-light">nouveau regard</em>&nbsp;?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/50 text-base sm:text-lg md:text-xl mb-8 sm:mb-14 leading-relaxed max-w-xl mx-auto"
          >
            Rejoignez des centaines de clientes satisfaites. Réservez votre
            consultation et laissez Emmy sublimer votre regard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mb-8 sm:mb-10"
          >
            <Button
              onClick={openCalendly}
              className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 sm:px-14 py-4 sm:py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
            >
              <Sparkles size={16} className="mr-2" />
              Réserver Maintenant
            </Button>
            <Button
              onClick={openStripe}
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/5 hover:border-gold/50 px-8 sm:px-14 py-4 sm:py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 bg-transparent font-semibold"
            >
              Payer un Acompte (20€)
            </Button>
          </motion.div>

          {/* Trust badge with count-up */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-white/30 text-xs"
          >
            <div className="flex -space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.08, type: 'spring', stiffness: 300 }}
                  className="w-6 h-6 rounded-full bg-gold/20 border-2 border-[#0a0a0a] flex items-center justify-center"
                >
                  <Heart size={10} className="text-gold/60" />
                </motion.div>
              ))}
            </div>
            <span>+<CountUp end={500} duration={2.5} /> clientes satisfaites</span>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
