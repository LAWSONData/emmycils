import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { getFormationById } from '@/lib/formations'
import { isValidTokenFormat } from '@/lib/tokens'
import { FormationContent } from './FormationContent'
import { DemoAccessWrapper } from './DemoAccessWrapper'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageProps {
  params: Promise<{ accessToken: string }>
}

async function getAccessData(accessToken: string) {
  // Mode démo pour tester sans Supabase (token: "demo")
  if (accessToken === 'demo') {
    return {
      token: {
        id: 'demo',
        formation_id: 'form-technique-niveau-2',
        email: 'demo@example.com',
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
      progress: [],
    }
  }

  if (!isValidTokenFormat(accessToken)) {
    return null
  }

  try {
    const { data: tokenData, error } = await supabase
      .from('formation_access_tokens')
      .select('*')
      .eq('access_token', accessToken)
      .single()

    if (error || !tokenData) {
      return null
    }

    // Vérifier l'expiration
    if (new Date(tokenData.expires_at) < new Date()) {
      return null
    }

    // Récupérer la progression
    const { data: progressData } = await supabase
      .from('video_progress')
      .select('*')
      .eq('access_token_id', tokenData.id)

    // Mettre à jour last_accessed_at
    await supabase
      .from('formation_access_tokens')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('id', tokenData.id)

    return {
      token: tokenData,
      progress: progressData || [],
    }
  } catch {
    return null
  }
}

export default async function FormationAccessPage({ params }: PageProps) {
  const { accessToken } = await params

  const accessData = await getAccessData(accessToken)

  if (!accessData) {
    notFound()
  }

  const formation = getFormationById(accessData.token.formation_id)

  if (!formation) {
    notFound()
  }

  const isDemo = accessToken === 'demo'

  return (
    <DemoAccessWrapper
      formation={formation}
      accessToken={accessToken}
      initialProgress={accessData.progress}
      isDemo={isDemo}
    />
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { accessToken } = await params
  const accessData = await getAccessData(accessToken)

  if (!accessData) {
    return { title: 'Formation non trouvée' }
  }

  const formation = getFormationById(accessData.token.formation_id)

  return {
    title: formation ? `${formation.title} — Emmy Cils` : 'Formation — Emmy Cils',
    robots: 'noindex, nofollow', // Page cachée, pas indexée
  }
}
