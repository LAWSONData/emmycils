'use client'

import { useState, useEffect } from 'react'
import { DemoAccess } from './DemoAccess'
import type { Formation } from '@/lib/formations'

interface DemoAccessWrapperProps {
  formation: Formation
  accessToken: string
  initialProgress: any[]
  isDemo: boolean
}

export function DemoAccessWrapper({ formation, accessToken, initialProgress, isDemo }: DemoAccessWrapperProps) {
  const [accessGranted, setAccessGranted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'accès demo a déjà été accordé dans cette session
    const demoAccess = sessionStorage.getItem('demo_access_granted')
    if (demoAccess === 'true') {
      setAccessGranted(true)
    }
    setIsLoading(false)
  }, [])

  if (!isDemo) {
    // Si ce n'est pas le mode demo, importer dynamiquement FormationContent
    const { FormationContent } = require('./FormationContent')
    return <FormationContent formation={formation} accessToken={accessToken} initialProgress={initialProgress} />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-white/40">Chargement...</div>
      </div>
    )
  }

  if (!accessGranted) {
    return <DemoAccess onAccessGranted={() => setAccessGranted(true)} />
  }

  // Importer dynamiquement après l'accès accordé
  const { FormationContent } = require('./FormationContent')
  return <FormationContent formation={formation} accessToken={accessToken} initialProgress={initialProgress} />
}
