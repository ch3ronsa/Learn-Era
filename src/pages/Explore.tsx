import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { CategoryFilter } from '../components/CategoryFilter'
import { getDemoLessons } from '../lib/demo-lessons'
import type { Category } from '../types'

export function Explore() {
  const [searchParams] = useSearchParams()
  const initialCategory = (searchParams.get('category') as Category | null) || 'all'

  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')

  const allLessons = getDemoLessons()

  const filteredLessons = useMemo(() => {
    let result = allLessons

    if (selectedCategory !== 'all') {
      result = result.filter(l => l.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some(t => t.includes(q))
      )
    }

    return result
  }, [allLessons, selectedCategory, searchQuery])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-main)] mb-2">Explore Lessons</h1>
        <p className="text-[var(--color-text-muted)]">
          Discover micro-lessons from educators around the world
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search lessons by title, description, or tag..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {/* Results */}
      {filteredLessons.length > 0 ? (
        <>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.map(lesson => (
              <LessonCard key={lesson.contentBlobName} lesson={lesson} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">&#x1F50D;</div>
          <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">No lessons found</h3>
          <p className="text-[var(--color-text-muted)]">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  )
}
