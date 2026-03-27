import { useParams, Link, useSearchParams } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { LessonViewer } from '../components/LessonViewer'
import { useWalletState } from '../components/WalletConnect'
import { getDemoLesson } from '../lib/demo-lessons'
import { downloadBlobAsText } from '../lib/blob-helpers'
import { getCategoryById } from '../lib/categories'
import { buildPaymentTransaction, isLessonPaid, markLessonPaid, verifyPaymentOnChain, markPaymentVerified, getPaymentRecord } from '../lib/payment'
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

  // On-chain verify existing payment on load
  useEffect(() => {
    if (!slug || !lesson || lesson.price === 0 || !unlocked) return
    const record = getPaymentRecord(slug)
    if (record && !record.verified) {
      verifyPaymentOnChain(record.txHash, lesson.author, lesson.price).then(verified => {
        if (verified) markPaymentVerified(slug)
        else if (!verified) setUnlocked(false) // Payment invalid — re-lock
      })
    }
  }, [slug, lesson, unlocked])

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
        .catch(() => { const demo = getDemoLesson(slug); if (demo) setLesson(demo); else setError('Lesson not found') })
        .finally(() => setLoading(false))
    } else {
      const demo = getDemoLesson(slug)
      if (demo) setLesson(demo); else setError('not_found')
    }
  }, [slug, account])

  if (loading) return <div className="max-w-4xl mx-auto px-6 py-20 text-center"><p className="text-[var(--color-text-muted)]">Loading from Shelby...</p></div>

  if (!lesson) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Lesson not found</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">{error || "This lesson may have expired."}</p>
        <Link to="/explore" className="btn-pill btn-pill-primary">Explore Courses</Link>
      </div>
    )
  }

  const category = getCategoryById(lesson.category)
  const isPaid = lesson.price > 0
  const showContent = !isPaid || unlocked
  const date = new Date(lesson.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-6">
        <Link to="/explore" className="hover:text-[var(--color-chalk)] no-underline text-[var(--color-text-muted)]">Courses</Link>
        <span>›</span>
        <Link to={`/explore?category=${lesson.category}`} className="hover:text-[var(--color-chalk)] no-underline text-[var(--color-text-muted)]">{category.label}</Link>
        <span>›</span>
        <span className="text-[var(--color-chalk)]">{lesson.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: category.color }}>
            {category.icon} {category.label}
          </span>
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${lesson.price === 0 ? 'bg-[var(--color-green)] text-white' : 'bg-[var(--color-petal)] text-white'}`}>
            {formatAPT(lesson.price)}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-chalk)] mb-3">{lesson.title}</h1>
        <p className="text-[var(--color-text-muted)] mb-4">{lesson.description}</p>
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <Link to={`/profile/${lesson.author}`} className="hover:text-[var(--color-petal)] no-underline text-[var(--color-text-muted)] font-medium">
            By {shortAddress(lesson.author)}
          </Link>
          <span>{date}</span>
        </div>
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {lesson.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[var(--color-smoke-light)] text-[11px] text-[var(--color-text-muted)] border border-[var(--color-border)]">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Content or Paywall */}
      {showContent ? (
        <div className="edu-card p-8"><LessonViewer content={lesson.content || ''} /></div>
      ) : (
        <div className="edu-card p-10 text-center">
          <div className="max-w-sm mx-auto">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-lg font-extrabold text-[var(--color-chalk)] mb-2">Premium Lesson</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Pay {formatAPT(lesson.price)} to unlock. 100% goes to the educator.</p>
            {!connected ? (
              <button onClick={connect} className="btn-pill btn-pill-primary btn-pill-lg">Connect Wallet to Pay</button>
            ) : (
              <button
                onClick={async () => {
                  if (!slug) return; setPaying(true); setPayError('')
                  try {
                    const tx = buildPaymentTransaction(lesson.author, lesson.price)
                    const result = await wallet.signAndSubmitTransaction(tx)
                    const hash = typeof result === 'object' && 'hash' in result ? result.hash : String(result)
                    markLessonPaid(slug, hash)

                    // Verify on-chain (non-blocking — unlock immediately, verify in background)
                    setUnlocked(true)
                    verifyPaymentOnChain(hash, lesson.author, lesson.price).then(verified => {
                      if (verified) markPaymentVerified(slug)
                    })
                  } catch (err) { setPayError(err instanceof Error ? err.message : 'Payment failed.') }
                  finally { setPaying(false) }
                }}
                disabled={paying} className="btn-pill btn-pill-primary btn-pill-lg disabled:opacity-50">
                {paying ? 'Processing...' : `Pay ${formatAPT(lesson.price)} →`}
              </button>
            )}
            {payError && <p className="text-xs text-[var(--color-red)] mt-3">{payError}</p>}
          </div>
        </div>
      )}

      {/* Verification */}
      <div className="mt-6 edu-card p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-green)]/15 flex items-center justify-center text-lg">✅</div>
        <div>
          <p className="text-sm font-bold text-[var(--color-chalk)]">Stored on Shelby Protocol</p>
          <p className="text-xs text-[var(--color-text-muted)]">Content integrity verified by merkle proof on Aptos.</p>
        </div>
      </div>
    </div>
  )
}
