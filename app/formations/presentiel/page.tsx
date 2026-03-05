'use client'

import { useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Clock,
  Users,
  Award,
  CheckCircle,
  Calendar,
  Star,
  Sparkles,
  Gift,
  Heart,
  Shield,
  ArrowRight,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'

const formationsPresentiel = [
  {
    id: 1,
    title: 'Formation Initiation',
    subtitle: 'Les bases des extensions de cils',
    description: 'Formation complète pour débutantes. Apprenez les fondamentaux de la pose cil à cil dans un cadre professionnel.',
    duration: '2 jours',
    participants: '4 max',
    price: '590€',
    popular: false,
    includes: [
      'Kit de démarrage offert',
      'Support de cours complet',
      'Certificat de formation',
      'Pratique sur modèle',
    ],
  },
  {
    id: 2,
    title: 'Formation Volume Russe',
    subtitle: 'Maîtrisez les techniques de volume',
    description: 'Perfectionnez vos compétences avec les techniques de volume russe 2D à 6D.',
    duration: '2 jours',
    participants: '4 max',
    price: '790€',
    popular: true,
    includes: [
      'Kit volume professionnel',
      'Techniques de bouquets',
      'Certificat de formation',
      'Suivi post-formation',
    ],
  },
  {
    id: 3,
    title: 'Formation Perfectionnement',
    subtitle: 'Techniques avancées et créatives',
    description: 'Pour les professionnelles souhaitant se perfectionner sur les techniques créatives.',
    duration: '1 jour',
    participants: '4 max',
    price: '490€',
    popular: false,
    includes: [
      'Techniques créatives avancées',
      'Correction des erreurs',
      'Certificat de perfectionnement',
      'Accès groupe privé',
    ],
  },
]

const advantages = [
  { icon: Users, title: 'Petits groupes', desc: '4 élèves maximum pour un suivi personnalisé et une attention dédiée' },
  { icon: Star, title: 'Pratique réelle', desc: 'Exercices sur modèles humains pour une expérience concrète' },
  { icon: Award, title: 'Certification', desc: 'Diplôme reconnu à la fin de la formation pour valoriser vos compétences' },
  { icon: MapPin, title: 'Cadre premium', desc: 'Formation dans notre salon équipé avec le matériel professionnel' },
]

export default function FormationsPresentielPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section - Elegant avec animations */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background amélioré */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          {/* Fond principal avec meilleur contraste */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />

          {/* Image de fond subtile */}
          <div className="absolute inset-0 bg-[url('/gallery/06-hollywood.jpg')] bg-cover bg-center opacity-[0.08]" />

          {/* Gradient overlay pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a]/95 to-[#12100d]" />

          {/* Glow effects */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px]"
          />

          {/* Grid pattern subtil */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(200,169,126,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </motion.div>

        {/* Floating animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-gold/[0.03] rounded-full"
          />

          {/* Floating lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent"
              style={{ left: `${15 + i * 18}%`, top: `${10 + i * 12}%` }}
              animate={{ y: [-30, 30, -30], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <GoldenParticles count={35} speed={0.06} />

        {/* Content avec animations staggerées */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              {/* Badge animé */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 mb-10"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 shadow-[0_0_30px_rgba(200,169,126,0.2)] flex items-center justify-center"
                >
                  <MapPin size={24} className="text-gold" />
                </motion.div>
                <div>
                  <span className="text-gold text-[11px] tracking-[0.25em] uppercase font-semibold block">
                    Formation
                  </span>
                  <span className="text-white/60 text-sm">
                    En présentiel
                  </span>
                </div>
              </motion.div>

              {/* Title avec animation mot par mot */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="font-playfair text-6xl sm:text-7xl lg:text-8xl text-white leading-[1.05] mb-2">
                    Apprenez
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="font-playfair text-6xl sm:text-7xl lg:text-8xl italic text-gold-light leading-[1.05]">
                    en immersion
                  </h1>
                </motion.div>
              </div>

              {/* Ligne décorative animée */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[2px] bg-gradient-to-r from-gold to-gold/30 mb-8"
              />

              {/* Description avec meilleure lisibilité */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-white/60 text-xl md:text-2xl leading-relaxed mb-12 max-w-xl font-light"
              >
                Rejoignez nos formations exclusives dans notre salon et bénéficiez
                d&apos;un accompagnement personnalisé avec pratique sur modèle.
              </motion.p>

              {/* Stats avec animations individuelles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-6 sm:gap-10"
              >
                {[
                  { value: '100+', label: 'Élèves formées', delay: 0.7 },
                  { value: '4', label: 'Élèves max/session', delay: 0.8 },
                  { value: '100%', label: 'Pratique', delay: 0.9 },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group"
                  >
                    <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-gold/30 hover:bg-white/[0.05] transition-all duration-500">
                      <motion.p
                        className="font-playfair text-4xl sm:text-5xl text-gold mb-1"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: stat.delay + 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-white/40 text-sm tracking-wide">{stat.label}</p>
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button dans le hero */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-12"
              >
                <Button
                  onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
                  className="cta-shimmer cta-glow group bg-gold hover:bg-gold-dark text-white px-10 py-5 h-auto text-sm tracking-[0.1em] uppercase rounded-full font-semibold"
                >
                  <Calendar size={18} className="mr-3" />
                  <span>Réserver ma place</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-3"
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">Découvrir</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-gold rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Formations Grid - Premium Cards */}
      <section className="py-24 px-6 lg:px-8 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Calendar size={12} />
              Prochaines sessions disponibles
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-foreground">
              Choisissez votre <span className="italic text-gold">formation</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {formationsPresentiel.map((formation, i) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className={`group relative ${formation.popular ? 'lg:-mt-8 lg:mb-8' : ''}`}
              >
                <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                  formation.popular
                    ? 'bg-[#0a0a0a] text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]'
                    : 'bg-white border border-border hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(200,169,126,0.15)]'
                }`}>
                  {/* Popular badge */}
                  {formation.popular && (
                    <div className="absolute top-0 inset-x-0">
                      <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-white text-[10px] tracking-[0.1em] uppercase font-semibold">
                        <Star size={10} className="fill-white" />
                        Populaire
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className={`font-playfair text-2xl mb-2 ${formation.popular ? 'text-white' : 'text-foreground'}`}>
                        {formation.title}
                      </h3>
                      <p className={`text-sm italic ${formation.popular ? 'text-gold-light' : 'text-gold'}`}>
                        {formation.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-6 ${formation.popular ? 'text-white/60' : 'text-muted-foreground'}`}>
                      {formation.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full ${
                        formation.popular ? 'bg-white/10 text-white/70' : 'bg-warm text-muted-foreground'
                      }`}>
                        <Clock size={12} className="text-gold" />
                        {formation.duration}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full ${
                        formation.popular ? 'bg-white/10 text-white/70' : 'bg-warm text-muted-foreground'
                      }`}>
                        <Users size={12} className="text-gold" />
                        {formation.participants}
                      </span>
                    </div>

                    {/* Includes */}
                    <div className="space-y-3 mb-8">
                      {formation.includes.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                          <span className={`text-sm ${formation.popular ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className={`pt-6 border-t ${formation.popular ? 'border-white/10' : 'border-border'}`}>
                      <div className="flex items-end justify-between mb-6">
                        <div>
                          <p className={`text-xs uppercase tracking-wider mb-1 ${formation.popular ? 'text-white/40' : 'text-muted-foreground'}`}>
                            Tarif
                          </p>
                          <p className="font-playfair text-4xl text-gold">{formation.price}</p>
                        </div>
                        {formation.popular && (
                          <div className="flex items-center gap-1.5 text-gold-light text-xs">
                            <Gift size={12} />
                            <span>Kit offert</span>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
                        className={`w-full h-14 text-sm tracking-[0.05em] uppercase rounded-2xl font-semibold transition-all ${
                          formation.popular
                            ? 'cta-shimmer bg-gold hover:bg-gold-dark text-white'
                            : 'bg-foreground hover:bg-foreground/90 text-white'
                        }`}
                      >
                        <Calendar size={16} className="mr-2" />
                        Réserver ma place
                      </Button>
                    </div>
                  </div>

                  {/* Hover effect for non-popular */}
                  {!formation.popular && (
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/20 transition-colors pointer-events-none" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 px-6 lg:px-8 bg-warm relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-foreground mb-4">
              L&apos;expérience <span className="italic text-gold">présentiel</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une immersion complète pour maîtriser votre art
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-3xl bg-white border border-border hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(200,169,126,0.1)] transition-all duration-500">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-playfair text-xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.04] rounded-full blur-[120px]" />
        <GoldenParticles count={25} speed={0.1} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-10 rounded-3xl bg-gold/10 border border-gold/20"
          >
            <Sparkles size={32} className="text-gold" />
          </motion.div>

          <h2 className="font-playfair text-5xl sm:text-6xl text-white mb-6 leading-tight">
            Prête à vous former
            <br />
            <span className="italic text-gold-light">en présentiel ?</span>
          </h2>

          <p className="text-white/40 text-xl mb-12 max-w-xl mx-auto">
            Réservez votre place pour la prochaine session et commencez votre transformation
          </p>

          <Button
            onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
            className="cta-shimmer cta-glow group bg-gold hover:bg-gold-dark text-white px-14 py-6 h-auto text-base tracking-[0.1em] uppercase rounded-2xl font-semibold"
          >
            <span className="mr-3">Réserver ma Formation</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={18} />
            </motion.span>
          </Button>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            {[
              { icon: Shield, text: 'Places limitées' },
              { icon: Heart, text: 'Kit inclus' },
              { icon: Award, text: 'Certifiée' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/30 text-xs">
                <item.icon size={14} />
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
