import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useUploadBlobs } from '@shelby-protocol/react'
import { LessonViewer } from '../components/LessonViewer'
import { CATEGORIES } from '../lib/categories'
import type { Category, LessonMetadata } from '../types'
import { useWalletState } from '../components/WalletConnect'
import {
  getShelbyClient,
  slugify,
  makeMetaBlobName,
  makeContentBlobName,
  MICRO_PER_SECOND,
  DEFAULT_EXPIRATION_DAYS,
} from '../config'

export function CreateLesson() {
  const navigate = useNavigate()
  const { connected, connect, address } = useWalletState()
  const wallet = useWallet()

  const shelbyClient = getShelbyClient()
  const uploadBlobs = useUploadBlobs({
    client: shelbyClient,
  })

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('code')
  const [tags, setTags] = useState('')
  const [price, setPrice] = useState('0')
  const [content, setContent] = useState(STARTER_CONTENT)
  const [showPreview, setShowPreview] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Connect Wallet to Create</h2>
        <p className="text-[var(--color-text-muted)] mb-6 font-semibold">
          You need a connected wallet to publish lessons to Shelby Protocol.
        </p>
        <button
          onClick={connect}
          className="btn-chunky btn-chunky-primary px-8 py-4 text-base"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return
    if (!address) return

    setPublishing(true)
    setError('')

    try {
      const slug = slugify(title)
      const shortAddr = address.slice(0, 10)
      const contentBlobName = makeContentBlobName(shortAddr, slug)
      const metaBlobName = makeMetaBlobName(shortAddr, slug)

      const expirationMicros = (Date.now() + DEFAULT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000) * (MICRO_PER_SECOND / 1000)
      const encoder = new TextEncoder()

      const metadata: LessonMetadata = {
        version: 1,
        title: title.trim(),
        description: description.trim(),
        author: address,
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        contentBlobName,
        price: parseFloat(price) || 0,
        createdAt: Date.now(),
        language: 'en',
      }

      await uploadBlobs.mutateAsync({
        signer: wallet,
        blobs: [
          { blobName: contentBlobName, blobData: encoder.encode(content) },
          { blobName: metaBlobName, blobData: encoder.encode(JSON.stringify(metadata)) },
        ],
        expirationMicros,
      })

      navigate(`/lesson/${slug}`)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[var(--color-chalk)] mb-2">Create a Lesson</h1>
        <p className="text-[var(--color-text-muted)] font-semibold">
          Write your lesson in Markdown. It will be stored on Shelby Protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-[var(--color-chalk)] mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. React Hooks in 5 Minutes"
              className="input-duo"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[var(--color-chalk)] mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="A short summary of what students will learn"
              className="input-duo"
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--color-chalk)] mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                className="input-duo"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--color-chalk)] mb-1.5">Price (APT)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="0 = Free"
                className="input-duo"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-[var(--color-chalk)] mb-1.5">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="react, hooks, javascript (comma separated)"
              className="input-duo"
            />
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-bold text-[var(--color-chalk)]">Lesson Content (Markdown)</label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-xs font-bold text-[var(--color-petal)] hover:text-[var(--color-petal-light)] cursor-pointer"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {showPreview ? (
              <div className="min-h-[300px] rounded-2xl bg-[var(--color-smoke-light)] border-2 border-[var(--color-border)] p-4 overflow-auto">
                <LessonViewer content={content} />
              </div>
            ) : (
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={14}
                className="input-duo font-mono text-sm resize-y"
                placeholder="Write your lesson in Markdown..."
              />
            )}
          </div>

          {/* Publish */}
          <button
            onClick={handlePublish}
            disabled={!title.trim() || !content.trim() || publishing}
            className="w-full btn-chunky btn-chunky-primary px-6 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
          >
            {publishing ? 'Publishing to Shelby...' : 'Publish to Shelby 🚀'}
          </button>

          {error && (
            <p className="text-sm text-red-400 text-center font-bold">{error}</p>
          )}

          <p className="text-xs text-[var(--color-text-muted)] text-center font-semibold">
            Your lesson will be stored as a blob on Shelby Protocol for 90 days.
            Verified by merkle proof on Aptos blockchain.
          </p>
        </div>

        {/* Right: Live Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold text-[var(--color-text-muted)] mb-3">Live Preview</h3>
            <div className="card-duo p-6 max-h-[calc(100vh-8rem)] overflow-auto">
              {content.trim() ? (
                <LessonViewer content={content} />
              ) : (
                <p className="text-[var(--color-text-muted)] text-center py-8 font-semibold">
                  Start writing to see a preview...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const STARTER_CONTENT = `# Your Lesson Title

Write your lesson content here using **Markdown**.

## Section 1

Explain the concept clearly and concisely.

\`\`\`javascript
// Add code examples
const greeting = "Hello, learner!"
console.log(greeting)
\`\`\`

## Key Takeaways

- Point 1
- Point 2
- Point 3
`
