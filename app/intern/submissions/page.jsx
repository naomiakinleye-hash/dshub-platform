'use client';

import { useState } from 'react';
import {
  LayoutGrid, FileText, BarChart3, User, Settings, LogOut, Menu, X,
  Upload, MessageSquare, CheckCircle2, AlertCircle,
  Clock, RefreshCw, Github, Globe, FileCheck, Loader2,
  Search, Bell, Calendar, BookOpen, Award
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
    .pill-mute { background: var(--paper-warm); color: var(--text-mute); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .field-input { width: 100%; background: transparent; border: none; outline: none; padding: 10px 0; font-size: 14px; color: var(--navy); font-family: inherit; font-weight: 500; }
    .field-wrap { border: 2px solid var(--border); padding: 0 12px; display: flex; align-items: center; gap: 10px; transition: border-color 200ms ease; }
    .field-wrap:focus-within { border-color: var(--blue); }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 12px 22px; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-outline { background: transparent; color: var(--navy); padding: 12px 22px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; text-decoration: none; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 700ms linear infinite; }
    @keyframes fadeSwap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .fade-swap { animation: fadeSwap 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  `}</style>
);

const WEEK_PROMPTS = [
  { week: 1, title: 'Setup & Foundations', desc: 'Set up your dev environment, initialize repos, and submit your first scaffold.' },
  { week: 2, title: 'Component Library', desc: 'Build a reusable component library matching the DSHub design system.' },
  { week: 3, title: 'Routing & State', desc: 'Wire up routing and global state. Submit a deployed preview.' },
  { week: 4, title: 'API Integration', desc: 'Connect to mock APIs and implement loading/error states.' },
  { week: 5, title: 'Authentication Flow', desc: 'Build login, signup, and password reset using the shared auth shell.' },
  { week: 6, title: 'Dashboard Module', desc: 'Implement a role-based dashboard with charts and live data.' },
  { week: 7, title: 'Polish & A11y', desc: 'Accessibility audit, mobile responsiveness, performance pass.' },
  { week: 8, title: 'Capstone Build', desc: 'Final capstone integration with backend and mentor review.' },
  { week: 9, title: 'Launch & Reflection', desc: 'Deploy final, document, and submit your retrospective.' },
];

const INITIAL_STATE = WEEK_PROMPTS.reduce((acc, w) => {
  const status =
    w.week <= 3 ? 'approved'
    : w.week === 4 ? 'resubmit'
    : w.week === 5 ? 'submitted'
    : w.week === 6 ? 'pending'
    : 'locked';
  acc[w.week] = {
    assignment: {
      status,
      liveLink: w.week <= 5 ? `https://w${w.week}-adaeze.vercel.app` : '',
      repo: w.week <= 5 ? `https://github.com/adaeze/dshub-w${w.week}` : '',
      file: w.week <= 4 ? `week-${w.week}-report.pdf` : '',
      notes: w.week <= 5 ? 'Submitted on time with full responsive testing.' : '',
      score: w.week <= 3 ? [92, 88, 95][w.week - 1] : null,
      feedback: w.week === 3 ? 'Excellent execution. State management was clean and your accessibility pass is the strongest in the cohort. Keep this rhythm for the dashboard week.'
        : w.week === 4 ? 'Strong start, but error states need work. Resubmit with proper boundary handling and toast notifications.'
        : '',
    },
    logbook: {
      status: w.week <= 4 ? 'approved' : w.week === 5 ? 'submitted' : w.week === 6 ? 'pending' : 'locked',
      content: w.week <= 5 ? 'This week I focused on... (3-5 paragraphs of reflection)' : '',
    },
  };
  return acc;
}, {});

const STATUS_LABEL = {
  approved: { label: 'Approved', cls: 'pill-success', Icon: CheckCircle2 },
  submitted: { label: 'Under Review', cls: 'pill-blue', Icon: Clock },
  pending: { label: 'Pending', cls: 'pill-warn', Icon: AlertCircle },
  resubmit: { label: 'Needs Resubmission', cls: 'pill-error', Icon: RefreshCw },
  rejected: { label: 'Rejected', cls: 'pill-error', Icon: AlertCircle },
  locked: { label: 'Locked', cls: 'pill-mute', Icon: Clock },
};

function Sidebar({ open, setOpen, active = 'submissions' }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/intern/analytics' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, badge: 'W6', href: '/intern/submissions' },
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
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</div>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <a key={item.id} href={item.href} className={`nav-item w-full text-left ${active === item.id ? 'active' : ''}`}>
              <Icon size={16} strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="pill-yellow">{item.badge}</span>}
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

