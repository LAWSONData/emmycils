'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FormationsSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center py-28 px-6 lg:px-8 bg-warm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center space-y-8"
        >
          {/* Animated check icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center"
          >
            <CheckCircle size={40} className="text-gold" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="font-playfair text-3xl sm:text-4xl text-foreground">
              Merci pour votre achat !
            </h1>
            <div className="mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="space-y-4 text-muted-foreground">
            <div className="bg-white rounded-xl p-6 border border-border space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-gold/10 flex items-center justify-center">
                <Mail size={20} className="text-gold" />
              </div>
              <p className="text-foreground font-medium">
                Un email contenant vos PDFs et vidéos de formation vous a été envoyé.
              </p>
              <p className="text-sm">
                Vérifiez votre boîte de réception ainsi que vos{' '}
                <strong className="text-foreground">courriers indésirables (spam)</strong>{' '}
                si vous ne le trouvez pas dans les prochaines minutes.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/formations">
              <Button className="bg-gold hover:bg-gold-dark text-white px-8 py-3 h-auto text-[13px] tracking-[0.08em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,169,126,0.4)]">
                <ArrowLeft size={16} className="mr-2" />
                Retour aux formations
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
