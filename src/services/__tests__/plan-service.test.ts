import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PlanService, validatePlanSelection } from '../plan-service';
import { supabase } from '@/lib/supabase/client';
import { PostgrestQueryBuilder, PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { PRICING_TIERS } from '@/constants/pricing';

type MockResult = {
  data: any;
  error: any;
};

// Create a type-safe mock builder
const createMockBuilder = <T extends object = any>(mockResult?: MockResult) => {
  const filterBuilder = {
    eq: vi.fn(() => filterBuilder),
    neq: vi.fn(() => filterBuilder),
    gt: vi.fn(() => filterBuilder),
    gte: vi.fn(() => filterBuilder),
    lt: vi.fn(() => filterBuilder),
    lte: vi.fn(() => filterBuilder),
    like: vi.fn(() => filterBuilder),
    ilike: vi.fn(() => filterBuilder),
    is: vi.fn(() => filterBuilder),
    in: vi.fn(() => filterBuilder),
    contains: vi.fn(() => filterBuilder),
    containedBy: vi.fn(() => filterBuilder),
    rangeLt: vi.fn(() => filterBuilder),
    rangeGt: vi.fn(() => filterBuilder),
    rangeGte: vi.fn(() => filterBuilder),
    rangeLte: vi.fn(() => filterBuilder),
    rangeAdjacent: vi.fn(() => filterBuilder),
    overlaps: vi.fn(() => filterBuilder),
    filter: vi.fn(() => filterBuilder),
    not: vi.fn(() => filterBuilder),
    or: vi.fn(() => filterBuilder),
    match: vi.fn(() => filterBuilder),
    single: vi.fn(() => mockResult || { data: null, error: null }),
  } as unknown as PostgrestFilterBuilder<any, any, any>;

  const queryBuilder = {
    select: vi.fn(() => filterBuilder),
    insert: vi.fn(() => filterBuilder),
    upsert: vi.fn(() => filterBuilder),
    update: vi.fn(() => filterBuilder),
    delete: vi.fn(() => filterBuilder),
  } as unknown as PostgrestQueryBuilder<any, any, string, unknown>;

  return queryBuilder;
};

// Mock Supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => createMockBuilder()),
  },
}));

describe('PlanService', () => {
  const mockPlanType = 'single';
  const mockPlanId = '123e4567-e89b-12d3-a456-426614174000';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('savePlanSelection', () => {
    it('should successfully save a plan selection', async () => {
      const mockResult = {
        data: { id: mockPlanId },
        error: null,
      };

      vi.mocked(supabase.from).mockReturnValue(createMockBuilder(mockResult));

      const result = await PlanService.savePlanSelection(mockPlanType);
      expect(result).toEqual({ id: mockPlanId });
      expect(supabase.from).toHaveBeenCalledWith('song_requests');
    });

    it('should handle errors when saving plan selection', async () => {
      const mockResult = {
        data: null,
        error: { message: 'Database error' },
      };

      vi.mocked(supabase.from).mockReturnValue(createMockBuilder(mockResult));

      await expect(PlanService.savePlanSelection(mockPlanType)).rejects.toThrow();
    });
  });

  describe('verifyPlanSelection', () => {
    it('should successfully verify a plan selection', async () => {
      const mockResult = {
        data: {
          id: mockPlanId,
          plan_type: mockPlanType,
          status: 'draft',
          plan_name: 'Single Song',
          price: 39.99,
          songs_included: 1,
          price_per_song: 39.99,
        },
        error: null,
      };

      vi.mocked(supabase.from).mockReturnValue(createMockBuilder(mockResult));

      const result = await PlanService.verifyPlanSelection(mockPlanId);
      expect(result).toEqual(PRICING_TIERS[0]); // Single plan is first in PRICING_TIERS
      expect(supabase.from).toHaveBeenCalledWith('song_requests');
    });

    it('should handle errors when verifying plan selection', async () => {
      const mockResult = {
        data: null,
        error: { message: 'Database error' },
      };

      vi.mocked(supabase.from).mockReturnValue(createMockBuilder(mockResult));

      await expect(PlanService.verifyPlanSelection(mockPlanId)).rejects.toThrow();
    });
  });
});

describe('validatePlanSelection', () => {
  it('should validate a valid plan type', () => {
    const result = validatePlanSelection('single');
    expect(result.isValid).toBe(true);
    expect(result.plan).toEqual(PRICING_TIERS[0]); // Single plan is first in PRICING_TIERS
  });

  it('should invalidate an empty plan type', () => {
    const result = validatePlanSelection('');
    expect(result.isValid).toBe(false);
    expect(result.error?.code).toBe('INVALID_PLAN');
  });

  it('should invalidate a non-existent plan type', () => {
    const result = validatePlanSelection('non-existent-plan');
    expect(result.isValid).toBe(false);
    expect(result.error?.code).toBe('PLAN_NOT_FOUND');
  });
});
