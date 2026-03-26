import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { LessonViewer } from '../components/LessonViewer'
import { useWalletState } from '../components/WalletConnect'
import { getDemoLesson } from '../lib/demo-lessons'
import { downloadBlobAsText } from '../lib/blob-helpers'
import { getCategoryById } from '../lib/categories'
import { buildPaymentTransaction, isLessonPaid, markLessonPaid } from '../lib/payment'
import { formatAPT, shortAddress, getShelbyClient, makeMetaBlobName } from '../config'
import { useState, useEffect } from 'react'
import type { Lesson, LessonMetadata } from '../types'

export function ViewLesson() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const account = searchParams.get('account')

  const { connected, connect } = useWalletState()
  const wallet = useWallet()

  const [unlocked, setUnlocked] = useState(() => slug ? isLessonPaid(slug) : false)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(false)
  const [paying, setPaying] = useState(false)
  const [payError, setPayError] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    if (account) {
      setLoading(true)
      const client = getShelbyClient()
      const shortAddr = account.slice(0, 10)
      const metaBlobName = makeMetaBlobName(shortAddr, slug)
      downloadBlobAsText(client, account, metaBlobName)
        .then(async (metaText) => {
          const meta = JSON.parse(metaText) as LessonMetadata
          const content = await downloadBlobAsText(client, account, meta.contentBlobName)
          setLesson({ ...meta, metaBlobName, content })
        })
        .catch(() => {
          const demo = getDemoLesson(slug)
          if (demo) setLesson(demo)
          else setError('Lesson not found')
        })
        .finally(() => setLoading(false))
    } else {
      const demo = getDemoLesson(slug)
      if (demo) setLesson(demo)
      else setError('not_found')
    }
  }, [slug, account])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-[var(--color-text-muted)] font-semibold text-sm">Loading from Shelby...</p>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-3">📚</div>
        <h2 className="text-lg font-black text-[var(--color-chalk)] mb-2">Lesson not found</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6 font-semibold">
          {error || "This lesson may have expired."}
        </p>
        <Link to="/explore" className="btn btn-primary btn-md">Explore Lessons</Link>
      </div>
    )
  }

  const category = getCategoryById(lesson.category)
  const isPaid = lesson.price > 0
  const showContent = !isPaid || unlocked
  const date = new Date(lesson.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-5 font-bold">
        <Link to="/explore" className="hover:text-[var(--color-chalk)] no-underline text-[var(--color-text-muted)]">Explore</Link>
        <span>/</span>
        <Link to={`/explore?category=${lesson.category}`} className="hover:text-[var(--color-chalk)] no-underline text-[var(--color-text-muted)]">{category.label}</Link>
        <span>/</span>
        <span className="text-[var(--color-chalk)]">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold"
            style={{ backgroundColor: category.color + '20', color: category.color }}>
            {category.icon} {category.label}
          </span>
          <span className={`text-xs font-black ${lesson.price === 0 ? 'text-[var(--color-green)]' : 'text-[var(--color-petal)]'}`}>
            {formatAPT(lesson.price)}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-[var(--color-chalk)] mb-2">{lesson.title}</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-3 font-semibold">{lesson.description}</p>
        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] font-bold">
          <Link to={`/profile/${lesson.author}`} className="hover:text-[var(--color-petal)] no-underline text-[var(--color-text-muted)]">
            By {shortAddress(lesson.author)}
          </Link>
          <span>{date}</span>
        </div>
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {lesson.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-[var(--color-smoke-light)] text-[10px] text-[var(--color-text-muted)] font-bold border border-[var(--color-border)]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content or Paywall */}
      {showContent ? (
        <div className="card p-6 md:p-8">
          <LessonViewer content={lesson.content || ''} />
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="max-w-sm mx-auto">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-lg font-black text-[var(--color-chalk)] mb-2">Premium Lesson</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-5 font-semibold">
              Pay {formatAPT(lesson.price)} to unlock. 100% goes to the educator.
            </p>
            {!connected ? (
              <button onClick={connect} className="btn btn-primary btn-lg">Connect Wallet to Pay</button>
            ) : (
              <button
                onClick={async () => {
                  if (!slug) return
                  setPaying(true); setPayError('')
                  try {
                    const tx = buildPaymentTransaction(lesson.author, lesson.price)
                    const result = await wallet.signAndSubmitTransaction(tx)
                    const hash = typeof result === 'object' && 'hash' in result ? result.hash : String(result)
                    markLessonPaid(slug, hash)
                    setUnlocked(true)
                  } catch (err) {
                    setPayError(err instanceof Error ? err.message : 'Payment failed.')
                  } finally { setPaying(false) }
                }}
                disabled={paying}
                className="btn btn-green btn-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {paying ? 'Processing...' : `Pay ${formatAPT(lesson.price)}`}
              </button>
            )}
            {payError && <p className="text-xs text-[var(--color-red)] mt-3 font-bold">{payError}</p>}
          </div>
        </div>
      )}

      {/* Verification */}
      <div className="mt-5 card p-4 flex items-center gap-3 !border-[var(--color-green)]/30">
        <div className="w-8 h-8 rounded-xl bg-[var(--color-green)]/15 flex items-center justify-center text-sm">✅</div>
        <div>
          <p className="text-xs font-black text-[var(--color-chalk)]">Stored on Shelby Protocol</p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-semibold">Content integrity verified by merkle proof on Aptos.</p>
        </div>
      </div>
    </div>
  )
}
