import { Link, Outlet, useLocation } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Courses' },
  { path: '/create', label: 'Create' },
  { path: '/dashboard', label: 'Dashboard' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Edumel-style header */}
      <header className="sticky top-0 z-50 bg-[var(--color-smoke)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-petal)] flex items-center justify-center text-white font-extrabold text-xs">
              LE
            </div>
            <span className="text-lg font-extrabold text-[var(--color-chalk)]">
              LearnEra
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold no-underline transition-colors ${
                  location.pathname === item.path
                    ? 'text-[var(--color-petal)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-chalk)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <WalletConnect />
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-smoke)]/95 backdrop-blur-md border-t border-[var(--color-border)] px-2 py-1.5">
        <div className="flex items-center justify-around">
          {[
            { path: '/', label: 'Home', icon: '🏠' },
            { path: '/explore', label: 'Courses', icon: '📚' },
            { path: '/create', label: 'Create', icon: '✏️' },
            { path: '/dashboard', label: 'Dashboard', icon: '📊' },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-semibold no-underline ${
                location.pathname === item.path
                  ? 'text-[var(--color-petal)]'
                  : 'text-[var(--color-text-muted)]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-1 pb-24 md:pb-0">
        <Outlet />
      </main>

      {/* Edumel-style dark footer */}
      <footer className="hidden md:block bg-[var(--color-smoke-lighter)] py-14 border-t border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-petal)] flex items-center justify-center text-white font-extrabold text-xs">LE</div>
                <span className="text-base font-extrabold text-[var(--color-chalk)]">LearnEra</span>
              </div>
              <p className="text-sm text-[var(--color-chalk)]/40 leading-relaxed">
                Decentralized micro-learning marketplace. Pay per lesson. No middleman.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--color-chalk)] mb-3">Explore</h4>
              <div className="flex flex-col gap-2">
                <Link to="/explore" className="text-sm text-[var(--color-chalk)]/40 hover:text-[var(--color-petal)] no-underline transition-colors">All Courses</Link>
                <Link to="/create" className="text-sm text-[var(--color-chalk)]/40 hover:text-[var(--color-petal)] no-underline transition-colors">Become Instructor</Link>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--color-chalk)] mb-3">Built On</h4>
              <div className="flex flex-col gap-2">
                <a href="https://shelby.xyz" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-chalk)]/40 hover:text-[var(--color-petal)] no-underline transition-colors">Shelby Protocol</a>
                <a href="https://aptos.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-chalk)]/40 hover:text-[var(--color-petal)] no-underline transition-colors">Aptos Blockchain</a>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--color-chalk)]/10 pt-5 text-center">
            <p className="text-xs text-[var(--color-chalk)]/30">© 2026 LearnEra. Learn. Pay. Earn.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
