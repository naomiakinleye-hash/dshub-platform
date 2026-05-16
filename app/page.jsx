'use client';

import { useState, useEffect } from 'react';
import {
  ArrowUpRight, ChevronRight, Github, Linkedin, Mail, MapPin,
  Quote, Twitter, Award, Code2, Shield, Database, Palette,
  BarChart3, Cpu, Play, Calendar, Sparkles
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
    }

    .ds-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--navy);
      background: var(--paper);
    }
    .ds-root * { -webkit-font-smoothing: antialiased; }

    .pixel { font-family: 'Pixelify Sans', sans-serif; font-weight: 600; letter-spacing: 0.01em; }
    .pixel-light { font-family: 'Pixelify Sans', sans-serif; font-weight: 400; }
    .mono { font-family: 'DM Mono', monospace; }

    .texture-bg {
      background-color: var(--paper);
      background-image:
        repeating-linear-gradient(135deg, transparent 0, transparent 22px, rgba(33,150,243,0.05) 22px, rgba(33,150,243,0.05) 23px),
        repeating-linear-gradient(45deg, transparent 0, transparent 28px, rgba(27,45,92,0.03) 28px, rgba(27,45,92,0.03) 29px);
    }

    .notched {
      clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
    }
    .notched-sm {
      clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
    }
    .notched-tab {
      clip-path: polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
    }

    .pill-yellow {
      background: var(--yellow); color: var(--navy);
      font-weight: 800; font-size: 10px; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 4px 9px; display: inline-block; line-height: 1.3;
    }
    .pill-blue {
      background: var(--blue-pale); color: var(--blue-deep);
      font-weight: 700; font-size: 10px; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 4px 10px; display: inline-block;
    }
    .pill-navy {
      background: var(--navy); color: var(--white);
      font-weight: 700; font-size: 10px; letter-spacing: 0.14em;
      text-transform: uppercase; padding: 4px 10px; display: inline-block;
    }

    .bullet-arrow::before {
      content: '›'; color: var(--blue); font-weight: 700; margin-right: 8px; font-size: 1.15em;
    }

    .btn-blue {
      background: var(--blue); color: var(--navy);
      padding: 13px 22px; font-size: 13px; font-weight: 800;
      letter-spacing: 0.06em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--blue); cursor: pointer;
      transition: background 220ms ease, border-color 220ms ease, color 220ms ease;
    }
    .btn-blue:hover { background: var(--navy); border-color: var(--navy); color: var(--white); }

    .btn-outline {
      background: transparent; color: var(--navy);
      padding: 13px 22px; font-size: 13px; font-weight: 700;
      letter-spacing: 0.06em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--navy); cursor: pointer;
      transition: background 220ms ease, color 220ms ease;
    }
    .btn-outline:hover { background: var(--navy); color: var(--white); }

    .btn-yellow {
      background: var(--yellow); color: var(--navy);
      padding: 13px 22px; font-size: 13px; font-weight: 800;
      letter-spacing: 0.06em; text-transform: uppercase;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      border: 2px solid var(--yellow); cursor: pointer;
      transition: background 220ms ease, transform 100ms ease;
    }
    .btn-yellow:hover { background: var(--yellow-soft); }

    .lift { transition: transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1); }
    .lift:hover { transform: translateY(-4px); }

    .underline-grow { position: relative; }
    .underline-grow::after {
      content: ''; position: absolute; left: 0; bottom: -2px;
      width: 100%; height: 2px; background: currentColor;
      transform: scaleX(0); transform-origin: left;
      transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .underline-grow:hover::after { transform: scaleX(1); }

    .tabular { font-variant-numeric: tabular-nums; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    .reveal { animation: fadeUp 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }

    @keyframes blink { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0.4; } }
    .blink { animation: blink 1.4s ease-in-out infinite; }
  `}</style>
);

// ============================================================
// HALFTONE DOT PATTERN
// ============================================================
function DotPattern({ direction = 'left', color = '#2196F3', size = 'md' }) {
  const rows = size === 'lg' ? 9 : 7;
  const cols = size === 'lg' ? 6 : 5;
  const spacing = size === 'lg' ? 24 : 22;
  return (
    <svg width={cols * spacing + 16} height={rows * spacing + 16} viewBox={`0 0 ${cols * spacing + 16} ${rows * spacing + 16}`} aria-hidden="true">
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => {
          const x = col * spacing + 8;
          const y = row * spacing + 8;
          const w = direction === 'left' ? col : cols - 1 - col;
          const r = Math.min(6, w * 1.1 + 1.6);
          const op = Math.min(0.85, 0.3 + w * 0.13);
          return <circle key={`${row}-${col}`} cx={x} cy={y} r={r} fill={color} opacity={op} />;
        })
      )}
    </svg>
  );
}

// ============================================================
// DATA
// ============================================================
const GRADUATION_DATE = new Date('2026-05-30T18:00:00+01:00').getTime();

const STATS = [
  { label: 'Interns Graduating', value: '64' },
  { label: 'Tracks Completed', value: '06' },
  { label: 'Capstone Projects', value: '18' },
  { label: 'Mentor Hours Logged', value: '1240' },
];

const TRACKS = [
  { name: 'Frontend Development', count: 14, icon: Code2 },
  { name: 'Backend Engineering', count: 12, icon: Database },
  { name: 'Cybersecurity', count: 9, icon: Shield },
  { name: 'Product Management', count: 11, icon: BarChart3 },
  { name: 'UI/UX Design', count: 10, icon: Palette },
  { name: 'Data Science', count: 8, icon: Cpu },
];

const INTERNS = [
  { name: 'Adaeze Okonkwo', track: 'Frontend Development', city: 'Lagos', project: 'Graduation Web Platform', initials: 'AO' },
  { name: 'Olumide Balogun', track: 'Backend Engineering', city: 'Abuja', project: 'Analytics API Layer', initials: 'OB' },
  { name: 'Ngozi Eze', track: 'Cybersecurity', city: 'Port Harcourt', project: 'OWASP Audit Toolkit', initials: 'NE' },
  { name: 'Tunde Adebayo', track: 'Product Management', city: 'Ibadan', project: 'Cohort Roadmap System', initials: 'TA' },
  { name: 'Chiamaka Nwosu', track: 'UI/UX Design', city: 'Lagos', project: 'DSHub Design System', initials: 'CN' },
  { name: 'Ibrahim Yusuf', track: 'Data Science', city: 'Kano', project: 'Engagement Predictor', initials: 'IY' },
  { name: 'Folake Adesina', track: 'Frontend Development', city: 'Lagos', project: 'Mentor Recognition Portal', initials: 'FA' },
  { name: 'Kelechi Anyanwu', track: 'Backend Engineering', city: 'Enugu', project: 'Auth & Roles Service', initials: 'KA' },
  { name: 'Aminat Lawal', track: 'Cybersecurity', city: 'Kaduna', project: 'Pentest Reporting Suite', initials: 'AL' },
  { name: 'Emeka Obi', track: 'Product Management', city: 'Lagos', project: 'Submission Performance Tracker', initials: 'EO' },
  { name: 'Halima Sani', track: 'UI/UX Design', city: 'Abuja', project: 'Intern Profile Card System', initials: 'HS' },
  { name: 'Chinedu Okeke', track: 'Data Science', city: 'Owerri', project: 'Track Performance Insights', initials: 'CO' },
];

const MENTORS = [
  { name: 'Engr Abdulrahman Abdulrahim', role: 'Frontend & Backend', focus: 'Full-stack architecture, React, Node.js, distributed systems', years: 9 },
  { name: 'Dr. Aisha Mohammed', role: 'Lead Mentor, Engineering', focus: 'Distributed systems, AWS architecture, scalability', years: 12 },
  { name: 'Victor John', role: 'Cybersecurity', focus: 'OWASP, penetration testing, threat modeling', years: 10 },
  { name: 'Umar Tijjani Ahmed', role: 'Program Coordinator', focus: 'Curriculum design, cohort operations', years: 7 },
];

const TESTIMONIALS = [
  { quote: 'DSHub gave me more than skills. It gave me the language to describe what I had been building alone for years.', author: 'Adaeze Okonkwo', role: 'Frontend Track, Cohort A' },
  { quote: 'Pairing with a mentor weekly changed how I read code. I started seeing the shape of decisions, not just syntax.', author: 'Olumide Balogun', role: 'Backend Track, Cohort A' },
  { quote: 'The cross-track collaboration on the final project taught me what it actually means to ship something with other humans.', author: 'Ngozi Eze', role: 'Cybersecurity Track, Cohort A' },
];

const HIGHLIGHTS = [
  { title: 'Opening Ceremony', meta: 'Week 1' },
  { title: 'Mid-Cohort Hackathon', meta: 'Week 4' },
  { title: 'Mentor Office Hours', meta: 'Weekly' },
  { title: 'Cross-Track Reviews', meta: 'Week 6' },
  { title: 'Capstone Demo Day', meta: 'Week 7' },
  { title: 'Graduation Ceremony', meta: 'May 30' },
];

// ============================================================
// COUNTDOWN HOOK
// ============================================================
function useCountdown(target) {
  // Initialize with target so SSR and first client render both produce zeros.
  // Real countdown starts after mount, avoiding hydration mismatch.
  const [now, setNow] = useState(target);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const links = ['Cohort', 'Interns', 'Mentors', 'Voices', 'Highlights'];
  return (
    <nav className="sticky top-0 z-40 texture-bg border-b border-[var(--border)] backdrop-blur-md" style={{ backgroundColor: 'rgba(245,247,250,0.92)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          {/* Logo placeholder — swap with <img src="/logo.svg" /> later */}
          <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[14px] notched-sm">DS</div>
          <div className="leading-none">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[15px] text-[var(--navy)]">DSHub</span>
              <span className="pill-yellow">Cohort A</span>
            </div>
            <div className="text-[11px] text-[var(--text-mute)] mt-0.5 font-medium">Internship Program 2026</div>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--navy)] underline-grow">{l}</a>
          ))}
        </div>
        <a href="/signin" className="btn-blue text-[11px] py-2.5 px-4">
          Sign In <ArrowUpRight size={13} strokeWidth={2.5} />
        </a>
      </div>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const { days, hours, mins, secs } = useCountdown(GRADUATION_DATE);
  return (
    <section className="relative overflow-hidden texture-bg">
      <div className="absolute top-20 right-8 opacity-50 hidden lg:block">
        <DotPattern direction="right" color="#2196F3" size="lg" />
      </div>
      <div className="absolute bottom-12 left-8 opacity-40 hidden lg:block">
        <DotPattern direction="left" color="#1B2D5C" size="md" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-20 lg:pt-20 lg:pb-28 relative">
        <div className="flex items-center gap-2 mb-8 reveal flex-wrap">
          <span className="pill-yellow">Class of 2026</span>
          <span className="pill-navy">Final Week · 8–9</span>
          <span className="pill-blue">Cohort A</span>
        </div>

        <h1 className="reveal" style={{ animationDelay: '60ms' }}>
          <span className="pixel block text-[13vw] md:text-[8.5vw] lg:text-[120px] leading-[1.0] text-[var(--navy)]">
            From Learning
          </span>
          <span className="pixel block text-[13vw] md:text-[8.5vw] lg:text-[120px] leading-[1.0] text-[var(--blue)] mt-1">
            to Legacy<span className="text-[var(--yellow)] blink">.</span>
          </span>
        </h1>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-end">
          <p className="text-[17px] leading-[1.55] max-w-[540px] text-[var(--text-soft)] reveal font-medium" style={{ animationDelay: '120ms' }}>
            Sixty-four interns. Six tracks. One semester of late nights, sharp questions,
            and code reviewed in red ink. This is where their work goes on the record.
          </p>

          <div className="reveal" style={{ animationDelay: '180ms' }}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[var(--text-mute)]">Graduates In</span>
              <span className="mono text-[11px] text-[var(--text-mute)]">30 May 2026 · 18:00 WAT</span>
            </div>
            <div className="h-[2px] bg-[var(--navy)] mb-4" />
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { label: 'Days', value: days },
                { label: 'Hours', value: hours },
                { label: 'Min', value: mins },
                { label: 'Sec', value: secs },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white notched-sm px-2 py-4 text-center border border-[var(--border)]">
                  <div className="pixel tabular text-[40px] leading-none text-[var(--navy)]">{String(value).padStart(2, '0')}</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-mute)] mt-2">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <a href="#interns" className="btn-blue text-[11px] py-2.5 px-4">View Cohort <ChevronRight size={13} strokeWidth={2.5} /></a>
              <a href="#" className="btn-outline text-[11px] py-2.5 px-4">Stream Live <Play size={12} strokeWidth={2.5} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// COHORT
// ============================================================
function CohortSection() {
  return (
    <section id="cohort" className="bg-white border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">
          <div>
            <span className="pill-yellow mb-4 inline-block">§ 01 — The Cohort</span>
            <h2 className="pixel text-[40px] lg:text-[52px] leading-[1.0] text-[var(--navy)]">
              A class<br />
              <span className="text-[var(--blue)]">measured in</span><br />
              shipped work<span className="text-[var(--yellow)]">.</span>
            </h2>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mb-14">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="pixel tabular text-[44px] lg:text-[54px] leading-none text-[var(--navy)]">{s.value}</div>
                  <div className="h-[2px] bg-[var(--blue)] w-10 mt-3 mb-3" />
                  <div className="text-[12px] font-semibold text-[var(--text-mute)] tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="pill-navy mb-4 inline-block">Tracks</div>
            <div className="h-[2px] bg-[var(--navy)] mb-2" />
            <div className="grid sm:grid-cols-2 gap-x-10">
              {TRACKS.map(t => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <Icon size={16} strokeWidth={2} className="text-[var(--blue)]" />
                      <span className="text-[14px] font-semibold text-[var(--text-soft)]">{t.name}</span>
                    </div>
                    <span className="mono tabular text-[12px] text-[var(--text-mute)] font-medium">{String(t.count).padStart(2, '0')} interns</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// INTERNS
// ============================================================
function InternsSection() {
  const [filter, setFilter] = useState('All');
  const tracks = ['All', ...TRACKS.map(t => t.name)];
  const filtered = filter === 'All' ? INTERNS : INTERNS.filter(i => i.track === filter);

  return (
    <section id="interns" className="texture-bg relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <span className="pill-yellow mb-3 inline-block">§ 02 — The Interns</span>
            <h2 className="pixel text-[40px] lg:text-[52px] leading-[1.0] text-[var(--navy)]">
              Sixty-four <span className="text-[var(--blue)]">profiles</span><span className="text-[var(--yellow)]">,</span><br />
              one record<span className="text-[var(--yellow)]">.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tracks.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-2 border-2 transition-colors ${
                  filter === t
                    ? 'bg-[var(--navy)] text-white border-[var(--navy)]'
                    : 'bg-white text-[var(--navy)] border-[var(--border)] hover:border-[var(--navy)]'
                }`}
              >
                {t === 'All' ? 'All' : t.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((i) => {
            const tints = ['#2196F3', '#1B2D5C', '#0D6EBF', '#2E4585'];
            const tint = tints[i.name.length % 4];
            const tileText = tint === '#2196F3' ? '#1B2D5C' : '#FFFFFF';
            return (
              <article key={i.name} className="bg-white p-5 notched-sm border border-[var(--border)] lift group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center font-extrabold text-[15px] notched-sm" style={{ background: tint, color: tileText }}>
                    {i.initials}
                  </div>
                  <ArrowUpRight size={16} strokeWidth={2} className="text-[var(--text-mute)] group-hover:text-[var(--blue)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-extrabold text-[16px] leading-tight mb-1 text-[var(--navy)]">{i.name}</h3>
                <div className="pill-blue mb-3">{i.track.split(' ')[0]}</div>
                <div className="flex items-center gap-1.5 text-[12px] text-[var(--text-mute)] mb-2 font-medium">
                  <MapPin size={11} strokeWidth={2} /> {i.city}
                </div>
                <div className="text-[12px] leading-snug border-t border-[var(--border)] pt-2 mt-2">
                  <span className="text-[var(--text-mute)] font-medium">Capstone: </span>
                  <span className="text-[var(--text-soft)] font-semibold">{i.project}</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="btn-outline text-[11px] py-2.5 px-5">View All 64 Graduates <ChevronRight size={13} strokeWidth={2.5} /></button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MENTORS
// ============================================================
function MentorsSection() {
  return (
    <section id="mentors" className="bg-[var(--navy)] text-white relative overflow-hidden">
      <div className="absolute top-12 right-10 opacity-50 hidden md:block">
        <DotPattern direction="right" color="#5FB3FF" size="lg" />
      </div>
      <div className="absolute bottom-12 left-10 opacity-40 hidden md:block">
        <DotPattern direction="left" color="#FBC02D" size="md" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">
        <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">
          <div>
            <span className="pill-yellow mb-3 inline-block">§ 03 — Meet your mentors</span>
            <h2 className="pixel text-[40px] lg:text-[52px] leading-[1.0]">
              The voices<br />
              <span className="text-[var(--yellow-soft)]">behind</span><br />
              the work<span className="text-[var(--yellow)]">.</span>
            </h2>
            <p className="text-[14px] leading-relaxed mt-5 text-white/80 max-w-[300px] font-medium">
              Every cohort owes a debt to the engineers and designers who showed up
              to review code, ask hard questions, and stay late on Fridays.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {MENTORS.map(m => (
              <article key={m.name} className="bg-[var(--navy-deep)] p-6 notched-sm border border-white/15 lift">
                <Award size={22} className="text-[var(--yellow)] mb-5" strokeWidth={2} />
                <h3 className="font-extrabold text-[18px] leading-tight mb-2">{m.name}</h3>
                <div className="pill-yellow mb-4">{m.role}</div>
                <div className="text-[13px] leading-relaxed text-white/80 mb-5 font-medium">{m.focus}</div>
                <div className="flex items-baseline gap-2 border-t border-white/10 pt-4">
                  <span className="pixel tabular text-[28px] leading-none text-[var(--yellow-soft)]">{m.years}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">yrs in field</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TESTIMONIALS
// ============================================================
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section id="voices" className="bg-white border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <span className="pill-yellow mb-3 inline-block">§ 04 — Voices</span>
        <h2 className="pixel text-[40px] lg:text-[52px] leading-[1.0] text-[var(--navy)] mb-12">
          What they will say <span className="text-[var(--blue)]">about it later</span><span className="text-[var(--yellow)]">.</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
          <div className="relative bg-[var(--paper-warm)] p-8 lg:p-10 notched border border-[var(--border)]">
            <Quote size={56} className="text-[var(--blue)] opacity-25 absolute top-4 left-4" strokeWidth={1.5} />
            <blockquote className="relative">
              <p className="pixel text-[24px] lg:text-[32px] leading-[1.2] mb-7 text-[var(--navy)]">
                "{TESTIMONIALS[active].quote}"
              </p>
              <footer>
                <div className="h-[2px] bg-[var(--blue)] mb-3 w-10" />
                <div className="font-extrabold text-[16px] text-[var(--navy)]">{TESTIMONIALS[active].author}</div>
                <div className="pill-blue mt-2">{TESTIMONIALS[active].role}</div>
              </footer>
            </blockquote>
          </div>
          <div className="space-y-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`block w-full text-left p-4 border-l-[3px] transition-colors ${
                  active === idx ? 'border-[var(--blue)] bg-[var(--paper-warm)]' : 'border-transparent hover:bg-[var(--paper)]'
                }`}
              >
                <div className="font-extrabold text-[14px] text-[var(--navy)] mb-1">{t.author}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-mute)]">{t.role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HIGHLIGHTS
// ============================================================
function HighlightsSection() {
  return (
    <section id="highlights" className="texture-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <span className="pill-yellow mb-3 inline-block">§ 05 — Highlights</span>
            <h2 className="pixel text-[40px] lg:text-[52px] leading-[1.0] text-[var(--navy)]">
              Nine weeks, <span className="text-[var(--blue)]">in pictures</span><span className="text-[var(--yellow)]">.</span>
            </h2>
          </div>
          <a href="#" className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue)] underline-grow flex items-center gap-2">
            Open full gallery <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((h, idx) => {
            const colors = ['#2196F3', '#1B2D5C', '#0D6EBF', '#2E4585', '#1B2D5C', '#2196F3'];
            const bg = colors[idx];
            const textCol = bg === '#2196F3' ? '#1B2D5C' : '#FFFFFF';
            return (
              <article key={h.title} className={`lift cursor-pointer ${idx === 0 || idx === 4 ? 'lg:col-span-2' : ''}`}>
                <div className="aspect-[4/3] relative overflow-hidden notched-sm" style={{ background: bg }}>
                  <div className="absolute inset-0 opacity-25" style={{
                    backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(251,192,45,0.3) 0%, transparent 50%)`
                  }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-5" style={{ color: textCol }}>
                    <Play size={22} strokeWidth={2} className="opacity-90" />
                    <div>
                      <span className="pill-yellow mb-2">{h.meta}</span>
                      <div className="pixel text-[20px] lg:text-[24px] leading-tight mt-2">{h.title}</div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA
// ============================================================
function CTASection() {
  return (
    <section className="bg-[var(--navy)] text-white relative overflow-hidden border-y border-white/10">
      <div className="absolute top-10 left-10 opacity-50 hidden md:block">
        <DotPattern direction="left" color="#FBC02D" size="md" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-50 hidden md:block">
        <DotPattern direction="right" color="#5FB3FF" size="md" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-20 text-center relative z-10">
        <Sparkles size={28} className="text-[var(--yellow)] mx-auto mb-5" strokeWidth={2} />
        <span className="pill-yellow mb-5 inline-block">Live · 30 May 2026</span>
        <h2 className="pixel text-[40px] lg:text-[64px] leading-[1.0] max-w-3xl mx-auto">
          Be in the room<br />
          when the <span className="text-[var(--yellow-soft)]">class of 2026</span><br />
          walks<span className="text-[var(--yellow)]">.</span>
        </h2>
        <p className="text-[15px] max-w-md mx-auto mt-6 text-white/85 font-medium">
          The ceremony streams live on May 30. Reserve your seat or RSVP for the
          in-person event in Lagos.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
          <a href="#" className="btn-yellow">
            <Calendar size={14} strokeWidth={2.5} /> RSVP for the ceremony
          </a>
          <a href="#" className="text-[11px] font-bold uppercase tracking-[0.06em] text-white border-2 border-white/40 py-3 px-5 hover:border-white transition-colors inline-flex items-center gap-2">
            Stream live <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <>
      <footer className="texture-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[var(--navy)] flex items-center justify-center text-white font-extrabold text-[14px] notched-sm">DS</div>
                <div>
                  <div className="font-extrabold text-[15px] text-[var(--navy)]">DSHub</div>
                  <div className="text-[11px] text-[var(--text-mute)] font-medium">Internship Program 2026</div>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-[var(--text-mute)] max-w-xs font-medium mt-4">
                The DSHub Internship Program is a structured talent pipeline running
                from intake to graduation across six engineering and product tracks.
              </p>
            </div>
            {[
              { title: 'Program', links: ['Tracks', 'Curriculum', 'Apply', 'FAQ'] },
              { title: 'Cohort A', links: ['Interns', 'Mentors', 'Projects', 'Schedule'] },
              { title: 'Connect', links: ['LinkedIn', 'GitHub', 'Twitter', 'Email'] },
            ].map(col => (
              <div key={col.title}>
                <div className="pill-navy mb-4 inline-block">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-[13px] font-semibold text-[var(--text-soft)] hover:text-[var(--blue)] underline-grow">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[2px] bg-[var(--navy)] mb-5" />
          <div className="flex flex-wrap justify-between items-center gap-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-mute)]">
            <div>© 2026 DSHub · All work belongs to its makers.</div>
            <div className="flex items-center gap-5">
              <a href="#" className="flex items-center gap-1.5 hover:text-[var(--navy)]"><Github size={12} strokeWidth={2.5} /> GitHub</a>
              <a href="#" className="flex items-center gap-1.5 hover:text-[var(--navy)]"><Linkedin size={12} strokeWidth={2.5} /> LinkedIn</a>
              <a href="#" className="flex items-center gap-1.5 hover:text-[var(--navy)]"><Twitter size={12} strokeWidth={2.5} /> Twitter</a>
              <a href="#" className="flex items-center gap-1.5 hover:text-[var(--navy)]"><Mail size={12} strokeWidth={2.5} /> Contact</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Link bar — matches flyer footer */}
      <div className="bg-[var(--navy)] text-white text-center py-4 px-4 text-[13px] font-medium">
        Learn more at <a href="https://internship.dshub.com.ng" className="font-bold italic underline-grow ml-1">https://internship.dshub.com.ng</a>
      </div>
    </>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function GraduationPlatform() {
  return (
    <div className="ds-root min-h-screen">
      <Styles />
      <Nav />
      <Hero />
      <CohortSection />
      <InternsSection />
      <MentorsSection />
      <TestimonialsSection />
      <HighlightsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
