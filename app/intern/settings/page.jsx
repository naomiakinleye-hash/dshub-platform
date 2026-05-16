'use client';

import { useState } from 'react';
import {
  LayoutGrid, FileCheck, BarChart3, User, Settings, LogOut, Menu, X,
  Search, Bell, Lock, Mail, Eye, AlertCircle, Check
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
    .pill-success { background: rgba(46,125,50,0.12); color: var(--success); font-weight: 700; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; display: inline-block; }
    .card { background: var(--white); border: 1px solid var(--border); }
    .nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; font-weight: 600; font-size: 13px; color: rgba(255,255,255,0.7); cursor: pointer; transition: background 200ms ease, color 200ms ease; border-left: 3px solid transparent; }
    .nav-item:hover { color: var(--white); background: rgba(255,255,255,0.04); }
    .nav-item.active { color: var(--white); background: rgba(33,150,243,0.18); border-left-color: var(--yellow); }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-primary:hover { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-outline { background: transparent; color: var(--navy); padding: 11px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    .field-wrap { border: 2px solid var(--border); padding: 0 12px; display: flex; align-items: center; gap: 10px; transition: border-color 200ms ease; }
    .field-wrap:focus-within { border-color: var(--blue); }
    .field-input { width: 100%; background: transparent; border: none; outline: none; padding: 10px 0; font-size: 14px; color: var(--navy); font-family: inherit; font-weight: 500; }
  `}</style>
);

function Sidebar({ open, setOpen }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/intern' },
    { id: 'submissions', label: 'Submissions', icon: FileCheck, href: '/intern/submissions' },
    { id: 'analytics', label: 'My Analytics', icon: BarChart3, href: '/intern/analytics' },
    { id: 'profile', label: 'Profile', icon: User, href: '/intern/profile' },
    { id: 'settings', label: 'Settings', icon: Settings, active: true, href: '/intern/settings' },
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

function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`w-11 h-6 relative transition-colors ${value ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`}
      aria-pressed={value}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white transition-transform ${value ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function InternSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [mentorMsg, setMentorMsg] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    // POST /api/intern/settings
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
                <h1 className="pixel text-[22px] lg:text-[26px] leading-none text-[var(--navy)]">Settings</h1>
                <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">Account, notifications, and privacy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {saved && <span className="pill-success"><Check size={9} className="inline mr-1" strokeWidth={2.5} /> Saved</span>}
              <button onClick={save} className="btn-primary">Save changes</button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8 space-y-5">
          {/* Account */}
          <section className="card notched p-6 lg:p-7">
            <span className="pill-yellow mb-3 inline-block">Account</span>
            <h2 className="pixel text-[24px] text-[var(--navy)] mb-5">Your account</h2>

            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Email address</label>
                <div className="field-wrap notched-sm">
                  <Mail size={15} className="text-[var(--text-mute)]" />
                  <input value="adaeze@dshub.com" readOnly className="field-input" />
                  <span className="pill-blue">Verified</span>
                </div>
                <p className="text-[11px] text-[var(--text-mute)] font-medium mt-1.5">Email changes require admin approval to prevent account hijacks.</p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Password</label>
                <div className="field-wrap notched-sm">
                  <Lock size={15} className="text-[var(--text-mute)]" />
                  <input value="••••••••••••" readOnly className="field-input" />
                  <a href="/forgot-password" className="text-[12px] font-bold uppercase tracking-wider text-[var(--blue)]">Change</a>
                </div>
                <p className="text-[11px] text-[var(--text-mute)] font-medium mt-1.5">Last changed 24 days ago.</p>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="card notched p-6 lg:p-7">
            <span className="pill-yellow mb-3 inline-block">Notifications</span>
            <h2 className="pixel text-[24px] text-[var(--navy)] mb-5">When should we notify you?</h2>

            <div className="divide-y divide-[var(--border)]">
              {[
                { label: 'Email notifications', desc: 'Submission status, mentor feedback, deadlines', val: emailNotifs, set: setEmailNotifs },
                { label: 'Push notifications', desc: 'Real-time alerts in your browser', val: pushNotifs, set: setPushNotifs },
                { label: 'Mentor messages', desc: 'Direct messages from your mentor', val: mentorMsg, set: setMentorMsg },
                { label: 'Weekly digest', desc: 'Summary of your activity every Sunday', val: weeklyDigest, set: setWeeklyDigest },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-bold text-[14px] text-[var(--navy)]">{row.label}</div>
                    <div className="text-[12px] text-[var(--text-mute)] font-medium mt-0.5">{row.desc}</div>
                  </div>
                  <Toggle value={row.val} onChange={row.set} />
                </div>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section className="card notched p-6 lg:p-7">
            <span className="pill-yellow mb-3 inline-block">Privacy</span>
            <h2 className="pixel text-[24px] text-[var(--navy)] mb-5">Who can see your profile?</h2>

            <div className="divide-y divide-[var(--border)]">
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="font-bold text-[14px] text-[var(--navy)]">Public profile on cohort page</div>
                  <div className="text-[12px] text-[var(--text-mute)] font-medium mt-0.5">Visible to anyone with the link</div>
                </div>
                <Toggle value={publicProfile} onChange={setPublicProfile} />
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <div className="font-bold text-[14px] text-[var(--navy)]">Show my email to other interns</div>
                  <div className="text-[12px] text-[var(--text-mute)] font-medium mt-0.5">Off by default. Mentors can still see it.</div>
                </div>
                <Toggle value={showEmail} onChange={setShowEmail} />
              </div>
            </div>
          </section>

          {/* Danger zone */}
          <section className="card notched p-6 lg:p-7 border-2" style={{ borderColor: 'var(--error)' }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} strokeWidth={2} className="text-[var(--error)]" />
                  <h3 className="font-extrabold text-[14px] uppercase tracking-[0.08em] text-[var(--error)]">Danger Zone</h3>
                </div>
                <p className="text-[13px] text-[var(--text-soft)] font-medium max-w-xl">
                  Account deletion is permanent and requires admin approval. Go to your profile to start the request.
                </p>
              </div>
              <a href="/intern/profile" className="btn-outline">Go to profile</a>
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
