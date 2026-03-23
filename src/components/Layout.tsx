import { Link, Outlet, useLocation } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/create', label: 'Create' },
  { path: '/dashboard', label: 'Dashboard' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">
                SL
              </div>
              <span className="text-lg font-bold text-[var(--color-text-main)]">
                ShelbyLearn
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[var(--color-surface-light)] text-[var(--color-text-main)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-surface-light)]'
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

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            Built on{' '}
            <a
              href="https://shelby.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary-light)] hover:underline"
            >
              Shelby Protocol
            </a>
            {' '}&{' '}
            <a
              href="https://aptos.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary-light)] hover:underline"
            >
              Aptos
            </a>
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Learn anything. Pay per lesson. No middleman.
          </p>
        </div>
      </footer>
    </div>
  )
}
