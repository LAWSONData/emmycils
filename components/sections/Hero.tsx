'use client'

import React, { useEffect, useState } from 'react'
import { GoldButton } from '@/components/luxury/GoldButton'

interface HeroProps {
  onExplore: () => void
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto stagger-item">
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-block px-4 py-2 mb-6 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5">
            <span className="text-[#d4af37] text-sm font-semibold">PREMIUM LASH ACADEMY</span>
          </div>
        </div>

        <h1
          className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-50 mb-6 leading-tight animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          Elevate Your
          <br />
          <span className="text-gold-gradient">Lash Artistry</span>
        </h1>

        <p
          className="text-lg md:text-xl text-neutral-300 mb-8 max-w-2xl mx-auto animate-fade-in-up leading-relaxed"
          style={{ animationDelay: '0.3s' }}
        >
          Master professional lash extension techniques with our elite certification programs. Transform your passion into a thriving business.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <GoldButton
            variant="primary"
            size="lg"
            onClick={onExplore}
            className="animate-scale-in"
          >
            Explore Formations
          </GoldButton>
          <GoldButton
            variant="outline"
            size="lg"
            className="animate-scale-in"
            style={{ animationDelay: '0.1s' }}
          >
            Learn More
          </GoldButton>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="text-[#d4af37] text-sm opacity-60">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
