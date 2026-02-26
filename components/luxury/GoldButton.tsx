import React from 'react'
import { cn } from '@/lib/utils'

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-inter font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:ring-offset-2 focus:ring-offset-neutral-950',
          {
            'sm': 'px-4 py-2 text-sm',
            'md': 'px-6 py-3 text-base',
            'lg': 'px-8 py-4 text-lg',
          }[size],
          {
            'primary': 'bg-[#d4af37] text-neutral-950 hover:bg-[#e6c547] active:scale-95',
            'secondary': 'bg-neutral-900 text-[#d4af37] border border-[#d4af37]/50 hover:bg-neutral-800 active:scale-95',
            'outline': 'border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 active:scale-95',
          }[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

GoldButton.displayName = 'GoldButton'
