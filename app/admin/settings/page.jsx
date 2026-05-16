'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

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

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [lateFlag, setLateFlag] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-5 max-w-3xl">
      <section className="card notched p-6 lg:p-7 reveal">
        <span className="pill-yellow mb-3 inline-block">Program</span>
        <h2 className="pixel text-[24px] text-[var(--navy)] mb-5">Cohort configuration</h2>
        <div className="space-y-5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Active cohort</label>
            <div className="border-2 border-[var(--border)] px-3 py-2.5 flex items-center justify-between">
              <span className="font-semibold text-[14px] text-[var(--navy)]">Cohort A · 2026</span>
              <span className="pill-success">Live</span>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Graduation date</label>
            <input defaultValue="2026-05-24" type="date" className="border-2 border-[var(--border)] px-3 py-2.5 text-[14px] font-semibold text-[var(--navy)] outline-none focus:border-[var(--blue)] w-full" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Application link (external)</label>
            <input defaultValue="https://forms.dshub.com.ng/apply" className="border-2 border-[var(--border)] px-3 py-2.5 text-[14px] font-medium text-[var(--navy)] outline-none focus:border-[var(--blue)] w-full" />
          </div>
        </div>
      </section>

      <section className="card notched p-6 lg:p-7 reveal" style={{ animationDelay: '60ms' }}>
        <span className="pill-yellow mb-3 inline-block">Automation</span>
        <h2 className="pixel text-[24px] text-[var(--navy)] mb-5">Rules</h2>
        <div className="divide-y divide-[var(--border)]">
          {[
            { label: 'Auto-approve mentor applications', desc: 'Skip manual review for vetted domains', v: autoApprove, set: setAutoApprove },
            { label: 'Auto-flag late submissions', desc: 'Mark submissions past deadline automatically', v: lateFlag, set: setLateFlag },
            { label: 'Weekly summary report', desc: 'Email a cohort digest every Monday', v: weeklyReport, set: setWeeklyReport },
            { label: 'Maintenance mode', desc: 'Temporarily disable intern/mentor portals', v: maintenance, set: setMaintenance },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-4">
              <div>
                <div className="font-bold text-[14px] text-[var(--navy)]">{r.label}</div>
                <div className="text-[12px] text-[var(--text-mute)] font-medium mt-0.5">{r.desc}</div>
              </div>
              <Toggle value={r.v} onChange={r.set} />
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button onClick={save} className="bg-[var(--blue)] text-[var(--navy)] border-2 border-[var(--blue)] px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.06em] hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white transition-colors">
          Save changes
        </button>
        {saved && <span className="pill-success"><Check size={10} className="inline mr-1" strokeWidth={2.5} /> Saved</span>}
      </div>
    </div>
  );
}
