import type { InputTransactionData } from '@aptos-labs/wallet-adapter-react'

const OCTAS_PER_APT = 100_000_000

/**
 * Build an APT transfer transaction payload.
 * Amount is in APT (e.g. 0.05), converted to octas internally.
 */
export function buildPaymentTransaction(
  recipientAddress: string,
  amountAPT: number,
): InputTransactionData {
  const amountOctas = Math.round(amountAPT * OCTAS_PER_APT)

  return {
    data: {
      function: '0x1::aptos_account::transfer',
      functionArguments: [recipientAddress, amountOctas],
    },
  }
}

const PAYMENT_CACHE_KEY = 'shelbylearn_payments'

/** Check if this lesson has been paid for (from local cache) */
export function isLessonPaid(lessonSlug: string): boolean {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    return !!cache[lessonSlug]
  } catch {
    return false
  }
}

/** Mark a lesson as paid in local cache */
export function markLessonPaid(lessonSlug: string, txHash: string): void {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    cache[lessonSlug] = { txHash, paidAt: Date.now() }
    localStorage.setItem(PAYMENT_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore storage errors
  }
}
