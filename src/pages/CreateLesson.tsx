import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useUploadBlobs } from '@shelby-protocol/react'
import { LessonViewer } from '../components/LessonViewer'
import { VideoPlayer, isValidVideoUrl } from '../components/VideoPlayer'
import { CATEGORIES } from '../lib/categories'
import type { Category, ContentType, LessonMetadata } from '../types'
import { useWalletState } from '../components/WalletConnect'
import { useProfile } from '../contexts/ProfileContext'
import { getShelbyClient, slugify, makeMetaBlobName, makeContentBlobName, BLOB_PREFIX, MICRO_PER_SECOND, DEFAULT_EXPIRATION_DAYS } from '../config'

export function CreateLesson() {
  const navigate = useNavigate()
  const { connected, connect, address } = useWalletState()
  const { profile } = useProfile()
  const wallet = useWallet()
  const shelbyClient = getShelbyClient()
  const uploadBlobs = useUploadBlobs({ client: shelbyClient })

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('code')
  const [tags, setTags] = useState('')
  const [price, setPrice] = useState('0')
  const [content, setContent] = useState(STARTER_CONTENT)
  const [contentType, setContentType] = useState<ContentType>('article')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [error, setError] = useState('')

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">📝</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Connect Wallet to Create</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">You need a connected wallet to publish lessons.</p>
        <button onClick={connect} className="btn-pill btn-pill-primary btn-pill-lg">Connect Wallet</button>
      </div>
    )
  }

  if (profile?.role !== 'educator') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Become an Educator First</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Complete your profile to start creating and publishing lessons.</p>
        <Link to="/profile/edit" className="btn-pill btn-pill-primary btn-pill-lg">Set Up Educator Profile</Link>
      </div>
    )
  }

  const handlePublish = async () => {
    if (!title.trim() || !address) return
    if (contentType === 'article' && !content.trim()) return
    if (contentType === 'video' && !videoUrl.trim() && !videoFile) return

    setPublishing(true); setError(''); setUploadProgress('')
    try {
      const slug = slugify(title)
      const shortAddr = address.slice(0, 10)
      const contentBlobName = makeContentBlobName(shortAddr, slug)
      const metaBlobName = makeMetaBlobName(shortAddr, slug)
      const expirationMicros = (Date.now() + DEFAULT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000) * (MICRO_PER_SECOND / 1000)
      const encoder = new TextEncoder()

      const blobs: { blobName: string; blobData: Uint8Array }[] = []

      // Content blob (markdown) — always include if there's text content
      if (content.trim()) {
        blobs.push({ blobName: contentBlobName, blobData: encoder.encode(content) })
      }

      // Video file blob — upload to Shelby
      let videoBlobName: string | undefined
      if (videoFile) {
        setUploadProgress('Uploading video...')
        videoBlobName = `${BLOB_PREFIX}/video/${shortAddr}/${slug}`
        const arrayBuffer = await videoFile.arrayBuffer()
        blobs.push({ blobName: videoBlobName, blobData: new Uint8Array(arrayBuffer) })
      }

      const metadata: LessonMetadata = {
        version: 1, title: title.trim(), description: description.trim(),
        author: address, category, tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        contentBlobName, price: parseFloat(price) || 0, createdAt: Date.now(), language: 'en',
        contentType,
        videoUrl: videoUrl.trim() || undefined,
        videoBlobName,
      }

      setUploadProgress('Uploading to Shelby...')
      blobs.push({ blobName: metaBlobName, blobData: encoder.encode(JSON.stringify(metadata)) })

      await uploadBlobs.mutateAsync({
        signer: wallet,
        blobs,
        expirationMicros,
      })
      navigate(`/lesson/${slug}`)
    } catch (err) {
      console.error('Upload failed:', err)
      setError(err instanceof Error ? err.message : 'Upload failed.')
    } finally { setPublishing(false); setUploadProgress('') }
  }

  const canPublish = title.trim() && (
    (contentType === 'article' && content.trim()) ||
    (contentType === 'video' && (videoUrl.trim() || videoFile)) ||
    (contentType === 'mixed' && content.trim() && (videoUrl.trim() || videoFile))
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-1">Create a Lesson</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Write articles, embed videos, or upload directly. Stored on Shelby Protocol.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. React Hooks in 5 Minutes" className="edu-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="What will students learn?" className="edu-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as Category)} className="edu-input">
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Price (APT)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" step="0.01" placeholder="0 = Free" className="edu-input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Tags</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="react, hooks, javascript" className="edu-input" />
          </div>

          {/* Content Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-2">Content Type</label>
            <div className="flex gap-2">
              {([
                { value: 'article', label: 'Article', icon: '📝' },
                { value: 'video', label: 'Video', icon: '🎬' },
                { value: 'mixed', label: 'Article + Video', icon: '📝🎬' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setContentType(opt.value)}
                  className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    contentType === opt.value
                      ? 'bg-primary text-on-primary border-primary'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary'
                  }`}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Video Input */}
          {(contentType === 'video' || contentType === 'mixed') && (
            <div className="space-y-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-container-lowest)]">
              <label className="block text-xs font-semibold text-[var(--color-chalk)]">Video Source</label>

              <div>
                <label className="block text-[11px] text-[var(--color-text-muted)] mb-1">YouTube / Vimeo URL</label>
                <input
                  type="url" value={videoUrl}
                  onChange={e => { setVideoUrl(e.target.value); if (e.target.value) setVideoFile(null) }}
                  placeholder="https://youtube.com/watch?v=..."
                  className="edu-input"
                />
                {videoUrl && !isValidVideoUrl(videoUrl) && (
                  <p className="text-[10px] text-[var(--color-red)] mt-1">Only YouTube and Vimeo URLs are supported</p>
                )}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
                <div className="flex-1 h-px bg-[var(--color-border)]" />
                <span>or</span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>

              <div>
                <label className="block text-[11px] text-[var(--color-text-muted)] mb-1">Upload Video (Shelby Storage)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => { const f = e.target.files?.[0]; if (f) { setVideoFile(f); setVideoUrl('') } }}
                  className="block w-full text-xs text-[var(--color-text-muted)] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer"
                />
                {videoFile && (
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                    {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Markdown Content */}
          {(contentType === 'article' || contentType === 'mixed') && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[var(--color-chalk)]">Content (Markdown)</label>
                <button onClick={() => setShowPreview(!showPreview)} className="text-xs font-semibold text-[var(--color-petal)] cursor-pointer hover:underline">
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
              </div>
              {showPreview ? (
                <div className="edu-card min-h-[280px] p-5 overflow-auto"><LessonViewer content={content} /></div>
              ) : (
                <textarea value={content} onChange={e => setContent(e.target.value)} rows={12} className="edu-input font-mono text-sm resize-y" placeholder="Write your lesson..." />
              )}
            </div>
          )}

          <button onClick={handlePublish} disabled={!canPublish || publishing}
            className="btn-pill btn-pill-primary btn-pill-lg w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {publishing ? (uploadProgress || 'Publishing...') : 'Publish to Shelby →'}
          </button>
          {error && <p className="text-xs text-[var(--color-red)] text-center font-semibold">{error}</p>}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-20">
            <h3 className="text-xs font-semibold text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">Live Preview</h3>
            <div className="edu-card p-6 max-h-[calc(100vh-7rem)] overflow-auto space-y-4">
              {/* Video Preview */}
              {(contentType === 'video' || contentType === 'mixed') && videoUrl && isValidVideoUrl(videoUrl) && (
                <VideoPlayer videoUrl={videoUrl} title={title} />
              )}
              {(contentType === 'video' || contentType === 'mixed') && videoFile && (
                <VideoPlayer videoBlobUrl={URL.createObjectURL(videoFile)} title={title} />
              )}
              {/* Text Preview */}
              {(contentType === 'article' || contentType === 'mixed') && content.trim() ? (
                <LessonViewer content={content} />
              ) : contentType === 'article' ? (
                <p className="text-[var(--color-text-muted)] text-center py-10 text-sm">Start writing to see preview...</p>
              ) : null}
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
