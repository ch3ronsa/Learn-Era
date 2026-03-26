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
      <section className="bg-[var(--color-smoke)] pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden relative">
        {/* Subtle background glow centered */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[var(--color-petal)]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="w-full md:w-1/2">
            <span className="inline-block px-5 py-2 rounded-full bg-[var(--color-petal)]/10 text-[var(--color-petal-light)] text-sm font-bold mb-6 tracking-wider border border-[var(--color-petal)]/20">
              DECENTRALIZED LEARNING
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-chalk)] leading-tight mb-6">
              Distant learning <br/> for further <br/>
              <span className="text-[var(--color-petal)]">expansion</span>
            </h1>
            <p className="text-[var(--color-text-muted)] mb-10 leading-relaxed text-lg lg:text-xl font-medium max-w-lg">
              The ultimate planning solution for people who want to reach their personal goals. Effortless, comfortable, and fully decentralized.
            </p>
            
            {/* Edumel-style Search Bar */}
            <div className="relative max-w-lg w-full mb-8 bg-white p-2 rounded-full flex items-center shadow-xl">
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="flex-1 bg-transparent text-gray-900 font-semibold pl-6 pr-4 py-3 focus:outline-none placeholder-gray-400"
              />
              <button className="bg-[var(--color-petal)] text-white text-sm font-bold px-8 py-3 rounded-full hover:bg-[var(--color-mauve)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex items-center gap-4 text-[15px] font-medium text-[var(--color-text-muted)] flex-wrap">
              <span className="text-[var(--color-chalk)] font-bold">Popular:</span>
              {['Development', 'Business', 'Design'].map(tag => (
                <Link key={tag} to={`/explore?q=${tag}`} className="hover:text-[var(--color-petal)] underline decoration-[var(--color-text-muted)]/40 hover:decoration-[var(--color-petal)] underline-offset-4 transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Elegant Floating Feature Cards mimicking target graphic exactly like Edumel */}
          <div className="hidden md:flex w-full md:w-1/2 relative justify-center items-center h-[500px]">
             {/* Center decorative element replacing heavy circle */}
             <div className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-[var(--color-petal)]/20 to-transparent rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}></div>
             <div className="relative w-64 h-64 bg-[var(--color-smoke-lighter)] rounded-[2.5rem] rotate-3 shadow-2xl border border-[var(--color-chalk)]/5 flex items-center justify-center z-10">
                <span className="text-8xl transform -rotate-3 hover:scale-110 transition-transform cursor-pointer">🎓</span>
             </div>
            
            {/* Floating cards */}
            {[
              { icon: '📜', title: 'Get Certificate', position: 'absolute top-10 left-0', delay: '0' },
              { icon: '👨‍🏫', title: 'Skilled Instructors', position: 'absolute bottom-10 left-10', delay: '1000' },
              { icon: '💻', title: 'Online Classes', position: 'absolute top-1/2 -right-4', delay: '2000' },
            ].map((f, i) => (
              <div key={i} className={`${f.position} bg-[var(--color-chalk)] rounded-2xl p-4 shadow-2xl flex items-center gap-4 z-20 animate-bounce`} style={{ animationDuration: '4s', animationDelay: `${f.delay}ms` }}>
                <div className="w-12 h-12 rounded-full bg-[var(--color-petal)]/20 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[var(--color-smoke)]">{f.title}</h3>
                </div>
              </div>
            ))}
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
