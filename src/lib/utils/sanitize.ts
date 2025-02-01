import { z } from 'zod'

export const inputValidator = z.object({
  email: z.string().email(),
  songDetails: z.string().min(10).max(1000),
  specialInstructions: z.string().max(500).optional()
})

export function sanitizeUserInput(input: unknown) {
  return inputValidator.parse(input)
}
