import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { CATEGORIES } from '../lib/categories'
import { getDemoLessons } from '../lib/demo-lessons'

export function Home() {
  const lessons = getDemoLessons()
  const featured = lessons.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm text-[var(--color-primary-light)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
              Powered by Shelby Protocol
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-text-main)] mb-6 leading-tight tracking-tight">
              Learn anything.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent)]">
                Pay per lesson.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
              Micro-lessons stored on decentralized storage. Educators earn 100% of revenue.
              No middleman. No platform fees. Just knowledge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-base transition-colors no-underline"
              >
                Start Learning
              </Link>
              <Link
                to="/create"
                className="px-6 py-3 rounded-xl bg-[var(--color-surface-light)] hover:bg-[var(--color-surface-lighter)] text-[var(--color-text-main)] font-semibold text-base border border-[var(--color-border)] transition-colors no-underline"
              >
                Start Teaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-light)]/50">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Creator Revenue' },
            { value: '$0', label: 'Platform Fee' },
            { value: '<1s', label: 'Data Access' },
            { value: '\u221E', label: 'Censorship Resistance' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-main)]">{stat.value}</div>
              <div className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-light)] hover:border-[var(--color-primary)]/50 transition-all no-underline group"
            >
              <span className="text-2xl" style={{ color: cat.color }}>{cat.icon}</span>
              <span className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text-main)] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-main)]">Featured Lessons</h2>
          <Link
            to="/explore"
            className="text-sm text-[var(--color-primary-light)] hover:underline no-underline"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-light)]/30">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create a Lesson',
                desc: 'Write your lesson in Markdown. Set a price (or make it free). Choose a category.',
              },
              {
                step: '02',
                title: 'Publish to Shelby',
                desc: 'Your lesson is stored as a blob on Shelby Protocol. Decentralized, verifiable, permanent.',
              },
              {
                step: '03',
                title: 'Earn from Learners',
                desc: 'Students pay with APT to access your lesson. You receive 100% of the payment. No middleman.',
              },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-sm font-bold text-[var(--color-primary-light)]">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-main)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
