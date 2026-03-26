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
      {/* Header */}
      <header className="bg-[var(--color-mauve)] sticky top-0 z-50 border-b-2 border-[var(--color-mauve-dark)]">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-petal)] flex items-center justify-center text-white font-black text-xs border-b-[3px] border-[var(--color-petal-dark)]">
                LE
              </div>
              <span className="text-base font-black text-[var(--color-chalk)] hidden sm:block">
                LearnEra
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-xl text-sm font-bold no-underline transition-all ${
                    location.pathname === item.path
                      ? 'bg-[var(--color-petal)] text-white border-b-[3px] border-[var(--color-petal-dark)]'
                      : 'text-[var(--color-chalk)]/60 hover:text-[var(--color-chalk)] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <WalletConnect />
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-mauve)] border-t-2 border-[var(--color-mauve-dark)] px-2 py-1">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-bold no-underline ${
                location.pathname === item.path
                  ? 'text-[var(--color-petal)]'
                  : 'text-[var(--color-chalk)]/40'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      <footer className="hidden md:block border-t-2 border-[var(--color-border)] py-5">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-muted)] font-bold">
            Built on{' '}
            <a href="https://shelby.xyz" target="_blank" rel="noopener noreferrer" className="text-[var(--color-petal)] hover:underline">Shelby</a>
            {' & '}
            <a href="https://aptos.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-petal)] hover:underline">Aptos</a>
          </p>
          <p className="text-xs text-[var(--color-text-muted)] font-bold">
            Learn. Pay. Earn.
          </p>
        </div>
      </footer>
    </div>
  )
}
