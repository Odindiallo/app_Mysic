// Rules Applied:
// - Testing: Jest testing
// - TypeScript Usage: Type-safe mocks
// - Error Handling: Test error cases

import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { songService } from '../songService';
import { supabase } from '@/lib/supabase/client';
import { SongRequest } from '@/types/song';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

describe('songService', () => {
  const mockSongData: Omit<SongRequest, 'id' | 'created_at'> = {
    plan: 'basic',
    occasion: 'birthday',
    recipient: 'John Doe',
    message: 'Happy Birthday!',
    styles: ['pop'],
    tempos: ['moderate'],
    custom_style: '',
    custom_tempo: '',
    additional_info: '',
    is_rush_delivery: false,
    payment_status: 'pending',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSongRequest', () => {
    it('should create a song request successfully', async () => {
      const mockResponse: PostgrestSingleResponse<SongRequest> = {
        data: { id: '123', created_at: new Date().toISOString(), ...mockSongData },
        error: null,
        count: null,
        status: 201,
        statusText: 'Created',
      };

      const mockFrom = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue(mockResponse),
      };

      (supabase.from as jest.Mock).mockReturnValue(mockFrom);

      const result = await songService.createSongRequest(mockSongData);
      expect(result).toEqual(mockResponse.data);
      expect(supabase.from).toHaveBeenCalledWith('songs');
      expect(mockFrom.insert).toHaveBeenCalledWith(mockSongData);
    });

    it('should throw an error when creation fails', async () => {
      const mockError = new Error('Database error');
      const mockFrom = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockRejectedValue(mockError),
      };

      (supabase.from as jest.Mock).mockReturnValue(mockFrom);

      await expect(songService.createSongRequest(mockSongData))
        .rejects
        .toThrow('Failed to create song request');
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update payment status successfully', async () => {
      const mockResponse: PostgrestSingleResponse<SongRequest> = {
        data: null,
        error: null,
        count: null,
        status: 200,
        statusText: 'OK',
      };

      const mockFrom = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue(mockResponse),
      };

      (supabase.from as jest.Mock).mockReturnValue(mockFrom);

      await expect(songService.updatePaymentStatus('123', 'completed'))
        .resolves
        .not.toThrow();

      expect(supabase.from).toHaveBeenCalledWith('songs');
      expect(mockFrom.update).toHaveBeenCalledWith({ payment_status: 'completed' });
      expect(mockFrom.eq).toHaveBeenCalledWith('id', '123');
    });

    it('should throw an error when update fails', async () => {
      const mockError = new Error('Database error');
      const mockFrom = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockRejectedValue(mockError),
      };

      (supabase.from as jest.Mock).mockReturnValue(mockFrom);

      await expect(songService.updatePaymentStatus('123', 'completed'))
        .rejects
        .toThrow('Failed to update payment status');
    });
  });
});
