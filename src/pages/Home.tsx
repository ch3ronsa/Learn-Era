import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { CATEGORIES } from '../lib/categories'
import { getDemoLessons } from '../lib/demo-lessons'

export function Home() {
  const lessons = getDemoLessons()
  const featured = lessons.slice(0, 6)

  return (
    <div>
      {/* Hero — Duolingo-style bold & playful */}
      <section className="relative overflow-hidden bg-[var(--color-mauve)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[var(--color-petal)]" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-[var(--color-petal)]" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full bg-[var(--color-chalk)]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[var(--color-smoke)]/40 border-2 border-[var(--color-petal)]/30 text-sm font-bold text-[var(--color-petal-light)] mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
              Powered by Shelby Protocol
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[var(--color-chalk)] mb-6 leading-tight tracking-tight">
              Learn anything.{' '}
              <span className="text-[var(--color-petal)]">
                Pay per lesson.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-chalk)]/60 mb-10 max-w-2xl mx-auto font-semibold">
              Micro-lessons stored on decentralized storage. Educators earn 100% of revenue.
              No middleman. No platform fees. Just knowledge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/explore"
                className="btn-chunky btn-chunky-primary px-8 py-4 text-lg"
              >
                Start Learning
              </Link>
              <Link
                to="/create"
                className="btn-chunky btn-chunky-secondary px-8 py-4 text-lg"
              >
                Start Teaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — Duolingo-style stat cards */}
      <section className="bg-[var(--color-smoke)]">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '100%', label: 'Creator Revenue', icon: '💰' },
            { value: '$0', label: 'Platform Fee', icon: '🎉' },
            { value: '<1s', label: 'Data Access', icon: '⚡' },
            { value: '∞', label: 'Censorship Resistance', icon: '🛡️' },
          ].map(stat => (
            <div key={stat.label} className="card-duo p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-[var(--color-chalk)]">{stat.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1 font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories — Duolingo-style grid */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-black text-[var(--color-chalk)] mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/explore?category=${cat.id}`}
              className="card-duo flex flex-col items-center gap-2.5 p-5 no-underline group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-chalk)] transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-[var(--color-chalk)]">Featured Lessons</h2>
          <Link
            to="/explore"
            className="text-sm font-bold text-[var(--color-petal)] hover:text-[var(--color-petal-light)] no-underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(lesson => (
            <LessonCard key={lesson.contentBlobName} lesson={lesson} />
          ))}
        </div>
      </section>

      {/* How it works — Duolingo step cards */}
      <section className="bg-[var(--color-mauve)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-[var(--color-chalk)] mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                emoji: '✍️',
                title: 'Create a Lesson',
                desc: 'Write your lesson in Markdown. Set a price (or make it free). Choose a category.',
              },
              {
                step: '2',
                emoji: '🚀',
                title: 'Publish to Shelby',
                desc: 'Your lesson is stored as a blob on Shelby Protocol. Decentralized, verifiable, permanent.',
              },
              {
                step: '3',
                emoji: '💸',
                title: 'Earn from Learners',
                desc: 'Students pay with APT to access your lesson. You receive 100% of the payment.',
              },
            ].map(item => (
              <div key={item.step} className="bg-[var(--color-mauve-light)] rounded-2xl p-6 text-center border-2 border-[var(--color-mauve-dark)]">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-petal)]/15 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-petal)] text-white font-black text-sm mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-extrabold text-[var(--color-chalk)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-chalk)]/60 font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
