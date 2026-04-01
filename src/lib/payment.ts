import type { InputTransactionData } from '@aptos-labs/wallet-adapter-react'

const OCTAS_PER_APT = 100_000_000
const PLATFORM_FEE_PERCENT = 5
// Platform treasury address — receives the 5% fee
const PLATFORM_ADDRESS = '0x0' // TODO: replace with real platform wallet

/**
 * Build APT transfer transactions for a lesson purchase.
 * Splits payment: 95% to educator, 5% to platform.
 */
export function buildPaymentTransaction(
  recipientAddress: string,
  amountAPT: number,
): InputTransactionData {
  const totalOctas = Math.round(amountAPT * OCTAS_PER_APT)
  const feeOctas = Math.round(totalOctas * PLATFORM_FEE_PERCENT / 100)
  const creatorOctas = totalOctas - feeOctas

  // For now, send full amount to creator (platform fee collected when treasury is set)
  if (PLATFORM_ADDRESS === '0x0' || feeOctas === 0) {
    return {
      data: {
        function: '0x1::aptos_account::transfer',
        functionArguments: [recipientAddress, totalOctas],
      },
    }
  }

  // When platform address is configured, send creator's share
  // Fee transaction is handled separately via buildFeeTransaction()
  return {
    data: {
      function: '0x1::aptos_account::transfer',
      functionArguments: [recipientAddress, creatorOctas],
    },
  }
}

/** Build the platform fee transaction (5%) */
export function buildFeeTransaction(amountAPT: number): InputTransactionData | null {
  if (PLATFORM_ADDRESS === '0x0') return null
  const totalOctas = Math.round(amountAPT * OCTAS_PER_APT)
  const feeOctas = Math.round(totalOctas * PLATFORM_FEE_PERCENT / 100)
  if (feeOctas === 0) return null

  return {
    data: {
      function: '0x1::aptos_account::transfer',
      functionArguments: [PLATFORM_ADDRESS, feeOctas],
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
