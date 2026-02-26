'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  BookOpen,
  Clock,
  Award,
  FileText,
  Play,
  ShoppingCart,
  CheckCircle,
  CreditCard,
  Mail,
  ArrowRight,
  Loader2,
  Sparkles,
  Heart,
  GraduationCap,
  Star,
  Shield,
  Layers,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { formations, type Formation } from '@/lib/formations'
import { LashDivider, MagneticCard, GoldenParticles, FloatingElement, CountUp } from '@/components/animations'

export default function FormationsPage() {
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleBuy = (formation: Formation) => {
    setSelectedFormation(formation)
    setEmail('')
    setDialogOpen(true)
  }

  const handleCheckout = async () => {
    if (!selectedFormation || !email) return

    setLoading(true)
    try {
      const res = await fetch('/api/formations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formationId: selectedFormation.id,
          customerEmail: email,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      console.error('Checkout error')
    } finally {
      setLoading(false)
    }
  }

  const levelStyle = (level: Formation['level']) => {
    switch (level) {
      case 'debutant':
        return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400' }
      case 'intermediaire':
        return { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-400' }
      case 'avance':
        return { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-400' }
    }
  }

  // Featured formation = Certification Pro (last one)
  const featured = formations[formations.length - 1]
  const otherFormations = formations.slice(0, -1)

  const steps = [
    {
      icon: BookOpen,
      title: 'Choisissez',
      description: 'Sélectionnez la formation adaptée à votre niveau.',
    },
    {
      icon: CreditCard,
      title: 'Payez en ligne',
      description: 'Paiement sécurisé par carte via Stripe.',
    },
    {
      icon: Mail,
      title: 'Recevez tout',
      description: 'PDFs et vidéos livrés instantanément par email.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ─── Header ─── */}
      <section className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-6 lg:px-8 bg-warm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-5"
          >
            <p className="text-gold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium">
              Formations professionnelles
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              Devenez Experte
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Des formations complètes pour maîtriser l&apos;art des extensions de cils.
              PDFs détaillés et vidéos professionnelles livrés dans votre boîte mail.
            </motion.p>
            <LashDivider className="pt-2" />
          </motion.div>

          {/* Stats badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 sm:mt-12"
          >
            {[
              { icon: Layers, value: '5', label: 'Formations' },
              { icon: Clock, value: '98h', label: 'de contenu' },
              { icon: FileText, value: '19', label: 'PDFs inclus' },
              { icon: Play, value: '23', label: 'Vidéos' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-border"
              >
                <stat.icon size={15} className="text-gold flex-shrink-0" />
                <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Featured: Certification Pro ─── */}
      <section className="py-10 sm:py-14 lg:py-16 px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7 }}
          >
            <Card className="relative overflow-hidden bg-[#0a0a0a] border-none text-white">
              {/* Background effects */}
              <div className="absolute inset-0 dot-pattern" />
              <div className="absolute -top-20 -right-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gold/[0.06] rounded-full blur-[100px]" />

              <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-14">
                {/* Top badges row */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full bg-gold text-white">
                    <Star size={11} />
                    Formation phare
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">
                    <Shield size={11} />
                    Certifiante
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
                  {/* Left: info */}
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <h2 className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3 leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-gold-light text-sm sm:text-base italic">
                        {featured.subtitle}
                      </p>
                    </div>

                    <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                      {featured.description}
                    </p>

                    {/* Meta pills */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-white/15 text-white/70">
                        <Clock size={13} className="text-gold" />
                        {featured.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-white/15 text-white/70">
                        <BookOpen size={13} className="text-gold" />
                        {featured.modulesCount} modules
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-white/15 text-white/70">
                        <FileText size={13} className="text-gold" />
                        {featured.includes.pdfs.length} PDFs
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border border-white/15 text-white/70">
                        <Play size={13} className="text-gold" />
                        {featured.includes.videos.length} vidéos
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
                      <div>
                        <p className="text-[11px] text-white/40 uppercase tracking-wider mb-1">
                          Accès complet
                        </p>
                        <span className="font-playfair text-4xl sm:text-5xl text-gold font-bold">
                          {featured.priceDisplay}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleBuy(featured)}
                        className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 sm:px-10 py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
                      >
                        <GraduationCap size={17} className="mr-2" />
                        Obtenir la Certification
                      </Button>
                    </div>
                  </div>

                  {/* Right: highlights */}
                  <div className="space-y-5">
                    <p className="text-[11px] sm:text-xs font-semibold text-gold uppercase tracking-[0.15em]">
                      Tout ce qui est inclus
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      {featured.highlights.map((h, i) => (
                        <motion.li
                          key={h}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle
                            size={16}
                            className="text-gold mt-0.5 flex-shrink-0"
                          />
                          <span className="text-white/70 text-sm leading-relaxed">
                            {h}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Other Formations Grid ─── */}
      <section className="py-10 sm:py-14 lg:py-20 px-6 lg:px-8 bg-warm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <p className="text-gold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium mb-3">
              Par niveau
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-foreground">
              Toutes nos Formations
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {otherFormations.map((formation, i) => {
              const style = levelStyle(formation.level)
              return (
                <motion.div
                  key={formation.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                >
                  <MagneticCard className="h-full" intensity={3}>
                    <Card className="card-lift h-full bg-white border border-border hover:border-gold/40 group flex flex-col overflow-hidden">
                      {/* Gold accent top bar */}
                      <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

                      <div className="p-5 sm:p-6 lg:p-7 flex-grow flex flex-col">
                        {/* Header: badge + title + price */}
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full border ${style.bg}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                              {formation.levelLabel}
                            </span>
                            <span className="font-playfair text-2xl sm:text-3xl text-gold font-bold">
                              {formation.priceDisplay}
                            </span>
                          </div>

                          <h3 className="font-playfair font-bold text-lg sm:text-xl lg:text-2xl text-foreground leading-tight">
                            {formation.title}
                          </h3>

                          <p className="text-gold/80 text-sm italic">
                            {formation.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-5">
                          {formation.description}
                        </p>

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-warm text-muted-foreground">
                            <Clock size={12} className="text-gold" />
                            {formation.duration}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-warm text-muted-foreground">
                            <BookOpen size={12} className="text-gold" />
                            {formation.modulesCount} modules
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-warm text-muted-foreground">
                            <FileText size={12} className="text-gold" />
                            {formation.includes.pdfs.length} PDFs
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-warm text-muted-foreground">
                            <Play size={12} className="text-gold" />
                            {formation.includes.videos.length} vidéos
                          </span>
                        </div>

                        {/* Highlights — show 4 max */}
                        <div className="space-y-2 mb-6 flex-grow">
                          <p className="text-[10px] sm:text-[11px] font-semibold text-foreground/70 uppercase tracking-[0.1em]">
                            Points clés
                          </p>
                          <ul className="space-y-2">
                            {formation.highlights.slice(0, 4).map((h) => (
                              <li
                                key={h}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle
                                  size={13}
                                  className="text-gold mt-0.5 flex-shrink-0"
                                />
                                <span className="text-muted-foreground text-[13px] leading-relaxed">
                                  {h}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA */}
                        <Button
                          onClick={() => handleBuy(formation)}
                          className="cta-shimmer w-full bg-gold hover:bg-gold-dark text-white h-12 sm:h-13 text-[12px] sm:text-sm tracking-[0.06em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_25px_rgba(200,169,126,0.4)] font-semibold"
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          Acheter — {formation.priceDisplay}
                        </Button>
                      </div>
                    </Card>
                  </MagneticCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Comment ça marche ─── */}
      <section className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8 sm:mb-12"
          >
            <p className="text-gold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium mb-3 sm:mb-4">
              Simple & rapide
            </p>
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              Comment ça marche ?
            </h2>
            <LashDivider />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
              >
                <Card className="card-lift p-5 sm:p-6 lg:p-8 text-center bg-white border border-border hover:border-gold/40 transition-all duration-500 h-full">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-5 rounded-full bg-gold/10 flex items-center justify-center breathe-glow">
                    <step.icon size={20} className="text-gold" />
                  </div>
                  <div className="text-gold font-playfair text-xs sm:text-sm mb-1.5 sm:mb-2">
                    Étape {i + 1}
                  </div>
                  <h3 className="font-playfair font-semibold text-base sm:text-lg lg:text-xl text-foreground mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Dark ─── */}
      <section className="relative py-16 sm:py-24 lg:py-36 px-6 lg:px-8 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 dot-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-gold/[0.04] rounded-full blur-[100px]" />
        <GoldenParticles count={20} speed={0.15} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <FloatingElement speed={0.08} direction="up" className="absolute top-4 left-[12%] hidden sm:block pointer-events-none">
            <span className="text-gold/30 text-lg">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.1} direction="down" className="absolute top-12 right-[18%] hidden sm:block pointer-events-none">
            <span className="text-gold/20 text-sm">&#10022;</span>
          </FloatingElement>

          <LashDivider className="mb-6 sm:mb-10" color="#d4b896" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gold text-[11px] sm:text-[13px] tracking-[0.25em] uppercase font-medium mb-4 sm:mb-6"
          >
            Investissez dans votre talent
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 leading-tight"
          >
            Prête à devenir <em className="italic text-gold-light">experte&nbsp;?</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-white/50 text-base sm:text-lg md:text-xl mb-8 sm:mb-14 leading-relaxed max-w-xl mx-auto"
          >
            Nos formations complètes vous donnent toutes les clés pour exceller
            dans l&apos;art des extensions de cils.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mb-8 sm:mb-10"
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cta-shimmer cta-glow w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 sm:px-14 py-4 sm:py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold"
            >
              <GraduationCap size={17} className="mr-2" />
              Choisir ma Formation
            </Button>
            <Button
              onClick={() => window.open('https://calendly.com/emmycils', 'calendly')}
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/5 hover:border-gold/50 px-8 sm:px-14 py-4 sm:py-5 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 bg-transparent font-semibold"
            >
              Poser une Question
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 text-white/30 text-xs"
          >
            <div className="flex -space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 + i * 0.06, type: 'spring', stiffness: 300 }}
                  className="w-6 h-6 rounded-full bg-gold/20 border-2 border-[#0a0a0a] flex items-center justify-center"
                >
                  <Heart size={10} className="text-gold/60" />
                </motion.div>
              ))}
            </div>
            <span><CountUp end={5} duration={1} /> formations · PDFs + Vidéos inclus</span>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      {/* ─── Email Dialog ─── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="font-playfair text-lg sm:text-xl">
              {selectedFormation?.title}
            </DialogTitle>
            <DialogDescription className="text-sm">
              Entrez votre email pour recevoir le contenu après paiement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-3 sm:py-4">
            <div className="space-y-2">
              <label
                htmlFor="checkout-email"
                className="text-sm font-medium text-foreground"
              >
                Votre email
              </label>
              <Input
                id="checkout-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && email) handleCheckout()
                }}
                className="h-11 sm:h-12 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
              />
              <p className="text-xs text-muted-foreground">
                Les PDFs et vidéos seront envoyés à cette adresse.
              </p>
            </div>
            {selectedFormation && (
              <div className="bg-warm rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Formation</span>
                  <span className="font-medium text-right max-w-[180px] truncate">
                    {selectedFormation.title}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contenu</span>
                  <span>
                    {selectedFormation.includes.pdfs.length} PDFs +{' '}
                    {selectedFormation.includes.videos.length} vidéos
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-border mt-2">
                  <span className="font-medium">Total</span>
                  <span className="text-gold font-playfair text-xl font-bold">
                    {selectedFormation.priceDisplay}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleCheckout}
              disabled={!email || loading}
              className="cta-shimmer w-full bg-gold hover:bg-gold-dark text-white h-12 sm:h-14 text-[12px] sm:text-sm tracking-[0.05em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_30px_rgba(200,169,126,0.5)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 size={17} className="mr-2 animate-spin" />
              ) : (
                <CreditCard size={17} className="mr-2" />
              )}
              {loading ? 'Redirection...' : 'Payer — Sécurisé'}
            </Button>
            <p className="text-center text-[10px] sm:text-[11px] text-muted-foreground mt-2">
              Paiement sécurisé par Stripe · Contenu livré instantanément
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
