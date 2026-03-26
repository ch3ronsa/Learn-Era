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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[var(--color-chalk)] mb-1">Explore Lessons</h1>
        <p className="text-sm text-[var(--color-text-muted)] font-semibold">
          Discover micro-lessons from educators around the world
        </p>
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="input"
        />
      </div>

      <div className="mb-6">
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {filteredLessons.length > 0 ? (
        <>
          <p className="text-xs text-[var(--color-text-muted)] mb-4 font-bold">
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
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-base font-black text-[var(--color-chalk)] mb-1">No lessons found</h3>
          <p className="text-sm text-[var(--color-text-muted)] font-semibold">
            Try a different search or category.
          </p>
        </div>
      )}
    </div>
  )
}
