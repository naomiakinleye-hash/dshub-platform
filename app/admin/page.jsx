'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  LayoutGrid, Users, Award, FileCheck, BarChart3, Settings, LogOut,
  Menu, X, ChevronDown, Bell, Search, TrendingUp, TrendingDown,
  ArrowUpRight, Code2, Database, Shield, Palette, Cpu, MoreHorizontal
} from 'lucide-react';

// ============================================================
// THEME — DSHub brand (shared)
// ============================================================
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

    :root {
      --navy: #1B2D5C;
      --navy-deep: #0D1B3F;
      --navy-soft: #2E4585;
      --blue: #2196F3;
      --blue-light: #5FB3FF;
      --blue-deep: #0D6EBF;
      --blue-pale: #E3F2FD;
      --yellow: #FBC02D;
      --yellow-soft: #FFE082;
      --white: #FFFFFF;
      --paper: #F5F7FA;
      --paper-warm: #ECF1F7;
      --border: #DBE3EC;
      --text-mute: #5A6B85;
      --text-soft: #2C3E60;
      --success: #2E7D32;
      --error: #D32F2F;
      --warn: #ED6C02;
    }

    .dash-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--navy); background: var(--paper); }
    .dash-root * { -webkit-font-smoothing: antialiased; }
    .pixel { font-family: 'Pixelify Sans', sans-serif; font-weight: 600; letter-spacing: 0.01em; }
    .mono { font-family: 'DM Mono', monospace; }

    .texture-bg {
      background-color: var(--paper);
      background-image:
        repeating-linear-gradient(135deg, transparent 0, transparent 22px, rgba(33,150,243,0.05) 22px, rgba(33,150,243,0.05) 23px),
        repeating-linear-gradient(45deg, transparent 0, transparent 28px, rgba(27,45,92,0.03) 28px, rgba(27,45,92,0.03) 29px);
    }

    .notched { clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px); }
    .notched-sm { clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px); }

    .pill-yellow { background: var(--yellow); color: var(--navy); font-weight: 800; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 9px; display: inline-block; line-height: 1.3; }
    .pill-blue { background: var(--blue-pale); color: var(--blue-deep); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-navy { background: var(--navy); color: var(--white); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-success { background: rgba(46,125,50,0.12); color: var(--success); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-error { background: rgba(211,47,47,0.12); color: var(--error); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }

    .card { background: var(--white); border: 1px solid var(--border); }
    .lift { transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .lift:hover { transform: translateY(-2px); }

    .nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      font-weight: 600; font-size: 13px;
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      transition: background 200ms ease, color 200ms ease;
      border-left: 3px solid transparent;
    }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }

    .tabular { font-variant-numeric: tabular-nums; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }

    /* Recharts overrides */
    .recharts-cartesian-axis-tick-value { font-family: 'DM Mono', monospace; font-size: 11px; fill: var(--text-mute); }
    .recharts-cartesian-grid line { stroke: var(--border); }
    .recharts-legend-item-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; color: var(--text-soft) !important; }
  `}</style>
);

// ============================================================
// MOCK DATA
// ============================================================
const KPIS = [
  { label: 'Total Interns', value: 64, change: '+12%', delta: 'up', detail: 'vs Cohort 2025' },
  { label: 'Active Mentors', value: 12, change: '+2', delta: 'up', detail: 'this cohort' },
  { label: 'Completion Rate', value: '94%', change: '+5%', delta: 'up', detail: 'vs target 90%' },
  { label: 'Avg Submission Score', value: 87, suffix: '/100', change: '+3', delta: 'up', detail: 'across capstones' },
];

const SUBMISSION_DATA = [
  { week: 'W1', onTime: 60, late: 4 },
  { week: 'W2', onTime: 58, late: 6 },
  { week: 'W3', onTime: 62, late: 2 },
  { week: 'W4', onTime: 55, late: 9 },
  { week: 'W5', onTime: 61, late: 3 },
  { week: 'W6', onTime: 59, late: 5 },
  { week: 'W7', onTime: 63, late: 1 },
  { week: 'W8', onTime: 60, late: 4 },
];

const TRACK_DISTRIBUTION = [
  { name: 'Frontend', value: 14, color: '#2196F3', icon: Code2 },
  { name: 'Backend', value: 12, color: '#1B2D5C', icon: Database },
  { name: 'Cybersecurity', value: 9, color: '#FBC02D', icon: Shield },
  { name: 'Product Mgmt', value: 11, color: '#0D6EBF', icon: BarChart3 },
  { name: 'UI/UX Design', value: 10, color: '#FFE082', icon: Palette },
  { name: 'Data Science', value: 8, color: '#2E4585', icon: Cpu },
];

const ENGAGEMENT_DATA = [
  { week: 'W1', active: 52, sessions: 312 },
  { week: 'W2', active: 48, sessions: 296 },
  { week: 'W3', active: 55, sessions: 340 },
  { week: 'W4', active: 58, sessions: 388 },
  { week: 'W5', active: 51, sessions: 322 },
  { week: 'W6', active: 56, sessions: 358 },
  { week: 'W7', active: 60, sessions: 412 },
  { week: 'W8', active: 62, sessions: 448 },
];

const TRACK_PERFORMANCE = [
  { track: 'Frontend', score: 89, completion: 95 },
  { track: 'Backend', score: 87, completion: 92 },
  { track: 'Cybersec', score: 91, completion: 100 },
  { track: 'Product', score: 85, completion: 91 },
  { track: 'UI/UX', score: 88, completion: 90 },
  { track: 'Data Sci', score: 90, completion: 87 },
];

const ACTIVITY = [
  { type: 'submission', user: 'Adaeze Okonkwo', action: 'submitted capstone', target: 'Graduation Web Platform', track: 'Frontend', time: '2m ago' },
  { type: 'review', user: 'Victor John', action: 'completed review of', target: 'OWASP Audit Toolkit', track: 'Cybersec', time: '12m ago' },
  { type: 'submission', user: 'Olumide Balogun', action: 'submitted capstone', target: 'Analytics API Layer', track: 'Backend', time: '38m ago' },
  { type: 'mentor', user: 'Dr. Aisha Mohammed', action: 'hosted office hours', target: 'Distributed Systems Q&A', track: '·', time: '1h ago' },
  { type: 'flag', user: 'System', action: 'flagged late submission', target: 'Track Performance Insights', track: 'Data Sci', time: '2h ago' },
  { type: 'review', user: 'Tobi Akinwale', action: 'left feedback on', target: 'Mentor Recognition Portal', track: 'Frontend', time: '3h ago' },
  { type: 'submission', user: 'Chiamaka Nwosu', action: 'submitted capstone', target: 'DSHub Design System', track: 'UI/UX', time: '4h ago' },
];

// ============================================================
// CUSTOM TOOLTIP
// ============================================================
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
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

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ active, setActive, open, setOpen }) {
  const items = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'interns', label: 'Interns', icon: Users, count: 64 },
    { id: 'mentors', label: 'Mentors', icon: Award, count: 12 },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, count: 18 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`bg-[var(--navy)] text-white w-[240px] flex-shrink-0 flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white flex items-center justify-center text-[var(--navy)] font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[14px]">DSHub</span>
              <span className="pill-yellow">Admin</span>
            </div>
            <div className="text-[10px] text-white/60 mt-1 font-medium uppercase tracking-wider">Cohort A · 2026</div>
          </div>
        </a>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/70 hover:text-white p-1" aria-label="Close menu">
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</div>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => { setActive(item.id); setOpen(false); }}
              className={`nav-item w-full text-left ${active === item.id ? 'active' : ''}`}
            >
              <Icon size={16} strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && (
                <span className="mono tabular text-[11px] font-bold text-white/60">{item.count}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 relative overflow-hidden">
        <div className="flex items-center gap-3 mb-3 p-2">
          <div className="w-9 h-9 bg-[var(--blue)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[13px] notched-sm">UT</div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] font-bold truncate">Umar Tijjani</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">Program Coord.</div>
          </div>
        </div>
        <button className="nav-item w-full text-left text-[12px]">
          <LogOut size={14} strokeWidth={2} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ title, subtitle, onMenuClick }) {
  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
      <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden text-[var(--navy)] p-1" aria-label="Open menu">
            <Menu size={20} strokeWidth={2.5} />
          </button>
          <div className="min-w-0">
            <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)] truncate">{title}</h1>
            <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1 truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button className="hidden md:flex items-center gap-2 px-3 py-2 border-2 border-[var(--border)] hover:border-[var(--navy)] text-[12px] font-semibold transition-colors">
            <span className="pill-yellow">Cohort A</span>
            <span className="text-[var(--text-soft)]">2026</span>
            <ChevronDown size={14} strokeWidth={2} className="text-[var(--text-mute)]" />
          </button>
          <button className="p-2 hover:bg-[var(--paper)] transition-colors text-[var(--text-soft)]" aria-label="Search"><Search size={18} strokeWidth={2} /></button>
          <button className="p-2 hover:bg-[var(--paper)] transition-colors text-[var(--text-soft)] relative" aria-label="Notifications">
            <Bell size={18} strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// KPI CARD
