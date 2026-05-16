'use client';

import { useState } from 'react';
import {
  Camera, ArrowRight, ArrowLeft, Check, X, Code2, Database, Shield,
  BarChart3, Palette, Cpu, Sparkles, Award, Linkedin, Github, Globe,
  CheckCircle2, Loader2
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
      --error: #D32F2F; --success: #2E7D32;
    }
    .auth-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--navy); background: var(--paper); }
    .auth-root * { -webkit-font-smoothing: antialiased; }
    .pixel { font-family: 'Pixelify Sans', sans-serif; font-weight: 600; }
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
    .field-input { width: 100%; background: transparent; border: none; outline: none; padding: 12px 0; font-size: 15px; color: var(--navy); font-family: inherit; font-weight: 500; }
    .field-wrap { border-bottom: 2px solid var(--border); transition: border-color 200ms ease; display: flex; align-items: center; gap: 10px; }
    .field-wrap:focus-within { border-bottom-color: var(--blue); }
    .btn-primary { background: var(--blue); color: var(--navy); padding: 14px 22px; font-size: 13px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--blue); cursor: pointer; transition: background 220ms ease, border-color 220ms ease, color 220ms ease, transform 100ms ease; font-family: inherit; }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-outline { background: transparent; color: var(--navy); padding: 14px 22px; font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 2px solid var(--navy); cursor: pointer; transition: background 220ms ease, color 220ms ease; font-family: inherit; }
    .btn-outline:hover { background: var(--navy); color: var(--white); }
    .choice-card { background: var(--white); border: 2px solid var(--border); padding: 20px; cursor: pointer; transition: border-color 200ms ease, transform 200ms ease; text-align: left; font-family: inherit; }
    .choice-card:hover { border-color: var(--blue); transform: translateY(-2px); }
    .choice-card.selected { border-color: var(--blue); background: var(--blue-pale); }
    .choice-card.selected-yellow { border-color: var(--yellow); background: rgba(251,192,45,0.1); }
    .bullet-arrow::before { content: '›'; color: var(--blue); font-weight: 700; margin-right: 8px; font-size: 1.15em; }
    @keyframes fadeSwap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .fade-swap { animation: fadeSwap 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 700ms linear infinite; }
    .underline-grow { position: relative; }
    .underline-grow::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 2px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .underline-grow:hover::after { transform: scaleX(1); }
    .skill-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: var(--paper-warm); border: 1px solid var(--border); font-size: 12px; font-weight: 600; color: var(--navy); }
  `}</style>
);

const TRACKS = [
  { id: 'frontend', name: 'Frontend Development', icon: Code2, blurb: 'React, Next.js, design systems' },
  { id: 'backend', name: 'Backend Engineering', icon: Database, blurb: 'APIs, databases, distributed systems' },
  { id: 'cybersec', name: 'Cybersecurity', icon: Shield, blurb: 'OWASP, pentesting, threat modeling' },
  { id: 'product', name: 'Product Management', icon: BarChart3, blurb: 'Roadmaps, specs, stakeholder mgmt' },
  { id: 'design', name: 'UI/UX Design', icon: Palette, blurb: 'User research, prototyping, systems' },
  { id: 'data', name: 'Data Science', icon: Cpu, blurb: 'Analytics, ML, visualization' },
];

const MENTORS = [
  { id: 'm1', name: 'Engr Abdulrahman Abdulrahim', track: 'frontend', years: 9, focus: 'Full-stack architecture, React', avail: 'Open' },
  { id: 'm2', name: 'Tobi Akinwale', track: 'frontend', years: 8, focus: 'Design systems, accessibility', avail: 'Open' },
  { id: 'm3', name: 'Dr. Aisha Mohammed', track: 'backend', years: 12, focus: 'Distributed systems, AWS', avail: 'Open' },
  { id: 'm4', name: 'Kingsley Adekunle', track: 'backend', years: 7, focus: 'Node.js, microservices', avail: '1 slot' },
  { id: 'm5', name: 'Victor John', track: 'cybersec', years: 10, focus: 'OWASP, pentesting, threat modeling', avail: 'Open' },
  { id: 'm6', name: 'Amaka Onyeka', track: 'product', years: 9, focus: 'B2B SaaS, roadmaps, OKRs', avail: 'Open' },
  { id: 'm7', name: 'Sade Williams', track: 'design', years: 11, focus: 'User research, design systems', avail: 'Open' },
  { id: 'm8', name: 'Dr. Yusuf Garba', track: 'data', years: 13, focus: 'ML, MLOps, time-series', avail: '1 slot' },
];

const PLANS = [
  { id: 'regular', label: 'Regular', tagline: 'Core program access', features: ['9-week curriculum', 'Track-based assignments', 'Capstone submission', 'Cohort community'] },
  { id: 'premium', label: 'Premium', tagline: 'Lifetime mentorship', features: ['Everything in Regular', '1:1 mentor pairing', 'Weekly office hours', 'Lifetime alumni access', 'Priority feedback'] },
];

export default function InternOnboarding() {
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    avatar: null,
    name: '', bio: '', skills: [],
    linkedin: '', github: '', portfolio: '',
    track: '', plan: '', mentor: '',
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s) && form.skills.length < 10) {
      set('skills', [...form.skills, s]);
      setSkillInput('');
    }
  };
  const removeSkill = (s) => set('skills', form.skills.filter(x => x !== s));

  const totalSteps = form.plan === 'premium' ? 4 : 3;
  const stepLabels = ['Profile', 'Track', 'Plan', 'Mentor'];

  const canProceed = () => {
    if (step === 1) return form.name.trim().length >= 2 && form.bio.trim().length >= 10 && form.skills.length >= 2;
    if (step === 2) return !!form.track;
    if (step === 3) return !!form.plan;
    if (step === 4) return !!form.mentor;
    return false;
  };

  const next = () => {
    if (!canProceed()) return;
    if (step === 3 && form.plan === 'regular') { handleFinish(); return; }
    if (step === 4) { handleFinish(); return; }
    setStep(s => s + 1);
  };
  const back = () => setStep(s => Math.max(1, s - 1));

  const handleFinish = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1100));
    setSubmitting(false);
    setDone(true);
  };

  const availableMentors = MENTORS.filter(m => m.track === form.track);

  return (
    <div className="auth-root texture-bg min-h-screen flex flex-col">
      <Styles />

      <header className="px-6 lg:px-12 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[16px] text-[var(--navy)]">DSHub</span>
              <span className="pill-yellow">Onboarding</span>
            </div>
            <div className="text-[12px] text-[var(--text-mute)] mt-1 font-medium">Intern · Cohort A 2026</div>
          </div>
        </a>
        <a href="/" className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)] hover:text-[var(--navy)]">Save & exit</a>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-8">
        <div className="w-full max-w-3xl">

          {done ? (
            <div className="bg-white notched p-10 text-center fade-swap">
              <div className="w-16 h-16 mx-auto mb-5 bg-[var(--success)] notched-sm flex items-center justify-center">
                <CheckCircle2 size={28} strokeWidth={2.5} className="text-white" />
              </div>
              <h2 className="pixel text-[32px] text-[var(--navy)] mb-3">You're all set.</h2>
              <p className="text-[14px] text-[var(--text-mute)] mb-2 font-medium">
                Profile saved. Track: <span className="text-[var(--navy)] font-semibold">{TRACKS.find(t => t.id === form.track)?.name}</span>
              </p>
              <p className="text-[14px] text-[var(--text-mute)] mb-6 font-medium">
                Plan: <span className="text-[var(--navy)] font-semibold">{form.plan === 'premium' ? 'Premium' : 'Regular'}</span>
                {form.mentor && <> · Mentor: <span className="text-[var(--navy)] font-semibold">{MENTORS.find(m => m.id === form.mentor)?.name}</span></>}
              </p>
              <a href="/intern/submissions" className="btn-primary inline-flex"><span>Open my dashboard</span><ArrowRight size={16} strokeWidth={2.5} /></a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-mute)]">Step {step} of {totalSteps}</span>
                  <span className="mono text-[11px] text-[var(--text-mute)]">{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: totalSteps }).map((_, i) => {
                    const idx = i + 1;
                    const active = idx === step;
                    const complete = idx < step;
                    return (
                      <div key={i} className="flex-1">
                        <div className={`h-1.5 transition-colors ${complete ? 'bg-[var(--blue)]' : active ? 'bg-[var(--navy)]' : 'bg-[var(--border)]'}`} />
                        <div className={`mt-2 text-[10px] font-bold uppercase tracking-[0.12em] ${active || complete ? 'text-[var(--navy)]' : 'text-[var(--text-mute)]'}`}>
                          {stepLabels[i]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white notched p-8 lg:p-10">

                {step === 1 && (
                  <div className="fade-swap" key="s1">
                    <span className="pill-yellow mb-3 inline-block">Step 01</span>
                    <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">Build your <span className="text-[var(--blue)]">profile.</span></h2>
                    <p className="text-[14px] text-[var(--text-mute)] font-medium mb-8">This is what appears on the public cohort page.</p>

                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] mb-2">Avatar</div>
                        <label className="block w-32 h-32 bg-[var(--paper-warm)] border-2 border-dashed border-[var(--border)] notched-sm flex items-center justify-center cursor-pointer hover:border-[var(--navy)] transition-colors overflow-hidden" style={{ display: 'flex' }}>
                          {form.avatar ? (
                            <img src={form.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center">
                              <Camera size={22} strokeWidth={1.8} className="text-[var(--text-mute)] mx-auto mb-1" />
                              <span className="text-[10px] font-bold text-[var(--text-mute)] uppercase tracking-wider">Upload</span>
                            </div>
                          )}
                          <input
                            type="file" accept="image/png,image/jpeg" className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) set('avatar', URL.createObjectURL(f));
                            }}
                          />
                        </label>
                        <div className="mt-2 text-[10px] text-[var(--text-mute)] leading-snug">
                          PNG/JPG · white bg<br />400×400 min · max 2MB
                        </div>
                      </div>

                      <div className="flex-1 space-y-5">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Full name</label>
                          <div className="field-wrap">
                            <input value={form.name} onChange={(e) => set('name', e.target.value)} className="field-input" placeholder="e.g. Adaeze Okonkwo" />
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Bio</label>
                          <textarea
                            value={form.bio} onChange={(e) => set('bio', e.target.value)}
                            rows={3} maxLength={240}
                            className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[14px] text-[var(--navy)] resize-none"
                            placeholder="A sentence or two about what you're building and what excites you."
                            style={{ fontFamily: 'inherit' }}
                          />
                          <div className="text-[11px] text-[var(--text-mute)] mt-1 mono">{form.bio.length}/240</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Skills (add 2-10)</label>
                      <div className="field-wrap">
                        <input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                          className="field-input"
                          placeholder="Type and press Enter (e.g. React, TypeScript, AWS)"
                        />
                        <button type="button" onClick={addSkill} className="text-[var(--blue)] font-bold text-[12px] uppercase tracking-wider px-2">Add</button>
                      </div>
                      {form.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {form.skills.map(s => (
                            <span key={s} className="skill-chip">
                              {s}
                              <button onClick={() => removeSkill(s)} className="text-[var(--text-mute)] hover:text-[var(--error)]"><X size={11} strokeWidth={2.5} /></button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">LinkedIn</label>
                        <div className="field-wrap"><Linkedin size={14} className="text-[var(--text-mute)]" /><input value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} className="field-input" placeholder="linkedin.com/in/…" /></div>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">GitHub</label>
                        <div className="field-wrap"><Github size={14} className="text-[var(--text-mute)]" /><input value={form.github} onChange={(e) => set('github', e.target.value)} className="field-input" placeholder="github.com/…" /></div>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Portfolio</label>
                        <div className="field-wrap"><Globe size={14} className="text-[var(--text-mute)]" /><input value={form.portfolio} onChange={(e) => set('portfolio', e.target.value)} className="field-input" placeholder="yourdomain.com" /></div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="fade-swap" key="s2">
                    <span className="pill-yellow mb-3 inline-block">Step 02</span>
                    <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">Pick your <span className="text-[var(--blue)]">track.</span></h2>
                    <p className="text-[14px] text-[var(--text-mute)] font-medium mb-8">This determines your curriculum and the mentors available to you.</p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {TRACKS.map(t => {
                        const Icon = t.icon;
                        const sel = form.track === t.id;
                        return (
                          <button key={t.id} onClick={() => set('track', t.id)} className={`choice-card notched-sm ${sel ? 'selected' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 flex items-center justify-center notched-sm flex-shrink-0 ${sel ? 'bg-[var(--blue)]' : 'bg-[var(--navy)]'}`}>
                                <Icon size={18} className="text-white" strokeWidth={2} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-extrabold text-[15px] text-[var(--navy)]">{t.name}</h3>
                                  {sel && <Check size={14} strokeWidth={3} className="text-[var(--blue)]" />}
                                </div>
                                <p className="text-[12px] text-[var(--text-mute)] font-medium">{t.blurb}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="fade-swap" key="s3">
                    <span className="pill-yellow mb-3 inline-block">Step 03</span>
                    <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">Choose your <span className="text-[var(--blue)]">plan.</span></h2>
                    <p className="text-[14px] text-[var(--text-mute)] font-medium mb-8">Premium pairs you with a dedicated mentor for life.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {PLANS.map(p => {
                        const sel = form.plan === p.id;
                        const premium = p.id === 'premium';
                        return (
                          <button key={p.id} onClick={() => set('plan', p.id)} className={`choice-card notched ${sel ? (premium ? 'selected-yellow' : 'selected') : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="pixel text-[26px] text-[var(--navy)]">{p.label}</h3>
                              {premium ? <Sparkles size={20} strokeWidth={2} className="text-[var(--yellow)]" /> : <Award size={20} strokeWidth={2} className="text-[var(--blue)]" />}
                            </div>
                            <p className={premium ? 'pill-yellow' : 'pill-blue'}>{p.tagline}</p>
                            <ul className="mt-4 space-y-1.5">
                              {p.features.map(f => (
                                <li key={f} className="bullet-arrow text-[13px] text-[var(--text-soft)] font-medium">{f}</li>
                              ))}
                            </ul>
                            {sel && (
                              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--success)]">
                                <Check size={13} strokeWidth={3} /> Selected
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="fade-swap" key="s4">
                    <span className="pill-yellow mb-3 inline-block">Step 04</span>
                    <h2 className="pixel text-[32px] lg:text-[36px] text-[var(--navy)] leading-tight mb-2">Choose your <span className="text-[var(--blue)]">mentor.</span></h2>
                    <p className="text-[14px] text-[var(--text-mute)] font-medium mb-8">Filtered to your track: <span className="text-[var(--navy)] font-bold">{TRACKS.find(t => t.id === form.track)?.name}</span></p>

                    {availableMentors.length === 0 ? (
                      <div className="p-6 bg-[var(--paper-warm)] notched-sm text-center text-[var(--text-mute)] font-medium">
                        No mentors available for this track right now. Switch to Regular plan or change track.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {availableMentors.map(m => {
                          const sel = form.mentor === m.id;
                          return (
                            <button key={m.id} onClick={() => set('mentor', m.id)} className={`choice-card notched-sm w-full ${sel ? 'selected' : ''}`}>
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 flex items-center justify-center font-extrabold text-[15px] notched-sm flex-shrink-0 ${sel ? 'bg-[var(--blue)] text-white' : 'bg-[var(--navy)] text-white'}`}>
                                  {m.name.split(' ').slice(-2).map(s => s[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-extrabold text-[15px] text-[var(--navy)]">{m.name}</h3>
                                    <span className="pill-blue">{m.avail}</span>
                                  </div>
                                  <p className="text-[12px] text-[var(--text-mute)] font-medium mt-1">{m.focus}</p>
                                  <div className="text-[11px] mono text-[var(--text-mute)] mt-1">{m.years} yrs experience</div>
                                </div>
                                {sel && <Check size={18} strokeWidth={3} className="text-[var(--blue)]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 mt-10 pt-6 border-t-2 border-[var(--border)]">
                  <button onClick={back} disabled={step === 1} className="btn-outline disabled:opacity-30 disabled:pointer-events-none">
                    <ArrowLeft size={14} strokeWidth={2.5} /> Back
                  </button>
                  <button onClick={next} disabled={!canProceed() || submitting} className="btn-primary">
                    {submitting ? (
                      <><Loader2 size={16} className="spin" strokeWidth={2.5} /><span>Saving…</span></>
                    ) : (step === 3 && form.plan === 'regular') || step === totalSteps ? (
                      <><span>Finish</span><Check size={16} strokeWidth={2.5} /></>
                    ) : (
                      <><span>Continue</span><ArrowRight size={16} strokeWidth={2.5} /></>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-[var(--navy)] text-white text-center py-4 px-4 text-[13px] font-medium">
        Learn more at <a href="https://internship.dshub.com.ng" className="font-bold italic underline-grow ml-1">https://internship.dshub.com.ng</a>
      </footer>
    </div>
  );
}