import { Link } from 'react-router-dom'
import { useWalletState } from '../components/WalletConnect'
import { LessonCard } from '../components/LessonCard'
import { getDemoLessons } from '../lib/demo-lessons'

export function Dashboard() {
  const { connected, address, connect } = useWalletState()

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">&#x1F4CA;</div>
        <h2 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Connect to View Dashboard</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          Connect your wallet to see your published lessons and earnings.
        </p>
        <button
          onClick={connect}
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold transition-colors cursor-pointer"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  // Demo: show first 2 lessons as "my lessons"
  const myLessons = getDemoLessons().slice(0, 2)
  const totalEarnings = 1.25
  const totalReads = 47

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-1">Dashboard</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Wallet: {address.slice(0, 10)}...{address.slice(-6)}
          </p>
        </div>
        <Link
          to="/create"
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium no-underline transition-colors"
        >
          + New Lesson
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Published Lessons</p>
          <p className="text-3xl font-bold text-[var(--color-text-main)]">{myLessons.length}</p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Total Reads</p>
          <p className="text-3xl font-bold text-[var(--color-text-main)]">{totalReads}</p>
        </div>
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-[var(--color-accent-green)]">{totalEarnings} APT</p>
        </div>
      </div>

      {/* My Lessons */}
      <div>
        <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">My Lessons</h2>
        {myLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myLessons.map(lesson => (
              <LessonCard key={lesson.contentBlobName} lesson={lesson} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-xl border border-dashed border-[var(--color-border)]">
            <p className="text-[var(--color-text-muted)] mb-4">You haven't published any lessons yet.</p>
            <Link
              to="/create"
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium no-underline"
            >
              Create Your First Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
