'use client';

import { useState, useEffect } from 'react';
import {
  Eye, EyeOff, Loader2, ArrowRight, AlertCircle, CheckCircle2,
  Lock, Mail, ChevronLeft, BookOpen, Award
} from 'lucide-react';

// ============================================================
// THEME — DSHub brand
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
      --error: #D32F2F;
      --success: #2E7D32;
    }

    .auth-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--navy);
      background: var(--paper);
    }
    .auth-root * { -webkit-font-smoothing: antialiased; }

    .pixel { font-family: 'Pixelify Sans', sans-serif; font-weight: 600; letter-spacing: 0.01em; }
    .pixel-light { font-family: 'Pixelify Sans', sans-serif; font-weight: 400; letter-spacing: 0.01em; }
    .mono { font-family: 'DM Mono', monospace; }

    .texture-bg {
      background-color: var(--paper);
      background-image:
        repeating-linear-gradient(135deg, transparent 0, transparent 22px, rgba(33,150,243,0.05) 22px, rgba(33,150,243,0.05) 23px),
        repeating-linear-gradient(45deg, transparent 0, transparent 28px, rgba(27,45,92,0.03) 28px, rgba(27,45,92,0.03) 29px);
    }

    .notched {
      clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
    }
    .notched-sm {
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    }

    .pill-yellow {
      background: var(--yellow); color: var(--navy);
      font-weight: 800; font-size: 10px; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 4px 9px;
      display: inline-block; line-height: 1.3;
    }

    .role-toggle {
      display: grid; grid-template-columns: 1fr 1fr;
      border: 2px solid var(--navy);
      position: relative; overflow: hidden;
      background: var(--white);
    }
    .role-slider {
      position: absolute; top: 0; bottom: 0;
      width: 50%;
      transition: transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1), background 250ms ease;
      z-index: 0;
    }
    .role-slider.student { transform: translateX(0); background: var(--blue); }
    .role-slider.mentor { transform: translateX(100%); background: var(--navy); }
    .role-btn {
      position: relative; z-index: 1;
      padding: 13px 16px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700; font-size: 12px; letter-spacing: 0.08em;
      text-transform: uppercase;
      background: transparent; border: none; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      color: var(--navy);
      transition: color 280ms ease;
    }
    .role-btn.active { color: var(--white); }
    .role-toggle.is-student .role-btn.active { color: var(--navy); }
    .role-toggle.is-mentor .role-btn.active { color: var(--white); }

    .field-input {
      width: 100%; background: transparent;
      border: none; outline: none;
      padding: 12px 0;
      font-size: 15px; color: var(--navy);
      font-family: inherit; font-weight: 500;
    }
    .field-input::placeholder { color: var(--text-mute); opacity: 0.6; }
    .field-wrap {
      border-bottom: 2px solid var(--border);
      transition: border-color 200ms ease;
      display: flex; align-items: center; gap: 10px;
    }
    .field-wrap:focus-within { border-bottom-color: var(--blue); }
    .field-wrap.has-error { border-bottom-color: var(--error); }

    .btn-primary {
      background: var(--blue); color: var(--navy);
      padding: 14px 22px; width: 100%;
      font-size: 13px; font-weight: 800; letter-spacing: 0.06em;
      text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--blue); cursor: pointer;
      transition: background 220ms ease, border-color 220ms ease, color 220ms ease, transform 100ms ease;
    }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-primary:active:not(:disabled) { transform: translateY(1px); }
    .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
    .btn-primary.success { background: var(--success); border-color: var(--success); color: var(--white); }

    .btn-sso {
      background: var(--white); color: var(--navy);
      padding: 12px 22px; width: 100%;
      font-size: 14px; font-weight: 600;
      display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      border: 2px solid var(--border); cursor: pointer;
      transition: border-color 200ms ease, background 200ms ease;
    }
    .btn-sso:hover { border-color: var(--navy); background: var(--paper-warm); }

    .checkbox-mark {
      width: 18px; height: 18px;
      border: 2px solid var(--navy); background: transparent;
      display: inline-flex; align-items: center; justify-content: center;
      transition: background 150ms ease, border-color 150ms ease;
      flex-shrink: 0;
    }
    .checkbox-mark.checked { background: var(--blue); border-color: var(--blue); }

    .bullet-arrow::before {
      content: '›'; color: var(--blue); font-weight: 700; margin-right: 8px;
    }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes fadeSwap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .fade-swap { animation: fadeSwap 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-4px); }
      40%, 80% { transform: translateX(4px); }
    }
    .shake { animation: shake 380ms cubic-bezier(0.36, 0.07, 0.19, 0.97); }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 700ms linear infinite; }

    .underline-grow { position: relative; }
    .underline-grow::after {
      content: ''; position: absolute; left: 0; bottom: -2px;
      width: 100%; height: 2px; background: currentColor;
      transform: scaleX(0); transform-origin: left;
      transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .underline-grow:hover::after { transform: scaleX(1); }
  `}</style>
);

function DotPattern({ direction = 'left', color = '#2196F3', className = '' }) {
  const cols = 5;
  const rows = 7;
  return (
    <svg className={className} width="120" height="170" viewBox="0 0 120 170" aria-hidden="true">
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => {
          const x = col * 22 + 8;
          const y = row * 22 + 8;
          const colWeight = direction === 'left' ? col : cols - 1 - col;
          const size = Math.min(5.5, colWeight * 1.0 + 1.5);
          const opacity = 0.35 + colWeight * 0.12;
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={size} fill={color} opacity={Math.min(opacity, 0.9)} />;
        })
      )}
    </svg>
  );
}

const ROLES = {
  student: {
    label: 'Student',
    icon: BookOpen,
    accent: '#2196F3',
    panelKicker: 'Intern Sign In',
    panelHeadline: 'Meet your',
    panelHeadlineEmph: 'cohort.',
    panelBlurb: 'Sign in to view your profile, submit final deliverables, and prepare for the May 30 graduation ceremony.',
    panelBullets: ['Track your submissions', 'Get feedback from mentors', 'Connect with the alumni network', 'Download your certificate'],
    formHeading: 'Welcome back,',
    formHeadingEmph: 'graduate.',
    formSub: 'Pick up where you left off.',
    requestText: 'Not yet in the program?',
    requestLink: 'Request a spot',
    demoEmail: 'intern@dshub.com',
    demoPwd: 'dshub2026',
    successMsg: 'Loading your cohort…',
  },
  mentor: {
    label: 'Mentor',
    icon: Award,
    accent: '#1B2D5C',
    panelKicker: 'Mentor Sign In',
    panelHeadline: 'Meet your',
    panelHeadlineEmph: 'mentees.',
    panelBlurb: 'Sign in to review submissions, post feedback on capstones, and confirm graduation eligibility.',
    panelBullets: ['Review submission queue', 'Post capstone feedback', 'Host office hours', 'Confirm graduation eligibility'],
    formHeading: 'Welcome back,',
    formHeadingEmph: 'mentor.',
    formSub: 'Your review queue is waiting.',
    requestText: 'Want to mentor a future cohort?',
    requestLink: 'Apply to mentor',
    demoEmail: 'mentor@dshub.com',
    demoPwd: 'dshub2026',
    successMsg: 'Loading your review queue…',
  },
};

function Field({ label, error, icon: Icon, type = 'text', value, onChange, onBlur, autoComplete, name, id, disabled, rightSlot, hint }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">
        {label}
      </label>
      <div className={`field-wrap ${error ? 'has-error' : ''}`}>
        {Icon && <Icon size={16} strokeWidth={2} className="text-[var(--text-mute)]" />}
        <input id={id} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
          disabled={disabled} autoComplete={autoComplete}
          aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
          className="field-input" />
        {rightSlot}
      </div>
      <div className="min-h-[18px] mt-1.5 flex items-center justify-between">
        {error ? (
          <span id={errorId} role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5">
            <AlertCircle size={12} strokeWidth={2} /> {error}
          </span>
        ) : hint ? (
          <span className="text-[11px] text-[var(--text-mute)]">{hint}</span>
        ) : <span />}
      </div>
    </div>
  );
}

export default function SignIn() {
  const [role, setRole] = useState('student');
  const cfg = ROLES[role];
  const RoleIcon = cfg.icon;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setSubmitError('');
    setErrors({});
    setTouched({ email: false, password: false });
  }, [role]);

  const validate = (field, value) => {
    if (field === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
      return '';
    }
    if (field === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Must be at least 8 characters';
      return '';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const val = field === 'email' ? email : password;
    setErrors(prev => ({ ...prev, [field]: validate(field, val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const emailErr = validate('email', email);
    const passwordErr = validate('password', password);
    setTouched({ email: true, password: true });
    setErrors({ email: emailErr, password: passwordErr });
    if (emailErr || passwordErr) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setStatus('loading');
    await new Promise(r => setTimeout(r, 1100));
    const isDemo = email.toLowerCase() === cfg.demoEmail && password === cfg.demoPwd;
    if (!isDemo) {
      setStatus('idle');
      setSubmitError('Invalid credentials. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setStatus('success');
    setTimeout(() => {
      window.location.href = role === 'student' ? '/intern/onboarding' : '/mentor';
    }, 800);
  };

  const handlePwdKey = (e) => {
    if (typeof e.getModifierState === 'function') {
      setCapsLock(e.getModifierState('CapsLock'));
    }
  };

  return (
    <div className="auth-root texture-bg min-h-screen flex flex-col">
      <Styles />

      <header className="px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-bold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[16px] tracking-tight text-[var(--navy)]">DSHub</span>
              <span className="pill-yellow">Cohort A</span>
            </div>
            <div className="text-[12px] text-[var(--text-mute)] mt-1 font-medium">Internship Program 2026</div>
          </div>
        </a>
        <a href="/" className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors">
          <ChevronLeft size={14} strokeWidth={2.5} /> Back to site
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 pb-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-stretch">

          <aside className="bg-[var(--navy)] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden notched min-h-[420px] flex flex-col">
            <div className="absolute top-6 right-6 opacity-90"><DotPattern direction="right" color="#5FB3FF" /></div>
            <div className="absolute bottom-6 left-6 opacity-70"><DotPattern direction="left" color="#2196F3" /></div>

            <div key={role} className="relative z-10 fade-swap flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span className="pill-yellow">{cfg.panelKicker}</span>
              </div>

              <h1 className="pixel text-[44px] sm:text-[52px] lg:text-[64px] leading-[1.05] mb-6">
                {cfg.panelHeadline}<br />
                <span className="text-[var(--yellow-soft)]">{cfg.panelHeadlineEmph}</span>
              </h1>

              <p className="text-[15px] leading-relaxed text-white/85 max-w-md mb-8">{cfg.panelBlurb}</p>

              <div className="bg-white/8 border border-white/15 p-5 sm:p-6 notched-sm mt-auto" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="pill-yellow mb-4">What you'll get</div>
                <ul className="space-y-2">
                  {cfg.panelBullets.map(b => (
                    <li key={b} className="bullet-arrow text-[14px] text-white/90 font-medium">{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <section className={`bg-white p-7 sm:p-10 lg:p-11 notched relative reveal ${shake ? 'shake' : ''}`}>
            <div className="absolute -top-4 right-12 opacity-25 hidden sm:block"><DotPattern direction="right" color="#1B2D5C" /></div>

            <div className="relative z-10 max-w-[400px] mx-auto">
              <div className="mb-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-mute)] mb-2">Sign in as</div>
                <div className={`role-toggle is-${role}`} role="tablist" aria-label="Select sign in role">
                  <div className={`role-slider ${role}`} />
                  <button type="button" role="tab" aria-selected={role === 'student'}
                    onClick={() => setRole('student')}
                    className={`role-btn ${role === 'student' ? 'active' : ''}`}>
                    <BookOpen size={14} strokeWidth={2} /> Student
                  </button>
                  <button type="button" role="tab" aria-selected={role === 'mentor'}
                    onClick={() => setRole('mentor')}
                    className={`role-btn ${role === 'mentor' ? 'active' : ''}`}>
                    <Award size={14} strokeWidth={2} /> Mentor
                  </button>
                </div>
              </div>

              <div key={`${role}-h`} className="fade-swap mb-7">
                <h2 className="pixel text-[32px] sm:text-[36px] leading-[1.05] mb-2 text-[var(--navy)]">
                  {cfg.formHeading}<br />
                  <span className="text-[var(--blue)]">{cfg.formHeadingEmph}</span>
                </h2>
                <p className="text-[13px] text-[var(--text-mute)]">
                  {cfg.formSub} <span>{cfg.requestText} </span>
                  <a href="/signup" className="text-[var(--blue)] font-semibold underline-grow">{cfg.requestLink}</a>
                </p>
              </div>

              {submitError && (
                <div role="alert" aria-live="polite"
                  className="mb-5 flex items-start gap-2.5 text-[13px] text-[var(--error)] px-3.5 py-3 border-l-[3px] border-[var(--error)]"
                  style={{ background: 'rgba(211,47,47,0.07)' }}>
                  <AlertCircle size={15} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <Field id="email" name="email" type="email"
                    label={role === 'mentor' ? 'Mentor email' : 'Student email'}
                    icon={Mail} value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    autoComplete="email" disabled={status !== 'idle'}
                    error={touched.email && errors.email} />

                  <Field id="password" name="password"
                    type={showPwd ? 'text' : 'password'}
                    label="Password" icon={Lock} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    autoComplete="current-password"
                    disabled={status !== 'idle'}
                    error={touched.password && errors.password}
                    hint={capsLock ? '⚠ Caps Lock is on' : ''}
                    rightSlot={
                      <button type="button" onClick={() => setShowPwd(s => !s)}
                        className="text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors p-1"
                        aria-label={showPwd ? 'Hide password' : 'Show password'} tabIndex={-1}>
                        {showPwd ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                      </button>
                    } />
                  <input type="text" tabIndex={-1}
                    onKeyUp={handlePwdKey} onKeyDown={handlePwdKey}
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: 0, height: 0 }} />
                </div>

                <div className="flex items-center justify-between mt-5 mb-7">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="sr-only" />
                    <span className={`checkbox-mark ${remember ? 'checked' : ''}`}>
                      {remember && (
                        <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[13px] font-medium text-[var(--text-soft)] group-hover:text-[var(--navy)]">Stay signed in</span>
                  </label>
                  <a href="/forgot-password" className="text-[13px] font-semibold text-[var(--blue)] underline-grow">Forgot password?</a>
                </div>

                <button type="submit" disabled={status !== 'idle'}
                  className={`btn-primary ${status === 'success' ? 'success' : ''}`}>
                  {status === 'loading' && (<><Loader2 size={16} strokeWidth={2.5} className="spin" /><span>Signing in…</span></>)}
                  {status === 'success' && (<><CheckCircle2 size={16} strokeWidth={2.5} /><span>{cfg.successMsg}</span></>)}
                  {status === 'idle' && (<><RoleIcon size={15} strokeWidth={2.2} /><span>Sign In as {cfg.label}</span><ArrowRight size={16} strokeWidth={2.5} /></>)}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-mute)]">or</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <button type="button" className="btn-sso">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div key={`demo-${role}`}
                className="mt-8 p-3.5 border-2 border-dashed border-[var(--border)] text-[11px] mono leading-relaxed text-[var(--text-mute)] fade-swap">
                <span className="font-bold uppercase tracking-[0.12em] text-[var(--navy)]">Demo · {cfg.label}</span><br />
                {cfg.demoEmail}<br />
                {cfg.demoPwd}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[var(--navy)] text-white text-center py-4 px-4 text-[13px] font-medium">
        Learn more at <a href="https://internship.dshub.com.ng" className="font-bold italic underline-grow ml-1">https://internship.dshub.com.ng</a>
      </footer>
    </div>
  );
}