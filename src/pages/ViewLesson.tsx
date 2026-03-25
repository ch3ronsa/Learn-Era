import { useParams, Link, useSearchParams } from 'react-router-dom'
import { LessonViewer } from '../components/LessonViewer'
import { getDemoLesson } from '../lib/demo-lessons'
import { downloadBlobAsText } from '../lib/blob-helpers'
import { getCategoryById } from '../lib/categories'
import { formatAPT, shortAddress, getShelbyClient, makeMetaBlobName } from '../config'
import { useState, useEffect } from 'react'
import type { Lesson, LessonMetadata } from '../types'

export function ViewLesson() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const account = searchParams.get('account')

  const [unlocked, setUnlocked] = useState(false)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    // If account param provided, try to fetch from Shelby
    if (account) {
      setLoading(true)
      const client = getShelbyClient()
      const shortAddr = account.slice(0, 10)
      const metaBlobName = makeMetaBlobName(shortAddr, slug)

      downloadBlobAsText(client, account, metaBlobName)
        .then(async (metaText) => {
          const meta = JSON.parse(metaText) as LessonMetadata
          // Download content
          const content = await downloadBlobAsText(client, account, meta.contentBlobName)
          setLesson({ ...meta, metaBlobName, content })
        })
        .catch(() => {
          // Fallback to demo
          const demo = getDemoLesson(slug)
          if (demo) setLesson(demo)
          else setError('Lesson not found')
        })
        .finally(() => setLoading(false))
    } else {
      // Lookup in demo data
      const demo = getDemoLesson(slug)
      if (demo) setLesson(demo)
      else setError('not_found')
    }
  }, [slug, account])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)]">Loading lesson from Shelby Protocol...</p>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">&#x1F4DA;</div>
        <h2 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Lesson not found</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          {error || "This lesson may have expired or doesn't exist."}
        </p>
        <Link
          to="/explore"
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium no-underline"
        >
          Explore Lessons
        </Link>
      </div>
    )
  }

  const category = getCategoryById(lesson.category)
  const isPaid = lesson.price > 0
  const showContent = !isPaid || unlocked
  const date = new Date(lesson.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-6">
        <Link to="/explore" className="hover:text-[var(--color-text-main)] no-underline text-[var(--color-text-muted)]">
          Explore
        </Link>
        <span>/</span>
        <Link
          to={`/explore?category=${lesson.category}`}
          className="hover:text-[var(--color-text-main)] no-underline text-[var(--color-text-muted)]"
        >
          {category.label}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text-main)]">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: category.color + '15', color: category.color }}
          >
            <span>{category.icon}</span>
            {category.label}
          </span>
          <span className={`text-sm font-semibold ${lesson.price === 0 ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent)]'}`}>
            {formatAPT(lesson.price)}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-main)] mb-3">
          {lesson.title}
        </h1>

        <p className="text-lg text-[var(--color-text-muted)] mb-4">
          {lesson.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <Link
            to={`/profile/${lesson.author}`}
            className="hover:text-[var(--color-primary-light)] no-underline text-[var(--color-text-muted)]"
          >
            By {shortAddress(lesson.author)}
          </Link>
          <span>{date}</span>
        </div>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {lesson.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-[var(--color-surface-light)] text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content or Paywall */}
      {showContent ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)] p-6 md:p-8">
          <LessonViewer content={lesson.content || ''} />
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)] p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">&#x1F512;</div>
            <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">
              Premium Lesson
            </h3>
            <p className="text-[var(--color-text-muted)] mb-6">
              Pay {formatAPT(lesson.price)} to unlock this lesson. 100% goes directly to the educator.
            </p>
            <button
              onClick={() => setUnlocked(true)}
              className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold transition-colors cursor-pointer"
            >
              Pay {formatAPT(lesson.price)} to Unlock
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              Payment is processed on-chain via Aptos. Connect your wallet first.
            </p>
          </div>
        </div>
      )}

      {/* Verification badge */}
      <div className="mt-6 p-4 rounded-xl bg-[var(--color-surface-light)]/50 border border-[var(--color-border)] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-green)]/10 flex items-center justify-center text-[var(--color-accent-green)]">
          &#x2713;
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--color-text-main)]">Stored on Shelby Protocol</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            This lesson is stored as a verified blob on decentralized storage. Content integrity guaranteed by merkle proof.
          </p>
        </div>
      </div>
    </div>
  )
}
