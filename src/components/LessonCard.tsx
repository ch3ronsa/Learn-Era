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
      className="card block overflow-hidden no-underline group"
    >
      {/* Color accent top */}
      <div className="h-1.5" style={{ backgroundColor: category.color }} />

      <div className="p-4">
        {/* Category + Price */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold"
            style={{ backgroundColor: category.color + '20', color: category.color }}
          >
            {category.icon} {category.label}
          </span>
          <span className={`text-xs font-black ${lesson.price === 0 ? 'text-[var(--color-green)]' : 'text-[var(--color-petal)]'}`}>
            {formatAPT(lesson.price)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-extrabold text-[var(--color-chalk)] mb-1.5 group-hover:text-[var(--color-petal-light)] transition-colors leading-snug">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--color-text-muted)] mb-3 line-clamp-2 leading-relaxed">
          {lesson.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-bold">
          <span>{shortAddress(lesson.author)}</span>
          <span>{timeAgo}</span>
        </div>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {lesson.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[var(--color-smoke)] text-[10px] text-[var(--color-text-muted)] font-bold"
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
