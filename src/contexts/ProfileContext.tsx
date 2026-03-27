import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import type { UserProfile } from '../types'
import {
  getProfile,
  getProfileLocal,
  saveProfile,
  createDefaultProfile,
} from '../lib/profile-storage'

interface ProfileContextValue {
  profile: UserProfile | null
  loading: boolean
  isNewUser: boolean
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  refreshProfile: () => Promise<void>
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  loading: true,
  isNewUser: false,
  updateProfile: async () => {},
  refreshProfile: async () => {},
})

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { connected, account } = useWallet()
  const address = account?.address?.toString() || ''

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isNewUser, setIsNewUser] = useState(false)

  const loadProfile = useCallback(async () => {
    if (!connected || !address) {
      setProfile(null)
      setLoading(false)
      setIsNewUser(false)
      return
    }

    setLoading(true)

    // Quick: check localStorage first for instant UI
    const cached = getProfileLocal(address)
    if (cached) {
      setProfile(cached)
      setIsNewUser(false)
      setLoading(false)
    }

    // Then try Shelby (async, may fail)
    const shelbyProfile = await getProfile(address)
    if (shelbyProfile) {
      setProfile(shelbyProfile)
      setIsNewUser(false)
    } else if (!cached) {
      // No profile anywhere — new user
      setIsNewUser(true)
      setProfile(null)
    }

    setLoading(false)
  }, [connected, address])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    const current = profile || createDefaultProfile(address)
    const updated: UserProfile = { ...current, ...updates, updatedAt: Date.now() }
    setProfile(updated)
    setIsNewUser(false)
    await saveProfile(updated)
  }, [profile, address])

  const refreshProfile = useCallback(async () => {
    await loadProfile()
  }, [loadProfile])

  return (
    <ProfileContext.Provider value={{ profile, loading, isNewUser, updateProfile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
