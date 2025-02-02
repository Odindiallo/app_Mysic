import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseServer } from '@/lib/supabase/server'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
  appInfo: {
    name: 'Musique App',
    version: '1.0.0',
  },
  telemetry: false, // Disable telemetry in development
})

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    const { songId } = body

    if (!songId) {
      return NextResponse.json(
        { error: 'Song ID is required' },
        { status: 400 }
      )
    }

    console.log('Fetching song request:', songId)

    // Get song request from database
    const { data: songRequest, error } = await supabaseServer
      .from('song_requests')
      .select('*')
      .eq('id', songId)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch song request' },
        { status: 500 }
      )
    }

    if (!songRequest) {
      return NextResponse.json(
        { error: 'Song request not found' },
        { status: 404 }
      )
    }

    console.log('Creating payment intent for song request:', songRequest)

    // Create Stripe payment intent
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(songRequest.price * 100), // Stripe expects amount in cents
        currency: 'usd',
        metadata: {
          songId: songId,
          planType: songRequest.plan_type,
          planName: songRequest.plan_name,
        },
      })

      console.log('Payment intent created:', paymentIntent.id)

      // Update song request with payment intent ID
      const { error: updateError } = await supabaseServer
        .from('song_requests')
        .update({
          payment_intent_id: paymentIntent.id,
          payment_status: 'awaiting_payment',
        })
        .eq('id', songId)

      if (updateError) {
        console.error('Failed to update song request:', updateError)
        return NextResponse.json(
          { error: 'Failed to update payment status' },
          { status: 500 }
        )
      }

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error('Stripe error:', error)
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Stripe error' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message || 'Error creating payment intent' },
      { status: 500 }
    )
  }
}
