'use client';

import { useState } from 'react';
import {
  LayoutGrid, FileCheck, BarChart3, User, Settings, LogOut, Menu, X,
  Search, Bell, Edit, Linkedin, Github, Globe, Award, Sparkles,
  AlertCircle, Plus, ArrowRight, Check
} from 'lucide-react';

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
    :root {
      --navy: #1B2D5C; --navy-deep: #0D1B3F;
      --blue: #2196F3; --blue-deep: #0D6EBF; --blue-pale: #E3F2FD;
      --yellow: #FBC02D; --yellow-soft: #FFE082;
      --white: #FFFFFF; --paper: #F5F7FA; --paper-warm: #ECF1F7;
      --border: #DBE3EC; --text-mute: #5A6B85; --text-soft: #2C3E60;
      --error: #D32F2F; --success: #2E7D32;
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
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; text-decoration: none; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 12px 20px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-outline { background: transparent; color: var(--navy); padding: 12px 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    .btn-danger { background: transparent; color: var(--error); padding: 10px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--error); cursor: pointer; font-family: inherit; transition: background 200ms ease, color 200ms ease; }
    .btn-danger:hover { background: var(--error); color: var(--white); }
    .skill-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: var(--paper-warm); border: 1px solid var(--border); font-size: 12px; font-weight: 600; color: var(--navy); }
    .field { width: 100%; padding: 10px 12px; border: 2px solid var(--border); outline: none; font-size: 14px; color: var(--navy); font-family: inherit; font-weight: 500; }
    .field:focus { border-color: var(--blue); }
    .tabular { font-variant-numeric: tabular-nums; }
    @keyframes popIn { from { opacity: 0; transform: scale(0.97) translateY(-6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
    .pop-in { animation: popIn 160ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  `}</style>
);

const INITIAL_PROFILE = {
  name: 'Adaeze Okonkwo',
  email: 'adaeze@dshub.com',
  initials: 'AO',
  track: 'Frontend Development',
  plan: 'Premium',
  mentor: 'Engr Abdulrahman Abdulrahim',
  bio: 'Frontend engineer building accessible web apps with React and Next.js. Passionate about design systems, performance, and creating products that work for everyone.',
  skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Accessibility', 'Git'],
  linkedin: 'linkedin.com/in/adaeze-okonkwo',
  github: 'github.com/adaeze',
  portfolio: 'adaeze.dev',
};

const NOTIFICATIONS = [
  { id: 1, text: 'Mentor feedback posted on Week 4 (resubmit needed)', time: '4h ago', unread: true },
  { id: 2, text: 'Week 6 assignment is now open', time: '1d ago', unread: true },
  { id: 3, text: 'Week 3 approved · scored 95', time: '3d ago', unread: false },
];

function Sidebar({ open, setOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/intern' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, href: '/intern/submissions' },
    { id: 'analytics', label: 'My Analytics', icon: BarChart3, href: '/intern/analytics' },
    { id: 'profile', label: 'Profile', icon: User, active: true, href: '/intern/profile' },
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

function EditModal({ profile, onSave, onClose }) {
  const [form, setForm] = useState({ ...profile });
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s] }));
    }
    setSkillInput('');
  };
  const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }));

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white max-w-lg w-full notched p-6 lg:p-7 my-8 pop-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="pixel text-[24px] text-[var(--navy)]">Edit profile</h3>
          <button onClick={onClose} className="text-[var(--text-mute)] hover:text-[var(--navy)]" aria-label="Close"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Full name</label>
            <input className="field" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Bio</label>
            <textarea
              className="field resize-none" rows={4} maxLength={400}
              value={form.bio} onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
            />
            <div className="text-[10px] text-[var(--text-mute)] mono mt-1 text-right">{form.bio.length}/400</div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                className="field flex-1" value={skillInput} placeholder="Add a skill and press Enter"
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
              />
              <button onClick={addSkill} className="btn-outline px-4" type="button"><Plus size={14} strokeWidth={2.5} /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map(s => (
                <span key={s} className="skill-chip">
                  {s}
                  <button onClick={() => removeSkill(s)} className="text-[var(--text-mute)] hover:text-[var(--error)]" aria-label={`Remove ${s}`}><X size={12} strokeWidth={2.5} /></button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">LinkedIn</label>
            <input className="field" value={form.linkedin} onChange={(e) => setForm(f => ({ ...f, linkedin: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">GitHub</label>
            <input className="field" value={form.github} onChange={(e) => setForm(f => ({ ...f, github: e.target.value }))} />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Portfolio</label>
            <input className="field" value={form.portfolio} onChange={(e) => setForm(f => ({ ...f, portfolio: e.target.value }))} />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-7 pt-5 border-t-2 border-[var(--border)]">
          <button onClick={() => onSave(form)} className="btn-primary flex-1"><Check size={14} strokeWidth={2.5} /> Save changes</button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function InternProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const saveProfile = (next) => {
    // PUT /api/intern/profile
    setProfile(next);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const requestDeletion = () => {
    setDeleteRequested(true);
    setTimeout(() => setShowDelete(false), 2000);
  };

  return (
    <div className="dash-root min-h-screen flex">
      <Styles />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[var(--border)] sticky top-0 z-30">
          <div className="px-5 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--navy)] p-1"><Menu size={20} /></button>
              <div>
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">Profile</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">This is what appears on the public cohort page.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {saved && <span className="pill-success"><Check size={9} className="inline mr-1" strokeWidth={2.5} /> Saved</span>}
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
                        <span className="pill-success">2 new</span>
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
                  { href: '/intern', label: 'Dashboard' },
                  { href: '/intern/submissions', label: 'Current submission (Week 6)' },
                  { href: '/intern/analytics', label: 'My analytics & scores' },
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
          <section className="card notched p-6 lg:p-8 mb-5">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="w-24 h-24 bg-[var(--blue)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[32px] notched-sm flex-shrink-0">
                {profile.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">{profile.name}</h2>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="pill-blue">{profile.track}</span>
                  <span className="pill-yellow"><Sparkles size={9} className="inline mr-1" /> {profile.plan}</span>
                </div>
                <p className="text-[14px] text-[var(--text-soft)] font-medium leading-relaxed max-w-2xl">{profile.bio}</p>
              </div>
              <button onClick={() => setEditing(true)} className="btn-outline"><Edit size={13} strokeWidth={2.5} /> Edit</button>
            </div>

            <div className="border-t-2 border-[var(--border)] pt-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Skills</div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-5 mb-5">
            <div className="card notched p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} strokeWidth={2} className="text-[var(--blue)]" />
                <h3 className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Your Mentor</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[16px] notched-sm">AA</div>
                <div className="leading-tight flex-1">
                  <div className="font-extrabold text-[15px] text-[var(--navy)]">{profile.mentor}</div>
                  <div className="text-[12px] text-[var(--text-mute)] font-medium uppercase tracking-wider mt-1">Frontend · 9 yrs</div>
                </div>
              </div>
            </div>

            <div className="card notched p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-4">External Links</div>
              <div className="space-y-3">
                <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Linkedin size={15} strokeWidth={2} /> {profile.linkedin}
                </a>
                <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Github size={15} strokeWidth={2} /> {profile.github}
                </a>
                <a href={`https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Globe size={15} strokeWidth={2} /> {profile.portfolio}
                </a>
              </div>
            </div>
          </section>

          <section className="card notched p-6 border-2" style={{ borderColor: 'var(--error)' }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} strokeWidth={2} className="text-[var(--error)]" />
                  <h3 className="font-extrabold text-[14px] uppercase tracking-[0.08em] text-[var(--error)]">Danger Zone</h3>
                </div>
                <p className="text-[13px] text-[var(--text-soft)] font-medium max-w-xl">
                  Request profile deletion. An admin must approve the request. Your work will be archived for 30 days before permanent removal.
                </p>
              </div>
              {!deleteRequested ? (
                <button onClick={() => setShowDelete(true)} className="btn-danger">Request deletion</button>
              ) : (
                <span className="pill-yellow">Request submitted</span>
              )}
            </div>
          </section>
        </main>

        <footer className="bg-[var(--navy)] text-white text-center py-3 px-4 text-[12px] font-medium">
          DSHub Intern · <a href="https://internship.dshub.com.ng" className="font-bold italic underline">internship.dshub.com.ng</a>
        </footer>
      </div>

      {editing && <EditModal profile={profile} onSave={saveProfile} onClose={() => setEditing(false)} />}

      {showDelete && !deleteRequested && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowDelete(false)}>
          <div className="bg-white max-w-md w-full notched p-6 lg:p-8" onClick={(e) => e.stopPropagation()}>
            <AlertCircle size={28} strokeWidth={2} className="text-[var(--error)] mb-3" />
            <h3 className="pixel text-[24px] text-[var(--navy)] mb-3">Confirm deletion request</h3>
            <p className="text-[13px] text-[var(--text-soft)] font-medium mb-5 leading-relaxed">
              This sends a request to the admin team. You'll lose access to your work, mentor, and certificate once the request is approved. This action takes up to 7 days.
            </p>
            <div className="flex gap-3">
              <button onClick={requestDeletion} className="btn-danger flex-1">Yes, request deletion</button>
              <button onClick={() => setShowDelete(false)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
