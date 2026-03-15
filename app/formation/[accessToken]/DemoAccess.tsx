'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface DemoAccessProps {
  onAccessGranted: () => void
}

export function DemoAccess({ onAccessGranted }: DemoAccessProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const AUTHORIZED_EMAIL = 'lawsonfrejus09@gmail.com'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simuler un délai de vérification
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email.toLowerCase().trim() === AUTHORIZED_EMAIL.toLowerCase()) {
      // Stocker l'accès dans sessionStorage
      sessionStorage.setItem('demo_access_granted', 'true')
      onAccessGranted()
    } else {
      setError('Accès refusé. Cette adresse email n\'est pas autorisée pour le mode démo.')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0f0d0a] to-[#0a0a0a] px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="relative rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-10">
          {/* Glow effect */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-gold/10 to-transparent" />

          <div className="relative">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Lock size={28} className="text-gold" />
            </div>

            {/* Title */}
            <h1 className="font-playfair text-3xl text-white text-center mb-3">
              Accès Démo
            </h1>
            <p className="text-white/60 text-center mb-8">
              Entrez votre adresse email pour accéder à la formation en mode démo
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold/50 focus:ring-gold/20"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                >
                  <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-200">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full h-14 bg-gold hover:bg-gold-dark text-white rounded-2xl text-sm tracking-[0.05em] uppercase font-semibold disabled:opacity-50"
              >
                {loading ? 'Vérification...' : 'Accéder à la démo'}
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 text-center">
                Mode démo réservé aux utilisateurs autorisés uniquement
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
