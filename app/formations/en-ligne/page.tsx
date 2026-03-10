'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
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
  Play,
  Clock,
  BookOpen,
  CheckCircle,
  Monitor,
  Download,
  Headphones,
  CreditCard,
  Loader2,
  Sparkles,
  Wifi,
  Globe,
  Zap,
  Shield,
  RefreshCw,
  GraduationCap,
} from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenParticles } from '@/components/animations'
import { formations } from '@/lib/formations'

const formationsEnLigne = [
  {
    id: 'online-bases',
    title: 'Les Bases du Métier',
    subtitle: 'Formation digitale complète',
    description: 'Apprenez à votre rythme les fondamentaux des extensions de cils avec des vidéos HD.',
    duration: '8h de vidéo',
    modules: 6,
    price: '290€',
    priceInCents: 29000,
    color: 'from-emerald-500/20 to-emerald-500/5',
    includes: [
      'Accès illimité aux vidéos',
      '6 modules progressifs',
      'Supports PDF téléchargeables',
      'Groupe privé d\'entraide',
    ],
  },
  {
    id: 'online-volume',
    title: 'Volume Russe Online',
    subtitle: 'Perfectionnement à distance',
    description: 'Maîtrisez les techniques de volume depuis chez vous avec des tutoriels détaillés.',
    duration: '12h de vidéo',
    modules: 8,
    price: '390€',
    priceInCents: 39000,
    popular: true,
    color: 'from-gold/30 to-gold/5',
    includes: [
      'Accès illimité aux vidéos',
      '8 modules techniques',
      'Exercices pratiques guidés',
      'Corrections personnalisées',
    ],
  },
  {
    id: 'online-business',
    title: 'Business & Marketing',
    subtitle: 'Développez votre activité',
    description: 'Tout pour lancer et développer votre activité de lash artist.',
    duration: '6h de vidéo',
    modules: 5,
    price: '190€',
    priceInCents: 19000,
    color: 'from-purple-500/20 to-purple-500/5',
    includes: [
      'Stratégies marketing éprouvées',
      'Templates réseaux sociaux',
      'Guide de tarification',
      'Modèles de contrats',
    ],
  },
]

const advantages = [
  { icon: Clock, title: 'À votre rythme', desc: 'Apprenez quand vous voulez, où vous voulez, sans contrainte horaire' },
  { icon: RefreshCw, title: 'Accès illimité', desc: 'Revisionnez les vidéos autant de fois que nécessaire, à vie' },
  { icon: Download, title: 'Téléchargeable', desc: 'Tous les supports PDF à télécharger et conserver' },
  { icon: Headphones, title: 'Support inclus', desc: 'Accès au groupe privé pour poser vos questions' },
]

