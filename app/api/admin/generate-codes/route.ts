import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

function generateCode(): string {
  return `EMMYCILS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
}

export async function POST(request: NextRequest) {
  try {
    // Check auth header
    const authHeader = request.headers.get('authorization')
    const expectedKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'admin-key-123'

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    if (token !== expectedKey) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { formationId, count } = await request.json()

    if (!formationId || !count || count < 1 || count > 100) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Generate codes
    const codes = Array.from({ length: count }, () => ({
      id: uuidv4(),
      code: generateCode(),
      formation_id: formationId,
      used: false,
      used_by_email: null,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    }))

    // Insert into database
    const { data, error } = await supabase
      .from('access_codes')
      .insert(codes)
      .select()

    if (error) {
      console.error('[v0] DB error:', error)
      return NextResponse.json(
        { error: 'Failed to generate codes' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      count: data?.length || 0,
      codes: data?.map((c: any) => c.code) || [],
    })
  } catch (err) {
    console.error('[v0] Generate codes error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
