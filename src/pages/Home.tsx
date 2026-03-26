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
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[var(--color-petal-light)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse" />
            Powered by Shelby Protocol
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-chalk)] mb-3 leading-tight">
            Learn anything.{' '}
            <span className="text-[var(--color-petal)]">Pay per lesson.</span>
          </h1>

          <p className="text-base text-[var(--color-chalk)]/50 mb-8 max-w-lg mx-auto font-semibold leading-relaxed">
            Micro-lessons on decentralized storage. Educators earn 100%. No middleman. No fees.
          </p>

          <div className="flex items-center justify-center gap-3">
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
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-4 gap-2">
          {[
            { value: '100%', label: 'Revenue', color: 'var(--color-green)' },
            { value: '$0', label: 'Fees', color: 'var(--color-petal)' },
            { value: '<1s', label: 'Access', color: 'var(--color-yellow)' },
            { value: '∞', label: 'Uptime', color: 'var(--color-blue)' },
          ].map(stat => (
            <div key={stat.label} className="text-center py-2">
              <div className="text-lg md:text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5 font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-base font-black text-[var(--color-chalk)] mb-4">Browse by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="card flex flex-col items-center gap-1.5 py-3 px-2 no-underline group text-center"
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[11px] font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-chalk)] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured ─── */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-[var(--color-chalk)]">Featured Lessons</h2>
          <Link to="/explore" className="text-sm font-bold text-[var(--color-petal)] hover:text-[var(--color-petal-light)] no-underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {featured.slice(0, 3).map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="section-mauve border-t-2 border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-base font-black text-[var(--color-chalk)] mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { num: '1', emoji: '✍️', title: 'Create', desc: 'Write in Markdown. Set a price.' },
              { num: '2', emoji: '🚀', title: 'Publish', desc: 'Stored on Shelby. Decentralized.' },
              { num: '3', emoji: '💰', title: 'Earn', desc: 'Get 100% of payments in APT.' },
            ].map(item => (
              <div key={item.num} className="card p-4 text-center !bg-[var(--color-mauve-light)] !border-[var(--color-mauve-dark)]">
                <div className="text-xl mb-2">{item.emoji}</div>
                <div className="w-6 h-6 rounded-full bg-[var(--color-petal)] text-white font-black text-[11px] flex items-center justify-center mx-auto mb-2">
                  {item.num}
                </div>
                <h3 className="text-sm font-black text-[var(--color-chalk)] mb-1">{item.title}</h3>
                <p className="text-[11px] text-[var(--color-chalk)]/50 font-semibold leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
