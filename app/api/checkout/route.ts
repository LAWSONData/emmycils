import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { formationId } = await request.json()

    // Get formation details from Supabase
    const supabase = await createClient()
    const { data: formation, error } = await supabase
      .from('formations')
      .select('*')
      .eq('id', formationId)
      .single()

    if (error || !formation) {
      return NextResponse.json({ error: 'Formation not found' }, { status: 404 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: formation.title,
              description: formation.description,
            },
            unit_amount: formation.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/formations`,
      metadata: {
        formationId: formation.id,
        formationTitle: formation.title,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (err) {
    console.error('[v0] Checkout error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
