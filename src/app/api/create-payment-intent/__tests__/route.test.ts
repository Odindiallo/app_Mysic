import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '../route'
import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'
import Stripe from 'stripe'

// Mock Stripe
vi.mock('stripe', () => {
  return {
    default: vi.fn(() => ({
      paymentIntents: {
        create: vi.fn().mockResolvedValue({
          id: 'test_payment_intent_id',
          client_secret: 'test_client_secret',
        }),
      },
    })),
  }
})

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  supabaseServer: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: {
              id: 'test_song_id',
              price: 39.99,
              plan_type: 'single',
              plan_name: 'Single Song',
            },
          }),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn().mockResolvedValue({ error: null }),
      })),
    })),
  },
}))

describe('POST /api/create-payment-intent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a payment intent successfully', async () => {
    const request = new Request('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ songId: 'test_song_id' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      clientSecret: 'test_client_secret',
    })
  })

  it('handles missing song ID', async () => {
    const request = new Request('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data).toEqual({
      error: 'Song ID is required',
    })
  })

  it('handles song not found', async () => {
    // Mock Supabase to return null data
    vi.mocked(supabaseServer.from).mockReturnValue({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        })),
      })),
    } as any)

    const request = new Request('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ songId: 'non_existent_id' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({
      error: 'Song request not found',
    })
  })

  it('handles database error', async () => {
    // Mock Supabase to return an error
    vi.mocked(supabaseServer.from).mockReturnValue({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'Database error' },
          }),
        })),
      })),
    } as any)

    const request = new Request('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ songId: 'test_song_id' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      error: 'Failed to fetch song request',
    })
  })

  it('handles Stripe error', async () => {
    const stripeError = new Error('Stripe error message')

    // Mock successful database query but failed Stripe call
    vi.mocked(supabaseServer.from).mockReturnValue({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({
            data: {
              id: 'test_song_id',
              price: 39.99,
              plan_type: 'single',
              plan_name: 'Single Song',
            },
            error: null,
          }),
        })),
      })),
    } as any)

    // Mock Stripe to throw an error
    vi.mocked(Stripe).mockImplementation(() => ({
      paymentIntents: {
        create: vi.fn().mockRejectedValue(stripeError),
      },
    }) as any)

    const request = new Request('http://localhost:3000/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ songId: 'test_song_id' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      error: stripeError.message,
    })
  })
})
