'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  fadeDir: number
  wobble: number
  wobbleSpeed: number
}

interface GoldenParticlesProps {
  className?: string
  count?: number
  speed?: number
}

export function GoldenParticles({
  className = '',
  count = 45,
  speed = 0.25,
}: GoldenParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.2 + 0.4,
        speedX: (Math.random() - 0.5) * speed * 0.6,
        speedY: -Math.random() * speed - 0.08,
        opacity: Math.random() * 0.5 + 0.05,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.005,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed
        p.x += p.speedX + Math.sin(p.wobble) * 0.15
        p.y += p.speedY
        p.opacity += p.fadeDir * 0.002

        if (p.opacity >= 0.6) p.fadeDir = -1
        if (p.opacity <= 0.03) p.fadeDir = 1

        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10

        // Gold particle with soft glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3
        )
        gradient.addColorStop(0, `rgba(200, 169, 126, ${p.opacity})`)
        gradient.addColorStop(0.4, `rgba(212, 184, 150, ${p.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(200, 169, 126, 0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Sharp bright core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 240, 220, ${p.opacity * 0.8})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      initParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
