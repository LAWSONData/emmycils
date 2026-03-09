'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Crown,
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'
import { formations } from '@/lib/formations'

export default function FormationsElitePage() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const formation = formations[formations.length - 1]

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0b08] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gold/[0.05] rounded-full blur-[150px]" />

          {/* Decorative circles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/[0.08] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gold/[0.05] rounded-full"
          />
        </motion.div>

        <GoldenParticles count={40} speed={0.06} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full px-6 lg:px-8 py-24"
        >
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <Crown size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-gold text-[11px] tracking-[0.3em] uppercase font-semibold">
                    Programme Elite
                  </p>
                  <p className="text-white/70 text-xs">
                    Pour les techniciennes qui veulent aller plus loin
                  </p>
                </div>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Rejoins le <span className="italic text-gold-light">niveau supérieur</span>
              </h1>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl">
                Accède à la Formation Avancée Pose Classique en Ligne et prépare-toi à intégrer
                les futurs modules Elite : volume, business, satisfaction cliente avancée.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">
                  <Play size={13} className="text-gold" />
                  19 leçons en ligne
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">
                  <BookOpen size={13} className="text-gold" />
                  {formation.modulesCount} modules
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">
                  <Clock size={13} className="text-gold" />
                  Accès illimité
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">
                  <Star size={13} className="text-gold" />
                  Certificat inclus
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href={`/formations/${formation.slug}`}>
                  <Button className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-8 py-3 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full font-semibold inline-flex items-center gap-2">
                    <GraduationCap size={16} />
                    En savoir plus sur la formation
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative rounded-3xl border border-gold/25 bg-white/[0.03] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-white/70 text-sm">
                    Formation mise en avant
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/40">
                    <Crown size={12} />
                    Programme Elite
                  </span>
                </div>
                <h2 className="font-playfair text-xl text-white">
                  {formation.title}
                </h2>
                <p className="text-gold-light text-sm italic">
                  {formation.subtitle}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {formation.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex flex-col gap-1 text-xs text-white/60">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-emerald-400" />
                      Accès immédiat après paiement
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-emerald-400" />
                      Support PDF + vidéos HD
                    </span>
                  </div>
                  <p className="font-playfair text-3xl text-gold">
                    {formation.priceDisplay}
                  </p>
                </div>
              </div>
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
            <span className="text-white/30 text-[11px] tracking-[0.2em] uppercase">Explorer</span>
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

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-8 bg-[#0d0b08] relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Crown size={12} />
              Avantages Elite
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-4">
              Pourquoi choisir le programme <span className="italic text-gold-light">Elite</span> ?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Formation Avancée',
                description: 'Accédez à des techniques de niveau supérieur pour vous démarquer'
              },
              {
                icon: Star,
                title: 'Certificat Reconnu',
                description: 'Obtenez une certification qui valorise votre expertise'
              },
              {
                icon: Sparkles,
                title: 'Communauté Exclusive',
                description: 'Rejoignez un groupe de techniciennes passionnées'
              },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-all duration-500">
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <benefit.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-playfair text-xl text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

