'use client';

import { useState } from 'react';
import {
  LayoutGrid, Users, FileCheck, BarChart3, User, Settings, LogOut, Menu, X,
  ChevronDown, ChevronRight, ArrowLeft, Search, Bell, Sparkles, Award,
  CheckCircle2, AlertCircle, Clock, RefreshCw, MessageSquare, Star,
  Github, Globe, FileText, BookOpen, Send
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
    .pill-navy { background: var(--navy); color: var(--white); font-weight: 700; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; display: inline-block; }
    .pill-success { background: rgba(46,125,50,0.12); color: var(--success); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-error { background: rgba(211,47,47,0.12); color: var(--error); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-warn { background: rgba(237,108,2,0.12); color: var(--warn); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .pill-mute { background: var(--paper-warm); color: var(--text-mute); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .lift { transition: transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .lift:hover { transform: translateY(-2px); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .tabular { font-variant-numeric: tabular-nums; }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-success { background: var(--success); color: var(--white); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--success); cursor: pointer; font-family: inherit; transition: opacity 200ms ease; }
    .btn-success:hover { opacity: 0.9; }
    .btn-warn { background: var(--warn); color: var(--white); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--warn); cursor: pointer; font-family: inherit; transition: opacity 200ms ease; }
    .btn-warn:hover { opacity: 0.9; }
    .btn-error { background: transparent; color: var(--error); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--error); cursor: pointer; font-family: inherit; transition: background 200ms ease, color 200ms ease; }
    .btn-error:hover { background: var(--error); color: var(--white); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .fade-in { animation: fadeIn 250ms ease both; }
  `}</style>
);

const MENTOR_KPIS = [
  { label: 'Assigned Interns', value: 6 },
  { label: 'Premium', value: 4 },
  { label: 'Pending Reviews', value: 7, accent: 'warn' },
  { label: 'Reviews Completed', value: 23 },
];

const INTERNS = [
  // Premium
  { id: 'i1', name: 'Adaeze Okonkwo', initials: 'AO', plan: 'premium', track: 'Frontend', progress: 89, pending: 2, lastActive: '12m ago', avgScore: 92 },
  { id: 'i2', name: 'Folake Adesina', initials: 'FA', plan: 'premium', track: 'Frontend', progress: 78, pending: 1, lastActive: '2h ago', avgScore: 86 },
  { id: 'i3', name: 'Chiamaka Nwosu', initials: 'CN', plan: 'premium', track: 'Frontend', progress: 95, pending: 0, lastActive: '8m ago', avgScore: 94 },
  { id: 'i4', name: 'Yetunde Bello', initials: 'YB', plan: 'premium', track: 'Frontend', progress: 67, pending: 3, lastActive: '1d ago', avgScore: 81 },
  // Regular
  { id: 'i5', name: 'Tunde Adebayo', initials: 'TA', plan: 'regular', track: 'Frontend', progress: 71, pending: 1, lastActive: '5h ago', avgScore: 84 },
  { id: 'i6', name: 'Halima Sani', initials: 'HS', plan: 'regular', track: 'Frontend', progress: 83, pending: 0, lastActive: '30m ago', avgScore: 88 },
];

const SUBMISSIONS_BY_INTERN = {
  i1: [
    { week: 1, type: 'assignment', status: 'approved', score: 92, submittedAt: '12 May 02:14 PM', liveLink: 'https://w1-adaeze.vercel.app', repo: 'github.com/adaeze/w1' },
    { week: 1, type: 'logbook', status: 'approved', submittedAt: '12 May 03:00 PM' },
    { week: 2, type: 'assignment', status: 'approved', score: 88, submittedAt: '19 May 04:12 PM', liveLink: 'https://w2-adaeze.vercel.app', repo: 'github.com/adaeze/w2' },
    { week: 2, type: 'logbook', status: 'approved', submittedAt: '19 May 06:30 PM' },
    { week: 3, type: 'assignment', status: 'approved', score: 95, submittedAt: '26 May 01:00 PM', liveLink: 'https://w3-adaeze.vercel.app', repo: 'github.com/adaeze/w3' },
    { week: 3, type: 'logbook', status: 'approved', submittedAt: '26 May 02:00 PM' },
    { week: 4, type: 'assignment', status: 'resubmit', submittedAt: '02 Jun 11:30 PM', liveLink: 'https://w4-adaeze.vercel.app', repo: 'github.com/adaeze/w4', feedback: 'Strong start, but error states need work.' },
    { week: 4, type: 'logbook', status: 'approved', submittedAt: '02 Jun 11:55 PM' },
    { week: 5, type: 'assignment', status: 'submitted', submittedAt: '09 Jun 09:14 PM', liveLink: 'https://w5-adaeze.vercel.app', repo: 'github.com/adaeze/w5' },
    { week: 5, type: 'logbook', status: 'submitted', submittedAt: '09 Jun 09:30 PM' },
    { week: 6, type: 'assignment', status: 'pending' },
    { week: 6, type: 'logbook', status: 'pending' },
  ],
};

const STATUS_LABEL = {
  approved: { label: 'Approved', cls: 'pill-success', Icon: CheckCircle2 },
  submitted: { label: 'Awaiting Review', cls: 'pill-blue', Icon: Clock },
  pending: { label: 'Not Submitted', cls: 'pill-mute', Icon: Clock },
  resubmit: { label: 'Resubmit Requested', cls: 'pill-error', Icon: RefreshCw },
};

function Sidebar({ open, setOpen, active }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'interns', label: 'My Interns', icon: Users, count: 6 },
    { id: 'queue', label: 'Review Queue', icon: FileCheck, count: 7 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <aside className={`bg-[var(--navy)] text-white w-[240px] flex-shrink-0 flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white flex items-center justify-center text-[var(--navy)] font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2"><span className="font-extrabold text-[14px]">DSHub</span><span className="pill-yellow">Mentor</span></div>
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
            <button key={item.id} className={`nav-item w-full text-left ${active === item.id ? 'active' : ''}`}>
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>
              {item.count !== undefined && <span className="mono tabular text-[11px] font-bold text-white/60">{item.count}</span>}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 p-2">
          <div className="w-9 h-9 bg-[var(--yellow)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[13px] notched-sm">AA</div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] font-bold truncate">Engr Abdulrahman</div>
            <div className="text-[10px] text-white/60 uppercase tracking-wider">Mentor · Frontend</div>
          </div>
        </div>
        <button className="nav-item w-full text-left text-[12px]"><LogOut size={14} /><span>Sign out</span></button>
      </div>
    </aside>
  );
}

function InternCard({ intern, onOpen }) {
  return (
    <button onClick={() => onOpen(intern)} className="card notched-sm p-5 lift text-left w-full group" style={{ fontFamily: 'inherit' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[14px] notched-sm">{intern.initials}</div>
          <div>
            <div className="font-extrabold text-[14px] text-[var(--navy)] leading-tight">{intern.name}</div>
            <div className="flex items-center gap-1.5 mt-1">
              {intern.plan === 'premium' ? <span className="pill-yellow"><Sparkles size={9} className="inline mr-1" /> Premium</span> : <span className="pill-blue">Regular</span>}
            </div>
          </div>
        </div>
        <ChevronRight size={16} strokeWidth={2.5} className="text-[var(--text-mute)] group-hover:text-[var(--navy)] transition-colors" />
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-mute)] mb-1.5">
          <span>Progress</span>
          <span className="mono tabular text-[var(--navy)]">{intern.progress}%</span>
        </div>
        <div className="h-1.5 bg-[var(--border)]">
          <div className="h-full bg-[var(--blue)]" style={{ width: `${intern.progress}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          {intern.pending > 0 ? (
            <span className="pill-warn"><AlertCircle size={9} className="inline mr-1" strokeWidth={2.5} /> {intern.pending} pending</span>
          ) : (
            <span className="pill-success">All caught up</span>
          )}
        </div>
        <span className="mono text-[10px] text-[var(--text-mute)] uppercase tracking-wider">{intern.lastActive}</span>
      </div>
    </button>
  );
}

function GradingPanel({ intern, onClose }) {
  const subs = SUBMISSIONS_BY_INTERN[intern.id] || [];
  const [activeWeek, setActiveWeek] = useState(5);
  const [grading, setGrading] = useState(false);
  const [score, setScore] = useState('');
  const [comment, setComment] = useState('');

  const weekSubs = subs.filter(s => s.week === activeWeek);
  const assignment = weekSubs.find(s => s.type === 'assignment');
  const logbook = weekSubs.find(s => s.type === 'logbook');

  const submitGrade = async (action) => {
    setGrading(true);
    // POST /api/submissions/{id}/grade with { action, score, comment }
    await new Promise(r => setTimeout(r, 700));
    setGrading(false);
    setScore(''); setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-stretch justify-end fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <header className="sticky top-0 bg-white border-b border-[var(--border)] z-10">
          <div className="p-5 flex items-center justify-between gap-4">
            <button onClick={onClose} className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)] hover:text-[var(--navy)]">
              <ArrowLeft size={14} strokeWidth={2.5} /> Back to interns
            </button>
            <button onClick={onClose} className="text-[var(--text-mute)] hover:text-[var(--navy)]"><X size={20} /></button>
          </div>
          <div className="px-5 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[16px] notched-sm">{intern.initials}</div>
              <div className="flex-1 min-w-0">
                <h2 className="pixel text-[26px] text-[var(--navy)] leading-tight">{intern.name}</h2>
                <div className="flex items-center gap-2 flex-wrap mt-1.5">
                  {intern.plan === 'premium' ? <span className="pill-yellow"><Sparkles size={9} className="inline mr-1" /> Premium</span> : <span className="pill-blue">Regular</span>}
                  <span className="pill-navy">{intern.track}</span>
                  <span className="pill-success">Avg {intern.avgScore}/100</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-7">
          {/* Week selector */}
          <div className="overflow-x-auto mb-5 -mx-5 px-5">
            <div className="flex gap-2 min-w-max">
              {Array.from({ length: 9 }, (_, i) => i + 1).map(w => {
                const ws = subs.filter(s => s.week === w);
                const allApproved = ws.length === 2 && ws.every(s => s.status === 'approved');
                const hasPending = ws.some(s => s.status === 'submitted' || s.status === 'resubmit');
                return (
                  <button
                    key={w}
                    onClick={() => setActiveWeek(w)}
                    className={`px-3.5 py-2 notched-sm border-2 font-bold text-[11px] uppercase tracking-[0.08em] whitespace-nowrap flex items-center gap-1.5 ${
                      activeWeek === w ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                      : 'bg-white text-[var(--navy)] border-[var(--border)] hover:border-[var(--navy)]'
                    }`}
                  >
                    W{String(w).padStart(2, '0')}
                    {allApproved && <CheckCircle2 size={11} className="text-[var(--yellow)]" strokeWidth={2.5} />}
                    {hasPending && activeWeek !== w && <span className="w-1.5 h-1.5 bg-[var(--warn)] rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submission cards */}
          {[assignment, logbook].filter(Boolean).map(s => {
            const meta = STATUS_LABEL[s.status];
            const isReviewable = s.status === 'submitted' || s.status === 'resubmit';
            return (
              <div key={s.type} className="card notched p-5 lg:p-6 mb-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-2.5">
                    {s.type === 'assignment' ? <FileText size={18} strokeWidth={2} className="text-[var(--blue)]" /> : <BookOpen size={18} strokeWidth={2} className="text-[var(--blue)]" />}
                    <h3 className="font-extrabold text-[15px] text-[var(--navy)]">{s.type === 'assignment' ? 'Assignment' : 'Logbook'}</h3>
                    {s.score && <span className="pill-success">{s.score}/100</span>}
                  </div>
                  <span className={meta.cls}><meta.Icon size={10} className="inline mr-1" strokeWidth={2.5} /> {meta.label}</span>
                </div>

                {s.status === 'pending' ? (
                  <p className="text-[13px] text-[var(--text-mute)] font-medium italic">Not yet submitted.</p>
                ) : (
                  <>
                    {s.type === 'assignment' ? (
                      <div className="space-y-2.5 mb-4">
                        {s.liveLink && (
                          <a href="#" className="flex items-center gap-2.5 p-3 bg-[var(--paper-warm)] notched-sm border border-[var(--border)] hover:border-[var(--navy)] transition-colors">
                            <Globe size={15} className="text-[var(--blue)]" strokeWidth={2} />
                            <span className="text-[13px] font-semibold text-[var(--navy)] truncate flex-1">{s.liveLink}</span>
                            <ChevronRight size={14} className="text-[var(--text-mute)]" />
                          </a>
                        )}
                        {s.repo && (
                          <a href="#" className="flex items-center gap-2.5 p-3 bg-[var(--paper-warm)] notched-sm border border-[var(--border)] hover:border-[var(--navy)] transition-colors">
                            <Github size={15} className="text-[var(--navy)]" strokeWidth={2} />
                            <span className="text-[13px] font-semibold text-[var(--navy)] truncate flex-1">{s.repo}</span>
                            <ChevronRight size={14} className="text-[var(--text-mute)]" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 bg-[var(--paper-warm)] notched-sm border border-[var(--border)] mb-4">
                        <p className="text-[13px] text-[var(--text-soft)] font-medium leading-relaxed">
                          This week I focused on the dashboard module. The hardest problem was nested context providers...
                          <span className="text-[var(--blue)] font-semibold cursor-pointer ml-1">Read full entry →</span>
                        </p>
                      </div>
                    )}

                    {s.feedback && (
                      <div className="p-3 bg-[rgba(211,47,47,0.05)] border-l-[3px] border-[var(--error)] mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--error)] mb-1">Previous feedback</div>
                        <p className="text-[13px] text-[var(--text-soft)] font-medium">{s.feedback}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-mute)] mono">
                      <Clock size={11} /> Submitted {s.submittedAt}
                    </div>

                    {/* Grading section — only for reviewable items */}
                    {isReviewable && (
                      <div className="mt-5 pt-5 border-t-2 border-dashed border-[var(--border)]">
                        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Your review</div>

                        {s.type === 'assignment' && (
                          <div className="grid grid-cols-[120px_1fr] gap-3 mb-3">
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] block mb-1">Score</label>
                              <div className="flex items-center border-2 border-[var(--border)] px-3 py-2 focus-within:border-[var(--blue)]">
                                <input
                                  type="number" min="0" max="100" value={score}
                                  onChange={(e) => setScore(e.target.value)}
                                  className="w-full outline-none font-bold text-[20px] text-[var(--navy)] mono"
                                  placeholder="0" style={{ fontFamily: 'DM Mono, monospace' }}
                                />
                                <span className="text-[12px] font-bold text-[var(--text-mute)] mono">/100</span>
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] block mb-1">Quick scores</label>
                              <div className="flex gap-1.5 flex-wrap">
                                {[70, 80, 90, 95].map(v => (
                                  <button key={v} onClick={() => setScore(String(v))} className="px-3 py-2 border-2 border-[var(--border)] hover:border-[var(--navy)] mono text-[12px] font-bold text-[var(--navy)] bg-white">{v}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-soft)] block mb-1">Feedback for the intern</label>
                        <textarea
                          value={comment} onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[13px] text-[var(--text-soft)] resize-none mb-4"
                          placeholder="Be specific. Call out what worked, what to change, and one thing to try next week."
                          style={{ fontFamily: 'inherit' }}
                        />

                        <div className="flex flex-wrap items-center gap-2">
                          <button onClick={() => submitGrade('approve')} disabled={grading} className="btn-success">
                            <CheckCircle2 size={13} strokeWidth={2.5} /> Approve
                          </button>
                          <button onClick={() => submitGrade('resubmit')} disabled={grading} className="btn-warn">
                            <RefreshCw size={13} strokeWidth={2.5} /> Request Resubmit
                          </button>
                          <button onClick={() => submitGrade('reject')} disabled={grading} className="btn-error">
                            <AlertCircle size={13} strokeWidth={2.5} /> Reject
                          </button>
                          <button className="btn-primary ml-auto">
                            <MessageSquare size={13} strokeWidth={2.5} /> Comment Only
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MentorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState('premium');
  const [openIntern, setOpenIntern] = useState(null);

  const filtered = INTERNS.filter(i => i.plan === tab);

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} active="dashboard" />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
              <div>
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">My Interns</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">Frontend track · 6 assigned · 7 reviews waiting</p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]"><Search size={18} /></button>
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {/* KPI Row */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
            {MENTOR_KPIS.map((k, i) => (
              <div key={i} className="card notched-sm p-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{k.label}</div>
                <div className="pixel tabular text-[40px] leading-none text-[var(--navy)] mb-3">{String(k.value).padStart(2, '0')}</div>
                {k.accent === 'warn' ? <span className="pill-warn"><AlertCircle size={9} className="inline mr-1" strokeWidth={2.5} /> Action needed</span> : <span className="pill-success">On track</span>}
              </div>
            ))}
          </section>

          {/* Tabs */}
          <div className="flex gap-px bg-[var(--border)] mb-5 max-w-md reveal" style={{ animationDelay: '60ms' }}>
            <button
              onClick={() => setTab('premium')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-[12px] uppercase tracking-[0.08em] transition-colors ${tab === 'premium' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--paper-warm)]'}`}
            >
              <Sparkles size={13} strokeWidth={2.5} /> Premium ({INTERNS.filter(i => i.plan === 'premium').length})
            </button>
            <button
              onClick={() => setTab('regular')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-[12px] uppercase tracking-[0.08em] transition-colors ${tab === 'regular' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--paper-warm)]'}`}
            >
              <Award size={13} strokeWidth={2.5} /> Regular ({INTERNS.filter(i => i.plan === 'regular').length})
            </button>
          </div>

          {/* Intern grid */}
          <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 reveal" style={{ animationDelay: '120ms' }}>
            {filtered.map(i => <InternCard key={i.id} intern={i} onOpen={setOpenIntern} />)}
          </section>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Mentor · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>

      {openIntern && <GradingPanel intern={openIntern} onClose={() => setOpenIntern(null)} />}
    </div>
  );
}
