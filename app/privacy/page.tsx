'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'

const sections = [
  {
    title: '1. Introduction',
    content: 'Chez Emmy Cils, votre confidentialité est une priorité. Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.',
  },
  {
    title: '2. Données Collectées',
    content: (
      <>
        <p className="mb-3">Nous collectons les données suivantes lorsque vous utilisez notre site :</p>
        <ul className="space-y-1.5 ml-1">
          {['Nom et prénom', 'Adresse email', 'Numéro de téléphone', 'Préférences de rendez-vous', 'Données de navigation (cookies, adresse IP)'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '3. Utilisation des Données',
    content: (
      <>
        <p className="mb-3">Nous utilisons vos données pour :</p>
        <ul className="space-y-1.5 ml-1">
          {['Traiter vos réservations', 'Vous envoyer des confirmations et des rappels', 'Améliorer nos services', 'Vous contacter avec des informations pertinentes (si vous l\'acceptez)'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '4. Protection des Données',
    content: 'Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles contre l\'accès non autorisé, la modification ou la divulgation. Vos données sont traitées conformément au Règlement Général sur la Protection des Données (RGPD).',
  },
  {
    title: '5. Partage des Données',
    content: 'Nous ne partageons vos données avec des tiers que lorsque cela est nécessaire pour vous fournir nos services (par exemple, avec nos partenaires de paiement). Nous ne vendons jamais vos données.',
  },
  {
    title: '6. Cookies',
    content: 'Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.',
  },
  {
    title: '7. Vos Droits',
    content: (
      <>
        <p className="mb-3">Conformément au RGPD, vous avez le droit de :</p>
        <ul className="space-y-1.5 ml-1">
          {['Accéder à vos données personnelles', 'Corriger vos données', 'Demander la suppression de vos données', 'Révoquer votre consentement', 'Porter plainte auprès de l\'autorité compétente'].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '8. Contact',
    content: 'Pour exercer vos droits ou pour des questions concernant notre politique de confidentialité, contactez-nous à contact@emmycils.fr',
  },
  {
    title: '9. Modifications de la Politique',
    content: 'Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-24 sm:pt-28 pb-10 sm:pb-16 px-6 lg:px-8 bg-warm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 sm:space-y-5"
          >
            <p className="text-gold text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-medium">
              Vos données protégées
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-foreground">
              Politique de Confidentialité
            </h1>
            <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 px-6 lg:px-8 bg-cream flex-grow">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="space-y-3"
            >
              <h2 className="font-playfair font-semibold text-lg sm:text-xl text-foreground">
                {section.title}
              </h2>
              <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
