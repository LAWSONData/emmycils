'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/formations', label: 'Formations' },
    { href: '/about', label: 'À Propos' },
    { href: '/gallery', label: 'Galerie' },
    { href: '/reservation', label: 'Réservation' },
    { href: '/contact', label: 'Contact' },
  ]

  const openCalendly = () => window.open('https://calendly.com/emmycils', 'calendly')

  /* Transparent over the home hero, solid everywhere else */
  const isTransparent = isHome && !scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(200,169,126,0.15)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo
              color={isTransparent ? '#ffffff' : '#0a0a0a'}
              className="h-11 sm:h-12 w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium tracking-[0.05em] uppercase transition-colors duration-300 group ${
                  isTransparent
                    ? 'text-white/70 hover:text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                    pathname === link.href
                      ? `w-full ${isTransparent ? 'bg-gold-light' : 'bg-gold'}`
                      : `w-0 group-hover:w-full ${isTransparent ? 'bg-white/50' : 'bg-gold'}`
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCalendly}
              className="cta-shimmer hidden lg:inline-flex items-center px-8 py-3 bg-gold hover:bg-gold-dark text-white text-[13px] font-semibold tracking-[0.05em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_4px_25px_rgba(200,169,126,0.45)]"
            >
              Réserver
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isTransparent ? 'text-white' : 'text-foreground'
              }`}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-cream border-t border-gold/10"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3 text-[15px] font-medium tracking-wide transition-colors ${
                      pathname === link.href
                        ? 'text-gold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    openCalendly()
                    setIsOpen(false)
                  }}
                  className="w-full py-3 bg-gold hover:bg-gold-dark text-white text-[13px] font-medium tracking-[0.05em] uppercase rounded-full transition-all duration-300"
                >
                  Réserver un RDV
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
