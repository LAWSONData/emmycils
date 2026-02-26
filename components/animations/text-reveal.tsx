'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: TextRevealProps) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="inline"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
            }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.065,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

/* Variant: line-by-line reveal for paragraphs */
interface LineRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function LineReveal({ children, className = '', delay = 0 }: LineRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
