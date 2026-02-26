'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Clock, ArrowRight, Sparkles, Heart, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { LashDivider, MagneticCard, GoldenParticles, FloatingElement, CountUp } from '@/components/animations'

const categories = [
  {
    title: 'Poses Complètes',
    subtitle: 'Nos poses complètes pour un regard transformé',
    services: [
      { id: 1, name: 'Cil à Cil', price: '70€', duration: '120 min', description: 'Extensions naturelles pour un regard élégant et raffiné' },
      { id: 2, name: 'Volume Russe Léger', price: '90€', duration: '150 min', description: 'Volume subtil pour un effet de densité naturelle' },
      { id: 3, name: 'Volume Russe Intense', price: '100€', duration: '180 min', description: 'Volume important et spectaculaire' },
      { id: 4, name: 'Mega Volume', price: '150€', duration: '240 min', description: 'Volume dramatique et impressionnant' },
    ],
  },
  {
    title: 'Volumes Créatifs',
    subtitle: 'Des styles uniques pour sublimer votre personnalité',
    services: [
      { id: 5, name: 'Wet Look', price: '80€', duration: '120 min', description: 'Effet mouillé pour un look moderne et tendance' },
      { id: 6, name: 'Fox Eye', price: '100€', duration: '180 min', description: 'Regard félin, allongé et captivant' },
      { id: 7, name: 'Whispy', price: '100€', duration: '180 min', description: 'Cils plumeux et délicatement texturés' },
      { id: 8, name: 'Eyeliner', price: '100€', duration: '180 min', description: 'Effet liner sophistiqué et défini' },
      { id: 9, name: 'Colorée', price: '110€', duration: '240 min', description: 'Extensions avec effets de couleur créatifs' },
      { id: 10, name: 'Kim K', price: '120€', duration: '240 min', description: 'Volume glamour style Kardashian' },
    ],
  },
  {
    title: 'Retouches & Dépose',
    subtitle: 'Entretien et maintenance de vos extensions',
    services: [
      { id: 11, name: 'Dépose Avec Pose', price: '15€', duration: '30 min', description: 'Retrait et nouvelle pose le même jour' },
      { id: 12, name: 'Dépose Sans Pose', price: '25€', duration: '30 min', description: 'Retrait complet des extensions' },
      { id: 13, name: 'Retouche Cil à Cil', price: '50€', duration: '75 min', description: 'Maintenance des extensions cil à cil' },
      { id: 14, name: 'Retouche Volume Russe', price: '80€', duration: '150 min', description: 'Retouche pour volume russe' },
      { id: 15, name: 'Retouche Wet Look', price: '70€', duration: '120 min', description: 'Maintenance effet mouillé' },
      { id: 16, name: 'Retouche Whispy', price: '80€', duration: '120 min', description: 'Retouche cils texturés' },
      { id: 17, name: 'Retouche Mega', price: '100€', duration: '180 min', description: 'Maintenance mega volume' },
    ],
  },
]

export default function ServicesPage() {
  const openCalendly = () => window.open('https://calendly.com/emmycils', 'calendly')

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
            className="text-center space-y-4 sm:space-y-5"
          >
            <p className="text-gold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium">
              <CountUp end={17} duration={1.5} /> prestations sur-mesure
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Nos Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              De la pose naturelle au volume spectaculaire, chaque service est
              réalisé avec précision et passion.
            </motion.p>
            <LashDivider className="pt-2" />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, catIdx) => (
        <section
          key={category.title}
          className={`py-12 sm:py-16 lg:py-20 px-6 lg:px-8 ${catIdx % 2 === 0 ? 'bg-cream' : 'bg-warm'}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-8 sm:mb-14"
            >
              <div className="flex items-center gap-4 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-px bg-gold"
                />
                <p className="text-gold text-[13px] tracking-[0.15em] uppercase font-medium">
                  {String(catIdx + 1).padStart(2, '0')}
                </p>
              </div>
              <motion.h2
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-playfair text-3xl sm:text-4xl text-foreground mb-2"
              >
                {category.title}
              </motion.h2>
              <p className="text-muted-foreground">{category.subtitle}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {category.services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <MagneticCard className="h-full" intensity={4}>
                    <Card className="card-lift p-5 sm:p-7 h-full bg-white border border-border hover:border-gold/40 group flex flex-col">
                      <div className="flex-grow space-y-3">
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <h3 className="font-playfair font-semibold text-lg sm:text-xl text-foreground">
                            {service.name}
                          </h3>
                          <span className="text-xl sm:text-2xl font-playfair text-gold whitespace-nowrap">
                            {service.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock size={13} />
                          <span className="text-xs tracking-wide">{service.duration}</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-border">
                        <button
                          onClick={openCalendly}
                          className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-semibold tracking-wide text-foreground/50 group-hover:text-white group-hover:bg-gold rounded-full border border-transparent group-hover:border-gold transition-all duration-500"
                        >
                          <Calendar size={15} />
                          Réserver ce soin
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </Card>
                  </MagneticCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-36 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[100px]" />
        <GoldenParticles count={20} speed={0.15} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <FloatingElement speed={0.08} direction="up" className="absolute top-6 left-[18%] hidden sm:block pointer-events-none">
            <span className="text-gold/30 text-lg">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.1} direction="down" className="absolute top-14 right-[22%] hidden sm:block pointer-events-none">
            <span className="text-gold/20 text-sm">&#10022;</span>
          </FloatingElement>

          <LashDivider className="mb-10" color="#d4b896" />

          <p className="text-gold text-[13px] tracking-[0.25em] uppercase font-medium mb-6">
            Consultation personnalisée
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-4xl sm:text-5xl text-white mb-6 leading-tight"
          >
            Trouvez le style <em className="italic text-gold-light">parfait</em>
            <br />pour votre regard
          </motion.h2>

          <p className="text-white/50 text-lg sm:text-xl mb-14 leading-relaxed max-w-xl mx-auto">
            Emmy vous conseille gratuitement pour trouver la pose idéale.
            Chaque service est personnalisable selon vos envies.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Button
              onClick={openCalendly}
              className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-14 py-5 h-auto text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
            >
              <Sparkles size={18} className="mr-2" />
              Réserver un Créneau
            </Button>
            <Button
              onClick={() => window.open('https://instagram.com/emmycils', '_blank')}
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/5 hover:border-gold/50 px-14 py-5 h-auto text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 bg-transparent font-semibold"
            >
              Voir les Résultats
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 text-white/30 text-xs"
          >
            <div className="flex -space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.06, type: 'spring', stiffness: 300 }}
                  className="w-6 h-6 rounded-full bg-gold/20 border-2 border-[#0a0a0a] flex items-center justify-center"
                >
                  <Heart size={10} className="text-gold/60" />
                </motion.div>
              ))}
            </div>
            <span><CountUp end={17} duration={1.5} /> prestations sur-mesure</span>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
