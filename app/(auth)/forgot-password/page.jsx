'use client';

import { useState } from 'react';
import {
  Mail, ChevronLeft, ArrowRight, AlertCircle, CheckCircle2,
  Loader2, KeyRound
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

    .btn-outline {
      background: transparent; color: var(--navy);
      padding: 13px 22px; width: 100%;
      font-size: 13px; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--navy); cursor: pointer;
      transition: background 220ms ease, color 220ms ease;
      font-family: inherit;
    }
    .btn-outline:hover { background: var(--navy); color: var(--white); }

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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [shake, setShake] = useState(false);

  const validate = (v) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(email);
    setTouched(true);
    setError(err);
    if (err) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setStatus('loading');

    // ============================================================
    // REAL INTEGRATION (replace mock)
    // ============================================================
    // await fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
    //
    // SECURITY:
    // - ALWAYS return 200 OK to prevent email enumeration, even if the email
    //   doesn't exist in the database. The UI behavior is identical either way.
    // - Backend generates a single-use token (random 32+ bytes, hashed in DB),
    //   sets short expiry (~30 min), sends a magic link with the token to the email.
    // - Rate limit by IP and by email to prevent abuse.
    // - On the reset endpoint, invalidate any existing reset tokens once one is used.
    // ============================================================

    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
  };

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

          {/* LEFT — Brand panel */}
          <aside className="bg-[var(--navy)] text-white p-8 sm:p-10 lg:p-12 relative overflow-hidden notched min-h-[420px] flex flex-col">
            <div className="absolute top-6 right-6 opacity-90">
              <DotPattern direction="right" color="#5FB3FF" />
            </div>
            <div className="absolute bottom-6 left-6 opacity-70">
              <DotPattern direction="left" color="#FBC02D" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <span className="pill-yellow">Password Reset</span>
              </div>

              <h1 className="pixel text-[40px] sm:text-[48px] lg:text-[56px] leading-[1.05] mb-6">
                Forgot your<br />
                <span className="text-[var(--yellow-soft)]">password?</span>
              </h1>

              <p className="text-[15px] leading-relaxed text-white/85 max-w-md mb-8 font-medium">
                It happens. Type the email tied to your DSHub account and we'll send
                a reset link. The link expires in 30 minutes.
              </p>

              <div className="p-5 sm:p-6 notched-sm mt-auto" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="pill-yellow mb-4">What happens next</div>
                <ul className="space-y-2">
                  <li className="bullet-arrow text-[14px] text-white/90 font-medium">We email you a one-time reset link</li>
                  <li className="bullet-arrow text-[14px] text-white/90 font-medium">Open it within 30 minutes</li>
                  <li className="bullet-arrow text-[14px] text-white/90 font-medium">Set a new password</li>
                  <li className="bullet-arrow text-[14px] text-white/90 font-medium">Sign back in</li>
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
                    <Mail size={28} strokeWidth={2.5} className="text-white" />
                  </div>
                  <h2 className="pixel text-[28px] sm:text-[32px] text-[var(--navy)] mb-3 leading-tight">Check your email.</h2>
                  <p className="text-[14px] text-[var(--text-mute)] mb-6 font-medium leading-relaxed">
                    If <span className="font-semibold text-[var(--navy)]">{email}</span> is connected to an account,
                    we just sent it a reset link. Look for an email from DSHub. Check your spam folder if you don't see it.
                  </p>
                  <a href="#signin" className="btn-primary mb-3">
                    <span>Back to sign in</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </a>
                  <button
                    type="button"
                    onClick={() => { setStatus('idle'); setEmail(''); setTouched(false); setError(''); }}
                    className="text-[13px] font-semibold text-[var(--blue)] underline-grow"
                  >
                    Try a different email
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <div className="w-14 h-14 mb-5 bg-[var(--paper-warm)] notched-sm flex items-center justify-center" style={{ border: '2px solid var(--navy)' }}>
                      <KeyRound size={22} strokeWidth={2} className="text-[var(--navy)]" />
                    </div>
                    <h2 className="pixel text-[30px] sm:text-[34px] leading-[1.05] text-[var(--navy)] mb-2">
                      Reset your<br />
                      <span className="text-[var(--blue)]">password.</span>
                    </h2>
                    <p className="text-[13px] text-[var(--text-mute)] font-medium">
                      We'll email you a link to choose a new one.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate>
                    <div>
                      <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Email</label>
                      <div className={`field-wrap ${touched && error ? 'has-error' : ''}`}>
                        <Mail size={16} strokeWidth={2} className="text-[var(--text-mute)]" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => { setTouched(true); setError(validate(email)); }}
                          disabled={status === 'loading'}
                          aria-invalid={!!error}
                          aria-describedby={error ? 'email-error' : undefined}
                          className="field-input"
                          placeholder="you@dshub.com"
                        />
                      </div>
                      <div className="min-h-[18px] mt-1.5">
                        {touched && error && (
                          <span id="email-error" role="alert" className="text-[12px] font-medium text-[var(--error)] flex items-center gap-1.5">
                            <AlertCircle size={12} strokeWidth={2} /> {error}
                          </span>
                        )}
                      </div>
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="btn-primary mt-6">
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} strokeWidth={2.5} className="spin" />
                          <span>Sending link…</span>
                        </>
                      ) : (
                        <>
                          <span>Send reset link</span>
                          <ArrowRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-7 pt-6 border-t-2 border-dashed border-[var(--border)] text-center">
                    <p className="text-[13px] text-[var(--text-mute)] font-medium">
                      Remembered it? <a href="#signin" className="text-[var(--blue)] font-semibold underline-grow">Sign in instead</a>
                    </p>
                  </div>
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
