'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, CreditCard, ClipboardList, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LashDivider } from '@/components/animations'

const services = [
  'Cil à Cil — 70€',
  'Volume Russe Léger — 90€',
  'Volume Russe Intense — 100€',
  'Mega Volume — 150€',
  'Wet Look — 80€',
  'Fox Eye — 100€',
  'Whispy — 100€',
  'Eyeliner — 100€',
  'Colorée — 110€',
  'Kim K — 120€',
  'Retouche Cil à Cil — 50€',
  'Retouche Volume Russe — 80€',
  'Retouche Wet Look — 70€',
  'Retouche Whispy — 80€',
  'Retouche Mega — 100€',
]

const steps = [
  { icon: ClipboardList, label: 'Pré-réservation', number: '01' },
  { icon: Calendar, label: 'Calendrier', number: '02' },
  { icon: CreditCard, label: 'Acompte', number: '03' },
]

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Reservation form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
              En 3 étapes simples
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Réservez votre RDV
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Choisissez votre service, sélectionnez un créneau et confirmez
              avec un acompte de 20€.
            </p>
            <LashDivider className="pt-2" />
          </motion.div>

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center gap-4 sm:gap-8 mt-12"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="flex items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                      <Icon size={16} className="text-gold" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[11px] text-gold tracking-[0.1em] uppercase">
                        {step.number}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {step.label}
                      </p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 sm:w-16 h-px bg-border" />
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Card className="p-8 sm:p-10 bg-white border border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-gold text-[13px] tracking-[0.15em] uppercase font-medium">
                    Étape 01
                  </p>
                </div>
                <h2 className="font-playfair font-semibold text-2xl text-foreground mb-8">
                  Pré-Réservation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nom complet
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="border-border focus:border-gold focus:ring-gold/20 rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07 XX XX XX XX"
                        className="border-border focus:border-gold focus:ring-gold/20 rounded-lg h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      className="border-border focus:border-gold focus:ring-gold/20 rounded-lg h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Service souhaité
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(val) =>
                        setFormData({ ...formData, service: val })
                      }
                    >
                      <SelectTrigger className="border-border focus:border-gold focus:ring-gold/20 rounded-lg h-11">
                        <SelectValue placeholder="Choisir un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message <span className="text-muted-foreground">(optionnel)</span>
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Précisions sur vos souhaits..."
                      className="border-border focus:border-gold focus:ring-gold/20 rounded-lg min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3 h-auto text-[13px] tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,169,126,0.3)]"
                  >
                    Valider la pré-réservation
                  </Button>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                      >
                        <CheckCircle size={16} />
                        Merci ! Votre demande a été enregistrée. Emmy vous
                        contactera sous peu.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </motion.div>

            {/* Right: Calendar + Payment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Calendly */}
              <Card className="p-5 sm:p-8 bg-white border border-border overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-gold" />
                  <p className="text-gold text-[13px] tracking-[0.15em] uppercase font-medium">
                    Étape 02
                  </p>
                </div>
                <h2 className="font-playfair font-semibold text-2xl text-foreground mb-2">
                  Sélectionnez votre créneau
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Choisissez la date et l'heure qui vous conviennent.
                </p>
                <div className="rounded-lg overflow-hidden border border-border h-[380px] sm:h-[500px]">
                  <iframe
                    src="https://calendly.com/emmycils"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="rounded-lg"
                  />
                </div>
              </Card>

              {/* Payment */}
              <Card className="p-6 sm:p-8 bg-[#0a0a0a] border-none text-white overflow-hidden relative">
                <div className="absolute inset-0 dot-pattern" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-gold" />
                    <p className="text-gold text-[13px] tracking-[0.15em] uppercase font-medium">
                      Étape 03
                    </p>
                  </div>
                  <h3 className="font-playfair font-semibold text-xl mb-2">
                    Confirmez avec l'acompte
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    Un acompte de{' '}
                    <span className="text-gold font-semibold">20€</span> est
                    requis pour confirmer votre rendez-vous.
                  </p>
                  <Button
                    onClick={() =>
                      window.open('https://checkout.stripe.com', '_blank')
                    }
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3 h-auto text-[13px] tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,169,126,0.4)]"
                  >
                    Payer l'Acompte (20€)
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
