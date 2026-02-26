import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  goldBorder?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, hover = false, goldBorder = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl backdrop-blur-md bg-white/5 border',
          goldBorder
            ? 'border-[#d4af37]/30 hover:border-[#d4af37]/60'
            : 'border-white/10 hover:border-white/20',
          hover && 'hover-scale',
          'transition-all duration-300',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

GlassCard.displayName = 'GlassCard'
