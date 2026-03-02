import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShieldX, ArrowLeft } from 'lucide-react'

export default function FormationNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icône */}
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
          <ShieldX size={40} className="text-red-400" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h1 className="font-playfair text-2xl sm:text-3xl text-white">
            Accès non autorisé
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Ce lien de formation est invalide ou a expiré. Si vous avez acheté
            une formation, vérifiez le lien dans votre email de confirmation.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/formations">
            <Button className="w-full bg-gold hover:bg-gold-dark text-white h-12 rounded-full font-medium">
              Voir nos formations
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full text-white/60 hover:text-white hover:bg-white/10 h-12 rounded-full"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        {/* Contact */}
        <p className="text-white/30 text-xs">
          Un problème ?{' '}
          <a href="mailto:contact@emmycils.fr" className="text-gold/60 hover:text-gold">
            Contactez-nous
          </a>
        </p>
      </div>
    </div>
  )
}
