'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../lib/AuthContext';
import {
  Eye, EyeOff, Loader2, ArrowRight, AlertCircle, CheckCircle2,
  Lock, Mail, User, ChevronLeft, BookOpen, Award
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
      --error: #D32F2F;
      --success: #2E7D32;
      --warn: #ED6C02;
    }

    .auth-root { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--navy); background: var(--paper); }
    .auth-root * { -webkit-font-smoothing: antialiased; }
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

    .role-toggle { display: grid; grid-template-columns: 1fr 1fr; border: 2px solid var(--navy); position: relative; overflow: hidden; background: var(--white); }
    .role-slider { position: absolute; top: 0; bottom: 0; width: 50%; transition: transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1), background 250ms ease; z-index: 0; }
    .role-slider.student { transform: translateX(0); background: var(--blue); }
    .role-slider.mentor { transform: translateX(100%); background: var(--navy); }
    .role-btn { position: relative; z-index: 1; padding: 13px 16px; font-weight: 700; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; background: transparent; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; color: var(--navy); transition: color 280ms ease; font-family: inherit; }
    .role-btn.active { color: var(--white); }
    .role-toggle.is-student .role-btn.active { color: var(--navy); }
    .role-toggle.is-mentor .role-btn.active { color: var(--white); }

    .field-input { width: 100%; background: transparent; border: none; outline: none; padding: 12px 0; font-size: 15px; color: var(--navy); font-family: inherit; font-weight: 500; }
    .field-input::placeholder { color: var(--text-mute); opacity: 0.6; }
    .field-wrap { border-bottom: 2px solid var(--border); transition: border-color 200ms ease; display: flex; align-items: center; gap: 10px; }
    .field-wrap:focus-within { border-bottom-color: var(--blue); }
    .field-wrap.has-error { border-bottom-color: var(--error); }

    .btn-primary {
      background: var(--blue); color: var(--navy);
      padding: 14px 22px; width: 100%;
      font-size: 13px; font-weight: 800;
      letter-spacing: 0.06em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--blue); cursor: pointer;
      transition: background 220ms ease, border-color 220ms ease, color 220ms ease, transform 100ms ease;
      font-family: inherit;
    }
    .btn-primary:hover:not(:disabled) { background: var(--navy); border-color: var(--navy); color: var(--white); }
    .btn-primary:active:not(:disabled) { transform: translateY(1px); }
    .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; }
    .btn-primary.success { background: var(--success); border-color: var(--success); color: var(--white); }

    .btn-sso { background: var(--white); color: var(--navy); padding: 12px 22px; width: 100%; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 10px; border: 2px solid var(--border); cursor: pointer; transition: border-color 200ms ease, background 200ms ease; font-family: inherit; }
    .btn-sso:hover { border-color: var(--navy); background: var(--paper-warm); }

    .checkbox-mark { width: 18px; height: 18px; border: 2px solid var(--navy); background: transparent; display: inline-flex; align-items: center; justify-content: center; transition: background 150ms ease, border-color 150ms ease; flex-shrink: 0; }
    .checkbox-mark.checked { background: var(--blue); border-color: var(--blue); }

    .bullet-arrow::before { content: '›'; color: var(--blue); font-weight: 700; margin-right: 8px; font-size: 1.15em; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes fadeSwap { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    .fade-swap { animation: fadeSwap 380ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }
    .shake { animation: shake 380ms cubic-bezier(0.36, 0.07, 0.19, 0.97); }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin { animation: spin 700ms linear infinite; }

    .underline-grow { position: relative; }
    .underline-grow::after { content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 2px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .underline-grow:hover::after { transform: scaleX(1); }

    .strength-bar { height: 4px; background: var(--border); overflow: hidden; transition: background 200ms ease; }
    .strength-fill { height: 100%; transition: width 300ms ease, background 300ms ease; }
  `}</style>
);

// ============================================================
// HALFTONE DOTS
// ============================================================
function DotPattern({ direction = 'left', color = '#2196F3' }) {
  const rows = 7, cols = 5, spacing = 22;
  return (
    <svg width={cols * spacing + 16} height={rows * spacing + 16} aria-hidden="true">
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => {
          const x = col * spacing + 8;
          const y = row * spacing + 8;
          const w = direction === 'left' ? col : cols - 1 - col;
          const r = Math.min(5.5, w * 1.0 + 1.5);
          const op = Math.min(0.85, 0.3 + w * 0.13);
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={r} fill={color} opacity={op} />;
        })
      )}
    </svg>
  );
}

// ============================================================
// ROLE CONFIG — just signup, no application stuff
// ============================================================
const ROLES = {
  student: {
    label: 'Intern',
    icon: BookOpen,
    panelKicker: 'Intern Sign Up',
    panelHeadline: 'Create your',
    panelHeadlineEmph: 'intern account.',
    panelBlurb: 'Set up your profile, then apply to the cohort that fits. Your DSHub account stays with you across every program you join.',
    panelBullets: [
      'Build and edit your profile',
      'Apply to internship cohorts',
      'Track your application status',
      'Connect with the alumni network',
    ],
    formHeading: 'Sign up as',
    formHeadingEmph: 'an intern.',
    successMsg: 'Account created. Let\'s set up your profile.',
  },
  mentor: {
    label: 'Mentor',
    icon: Award,
    panelKicker: 'Mentor Sign Up',
    panelHeadline: 'Create your',
    panelHeadlineEmph: 'mentor account.',
    panelBlurb: 'Set up your profile to join the mentor pool. Apply to specific cohorts whenever you have the bandwidth to take on mentees.',
    panelBullets: [
      'Set up your mentor profile',
      'Apply to upcoming cohorts',
      'Access mentor-only resources',
      'Join the mentor council',
    ],
    formHeading: 'Sign up as',
    formHeadingEmph: 'a mentor.',
    successMsg: 'Account created. Let\'s set up your profile.',
  },
};

// ============================================================
// PASSWORD STRENGTH
// ============================================================
function scorePassword(pwd) {
  if (!pwd) return { score: 0, label: '', color: 'var(--border)' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = [
    { label: '', color: 'var(--border)' },
    { label: 'Weak', color: 'var(--error)' },
    { label: 'Fair', color: 'var(--warn)' },
    { label: 'Good', color: 'var(--warn)' },
    { label: 'Strong', color: 'var(--success)' },
    { label: 'Excellent', color: 'var(--success)' },
  ];
  return { score, ...map[score] };
}

// ============================================================
// FIELD COMPONENT
// ============================================================
function Field({ label, error, icon: Icon, type = 'text', value, onChange, onBlur, autoComplete, name, id, disabled, rightSlot, hint, placeholder }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">{label}</label>
      <div className={`field-wrap ${error ? 'has-error' : ''}`}>
        {Icon && <Icon size={16} strokeWidth={2} className="text-[var(--text-mute)]" />}
        <input
          id={id} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
          disabled={disabled} autoComplete={autoComplete} placeholder={placeholder}
          aria-invalid={!!error} aria-describedby={error ? errorId : undefined}
          className="field-input"
        />
        {rightSlot}
      </div>
      <div className="min-h-[18px] mt-1.5">
        {error ? (
          <span id={errorId} role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5">
            <AlertCircle size={12} strokeWidth={2} /> {error}
          </span>
        ) : hint ? (
          <span className="text-[11px] text-[var(--text-mute)]">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

// ============================================================
// SIGN UP
// ============================================================
export default function SignUp() {
  const [role, setRole] = useState('student');
  const { register } = useAuth();
  const cfg = ROLES[role];
  const RoleIcon = cfg.icon;

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle');
  const [shake, setShake] = useState(false);

  const strength = useMemo(() => scorePassword(form.password), [form.password]);

  useEffect(() => {
    setSubmitError('');
    setErrors({});
    setTouched({});
  }, [role]);

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [k]: v }));
  };

  const validate = (field, value, all = form) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Enter your full name';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Must be at least 8 characters';
        if (strength.score < 3) return 'Use a mix of upper, lower, numbers, symbols';
        return '';
      case 'confirm':
        if (!value) return 'Confirm your password';
        if (value !== all.password) return 'Passwords do not match';
        return '';
      case 'terms':
        if (!value) return 'You must accept the terms';
        return '';
      default: return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validate(field, form[field]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const fields = ['name', 'email', 'password', 'confirm', 'terms'];

    const nextErrors = {};
    const nextTouched = {};
    fields.forEach(f => {
      nextErrors[f] = validate(f, form[f]);
      nextTouched[f] = true;
    });
    setErrors(nextErrors);
    setTouched(nextTouched);

    if (Object.values(nextErrors).some(Boolean)) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setStatus('loading');
    setSubmitError('');

    try {
      await register({
        fullName: form.name,
        email: form.email,
        password: form.password,
        role: role === 'student' ? 'intern' : 'mentor',
      });
      setStatus('success');
    } catch (err) {
      setStatus('idle');
      // Surface field-level errors (e.g. "email": "already taken")
      if (err?.fieldErrors && Object.keys(err.fieldErrors).length) {
        const mapped = {};
        if (err.fieldErrors.fullName) mapped.name = err.fieldErrors.fullName;
        if (err.fieldErrors.email)    mapped.email = err.fieldErrors.email;
        if (err.fieldErrors.password) mapped.password = err.fieldErrors.password;
        setErrors(e => ({ ...e, ...mapped }));
      }
      setSubmitError(err?.message || 'Could not create account. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="auth-root texture-bg min-h-screen flex flex-col">
      <Styles />

      {/* TOP BRAND BAR */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[16px] text-[var(--navy)]">DSHub</span>
              <span className="pill-yellow">Cohort A</span>
            </div>
            <div className="text-[12px] text-[var(--text-mute)] mt-1 font-medium">Internship Program 2026</div>
          </div>
        </a>
        <a href="/" className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors">
          <ChevronLeft size={14} strokeWidth={2.5} /> Back to site
        </a>
      </header>

      {/* MAIN SPLIT */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 pb-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-stretch">

          {/* LEFT — Navy brand panel */}
          <aside className="bg-[var(--navy)] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden notched min-h-[460px] flex flex-col">
            <div className="absolute top-6 right-6 opacity-90">
              <DotPattern direction="right" color="#5FB3FF" />
            </div>
            <div className="absolute bottom-6 left-6 opacity-70">
              <DotPattern direction="left" color="#FBC02D" />
            </div>

            <div key={role} className="relative z-10 fade-swap flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span className="pill-yellow">{cfg.panelKicker}</span>
              </div>

              <h1 className="pixel text-[44px] sm:text-[52px] lg:text-[60px] leading-[1.05] mb-6">
                {cfg.panelHeadline}<br />
                <span className="text-[var(--yellow-soft)]">{cfg.panelHeadlineEmph}</span>
              </h1>

              <p className="text-[15px] leading-relaxed text-white/85 max-w-md mb-8 font-medium">
                {cfg.panelBlurb}
              </p>

              <div className="p-5 sm:p-6 notched-sm mt-auto" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="pill-yellow mb-4">Your account lets you</div>
                <ul className="space-y-2">
                  {cfg.panelBullets.map(b => (
                    <li key={b} className="bullet-arrow text-[14px] text-white/90 font-medium">{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT — Form */}
          <section className={`bg-white p-7 sm:p-10 lg:p-11 notched relative reveal ${shake ? 'shake' : ''}`}>
            <div className="absolute -top-4 right-12 opacity-25 hidden sm:block">
              <DotPattern direction="right" color="#1B2D5C" />
            </div>

            <div className="relative z-10 max-w-[420px] mx-auto">
              {/* Role toggle */}
              <div className="mb-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--text-mute)] mb-2">Sign up as</div>
                <div className={`role-toggle is-${role}`} role="tablist" aria-label="Select role">
                  <div className={`role-slider ${role}`} />
                  <button type="button" role="tab" aria-selected={role === 'student'} onClick={() => setRole('student')} className={`role-btn ${role === 'student' ? 'active' : ''}`}>
                    <BookOpen size={14} strokeWidth={2} /> Intern
                  </button>
                  <button type="button" role="tab" aria-selected={role === 'mentor'} onClick={() => setRole('mentor')} className={`role-btn ${role === 'mentor' ? 'active' : ''}`}>
                    <Award size={14} strokeWidth={2} /> Mentor
                  </button>
                </div>
              </div>

              {/* Heading */}
              <div key={`${role}-h`} className="fade-swap mb-6">
                <h2 className="pixel text-[30px] sm:text-[34px] leading-[1.05] mb-2 text-[var(--navy)]">
                  {cfg.formHeading}<br />
                  <span className="text-[var(--blue)]">{cfg.formHeadingEmph}</span>
                </h2>
                <p className="text-[13px] text-[var(--text-mute)] font-medium">
                  Already have an account? <a href="/signin" className="text-[var(--blue)] font-semibold underline-grow">Sign in</a>
                </p>
              </div>

              {submitError && (
                <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-2.5 text-[13px] text-[var(--error)] px-3.5 py-3 border-l-[3px] border-[var(--error)]" style={{ background: 'rgba(211,47,47,0.07)' }}>
                  <AlertCircle size={15} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{submitError}</span>
                </div>
              )}

              {status === 'success' ? (
                <div className="text-center py-6 fade-swap">
                  <div className="w-16 h-16 mx-auto mb-5 bg-[var(--success)] notched-sm flex items-center justify-center">
                    <CheckCircle2 size={28} strokeWidth={2.5} className="text-white" />
                  </div>
                  <h3 className="pixel text-[26px] text-[var(--navy)] mb-2">Account created.</h3>
                  <p className="text-[14px] text-[var(--text-mute)] mb-6 font-medium">
                    Welcome, <span className="font-semibold text-[var(--navy)]">{form.name || form.email}</span>. Next, set up your profile so mentors can get to know you.
                  </p>
                  <a href="/intern/onboarding" className="btn-primary">
                    <span>Continue to onboarding</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-3">
                    <Field
                      id="name" name="name" type="text" label="Full name" icon={User}
                      value={form.name} onChange={set('name')} onBlur={() => handleBlur('name')}
                      autoComplete="name" disabled={status !== 'idle'}
                      error={touched.name && errors.name}
                      placeholder="e.g. Adaeze Okonkwo"
                    />
                    <Field
                      id="email" name="email" type="email" label="Email" icon={Mail}
                      value={form.email} onChange={set('email')} onBlur={() => handleBlur('email')}
                      autoComplete="email" disabled={status !== 'idle'}
                      error={touched.email && errors.email}
                    />
                    <Field
                      id="password" name="password" type={showPwd ? 'text' : 'password'} label="Password" icon={Lock}
                      value={form.password} onChange={set('password')} onBlur={() => handleBlur('password')}
                      autoComplete="new-password" disabled={status !== 'idle'}
                      error={touched.password && errors.password}
                      rightSlot={
                        <button type="button" onClick={() => setShowPwd(s => !s)} className="text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors p-1" aria-label={showPwd ? 'Hide password' : 'Show password'} tabIndex={-1}>
                          {showPwd ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                        </button>
                      }
                    />

                    {form.password && (
                      <div className="-mt-3 mb-1">
                        <div className="strength-bar">
                          <div className="strength-fill" style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color }} />
                        </div>
                        <div className="flex justify-between mt-1.5 text-[11px]">
                          <span className="text-[var(--text-mute)] font-medium">Password strength</span>
                          <span className="font-bold uppercase tracking-[0.1em]" style={{ color: strength.color }}>{strength.label}</span>
                        </div>
                      </div>
                    )}

                    <Field
                      id="confirm" name="confirm" type={showPwd ? 'text' : 'password'} label="Confirm password" icon={Lock}
                      value={form.confirm} onChange={set('confirm')} onBlur={() => handleBlur('confirm')}
                      autoComplete="new-password" disabled={status !== 'idle'}
                      error={touched.confirm && errors.confirm}
                    />
                  </div>

                  <div className="mt-5 mb-6">
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={form.terms} onChange={set('terms')} onBlur={() => handleBlur('terms')} className="sr-only" />
                      <span className={`checkbox-mark mt-0.5 ${form.terms ? 'checked' : ''}`}>
                        {form.terms && (
                          <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-[12px] text-[var(--text-soft)] font-medium leading-snug">
                        I agree to the <a href="#" className="text-[var(--blue)] font-semibold underline-grow">Terms of Service</a> and <a href="#" className="text-[var(--blue)] font-semibold underline-grow">Privacy Policy</a>.
                      </span>
                    </label>
                    {touched.terms && errors.terms && (
                      <span role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5 mt-2 ml-7">
                        <AlertCircle size={12} strokeWidth={2} /> {errors.terms}
                      </span>
                    )}
                  </div>

                  <button type="submit" disabled={status !== 'idle'} className="btn-primary">
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} strokeWidth={2.5} className="spin" />
                        <span>Creating account…</span>
                      </>
                    ) : (
                      <>
                        <RoleIcon size={15} strokeWidth={2.2} />
                        <span>Sign Up as {cfg.label}</span>
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </>
                    )}
                  </button>

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
                </form>
              )}
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
