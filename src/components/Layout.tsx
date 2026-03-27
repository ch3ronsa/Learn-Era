import { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { WalletConnect, useWalletState } from './WalletConnect'
import { useProfile } from '../contexts/ProfileContext'
import { shortAddress } from '../config'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Courses' },
  { path: '/dashboard', label: 'Dashboard' },
]

function ProfileDropdown() {
  const { address, disconnect } = useWalletState()
  const { profile, isNewUser } = useProfile()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayName = profile?.displayName || shortAddress(address)
  const initials = profile?.displayName
    ? profile.displayName.slice(0, 2).toUpperCase()
    : address.slice(2, 4).toUpperCase()
  const isEducator = profile?.role === 'educator'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-border)] hover:border-primary transition-colors cursor-pointer"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white text-[10px] font-extrabold shrink-0">
          {profile?.avatar ? (
            <img src={profile.avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : initials}
        </div>
        <span className="text-xs font-semibold text-[var(--color-chalk)] max-w-[100px] truncate">{displayName}</span>
        {isEducator && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-[var(--color-border)] py-2 z-50">
          <div className="px-4 py-2 border-b border-[var(--color-border)]">
            <p className="text-xs font-semibold text-[var(--color-chalk)] truncate">{displayName}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] font-mono">{shortAddress(address)}</p>
            {isEducator && <span className="text-[10px] text-primary font-semibold">Educator</span>}
          </div>
          {isNewUser && (
            <Link to="/profile/edit" onClick={() => setOpen(false)} className="block px-4 py-2.5 text-xs font-semibold text-primary hover:bg-primary/5 transition-colors">
              Create Profile
            </Link>
          )}
          {!isNewUser && (
            <>
              <Link to={`/profile/${address}`} onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-[var(--color-chalk)] hover:bg-[var(--color-surface-container)] transition-colors">
                My Profile
              </Link>
              <Link to="/profile/edit" onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-[var(--color-chalk)] hover:bg-[var(--color-surface-container)] transition-colors">
                Edit Profile
              </Link>
            </>
          )}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-[var(--color-chalk)] hover:bg-[var(--color-surface-container)] transition-colors">
            Dashboard
          </Link>
          <div className="border-t border-[var(--color-border)] mt-1 pt-1">
            <button onClick={() => { disconnect(); setOpen(false) }} className="w-full text-left px-4 py-2 text-xs text-[var(--color-red)] hover:bg-red-50 transition-colors cursor-pointer">
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function Layout() {
  const location = useLocation()
  const { connected } = useWalletState()
  const { isNewUser } = useProfile()

  return (
    <div className="bg-surface font-body text-tertiary selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      {/* New User Banner */}
      {connected && isNewUser && (
        <div className="fixed top-0 w-full z-[60] bg-primary text-on-primary text-center py-2 text-xs font-semibold">
          <Link to="/profile/edit" className="hover:underline">Set up your profile to get started →</Link>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className={`fixed ${connected && isNewUser ? 'top-8' : 'top-0'} w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/15`}>
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-[#38007B] font-headline">
            LearnEra
          </Link>
          <div className="hidden md:flex items-center gap-8 font-headline font-medium text-sm tracking-tight">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "text-[#38007B] font-bold border-b-2 border-[#38007B] pb-1"
                    : "text-slate-600 hover:text-[#38007B] transition-colors"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {connected ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center justify-center bg-primary text-on-primary rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10 overflow-hidden">
                <WalletConnect />
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className={`${connected && isNewUser ? 'pt-32' : 'pt-24'} flex-grow`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 w-full rounded-t-3xl mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto font-body text-sm text-slate-600">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold text-[#292929] mb-6">LearnEra</div>
            <p className="leading-relaxed mb-6">Redefining education through transparency and decentralized ownership.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-lg">public</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-lg">mail</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-tertiary mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="/explore">All Courses</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="/explore">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-tertiary mb-6">Instructors</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="/profile/edit">Become Instructor</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="/create">Create a Lesson</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-tertiary mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="#">Privacy Policy</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] transition-colors" to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 py-8 px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">© 2024 LearnEra. The Academic Atelier.</p>
          <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded">v2.5.0</span>
        </div>
      </footer>
    </div>
  )
}
