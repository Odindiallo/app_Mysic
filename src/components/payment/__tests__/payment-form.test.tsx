import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PaymentForm } from '../payment-form'
import { useSongStore } from '@/store/song-store'

// Mock Zustand store
vi.mock('@/store/song-store', () => ({
  useSongStore: vi.fn(),
}))

// Mock the Stripe hooks and components
vi.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => ({
    confirmPayment: vi.fn().mockResolvedValue({ paymentIntent: { status: 'succeeded' } }),
  }),
  useElements: () => ({}),
  PaymentElement: () => <div data-testid="stripe-payment-element">Payment Element</div>,
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock the loadStripe function
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: () => Promise.resolve({}),
}))

// Mock the next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock the toast component
const mockToast = vi.fn()
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}))

describe('PaymentForm', () => {
  const mockSongData = {
    songId: 'test-song-id',
    formData: {
      plan: 'Single Song',
      price: 39.99,
      songsIncluded: 1,
      pricePerSong: 39.99,
      occasion: 'Birthday',
      recipientName: 'Test User',
      message: 'Test message',
      styles: ['Rock'],
      tempos: ['Medium'],
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ clientSecret: 'test_client_secret' }),
    })
    ;(useSongStore as any).mockReturnValue({
      ...mockSongData,
      clearFormData: vi.fn(),
    })
  })

  it('renders loading state initially', async () => {
    render(<PaymentForm />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders payment form after loading', async () => {
    render(<PaymentForm />)
    await waitFor(() => {
      expect(screen.getByTestId('stripe-payment-element')).toBeInTheDocument()
    })
  })

  it('handles payment submission', async () => {
    const user = userEvent.setup()
    render(<PaymentForm />)

    // Wait for form to load
    await waitFor(() => {
      expect(screen.getByTestId('stripe-payment-element')).toBeInTheDocument()
    })

    // Click submit button
    const submitButton = screen.getByRole('button', { name: /pay now/i })
    await user.click(submitButton)

    // Wait for button to be disabled during processing
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  })

  it('handles payment intent creation error', async () => {
    // Mock failed payment intent creation
    ;(global.fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed to initialize payment' }),
    })

    render(<PaymentForm />)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Failed to initialize payment',
        variant: 'destructive',
      })
    })

    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })
})
