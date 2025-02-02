// Rules Applied:
// - TypeScript Usage: Strong typing with Zod
// - Error Handling: Validation schemas
// - Modularization: Separate validation logic

import { z } from 'zod';

export const songFormSchema = z.object({
  plan: z.string().min(1, 'Please select a plan'),
  occasion: z.string().min(1, 'Please select an occasion'),
  recipient: z.string()
    .min(2, 'Recipient name must be at least 2 characters')
    .max(100, 'Recipient name must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  styles: z.array(z.string()).min(1, 'Please select at least one style'),
  custom_style: z.string().optional(),
  tempos: z.array(z.string()).min(1, 'Please select at least one tempo'),
  custom_tempo: z.string().optional(),
  additional_info: z.string().max(500, 'Additional info must be less than 500 characters').optional(),
  is_rush_delivery: z.boolean(),
});

export type SongFormData = z.infer<typeof songFormSchema>;

export const songRequestSchema = songFormSchema.extend({
  payment_status: z.enum(['pending', 'completed', 'failed']),
  id: z.string().uuid(),
  created_at: z.string().datetime(),
});

export type SongRequest = z.infer<typeof songRequestSchema>;
