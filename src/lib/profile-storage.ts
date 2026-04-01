import type { UserProfile } from '../types'
import { getShelbyClient, makeProfileBlobName, MICRO_PER_SECOND, DEFAULT_EXPIRATION_DAYS } from '../config'
import { downloadBlobAsText } from './blob-helpers'

const STORAGE_KEY = 'shelbylearn_profiles'

/** Wallet adapter signer shape (from @aptos-labs/wallet-adapter-react useWallet()) */
type WalletSigner = {
  account?: { address: any } | null
  signAndSubmitTransaction: (payload: any) => Promise<any>
}

// --- localStorage cache layer ---

function getLocalProfiles(): Record<string, UserProfile> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLocalProfile(profile: UserProfile) {
  const profiles = getLocalProfiles()
  profiles[profile.address] = profile
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

// --- Shelby blob layer ---

export async function saveProfileToShelby(
  profile: UserProfile,
  walletSigner: WalletSigner,
): Promise<boolean> {
  try {
    const client = getShelbyClient()
    const blobName = makeProfileBlobName(profile.address)
    const data = new TextEncoder().encode(JSON.stringify(profile))
    const expirationMicros =
      (Date.now() + DEFAULT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000) * (MICRO_PER_SECOND / 1000)

    await client.upload({
      blobData: data,
      signer: walletSigner as any,
      blobName,
      expirationMicros,
    })
    return true
  } catch (err) {
    console.warn('Shelby profile upload failed, using localStorage fallback:', err)
    return false
  }
}

export async function getProfileFromShelby(address: string): Promise<UserProfile | null> {
  try {
    const client = getShelbyClient()
    const blobName = makeProfileBlobName(address)
    const text = await downloadBlobAsText(client, address, blobName)
    return JSON.parse(text) as UserProfile
  } catch {
    return null
  }
}

// --- Public API (Shelby first, localStorage fallback) ---

export async function saveProfile(
  profile: UserProfile,
  walletSigner?: WalletSigner,
): Promise<void> {
  profile.updatedAt = Date.now()

  // Always cache locally
  saveLocalProfile(profile)

  // Try Shelby upload with real wallet signer
  if (walletSigner?.account) {
    await saveProfileToShelby(profile, walletSigner)
  }
}

export async function getProfile(address: string): Promise<UserProfile | null> {
  // Try Shelby first
  const shelbyProfile = await getProfileFromShelby(address)
  if (shelbyProfile) {
    saveLocalProfile(shelbyProfile) // update cache
    return shelbyProfile
  }

  // Fallback to localStorage
  const profiles = getLocalProfiles()
  return profiles[address] || null
}

export function getProfileLocal(address: string): UserProfile | null {
  const profiles = getLocalProfiles()
  return profiles[address] || null
}

export function getAllProfilesLocal(): UserProfile[] {
  return Object.values(getLocalProfiles())
}

export function createDefaultProfile(address: string): UserProfile {
  return {
    address,
    displayName: '',
    bio: '',
    role: 'student',
    expertise: [],
    socialLinks: {},
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}
