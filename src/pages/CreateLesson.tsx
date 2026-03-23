import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LessonViewer } from '../components/LessonViewer'
import { CATEGORIES } from '../lib/categories'
import type { Category } from '../types'
import { useWalletState } from '../components/WalletConnect'

export function CreateLesson() {
  const navigate = useNavigate()
  const { connected, connect } = useWalletState()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('code')
  const [tags, setTags] = useState('')
  const [price, setPrice] = useState('0')
  const [content, setContent] = useState(STARTER_CONTENT)
  const [showPreview, setShowPreview] = useState(false)
  const [publishing, setPublishing] = useState(false)

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">&#x1F4DD;</div>
        <h2 className="text-xl font-semibold text-[var(--color-text-main)] mb-2">Connect Wallet to Create</h2>
        <p className="text-[var(--color-text-muted)] mb-6">
          You need a connected wallet to publish lessons to Shelby Protocol.
        </p>
        <button
          onClick={connect}
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold transition-colors cursor-pointer"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return

    setPublishing(true)

    // Simulate upload delay (replace with real Shelby upload)
    await new Promise(r => setTimeout(r, 2000))

    setPublishing(false)

    // Navigate to the lesson (in real app, use the slug from upload result)
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60)
    navigate(`/lesson/${slug}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Create a Lesson</h1>
        <p className="text-[var(--color-text-muted)]">
          Write your lesson in Markdown. It will be stored on Shelby Protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. React Hooks in 5 Minutes"
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="A short summary of what students will learn"
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Category)}
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">Price (APT)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="0 = Free"
                className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1.5">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="react, hooks, javascript (comma separated)"
              className="w-full px-4 py-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {/* Content Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-[var(--color-text-main)]">Lesson Content (Markdown)</label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-xs text-[var(--color-primary-light)] hover:underline cursor-pointer"
              >
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>

            {showPreview ? (
              <div className="min-h-[300px] rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] p-4 overflow-auto">
                <LessonViewer content={content} />
              </div>
            ) : (
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={14}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors font-mono text-sm resize-y"
                placeholder="Write your lesson in Markdown..."
              />
            )}
          </div>

          {/* Publish */}
          <button
            onClick={handlePublish}
            disabled={!title.trim() || !content.trim() || publishing}
            className="w-full px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors cursor-pointer"
          >
            {publishing ? 'Publishing to Shelby...' : 'Publish to Shelby'}
          </button>

          <p className="text-xs text-[var(--color-text-muted)] text-center">
            Your lesson will be stored as a blob on Shelby Protocol for 90 days.
            Verified by merkle proof on Aptos blockchain.
          </p>
        </div>

        {/* Right: Live Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-3">Live Preview</h3>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)] p-6 max-h-[calc(100vh-8rem)] overflow-auto">
              {content.trim() ? (
                <LessonViewer content={content} />
              ) : (
                <p className="text-[var(--color-text-muted)] text-center py-8">
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