export default function FormationsEnLignePage() {
  const [selectedFormation, setSelectedFormation] = useState<typeof formationsEnLigne[0] | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const mainFormation = formations[formations.length - 1]

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const handleBuy = (formation: typeof formationsEnLigne[0]) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      {/* Hero Section - Modern Digital */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0d0a] to-[#0a0a0a]" />

          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(200,169,126,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,169,126,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }} />

          {/* Glowing orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]"
          />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold/30"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <GoldenParticles count={30} speed={0.08} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full px-6 lg:px-8 py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                    <Monitor size={20} className="text-gold" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400"
                  />
                </div>
                <span className="text-gold text-sm tracking-[0.2em] uppercase font-medium">
                  Formation 100% en ligne
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-playfair text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
              >
                Formez-vous
                <br />
                <span className="italic text-gold-light">où que vous soyez</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-xl leading-relaxed mb-10 max-w-xl"
              >
                Accédez à nos formations professionnelles 24h/24 depuis votre ordinateur,
                tablette ou smartphone. Apprenez à votre rythme.
              </motion.p>

              {/* Features row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: Wifi, text: 'Accès instantané' },
                  { icon: Globe, text: 'Disponible partout' },
                  { icon: Zap, text: 'Mises à jour gratuites' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <item.icon size={14} className="text-gold" />
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visuel à droite */}
            <div className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md p-6">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-gold/10 via-transparent to-purple-500/10" />

                {/* Écran principal */}
                <div className="relative rounded-2xl bg-black/80 border border-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-300" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Plateforme de formation
                    </span>
                  </div>

                  <div className="aspect-video rounded-xl border border-white/10 bg-gradient-to-br from-gold/20 via-gold/5 to-purple-500/20 flex flex-col justify-between p-5">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/40 border border-white/15">
                          <Play size={10} className="text-gold" />
                        </span>
                        Module vidéo
                      </p>
                      <p className="font-playfair text-lg text-white">
                        Première leçon — Pose classique
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/60">
                      <span>Durée totale · {mainFormation.duration}</span>
                      <span className="inline-flex items-center gap-1">
                        <Headphones size={12} className="text-gold" />
                        Audio HD
                      </span>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-[11px] text-white/50">
                      <span>Votre progression</span>
                      <span>3 / {mainFormation.modulesCount} modules</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-gold via-gold-light to-emerald-300 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Cartes secondaires */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-white/70">
                  <div className="rounded-2xl bg-black/60 border border-white/10 p-3 flex items-center gap-2">
                    <Download size={14} className="text-gold" />
                    <div>
                      <p className="font-medium">PDF téléchargeables</p>
                      <p className="text-white/40">Fiches récap et protocoles</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-black/60 border border-white/10 p-3 flex items-center gap-2">
                    <Wifi size={14} className="text-gold" />
                    <div>
                      <p className="font-medium">Accès 24h/24</p>
                      <p className="text-white/40">Depuis tous vos écrans</p>
                    </div>
                  </div>
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

      {/* Formations Grid */}
      <section className="py-24 px-6 lg:px-8 bg-cream relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-xs tracking-[0.15em] uppercase mb-6">
              <Play size={12} />
              Formations disponibles
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl text-foreground">
              Choisissez votre <span className="italic text-gold">parcours</span>
            </h2>
          </motion.div>

          {/* Carte principale : formation en ligne réelle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mb-16"
          >
            <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a] text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-gold/20">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-purple-500/10 opacity-70" />
              <div className="relative p-8 sm:p-10 lg:p-12 grid lg:grid-cols-3 gap-10 items-center">
                <div className="lg:col-span-2 space-y-5">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gold/30 text-[11px] tracking-[0.18em] uppercase">
                    <Monitor size={14} className="text-gold" />
                    Formation 100% en ligne
                  </div>
                  <h3 className="font-playfair text-3xl sm:text-4xl">
                    {mainFormation.title}
                  </h3>
                  <p className="text-gold-light text-sm italic">
                    {mainFormation.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-white/70 max-w-2xl">
                    {mainFormation.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70">
                      <Clock size={12} className="text-gold" />
                      {mainFormation.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70">
                      <BookOpen size={12} className="text-gold" />
                      {mainFormation.modulesCount} modules
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70">
                      <Play size={12} className="text-gold" />
                      {mainFormation.includes.videos.length} vidéos HD
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70">
                      <GraduationCap size={12} className="text-gold" />
                      Certificat inclus
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40 mb-1">
                      Accès complet
                    </p>
                    <p className="font-playfair text-4xl text-gold">
                      {mainFormation.priceDisplay}
                    </p>
                    <p className="text-[11px] text-white/40">
                      Paiement unique · Accès illimité
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-white/70">
                    {mainFormation.highlights.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-gold mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/formations/${mainFormation.slug}`}>
                    <Button className="w-full h-12 rounded-2xl text-sm tracking-[0.08em] uppercase font-semibold cta-shimmer bg-gold hover:bg-gold-dark text-white inline-flex items-center justify-center gap-2">
                      <GraduationCap size={16} />
                      En savoir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Autres parcours en ligne (teasing / à venir) */}
          <div className="grid lg:grid-cols-3 gap-8">
            {formationsEnLigne.map((formation, i) => (
              <motion.div
                key={formation.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className={`group relative ${formation.popular ? 'lg:-mt-6 lg:mb-6' : ''}`}
              >
                <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                  formation.popular
                    ? 'bg-[#0a0a0a] text-white shadow-[0_20px_60px_rgba(200,169,126,0.2)]'
                    : 'bg-white border border-border hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(200,169,126,0.15)]'
                }`}>
                  {/* Gradient top */}
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${formation.color} to-transparent opacity-50`} />

                  {/* Popular badge */}
                  {formation.popular && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold text-white text-[10px] tracking-[0.1em] uppercase font-semibold shadow-lg">
                        <Sparkles size={10} />
                        Best-seller
                      </div>
                    </>
                  )}

                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center ${
                      formation.popular ? 'bg-gold/20 border border-gold/30' : 'bg-gold/10 border border-gold/20'
                    }`}>
                      <Play size={22} className="text-gold" />
                    </div>

                    {/* Header */}
                    <h3 className={`font-playfair text-2xl mb-2 ${formation.popular ? 'text-white' : 'text-foreground'}`}>
                      {formation.title}
                    </h3>
                    <p className={`text-sm italic mb-4 ${formation.popular ? 'text-gold-light' : 'text-gold'}`}>
                      {formation.subtitle}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-6 ${formation.popular ? 'text-white/60' : 'text-muted-foreground'}`}>
                      {formation.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full ${
                        formation.popular ? 'bg-white/10 text-white/70' : 'bg-warm text-muted-foreground'
                      }`}>
                        <Play size={12} className="text-gold" />
                        {formation.duration}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-full ${
                        formation.popular ? 'bg-white/10 text-white/70' : 'bg-warm text-muted-foreground'
                      }`}>
                        <BookOpen size={12} className="text-gold" />
                        {formation.modules} modules
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
                            Accès complet
                          </p>
                          <p className="font-playfair text-4xl text-gold">{formation.price}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs ${formation.popular ? 'text-white/40' : 'text-muted-foreground'}`}>
                          <Shield size={12} />
                          <span>Paiement sécurisé</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleBuy(formation)}
                        className={`w-full h-14 text-sm tracking-[0.05em] uppercase rounded-2xl font-semibold transition-all ${
                          formation.popular
                            ? 'cta-shimmer bg-gold hover:bg-gold-dark text-white'
                            : 'bg-foreground hover:bg-foreground/90 text-white'
                        }`}
                      >
                        <Zap size={16} className="mr-2" />
                        Accès immédiat
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
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
              Les avantages du <span className="italic text-gold">digital</span>
            </h2>
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
                <div className="h-full p-8 rounded-3xl bg-white border border-border hover:border-gold/30 hover:shadow-[0_10px_40px_rgba(200,169,126,0.1)] transition-all duration-500 text-center">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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

      {/* CTA */}
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
            <Monitor size={32} className="text-gold" />
          </motion.div>

          <h2 className="font-playfair text-5xl sm:text-6xl text-white mb-6 leading-tight">
            Commencez
            <br />
            <span className="italic text-gold-light">aujourd&apos;hui</span>
          </h2>

          <p className="text-white/40 text-xl mb-12 max-w-xl mx-auto">
            Accès immédiat après paiement. Apprenez dès maintenant, à votre rythme.
          </p>

          <Button
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
            className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-14 py-6 h-auto text-base tracking-[0.1em] uppercase rounded-2xl font-semibold"
          >
            <Play size={18} className="mr-3" />
            Choisir ma Formation
          </Button>
        </motion.div>
      </section>

      <Footer />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg mx-4 bg-white border-gold/20">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Play size={18} className="text-gold" />
              </div>
              <DialogTitle className="font-playfair text-xl">
                {selectedFormation?.title}
              </DialogTitle>
            </div>
            <DialogDescription>
              Entrez votre email pour accéder à la formation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label htmlFor="checkout-email" className="text-sm font-medium text-foreground">
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
                className="h-14 border-border focus:border-gold focus:ring-gold/20 rounded-xl"
              />
            </div>

            {selectedFormation && (
              <div className="p-5 rounded-2xl bg-warm border border-border space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Formation</span>
                  <span className="font-medium">{selectedFormation.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Durée</span>
                  <span>{selectedFormation.duration}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-medium">Total</span>
                  <span className="text-gold font-playfair text-3xl">{selectedFormation.price}</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleCheckout}
              disabled={!email || loading}
              className="cta-shimmer w-full bg-gold hover:bg-gold-dark text-white h-14 text-sm tracking-[0.05em] uppercase rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="mr-2 animate-spin" />
              ) : (
                <CreditCard size={18} className="mr-2" />
              )}
              {loading ? 'Redirection...' : 'Payer — Sécurisé'}
            </Button>
            <p className="text-center text-muted-foreground text-xs mt-3">
              Paiement sécurisé par Stripe · Accès immédiat
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
