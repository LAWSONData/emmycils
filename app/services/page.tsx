'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

const services = [
  {
    id: 1,
    name: 'Cil à Cil',
    price: '70€',
    description: 'Extensions naturelles pour un regard élégant et raffiné.',
    duration: '1h45 env.',
  },
  {
    id: 2,
    name: 'Volume Russe',
    price: '90€',
    description: 'Volume subtil pour une densité et un éclat sublimes.',
    duration: '2h env.',
  },
  {
    id: 3,
    name: 'Mega Volume',
    price: '150€',
    description: 'Volume spectaculaire pour un regard intensément glamour.',
    duration: '2h30 env.',
  },
  {
    id: 4,
    name: 'Retouche',
    price: '50€',
    description: 'Entretien de vos extensions pour prolonger la tenue et la beauté.',
    duration: '1h15 env.',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-6 lg:px-8">
        <section className="max-w-5xl mx-auto space-y-10">
          <header className="text-center space-y-4">
            <p className="text-gold text-[13px] tracking-[0.2em] uppercase font-medium">
              Prestations
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-foreground">
              Nos services extensions de cils
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Des prestations pensées pour sublimer votre regard, du résultat le plus naturel au plus intense,
              avec un véritable souci de confort et de tenue dans le temps.
            </p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="card-lift h-full bg-white border border-border hover:border-gold/40 transition-all duration-300 p-5 sm:p-6 flex flex-col"
              >
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h2 className="font-playfair text-xl sm:text-2xl text-foreground">{service.name}</h2>
                  <p className="text-lg sm:text-xl font-playfair text-gold">{service.price}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
                  Durée estimée&nbsp;: {service.duration}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{service.description}</p>
              </Card>
            ))}
          </section>

          <section className="text-center space-y-4 pt-4">
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Vous ne savez pas encore quelle pose choisir&nbsp;? Lors du rendez-vous, nous prenons le temps
              d&apos;échanger pour adapter la prestation à votre regard, votre style de vie et vos envies.
            </p>
            <div className="flex justify-center">
              <Link href="/reservation">
                <Button className="cta-shimmer bg-gold hover:bg-gold-dark text-white px-10 py-4 h-auto text-xs sm:text-sm tracking-[0.08em] uppercase rounded-full font-semibold inline-flex items-center gap-2">
                  <Sparkles size={16} />
                  Réserver une prestation
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}

