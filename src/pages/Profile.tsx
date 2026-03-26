import { useParams, Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { getDemoLessons } from '../lib/demo-lessons'
import { shortAddress } from '../config'

export function Profile() {
  const { address } = useParams<{ address: string }>()
  if (!address) return <div className="max-w-6xl mx-auto px-6 py-20 text-center"><p className="text-[var(--color-text-muted)]">No profile address.</p></div>

  const lessons = getDemoLessons().filter(l => l.author === address)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-petal)] to-[var(--color-mauve)] flex items-center justify-center text-white font-extrabold text-lg">
          {address.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-[var(--color-chalk)]">Educator Profile</h1>
          <p className="text-xs text-[var(--color-text-muted)] font-mono">{shortAddress(address)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Lessons', value: lessons.length },
          { label: 'Categories', value: new Set(lessons.map(l => l.category)).size },
          { label: 'Free', value: lessons.filter(l => l.price === 0).length, color: 'var(--color-green)' },
        ].map(s => (
          <div key={s.label} className="edu-card p-5">
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-medium uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-extrabold" style={{ color: s.color || 'var(--color-chalk)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-extrabold text-[var(--color-chalk)] mb-5">Published Lessons</h2>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map(lesson => <LessonCard key={lesson.contentBlobName} lesson={lesson} />)}
        </div>
      ) : (
        <div className="text-center py-16 edu-card">
          <p className="text-[var(--color-text-muted)] mb-3">No lessons found.</p>
          <Link to="/explore" className="text-[var(--color-petal)] text-sm no-underline font-semibold hover:underline">Back to Courses</Link>
        </div>
      )}
    </div>
  )
}
