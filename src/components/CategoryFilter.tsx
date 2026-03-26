import type { Category } from '../types'
import { CATEGORIES } from '../lib/categories'

interface CategoryFilterProps {
  selected: Category | 'all'
  onChange: (category: Category | 'all') => void
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border ${
          selected === 'all'
            ? 'bg-[var(--color-petal)] border-[var(--color-petal)] text-white'
            : 'bg-transparent border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-petal)] hover:text-[var(--color-chalk)]'
        }`}
      >
        All
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border ${
            selected === cat.id
              ? 'text-white border-transparent'
              : 'bg-transparent border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-petal)] hover:text-[var(--color-chalk)]'
          }`}
          style={selected === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : undefined}
        >
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
  )
}
