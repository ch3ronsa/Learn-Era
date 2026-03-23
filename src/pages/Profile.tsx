import { useParams, Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { getDemoLessons } from '../lib/demo-lessons'
import { shortAddress } from '../config'

export function Profile() {
  const { address } = useParams<{ address: string }>()

  if (!address) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">No profile address provided.</p>
      </div>
    )
  }

  // Demo: find lessons by this author
  const lessons = getDemoLessons().filter(l => l.author === address)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl">
          {address.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-main)]">Educator Profile</h1>
          <p className="text-sm text-[var(--color-text-muted)] font-mono">{shortAddress(address)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)]">Lessons</p>
          <p className="text-2xl font-bold text-[var(--color-text-main)]">{lessons.length}</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)]">Categories</p>
          <p className="text-2xl font-bold text-[var(--color-text-main)]">
            {new Set(lessons.map(l => l.category)).size}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)]">
          <p className="text-sm text-[var(--color-text-muted)]">Free Lessons</p>
          <p className="text-2xl font-bold text-[var(--color-accent-green)]">
            {lessons.filter(l => l.price === 0).length}
          </p>
        </div>
      </div>

      {/* Lessons */}
      <h2 className="text-xl font-bold text-[var(--color-text-main)] mb-4">Published Lessons</h2>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-xl border border-dashed border-[var(--color-border)]">
          <p className="text-[var(--color-text-muted)]">No lessons found for this educator.</p>
          <Link
            to="/explore"
            className="text-[var(--color-primary-light)] hover:underline text-sm no-underline mt-2 inline-block"
          >
            Back to Explore
          </Link>
        </div>
      )}
    </div>
  )
}
