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
            <div className="relative max-w-xl mx-auto lg:mx-0 w-full mb-10 bg-white p-2 rounded-full flex items-center shadow-xl">
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="flex-1 bg-transparent text-gray-900 text-base font-bold placeholder-gray-500 pl-6 pr-4 py-3 focus:outline-none"
              />
              <button className="bg-[#f14d5d] text-white text-base font-bold px-8 py-4 rounded-full hover:bg-red-600 transition-all shadow-md transform hover:-translate-y-0.5 whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm font-bold text-gray-400 flex-wrap">
              <span className="text-[var(--color-chalk)]">Popular:</span>
              {['Development', 'Business', 'Design'].map(tag => (
                <Link key={tag} to={`/explore?q=${tag}`} className="hover:text-[var(--color-petal)] underline decoration-gray-500/40 hover:decoration-[var(--color-petal)] underline-offset-4 transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Perfect Edumel Graphic Structure */}
          <div className="hidden lg:flex w-full lg:w-1/2 relative justify-center items-center select-none">
             <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
                 {/* Soft glow replacing background chaos */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#f14d5d]/10 to-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                 
                 {/* Main floating illustration */}
                 <img 
                    src="/hero_illustration.png" 
                    alt="Learn Online" 
                    className="relative z-10 w-full h-full object-contain transform hover:scale-105 transition-transform duration-700 hover:rotate-2"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                 />
                 
                 {/* Edumel Floating Badges */}
                 <div className="absolute top-[15%] left-[0%] bg-white rounded-xl p-4 pr-6 shadow-2xl flex items-center gap-4 z-20 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '3s' }}>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">📜</div>
                    <div className="flex flex-col"><h3 className="text-sm font-black text-gray-800 leading-tight">Get Certificate</h3><span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Verified Proof</span></div>
                 </div>
                 
                 <div className="absolute bottom-[20%] right-[0%] bg-white rounded-xl p-4 pr-6 shadow-2xl flex items-center gap-4 z-20 animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">💻</div>
                    <div className="flex flex-col"><h3 className="text-sm font-black text-gray-800 leading-tight">Online Classes</h3><span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Learn anywhere</span></div>
                 </div>
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

      {/* ─── Browse by Category (Horizontal Pills MATCHING Edumel) ─── */}
      <section className="bg-[var(--color-smoke-light)] border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="text-[11px] font-black text-blue-500 tracking-[0.2em] uppercase mb-4 block">Top Categories</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-chalk)] mb-14">Browse Courses By Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                className="group flex flex-row items-center gap-5 p-5 pr-8 rounded-2xl bg-[var(--color-smoke-lighter)] border-2 border-[var(--color-border)] hover:border-[var(--color-petal)] hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-[#f14d5d]/10 transition-all duration-300 no-underline"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-inner" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-[var(--color-chalk)] group-hover:text-[var(--color-petal)] transition-colors line-clamp-1">
                    {cat.label}
                  </h3>
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

      {/* ─── How it works (Perfectly matching 2x2 grid & Image) ─── */}
      <section className="bg-[var(--color-mauve)] border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: 4 Steps Grid */}
            <div>
              <span className="text-[11px] font-black text-blue-500 tracking-[0.2em] uppercase mb-4 block">How To Start</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-chalk)] mb-12 leading-[1.2]">
                4 steps start <br/> your journey <br/> with us
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {[
                  { num: '01', color: 'bg-[#e91e63]', title: 'Signup with all info', desc: 'Securely create your decentralized identity on the blockchain.' },
                  { num: '02', color: 'bg-[#00c853]', title: 'Take your Admission', desc: 'Find the best course instantly with zero middlemen.' },
                  { num: '03', color: 'bg-[#2962ff]', title: 'Learn from online', desc: 'Study at your own pace anytime, anywhere.' },
                  { num: '04', color: 'bg-[#d81b60]', title: 'Get certificate', desc: 'Receive verifiable digital proofs for your achievements.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start gap-5">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-lg ${item.color}`}>
                      {item.num}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-extrabold text-[var(--color-chalk)] mb-2 mt-1">{item.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Video/Image Block with Play Button */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group w-full bg-[var(--color-smoke-light)] flex items-center justify-center border border-[var(--color-chalk)]/5">
               {/* Abstract placeholder for the video thumbnail */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#831843] opacity-50 mix-blend-overlay z-0"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm pointer-events-none z-0"><span className="text-[200px]">👩‍💻</span></div>
               
               {/* Central Play Button */}
               <button className="relative z-10 w-24 h-24 rounded-full bg-[#f14d5d] shadow-[0_10px_30px_rgba(241,77,93,0.6)] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                 <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
               </button>
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
