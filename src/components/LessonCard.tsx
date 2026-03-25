import { Link } from 'react-router-dom'
import type { Lesson } from '../types'
import { getCategoryById } from '../lib/categories'
import { formatAPT, shortAddress } from '../config'

interface LessonCardProps {
  lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
  const category = getCategoryById(lesson.category)
  const slug = lesson.contentBlobName.split('/').pop() || ''

  const timeAgo = getTimeAgo(lesson.createdAt)

  return (
    <Link
      to={`/lesson/${slug}`}
      className="card-duo block overflow-hidden no-underline group"
    >
      {/* Category color bar */}
      <div className="h-1.5 rounded-t-none" style={{ backgroundColor: category.color }} />

      <div className="p-5">
        {/* Category + Price row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold"
            style={{
              backgroundColor: category.color + '20',
              color: category.color,
            }}
          >
            <span>{category.icon}</span>
            {category.label}
          </span>
          <span className={`text-sm font-black ${lesson.price === 0 ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-petal)]'}`}>
            {formatAPT(lesson.price)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-extrabold text-[var(--color-chalk)] mb-2 group-hover:text-[var(--color-petal-light)] transition-colors">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2 font-semibold">
          {lesson.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-bold">
          <span>{shortAddress(lesson.author)}</span>
          <span>{timeAgo}</span>
        </div>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {lesson.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-lg bg-[var(--color-smoke)] text-xs text-[var(--color-text-muted)] font-bold border border-[var(--color-border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}
