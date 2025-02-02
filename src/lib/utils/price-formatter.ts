// Following Muisique Rules:
// - Functional Programming: Pure functions
// - Descriptive Naming: Clear function names
// - TypeScript Usage: Explicit types

/**
 * Format a number as a price with currency symbol and decimals
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Calculate total price including tax and additional fees
 */
export function calculateTotalPrice({
  basePrice,
  taxRate,
  additionalFees = 0,
}: {
  basePrice: number;
  taxRate: number;
  additionalFees?: number;
}): {
  subtotal: number;
  taxAmount: number;
  total: number;
} {
  const subtotal = basePrice + additionalFees;
  const taxAmount = basePrice * taxRate;
  const total = subtotal + taxAmount;

  return {
    subtotal,
    taxAmount,
    total,
  };
}

/**
 * Format savings amount and percentage
 */
export function formatSavings({
  originalPrice,
  discountedPrice,
}: {
  originalPrice: number;
  discountedPrice: number;
}): {
  amount: string;
  percentage: string;
} {
  const savingsAmount = originalPrice - discountedPrice;
  const savingsPercentage = (savingsAmount / originalPrice) * 100;

  return {
    amount: formatPrice(savingsAmount),
    percentage: `${Math.round(savingsPercentage)}%`,
  };
}

/**
 * Format price per unit (e.g., per song)
 */
export function formatPricePerUnit({
  totalPrice,
  units,
}: {
  totalPrice: number;
  units: number;
}): string {
  if (units <= 0) throw new Error('Units must be greater than 0');
  return formatPrice(totalPrice / units);
}
