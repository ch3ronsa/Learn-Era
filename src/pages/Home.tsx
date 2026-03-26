import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { CATEGORIES } from '../lib/categories'
import { getDemoLessons } from '../lib/demo-lessons'

export function Home() {
  const lessons = getDemoLessons()
  const featured = lessons.slice(0, 6)

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="section-mauve">
        <div className="max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm font-bold text-[var(--color-petal-light)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse" />
            Powered by Shelby Protocol
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[var(--color-chalk)] mb-4 leading-[1.1] tracking-tight">
            Learn anything.
          </h1>
          <h1 className="text-5xl md:text-7xl font-black text-[var(--color-petal)] mb-8 leading-[1.1] tracking-tight">
            Pay per lesson.
          </h1>

          <p className="text-base md:text-lg text-[var(--color-chalk)]/50 mb-10 max-w-lg mx-auto font-bold leading-relaxed">
            Micro-lessons on decentralized storage. Educators earn 100%.
            No middleman. No fees. Just knowledge.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/explore" className="btn btn-green btn-lg">
              Start Learning
            </Link>
            <Link to="/create" className="btn btn-secondary btn-lg">
              Start Teaching
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="border-y-2 border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: '100%', label: 'Creator Revenue', color: 'var(--color-green)' },
            { value: '$0', label: 'Platform Fee', color: 'var(--color-petal)' },
            { value: '<1s', label: 'Data Access', color: 'var(--color-yellow)' },
            { value: '∞', label: 'No Censorship', color: 'var(--color-blue)' },
          ].map(stat => (
            <div key={stat.label} className="text-center py-3">
              <div className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-black text-[var(--color-chalk)] mb-6">Browse by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="card flex flex-col items-center gap-2 py-5 px-3 no-underline group text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-chalk)] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured ─── */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-[var(--color-chalk)]">Featured Lessons</h2>
          <Link to="/explore" className="text-sm font-bold text-[var(--color-petal)] hover:text-[var(--color-petal-light)] no-underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="section-mauve border-t-2 border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <h2 className="text-xl font-black text-[var(--color-chalk)] mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '1', emoji: '✍️', title: 'Create', desc: 'Write your lesson in Markdown. Set a price or make it free.' },
              { num: '2', emoji: '🚀', title: 'Publish', desc: 'Stored as a blob on Shelby Protocol. Decentralized & verifiable.' },
              { num: '3', emoji: '💰', title: 'Earn', desc: 'Students pay with APT. You get 100%. No middleman.' },
            ].map(item => (
              <div key={item.num} className="card p-6 text-center !bg-[var(--color-mauve-light)] !border-[var(--color-mauve-dark)]">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="w-8 h-8 rounded-full bg-[var(--color-petal)] text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                  {item.num}
                </div>
                <h3 className="text-base font-black text-[var(--color-chalk)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-chalk)]/50 font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
