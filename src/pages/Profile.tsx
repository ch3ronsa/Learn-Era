import { useParams, Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { getDemoLessons } from '../lib/demo-lessons'
import { shortAddress } from '../config'

export function Profile() {
  const { address } = useParams<{ address: string }>()

  if (!address) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)] font-semibold text-sm">No profile address provided.</p>
      </div>
    )
  }

  const lessons = getDemoLessons().filter(l => l.author === address)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-petal)] to-[var(--color-mauve)] flex items-center justify-center text-white font-black text-lg border-b-4 border-[var(--color-mauve-dark)]">
          {address.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-black text-[var(--color-chalk)]">Educator Profile</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-mono font-bold">{shortAddress(address)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Lessons</p>
          <p className="text-2xl font-black text-[var(--color-chalk)]">{lessons.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Categories</p>
          <p className="text-2xl font-black text-[var(--color-chalk)]">{new Set(lessons.map(l => l.category)).size}</p>
        </div>
        <div className="card p-4">
          <p className="text-[11px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider mb-1">Free</p>
          <p className="text-2xl font-black text-[var(--color-green)]">{lessons.filter(l => l.price === 0).length}</p>
        </div>
      </div>

      <h2 className="text-lg font-black text-[var(--color-chalk)] mb-4">Published Lessons</h2>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 card border-dashed">
          <p className="text-[var(--color-text-muted)] font-semibold text-sm">No lessons found.</p>
          <Link to="/explore" className="text-[var(--color-petal)] text-sm no-underline mt-2 inline-block font-bold">
            Back to Explore
          </Link>
        </div>
      )}
    </div>
  )
}
