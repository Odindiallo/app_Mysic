import { beforeEach, describe, expect, it } from 'vitest';
import { useSongStore } from '../song-store';

// Rules Applied:
// - Testing and Validation: Adding comprehensive unit tests
// - Error Handling: Testing error cases
// - Documentation: Clear test descriptions

describe('Song Store', () => {
  beforeEach(() => {
    const store = useSongStore.getState();
    store.resetForm();
  });

  describe('Form Data Management', () => {
    it('should initialize with default values', () => {
      const store = useSongStore.getState();
      expect(store.formData).toEqual({
        plan: undefined,
        occasion: undefined,
        recipient: undefined,
        message: undefined,
        style: undefined,
        tempo: undefined,
        additionalInfo: undefined,
        isRushDelivery: false,
      });
      expect(store.isFormValid).toBe(false);
      expect(store.hasUnsavedChanges).toBe(false);
    });

    it('should update form data correctly', () => {
      const store = useSongStore.getState();
      store.setFormData({
        plan: 'single',
        occasion: 'Birthday',
      });

      expect(store.formData.plan).toBe('single');
      expect(store.formData.occasion).toBe('Birthday');
      expect(store.hasUnsavedChanges).toBe(true);
    });

    it('should validate required fields correctly', () => {
      const store = useSongStore.getState();
      
      // Incomplete form
      store.setFormData({
        plan: 'single',
        occasion: 'Birthday',
      });
      expect(store.isFormValid).toBe(false);

      // Complete form
      store.setFormData({
        plan: 'single',
        occasion: 'Birthday',
        recipient: 'John',
        message: 'Happy Birthday!',
        style: 'Pop',
        tempo: 'Medium & Groovy',
      });
      expect(store.isFormValid).toBe(true);
    });

    it('should reset form correctly', () => {
      const store = useSongStore.getState();
      
      store.setFormData({
        plan: 'single',
        occasion: 'Birthday',
      });
      
      store.resetForm();
      
      expect(store.formData).toEqual({
        plan: undefined,
        occasion: undefined,
        recipient: undefined,
        message: undefined,
        style: undefined,
        tempo: undefined,
        additionalInfo: undefined,
        isRushDelivery: false,
      });
      expect(store.isFormValid).toBe(false);
      expect(store.hasUnsavedChanges).toBe(false);
    });
  });

  describe('Form Validation', () => {
    it('should handle empty values correctly', () => {
      const store = useSongStore.getState();
      
      store.setFormData({
        plan: '',
        occasion: '',
      });
      
      expect(store.isFormValid).toBe(false);
    });

    it('should handle undefined values correctly', () => {
      const store = useSongStore.getState();
      
      store.setFormData({
        plan: undefined,
        occasion: undefined,
      });
      
      expect(store.isFormValid).toBe(false);
    });
  });
});
