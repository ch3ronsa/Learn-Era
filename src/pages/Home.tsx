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
      <section className="bg-[var(--color-smoke)] pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-petal)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-petal)]/15 text-[var(--color-petal-light)] text-xs font-bold mb-6 tracking-wide">
                DECENTRALIZED LEARNING
              </span>
              <h1 className="text-5xl md:text-[4rem] font-extrabold text-[var(--color-chalk)] leading-[1.1] mb-6">
                Distant learning for further
                <span className="text-[var(--color-petal)] block mt-2">expansion</span>
              </h1>
              <p className="text-[var(--color-chalk)]/60 mb-10 leading-relaxed max-w-lg text-lg">
                The ultimate planning solution for people who want to reach their personal goals. Effortless, comfortable, and fully decentralized. No middleman.
              </p>
              
              {/* Edumel-style Search Bar */}
              <div className="relative max-w-md w-full mb-8">
                <input 
                  type="text" 
                  placeholder="What do you want to learn?" 
                  className="w-full bg-[var(--color-smoke-light)] text-[var(--color-chalk)] pl-6 pr-32 py-4 rounded-full border border-[var(--color-chalk)]/10 focus:outline-none focus:border-[var(--color-petal)] transition-colors"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-[var(--color-petal)] text-white font-bold px-6 rounded-full hover:bg-[var(--color-mauve)] transition-colors">
                  Search
                </button>
              </div>

              {/* Popular Tags */}
              <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] flex-wrap">
                <span className="font-medium mr-2">Popular:</span>
                {['Development', 'Business', 'Design'].map(tag => (
                  <Link key={tag} to={`/explore?q=${tag}`} className="hover:text-[var(--color-petal)] underline decoration-[var(--color-chalk)]/20 hover:decoration-[var(--color-petal)] underline-offset-4 transition-all">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Floating Feature Cards mimicking target graphic */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="relative w-full aspect-square bg-[var(--color-mauve-dark)] rounded-full flex items-center justify-center border-4 border-[var(--color-smoke-light)] z-0">
                <span className="text-9xl">🎓</span>
              </div>
              
              {/* Floating cards */}
              {[
                { icon: '📜', title: 'Get Certificate', position: 'top-10 -left-10', delay: '0' },
                { icon: '👨‍🏫', title: 'Skilled Instructors', position: 'bottom-20 -left-4', delay: '1000' },
                { icon: '💻', title: 'Online Classes', position: 'top-1/2 -right-8', delay: '2000' },
              ].map((f, i) => (
                <div key={i} className={`absolute ${f.position} bg-[var(--color-smoke-light)] rounded-xl p-4 border border-[var(--color-chalk)]/10 shadow-xl flex items-center gap-3 animate-pulse`} style={{ animationDuration: '4s', animationDelay: `${f.delay}ms` }}>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-smoke)] flex items-center justify-center text-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-chalk)]">{f.title}</h3>
                  </div>
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
      <section className="bg-[var(--color-smoke-light)] border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-chalk)] mb-3">Browse Courses By Category</h2>
            <p className="text-base text-[var(--color-text-muted)]">Explore our wide range of micro-lessons</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group flex flex-col items-center gap-4 py-8 px-4 rounded-2xl bg-[var(--color-smoke)] border border-[var(--color-border)] hover:border-[var(--color-petal)]/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--color-petal)]/10 transition-all duration-300 no-underline text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-1 transition-transform group-hover:scale-110" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-[var(--color-chalk)] group-hover:text-[var(--color-petal)] transition-colors">
                  {cat.label}
                </h3>
                <span className="text-xs text-[var(--color-text-muted)] font-medium">0 Courses</span>
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
      <section className="bg-[var(--color-mauve)] border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-chalk)] mb-4 leading-tight">
                Some reasons why Start Your Online Learning with Us
              </h2>
              <p className="text-base text-[var(--color-chalk)]/50 mb-8 leading-relaxed">
                Join our platform to experience a new way of learning. Publish content directly to the blockchain and earn 100% of the proceeds.
              </p>
              <Link to="/explore" className="btn-pill btn-pill-primary">
                Explore Courses
              </Link>
            </div>
            
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: '✍️', title: 'Create a Lesson', desc: 'Write your lesson easily' },
                { icon: '🚀', title: 'Publish', desc: 'Decentralized storage' },
                { icon: '💰', title: 'Earn APT', desc: 'No middleman' },
                { icon: '🌐', title: 'Access', desc: 'Global audience' },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--color-smoke)] rounded-2xl p-6 border border-[var(--color-border)] flex gap-4 hover:-translate-y-1 hover:border-[var(--color-petal)]/30 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-mauve-light)] flex items-center justify-center shrink-0 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-chalk)] mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
