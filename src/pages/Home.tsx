import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { CATEGORIES } from '../lib/categories'
import { getDemoLessons } from '../lib/demo-lessons'

export function Home() {
  const lessons = getDemoLessons()
  const featured = lessons.slice(0, 6)

  return (
    <div>
      {/* ─── Hero: Edumel split layout ─── */}
      <section className="bg-[var(--color-mauve)]">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-petal)]/15 text-[var(--color-petal-light)] text-xs font-bold mb-5 tracking-wide">
                DECENTRALIZED LEARNING
              </span>
              <h1 className="text-3xl md:text-[2.75rem] font-extrabold text-[var(--color-chalk)] leading-[1.2] mb-4">
                Learn anything.
                <br />
                <span className="text-[var(--color-petal)]">Pay per lesson.</span>
              </h1>
              <p className="text-[var(--color-chalk)]/50 mb-8 leading-relaxed max-w-md">
                Micro-lessons stored on decentralized storage. Educators earn 100% of revenue. No middleman. No fees.
              </p>
              <div className="flex items-center gap-3">
                <Link to="/explore" className="btn-pill btn-pill-primary btn-pill-lg">
                  Browse Courses →
                </Link>
                <Link to="/create" className="btn-pill btn-pill-outline btn-pill-lg">
                  Start Teaching
                </Link>
              </div>
            </div>
            {/* Right: Feature cards (Edumel-style) */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {[
                { icon: '🎓', title: 'Get Certificate', desc: 'Verifiable on-chain proof' },
                { icon: '👨‍🏫', title: 'Expert Instructors', desc: 'Learn from the best' },
                { icon: '📱', title: 'Learn Anywhere', desc: 'Access on any device' },
                { icon: '💸', title: '100% to Creators', desc: 'No platform fees' },
              ].map(f => (
                <div key={f.title} className="bg-[var(--color-mauve-light)] rounded-xl p-5 border border-[var(--color-chalk)]/5">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <h3 className="text-sm font-bold text-[var(--color-chalk)] mb-1">{f.title}</h3>
                  <p className="text-xs text-[var(--color-chalk)]/40">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats counter ─── */}
      <section className="bg-[var(--color-smoke)] border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '100%', label: 'Creator Revenue', color: 'var(--color-green)' },
            { value: '$0', label: 'Platform Fees', color: 'var(--color-petal)' },
            { value: '<1s', label: 'Data Access', color: 'var(--color-yellow)' },
            { value: '∞', label: 'Censorship Free', color: 'var(--color-blue)' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Browse by Category (Edumel icon grid) ─── */}
      <section className="bg-[var(--color-smoke-light)]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-2">Browse Courses By Category</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Explore our wide range of micro-lessons</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group flex flex-col items-center gap-3 py-6 px-3 rounded-xl bg-[var(--color-smoke)] hover:bg-[var(--color-petal)] transition-all duration-300 no-underline text-center"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-semibold text-[var(--color-text-muted)] group-hover:text-white transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Lessons ─── */}
      <section className="bg-[var(--color-smoke)]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-1">Featured Lessons</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Handpicked courses for you</p>
            </div>
            <Link to="/explore" className="btn-pill btn-pill-outline btn-pill-sm">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(lesson => (
              <LessonCard key={lesson.contentBlobName} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="bg-[var(--color-mauve)]">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-2">How It Works</h2>
            <p className="text-sm text-[var(--color-chalk)]/40">Three simple steps to start learning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '01', icon: '✍️', title: 'Create a Lesson', desc: 'Write your lesson in Markdown. Set a price or make it free. Choose a category.' },
              { num: '02', icon: '🚀', title: 'Publish to Shelby', desc: 'Your lesson is stored on Shelby Protocol. Decentralized, verifiable, permanent.' },
              { num: '03', icon: '💰', title: 'Earn from Learners', desc: 'Students pay with APT. You receive 100% of the payment. No middleman.' },
            ].map(item => (
              <div key={item.num} className="relative bg-[var(--color-mauve-light)] rounded-xl p-7 border border-[var(--color-chalk)]/5 text-center group hover:border-[var(--color-petal)]/30 transition-colors">
                <span className="absolute top-4 right-4 text-4xl font-extrabold text-[var(--color-chalk)]/5">{item.num}</span>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-[var(--color-chalk)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-chalk)]/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[var(--color-smoke)]">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-3">Ready to Start Learning?</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
            Join the decentralized education revolution. No platform fees, no censorship.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/explore" className="btn-pill btn-pill-primary btn-pill-lg">Get Started →</Link>
            <Link to="/create" className="btn-pill btn-pill-outline btn-pill-lg">Teach on LearnEra</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
