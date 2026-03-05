import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const targetId = searchParams.get('targetId')

    if (!type || !targetId) {
      return NextResponse.json({ comments: [] })
    }

    const { data, error } = await supabase
      .from('comments')
      .select('id, first_name, last_name, comment, created_at')
      .eq('type', type)
      .eq('target_id', targetId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[comments] GET error:', error)
      return NextResponse.json({ comments: [] })
    }

    return NextResponse.json({ comments: data || [] })
  } catch (err) {
    console.error('[comments] GET error:', err)
    return NextResponse.json({ comments: [] })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, targetId, firstName, lastName, email, comment } = await request.json()

    if (!type || !targetId || !firstName || !lastName || !email || !comment) {
      return NextResponse.json(
        { error: 'Champs manquants.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({
        type,
        target_id: targetId,
        first_name: firstName,
        last_name: lastName,
        email,
        comment,
      })
      .select('id, first_name, last_name, comment, created_at')
      .single()

    if (error) {
      console.error('[comments] POST error:', error)
      return NextResponse.json(
        { error: 'Impossible d’enregistrer ton avis.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ comment: data })
  } catch (err) {
    console.error('[comments] POST error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    )
  }
}

