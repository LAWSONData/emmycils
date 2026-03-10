'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, ShieldCheck, Gem, Sparkles, Heart, ArrowRight, GraduationCap, BarChart3, Calendar, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LashDivider, CountUp, GoldenParticles, FloatingElement, LineReveal } from '@/components/animations'

const qualifications = [
  'Certification internationale en extensions de cils',
  'Spécialisation volume russe et cil à cil',
  'Formation hygiène et sécurité premium',
  'Maîtrise des techniques mega volume',
  'Formation continue sur les nouvelles tendances',
]

const commitments = [
  'Produits de qualité premium uniquement',
  'Consultation personnalisée pour chaque cliente',
  'Suivi et aftercare professionnel',
  'Environnement stérile et sécurisé',
  'Respect de la santé de vos cils naturels',
]

const values = [
  {
    icon: Award,
    number: '01',
    title: 'Excellence',
    description:
      "Chaque extension est une œuvre d'art, créée avec précision et passion pour sublimer votre regard.",
  },
  {
    icon: ShieldCheck,
    number: '02',
    title: 'Respect',
    description:
      'Écoute, compréhension et respect de vos souhaits. Votre bien-être est notre priorité absolue.',
  },
  {
    icon: Gem,
    number: '03',
    title: 'Innovation',
    description:
      'Formation continue pour maîtriser les dernières techniques et vous offrir le meilleur.',
  },
]

