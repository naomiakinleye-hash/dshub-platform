'use client';

import { useState } from 'react';
import {
  LayoutGrid, FileCheck, BarChart3, User, Settings, LogOut, Menu, X,
  Search, Bell, Edit, Linkedin, Github, Globe, Award, Sparkles,
  AlertCircle
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
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 12px 20px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-outline { background: transparent; color: var(--navy); padding: 12px 20px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    .btn-danger { background: transparent; color: var(--error); padding: 10px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--error); cursor: pointer; font-family: inherit; transition: background 200ms ease, color 200ms ease; }
    .btn-danger:hover { background: var(--error); color: var(--white); }
    .skill-chip { display: inline-flex; align-items: center; padding: 6px 12px; background: var(--paper-warm); border: 1px solid var(--border); font-size: 12px; font-weight: 600; color: var(--navy); }
    .tabular { font-variant-numeric: tabular-nums; }
  `}</style>
);

const PROFILE = {
  name: 'Adaeze Okonkwo',
  email: 'adaeze@dshub.com',
  avatar: null,
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

function Sidebar({ open, setOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/intern/analytics' },
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

export default function InternProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  const requestDeletion = async () => {
    // POST /api/intern/profile/delete-request
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
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)]"><Search size={18} /></button>
              <button className="p-2 text-[var(--text-soft)] hover:bg-[var(--paper)] relative"><Bell size={18} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full" /></button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {/* Profile card */}
          <section className="card notched p-6 lg:p-8 mb-5">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              <div className="w-24 h-24 bg-[var(--blue)] flex items-center justify-center text-[var(--navy)] font-extrabold text-[32px] notched-sm flex-shrink-0">
                {PROFILE.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">{PROFILE.name}</h2>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span className="pill-blue">{PROFILE.track}</span>
                  <span className="pill-yellow"><Sparkles size={9} className="inline mr-1" /> {PROFILE.plan}</span>
                </div>
                <p className="text-[14px] text-[var(--text-soft)] font-medium leading-relaxed max-w-2xl">{PROFILE.bio}</p>
              </div>
              <button className="btn-outline"><Edit size={13} strokeWidth={2.5} /> Edit</button>
            </div>

            <div className="border-t-2 border-[var(--border)] pt-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">Skills</div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          </section>

          {/* Mentor + Links */}
          <section className="grid lg:grid-cols-2 gap-5 mb-5">
            <div className="card notched p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award size={16} strokeWidth={2} className="text-[var(--blue)]" />
                <h3 className="font-extrabold text-[13px] uppercase tracking-[0.08em] text-[var(--navy)]">Your Mentor</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[16px] notched-sm">AA</div>
                <div className="leading-tight flex-1">
                  <div className="font-extrabold text-[15px] text-[var(--navy)]">{PROFILE.mentor}</div>
                  <div className="text-[12px] text-[var(--text-mute)] font-medium uppercase tracking-wider mt-1">Frontend · 9 yrs</div>
                </div>
              </div>
            </div>

            <div className="card notched p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-4">External Links</div>
              <div className="space-y-3">
                <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Linkedin size={15} strokeWidth={2} /> {PROFILE.linkedin}
                </a>
                <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Github size={15} strokeWidth={2} /> {PROFILE.github}
                </a>
                <a href={`https://${PROFILE.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)]">
                  <Globe size={15} strokeWidth={2} /> {PROFILE.portfolio}
                </a>
              </div>
            </div>
          </section>

          {/* Danger zone */}
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

      {/* Delete confirmation modal */}
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
