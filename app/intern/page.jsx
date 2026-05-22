'use client';

import { useState } from 'react';
import {
  LayoutGrid, FileCheck, BarChart3, User, Settings, LogOut, Menu, X,
  Search, Bell, Calendar, Clock, AlertCircle, CheckCircle2, FileText,
  MessageSquare, ArrowRight, RefreshCw, FileEdit
} from 'lucide-react';

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
    :root {
      --navy: #1B2D5C; --navy-deep: #0D1B3F; --navy-soft: #2E4585;
      --blue: #2196F3; --blue-light: #5FB3FF; --blue-deep: #0D6EBF; --blue-pale: #E3F2FD;
      --yellow: #FBC02D; --yellow-soft: #FFE082;
      --white: #FFFFFF; --paper: #F5F7FA; --paper-warm: #ECF1F7;
      --border: #DBE3EC; --text-mute: #5A6B85; --text-soft: #2C3E60;
      --error: #D32F2F; --success: #2E7D32; --warn: #ED6C02;
    }
    .dash-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--navy); background: var(--paper); }
    .dash-root * { -webkit-font-smoothing: antialiased; }
    .pixel { font-family: 'Pixelify Sans', sans-serif; font-weight: 600; }
    .mono { font-family: 'DM Mono', monospace; }
    .notched { clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px); }
    .notched-sm { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }
    .pill-yellow { background: var(--yellow); color: var(--navy); font-weight: 800; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 9px; display: inline-block; line-height: 1.3; }
    .pill-blue { background: var(--blue-pale); color: var(--blue-deep); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-success { background: rgba(46,125,50,0.12); color: var(--success); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-warn { background: rgba(237,108,2,0.12); color: var(--warn); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-error { background: rgba(211,47,47,0.12); color: var(--error); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; text-decoration: none; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .tabular { font-variant-numeric: tabular-nums; }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; text-decoration: none; }
    .btn-primary:hover { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-outline { background: transparent; color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; text-decoration: none; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .pop-in { animation: popIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  `}</style>
);

const NOTIFICATIONS = [
  { id: 1, text: 'Mentor feedback posted on Week 4 (resubmit needed)', time: '4h ago', unread: true },
  { id: 2, text: 'Week 6 assignment is now open', time: '1d ago', unread: true },
  { id: 3, text: 'Reminder: Week 6 due Sunday 11:59 PM WAT', time: '1d ago', unread: true },
  { id: 4, text: 'Week 3 approved · scored 95', time: '3d ago', unread: false },
];

const DRAFTS = [
  { week: 6, title: 'Dashboard Module', updated: 'Edited 2h ago', type: 'Assignment' },
  { week: 6, title: 'Week 6 Logbook', updated: 'Edited yesterday', type: 'Logbook' },
];

const DEADLINES = [
  { title: 'Week 6 · Dashboard Module', due: 'Sun 18 May · 11:59 PM', urgent: true },
  { title: 'Week 6 · Logbook', due: 'Sun 18 May · 11:59 PM', urgent: true },
  { title: 'Week 4 · API Integration (resubmit)', due: 'Thu 22 May', urgent: false },
];

const MESSAGES = [
  { from: 'Engr Abdulrahman', text: 'Strong start on week 4, but tighten the error states before you resubmit.', time: '4h ago' },
  { from: 'Engr Abdulrahman', text: 'Great accessibility pass on week 3. Keep that rhythm.', time: '3d ago' },
];

function Sidebar({ open, setOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, active: true, href: '/intern' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, href: '/intern/submissions' },
    { id: 'analytics', label: 'My Analytics', icon: BarChart3, href: '/intern/analytics' },
    { id: 'profile', label: 'Profile', icon: User, href: '/intern/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/intern/settings' },
  ];
  return (
    <aside className={`bg-[var(--navy)] text-white w-[240px] flex-shrink-0 flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white flex items-center justify-center text-[var(--navy)] font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2"><span className="font-extrabold text-[14px]">DSHub</span><span className="pill-yellow">Intern</span></div>
            <div className="text-[10px] text-white/60 mt-1 font-medium uppercase tracking-wider">Cohort A · 2026</div>
          </div>
        </a>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/70 p-1"><X size={18} /></button>
      </div>
      <nav className="flex-1 py-4">
        <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</div>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <a key={item.id} href={item.href} className={`nav-item ${item.active ? 'active' : ''}`}>
              <Icon size={16} /><span className="flex-1">{item.label}</span>
            </a>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 p-2">
          <div className="w-9 h-9 bg-[var(--blue)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[13px] notched-sm">AO</div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] font-bold truncate">Adaeze Okonkwo</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">Frontend · Premium</div>
          </div>
        </div>
        <a href="/signout" className="nav-item text-[12px]"><LogOut size={14} /><span>Sign out</span></a>
      </div>
    </aside>
  );
}

export default function InternDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
              <div>
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">Welcome back, Adaeze</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">Week 6 of 9 · 8 days to graduation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setSearchOpen(true); setNotifOpen(false); }} className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]" aria-label="Search"><Search size={18} /></button>
              <div className="relative">
                <button onClick={() => { setNotifOpen(o => !o); setSearchOpen(false); }} className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative" aria-label="Notifications">
                  <Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" />
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <div className="absolute right-0 mt-2 w-[320px] bg-white border border-[var(--border)] notched-sm z-50 pop-in shadow-xl">
                      <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                        <span className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Notifications</span>
                        <span className="pill-error">3 new</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {NOTIFICATIONS.map(n => (
                          <div key={n.id} className="px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--paper)]">
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
                      <a href="/intern/submissions" onClick={() => setNotifOpen(false)} className="block px-4 py-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue)] hover:bg-[var(--paper)] text-center">View submissions</a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {searchOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[12vh] px-4" onClick={() => setSearchOpen(false)}>
            <div className="bg-white w-full max-w-xl notched p-2 pop-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search size={18} className="text-[var(--text-mute)]" />
                <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your weeks, submissions, feedback…" className="flex-1 outline-none text-[15px] font-medium text-[var(--navy)] bg-transparent" />
                <button onClick={() => setSearchOpen(false)} className="text-[var(--text-mute)] hover:text-[var(--navy)]"><X size={16} /></button>
              </div>
              <div className="p-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] px-2 mb-2">Jump to</div>
                {[
                  { href: '/intern/submissions', label: 'Current submission (Week 6)' },
                  { href: '/intern/analytics', label: 'My analytics & scores' },
                  { href: '/intern/profile', label: 'My profile' },
                ].map(s => (
                  <a key={s.href} href={s.href} className="flex items-center justify-between px-2 py-2.5 hover:bg-[var(--paper)] text-[13px] font-semibold text-[var(--text-soft)]">
                    {s.label}<ArrowRight size={13} className="text-[var(--text-mute)]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-5 lg:p-8">
          {/* Current focus banner */}
          <section className="card notched p-6 lg:p-7 mb-5 reveal" style={{ background: 'var(--navy)', borderColor: 'var(--navy)' }}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div>
                <span className="pill-yellow mb-3 inline-block">This Week · Week 6</span>
                <h2 className="pixel text-[28px] lg:text-[34px] text-white leading-tight mb-2">Dashboard Module</h2>
                <p className="text-[14px] text-white/75 font-medium max-w-xl">
                  Implement a role-based dashboard with charts and live data. Due Sunday 18 May, 11:59 PM WAT.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="pill-warn">Not submitted</span>
                  <span className="text-[12px] text-white/60 font-medium mono">2 days left</span>
                </div>
              </div>
              <a href="/intern/submissions" className="btn-primary flex-shrink-0">
                Go to submission <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </section>

          {/* Progress glance */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5 reveal" style={{ animationDelay: '60ms' }}>
            {[
              { label: 'Overall Progress', value: '67%', sub: 'Week 6 of 9' },
              { label: 'Avg Score', value: '92', sub: 'Across 3 graded' },
              { label: 'Approved', value: '03', sub: 'of 9 weeks' },
              { label: 'Needs Action', value: '02', sub: '1 resubmit · 1 due' },
            ].map((s, i) => (
              <div key={i} className="card notched-sm p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{s.label}</div>
                <div className="pixel tabular text-[34px] leading-none text-[var(--navy)] mb-2">{s.value}</div>
                <div className="text-[11px] text-[var(--text-mute)] font-medium mono">{s.sub}</div>
              </div>
            ))}
          </section>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
            {/* Left column */}
            <div className="space-y-5">
              {/* Drafts */}
              <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '120ms' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileEdit size={16} className="text-[var(--blue)]" strokeWidth={2} />
                    <h3 className="font-extrabold text-[15px] uppercase tracking-[0.06em] text-[var(--navy)]">Drafts in progress</h3>
                  </div>
                  <span className="pill-blue">{DRAFTS.length} saved</span>
                </div>
                <div className="space-y-3">
                  {DRAFTS.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 border border-[var(--border)] notched-sm hover:border-[var(--navy)] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[var(--paper-warm)] flex items-center justify-center notched-sm flex-shrink-0">
                          <FileText size={15} className="text-[var(--text-soft)]" />
                        </div>
                        <div className="leading-tight">
                          <div className="font-bold text-[13px] text-[var(--navy)]">Week {d.week} · {d.title}</div>
                          <div className="text-[11px] text-[var(--text-mute)] font-medium">{d.type} · {d.updated}</div>
                        </div>
                      </div>
                      <a href="/intern/submissions" className="text-[11px] font-bold uppercase tracking-wider text-[var(--blue)] hover:text-[var(--navy)] flex items-center gap-1">
                        Continue <ArrowRight size={12} strokeWidth={2.5} />
                      </a>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submission status */}
              <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '180ms' }}>
                <h3 className="font-extrabold text-[15px] uppercase tracking-[0.06em] text-[var(--navy)] mb-4">Submission status</h3>
                <div className="space-y-2.5">
                  {[
                    { wk: 'Week 3', label: 'Routing & State', status: 'approved' },
                    { wk: 'Week 4', label: 'API Integration', status: 'resubmit' },
                    { wk: 'Week 5', label: 'Authentication Flow', status: 'review' },
                    { wk: 'Week 6', label: 'Dashboard Module', status: 'pending' },
                  ].map((r, i) => {
                    const map = {
                      approved: { cls: 'pill-success', Icon: CheckCircle2, t: 'Approved' },
                      resubmit: { cls: 'pill-error', Icon: RefreshCw, t: 'Resubmit' },
                      review: { cls: 'pill-blue', Icon: Clock, t: 'Under review' },
                      pending: { cls: 'pill-warn', Icon: AlertCircle, t: 'Not submitted' },
                    }[r.status];
                    return (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="mono text-[12px] font-bold text-[var(--text-soft)] w-14">{r.wk}</span>
                          <span className="text-[13px] font-semibold text-[var(--navy)]">{r.label}</span>
                        </div>
                        <span className={map.cls}><map.Icon size={10} className="inline mr-1" strokeWidth={2.5} />{map.t}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Deadlines */}
              <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '120ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-[var(--blue)]" strokeWidth={2} />
                  <h3 className="font-extrabold text-[15px] uppercase tracking-[0.06em] text-[var(--navy)]">Upcoming deadlines</h3>
                </div>
                <div className="space-y-3">
                  {DEADLINES.map((d, i) => (
                    <div key={i} className={`p-3.5 notched-sm border-2 ${d.urgent ? 'border-[var(--warn)] bg-[var(--paper-warm)]' : 'border-[var(--border)]'}`}>
                      <div className="flex items-start justify-between mb-1.5">
                        <span className="font-bold text-[13px] text-[var(--navy)]">{d.title}</span>
                        {d.urgent && <span className="pill-warn">Soon</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-mute)] font-medium mono">
                        <Clock size={11} /> {d.due}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mentor messages */}
              <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '180ms' }}>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={16} className="text-[var(--blue)]" strokeWidth={2} />
                  <h3 className="font-extrabold text-[15px] uppercase tracking-[0.06em] text-[var(--navy)]">From your mentor</h3>
                </div>
                <div className="space-y-4">
                  {MESSAGES.map((m, i) => (
                    <div key={i} className="pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                      <p className="text-[13px] text-[var(--text-soft)] font-medium leading-relaxed mb-2">{m.text}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[var(--text-mute)] mono">
                        <span className="font-bold text-[var(--navy)]">{m.from}</span> · {m.time}
                      </div>
                    </div>
                  ))}
                </div>
                <a href="mailto:abdulrahman@dshub.com?subject=Question about my submission" className="btn-outline w-full mt-4 text-[11px] py-2.5">
                  <MessageSquare size={12} strokeWidth={2.5} /> Message mentor
                </a>
              </section>
            </div>
          </div>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Intern · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}
