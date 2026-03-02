import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { isValidTokenFormat } from '@/lib/tokens'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { accessToken, videoFilename, watchedSeconds, totalSeconds } = await request.json()

    if (!accessToken || !videoFilename) {
      return NextResponse.json(
        { error: 'accessToken and videoFilename are required' },
        { status: 400 }
      )
    }

    if (!isValidTokenFormat(accessToken)) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 400 })
    }

    // Récupérer le token d'accès
    const { data: tokenData, error: tokenError } = await supabase
      .from('formation_access_tokens')
      .select('id')
      .eq('access_token', accessToken)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 404 })
    }

    // Calculer si la vidéo est complétée (90% visionnée)
    const completed = totalSeconds > 0 && (watchedSeconds / totalSeconds) >= 0.9

    // Upsert la progression
    const { error: progressError } = await supabase
      .from('video_progress')
      .upsert(
        {
          access_token_id: tokenData.id,
          video_filename: videoFilename,
          watched_seconds: Math.floor(watchedSeconds),
          total_seconds: Math.floor(totalSeconds),
          completed,
          last_watched_at: new Date().toISOString(),
        },
        {
          onConflict: 'access_token_id,video_filename',
        }
      )

    if (progressError) {
      console.error('[progress] Error saving progress:', progressError)
      return NextResponse.json({ error: 'Failed to save progress' }, { status: 500 })
    }

    return NextResponse.json({ success: true, completed })
  } catch (err) {
    console.error('[progress] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get('accessToken')

    if (!accessToken) {
      return NextResponse.json({ error: 'accessToken is required' }, { status: 400 })
    }

    if (!isValidTokenFormat(accessToken)) {
      return NextResponse.json({ error: 'Invalid token format' }, { status: 400 })
    }

    // Récupérer le token d'accès avec la progression
    const { data: tokenData, error: tokenError } = await supabase
      .from('formation_access_tokens')
      .select(`
        id,
        email,
        formation_id,
        created_at,
        expires_at,
        last_accessed_at
      `)
      .eq('access_token', accessToken)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json({ error: 'Invalid access token' }, { status: 404 })
    }

    // Vérifier l'expiration
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Access token expired' }, { status: 403 })
    }

    // Récupérer la progression des vidéos
    const { data: progressData } = await supabase
      .from('video_progress')
      .select('*')
      .eq('access_token_id', tokenData.id)

    // Mettre à jour last_accessed_at
    await supabase
      .from('formation_access_tokens')
      .update({ last_accessed_at: new Date().toISOString() })
      .eq('id', tokenData.id)

    return NextResponse.json({
      formationId: tokenData.formation_id,
      email: tokenData.email,
      createdAt: tokenData.created_at,
      expiresAt: tokenData.expires_at,
      progress: progressData || [],
    })
  } catch (err) {
    console.error('[progress] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
