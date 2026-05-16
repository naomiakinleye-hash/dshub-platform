'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  LayoutGrid, BarChart3, User, Settings, LogOut, Menu, X,
  AlertCircle, RefreshCw, MessageSquare,
  TrendingUp, Search, Bell, Calendar, FileCheck
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
    .pill-error { background: rgba(211,47,47,0.12); color: var(--error); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-warn { background: rgba(237,108,2,0.12); color: var(--warn); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .tabular { font-variant-numeric: tabular-nums; }
    .recharts-cartesian-axis-tick-value { font-family: 'DM Mono', monospace; font-size: 11px; fill: var(--text-mute); }
    .recharts-cartesian-grid line { stroke: var(--border); }
    .recharts-legend-item-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--text-soft) !important; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  `}</style>
);

const MY_PROGRESS = [
  { week: 'W1', score: 92, late: 0 }, { week: 'W2', score: 88, late: 0 },
  { week: 'W3', score: 95, late: 0 }, { week: 'W4', score: 0, late: 1 },
  { week: 'W5', score: 0, late: 0 }, { week: 'W6', score: null, late: 0 },
  { week: 'W7', score: null, late: 0 }, { week: 'W8', score: null, late: 0 },
  { week: 'W9', score: null, late: 0 },
];

const STATUS_BREAKDOWN = [
  { name: 'Approved', value: 3, color: '#2E7D32' },
  { name: 'Under review', value: 1, color: '#2196F3' },
  { name: 'Needs resub.', value: 1, color: '#D32F2F' },
  { name: 'Pending', value: 1, color: '#ED6C02' },
  { name: 'Upcoming', value: 3, color: '#DBE3EC' },
];

const COHORT_AVG = [
  { week: 'W1', me: 92, cohort: 84 }, { week: 'W2', me: 88, cohort: 82 },
  { week: 'W3', me: 95, cohort: 86 }, { week: 'W4', me: 0, cohort: 80 },
  { week: 'W5', me: 0, cohort: 83 },
];

const FEEDBACK_FEED = [
  { week: 3, mentor: 'Engr Abdulrahman', text: 'Excellent execution. State management was clean and your accessibility pass is the strongest in the cohort.', time: '2d ago', score: 95 },
  { week: 4, mentor: 'Engr Abdulrahman', text: 'Strong start, but error states need work. Resubmit with proper boundary handling and toast notifications.', time: '4h ago', action: 'resubmit' },
  { week: 2, mentor: 'Engr Abdulrahman', text: 'Component reuse is improving. Watch out for prop drilling, lift the cohort filter state up next time.', time: '1w ago', score: 88 },
  { week: 1, mentor: 'Engr Abdulrahman', text: 'Solid scaffold. Good naming conventions. Keep the README detailed as the project grows.', time: '2w ago', score: 92 },
];

const PENDING = [
  { week: 6, title: 'Dashboard Module · Assignment', due: 'Sunday 18 May', urgent: true },
  { week: 6, title: 'Week 6 Logbook', due: 'Sunday 18 May', urgent: true },
  { week: 4, title: 'API Integration · Resubmit', due: 'Thursday 22 May', urgent: false },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card notched-sm p-3" style={{ borderColor: 'var(--navy)', borderWidth: '2px' }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--navy)] mb-2">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[12px] mb-1 last:mb-0">
          <span className="w-2 h-2 inline-block" style={{ background: p.color }} />
          <span className="font-semibold text-[var(--text-soft)]">{p.name}:</span>
          <span className="mono tabular font-bold text-[var(--navy)]">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ open, setOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, active: true, href: '/intern/analytics' },
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
            <a key={item.id} href={item.href} className={`nav-item w-full text-left ${item.active ? 'active' : ''}`}>
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
        <a href="/" className="nav-item w-full text-left text-[12px]"><LogOut size={14} /><span>Sign out</span></a>
      </div>
    </aside>
  );
}

export default function InternAnalytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completedWeeks = MY_PROGRESS.filter(w => w.score && w.score > 0).length;
  const overallProgress = Math.round((completedWeeks / 9) * 100);
  const avgScore = Math.round(MY_PROGRESS.filter(w => w.score && w.score > 0).reduce((a, b) => a + b.score, 0) / completedWeeks);

  return (
    <div className="dash-root min-h-screen flex" style={{ background: 'var(--paper)' }}>
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
              <div>
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">My Analytics</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">Adaeze Okonkwo · Frontend · Premium · Mentor: Engr Abdulrahman</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]"><Search size={18} /></button>
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
            <div className="card notched-sm p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Overall Progress</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">{overallProgress}</span>
                <span className="text-[14px] font-bold text-[var(--text-mute)]">%</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] mb-2">
                <div className="h-full bg-[var(--blue)] transition-all" style={{ width: `${overallProgress}%` }} />
              </div>
              <div className="text-[11px] text-[var(--text-mute)] mono">Week 6 of 9</div>
            </div>
            <div className="card notched-sm p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Avg Score</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">{avgScore}</span>
                <span className="text-[14px] font-bold text-[var(--text-mute)]">/100</span>
              </div>
              <span className="pill-success"><TrendingUp size={10} className="inline mr-1" strokeWidth={2.5} /> +4 vs cohort</span>
            </div>
            <div className="card notched-sm p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Approved</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">03</span>
                <span className="text-[14px] font-bold text-[var(--text-mute)]">of 9</span>
              </div>
              <span className="pill-success">On track</span>
            </div>
            <div className="card notched-sm p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Pending</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">03</span>
                <span className="text-[14px] font-bold text-[var(--text-mute)]">items</span>
              </div>
              <span className="pill-warn">Action needed</span>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.6fr_1fr] gap-5 mb-6 reveal" style={{ animationDelay: '60ms' }}>
            <div className="card notched p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="pill-yellow mb-2 inline-block">My Performance</span>
                  <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Score by Week</h3>
                </div>
                <span className="pill-blue">9-week capstone</span>
              </div>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MY_PROGRESS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(33,150,243,0.06)' }} />
                    <Bar dataKey="score" name="My Score" fill="#2196F3" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card notched p-5 lg:p-6">
              <span className="pill-yellow mb-2 inline-block">Status</span>
              <h3 className="pixel text-[22px] leading-tight text-[var(--navy)] mb-5">Submission Status</h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={STATUS_BREAKDOWN} cx="50%" cy="48%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                      {STATUS_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend layout="horizontal" verticalAlign="bottom" iconType="square" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="mb-6 reveal" style={{ animationDelay: '120ms' }}>
            <div className="card notched p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="pill-yellow mb-2 inline-block">Benchmark</span>
                  <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Me vs Cohort Average</h3>
                </div>
              </div>
              <div style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={COHORT_AVG} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                    <Line type="monotone" dataKey="me" name="Me" stroke="#2196F3" strokeWidth={3} dot={{ r: 4, fill: '#2196F3' }} />
                    <Line type="monotone" dataKey="cohort" name="Cohort avg" stroke="#1B2D5C" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#1B2D5C' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[1.3fr_1fr] gap-5 reveal" style={{ animationDelay: '180ms' }}>
            <div className="card notched p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="pill-yellow mb-2 inline-block">From your mentor</span>
                  <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Feedback Feed</h3>
                </div>
                <span className="pill-blue">{FEEDBACK_FEED.length} entries</span>
              </div>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                {FEEDBACK_FEED.map((f, i) => (
                  <div key={i} className="pb-4 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="pill-blue">Week {f.week}</span>
                        {f.score && <span className="pill-success">{f.score}/100</span>}
                        {f.action === 'resubmit' && <span className="pill-error"><RefreshCw size={9} className="inline mr-1" strokeWidth={2.5} /> Resubmit</span>}
                      </div>
                      <span className="mono text-[10px] text-[var(--text-mute)] uppercase tracking-wider">{f.time}</span>
                    </div>
                    <p className="text-[13px] text-[var(--text-soft)] font-medium leading-relaxed mb-2">{f.text}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-mute)] mono">
                      <MessageSquare size={11} /> {f.mentor}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card notched p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="pill-yellow mb-2 inline-block">Action needed</span>
                  <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Pending Tasks</h3>
                </div>
              </div>
              <div className="space-y-3">
                {PENDING.map((t, i) => (
                  <div key={i} className={`p-3.5 notched-sm border-2 ${t.urgent ? 'border-[var(--warn)] bg-[var(--paper-warm)]' : 'border-[var(--border)] bg-white'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="pill-yellow">Week {t.week}</span>
                      {t.urgent && <span className="pill-warn"><AlertCircle size={9} className="inline mr-1" strokeWidth={2.5} /> Urgent</span>}
                    </div>
                    <div className="font-bold text-[13px] text-[var(--navy)] mb-1.5">{t.title}</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-mute)] font-medium mono">
                      <Calendar size={11} /> Due {t.due}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Intern · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}