'use client'

import { motion } from 'framer-motion'

interface LashDividerProps {
  className?: string
  color?: string
}

export function LashDivider({ className = '', color = '#c8a97e' }: LashDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {/* Left gold line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 50, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
      />

      {/* Animated eyelash motif */}
      <motion.svg
        width="32"
        height="20"
        viewBox="0 0 32 20"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Individual lashes fanning out */}
        {[
          { d: 'M6,17 Q9,4 8,0', w: 1.3 },
          { d: 'M9,17 Q12,5 13,1', w: 1.2 },
          { d: 'M11,16.5 Q15,6 18,2', w: 1.15 },
          { d: 'M13,16 Q17,7 22,3', w: 1.1 },
          { d: 'M15,15.5 Q19,8 25,5', w: 1 },
          { d: 'M17,15 Q21,10 27,7', w: 0.9 },
        ].map((lash, i) => (
          <motion.path
            key={i}
            d={lash.d}
            stroke={color}
            strokeWidth={lash.w}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4 + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
        {/* Lash band */}
        <motion.path
          d="M4,18.5 Q10,15 16,15 Q22,15 28,18"
          stroke={color}
          strokeWidth={1.6}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.svg>

      {/* Right gold line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 50, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-px"
        style={{ background: `linear-gradient(270deg, transparent, ${color})` }}
      />
    </div>
  )
}

/* Smaller inline lash for section accents */
export function LashAccent({ className = '', color = '#c8a97e' }: LashDividerProps) {
  return (
    <motion.svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <path d="M3,12 Q6,3 5,0" stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M5,12 Q9,4 10,1" stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M7,11.5 Q11,5 14,2" stroke={color} strokeWidth="0.85" fill="none" strokeLinecap="round" />
      <path d="M9,11 Q13,6 17,4" stroke={color} strokeWidth="0.8" fill="none" strokeLinecap="round" />
      <path d="M11,10.5 Q14,7 19,6" stroke={color} strokeWidth="0.75" fill="none" strokeLinecap="round" />
      <path d="M2,13 Q7,10.5 12,10.5 Q17,10.5 20,12.5" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}
