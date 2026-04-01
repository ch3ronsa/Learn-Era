import { useState, useEffect, useRef } from 'react'
import { getShelbyClient, META_PREFIX } from '../config'
import { downloadBlobAsText } from '../lib/blob-helpers'
import { getDemoLessons } from '../lib/demo-lessons'
import type { Lesson, LessonMetadata } from '../types'

/**
 * Featured educator addresses — these accounts' lessons are fetched on Explore/Home.
 * Expand this list as more educators join.
 */
const FEATURED_EDUCATORS: string[] = [
  // Add real educator addresses here as they onboard
  // e.g. '0x1234abcd...'
]

const LESSONS_CACHE_KEY = 'shelbylearn_lessons_cache'

function getCachedLessons(): Lesson[] {
  try {
    const raw = localStorage.getItem(LESSONS_CACHE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function setCachedLessons(lessons: Lesson[]) {
  try {
    localStorage.setItem(LESSONS_CACHE_KEY, JSON.stringify(lessons))
  } catch { /* ignore */ }
}

/**
 * Fetch all lessons from known educator accounts on Shelby,
 * merged with demo data as fallback.
 */
export function useShelbyLessons() {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const cached = getCachedLessons()
    return cached.length > 0 ? cached : getDemoLessons()
  })
  const [loading, setLoading] = useState(false)
  const [shelbyAvailable, setShelbyAvailable] = useState<boolean | null>(null)
  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current || FEATURED_EDUCATORS.length === 0) {
      setShelbyAvailable(FEATURED_EDUCATORS.length > 0 ? null : false)
      return
    }
    fetched.current = true
    setLoading(true)

    const client = getShelbyClient()

    async function fetchAllLessons() {
      const shelbyLessons: Lesson[] = []

      for (const educator of FEATURED_EDUCATORS) {
        try {
          // Use the coordination client (indexer) to get blobs for this account
          const blobs = await client.coordination.getAccountBlobs({
            account: educator,
            pagination: { limit: 50, offset: 0 },
          })

          const metaBlobs = blobs.filter(b => b.blobNameSuffix.startsWith(META_PREFIX + '/'))

          for (const blob of metaBlobs) {
            try {
              const text = await downloadBlobAsText(client, educator, blob.blobNameSuffix)
              const meta = JSON.parse(text) as LessonMetadata
              shelbyLessons.push({ ...meta, metaBlobName: blob.blobNameSuffix })
            } catch { /* skip individual broken blobs */ }
          }
        } catch { /* skip unreachable educator */ }
      }

      return shelbyLessons
    }

    fetchAllLessons()
      .then(shelbyLessons => {
        const demo = getDemoLessons()
        if (shelbyLessons.length > 0) {
          // Merge: real lessons first, demo lessons appended
          const merged = [...shelbyLessons, ...demo]
          setLessons(merged)
          setCachedLessons(shelbyLessons) // only cache real ones
          setShelbyAvailable(true)
        } else {
          setLessons(demo)
          setShelbyAvailable(false)
        }
      })
      .catch(() => {
        setLessons(getDemoLessons())
        setShelbyAvailable(false)
      })
      .finally(() => setLoading(false))
  }, [])

  const isDemo = shelbyAvailable === false || FEATURED_EDUCATORS.length === 0

  return { lessons, loading, isDemo, shelbyAvailable }
}
