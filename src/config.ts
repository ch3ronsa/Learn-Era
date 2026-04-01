import { Network } from '@aptos-labs/ts-sdk'
import { ShelbyClient } from '@shelby-protocol/sdk/browser'

export const SHELBY_NETWORK = Network.SHELBYNET

export const SHELBY_CONFIG = {
  network: SHELBY_NETWORK,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY || undefined,
} as const

let _shelbyClient: ShelbyClient | null = null

export function getShelbyClient(): ShelbyClient {
  if (!_shelbyClient) {
    _shelbyClient = new ShelbyClient({
      network: SHELBY_NETWORK,
      apiKey: SHELBY_CONFIG.apiKey,
    })
  }
  return _shelbyClient
}

/** Check if Shelby RPC is reachable */
export async function checkShelbyConnection(): Promise<boolean> {
  try {
    const client = getShelbyClient()
    // Try a lightweight call — list blobs for a known nonexistent account
    await client.download({ account: '0x1', blobName: '__ping__' })
    return true
  } catch (err: any) {
    // A 404 / "blob not found" means the RPC is reachable
    if (err?.message?.includes('not found') || err?.message?.includes('404') || err?.status === 404) {
      return true
    }
    return false
  }
}

export const BLOB_PREFIX = 'shelbylearn'
export const META_PREFIX = `${BLOB_PREFIX}/meta`
export const CONTENT_PREFIX = `${BLOB_PREFIX}/content`
export const PROFILE_PREFIX = `${BLOB_PREFIX}/profile`

export const DEFAULT_EXPIRATION_DAYS = 90
export const MICRO_PER_SECOND = 1_000_000

export function makeMetaBlobName(shortAddr: string, slug: string) {
  return `${META_PREFIX}/${shortAddr}/${slug}`
}

export function makeContentBlobName(shortAddr: string, slug: string) {
  return `${CONTENT_PREFIX}/${shortAddr}/${slug}`
}

export function makeProfileBlobName(address: string) {
  return `${PROFILE_PREFIX}/${address.slice(0, 10)}`
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
