'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.15,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  )
}

/* Floating element that moves on scroll */
interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FloatingElement({
  children,
  className = '',
  speed = 0.1,
  direction = 'up',
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const range = speed * 80

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [range, -range]),
    down: useTransform(scrollYProgress, [0, 1], [-range, range]),
    left: useTransform(scrollYProgress, [0, 1], [range, -range]),
    right: useTransform(scrollYProgress, [0, 1], [-range, range]),
  }

  const isHorizontal = direction === 'left' || direction === 'right'
  const style = isHorizontal
    ? { x: transforms[direction] }
    : { y: transforms[direction] }

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  )
}
