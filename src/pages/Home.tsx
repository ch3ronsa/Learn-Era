import { Link, useNavigate } from 'react-router-dom'
import { LessonCard } from '../components/LessonCard'
import { useShelbyLessons } from '../hooks/useShelbyLessons'

export function Home() {
  const navigate = useNavigate();
  const { lessons } = useShelbyLessons()
  const featured = lessons.slice(0, 3)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/explore');
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest uppercase mb-6">
              The Academic Atelier
            </span>
            <h1 className="font-headline font-extrabold text-5xl lg:text-7xl text-on-background leading-[1.1] tracking-tight mb-8">
              The World's Leading <span className="text-primary">Educational</span> Marketplace
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              A decentralized learning ecosystem built for creators. Pay-per-lesson model with only 5% platform fee — creators keep 95% of every sale.
            </p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input required className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" placeholder="Search for courses..." type="text"/>
              </div>
              <button type="submit" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                Explore
              </button>
            </form>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-fixed-dim/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img className="w-full aspect-square object-cover" alt="Modern bright university common room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx5E6sV2E1Ye7R_8OfuudWu4-SV-T3EBN30Qr2RwoBDdTIon5PgUualRC9SIoeVXD96JBNeDr-mEsB28d_jwH-4ySzVg-32OFwfs5DuRcNjMIMdbDNb7lou2tpYMrrLhK9W7xzWWffZobMR9j1juxyFVuzkf0knhhc1iORla1UMlmHD9HpCROr1B1nEDq9kOu6QGOLWR_dfS0WGOa2s1AoFIw4qPMyOuQ0HOC-XiAQuBLvhiCXju2izk-mEauVIFO4D_kOfJxbiZIO"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface-container-low py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-on-primary transition-all">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">95% Creator Revenue</h3>
              <p className="text-on-surface-variant leading-relaxed">Instructors keep 95% of every sale. Only a 5% platform fee keeps the lights on — compared to 37-75% on legacy platforms.</p>
            </div>
            <div className="p-10 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                <span className="material-symbols-outlined text-3xl">shopping_cart</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">Pay-Per-Lesson</h3>
              <p className="text-on-surface-variant leading-relaxed">No subscriptions, no bundles. Buy only the lessons you need. One payment, permanent access, direct to the creator.</p>
            </div>
            <div className="p-10 rounded-3xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-8 group-hover:bg-tertiary group-hover:text-on-tertiary transition-all">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">On-Chain Verified</h3>
              <p className="text-on-surface-variant leading-relaxed">Every lesson is stored on Shelby Protocol with merkle proof verification. Tamper-proof content, transparent payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end editorial-gap">
            <div className="max-w-2xl">
              <h2 className="font-headline font-extrabold text-4xl mb-6">Explore the Atelier</h2>
              <p className="text-on-surface-variant text-lg">Curated knowledge paths designed for the modern professional.</p>
            </div>
            <Link className="mt-6 md:mt-0 font-bold text-primary flex items-center gap-2 group" to="/explore">
              View All Categories 
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: 'code', label: 'Code' },
              { icon: 'palette', label: 'Design' },
              { icon: 'music_note', label: 'Music' },
              { icon: 'translate', label: 'Language' },
              { icon: 'business_center', label: 'Business' },
              { icon: 'science', label: 'Science' }
            ].map((cat) => (
               <Link key={cat.label} to={`/explore?category=${cat.label}`} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-surface hover:bg-primary-fixed transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl mb-4 text-primary">{cat.icon}</span>
                  <span className="font-headline font-bold">{cat.label}</span>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons Grid */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-headline font-extrabold text-4xl mb-12">Featured Sessions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map(lesson => (
               <LessonCard key={lesson.contentBlobName} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-24 px-6 bg-surface-container-low">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="font-headline font-extrabold text-4xl mb-6">4 Steps To Start Your Journey</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">Our streamlined process ensures you get from curiosity to expertise in the shortest possible time.</p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 lg:gap-8">
            <div className="relative flex flex-col items-center p-10 rounded-3xl bg-surface-container-lowest">
              <span className="font-headline font-black text-6xl text-primary/10 absolute top-4 right-8">01</span>
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-primary text-3xl">account_balance_wallet</span>
              </div>
              <h4 className="font-headline font-bold text-xl mb-4 text-center">Connect Wallet</h4>
              <p className="text-on-surface-variant text-sm text-center leading-relaxed">Securely link your identity to the marketplace.</p>
            </div>
            <div className="relative flex flex-col items-center p-10 rounded-3xl bg-surface-container-lowest">
              <span className="font-headline font-black text-6xl text-primary/10 absolute top-4 right-8">02</span>
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-primary text-3xl">search_insights</span>
              </div>
              <h4 className="font-headline font-bold text-xl mb-4 text-center">Find Course</h4>
              <p className="text-on-surface-variant text-sm text-center leading-relaxed">Browse thousands of high-quality sessions.</p>
            </div>
            <div className="relative flex flex-col items-center p-10 rounded-3xl bg-surface-container-lowest">
              <span className="font-headline font-black text-6xl text-primary/10 absolute top-4 right-8">03</span>
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-primary text-3xl">shopping_cart</span>
              </div>
              <h4 className="font-headline font-bold text-xl mb-4 text-center">One-Click Buy</h4>
              <p className="text-on-surface-variant text-sm text-center leading-relaxed">Instant ownership and permanent access.</p>
            </div>
            <div className="relative flex flex-col items-center p-10 rounded-3xl bg-surface-container-lowest">
              <span className="font-headline font-black text-6xl text-primary/10 absolute top-4 right-8">04</span>
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-primary text-3xl">school</span>
              </div>
              <h4 className="font-headline font-bold text-xl mb-4 text-center">Start Learning</h4>
              <p className="text-on-surface-variant text-sm text-center leading-relaxed">Engage with creators and master new skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-primary text-on-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10">
            <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-8">Ready to Start Learning?</h2>
            <p className="text-xl text-primary-fixed mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
              Whether you're here to learn or to teach, the Academic Atelier is your home. 95% revenue for creators, pay-per-lesson for students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/explore" className="bg-on-primary text-primary px-10 py-5 rounded-full font-extrabold hover:scale-105 active:scale-95 transition-all shadow-xl inline-block">
                Get Started
              </Link>
              <Link to="/create" className="border-2 border-primary-fixed/30 text-on-primary px-10 py-5 rounded-full font-extrabold hover:bg-primary-container transition-all inline-block">
                Teach on LearnEra
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
