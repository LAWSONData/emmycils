'use client'

import Link from 'next/link'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/logo'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/formations', label: 'Formations' },
  { href: '/about', label: 'À Propos' },
  { href: '/gallery', label: 'Galerie' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white/80">
      {/* Gold separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
            <Link href="/">
              <Logo
                color="#ffffff"
                className="h-10 sm:h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Extensions de cils personnalisées pour sublimer votre regard avec
              élégance et professionnalisme.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="font-playfair font-semibold text-white text-sm tracking-[0.1em] uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-playfair font-semibold text-white text-sm tracking-[0.1em] uppercase">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+33745134613"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-gold transition-colors duration-300"
              >
                <Phone size={15} className="flex-shrink-0" />
                07 45 13 46 13
              </a>
              <a
                href="mailto:contact@emmycils.fr"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-gold transition-colors duration-300"
              >
                <Mail size={15} className="flex-shrink-0" />
                contact@emmycils.fr
              </a>
              <div className="flex items-start gap-3 text-sm text-white/40">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>
                  17 Rue Paul Eluard
                  <br />
                  91700 Sainte-Geneviève-des-Bois
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="font-playfair font-semibold text-white text-sm tracking-[0.1em] uppercase">
              Suivez-nous
            </h4>
            <a
              href="https://instagram.com/emmycils"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-white/40 hover:text-gold transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-gold/40 flex items-center justify-center transition-all duration-300">
                <Instagram size={18} />
              </div>
              <span>@emmycils</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
            <p>&copy; 2026 Emmy Cils. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link
                href="/legal"
                className="hover:text-gold/60 transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <Link
                href="/privacy"
                className="hover:text-gold/60 transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
