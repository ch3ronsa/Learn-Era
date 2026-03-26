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
      <section className="bg-[var(--color-smoke)] relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Subtle background glow centered */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[var(--color-petal)]/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl w-full mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left: Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block px-5 py-2.5 rounded-full bg-[var(--color-petal)]/10 text-[var(--color-petal-light)] text-sm font-extrabold mb-8 tracking-widest border border-[var(--color-petal)]/20 shadow-sm">
              DECENTRALIZED LEARNING
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-chalk)] leading-[1.15] mb-8">
              Distant learning <br className="hidden lg:block" /> for further <br className="hidden lg:block" />
              <span className="text-[var(--color-petal)] tracking-tight">expansion</span>
            </h1>
            <p className="text-[var(--color-text-muted)] mb-12 leading-relaxed text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0">
              The ultimate planning solution for people who want to reach their personal goals. Effortless, comfortable, and fully decentralized.
            </p>
            
            {/* Edumel-style Search Bar */}
            <div className="relative max-w-xl mx-auto lg:mx-0 w-full mb-10 bg-[var(--color-smoke-lighter)] p-2 rounded-full flex items-center shadow-2xl border-2 border-[var(--color-border)] focus-within:border-[var(--color-petal)]/50 transition-colors">
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="flex-1 bg-transparent text-[var(--color-chalk)] text-lg placeholder-gray-500 font-semibold pl-6 pr-4 py-4 focus:outline-none"
              />
              <button className="bg-[var(--color-petal)] text-white text-base md:text-lg font-bold px-10 py-5 rounded-full hover:bg-[var(--color-mauve)] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-base font-medium text-[var(--color-text-muted)] flex-wrap">
              <span className="text-[var(--color-chalk)] font-bold">Popular:</span>
              {['Development', 'Business', 'Design'].map(tag => (
                <Link key={tag} to={`/explore?q=${tag}`} className="hover:text-[var(--color-petal)] underline decoration-[var(--color-text-muted)]/40 hover:decoration-[var(--color-petal)] underline-offset-4 transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Solid, clean hero graphic (NO floating chaos) */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative justify-center items-center">
             <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-[var(--color-mauve-dark)] to-[var(--color-smoke-lighter)] rounded-[3rem] rotate-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[var(--color-chalk)]/5 flex flex-col items-center justify-center p-12 transition-transform duration-500 hover:rotate-0 group">
                
                {/* Main Icon */}
                <div className="w-40 h-40 bg-[var(--color-smoke)] rounded-full flex items-center justify-center mb-8 shadow-inner border border-[var(--color-border)] group-hover:scale-110 transition-transform duration-500">
                  <span className="text-8xl transform -rotate-2 group-hover:rotate-12 transition-transform duration-500">🎓</span>
                </div>
                
                {/* Framed Feature Tag */}
                <div className="bg-[var(--color-smoke)] rounded-2xl w-full p-6 text-center shadow-2xl border border-[var(--color-chalk)]/10 transform translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
                   <h3 className="text-xl font-bold text-[var(--color-chalk)] mb-2">Decentralized Ed</h3>
                   <p className="text-[15px] font-medium text-[var(--color-petal-light)]">100% Creator Revenue</p>
                </div>

                {/* Decorative floating dot */}
                <div className="absolute top-10 right-10 w-6 h-6 rounded-full bg-[var(--color-yellow)] animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-4 h-4 rounded-full bg-[var(--color-blue)] animate-bounce"></div>
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
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-chalk)] mb-4">Browse Courses By Category</h2>
            <p className="text-lg text-[var(--color-text-muted)] font-medium">Explore our wide range of micro-lessons</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group flex flex-col items-center justify-center gap-5 p-10 rounded-3xl bg-[var(--color-smoke-lighter)] border-2 border-[var(--color-border)] hover:border-[var(--color-petal)] hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[var(--color-petal)]/10 transition-all duration-400 no-underline text-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2 transition-transform duration-500 group-hover:scale-110 shadow-inner" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-chalk)] group-hover:text-[var(--color-petal)] transition-colors mb-1">
                    {cat.label}
                  </h3>
                  <span className="text-sm text-[var(--color-text-muted)] font-semibold">0 Courses</span>
                </div>
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
