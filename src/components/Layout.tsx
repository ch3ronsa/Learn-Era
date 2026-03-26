import { Link, Outlet, useLocation } from 'react-router-dom'
import { WalletConnect } from './WalletConnect'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Courses' },
  { path: '/dashboard', label: 'Dashboard' },
]

export function Layout() {
  const location = useLocation()

  return (
    <div className="bg-surface font-body text-tertiary selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none border-b border-slate-200/15 dark:border-slate-800/15">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold tracking-tighter text-[#38007B] dark:text-white font-headline">
            LearnEra
          </Link>
          <div className="hidden md:flex items-center gap-8 font-headline font-medium text-sm tracking-tight">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  location.pathname === item.path
                    ? "text-[#38007B] dark:text-white font-bold border-b-2 border-[#38007B] dark:border-[#a594f9] pb-1"
                    : "text-slate-600 dark:text-slate-400 hover:text-[#38007B] dark:hover:text-white transition-colors"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-slate-600 hover:text-primary font-medium text-sm transition-colors">Login</button>
            <div className="flex items-center justify-center bg-primary text-on-primary rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10 overflow-hidden">
               <WalletConnect />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full rounded-t-3xl mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto font-body text-sm text-slate-600 dark:text-slate-400">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold text-[#292929] dark:text-white mb-6">LearnEra</div>
            <p className="leading-relaxed mb-6">Redefining education through transparency and decentralized ownership.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-lg">public</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-lg">mail</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-tertiary dark:text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="/explore">All Courses</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="/explore">Categories</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="#">Certifications</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-tertiary dark:text-white mb-6">Instructors</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="/create">Become Instructor</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="/create">Teaching Guide</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="#">Revenue Share</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-tertiary dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="#">Privacy Policy</Link></li>
              <li><Link className="text-slate-500 hover:text-[#1357C9] dark:hover:text-blue-400 transition-colors" to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800/30 py-8 px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">© 2024 LearnEra. The Academic Atelier.</p>
          <div className="flex gap-6">
            <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/5 rounded">v2.4.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
