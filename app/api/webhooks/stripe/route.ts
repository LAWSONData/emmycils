import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getFormationById } from '@/lib/formations'
import { sendFormationAccessEmail } from '@/lib/email'
import { generateAccessToken } from '@/lib/tokens'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { formationId, customerEmail } = session.metadata || {}

    if (formationId && customerEmail) {
      const formation = getFormationById(formationId)

      if (formation) {
        try {
          // Générer un token d'accès sécurisé
          const accessToken = generateAccessToken()

          // Sauvegarder dans la base de données
          const { error: dbError } = await supabase
            .from('formation_access_tokens')
            .insert({
              access_token: accessToken,
              email: customerEmail,
              formation_id: formationId,
              stripe_session_id: session.id,
            })

          if (dbError) {
            console.error('[webhook] Database error:', dbError)
          }

          // Générer l'URL d'accès
          const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://emmycils.fr'
          const accessUrl = `${origin}/formation/${accessToken}`

          // Envoyer l'email avec le lien d'accès
          await sendFormationAccessEmail({
            to: customerEmail,
            formation,
            accessUrl,
            sessionId: session.id,
          })

          console.log(`[webhook] Access granted to ${customerEmail} for ${formation.title}`)
        } catch (emailErr) {
          // Log but return 200 to avoid infinite Stripe retries
          console.error('[webhook] Failed to process:', emailErr)
        }
      } else {
        console.error(`[webhook] Formation not found: ${formationId}`)
      }
    } else {
      console.error('[webhook] Missing metadata in session:', session.id)
    }
  }

  return NextResponse.json({ received: true })
}
