'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RequireAuth } from '../lib/AuthContext';
import {
  LayoutGrid, Users, Award, FileCheck, BarChart3, Settings, LogOut,
  Menu, X, ChevronDown, Bell, Search, Layers, ArrowUpRight
} from 'lucide-react';

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
    :root {
      --navy: #1B2D5C; --navy-deep: #0D1B3F; --navy-soft: #2E4585;
      --blue: #2196F3; --blue-light: #5FB3FF; --blue-deep: #0D6EBF; --blue-pale: #E3F2FD;
      --yellow: #FBC02D; --yellow-soft: #FFE082;
      --white: #FFFFFF; --paper: #F5F7FA; --paper-warm: #ECF1F7;
      --border: #DBE3EC; --text-mute: #5A6B85; --text-soft: #2C3E60;
      --success: #2E7D32; --error: #D32F2F; --warn: #ED6C02;
    }
    .dash-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--navy); background: var(--paper); }
    .dash-root * { -webkit-font-smoothing: antialiased; }
    .pixel { font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: -0.01em; }
    .mono { font-family: 'DM Mono', monospace; }
    .notched { clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px); }
    .notched-sm { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
    .pill-yellow { background: var(--yellow); color: var(--navy); font-weight: 800; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 9px; display: inline-block; line-height: 1.3; }
    .pill-blue { background: var(--blue-pale); color: var(--blue-deep); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-navy { background: var(--navy); color: var(--white); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-success { background: rgba(46,125,50,0.12); color: var(--success); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-error { background: rgba(211,47,47,0.12); color: var(--error); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-warn { background: rgba(237,108,2,0.12); color: var(--warn); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .lift { transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .lift:hover { transform: translateY(-2px); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; text-decoration: none; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .tabular { font-variant-numeric: tabular-nums; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .pop-in { animation: popIn 180ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    .recharts-cartesian-axis-tick-value { font-family: 'DM Mono', monospace; font-size: 11px; fill: var(--text-mute); }
    .recharts-cartesian-grid line { stroke: var(--border); }
    .recharts-legend-item-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--text-soft) !important; }
  `}</style>
);

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutGrid, title: 'Overview', subtitle: 'Cohort A 2026 · Final Week · 8 days to graduation' },
  { href: '/admin/interns', label: 'Interns', icon: Users, count: 64, title: 'Interns', subtitle: '64 interns across 6 tracks' },
  { href: '/admin/mentors', label: 'Mentors', icon: Award, count: 12, title: 'Mentors', subtitle: '12 active · 3 pending approval' },
  { href: '/admin/submissions', label: 'Submissions', icon: FileCheck, count: 18, title: 'Submissions', subtitle: 'Review queue and scoring' },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, title: 'Analytics', subtitle: 'Cohort-wide performance metrics' },
  { href: '/admin/manage', label: 'Tracks', icon: Layers, title: 'Tracks', subtitle: 'Curriculum tracks and configuration' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, title: 'Settings', subtitle: 'Program and account settings' },
];

const NOTIFICATIONS = [
  { id: 1, text: 'Adaeze Okonkwo submitted Week 6 capstone', time: '2m ago', unread: true },
  { id: 2, text: '3 mentor applications awaiting approval', time: '1h ago', unread: true },
  { id: 3, text: 'Emeka Obi flagged: late submission (Week 4)', time: '3h ago', unread: true },
  { id: 4, text: 'Cohort A graduation in 8 days', time: '1d ago', unread: false },
];

function matchNav(pathname) {
  // longest-prefix match so /admin/interns doesn't match /admin
  const sorted = [...NAV].sort((a, b) => b.href.length - a.href.length);
  return sorted.find(n => pathname === n.href || pathname.startsWith(n.href + '/')) || NAV[0];
}

export default function AdminLayout({ children }) {
  return (
    <RequireAuth roles={['admin']}>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}

function AdminShell({ children }) {
  const pathname = usePathname();
  const current = matchNav(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* SIDEBAR */}
      <aside className={`bg-[var(--navy)] text-white w-[240px] flex-shrink-0 flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white flex items-center justify-center text-[var(--navy)] font-extrabold notched-sm">DS</div>
            <div className="leading-none">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[14px]">DSHub</span>
                <span className="pill-yellow">Admin</span>
              </div>
              <div className="text-[10px] text-white/60 mt-1 font-medium uppercase tracking-wider">Cohort A · 2026</div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white p-1" aria-label="Close menu">
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</div>
          {NAV.map(item => {
            const Icon = item.icon;
            const active = current.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`nav-item ${active ? 'active' : ''}`}
              >
                <Icon size={16} strokeWidth={2} />
                <span className="flex-1">{item.label}</span>
                {item.count !== undefined && (
                  <span className="mono tabular text-[11px] font-bold text-white/60">{item.count}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 p-2">
            <div className="w-9 h-9 bg-[var(--blue)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[13px] notched-sm">UT</div>
            <div className="leading-tight flex-1 min-w-0">
              <div className="text-[13px] font-bold truncate">Umar Tijjani</div>
              <div className="text-[10px] text-white/60 uppercase tracking-wider">Program Coord.</div>
            </div>
          </div>
          <Link href="/signout" className="nav-item text-[12px]">
            <LogOut size={14} strokeWidth={2} />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1" aria-label="Open menu">
                <Menu size={20} strokeWidth={2.5} />
              </button>
              <div className="min-w-0">
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)] truncate">{current.title}</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1 truncate">{current.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <button className="hidden md:flex items-center gap-2 px-3 py-2 border-2 border-[var(--border)] hover:border-[var(--navy)] text-[12px] font-semibold transition-colors">
                <span className="pill-yellow">Cohort A</span>
                <span className="text-[var(--text-soft)]">2026</span>
                <ChevronDown size={14} strokeWidth={2} className="text-[var(--text-mute)]" />
              </button>

              <button onClick={() => { setSearchOpen(true); setNotifOpen(false); }} className="p-2 hover:bg-[var(--paper)] transition-colors text-[var(--text-soft)]" aria-label="Search">
                <Search size={18} strokeWidth={2} />
              </button>

              <div className="relative">
                <button onClick={() => { setNotifOpen(o => !o); setSearchOpen(false); }} className="p-2 hover:bg-[var(--paper)] transition-colors text-[var(--text-soft)] relative" aria-label="Notifications">
                  <Bell size={18} strokeWidth={2} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" />
                </button>

                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} aria-hidden="true" />
                    <div className="absolute right-0 mt-2 w-[320px] bg-white border border-[var(--border)] notched-sm z-50 pop-in shadow-xl">
                      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                        <span className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Notifications</span>
                        <span className="pill-error">3 new</span>
                      </div>
                      <div className="max-h-[320px] overflow-y-auto">
                        {NOTIFICATIONS.map(n => (
                          <div key={n.id} className="px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--paper)] transition-colors">
                            <div className="flex items-start gap-2">
                              {n.unread && <span className="w-1.5 h-1.5 bg-[var(--blue)] rounded-full mt-1.5 flex-shrink-0" />}
                              <div className={n.unread ? '' : 'pl-3.5'}>
                                <p className="text-[12px] font-medium text-[var(--text-soft)] leading-snug">{n.text}</p>
                                <span className="mono text-[10px] text-[var(--text-mute)] uppercase tracking-wider">{n.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href="/admin/submissions" onClick={() => setNotifOpen(false)} className="block px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue)] hover:bg-[var(--paper)] transition-colors text-center">
                        View all activity
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* SEARCH OVERLAY */}
        {searchOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[12vh] px-4" onClick={() => setSearchOpen(false)}>
            <div className="bg-white w-full max-w-xl notched p-2 pop-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search size={18} className="text-[var(--text-mute)]" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search interns, mentors, submissions…"
                  className="flex-1 outline-none text-[15px] font-medium text-[var(--navy)] bg-transparent"
                />
                <button onClick={() => setSearchOpen(false)} className="text-[var(--text-mute)] hover:text-[var(--navy)]"><X size={16} /></button>
              </div>
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] px-2 mb-2">Quick links</div>
                {[
                  { href: '/admin/interns', label: 'All interns' },
                  { href: '/admin/mentors', label: 'Mentor approvals' },
                  { href: '/admin/submissions', label: 'Submission queue' },
                  { href: '/admin/manage', label: 'Manage tracks' },
                ].map(s => (
                  <Link key={s.href} href={s.href} onClick={() => setSearchOpen(false)} className="flex items-center justify-between px-2 py-2.5 hover:bg-[var(--paper)] text-[13px] font-semibold text-[var(--text-soft)]">
                    {s.label}<ArrowUpRight size={13} className="text-[var(--text-mute)]" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          {children}
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Admin · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}
