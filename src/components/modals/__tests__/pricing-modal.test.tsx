import { describe, expect, it, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { PricingModal } from '../pricing-modal';
import { useSongStore } from '@/store/song-store';

// Rules Applied:
// - Testing: Jest testing
// - TypeScript Usage: Type-safe mocks
// - Error Handling: Test error cases

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('PricingModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    const store = useSongStore.getState();
    store.resetForm();
  });

  it('renders pricing options', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText(/Single Song/i)).toBeInTheDocument();
    expect(screen.getByText(/Triple Bundle/i)).toBeInTheDocument();
    expect(screen.getByText(/Studio Pack/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('navigates to form with selected plan', () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    const singlePlanButton = screen.getByRole('button', { name: /get started/i });
    fireEvent.click(singlePlanButton);
    
    const store = useSongStore.getState();
    expect(store.formData.plan).toBe('single');
    expect(mockRouter.push).toHaveBeenCalledWith('/create-song?plan=single');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show correct pricing information', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$149.99')).toBeInTheDocument();
  });

  it('should highlight the most popular plan', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('should be keyboard navigable', () => {
    render(<PricingModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    closeButton.focus();
    fireEvent.keyDown(closeButton, { key: 'Enter' });
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