// ============================================================
function KPICard({ label, value, suffix, change, delta, detail }) {
  const isUp = delta === 'up';
  return (
    <div className="card notched-sm p-5 lift">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)]">{label}</span>
        <button className="text-[var(--text-mute)] hover:text-[var(--navy)]" aria-label="More"><MoreHorizontal size={14} strokeWidth={2} /></button>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">{value}</span>
        {suffix && <span className="text-[14px] font-bold text-[var(--text-mute)]">{suffix}</span>}
      </div>
      <div className="flex items-center justify-between">
        <span className={isUp ? 'pill-success' : 'pill-error'}>
          {isUp ? <TrendingUp size={10} className="inline mr-1" strokeWidth={2.5} /> : <TrendingDown size={10} className="inline mr-1" strokeWidth={2.5} />}
          {change}
        </span>
        <span className="text-[11px] text-[var(--text-mute)] font-medium">{detail}</span>
      </div>
    </div>
  );
}

// ============================================================
// CHART CARD WRAPPER
// ============================================================
function ChartCard({ kicker, title, action, children, height = 280 }) {
  return (
    <div className="card notched p-5 lg:p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <span className="pill-yellow mb-2 inline-block">{kicker}</span>
          <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">{title}</h3>
        </div>
        {action}
      </div>
      <div style={{ height }}>{children}</div>
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD
// ============================================================
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <Sidebar active={activeNav} setActive={setActiveNav} open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Overview"
          subtitle="Cohort A 2026 · Final Week · 8 days to graduation"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          {/* KPI ROW */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
            {KPIS.map((k, idx) => <KPICard key={idx} {...k} />)}
          </section>

          {/* CHARTS ROW 1: Submissions + Track Distribution */}
          <section className="grid lg:grid-cols-[1.6fr_1fr] gap-5 mb-6 reveal" style={{ animationDelay: '60ms' }}>
            <ChartCard
              kicker="§ 01 — Performance"
              title="Submission Performance"
              action={<span className="pill-blue">Weekly</span>}
              height={300}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUBMISSION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(33,150,243,0.06)' }} />
                  <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                  <Bar dataKey="onTime" name="On Time" fill="#2196F3" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="late" name="Late" fill="#FBC02D" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard
              kicker="§ 02 — Distribution"
              title="Interns by Track"
              height={300}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={TRACK_DISTRIBUTION}
                    cx="50%"
                    cy="48%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {TRACK_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    iconType="square"
                    wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          {/* CHARTS ROW 2: Engagement */}
          <section className="mb-6 reveal" style={{ animationDelay: '120ms' }}>
            <ChartCard
              kicker="§ 03 — Engagement"
              title="Weekly Active Interns & Sessions"
              action={<span className="pill-blue">Last 8 weeks</span>}
              height={260}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                  <Line yAxisId="left" type="monotone" dataKey="active" name="Active Interns" stroke="#1B2D5C" strokeWidth={3} dot={{ r: 4, fill: '#1B2D5C' }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="sessions" name="Total Sessions" stroke="#2196F3" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#2196F3' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </section>

          {/* CHARTS ROW 3: Track Performance + Activity */}
          <section className="grid lg:grid-cols-[1.3fr_1fr] gap-5 reveal" style={{ animationDelay: '180ms' }}>
            <ChartCard
              kicker="§ 04 — Track-based"
              title="Track Performance Comparison"
              height={320}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRACK_PERFORMANCE} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="track" tickLine={false} axisLine={false} width={75} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(33,150,243,0.06)' }} />
                  <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                  <Bar dataKey="score" name="Avg Score" fill="#2196F3" radius={[0, 3, 3, 0]} />
                  <Bar dataKey="completion" name="Completion %" fill="#1B2D5C" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <div className="card notched p-5 lg:p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="pill-yellow mb-2 inline-block">§ 05 — Live</span>
                  <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Recent Activity</h3>
                </div>
                <a href="#" className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue)] flex items-center gap-1 hover:text-[var(--navy)]">
                  View all <ArrowUpRight size={12} strokeWidth={2.5} />
                </a>
              </div>

              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {ACTIVITY.map((a, idx) => {
                  const dot = a.type === 'submission' ? '#2196F3'
                    : a.type === 'review' ? '#1B2D5C'
                    : a.type === 'mentor' ? '#FBC02D'
                    : a.type === 'flag' ? '#D32F2F'
                    : '#5A6B85';
                  return (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                      <div className="w-2 h-2 mt-2 flex-shrink-0" style={{ background: dot }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] leading-snug">
                          <span className="font-bold text-[var(--navy)]">{a.user}</span>
                          <span className="text-[var(--text-soft)] font-medium"> {a.action} </span>
                          <span className="font-semibold text-[var(--blue)]">{a.target}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="mono text-[10px] text-[var(--text-mute)] uppercase tracking-wider">{a.time}</span>
                          {a.track !== '·' && <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-mute)]">· {a.track}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Admin · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}