function Header({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
      <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={onMenuClick} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
          <div className="min-w-0">
            <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">Submissions</h1>
            <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">Week 6 of 9 · Submit by Sunday 11:59 PM WAT</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]"><Search size={18} /></button>
          <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function InternSubmissions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeWeek, setActiveWeek] = useState(6);
  const [activeTab, setActiveTab] = useState('assignment');
  const [submissions, setSubmissions] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const weekData = submissions[activeWeek];
  const prompt = WEEK_PROMPTS[activeWeek - 1];
  const sub = weekData[activeTab];
  const status = STATUS_LABEL[sub.status];

  const updateField = (field, value) => {
    setSubmissions(prev => ({
      ...prev,
      [activeWeek]: { ...prev[activeWeek], [activeTab]: { ...prev[activeWeek][activeTab], [field]: value } },
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 900));
    updateField('status', 'submitted');
    setSubmitting(false);
  };

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          <div className="mb-6 overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0">
            <div className="flex gap-2 min-w-max">
              {WEEK_PROMPTS.map(w => {
                const isActive = activeWeek === w.week;
                const s = submissions[w.week].assignment.status;
                const isLocked = s === 'locked';
                const isDone = s === 'approved';
                return (
                  <button
                    key={w.week}
                    onClick={() => !isLocked && setActiveWeek(w.week)}
                    disabled={isLocked}
                    className={`flex items-center gap-2 px-4 py-2.5 notched-sm border-2 transition-all whitespace-nowrap font-bold text-[12px] uppercase tracking-[0.08em] ${
                      isActive ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                      : isLocked ? 'bg-[var(--paper-warm)] text-[var(--text-mute)] border-[var(--border)] cursor-not-allowed'
                      : 'bg-white text-[var(--navy)] border-[var(--border)] hover:border-[var(--navy)]'
                    }`}
                  >
                    <span>Week {String(w.week).padStart(2, '0')}</span>
                    {isDone && <CheckCircle2 size={13} strokeWidth={2.5} className="text-[var(--yellow)]" />}
                    {isLocked && <Clock size={12} strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card notched p-5 lg:p-6 mb-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <span className="pill-yellow mb-2 inline-block">Week {String(activeWeek).padStart(2, '0')}</span>
                <h2 className="pixel text-[26px] lg:text-[30px] leading-tight text-[var(--navy)]">{prompt.title}</h2>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[var(--text-mute)] font-medium">
                <Calendar size={14} /> Due 18 May 2026
              </div>
            </div>
            <p className="text-[14px] text-[var(--text-soft)] font-medium leading-relaxed">{prompt.desc}</p>
          </div>

          <div className="flex gap-px bg-[var(--border)] mb-5 max-w-md">
            <button
              onClick={() => setActiveTab('assignment')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-[12px] uppercase tracking-[0.08em] transition-colors ${activeTab === 'assignment' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--paper-warm)]'}`}
            >
              <FileText size={14} strokeWidth={2.2} /> Assignment
            </button>
            <button
              onClick={() => setActiveTab('logbook')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-[12px] uppercase tracking-[0.08em] transition-colors ${activeTab === 'logbook' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--paper-warm)]'}`}
            >
              <BookOpen size={14} strokeWidth={2.2} /> Logbook
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-5 fade-swap" key={`${activeWeek}-${activeTab}`}>
            <section className="card notched p-5 lg:p-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-extrabold text-[16px] text-[var(--navy)]">{activeTab === 'assignment' ? 'Assignment Submission' : 'Weekly Logbook'}</h3>
                <span className={status.cls}><status.Icon size={10} className="inline mr-1" strokeWidth={2.5} /> {status.label}</span>
              </div>

              {activeTab === 'assignment' ? (
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Project file</label>
                    <label className="block border-2 border-dashed border-[var(--border)] p-5 text-center cursor-pointer hover:border-[var(--navy)] transition-colors notched-sm">
                      <Upload size={20} strokeWidth={2} className="text-[var(--text-mute)] mx-auto mb-2" />
                      <div className="text-[13px] font-semibold text-[var(--navy)]">
                        {sub.file ? sub.file : 'Drop file or click to upload'}
                      </div>
                      <div className="text-[11px] text-[var(--text-mute)] mt-1 font-medium">PDF, ZIP, or report · max 25MB</div>
                      <input type="file" className="hidden" onChange={(e) => updateField('file', e.target.files?.[0]?.name || '')} />
                    </label>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Deployed link</label>
                    <div className="field-wrap notched-sm">
                      <Globe size={15} className="text-[var(--text-mute)]" />
                      <input
                        value={sub.liveLink} onChange={(e) => updateField('liveLink', e.target.value)}
                        className="field-input" placeholder="https://your-project.vercel.app"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">GitHub repository</label>
                    <div className="field-wrap notched-sm">
                      <Github size={15} className="text-[var(--text-mute)]" />
                      <input
                        value={sub.repo} onChange={(e) => updateField('repo', e.target.value)}
                        className="field-input" placeholder="https://github.com/you/project"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Notes for your mentor</label>
                    <textarea
                      value={sub.notes} onChange={(e) => updateField('notes', e.target.value)}
                      rows={4} maxLength={600}
                      className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[14px] text-[var(--navy)] resize-none"
                      placeholder="Anything they should know before reviewing. Tradeoffs, known issues, things you'd want feedback on."
                      style={{ fontFamily: 'inherit' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">This week's reflection</label>
                    <textarea
                      value={sub.content} onChange={(e) => updateField('content', e.target.value)}
                      rows={10}
                      className="w-full p-4 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[14px] text-[var(--text-soft)] resize-none leading-relaxed"
                      placeholder="What did you build this week? What broke? What did you learn? Anything you want to ask your mentor about?"
                      style={{ fontFamily: 'inherit' }}
                    />
                  </div>
                  <div className="p-3 bg-[var(--paper-warm)] notched-sm border border-[var(--border)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] mb-1.5">Logbook prompts</div>
                    <ul className="text-[12px] text-[var(--text-mute)] font-medium space-y-1">
                      <li>· What was the hardest problem this week?</li>
                      <li>· What did you ship that you're proud of?</li>
                      <li>· What's blocking you for next week?</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-7 pt-5 border-t-2 border-[var(--border)]">
                <button onClick={handleSubmit} disabled={submitting || sub.status === 'approved'} className="btn-primary">
                  {submitting ? (
                    <><Loader2 size={14} className="spin" /><span>Submitting…</span></>
                  ) : sub.status === 'resubmit' ? (
                    <><RefreshCw size={14} strokeWidth={2.5} /><span>Resubmit</span></>
                  ) : (
                    <><FileCheck size={14} strokeWidth={2.5} /><span>Submit for review</span></>
                  )}
                </button>
                <button className="btn-outline">Save draft</button>
                <span className="text-[11px] text-[var(--text-mute)] mono ml-auto">
                  {sub.status === 'approved' ? 'Submitted 12 May · 02:14 PM' : ''}
                </span>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="card notched-sm p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} strokeWidth={2} className="text-[var(--blue)]" />
                  <h4 className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Mentor Feedback</h4>
                </div>
                {sub.score !== null && sub.feedback ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="pixel tabular text-[44px] leading-none text-[var(--navy)]">{sub.score}</span>
                      <span className="text-[13px] font-bold text-[var(--text-mute)]">/100</span>
                    </div>
                    <div className="h-[2px] bg-[var(--blue)] w-12 mb-3" />
                    <p className="text-[13px] text-[var(--text-soft)] font-medium leading-relaxed mb-4">{sub.feedback}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-mute)] mono">
                      <MessageSquare size={11} /> Engr Abdulrahman · 2d ago
                    </div>
                  </>
                ) : sub.feedback ? (
                  <>
                    <span className="pill-error mb-3">Action needed</span>
                    <p className="text-[13px] text-[var(--text-soft)] font-medium leading-relaxed mt-3 mb-4">{sub.feedback}</p>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-mute)] mono">
                      <MessageSquare size={11} /> Engr Abdulrahman · 4h ago
                    </div>
                  </>
                ) : (
                  <p className="text-[13px] text-[var(--text-mute)] font-medium">Feedback will appear here once your mentor reviews this submission.</p>
                )}
              </div>

              <div className="card notched-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <User size={16} strokeWidth={2} className="text-[var(--blue)]" />
                  <h4 className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Your Mentor</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[13px] notched-sm">AA</div>
                  <div className="leading-tight">
                    <div className="font-bold text-[13px] text-[var(--navy)]">Engr Abdulrahman</div>
                    <div className="text-[11px] text-[var(--text-mute)] font-medium uppercase tracking-wider">Frontend · 9 yrs</div>
                  </div>
                </div>
                <a href="mailto:abdulrahman@dshub.com?subject=Question about Week 6 submission" className="btn-outline mt-4 w-full text-[11px] py-2.5"><MessageSquare size={12} strokeWidth={2.5} /> Message</a>
              </div>
            </aside>
          </div>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Intern · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}