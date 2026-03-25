import { Link, Outlet, useLocation } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/explore', label: 'Explore', icon: '🔍' },
  { path: '/create', label: 'Create', icon: '✏️' },
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header — Duolingo-style sticky top bar */}
      <header className="bg-[var(--color-mauve)] sticky top-0 z-50 border-b-2 border-[var(--color-mauve-dark)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-10 h-10 rounded-2xl bg-[var(--color-petal)] flex items-center justify-center text-white font-black text-base shadow-[0_3px_0_var(--color-petal-dark)]">
                LE
              </div>
              <span className="text-lg font-extrabold text-[var(--color-chalk)] tracking-tight hidden sm:block">
                LearnEra
              </span>
            </Link>

            {/* Nav — Duolingo pill tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl text-sm font-bold no-underline transition-all ${
                    location.pathname === item.path
                      ? 'bg-[var(--color-petal)] text-white shadow-[0_2px_0_var(--color-petal-dark)]'
                      : 'text-[var(--color-chalk)]/70 hover:text-[var(--color-chalk)] hover:bg-[var(--color-mauve-light)]'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <WalletConnect />
        </div>
      </header>

      {/* Mobile bottom nav — Duolingo-style */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-mauve)] border-t-2 border-[var(--color-mauve-dark)] px-2 py-1.5">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-bold no-underline transition-all ${
                location.pathname === item.path
                  ? 'text-[var(--color-petal)] bg-[var(--color-petal)]/10'
                  : 'text-[var(--color-chalk)]/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="hidden md:block border-t-2 border-[var(--color-mauve-dark)] bg-[var(--color-mauve)] py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-chalk)]/60 font-semibold">
            Built on{' '}
            <a
              href="https://shelby.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-petal-light)] hover:underline"
            >
              Shelby Protocol
            </a>
            {' '}&{' '}
            <a
              href="https://aptos.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-petal-light)] hover:underline"
            >
              Aptos
            </a>
          </p>
          <p className="text-sm text-[var(--color-chalk)]/60 font-semibold">
            Learn anything. Pay per lesson. No middleman.
          </p>
        </div>
      </footer>
    </div>
  )
}
