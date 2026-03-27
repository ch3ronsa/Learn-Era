import { Link } from 'react-router-dom'
import { useAccountBlobs } from '@shelby-protocol/react'
import { useWalletState } from '../components/WalletConnect'
import { useProfile } from '../contexts/ProfileContext'
import { LessonCard } from '../components/LessonCard'
import { getShelbyClient } from '../config'
import { getDemoLessons } from '../lib/demo-lessons'
import { isMetaBlob, downloadBlobAsText } from '../lib/blob-helpers'
import type { Lesson } from '../types'
import { useState, useEffect } from 'react'

export function Dashboard() {
  const { connected, address, connect } = useWalletState()
  const { profile } = useProfile()
  const shelbyClient = getShelbyClient()
  const { data: blobs, isLoading } = useAccountBlobs({
    client: shelbyClient, account: address || '0x0',
    pagination: { limit: 50, offset: 0 }, enabled: connected && !!address,
  })
  const [myLessons, setMyLessons] = useState<Lesson[]>([])
  const [loadingLessons, setLoadingLessons] = useState(false)

  useEffect(() => {
    if (!blobs || !address) return
    const metaBlobs = blobs.filter(b => isMetaBlob(b.blobNameSuffix))
    if (metaBlobs.length === 0) { setMyLessons([]); return }
    setLoadingLessons(true)
    Promise.all(metaBlobs.map(async (blob) => {
      try {
        const text = await downloadBlobAsText(shelbyClient, address, blob.blobNameSuffix)
        return { ...JSON.parse(text), metaBlobName: blob.blobNameSuffix } as Lesson
      } catch { return null }
    })).then(results => { setMyLessons(results.filter((r): r is Lesson => r !== null)); setLoadingLessons(false) })
  }, [blobs, address])

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Connect to View Dashboard</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Connect your wallet to see your lessons.</p>
        <button onClick={connect} className="btn-pill btn-pill-primary btn-pill-lg">Connect Wallet</button>
      </div>
    )
  }

  if (profile?.role !== 'educator') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Become an Educator</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Complete your profile to access the educator dashboard and start publishing lessons.</p>
        <Link to="/profile/edit" className="btn-pill btn-pill-primary btn-pill-lg">Set Up Profile</Link>
      </div>
    )
  }

  const displayLessons = myLessons.length > 0 ? myLessons : getDemoLessons().slice(0, 2)
  const isDemo = myLessons.length === 0 && !loadingLessons && !isLoading

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {isDemo && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-secondary/5 border border-secondary/20 text-xs text-[var(--color-text-muted)]">
          <strong className="text-secondary">Shelby Testnet:</strong> Showing demo lessons. Publish your first lesson to see real data here.
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-1">Dashboard</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-mono">{address.slice(0, 10)}...{address.slice(-6)}</p>
        </div>
        <Link to="/create" className="btn-pill btn-pill-primary btn-pill-sm">+ New Lesson</Link>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Published', value: myLessons.length, color: 'var(--color-chalk)' },
          { label: 'Total Blobs', value: blobs?.length ?? 0, color: 'var(--color-chalk)' },
          { label: 'Status', value: isLoading || loadingLessons ? '...' : 'Active', color: 'var(--color-green)' },
        ].map(s => (
          <div key={s.label} className="edu-card p-5">
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-medium uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-lg font-extrabold text-[var(--color-chalk)]">My Lessons</h2>
        {isDemo && <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-smoke-lighter)] text-[10px] text-[var(--color-text-muted)] font-medium">Demo</span>}
      </div>

      {(isLoading || loadingLessons) ? (
        <p className="text-center py-12 text-[var(--color-text-muted)] text-sm">Loading...</p>
      ) : displayLessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayLessons.map(lesson => <LessonCard key={lesson.contentBlobName} lesson={lesson} />)}
        </div>
      ) : (
        <div className="text-center py-16 edu-card">
          <p className="text-[var(--color-text-muted)] mb-4">No lessons yet.</p>
          <Link to="/create" className="btn-pill btn-pill-primary">Create Your First Lesson</Link>
        </div>
      )}
    </div>
  )
}
