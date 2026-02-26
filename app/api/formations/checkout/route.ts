import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getFormationById } from '@/lib/formations'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { formationId, customerEmail } = await request.json()

    if (!formationId || !customerEmail) {
      return NextResponse.json(
        { error: 'formationId and customerEmail are required' },
        { status: 400 }
      )
    }

    const formation = getFormationById(formationId)

    if (!formation) {
      return NextResponse.json({ error: 'Formation not found' }, { status: 404 })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: formation.title,
              description: formation.subtitle,
            },
            unit_amount: formation.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/formations/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/formations`,
      metadata: {
        formationId: formation.id,
        formationTitle: formation.title,
        customerEmail,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err) {
    console.error('[formations/checkout] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
