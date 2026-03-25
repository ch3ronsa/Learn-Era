import { Link } from 'react-router-dom'
import { useAccountBlobs } from '@shelby-protocol/react'
import { useWalletState } from '../components/WalletConnect'
import { LessonCard } from '../components/LessonCard'
import { getShelbyClient } from '../config'
import { getDemoLessons } from '../lib/demo-lessons'
import { isMetaBlob } from '../lib/blob-helpers'
import type { Lesson } from '../types'
import { useState, useEffect } from 'react'
import { downloadBlobAsText } from '../lib/blob-helpers'

export function Dashboard() {
  const { connected, address, connect } = useWalletState()
  const shelbyClient = getShelbyClient()

  const { data: blobs, isLoading } = useAccountBlobs({
    client: shelbyClient,
    account: address || '0x0',
    pagination: { limit: 50, offset: 0 },
    enabled: connected && !!address,
  })

  const [myLessons, setMyLessons] = useState<Lesson[]>([])
  const [loadingLessons, setLoadingLessons] = useState(false)

  useEffect(() => {
    if (!blobs || !address) return

    const metaBlobs = blobs.filter(b => isMetaBlob(b.blobNameSuffix))
    if (metaBlobs.length === 0) {
      setMyLessons([])
      return
    }

    setLoadingLessons(true)
    Promise.all(
      metaBlobs.map(async (blob) => {
        try {
          const text = await downloadBlobAsText(shelbyClient, address, blob.blobNameSuffix)
          const meta = JSON.parse(text)
          return { ...meta, metaBlobName: blob.blobNameSuffix } as Lesson
        } catch {
          return null
        }
      })
    ).then(results => {
      setMyLessons(results.filter((r): r is Lesson => r !== null))
      setLoadingLessons(false)
    })
  }, [blobs, address])

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Connect to View Dashboard</h2>
        <p className="text-[var(--color-text-muted)] mb-6 font-semibold">
          Connect your wallet to see your published lessons and earnings.
        </p>
        <button
          onClick={connect}
          className="btn-chunky btn-chunky-primary px-8 py-4 text-base"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  const displayLessons = myLessons.length > 0 ? myLessons : getDemoLessons().slice(0, 2)
  const isDemo = myLessons.length === 0 && !loadingLessons && !isLoading

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-[var(--color-chalk)] mb-1">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)] font-bold">
            Wallet: {address.slice(0, 10)}...{address.slice(-6)}
          </p>
        </div>
        <Link
          to="/create"
          className="btn-chunky btn-chunky-primary px-5 py-2.5 text-sm"
        >
          + New Lesson
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="card-duo p-5">
          <p className="text-sm text-[var(--color-text-muted)] mb-1 font-bold">Published Lessons</p>
          <p className="text-3xl font-black text-[var(--color-chalk)]">{myLessons.length}</p>
        </div>
        <div className="card-duo p-5">
          <p className="text-sm text-[var(--color-text-muted)] mb-1 font-bold">Total Blobs</p>
          <p className="text-3xl font-black text-[var(--color-chalk)]">{blobs?.length ?? 0}</p>
        </div>
        <div className="card-duo p-5">
          <p className="text-sm text-[var(--color-text-muted)] mb-1 font-bold">Status</p>
          <p className="text-3xl font-black text-[var(--color-accent-green)]">
            {isLoading || loadingLessons ? '...' : 'Active'}
          </p>
        </div>
      </div>

      {/* My Lessons */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-black text-[var(--color-chalk)]">My Lessons</h2>
          {isDemo && (
            <span className="px-3 py-1 rounded-xl bg-[var(--color-mauve)] text-xs text-[var(--color-text-muted)] font-bold border-2 border-[var(--color-border)]">
              Demo data — publish a lesson to see real data
            </span>
          )}
        </div>

        {(isLoading || loadingLessons) ? (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)] font-semibold">Loading your lessons...</p>
          </div>
        ) : displayLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayLessons.map(lesson => (
              <LessonCard key={lesson.contentBlobName} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-2xl border-2 border-dashed border-[var(--color-border)]">
            <p className="text-[var(--color-text-muted)] mb-4 font-semibold">You haven't published any lessons yet.</p>
            <Link
              to="/create"
              className="btn-chunky btn-chunky-primary px-6 py-3 text-sm"
            >
              Create Your First Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
