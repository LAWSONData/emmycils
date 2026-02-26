'use client'

import React from 'react'
import { GlassCard } from '@/components/luxury/GlassCard'
import { CheckCircle2 } from 'lucide-react'

const services = [
  {
    title: 'Expert Instruction',
    description: 'Learn from industry-leading lash artists with 10+ years of experience.',
    icon: '👑',
  },
  {
    title: 'Lifetime Access',
    description: 'Access course materials forever. Never-ending support and updates included.',
    icon: '⏰',
  },
  {
    title: 'Certification',
    description: 'Earn recognized certifications that boost your credibility and earning potential.',
    icon: '📜',
  },
  {
    title: 'Business Mastery',
    description: 'Build, scale, and monetize your lash business with proven strategies.',
    icon: '💼',
  },
]

export const Services: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-neutral-50 mb-4">
            Why Choose <span className="text-gold-gradient">EMMYCILS</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Premium education designed for professionals who demand excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <GlassCard
              key={index}
              goldBorder
              hover
              className="p-8 stagger-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{service.icon}</div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-neutral-50 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Premium Included</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
