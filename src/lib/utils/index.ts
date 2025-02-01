import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

// Styling utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Input validation
export const inputValidator = z.object({
  email: z.string().email(),
  songDetails: z.string().min(10).max(1000),
  specialInstructions: z.string().max(500).optional()
});

export function sanitizeUserInput(input: unknown) {
  return inputValidator.parse(input);
}
