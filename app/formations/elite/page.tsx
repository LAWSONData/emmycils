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
  Award,
  Users,
  CreditCard,
  Loader2,
  Sparkles,
  GraduationCap,
  Diamond,
  Zap,
  Shield,
  Heart,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'
import { formations } from '@/lib/formations'

export default function FormationsElitePage() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const featured = formations[0]

  const benefits = [
    { icon: Diamond, title: 'Contenu Exclusif', desc: 'Techniques signature réservées aux élèves Elite' },
    { icon: Award, title: 'Certification Pro', desc: 'Diplôme reconnu dans le secteur beauté' },
    { icon: Users, title: 'Communauté VIP', desc: 'Accès au groupe privé et networking' },
    { icon: Zap, title: 'Accès Illimité', desc: 'Revisionnez les cours à vie' },
    { icon: Shield, title: 'Support Premium', desc: 'Assistance personnalisée par email' },
    { icon: Heart, title: 'Mises à Jour', desc: 'Nouveaux contenus offerts' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section - Ultra Premium */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0b08] to-[#0a0a0a]" />

          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(200,169,126,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200,169,126,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }} />
          </div>

          {/* Radial glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gold/[0.04] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[100px]" />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [-50, 50, -50],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <GoldenParticles count={40} speed={0.06} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Text */}
              <div>
                {/* Elite badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-3 mb-8"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold via-gold-light to-gold flex items-center justify-center shadow-[0_0_40px_rgba(200,169,126,0.4)]">
                      <Crown size={24} className="text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl border-2 border-gold/50"
                    />
                  </div>
                  <div>
                    <p className="text-gold text-[11px] tracking-[0.3em] uppercase font-semibold">Programme</p>
                    <p className="text-white text-xl font-playfair">Elite</p>
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
                >
                  L&apos;Excellence
                  <br />
                  <span className="italic text-gold-light">à portée de main</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white/50 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
                >
                  Notre programme le plus complet pour maîtriser l&apos;art des extensions de cils
                  et devenir une référence dans votre domaine.
                </motion.p>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-6 mb-10"
                >
                  {[
                    { icon: Play, value: '22', label: 'Vidéos HD' },
                    { icon: BookOpen, value: '2', label: 'Modules' },
                    { icon: Clock, value: '∞', label: 'Accès illimité' },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <stat.icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-white text-xl font-playfair">{stat.value}</p>
                        <p className="text-white/40 text-xs">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA vers page détaillée */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                  <Link href="/formations/technique-niveau-2">
                    <Button className="cta-shimmer cta-glow group bg-gradient-to-r from-gold to-gold-light hover:from-gold-dark hover:to-gold text-white px-10 py-6 h-auto text-sm tracking-[0.1em] uppercase rounded-2xl font-semibold shadow-[0_10px_50px_rgba(200,169,126,0.3)]">
                      <GraduationCap size={20} className="mr-3" />
                      En savoir plus
                    </Button>
                  </Link>
                  <div className="text-center sm:text-left">
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Investissement</p>
                    <p className="font-playfair text-4xl text-gold">{featured.priceDisplay}</p>
                  </div>
                </motion.div>
              </div>

              {/* Right - Visual card */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative rounded-3xl overflow-hidden border border-gold/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                    {/* Gold accent bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                          <Crown size={20} className="text-gold" />
                        </div>
                        <div>
                          <p className="text-gold text-xs tracking-[0.15em] uppercase">Formation</p>
                          <p className="text-white font-playfair text-lg">Elite</p>
                        </div>
                      </div>
                      <div className="flex -space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-gold fill-gold" />
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-2xl text-white mb-2">{featured.title}</h3>
                    <p className="text-gold-light text-sm italic mb-6">{featured.subtitle}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {featured.highlights.slice(0, 4).map((h, i) => (
                        <motion.div
                          key={h}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-gold" />
                          </div>
                          <span className="text-white/70 text-sm">{h}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between pt-6 border-t border-white/10">
                      <div>
                        <p className="text-white/30 text-xs uppercase tracking-wider">Prix</p>
                        <p className="font-playfair text-3xl text-gold">{featured.priceDisplay}</p>
                      </div>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Shield size={14} />
                        <span>Paiement sécurisé</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold/20 rounded-3xl" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold/10 rounded-3xl" />

                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-6 -right-6 px-4 py-2 rounded-full bg-gold text-white text-xs font-semibold shadow-[0_10px_30px_rgba(200,169,126,0.4)]"
                  >
                    <Sparkles size={12} className="inline mr-1" />
                    Best-seller
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs tracking-widest uppercase">Découvrir</span>
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section autres formations Elite (teaser) */}
      <section className="relative py-24 px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs tracking-[0.2em] uppercase mb-6">
              <Play size={12} />
              Formations Elite
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-4">
              D&apos;autres formations Elite <span className="italic text-gold-light">bientôt disponibles</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto">
              Le programme complet de la formation en ligne est détaillé sur la page &laquo; En savoir plus &raquo;.
              Ici, tu découvriras prochainement les autres parcours Elite.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'Elite Volume Russe',
                subtitle: 'Bouquets avancés & rétention maximale',
              },
              {
                title: 'Elite Mega Volume',
                subtitle: 'Effets signature et looks éditoriaux',
              },
              {
                title: 'Elite Business & Fidélisation',
                subtitle: 'Remplir ton agenda avec les bonnes clientes',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-500"
              >
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 text-gold text-[11px] uppercase tracking-[0.15em]">
                    Bientôt
                  </span>
                </div>
                <h3 className="font-playfair text-lg text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs text-white/40">
                  Rejoins la formation en ligne dès maintenant et sois prioritaire lorsque ces
                  nouveaux modules Elite ouvriront.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-24 px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0d0b08]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl sm:text-5xl text-white mb-4">
              Pourquoi choisir <span className="italic text-gold-light">l&apos;Elite ?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-gold/20 transition-all duration-500"
              >
                <div className="w-14 h-14 mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon size={24} className="text-gold" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{benefit.desc}</p>

                {/* Corner accent */}
                <div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold/50 to-transparent" />
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold/50 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA vers page détaillée */}
      <section className="relative py-32 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-[150px]" />
        </div>
        <GoldenParticles count={30} speed={0.08} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-24 h-24 mb-10 rounded-3xl bg-gradient-to-br from-gold to-gold-light shadow-[0_0_60px_rgba(200,169,126,0.4)]"
          >
            <Crown size={40} className="text-white" />
          </motion.div>

          <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-tight">
            Rejoignez l&apos;élite
            <br />
            <span className="italic text-gold-light">dès aujourd&apos;hui</span>
          </h2>

          <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto">
            Investissez dans votre talent et transformez votre passion en expertise reconnue
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/formations/technique-niveau-2">
              <Button className="cta-shimmer cta-glow bg-gradient-to-r from-gold to-gold-light hover:from-gold-dark hover:to-gold text-white px-14 py-6 h-auto text-base tracking-[0.1em] uppercase rounded-2xl font-semibold shadow-[0_15px_60px_rgba(200,169,126,0.4)]">
                <Crown size={20} className="mr-3" />
                En savoir plus
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-12"
          >
            {[
              { icon: Shield, text: 'Paiement sécurisé' },
              { icon: Zap, text: 'Accès immédiat' },
              { icon: Heart, text: 'Satisfaction garantie' },
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
