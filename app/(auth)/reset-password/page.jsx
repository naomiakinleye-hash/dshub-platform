'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Lock, Eye, EyeOff, ChevronLeft, ArrowRight, AlertCircle, CheckCircle2,
  Loader2, ShieldCheck, ShieldX
} from 'lucide-react';

// ============================================================
// THEME — DSHub brand (shared)
// ============================================================
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

    .field-input { width: 100%; background: transparent; border: none; outline: none; padding: 12px 0; font-size: 15px; color: var(--navy); font-family: inherit; font-weight: 500; }
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

    .bullet-arrow::before { content: '›'; color: var(--blue); font-weight: 700; margin-right: 8px; font-size: 1.15em; }
    .bullet-check::before { content: '✓'; color: var(--success); font-weight: 700; margin-right: 8px; font-size: 1em; }
    .bullet-x::before { content: '✕'; color: var(--text-mute); font-weight: 700; margin-right: 8px; font-size: 1em; }

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

    .strength-bar { height: 4px; background: var(--border); overflow: hidden; }
    .strength-fill { height: 100%; transition: width 300ms ease, background 300ms ease; }
  `}</style>
);

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

export default function ResetPassword() {
  // In production, read the token from the URL:
  // const token = new URLSearchParams(window.location.search).get('token');
  // For demo, hardcode a valid token.
  const [token] = useState('demo-valid-token-1234');
  const [tokenValid] = useState(true); // backend would verify on mount

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle');
  const [shake, setShake] = useState(false);

  const strength = useMemo(() => scorePassword(password), [password]);

  const requirements = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'Mix of upper and lower case', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
    { label: 'At least one number', test: (p) => /\d/.test(p) },
    { label: 'At least one symbol', test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];

  const validate = (field, value) => {
    if (field === 'password') {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Must be at least 8 characters';
      if (strength.score < 3) return 'Use upper, lower, numbers, and symbols';
      return '';
    }
    if (field === 'confirm') {
      if (!value) return 'Confirm your password';
      if (value !== password) return 'Passwords do not match';
      return '';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const val = field === 'password' ? password : confirm;
    setErrors(prev => ({ ...prev, [field]: validate(field, val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const pwdErr = validate('password', password);
    const confirmErr = validate('confirm', confirm);
    setTouched({ password: true, confirm: true });
    setErrors({ password: pwdErr, confirm: confirmErr });
    if (pwdErr || confirmErr) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setStatus('loading');

    // ============================================================
    // REAL INTEGRATION (replace mock)
    // ============================================================
    // const res = await fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token, password }),
    // });
    // if (!res.ok) {
    //   const body = await res.json().catch(() => ({}));
    //   setStatus('idle');
    //   setSubmitError(
    //     body.code === 'TOKEN_EXPIRED' ? 'This link has expired. Request a new one.'
    //     : body.code === 'TOKEN_INVALID' ? 'This link is invalid or already used.'
    //     : 'Could not reset password. Please try again.'
    //   );
    //   return;
    // }
    // setStatus('success');
    //
    // SECURITY:
    // - Backend verifies token: not expired, not used, matches hash in DB.
    // - On success: mark token as used, hash new password (bcrypt/argon2id), update.
    // - Invalidate ALL existing sessions for this user (force re-login everywhere).
    // - Send notification email: "Your password was changed."
    // - Rate limit by IP and by token to prevent brute force.
    // ============================================================

    await new Promise(r => setTimeout(r, 1100));
    setStatus('success');
  };

  // Invalid token state
  if (!tokenValid) {
    return (
      <div className="auth-root texture-bg min-h-screen flex flex-col items-center justify-center p-6">
        <Styles />
        <div className="bg-white p-8 sm:p-10 notched max-w-md w-full text-center reveal">
          <div className="w-16 h-16 mx-auto mb-5 bg-[var(--error)] notched-sm flex items-center justify-center">
            <ShieldX size={28} strokeWidth={2.5} className="text-white" />
          </div>
          <h2 className="pixel text-[28px] text-[var(--navy)] mb-3 leading-tight">Link expired.</h2>
          <p className="text-[14px] text-[var(--text-mute)] mb-6 font-medium">
            This reset link is invalid or has expired. Request a fresh one to continue.
          </p>
          <a href="#forgot-password" className="btn-primary">
            <span>Request new link</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-root texture-bg min-h-screen flex flex-col">
      <Styles />

      <header className="px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[16px] text-[var(--navy)]">DSHub</span>
              <span className="pill-yellow">Cohort A</span>
            </div>
            <div className="text-[12px] text-[var(--text-mute)] mt-1 font-medium">Internship Program 2026</div>
          </div>
        </a>
        <a href="#signin" className="hidden sm:flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors">
          <ChevronLeft size={14} strokeWidth={2.5} /> Back to sign in
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 pb-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-stretch">

          {/* LEFT — Brand panel with password requirements */}
          <aside className="bg-[var(--navy)] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden notched min-h-[420px] flex flex-col">
            <div className="absolute top-6 right-6 opacity-90">
              <DotPattern direction="right" color="#5FB3FF" />
            </div>
            <div className="absolute bottom-6 left-6 opacity-70">
              <DotPattern direction="left" color="#FBC02D" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span className="pill-yellow">Almost there</span>
              </div>

              <h1 className="pixel text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] mb-6">
                Pick a new<br />
                <span className="text-[var(--yellow-soft)]">password.</span>
              </h1>

              <p className="text-[15px] leading-relaxed text-white/85 max-w-md mb-8 font-medium">
                Choose something strong. Once you reset, you'll be signed out of all
                other devices for safety.
              </p>

              <div className="p-5 sm:p-6 notched-sm mt-auto" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="pill-yellow mb-4">Password requirements</div>
                <ul className="space-y-2">
                  {requirements.map((req, idx) => {
                    const met = req.test(password);
                    return (
                      <li
                        key={idx}
                        className={`text-[14px] font-medium transition-colors ${met ? 'text-[var(--yellow-soft)]' : 'text-white/70'} ${met ? 'bullet-check' : 'bullet-x'}`}
                      >
                        {req.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT — Form */}
          <section className={`bg-white p-7 sm:p-10 lg:p-11 notched relative reveal ${shake ? 'shake' : ''}`}>
            <div className="absolute -top-4 right-12 opacity-25 hidden sm:block">
              <DotPattern direction="right" color="#1B2D5C" />
            </div>

            <div className="relative z-10 max-w-[400px] mx-auto">
              {status === 'success' ? (
                <div className="text-center py-6 fade-swap">
                  <div className="w-16 h-16 mx-auto mb-5 bg-[var(--success)] notched-sm flex items-center justify-center">
                    <ShieldCheck size={28} strokeWidth={2.5} className="text-white" />
                  </div>
                  <h2 className="pixel text-[28px] sm:text-[32px] text-[var(--navy)] mb-3 leading-tight">Password reset.</h2>
                  <p className="text-[14px] text-[var(--text-mute)] mb-6 font-medium leading-relaxed">
                    All other sessions have been signed out. Use your new password to
                    sign back in.
                  </p>
                  <a href="#signin" className="btn-primary">
                    <span>Continue to sign in</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </a>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="pixel text-[30px] sm:text-[34px] leading-[1.05] text-[var(--navy)] mb-2">
                      Set your<br />
                      <span className="text-[var(--blue)]">new password.</span>
                    </h2>
                    <p className="text-[13px] text-[var(--text-mute)] font-medium">
                      Make it strong. Make it memorable.
                    </p>
                  </div>

                  {submitError && (
                    <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-2.5 text-[13px] text-[var(--error)] px-3.5 py-3 border-l-[3px] border-[var(--error)]" style={{ background: 'rgba(211,47,47,0.07)' }}>
                      <AlertCircle size={15} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="password" className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">New password</label>
                        <div className={`field-wrap ${touched.password && errors.password ? 'has-error' : ''}`}>
                          <Lock size={16} strokeWidth={2} className="text-[var(--text-mute)]" />
                          <input
                            id="password"
                            type={showPwd ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleBlur('password')}
                            disabled={status !== 'idle'}
                            aria-invalid={!!errors.password}
                            className="field-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPwd(s => !s)}
                            className="text-[var(--text-mute)] hover:text-[var(--navy)] transition-colors p-1"
                            aria-label={showPwd ? 'Hide password' : 'Show password'}
                            tabIndex={-1}
                          >
                            {showPwd ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                          </button>
                        </div>
                        <div className="min-h-[18px] mt-1.5">
                          {touched.password && errors.password && (
                            <span role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5">
                              <AlertCircle size={12} strokeWidth={2} /> {errors.password}
                            </span>
                          )}
                        </div>
                      </div>

                      {password && (
                        <div className="-mt-2 mb-2">
                          <div className="strength-bar">
                            <div className="strength-fill" style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color }} />
                          </div>
                          <div className="flex justify-between mt-1.5 text-[11px]">
                            <span className="text-[var(--text-mute)] font-medium">Password strength</span>
                            <span className="font-bold uppercase tracking-[0.1em]" style={{ color: strength.color }}>{strength.label}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <label htmlFor="confirm" className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Confirm new password</label>
                        <div className={`field-wrap ${touched.confirm && errors.confirm ? 'has-error' : ''}`}>
                          <Lock size={16} strokeWidth={2} className="text-[var(--text-mute)]" />
                          <input
                            id="confirm"
                            type={showPwd ? 'text' : 'password'}
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            onBlur={() => handleBlur('confirm')}
                            disabled={status !== 'idle'}
                            aria-invalid={!!errors.confirm}
                            className="field-input"
                          />
                          {confirm && confirm === password && (
                            <CheckCircle2 size={16} strokeWidth={2.5} className="text-[var(--success)]" />
                          )}
                        </div>
                        <div className="min-h-[18px] mt-1.5">
                          {touched.confirm && errors.confirm && (
                            <span role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5">
                              <AlertCircle size={12} strokeWidth={2} /> {errors.confirm}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button type="submit" disabled={status !== 'idle'} className="btn-primary mt-5">
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} strokeWidth={2.5} className="spin" />
                          <span>Resetting password…</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={16} strokeWidth={2.5} />
                          <span>Reset Password</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>
                </>
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
