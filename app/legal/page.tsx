'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'

const sections = [
  {
    title: '1. Informations Légales',
    content: (
      <p>
        <strong>Dénomination sociale :</strong> Emmy Cils — Salon d&apos;Extensions de Cils<br />
        <strong>Adresse :</strong> 17 Rue Paul Eluard, 91700 Sainte-Geneviève-des-Bois, France<br />
        <strong>Téléphone :</strong> 07 45 13 46 13<br />
        <strong>Email :</strong> contact@emmycils.fr
      </p>
    ),
  },
  {
    title: '2. Responsable du Site',
    content: 'Le site www.emmycils.fr est édité et administré par Emmy, exploitante indépendante du salon Emmy Cils.',
  },
  {
    title: '3. Hébergement',
    content: 'Ce site est hébergé par Vercel, 440 N Barranca Ave, Covina CA 91723, USA.',
  },
  {
    title: '4. Propriété Intellectuelle',
    content: 'Le contenu, les textes, les images et tous les éléments du site emmycils.fr sont la propriété exclusive d\'Emmy Cils ou de ses partenaires. Toute reproduction, modification ou utilisation non autorisée est interdite.',
  },
  {
    title: '5. Limitation de Responsabilité',
    content: 'Emmy Cils ne peut être tenue responsable des dommages directs ou indirects résultant de l\'accès, de l\'utilisation ou de l\'impossibilité d\'utiliser le site. Le site est fourni "tel quel" sans garantie d\'aucune sorte.',
  },
  {
    title: '6. Conditions de Service',
    content: 'L\'utilisation de ce site implique l\'acceptation des présentes mentions légales et des conditions d\'utilisation. Emmy Cils se réserve le droit de modifier ces conditions à tout moment.',
  },
  {
    title: '7. Loi Applicable',
    content: 'Les présentes mentions légales sont régies par la loi française. Tout litige sera soumis à la juridiction compétente du ressort de la cour d\'appel de Paris.',
  },
  {
    title: '8. Contact',
    content: 'Pour toute question concernant ces mentions légales, contactez-nous à contact@emmycils.fr',
  },
]

export default function LegalPage() {
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
              Informations légales
            </p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-foreground">
              Mentions Légales
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
