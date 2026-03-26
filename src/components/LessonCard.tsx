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
    <Link to={`/lesson/${slug}`} className="edu-card block no-underline group">
      {/* Colored header area (like course thumbnail) */}
      <div
        className="h-32 relative flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${category.color}30, ${category.color}10)` }}
      >
        <span className="text-5xl opacity-60">{category.icon}</span>
        {/* Price badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
          lesson.price === 0
            ? 'bg-[var(--color-green)] text-white'
            : 'bg-[var(--color-petal)] text-white'
        }`}>
          {formatAPT(lesson.price)}
        </span>
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
          style={{ backgroundColor: category.color }}
        >
          {category.label}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-[15px] font-bold text-[var(--color-chalk)] mb-2 group-hover:text-[var(--color-petal)] transition-colors leading-snug">
          {lesson.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-4 line-clamp-2 leading-relaxed">
          {lesson.description}
        </p>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] pt-3 flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
          <span className="font-medium">{shortAddress(lesson.author)}</span>
          <span>{timeAgo}</span>
        </div>
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
