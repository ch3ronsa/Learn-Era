import type { Category } from '../types'

export const CATEGORIES: { id: Category; label: string; icon: string; color: string }[] = [
  { id: 'code', label: 'Code', icon: '</>', color: '#818cf8' },
  { id: 'design', label: 'Design', icon: '\u25B3', color: '#f472b6' },
  { id: 'music', label: 'Music', icon: '\u266B', color: '#34d399' },
  { id: 'language', label: 'Language', icon: 'Aa', color: '#fbbf24' },
  { id: 'business', label: 'Business', icon: '\u2191', color: '#22d3ee' },
  { id: 'other', label: 'Other', icon: '\u2026', color: '#94a3b8' },
]

export function getCategoryById(id: Category) {
  return CATEGORIES.find(c => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1]
}
