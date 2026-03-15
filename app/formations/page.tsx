'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Clock,
  BookOpen,
  Play,
  GraduationCap,
  ArrowRight,
  Monitor,
  MapPin,
  Crown,
  Sparkles,
  CheckCircle,
  Users,
  Star,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles, LashDivider } from '@/components/animations'
import { formations } from '@/lib/formations'

// Types de formations - Cachés temporairement
// const formationTypes = [
//   {
//     id: 'en-ligne',
//     title: 'En Ligne',
//     subtitle: 'Apprenez à votre rythme',
//     description: 'Formations 100% digitales accessibles 24h/24. Vidéos HD, supports PDF et accès illimité.',
//     icon: Monitor,
//     href: '/formations/en-ligne',
//     color: 'from-emerald-500/20 to-emerald-500/5',
//     borderColor: 'border-emerald-500/30',
//     iconBg: 'bg-emerald-500/10',
//     features: ['Accès instantané', 'Vidéos HD', 'Support PDF'],
//   },
//   {
//     id: 'presentiel',
//     title: 'Présentiel',
//     subtitle: 'Formation immersive',
//     description: 'Sessions en petit groupe dans notre salon. Pratique sur modèle et accompagnement personnalisé.',
//     icon: MapPin,
//     href: '/formations/presentiel',
//     color: 'from-gold/20 to-gold/5',
//     borderColor: 'border-gold/30',
//     iconBg: 'bg-gold/10',
//     features: ['4 élèves max', 'Pratique réelle', 'Kit inclus'],
//   },
//   {
//     id: 'elite',
//     title: 'Programme Elite',
//     subtitle: 'Pour aller plus loin',
//     description: 'Accédez à la formation avancée et préparez-vous aux futurs modules Elite exclusifs.',
//     icon: Crown,
//     href: '/formations/elite',
//     color: 'from-purple-500/20 to-purple-500/5',
//     borderColor: 'border-purple-500/30',
//     iconBg: 'bg-purple-500/10',
//     features: ['Niveau avancé', 'Certificat', 'Communauté'],
//   },
// ]

const stats = [
  { value: '100+', label: 'Élèves formées', icon: Users },
  { value: '4.9', label: 'Note moyenne', icon: Star },
  { value: '22', label: 'Vidéos HD', icon: BookOpen },
]

export default function FormationsPage() {
  const featured = formations[formations.length - 1]
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section - Immersive */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          <Image
            src="/gallery/06-hollywood.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/40 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
        </motion.div>

        {/* Animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold/[0.07] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/[0.05] rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px]"
          />
        </div>

        <GoldenParticles count={40} speed={0.06} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <GraduationCap size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-semibold">
                    Emmy Cils Academy
                  </p>
                  <p className="text-white/50 text-sm">Formations professionnelles</p>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
              >
                Développez votre
                <br />
                <span className="italic text-gold-light">expertise</span>
              </motion.h1>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[2px] bg-gradient-to-r from-gold to-gold/30 mb-8"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-xl leading-relaxed mb-10 max-w-xl"
              >
                Des formations complètes pour maîtriser l'art des extensions de cils,
                du niveau débutant à expert.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={16} className="text-gold" />
                      <span className="font-playfair text-3xl text-white">{stat.value}</span>
                    </div>
                    <p className="text-white/40 text-xs">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">
              Découvrir
            </span>
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

      {/* Formation Types - Cards */}
      <section className="py-24 px-6 lg:px-8 bg-cream relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Sparkles size={12} />
              Nos programmes
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-foreground mb-4">
              Nouveaux <span className="italic text-gold">modules</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              De nouvelles formations arrivent très prochainement
            </p>

            {/* Message Bientôt disponibles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-dashed border-gold/30 p-12">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gold/10 to-transparent" />

                <div className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <Sparkles size={32} className="text-gold" />
                  </div>

                  <h3 className="font-playfair text-3xl text-foreground mb-4">
                    Bientôt disponibles
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Nous préparons de nouvelles formations exclusives pour vous accompagner dans votre développement professionnel.
                  </p>

                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 text-gold text-sm font-medium">
                    <Clock size={16} />
                    Nouveaux modules en préparation
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Formation */}
      <section className="py-24 px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[150px]" />

        <GoldenParticles count={25} speed={0.1} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Star size={12} className="fill-gold" />
              Formation phare
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-4">
              Notre formation <span className="italic text-gold-light">best-seller</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-gold/20 backdrop-blur-sm">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

              <div className="p-8 sm:p-10 lg:p-12 grid lg:grid-cols-5 gap-10 items-center">
                {/* Left - Image */}
                <div className="lg:col-span-2 hidden lg:block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/gallery/06-hollywood.jpg"
                      alt={featured.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold text-white text-[11px] tracking-[0.1em] uppercase font-medium w-fit">
                        <Sparkles size={12} />
                        Best-seller
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Content */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-[0.18em] uppercase text-white/70">
                    <Monitor size={14} className="text-gold" />
                    Formation 100% en ligne
                  </div>

                  <h3 className="font-playfair text-3xl sm:text-4xl text-white">
                    {featured.title}
                  </h3>

                  <p className="text-gold-light text-sm italic">
                    {featured.subtitle}
                  </p>

                  <p className="text-white/60 leading-relaxed">
                    {featured.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10">
                      <Clock size={13} className="text-gold" />
                      {featured.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10">
                      <BookOpen size={13} className="text-gold" />
                      {featured.modulesCount} modules
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10">
                      <Play size={13} className="text-gold" />
                      {featured.includes.videos.length} vidéos HD
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-white/5 text-white/70 border border-white/10">
                      <GraduationCap size={13} className="text-gold" />
                      Certificat inclus
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-end gap-6 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/40 mb-1">
                        Accès complet
                      </p>
                      <p className="font-playfair text-4xl text-gold">
                        {featured.priceDisplay}
                      </p>
                      <p className="text-[11px] text-white/40 mt-1">
                        Paiement unique · Accès illimité
                      </p>
                    </div>

                    <Link href={`/formations/${featured.slug}`} className="sm:ml-auto">
                      <Button className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full font-semibold inline-flex items-center gap-3">
                        <GraduationCap size={18} />
                        En savoir plus
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-warm relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.05] rounded-full blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <LashDivider className="mb-10" />

          <h2 className="font-playfair text-4xl sm:text-5xl text-foreground mb-6">
            Une question sur nos <span className="italic text-gold">formations</span> ?
          </h2>

          <p className="text-muted-foreground text-lg mb-10">
            Contactez-nous pour en savoir plus ou discuter de vos objectifs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 h-auto text-sm tracking-[0.05em] uppercase rounded-full font-medium border-foreground/20 hover:border-gold hover:text-gold"
              >
                Nous contacter
              </Button>
            </Link>
            <Button
              onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
              className="cta-shimmer w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 py-4 h-auto text-sm tracking-[0.05em] uppercase rounded-full font-semibold"
            >
              Réserver un appel
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
