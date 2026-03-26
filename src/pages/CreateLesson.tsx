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
  const uploadBlobs = useUploadBlobs({ client: shelbyClient })

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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-3">📝</div>
        <h2 className="text-lg font-black text-[var(--color-chalk)] mb-2">Connect Wallet to Create</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6 font-semibold">
          You need a connected wallet to publish lessons.
        </p>
        <button onClick={connect} className="btn btn-primary btn-lg">Connect Wallet</button>
      </div>
    )
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim() || !address) return
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
        version: 1, title: title.trim(), description: description.trim(),
        author: address, category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        contentBlobName, price: parseFloat(price) || 0,
        createdAt: Date.now(), language: 'en',
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
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[var(--color-chalk)] mb-1">Create a Lesson</h1>
        <p className="text-sm text-[var(--color-text-muted)] font-semibold">
          Write in Markdown. Stored on Shelby Protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--color-chalk)] mb-1.5">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. React Hooks in 5 Minutes" className="input" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-chalk)] mb-1.5">Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
              placeholder="What will students learn?" className="input" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--color-chalk)] mb-1.5">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as Category)} className="input">
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-chalk)] mb-1.5">Price (APT)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                min="0" step="0.01" placeholder="0 = Free" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--color-chalk)] mb-1.5">Tags</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)}
              placeholder="react, hooks, javascript" className="input" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[var(--color-chalk)]">Content (Markdown)</label>
              <button onClick={() => setShowPreview(!showPreview)}
                className="text-xs font-bold text-[var(--color-petal)] cursor-pointer">
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
            {showPreview ? (
              <div className="card min-h-[280px] p-4 overflow-auto">
                <LessonViewer content={content} />
              </div>
            ) : (
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={12}
                className="input font-mono text-sm resize-y" placeholder="Write your lesson..." />
            )}
          </div>
          <button onClick={handlePublish}
            disabled={!title.trim() || !content.trim() || publishing}
            className="btn btn-green btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {publishing ? 'Publishing...' : 'Publish to Shelby'}
          </button>
          {error && <p className="text-xs text-[var(--color-red)] text-center font-bold">{error}</p>}
          <p className="text-[11px] text-[var(--color-text-muted)] text-center font-semibold">
            Stored on Shelby Protocol for 90 days. Verified by merkle proof on Aptos.
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="text-xs font-bold text-[var(--color-text-muted)] mb-2">Live Preview</h3>
            <div className="card p-5 max-h-[calc(100vh-7rem)] overflow-auto">
              {content.trim() ? <LessonViewer content={content} /> : (
                <p className="text-[var(--color-text-muted)] text-center py-8 text-sm font-semibold">
                  Start writing to see preview...
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
