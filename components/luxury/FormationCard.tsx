'use client'

import React from 'react'
import { GlassCard } from './GlassCard'
import { GoldButton } from './GoldButton'
import { cn } from '@/lib/utils'

interface FormationCardProps {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  modules: number
  onCheckout: (formationId: string) => void
  className?: string
}

export const FormationCard: React.FC<FormationCardProps> = ({
  id,
  title,
  description,
  price,
  duration,
  level,
  modules,
  onCheckout,
  className,
}) => {
  const priceInDollars = (price / 100).toFixed(2)
  
  const levelStyles = {
    beginner: 'bg-blue-500/20 text-blue-200',
    intermediate: 'bg-amber-500/20 text-amber-200',
    advanced: 'bg-red-500/20 text-red-200',
  }

  return (
    <GlassCard
      hover
      goldBorder
      className={cn('p-6 flex flex-col h-full', className)}
    >
      {/* Header */}
      <div className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-playfair text-2xl font-bold text-neutral-50 mb-2">
              {title}
            </h3>
            <p className="text-neutral-300 text-sm mb-4">{description}</p>
          </div>
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className={cn('px-3 py-1 rounded-full text-xs font-semibold capitalize', levelStyles[level])}>
            {level}
          </span>
          <span className="text-neutral-400 text-xs">{duration}</span>
        </div>

        {/* Course details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <span className="text-[#d4af37]">•</span>
            <span>{modules} modules</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-6 space-y-4">
        <div className="text-center">
          <div className="text-neutral-400 text-sm mb-1">Investment</div>
          <div className="text-3xl font-playfair font-bold text-[#d4af37]">
            ${priceInDollars}
          </div>
        </div>
        <GoldButton
          variant="primary"
          size="md"
          onClick={() => onCheckout(id)}
          className="w-full"
        >
          Enroll Now
        </GoldButton>
      </div>
    </GlassCard>
  )
}
