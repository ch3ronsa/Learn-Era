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

interface PaymentRecord {
  txHash: string
  paidAt: number
  verified?: boolean
}

/** Check if this lesson has been paid for (from local cache) */
export function isLessonPaid(lessonSlug: string): boolean {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    return !!cache[lessonSlug]
  } catch {
    return false
  }
}

/** Get payment record for a lesson */
export function getPaymentRecord(lessonSlug: string): PaymentRecord | null {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    return cache[lessonSlug] || null
  } catch {
    return null
  }
}

/** Mark a lesson as paid in local cache */
export function markLessonPaid(lessonSlug: string, txHash: string): void {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    cache[lessonSlug] = { txHash, paidAt: Date.now(), verified: false } satisfies PaymentRecord
    localStorage.setItem(PAYMENT_CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore storage errors
  }
}

/** Verify payment on-chain via Aptos REST API */
export async function verifyPaymentOnChain(
  txHash: string,
  expectedRecipient: string,
  expectedAmountAPT: number,
): Promise<boolean> {
  try {
    const res = await fetch(
      `https://fullnode.testnet.aptoslabs.com/v1/transactions/by_hash/${txHash}`,
    )
    if (!res.ok) return false

    const tx = await res.json()
    if (!tx.success) return false

    // Check it's an aptos_account::transfer
    const payload = tx.payload
    if (!payload || payload.function !== '0x1::aptos_account::transfer') return false

    const [recipient, amountStr] = payload.arguments || []
    const expectedOctas = Math.round(expectedAmountAPT * OCTAS_PER_APT)

    const recipientMatch =
      recipient?.toLowerCase() === expectedRecipient.toLowerCase()
    const amountMatch = Number(amountStr) >= expectedOctas

    return recipientMatch && amountMatch
  } catch {
    return false
  }
}

/** Mark a payment as verified */
export function markPaymentVerified(lessonSlug: string): void {
  try {
    const cache = JSON.parse(localStorage.getItem(PAYMENT_CACHE_KEY) || '{}')
    if (cache[lessonSlug]) {
      cache[lessonSlug].verified = true
      localStorage.setItem(PAYMENT_CACHE_KEY, JSON.stringify(cache))
    }
  } catch {
    // ignore
  }
}
