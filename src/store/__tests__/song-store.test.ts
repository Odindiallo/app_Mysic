// Rules Applied:
// - Testing: Jest testing
// - TypeScript Usage: Type-safe tests
// - Error Handling: Test error cases

import { describe, expect, beforeEach, it } from '@jest/globals';
import { useSongStore } from '../song-store';

describe('useSongStore', () => {
  beforeEach(() => {
    const store = useSongStore.getState();
    store.resetForm();
  });

  it('should initialize with default values', () => {
    const store = useSongStore.getState();
    expect(store.formData).toEqual({
      plan: '',
      occasion: '',
      recipient: '',
      message: '',
      styles: [],
      custom_style: '',
      tempos: [],
      custom_tempo: '',
      additional_info: '',
      is_rush_delivery: false,
    });
    expect(store.isFormValid).toBe(false);
    expect(store.hasUnsavedChanges).toBe(false);
    expect(store.currentStep).toBe(1);
  });

  it('should update form data', () => {
    const store = useSongStore.getState();
    store.setFormData({
      plan: 'basic',
      occasion: 'birthday',
      styles: ['pop'],
    });

    expect(store.formData.plan).toBe('basic');
    expect(store.formData.occasion).toBe('birthday');
    expect(store.formData.styles).toEqual(['pop']);
    expect(store.hasUnsavedChanges).toBe(true);
  });

  it('should validate form data', () => {
    const store = useSongStore.getState();
    store.setFormData({
      plan: 'basic',
      occasion: 'birthday',
      recipient: 'John',
      message: 'Happy Birthday!',
      styles: ['pop'],
      tempos: ['moderate'],
    });

    expect(store.validateForm()).toBe(true);
  });

  it('should handle step validation', () => {
    const store = useSongStore.getState();
    
    // Step 1: Plan selection
    store.setFormData({ plan: 'basic' });
    expect(store.validateStep(1)).toBe(true);
    
    // Step 2: Occasion and recipient
    store.setFormData({
      occasion: 'birthday',
      recipient: 'John',
    });
    expect(store.validateStep(2)).toBe(true);
  });
});
