import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getFormationById } from '@/lib/formations'
import { sendFormationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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
          await sendFormationEmail({
            to: customerEmail,
            formation,
            sessionId: session.id,
          })
          console.log(`[webhook] Email sent to ${customerEmail} for ${formation.title}`)
        } catch (emailErr) {
          // Log but return 200 to avoid infinite Stripe retries
          console.error('[webhook] Failed to send email:', emailErr)
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