export default function AboutPage() {
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
              L&apos;excellence au service de la réussite
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              À Propos d&apos;Emmy Cils
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Centre d&apos;excellence spécialisé dans les extensions de cils et la formation
              professionnelle. Ma mission&nbsp;: former des experts avec créativité et précision,
              et sublimer votre regard.
            </motion.p>
            <LashDivider className="pt-2" />
          </motion.div>
        </div>
      </section>

      {/* Story – asymmetric layout */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-warm border border-border">
                <Image
                  src="/Emmypic.jpg"
                  alt="Emmy"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Decorative gold corners with draw animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-0 left-0 w-16 h-16"
                >
                  <div className="absolute top-4 left-4 w-8 h-px bg-gold/40" />
                  <div className="absolute top-4 left-4 w-px h-8 bg-gold/40" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-0 right-0 w-16 h-16"
                >
                  <div className="absolute bottom-4 right-4 w-8 h-px bg-gold/40" />
                  <div className="absolute bottom-4 right-4 w-px h-8 bg-gold/40" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 32 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-px bg-gold"
                />
                <p className="text-gold text-[13px] tracking-[0.15em] uppercase font-medium">
                  Mon parcours
                </p>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-playfair text-3xl sm:text-4xl text-foreground leading-snug"
              >
                <CountUp end={10} duration={1.5} /> ans de passion au service de votre <em className="italic text-gold">beauté</em>
              </motion.h2>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <LineReveal delay={0.1}>
                  <p>
                    Je me suis spécialisée dans les extensions de cils depuis 2015.
                    Une expertise approfondie grâce à plus de 15 formations auprès des meilleurs
                    formateurs internationaux, notamment russes. Ce parcours me permet de
                    maîtriser toutes les techniques d&apos;extensions de cils, des plus simples
                    aux plus complexes.
                  </p>
                </LineReveal>
                <LineReveal delay={0.2}>
                  <p>
                    Formée aux meilleures techniques internationales, je suis certifiée
                    dans plusieurs styles d&apos;extensions&nbsp;: cil à cil, volume russe, mega
                    volume et bien d&apos;autres. Je m&apos;engage à offrir le meilleur service
                    à chaque cliente.
                  </p>
                </LineReveal>
                <LineReveal delay={0.3}>
                  <p>
                    Mon objectif est simple&nbsp;: vous faire sentir belle et confiante.
                    Chaque paire de cils est une œuvre d&apos;art unique, adaptée à votre
                    type de regard et vos envies.
                  </p>
                </LineReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mon expertise */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Ce qui me distingue
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground"
            >
              Mon <em className="italic text-gold">expertise</em>
            </motion.h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              Une passion unique pour l&apos;art des cils qui se traduit au quotidien
            </p>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {[
              'Une large gamme de poses d\'extensions de cils pour répondre à tous les styles',
              'La maîtrise des techniques applicables à chaque cil naturel',
              'La préservation de l\'intégrité des cils de chaque cliente',
              'Une réponse sur mesure aux besoins spécifiques de chacune',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="card-lift p-5 sm:p-6 bg-white border border-border h-full flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Gem size={18} className="text-gold" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed pt-1">
                    {item}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expérience et reconnaissance */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Événements & rayonnement
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground"
            >
              Expérience et <em className="italic text-gold">reconnaissance</em>
            </motion.h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              Plus de 5 ans d&apos;expérience et une participation à des événements prestigieux
            </p>
            <LashDivider className="mt-6" />
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-lift p-6 sm:p-8 bg-warm border border-border">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Calendar size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
                      Congrès International d&apos;Esthétique & Spa 2023
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Participation à la 52<sup>e</sup> édition de cet événement majeur, du 17 au 20 février 2023
                      à Paris Expo – Porte de Versailles. Plus de 25&nbsp;000 professionnels réunis pour
                      échanger sur les dernières tendances et innovations.
                    </p>
                    <p className="text-gold text-xs tracking-[0.12em] uppercase font-medium">
                      Paris Expo · Porte de Versailles
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-lift p-6 sm:p-8 bg-warm border border-border">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0">
                    <Sparkles size={22} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-foreground mb-2">
                      Collaboration du Beauty Café – 2022
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      Au Beauty Café à Concarneau, un espace dédié au bien-être qui offre une expérience
                      unique, réunissant des experts et professionnels autour d&apos;un concept innovant.
                    </p>
                    <p className="text-gold text-xs tracking-[0.12em] uppercase font-medium">
                      Concarneau
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission de formation & Résultats concrets */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Transmission & accompagnement
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground"
            >
              Notre mission de <em className="italic text-gold">formation</em>
            </motion.h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              Une passion pour la transmission des connaissances&nbsp;: programmes sur mesure et
              accompagnements personnalisés pour guider chaque apprenti vers l&apos;excellence,
              l&apos;accroissement de sa clientèle et une vraie différenciation.
            </p>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              { value: 200, suffix: '+', label: 'Professionnelles formées depuis 2020', icon: GraduationCap },
              { value: 98, suffix: '%', label: 'Satisfaction des stagiaires', icon: Heart },
              { value: 85, suffix: '%', label: 'Anciennes stagiaires ont lancé leur activité avec succès', icon: BarChart3 },
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="card-lift p-6 sm:p-8 bg-white border border-border text-center h-full">
                  <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-4">
                    <StatIcon size={22} className="text-gold" />
                  </div>
                  <p className="font-playfair text-3xl sm:text-4xl text-gold font-semibold mb-2">
                    <CountUp end={stat.value} duration={1.5} />{stat.suffix}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Méthode pédagogique
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground mb-6"
            >
              Notre approche <em className="italic text-gold">unique</em>
            </motion.h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              Chez Emmy Cils, nous croyons en une approche sur mesure, permettant à chacun d&apos;acquérir
              les clés de la réussite à son propre rythme. La méthode pédagogique &quot;STAR&quot;&nbsp;—
              Savoir, Technique, Application, Réussite — garantit une progression optimale.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Cours théoriques interactifs',
                'Démonstrations en temps réel',
                'Pratique intensive sur modèles',
                'Suivi personnalisé post-formation',
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <Star size={16} className="text-gold flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Expertise & qualifications
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground"
            >
              Un savoir-faire <em className="italic text-gold">certifié</em>
            </motion.h2>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-lift p-5 sm:p-8 bg-white border border-border h-full">
                <h3 className="font-playfair font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                  Formation Professionnelle
                </h3>
                <ul className="space-y-4">
                  {qualifications.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                        className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0"
                      />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-lift p-5 sm:p-8 bg-white border border-border h-full">
                <h3 className="font-playfair font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
                  Engagements Qualité
                </h3>
                <ul className="space-y-4">
                  {commitments.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300 }}
                        className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0"
                      />
                      <span className="text-muted-foreground text-sm leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications gallery */}
      <section className="py-10 sm:py-14 lg:py-20 px-6 lg:px-8 bg-warm/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-3 font-medium"
            >
              Reconnaissance & diplômes
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl text-foreground"
            >
              Mes certifications
            </motion.h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
              Quelques moments clés de mon parcours, entre la Belgique, Paris et la Russie, lors de remises
              de certifications en Volume Russe, Mega Volume, symétrie du regard, effets créatifs, pose de
              couleurs et initiation à la pose d&apos;extensions de cils, qui valident mon expertise internationale.
            </p>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {[
              { src: '/pic1.jpeg', label: 'Volume Russe Perfectionnement - Belgique' },
              { src: '/pic2.jpeg', label: 'Mega Volume & Symétrie du regard - Paris' },
              { src: '/pic3.jpeg', label: 'Initiation à la pose d’extensions de cils - Paris' },
              { src: '/pic4.jpeg', label: 'Effets créatifs & pose de couleurs - Russie' },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
              >
                <Card className="card-lift overflow-hidden bg-white/95 border border-border/80">
                  <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.label}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent pointer-events-none" />
                  </div>
                  <div className="px-4 py-4 sm:px-5 sm:py-5">
                    <p className="text-xs text-gold tracking-[0.18em] uppercase mb-1">
                      Certification
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {photo.label}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold text-[13px] tracking-[0.2em] uppercase mb-4 font-medium"
            >
              Ce qui nous guide
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-playfair text-3xl sm:text-4xl text-foreground"
            >
              Mes Valeurs
            </motion.h2>
            <LashDivider className="mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <Card className="card-lift p-5 sm:p-8 bg-warm border border-border text-center h-full group hover:border-gold/30 transition-all duration-500">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border border-gold/30 group-hover:border-gold transition-colors duration-500 breathe-glow" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-playfair text-lg text-gold font-semibold">
                          {value.number}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-playfair font-semibold text-xl text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

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
          <FloatingElement speed={0.08} direction="up" className="absolute top-8 left-[15%] hidden sm:block pointer-events-none">
            <span className="text-gold/30 text-lg">&#10022;</span>
          </FloatingElement>
          <FloatingElement speed={0.1} direction="down" className="absolute bottom-12 right-[15%] hidden sm:block pointer-events-none">
            <span className="text-gold/25 text-xl">&#10022;</span>
          </FloatingElement>

          <LashDivider className="mb-10" color="#d4b896" />

          <p className="text-gold text-[13px] tracking-[0.25em] uppercase font-medium mb-6">
            Votre expérience personnalisée
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-playfair text-4xl sm:text-5xl text-white mb-6 leading-tight"
          >
            Envie de <em className="italic text-gold-light">me rencontrer</em>&nbsp;?
          </motion.h2>

          <p className="text-white/50 text-lg sm:text-xl mb-14 leading-relaxed max-w-xl mx-auto">
            Réservez une consultation gratuite. Ensemble, nous trouverons le style
            parfait pour sublimer votre regard.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Link href="/reservation">
              <Button className="cta-shimmer cta-glow bg-gold hover:bg-gold-dark text-white px-14 py-5 h-auto text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 font-semibold">
                <Sparkles size={18} className="mr-2" />
                Prendre Rendez-vous
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/5 hover:border-gold/50 px-14 py-5 h-auto text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 bg-transparent font-semibold"
              >
                Voir les Services
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
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
            <span><CountUp end={10} duration={1.5} /> ans d&apos;expertise · Certifiée</span>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
