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
        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
          selected === 'all'
            ? 'bg-[var(--color-petal)] text-white shadow-[0_3px_0_var(--color-petal-dark)]'
            : 'bg-[var(--color-smoke-light)] text-[var(--color-text-muted)] hover:text-[var(--color-chalk)] border-2 border-[var(--color-border)]'
        }`}
      >
        All
      </button>
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            selected === cat.id
              ? 'text-white shadow-[0_3px_0_rgba(0,0,0,0.3)]'
              : 'bg-[var(--color-smoke-light)] text-[var(--color-text-muted)] hover:text-[var(--color-chalk)] border-2 border-[var(--color-border)]'
          }`}
          style={selected === cat.id ? { backgroundColor: cat.color } : undefined}
        >
          <span className="mr-1">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}
