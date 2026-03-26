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
    if (metaBlobs.length === 0) { setMyLessons([]); return }
    setLoadingLessons(true)
    Promise.all(
      metaBlobs.map(async (blob) => {
        try {
          const text = await downloadBlobAsText(shelbyClient, address, blob.blobNameSuffix)
          return { ...JSON.parse(text), metaBlobName: blob.blobNameSuffix } as Lesson
        } catch { return null }
      })
    ).then(results => {
      setMyLessons(results.filter((r): r is Lesson => r !== null))
      setLoadingLessons(false)
    })
  }, [blobs, address])

  if (!connected) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-3">📊</div>
        <h2 className="text-lg font-black text-[var(--color-chalk)] mb-2">Connect to View Dashboard</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6 font-semibold">
          Connect your wallet to see your lessons and earnings.
        </p>
        <button onClick={connect} className="btn btn-primary btn-lg">Connect Wallet</button>
      </div>
    )
  }

  const displayLessons = myLessons.length > 0 ? myLessons : getDemoLessons().slice(0, 2)
  const isDemo = myLessons.length === 0 && !loadingLessons && !isLoading

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--color-chalk)] mb-0.5">Dashboard</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-bold font-mono">
            {address.slice(0, 10)}...{address.slice(-6)}
          </p>
        </div>
        <Link to="/create" className="btn btn-primary btn-md">+ New Lesson</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Published</p>
          <p className="text-2xl font-black text-[var(--color-chalk)]">{myLessons.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Blobs</p>
          <p className="text-2xl font-black text-[var(--color-chalk)]">{blobs?.length ?? 0}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Status</p>
          <p className="text-2xl font-black text-[var(--color-green)]">
            {isLoading || loadingLessons ? '...' : 'Active'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-black text-[var(--color-chalk)]">My Lessons</h2>
        {isDemo && (
          <span className="px-2 py-0.5 rounded-lg bg-[var(--color-mauve)] text-[10px] text-[var(--color-text-muted)] font-bold border border-[var(--color-border)]">
            Demo
          </span>
        )}
      </div>

      {(isLoading || loadingLessons) ? (
        <div className="text-center py-12">
          <p className="text-[var(--color-text-muted)] font-semibold text-sm">Loading...</p>
        </div>
      ) : displayLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLessons.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 card border-dashed">
          <p className="text-[var(--color-text-muted)] mb-3 font-semibold text-sm">No lessons yet.</p>
          <Link to="/create" className="btn btn-primary btn-md">Create Your First Lesson</Link>
        </div>
      )}
    </div>
  )
}
