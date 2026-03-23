import type { LessonMetadata } from '../types'
import {
  makeMetaBlobName,
  makeContentBlobName,
  slugify,
  MICRO_PER_SECOND,
  DEFAULT_EXPIRATION_DAYS,
  META_PREFIX,
} from '../config'

interface UploadLessonParams {
  client: { upload: (params: Record<string, unknown>) => Promise<void>; download: (params: Record<string, unknown>) => Promise<{ readable: ReadableStream<Uint8Array>; contentLength?: number }> }
  signer: unknown
  title: string
  description: string
  category: LessonMetadata['category']
  tags: string[]
  content: string
  price: number
  authorAddress: string
  expirationDays?: number
}

export async function uploadLesson(params: UploadLessonParams) {
  const {
    client,
    signer,
    title,
    description,
    category,
    tags,
    content,
    price,
    authorAddress,
    expirationDays = DEFAULT_EXPIRATION_DAYS,
  } = params

  const slug = slugify(title)
  const shortAddr = authorAddress.slice(0, 10)
  const contentBlobName = makeContentBlobName(shortAddr, slug)
  const metaBlobName = makeMetaBlobName(shortAddr, slug)

  const expirationMicros = (Date.now() + expirationDays * 24 * 60 * 60 * 1000) * (MICRO_PER_SECOND / 1000)

  // Upload content blob first
  const contentEncoder = new TextEncoder()
  await client.upload({
    blobData: contentEncoder.encode(content),
    signer,
    blobName: contentBlobName,
    expirationMicros,
  })

  // Build metadata
  const metadata: LessonMetadata = {
    version: 1,
    title,
    description,
    author: authorAddress,
    category,
    tags,
    contentBlobName,
    price,
    createdAt: Date.now(),
    language: 'en',
  }

  // Upload metadata blob
  await client.upload({
    blobData: contentEncoder.encode(JSON.stringify(metadata)),
    signer,
    blobName: metaBlobName,
    expirationMicros,
  })

  return { metaBlobName, contentBlobName, slug, metadata }
}

export async function downloadBlobAsText(
  client: { download: (params: Record<string, unknown>) => Promise<{ readable: ReadableStream<Uint8Array> }> },
  account: string,
  blobName: string,
): Promise<string> {
  const blob = await client.download({ account, blobName })
  const reader = blob.readable.getReader()
  const chunks: Uint8Array[] = []

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(value)
  }

  const merged = new Uint8Array(chunks.reduce((acc, c) => acc + c.length, 0))
  let offset = 0
  for (const chunk of chunks) {
    merged.set(chunk, offset)
    offset += chunk.length
  }

  return new TextDecoder().decode(merged)
}

export async function fetchLessonMetadata(
  client: { download: (params: Record<string, unknown>) => Promise<{ readable: ReadableStream<Uint8Array> }> },
  account: string,
  metaBlobName: string,
): Promise<LessonMetadata> {
  const text = await downloadBlobAsText(client, account, metaBlobName)
  return JSON.parse(text) as LessonMetadata
}

export function isMetaBlob(blobName: string): boolean {
  return blobName.startsWith(META_PREFIX)
}
