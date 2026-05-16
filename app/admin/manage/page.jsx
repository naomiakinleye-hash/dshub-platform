'use client';

import { useState } from 'react';
import {
  LayoutGrid, Users, Award, FileCheck, BarChart3, Settings, LogOut, Menu, X,
  Search, Bell, Plus, Edit, Trash2, Check, AlertCircle, Code2, Database,
  Shield, Palette, Cpu, MoreHorizontal, Linkedin, Github, Globe, Mail,
  Eye, ChevronDown, Loader2, ChevronRight, ArrowLeft
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
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .tabular { font-variant-numeric: tabular-nums; }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-success { background: var(--success); color: var(--white); padding: 10px 16px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--success); cursor: pointer; font-family: inherit; transition: opacity 200ms ease; }
    .btn-success:hover { opacity: 0.9; }
    .btn-error { background: transparent; color: var(--error); padding: 10px 16px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--error); cursor: pointer; font-family: inherit; transition: background 200ms ease, color 200ms ease; }
    .btn-error:hover { background: var(--error); color: var(--white); }
    .btn-outline { background: transparent; color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .fade-in { animation: fadeIn 250ms ease both; }
  `}</style>
);

const ICONS = { Code2, Database, Shield, Palette, Cpu, BarChart3 };

const INITIAL_TRACKS = [
  { id: 't1', name: 'Frontend Development', icon: 'Code2', blurb: 'React, Next.js, design systems', interns: 14, mentors: 2, active: true },
  { id: 't2', name: 'Backend Engineering', icon: 'Database', blurb: 'APIs, databases, distributed systems', interns: 12, mentors: 2, active: true },
  { id: 't3', name: 'Cybersecurity', icon: 'Shield', blurb: 'OWASP, pentesting, threat modeling', interns: 9, mentors: 1, active: true },
  { id: 't4', name: 'Product Management', icon: 'BarChart3', blurb: 'Roadmaps, specs, stakeholder mgmt', interns: 11, mentors: 1, active: true },
  { id: 't5', name: 'UI/UX Design', icon: 'Palette', blurb: 'User research, prototyping, systems', interns: 10, mentors: 1, active: true },
  { id: 't6', name: 'Data Science', icon: 'Cpu', blurb: 'Analytics, ML, visualization', interns: 8, mentors: 1, active: true },
];

const INITIAL_MENTORS = [
  { id: 'a1', name: 'Engr Abdulrahman Abdulrahim', email: 'abdul@dshub.com', track: 'Frontend Development', years: 9, status: 'pending', applied: '2 days ago', focus: 'Full-stack architecture, React, Node.js', linkedin: '#', github: '#' },
  { id: 'a2', name: 'Funmi Adesope', email: 'funmi@dshub.com', track: 'Cybersecurity', years: 7, status: 'pending', applied: '3 days ago', focus: 'Cloud security, AWS GuardDuty, SIEM tooling', linkedin: '#', github: '#' },
  { id: 'a3', name: 'Daniel Eze', email: 'daniel@dshub.com', track: 'Backend Engineering', years: 11, status: 'pending', applied: '5 days ago', focus: 'Distributed systems, event-driven architecture, Kafka', linkedin: '#', github: '#' },
  { id: 'a4', name: 'Dr. Aisha Mohammed', email: 'aisha@dshub.com', track: 'Backend Engineering', years: 12, status: 'active', applied: 'Jan 2026', focus: 'Distributed systems, AWS architecture', linkedin: '#', github: '#' },
  { id: 'a5', name: 'Tobi Akinwale', email: 'tobi@dshub.com', track: 'Frontend Development', years: 8, status: 'active', applied: 'Jan 2026', focus: 'Design systems, accessibility', linkedin: '#', github: '#' },
  { id: 'a6', name: 'Victor John', email: 'victor@dshub.com', track: 'Cybersecurity', years: 10, status: 'active', applied: 'Feb 2026', focus: 'OWASP, pentesting, threat modeling', linkedin: '#', github: '#' },
  { id: 'a7', name: 'Lekan Ojo', email: 'lekan@dshub.com', track: 'Data Science', years: 4, status: 'rejected', applied: '1 week ago', focus: 'Junior data analyst, mostly tutorials', linkedin: '#', github: '#' },
];

function Sidebar({ open, setOpen, page, setPage }) {
  const items = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'interns', label: 'Interns', icon: Users, count: 64 },
    { id: 'mentors', label: 'Mentors', icon: Award, count: 12, badge: 3 },
    { id: 'tracks', label: 'Tracks', icon: FileCheck, count: 6 },
    { id: 'submissions', label: 'Submissions', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <aside className={`bg-[var(--navy)] text-white w-[240px] flex-shrink-0 flex flex-col fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white flex items-center justify-center text-[var(--navy)] font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2"><span className="font-extrabold text-[14px]">DSHub</span><span className="pill-yellow">Admin</span></div>
            <div className="text-[10px] text-white/60 mt-1 font-medium uppercase tracking-wider">Cohort A · 2026</div>
          </div>
        </a>
        <button onClick={() => setOpen(false)} className="lg:hidden text-white/70 p-1"><X size={18} /></button>
      </div>
      <nav className="flex-1 py-4">
        <div className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Workspace</div>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = page === item.id || (page === 'tracks' && item.id === 'tracks') || (page === 'mentors' && item.id === 'mentors');
          return (
            <button key={item.id} onClick={() => { setPage(item.id); setOpen(false); }} className={`nav-item w-full text-left ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              <span className="flex-1">{item.label}</span>
              {item.badge && <span className="bg-[var(--error)] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>}
              {item.count !== undefined && !item.badge && <span className="mono tabular text-[11px] font-bold text-white/60">{item.count}</span>}
            </button>
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
        <button className="nav-item w-full text-left text-[12px]"><LogOut size={14} /><span>Sign out</span></button>
      </div>
    </aside>
  );
}

// ============================================================
// TRACK CRUD
// ============================================================
function TrackEditor({ track, onSave, onClose }) {
  const [form, setForm] = useState(track || { name: '', icon: 'Code2', blurb: '', active: true });
  const isNew = !track;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 fade-in" onClick={onClose}>
      <div className="bg-white max-w-md w-full notched p-6 lg:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="pixel text-[24px] text-[var(--navy)]">{isNew ? 'New Track' : 'Edit Track'}</h3>
          <button onClick={onClose} className="text-[var(--text-mute)] hover:text-[var(--navy)]"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Track name</label>
            <input
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-semibold text-[14px] text-[var(--navy)]"
              placeholder="e.g. Mobile Development"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {Object.keys(ICONS).map(k => {
                const Icon = ICONS[k];
                const sel = form.icon === k;
                return (
                  <button
                    key={k} onClick={() => setForm({ ...form, icon: k })}
                    className={`aspect-square flex items-center justify-center border-2 transition-colors notched-sm ${sel ? 'bg-[var(--blue)] border-[var(--blue)]' : 'bg-white border-[var(--border)] hover:border-[var(--navy)]'}`}
                  >
                    <Icon size={18} strokeWidth={2} className={sel ? 'text-white' : 'text-[var(--navy)]'} />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Short blurb</label>
            <input
              value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[13px] text-[var(--text-soft)]"
              placeholder="e.g. iOS, Android, React Native"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="sr-only" />
            <span className={`w-11 h-6 relative transition-colors ${form.active ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white transition-transform ${form.active ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </span>
            <span className="text-[13px] font-semibold text-[var(--text-soft)]">Active and visible to interns</span>
          </label>
        </div>

        <div className="flex items-center gap-3 mt-7 pt-5 border-t-2 border-[var(--border)]">
          <button onClick={() => onSave(form)} disabled={!form.name.trim()} className="btn-primary flex-1">
            <Check size={13} strokeWidth={2.5} /> {isNew ? 'Create Track' : 'Save changes'}
          </button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function TracksPage() {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [editor, setEditor] = useState(null); // null | 'new' | track object

  const save = (track) => {
    if (track.id) {
      setTracks(prev => prev.map(t => t.id === track.id ? { ...t, ...track } : t));
    } else {
      setTracks(prev => [...prev, { ...track, id: `t${Date.now()}`, interns: 0, mentors: 0 }]);
    }
    setEditor(null);
  };

  const del = (id) => {
    if (confirm('Delete this track? Existing interns on this track will not be removed.')) {
      setTracks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="pill-yellow mb-2 inline-block">Track Management</span>
          <h2 className="pixel text-[26px] lg:text-[30px] leading-tight text-[var(--navy)]">All Tracks <span className="text-[var(--text-mute)] mono text-[18px]">({tracks.length})</span></h2>
        </div>
        <button onClick={() => setEditor('new')} className="btn-primary"><Plus size={14} strokeWidth={2.5} /> New Track</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map(t => {
          const Icon = ICONS[t.icon] || Code2;
          return (
            <div key={t.id} className="card notched-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-[var(--navy)] flex items-center justify-center notched-sm">
                  <Icon size={18} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditor(t)} className="p-1.5 text-[var(--text-mute)] hover:text-[var(--blue)]" aria-label="Edit"><Edit size={14} strokeWidth={2.2} /></button>
                  <button onClick={() => del(t.id)} className="p-1.5 text-[var(--text-mute)] hover:text-[var(--error)]" aria-label="Delete"><Trash2 size={14} strokeWidth={2.2} /></button>
                </div>
              </div>
              <h3 className="font-extrabold text-[15px] text-[var(--navy)] mb-1.5">{t.name}</h3>
              <p className="text-[12px] text-[var(--text-mute)] font-medium mb-4 leading-snug">{t.blurb}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-mute)]">
                  <span><span className="text-[var(--navy)] mono">{t.interns}</span> interns</span>
                  <span><span className="text-[var(--navy)] mono">{t.mentors}</span> mentors</span>
                </div>
                {t.active ? <span className="pill-success">Active</span> : <span className="pill-mute">Hidden</span>}
              </div>
            </div>
          );
        })}
      </div>

      {editor && <TrackEditor track={editor === 'new' ? null : editor} onSave={save} onClose={() => setEditor(null)} />}
    </>
  );
}

// ============================================================
// MENTOR APPROVAL
// ============================================================
function MentorsPage() {
  const [mentors, setMentors] = useState(INITIAL_MENTORS);
  const [filter, setFilter] = useState('pending');
  const [processing, setProcessing] = useState(null);

  const filtered = mentors.filter(m => m.status === filter);
  const counts = {
    pending: mentors.filter(m => m.status === 'pending').length,
    active: mentors.filter(m => m.status === 'active').length,
    rejected: mentors.filter(m => m.status === 'rejected').length,
  };

  const decide = async (id, decision) => {
    setProcessing(id);
    // POST /api/admin/mentors/{id}/{decision} with optional reason
    await new Promise(r => setTimeout(r, 700));
    setMentors(prev => prev.map(m => m.id === id ? { ...m, status: decision } : m));
    setProcessing(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <span className="pill-yellow mb-2 inline-block">Mentor Approval</span>
          <h2 className="pixel text-[26px] lg:text-[30px] leading-tight text-[var(--navy)]">
            Mentors <span className="text-[var(--text-mute)] mono text-[18px]">({mentors.length})</span>
          </h2>
        </div>
        {counts.pending > 0 && (
          <span className="pill-warn flex items-center gap-1.5 text-[11px] py-1.5 px-3">
            <AlertCircle size={11} strokeWidth={2.5} /> {counts.pending} awaiting your review
          </span>
        )}
      </div>

      <div className="flex gap-px bg-[var(--border)] mb-5 max-w-2xl">
        {[
          { id: 'pending', label: 'Pending', count: counts.pending },
          { id: 'active', label: 'Active', count: counts.active },
          { id: 'rejected', label: 'Rejected', count: counts.rejected },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-bold text-[12px] uppercase tracking-[0.08em] transition-colors ${filter === t.id ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)] hover:bg-[var(--paper-warm)]'}`}
          >
            {t.label} <span className="mono tabular opacity-70">({t.count})</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card notched p-10 text-center text-[var(--text-mute)] font-medium">No mentors in this state.</div>
        ) : (
          filtered.map(m => (
            <div key={m.id} className="card notched-sm p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[14px] notched-sm flex-shrink-0">
                  {m.name.split(' ').slice(-2).map(s => s[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-extrabold text-[15px] text-[var(--navy)]">{m.name}</h3>
                    <span className="pill-blue">{m.track}</span>
                    <span className="pill-mute">{m.years} yrs</span>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-[var(--text-mute)] font-medium flex-wrap">
                    <span className="flex items-center gap-1"><Mail size={11} /> {m.email}</span>
                    <span className="mono text-[10px] uppercase tracking-wider">Applied {m.applied}</span>
                  </div>
                </div>
                {m.status === 'pending' && <span className="pill-warn">Pending review</span>}
                {m.status === 'active' && <span className="pill-success">Active</span>}
                {m.status === 'rejected' && <span className="pill-error">Rejected</span>}
              </div>

              <div className="p-3.5 bg-[var(--paper-warm)] notched-sm border border-[var(--border)] mb-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] mb-1">Area of expertise</div>
                <p className="text-[13px] text-[var(--text-soft)] font-medium">{m.focus}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border)]">
                <a href={m.linkedin} className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--blue)] flex items-center gap-1.5 hover:text-[var(--navy)]"><Linkedin size={12} strokeWidth={2.5} /> LinkedIn</a>
                <a href={m.github} className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--blue)] flex items-center gap-1.5 hover:text-[var(--navy)]"><Github size={12} strokeWidth={2.5} /> GitHub</a>

                <div className="flex-1" />

                {m.status === 'pending' && (
                  <>
                    <button onClick={() => decide(m.id, 'rejected')} disabled={processing === m.id} className="btn-error">
                      <X size={13} strokeWidth={2.5} /> Reject
                    </button>
                    <button onClick={() => decide(m.id, 'active')} disabled={processing === m.id} className="btn-success">
                      {processing === m.id ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} strokeWidth={2.5} />} Approve
                    </button>
                  </>
                )}
                {m.status === 'rejected' && (
                  <button onClick={() => decide(m.id, 'active')} className="btn-outline"><RefreshCw size={13} strokeWidth={2.5} /> Reconsider</button>
                )}
                {m.status === 'active' && (
                  <button className="btn-outline"><Eye size={13} strokeWidth={2.5} /> View profile</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function AdminManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState('tracks'); // tracks | mentors

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} page={page} setPage={setPage} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
              <div>
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">
                  {page === 'tracks' ? 'Tracks' : 'Mentors'}
                </h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">
                  {page === 'tracks' ? 'Add, edit, archive program tracks' : 'Approve mentor applications and manage active mentors'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Page switcher */}
              <div className="hidden sm:flex border-2 border-[var(--border)]">
                <button
                  onClick={() => setPage('tracks')}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${page === 'tracks' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)]'}`}
                >Tracks</button>
                <button
                  onClick={() => setPage('mentors')}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${page === 'mentors' ? 'bg-[var(--navy)] text-white' : 'bg-white text-[var(--navy)]'}`}
                >Mentors</button>
              </div>
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]"><Search size={18} /></button>
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8 reveal">
          {page === 'tracks' ? <TracksPage /> : <MentorsPage />}
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Admin · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>
    </div>
  );
}

// Need RefreshCw for reconsider button
function RefreshCwIcon(props) { return <RefreshCw {...props} />; }
