export type Category = 'code' | 'design' | 'music' | 'language' | 'business' | 'other'

export interface LessonMetadata {
  version: number
  title: string
  description: string
  author: string
  category: Category
  tags: string[]
  contentBlobName: string
  price: number
  createdAt: number
  language: string
}

export interface Lesson extends LessonMetadata {
  metaBlobName: string
  content?: string
}

export interface ShelbyBlobInfo {
  blob_name: string
  size: number
  expiration_timestamp_usecs: string
}
