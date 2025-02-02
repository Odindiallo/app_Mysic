// Rules Applied:
// - Testing: Validation testing
// - Error Handling: Test error cases
// - TypeScript Usage: Type-safe testing

import { songFormSchema } from '../song-schema';

describe('songFormSchema', () => {
  const validSongData = {
    plan: 'basic',
    occasion: 'birthday',
    recipient: 'John Doe',
    message: 'Happy Birthday! This is a test message.',
    styles: ['pop'],
    tempos: ['moderate'],
    is_rush_delivery: false,
  };

  describe('validation', () => {
    it('should validate correct data', () => {
      const result = songFormSchema.safeParse(validSongData);
      expect(result.success).toBe(true);
    });

    it('should require plan', () => {
      const { plan, ...data } = validSongData;
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should validate recipient length', () => {
      const data = { ...validSongData, recipient: 'A' };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should validate message length', () => {
      const data = { ...validSongData, message: 'Too short' };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should require at least one style', () => {
      const data = { ...validSongData, styles: [] };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should require at least one tempo', () => {
      const data = { ...validSongData, tempos: [] };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it('should allow optional fields', () => {
      const data = {
        ...validSongData,
        custom_style: 'Jazz fusion',
        custom_tempo: 'Very slow',
        additional_info: 'Some extra details',
      };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it('should validate additional_info length', () => {
      const data = {
        ...validSongData,
        additional_info: 'a'.repeat(501), // Exceeds max length
      };
      const result = songFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
