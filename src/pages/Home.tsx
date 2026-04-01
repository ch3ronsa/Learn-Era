import { Link } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { useShelbyLessons } from '../hooks/useShelbyLessons'

export function Home() {
  const { lessons } = useShelbyLessons()
  const featured = lessons.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-36 bg-surface">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-8">
            Human Expertise, On-Chain
          </span>
          <h1 className="font-headline font-extrabold text-5xl lg:text-7xl text-on-background leading-[1.08] tracking-tight mb-8 max-w-5xl mx-auto">
            Learn What <span className="text-primary">AI Can't Teach</span> You
          </h1>
          <p className="text-lg lg:text-xl text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed">
            Real code reviews. Portfolio feedback from senior devs. Industry mentoring and live workshops.
            Human expertise that no LLM can replace — powered by Shelby Protocol with 95% creator revenue.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/explore" className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all inline-block">
              Find an Expert
            </Link>
            <Link to="/create" className="border-2 border-primary/20 text-primary px-10 py-4 rounded-xl font-bold hover:bg-primary/5 transition-all inline-block">
              Become an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Services */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline font-extrabold text-4xl mb-4">What Makes Us Different</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Four pillars of human expertise that AI tools simply cannot replicate.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Code Review */}
            <div className="relative p-10 rounded-3xl bg-surface border border-outline-variant/20 hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden">
              <div className="absolute top-6 right-6 text-7xl font-black text-primary/5 font-headline">01</div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined text-3xl">code_blocks</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-3">Real Project Code Review</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Get your actual codebase reviewed by senior engineers. Architecture decisions, security vulnerabilities,
                performance bottlenecks — the context-aware feedback that AI linters miss.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Architecture</span>
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Security</span>
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Performance</span>
              </div>
            </div>

            {/* Portfolio Feedback */}
            <div className="relative p-10 rounded-3xl bg-surface border border-outline-variant/20 hover:border-secondary/30 hover:shadow-lg transition-all group overflow-hidden">
              <div className="absolute top-6 right-6 text-7xl font-black text-secondary/5 font-headline">02</div>
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                <span className="material-symbols-outlined text-3xl">work</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-3">Portfolio Feedback</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Designers, developers, and creatives get honest, actionable portfolio reviews from hiring managers and
                industry professionals who know what stands out.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/5 text-secondary text-xs font-bold">UX/UI</span>
                <span className="px-3 py-1 rounded-full bg-secondary/5 text-secondary text-xs font-bold">Dev Portfolio</span>
                <span className="px-3 py-1 rounded-full bg-secondary/5 text-secondary text-xs font-bold">Career</span>
              </div>
            </div>

            {/* Industry Mentoring */}
            <div className="relative p-10 rounded-3xl bg-surface border border-outline-variant/20 hover:border-tertiary/30 hover:shadow-lg transition-all group overflow-hidden">
              <div className="absolute top-6 right-6 text-7xl font-black text-tertiary/5 font-headline">03</div>
              <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6 group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">
                <span className="material-symbols-outlined text-3xl">diversity_3</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-3">Industry-Specific Mentoring</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                1-on-1 guidance from people who've been there. Navigate career transitions, understand industry dynamics,
                and get the insider knowledge that no course teaches.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-tertiary/5 text-tertiary text-xs font-bold">Web3</span>
                <span className="px-3 py-1 rounded-full bg-tertiary/5 text-tertiary text-xs font-bold">Fintech</span>
                <span className="px-3 py-1 rounded-full bg-tertiary/5 text-tertiary text-xs font-bold">AI/ML</span>
              </div>
            </div>

            {/* Live Workshops */}
            <div className="relative p-10 rounded-3xl bg-surface border border-outline-variant/20 hover:border-primary/30 hover:shadow-lg transition-all group overflow-hidden">
              <div className="absolute top-6 right-6 text-7xl font-black text-primary/5 font-headline">04</div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined text-3xl">cast_for_education</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-3">Hands-On Live Workshops</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Build real projects in real-time with expert instructors. Ask questions, debug together,
                and walk away with working code — not just theory.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Live Coding</span>
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Q&A</span>
                <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold">Group Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Not AI Section */}
      <section className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline font-extrabold text-4xl mb-6">AI Can Explain.<br/><span className="text-primary">Humans Can Understand.</span></h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                ChatGPT can generate a code snippet. It can't tell you why your startup's architecture won't scale past 10K users.
                It can't look at your portfolio and say "this project won't impress a FAANG recruiter — here's why."
              </p>
              <div className="space-y-4">
                {[
                  { icon: 'check_circle', text: 'Context-aware feedback on YOUR actual work' },
                  { icon: 'check_circle', text: 'Industry insider knowledge and connections' },
                  { icon: 'check_circle', text: 'Real-time interaction and follow-up questions' },
                  { icon: 'check_circle', text: 'Accountability and structured progress tracking' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5">{item.icon}</span>
                    <span className="text-on-surface font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center">
                <span className="font-headline font-black text-4xl text-primary block mb-2">95%</span>
                <span className="text-sm text-on-surface-variant">Revenue to Creators</span>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center">
                <span className="font-headline font-black text-4xl text-primary block mb-2">5%</span>
                <span className="text-sm text-on-surface-variant">Platform Fee Only</span>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center">
                <span className="font-headline font-black text-4xl text-primary block mb-2">0</span>
                <span className="text-sm text-on-surface-variant">Middlemen</span>
              </div>
              <div className="p-6 rounded-2xl bg-surface-container-lowest text-center">
                <span className="font-headline font-black text-4xl text-primary block mb-2">&infin;</span>
                <span className="text-sm text-on-surface-variant">Access Duration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sessions */}
      {featured.length > 0 && (
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-headline font-extrabold text-4xl mb-2">Featured Sessions</h2>
                <p className="text-on-surface-variant">Hand-picked expertise from top creators.</p>
              </div>
              <Link className="font-bold text-primary flex items-center gap-2 group" to="/explore">
                View All
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featured.map(lesson => (
                <LessonCard key={lesson.contentBlobName} lesson={lesson} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roadmap */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
              Roadmap
            </span>
            <h2 className="font-headline font-extrabold text-4xl mb-4">Where We're Heading</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Building the future of human-to-human knowledge transfer, on-chain.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2"></div>

            {/* Phase 1 - Current */}
            <div className="relative flex flex-col md:flex-row items-start mb-12">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <span className="inline-block px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold mb-3">Live Now</span>
                <h3 className="font-headline font-bold text-xl mb-2">Micro-Learning Marketplace</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Pay-per-lesson model. Educators publish written and video content on Shelby Protocol.
                  Students pay directly with APT. 95% goes to the creator.
                </p>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-lowest -translate-x-1/2 mt-1 md:mt-2"></div>
              <div className="md:w-1/2 md:pl-12"></div>
            </div>

            {/* Phase 2 */}
            <div className="relative flex flex-col md:flex-row items-start mb-12">
              <div className="md:w-1/2 md:pr-12"></div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-surface-container-lowest -translate-x-1/2 mt-1 md:mt-2"></div>
              <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-3">Q3 2026</span>
                <h3 className="font-headline font-bold text-xl mb-2">Live Sessions & Booking</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Book 1-on-1 code reviews, portfolio feedback sessions, and mentoring calls directly on-chain.
                  Escrow-based payments release after session completion.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative flex flex-col md:flex-row items-start mb-12">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <span className="inline-block px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold mb-3">Q4 2026</span>
                <h3 className="font-headline font-bold text-xl mb-2">Expert Verification & Reputation</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  On-chain reputation system. Verified credentials, student reviews stored on Shelby,
                  and expertise badges that follow you across the ecosystem.
                </p>
              </div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-tertiary border-4 border-surface-container-lowest -translate-x-1/2 mt-1 md:mt-2"></div>
              <div className="md:w-1/2 md:pl-12"></div>
            </div>

            {/* Phase 4 */}
            <div className="relative flex flex-col md:flex-row items-start">
              <div className="md:w-1/2 md:pr-12"></div>
              <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-outline border-4 border-surface-container-lowest -translate-x-1/2 mt-1 md:mt-2"></div>
              <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                <span className="inline-block px-3 py-1 rounded-full bg-outline/10 text-outline text-xs font-bold mb-3">2027</span>
                <h3 className="font-headline font-bold text-xl mb-2">Workshop Marketplace & Cohorts</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Group workshops with limited seats. Cohort-based learning programs.
                  Multi-session packages and structured mentorship tracks with milestone-based payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-primary text-on-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10">
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-6">Your Expertise Has Value.</h2>
            <p className="text-xl text-primary-fixed mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
              Whether you're a senior dev doing code reviews or a designer giving portfolio feedback —
              keep 95% of what you earn. No algorithms, no gatekeepers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/explore" className="bg-on-primary text-primary px-10 py-5 rounded-full font-extrabold hover:scale-105 active:scale-95 transition-all shadow-xl inline-block">
                Browse Experts
              </Link>
              <Link to="/create" className="border-2 border-primary-fixed/30 text-on-primary px-10 py-5 rounded-full font-extrabold hover:bg-primary-container transition-all inline-block">
                Start Teaching
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
