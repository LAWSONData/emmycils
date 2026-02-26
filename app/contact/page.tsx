'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LashDivider } from '@/components/animations'

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '07 45 13 46 13',
    href: 'tel:+33745134613',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@emmycils.fr',
    href: 'mailto:contact@emmycils.fr',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: '17 Rue Paul Eluard, 91700 Sainte-Geneviève-des-Bois',
    href: undefined,
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun–Ven 09h–19h · Sam 10h–18h · Dim sur RDV',
    href: undefined,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
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
              Parlons de votre regard
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Nous Contacter
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Une question, un conseil ? Nous sommes à votre écoute pour vous
              accompagner.
            </p>
            <LashDivider className="pt-2" />
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-14">
            {/* Form – 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -24, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <Card className="p-8 sm:p-10 bg-white border border-border">
                <h2 className="font-playfair font-semibold text-2xl text-foreground mb-8">
                  Envoyez-nous un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nom
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
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Votre message..."
                      required
                      className="border-border focus:border-gold focus:ring-gold/20 rounded-lg min-h-[140px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="cta-shimmer w-full bg-gold hover:bg-gold-dark text-white py-4 h-auto text-sm tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_30px_rgba(200,169,126,0.5)] font-semibold"
                  >
                    <Mail size={18} className="mr-2" />
                    Envoyer le Message
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
                        Merci ! Votre message a bien été reçu. Emmy vous répondra
                        sous peu.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Card>
            </motion.div>

            {/* Info – 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {contactInfo.map((info) => {
                const Icon = info.icon
                const Wrapper = info.href ? 'a' : 'div'
                const wrapperProps = info.href
                  ? { href: info.href, className: 'block' }
                  : { className: 'block' }

                return (
                  <Wrapper key={info.title} {...(wrapperProps as any)}>
                    <Card className="p-6 bg-warm border border-border hover:border-gold/30 transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                          <Icon size={16} className="text-gold" />
                        </div>
                        <div>
                          <h3 className="font-playfair font-semibold text-foreground text-sm mb-1">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Wrapper>
                )
              })}

              {/* Map embed */}
              <Card className="overflow-hidden border border-border">
                <div className="h-48 sm:h-56 md:h-64 lg:h-72">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.8742889537366!2d2.2816!3d48.6306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5d3c7c7c7c7c7%3A0x0!2s17%20Rue%20Paul%20Eluard%2C%2091700%20Sainte-Genevi%C3%A8ve-des-Bois!5e0!3m2!1sfr!2sfr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>

              <Card className="p-6 bg-[#0a0a0a] border-none text-white">
                <h3 className="font-playfair font-semibold text-sm mb-3 text-gold">
                  Comment venir ?
                </h3>
                <div className="space-y-2 text-sm text-white/50">
                  <p>
                    <span className="text-white/70">Parking&nbsp;:</span>{' '}
                    Disponible à proximité
                  </p>
                  <p>
                    <span className="text-white/70">Transport&nbsp;:</span>{' '}
                    Proche de la gare
                  </p>
                  <p>
                    <span className="text-white/70">Accessibilité&nbsp;:</span>{' '}
                    Accessible à tous
                  </p>
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
