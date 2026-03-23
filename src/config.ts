import { Network } from '@aptos-labs/ts-sdk'

export const SHELBY_CONFIG = {
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY || '',
} as const

export const BLOB_PREFIX = 'shelbylearn'
export const META_PREFIX = `${BLOB_PREFIX}/meta`
export const CONTENT_PREFIX = `${BLOB_PREFIX}/content`

export const DEFAULT_EXPIRATION_DAYS = 90
export const MICRO_PER_SECOND = 1_000_000

export function makeMetaBlobName(shortAddr: string, slug: string) {
  return `${META_PREFIX}/${shortAddr}/${slug}`
}

export function makeContentBlobName(shortAddr: string, slug: string) {
  return `${CONTENT_PREFIX}/${shortAddr}/${slug}`
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

export function shortAddress(addr: string): string {
  if (addr.length <= 10) return addr
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export function formatAPT(amount: number): string {
  if (amount === 0) return 'Free'
  return `${amount} APT`
}
