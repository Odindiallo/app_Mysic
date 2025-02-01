import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PricingModal } from '../pricing-modal';
import { useSongStore } from '@/store/song-store';

// Rules Applied:
// - Testing and Validation: Adding comprehensive component tests
// - Error Handling: Testing user interactions
// - Documentation: Clear test descriptions

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('PricingModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    const store = useSongStore.getState();
    store.resetForm();
  });

  describe('Rendering', () => {
    it('should render all pricing tiers', () => {
      render(<PricingModal isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Single Song')).toBeInTheDocument();
      expect(screen.getByText('Triple Bundle')).toBeInTheDocument();
      expect(screen.getByText('Studio Pack')).toBeInTheDocument();
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
  });

  describe('Interactions', () => {
    it('should call onClose when dialog is closed', () => {
      render(<PricingModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should update form data and redirect when plan is selected', () => {
      const router = useRouter();
      render(<PricingModal isOpen={true} onClose={mockOnClose} />);
      
      const singlePlanButton = screen.getByRole('button', { name: /get started/i });
      fireEvent.click(singlePlanButton);
      
      const store = useSongStore.getState();
      expect(store.formData.plan).toBe('single');
      expect(router.push).toHaveBeenCalledWith('/create-song?plan=single');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
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
});
