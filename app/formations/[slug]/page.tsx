'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CommentsSection } from '@/components/comments-section'
import { FormationTestimonials } from '@/components/formation-testimonials'
import {
  Clock,
  BookOpen,
  FileText,
  Play,
  CheckCircle,
  CreditCard,
  Loader2,
  GraduationCap,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'
import { getFormationBySlug } from '@/lib/formations'

interface FormationDetailPageProps {
  params: Promise<{ slug: string }>
}

const programmeComplet = [
  {
    title: 'Leçon 1 — Les fondamentaux des extensions de cils',
    description: 'Définition, techniques, rôle, idées reçues.',
  },
  {
    title: 'Leçon 2 — Contre-indications',
    description: 'Qui peut porter, qui ne peut pas, sécurité, démystification.',
  },
  {
    title: 'Leçon 3 — Cycle de croissance et rétention',
    description:
      'Les 4 phases du cycle, détection, adaptation de la pose, explication cliente pour améliorer la rétention.',
  },
  {
    title: 'Leçon 4 — Réactions allergiques et brûlures chimiques',
    description: 'Comment prévenir, reconnaître et gérer les réactions de manière professionnelle.',
  },
  {
    title: 'Leçon 5 — Produits de préparation',
    description:
      'Shampoing, démaquillant, primer, cleanser, booster : ordre, rôle de chaque produit et erreurs à éviter.',
  },
  {
    title: 'Leçon 6 — Maîtrise de la colle',
    description:
      'Composition, types de colle, hygromètre, temps de séchage, quantité idéale, conservation, fréquence de changement.',
  },
  {
    title: 'Leçon 7 — Choisir ses extensions',
    description:
      'Épaisseurs, longueurs, courbures : sécurité et adaptation au cil naturel pour un résultat durable.',
  },
  {
    title: 'Leçon 8 — Réaliser une pose harmonieuse',
    description:
      'Angle, direction, distance paupière, tenue des pinces, exercices sur mousse et mannequin.',
  },
  {
    title: 'Leçon 9 — Pose sur mesure et mapping',
    description:
      'Mapping, choix des longueurs, construction d’une ligne parfaite et harmonieuse adaptée à chaque œil.',
  },
  {
    title: 'Leçon 10 — Les effets',
    description:
      'Naturel, œil de biche, écureuil, poupée : comment choisir et adapter les effets au visage de la cliente.',
  },
  {
    title: 'Leçon 11 — Posture',
    description:
      'Position du corps, placement des mains, confort de la cliente, prévention des tensions et douleurs.',
  },
  {
    title: 'Leçon 12 — Matériel',
    description: 'Tout le nécessaire, checklist complète pour travailler de façon professionnelle.',
  },
  {
    title: 'Leçon 13 — Préparation de la pose',
    description:
      'Nettoyage, isolation, patchs et sparadrap, mapping, isolation à deux pinces, démarrage efficace.',
  },
  {
    title: 'Leçon 14 — Étude de cas sur modèle humain',
    description:
      'Analyse de l’œil, courbure, choix des longueurs et courbures avant de poser pour un résultat cohérent.',
  },
  {
    title: 'Leçon 15 — Technique signature de validation des longueurs',
    description:
      'Valider les longueurs avec la cliente avant de démarrer pour sécuriser le rendu final et la satisfaction.',
  },
  {
    title: 'Leçon 16 — Coins internes et externes',
    description:
      'Utilisation du sparadrap, accès aux zones difficiles, précision et gain de temps sur les coins.',
  },
  {
    title: 'Leçon 17 — Travailler les cils afro',
    description:
      'Isolation, orientation, surface d’accroche, stratégie pour une bonne rétention sur cils afro.',
  },
  {
    title: 'Leçon 18 — Dépose propre et sécurisée',
    description: 'Produits, étapes, précautions et finition pour une dépose sans abîmer les cils naturels.',
  },
  {
    title: 'Leçon 19 — Bonus pose volume avec bouquets préfaits',
    description:
      'Introduction au volume avec bouquets préfaits, choix du type, de la matière et logique de sélection.',
  },
]

export default function FormationDetailPage({ params }: FormationDetailPageProps) {
  const { slug } = use(params)
  const formation = getFormationBySlug(slug)

  if (!formation) {
    notFound()
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [instagram, setInstagram] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!email || !firstName || !lastName || !formation) return

    setLoading(true)
    try {
      const res = await fetch('/api/formations/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formationId: formation.id,
          customerEmail: email,
          customerFirstName: firstName,
          customerLastName: lastName,
          customerPhone: phone,
          customerInstagram: instagram,
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

  const scrollToInscription = () => {
    const el = document.getElementById('inscription')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Hero : image + pitch + badges + CTA */}
          <section className="grid md:grid-cols-2 gap-10 items-stretch">
            {/* Grande image */}
            <div className="relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden bg-[#0a0a0a]">
              <Image
                src="/gallery/06-hollywood.jpg"
                alt={formation.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-1">
                  Formation 100% en ligne
                </p>
                <h1 className="font-playfair text-2xl sm:text-3xl font-semibold leading-snug">
                  {formation.title}
                </h1>
              </div>
            </div>

            {/* Pitch + badges + bloc inscription */}
            <div className="space-y-6 flex flex-col">
              <div className="space-y-3">
                <p className="text-gold text-xs uppercase tracking-[0.2em]">
                  {formation.levelLabel}
                </p>
                <h2 className="font-playfair text-xl sm:text-2xl text-foreground">
                  Rétention. Précision. Satisfaction cliente. La méthode qui fidélise.
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Tu veux te créer un complément de revenu ou te lancer à ton rythme dans les
                  extensions de cils, sans présentiel et sans pression.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Cette formation 100% en ligne te donne une méthode claire pour réaliser une
                  pose classique propre, harmonieuse et durable, avec une vraie maîtrise de la
                  rétention, de la colle, du mapping et des zones difficiles.
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white text-foreground border border-border">
                  <CheckCircle size={13} className="text-emerald-500" />
                  Accès immédiat
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-warm text-muted-foreground">
                  <Play size={13} className="text-gold" />
                  100% en ligne
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-warm text-muted-foreground">
                  <Clock size={13} className="text-gold" />
                  19 leçons
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-warm text-muted-foreground">
                  <GraduationCap size={13} className="text-gold" />
                  Certificat inclus
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-warm text-muted-foreground">
                  <CreditCard size={13} className="text-gold" />
                  {formation.priceDisplay}
                </span>
              </div>

              {/* Bloc inscription */}
              <div
                id="inscription"
                className="mt-auto rounded-2xl bg-white border border-border p-5 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">
                      Je m’inscris maintenant
                    </p>
                    <p className="font-playfair text-2xl sm:text-3xl text-gold font-bold">
                      Accès complet à la formation
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Paiement sécurisé · Certificat inclus · Prix {formation.priceDisplay}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle size={12} className="text-emerald-500" />
                      Accès illimité aux vidéos
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle size={12} className="text-emerald-500" />
                      Contenu envoyé par email
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label
                        htmlFor="detail-first-name"
                        className="text-sm font-medium text-foreground"
                      >
                        Prénom
                      </label>
                      <Input
                        id="detail-first-name"
                        placeholder="Ton prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-11 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="detail-last-name"
                        className="text-sm font-medium text-foreground"
                      >
                        Nom
                      </label>
                      <Input
                        id="detail-last-name"
                        placeholder="Ton nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-11 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="detail-email"
                      className="text-sm font-medium text-foreground"
                    >
                      Ton email pour recevoir la formation
                    </label>
                    <Input
                      id="detail-email"
                      type="email"
                      placeholder="toi@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && email && firstName && lastName) handleCheckout()
                      }}
                      className="h-11 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label
                        htmlFor="detail-phone"
                        className="text-sm font-medium text-foreground"
                      >
                        Téléphone (optionnel)
                      </label>
                      <Input
                        id="detail-phone"
                        type="tel"
                        placeholder="+33..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="detail-instagram"
                        className="text-sm font-medium text-foreground"
                      >
                        Instagram (optionnel)
                      </label>
                      <Input
                        id="detail-instagram"
                        placeholder="@toncompte"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="h-11 border-border focus:border-gold focus:ring-gold/20 rounded-lg"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={!email || !firstName || !lastName || loading}
                    className="cta-shimmer w-full bg-gold hover:bg-gold-dark text-white h-11 sm:h-12 text-[13px] sm:text-sm tracking-[0.06em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_25px_rgba(200,169,126,0.45)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Redirection...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        Je m’inscris maintenant
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Paiement sécurisé par Stripe · Accès immédiat par email après paiement
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation de sections */}
          <section className="bg-cream/80 backdrop-blur border-y border-border/60 py-3 rounded-2xl">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-start">
              {[
                { id: 'section-obtiens', label: 'Ce que tu obtiens' },
                { id: 'section-change', label: 'Ce que ça change' },
                { id: 'section-avantage', label: 'Avantage concurrentiel' },
                { id: 'section-programme', label: 'Programme complet' },
                { id: 'section-questions', label: 'Questions fréquentes' },
              ].map((item) => (
                <Button
                  key={item.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-full text-[11px] sm:text-xs px-3 sm:px-4 py-1 border-border/70 hover:border-gold/60 hover:bg-gold/5"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </section>

          {/* Ce que tu obtiens */}
          <section className="space-y-8" id="section-obtiens">
            <div className="max-w-3xl space-y-3">
              <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
                Ce que tu obtiens
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                La Formation Avancée Pose Classique en Ligne est un programme complet en 19 leçons.
                Tu ne vas pas seulement apprendre à poser. Tu vas apprendre à comprendre, contrôler
                et reproduire un résultat professionnel.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">
                  Tu vas maîtriser
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Les fondamentaux et la sécurité</li>
                  <li>• La rétention et le cycle de croissance</li>
                  <li>• La préparation des cils avec un protocole précis</li>
                  <li>• La colle et l’environnement pour une tenue fiable</li>
                  <li>• Le choix des extensions pour un résultat durable et sécurisé</li>
                  <li>• La technique de pose avec un placement net et confortable</li>
                  <li>• Le mapping et les effets pour du sur-mesure</li>
                  <li>• Les coins internes et externes</li>
                  <li>• Les cils afro</li>
                  <li>• La dépose professionnelle</li>
                  <li>• Le bonus volume avec bouquets préfaits</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-white border border-border p-5 sm:p-6 space-y-4">
                <p className="text-sm sm:text-base text-foreground font-medium">
                  Tu construis une vraie compétence, pas juste une pose.
                </p>
                <p className="text-sm text-muted-foreground">
                  Tu suis un parcours structuré, pensé pour t’emmener de la compréhension à
                  l’exécution, avec une méthode que tu peux reproduire sur chaque cliente.
                </p>
                <Button
                  onClick={scrollToInscription}
                  className="w-full mt-2 bg-gold hover:bg-gold-dark text-white h-11 text-[13px] tracking-[0.06em] uppercase rounded-full"
                >
                  Je m’inscris maintenant
                </Button>
              </div>
            </div>
          </section>

          {/* Ce que cette formation change vraiment */}
          <section className="space-y-6" id="section-change">
            <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
              Ce que cette formation change vraiment
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li>• Tu fais des poses plus propres et plus régulières</li>
              <li>• Tu comprends enfin pourquoi une pose tient ou ne tient pas</li>
              <li>• Tu arrêtes de subir la colle, tu la maîtrises</li>
              <li>• Tu sais construire une pose sur-mesure grâce au mapping</li>
              <li>• Tu gères les coins internes et externes avec méthode</li>
              <li>• Tu gagnes en confiance et tu progresses plus vite</li>
            </ul>
          </section>

          {/* Ton avantage concurrentiel */}
          <section className="space-y-6" id="section-avantage">
            <div className="space-y-2 max-w-3xl">
              <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
                Ton avantage concurrentiel
              </h3>
              <p className="text-gold text-sm font-medium">
                Ma technique signature de satisfaction cliente — satisfaire à coup sûr pour fidéliser.
              </p>
              <p className="text-sm text-muted-foreground">
                La majorité des techniciennes découvrent à la fin si la cliente aime. Ici, tu apprends
                une étape signature qui verrouille la satisfaction dès le départ.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-border p-4 sm:p-5 space-y-2">
                <p className="text-sm text-foreground font-medium">
                  ✅ Tu valides les longueurs et le rendu attendu avec la cliente avant de poser
                </p>
                <p className="text-sm text-muted-foreground">
                  Tu évites les malentendus et tu t’assures que le résultat final corresponde à ce
                  qu’elle imagine.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-border p-4 sm:p-5 space-y-2">
                <p className="text-sm text-foreground font-medium">
                  ✅ La cliente se sent comprise, rassurée, en confiance
                </p>
                <p className="text-sm text-muted-foreground">
                  Résultat : satisfaction, fidélisation, rebooking, recommandations. Tu ne fais pas
                  seulement une pose, tu crées une expérience qui donne envie de revenir.
                </p>
              </div>
            </div>
            <Button
              onClick={scrollToInscription}
              variant="outline"
              className="inline-flex items-center gap-2 border-gold/40 text-gold hover:bg-gold/5 rounded-full px-6 h-10 text-xs tracking-[0.12em] uppercase"
            >
              Je m’inscris maintenant
              <ArrowRight size={14} />
            </Button>
          </section>

          {/* À qui s’adresse cette formation */}
          <section className="space-y-6">
            <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
              À qui s’adresse cette formation
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 space-y-3">
                <p className="text-foreground font-medium">
                  Cette formation est faite pour toi si :
                </p>
                <ul className="space-y-2">
                  <li>• Tu veux un complément de revenu le soir ou le week-end</li>
                  <li>• Tu veux apprendre sérieusement à ton rythme</li>
                  <li>• Tu veux arrêter le feeling et obtenir un résultat plus fiable</li>
                  <li>• Tu veux une pose classique qui fait pro, même si tu débutes</li>
                  <li>• Tu veux développer une vraie compétence avec un certificat</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 space-y-3">
                <p className="text-foreground font-medium">
                  Cette formation n’est pas faite pour toi si :
                </p>
                <ul className="space-y-2">
                  <li>• Tu cherches du présentiel ou du coaching individuel</li>
                  <li>• Tu ne veux pas pratiquer</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Ce que tu sauras faire à la fin */}
          <section className="space-y-6">
            <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
              Ce que tu sauras faire à la fin
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li>• Travailler en sécurité et reconnaître les contre-indications</li>
              <li>• Prévenir les réactions et travailler proprement</li>
              <li>• Comprendre le cycle de croissance et améliorer la rétention</li>
              <li>• Appliquer un protocole de préparation efficace</li>
              <li>• Maîtriser la colle grâce aux réglages et à l’environnement</li>
              <li>• Choisir les bonnes longueurs et épaisseurs selon le cil naturel</li>
              <li>• Poser propre et confortable avec un placement précis</li>
              <li>• Construire une pose sur-mesure grâce au mapping</li>
              <li>• Créer des effets harmonieux selon la demande</li>
              <li>• Gérer les coins internes et externes avec méthode</li>
              <li>• Adapter ta pose sur cils afro pour un rendu durable</li>
              <li>• Réaliser une dépose propre et sécurisée</li>
              <li>• Comprendre le volume avec bouquets préfaits</li>
            </ul>
          </section>

          {/* Programme complet */}
          <section
            className="space-y-6 bg-[#0a0a0a] rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-white"
            id="section-programme"
          >
            <div className="space-y-2">
              <h3 className="font-playfair text-2xl sm:text-3xl text-white">
                Le programme complet
              </h3>
              <p className="text-sm text-white/70 max-w-2xl">
                19 leçons progressives pour t’emmener de la compréhension des bases jusqu’aux
                techniques avancées de satisfaction cliente et de volume avec bouquets préfaits.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-5 sm:p-6">
              <ol className="grid md:grid-cols-2 gap-4 sm:gap-5">
                {programmeComplet.map((item, index) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 sm:gap-4 rounded-xl border border-white/15 bg-white/[0.04] p-3 sm:p-4"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/10 text-gold text-xs sm:text-sm font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base text-white font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Témoignages de participantes */}
          <FormationTestimonials />

          {/* Certificat & accès */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white border border-border p-5 sm:p-6 space-y-3">
              <h3 className="font-playfair text-xl text-foreground">Certificat</h3>
              <p className="text-sm text-muted-foreground">
                À la fin de la formation, tu obtiens un certificat de réussite que tu peux utiliser
                pour rassurer tes clientes et valoriser ta compétence.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-border p-5 sm:p-6 space-y-3">
              <h3 className="font-playfair text-xl text-foreground">Accès</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Formation 100% en ligne</li>
                <li>• Accès immédiat après paiement</li>
                <li>• Tu avances à ton rythme</li>
                <li>• Certificat inclus</li>
                <li>• Prix {formation.priceDisplay}</li>
              </ul>
            </div>
          </section>

          {/* Questions fréquentes */}
          <section className="space-y-6" id="section-questions">
            <div className="flex items-center gap-2">
              <HelpCircle size={18} className="text-gold" />
              <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
                Questions fréquentes
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="bg-white rounded-2xl border border-border p-4 sm:p-5 space-y-2">
                <p className="text-foreground font-medium">
                  Je débute, est-ce que je peux suivre ?
                </p>
                <p>
                  Oui. Tu commences par les bases et tu avances jusqu’aux points avancés. La
                  progression est pensée pour les débutantes motivées.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-4 sm:p-5 space-y-2">
                <p className="text-foreground font-medium">
                  La formation est-elle autonome ?
                </p>
                <p>
                  Oui. Elle est conçue pour être suivie sans présentiel ni accompagnement. Tu peux
                  revoir les leçons autant de fois que tu veux.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-border p-4 sm:p-5 space-y-2">
                <p className="text-foreground font-medium">
                  Je manque de temps, est-ce que ça vaut le coup ?
                </p>
                <p>
                  Tu avances à ton rythme. L’essentiel est de pratiquer régulièrement, même sur de
                  petites plages de temps.
                </p>
              </div>
            </div>
          </section>

          {/* Dernier appel */}
          <section className="space-y-6 bg-[#0a0a0a] rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-white">
            <div className="space-y-3 max-w-3xl">
              <h3 className="font-playfair text-2xl sm:text-3xl">
                Dernier appel
              </h3>
              <p className="text-sm sm:text-base text-white/70">
                Si tu veux une pose classique propre, durable et qui fidélise tes clientes, tu es
                au bon endroit.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/10 text-white">
                <Play size={13} className="text-gold" />
                Accès immédiat
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/10 text-white">
                <Clock size={13} className="text-gold" />
                19 leçons
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/10 text-white">
                <GraduationCap size={13} className="text-gold" />
                Certificat inclus
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-white/10 text-white">
                <CreditCard size={13} className="text-gold" />
                {formation.priceDisplay}
              </span>
            </div>
            <Button
              onClick={scrollToInscription}
              className="cta-shimmer bg-gold hover:bg-gold-dark text-white px-8 sm:px-10 py-4 h-auto text-[13px] sm:text-sm tracking-[0.08em] uppercase rounded-full font-semibold inline-flex items-center gap-2"
            >
              Je m’inscris maintenant
              <ArrowRight size={16} />
            </Button>
          </section>

          {/* Avis sur la formation */}
          <CommentsSection
            type="formation"
            targetId={slug}
            title="Avis sur la formation"
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}

