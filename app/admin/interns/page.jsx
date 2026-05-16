'use client';

import { useState } from 'react';
import { Search, Filter, ArrowUpRight, Download } from 'lucide-react';
import { getInterns, STATUS_STYLE, TRACKS } from '@/app/lib/adminData';

export default function AdminInterns() {
  const all = getInterns();
  const [q, setQ] = useState('');
  const [track, setTrack] = useState('all');
  const [status, setStatus] = useState('all');

  const rows = all.filter(i => {
    const matchesQ = !q || i.name.toLowerCase().includes(q.toLowerCase()) || i.email.toLowerCase().includes(q.toLowerCase());
    const matchesTrack = track === 'all' || i.track === track;
    const matchesStatus = status === 'all' || i.status === status;
    return matchesQ && matchesTrack && matchesStatus;
  });

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
        {[
          { label: 'Total', value: all.length },
          { label: 'Active', value: all.filter(i => i.status === 'active').length },
          { label: 'Graduated', value: all.filter(i => i.status === 'graduated').length },
          { label: 'At Risk', value: all.filter(i => i.status === 'at-risk').length },
        ].map((s, i) => (
          <div key={i} className="card notched-sm p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{s.label}</div>
            <div className="pixel tabular text-[36px] leading-none text-[var(--navy)]">{String(s.value).padStart(2, '0')}</div>
          </div>
        ))}
      </section>

      <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '60ms' }}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
          <div className="flex items-center gap-2 border-2 border-[var(--border)] focus-within:border-[var(--blue)] px-3 py-2 flex-1 transition-colors">
            <Search size={16} className="text-[var(--text-mute)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email…"
              className="flex-1 outline-none text-[13px] font-medium text-[var(--navy)] bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <select value={track} onChange={(e) => setTrack(e.target.value)} className="border-2 border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--text-soft)] outline-none focus:border-[var(--blue)]">
              <option value="all">All tracks</option>
              {TRACKS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border-2 border-[var(--border)] px-3 py-2 text-[12px] font-semibold text-[var(--text-soft)] outline-none focus:border-[var(--blue)]">
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="at-risk">At risk</option>
            </select>
            <button className="flex items-center gap-2 border-2 border-[var(--navy)] px-3 py-2 text-[12px] font-bold uppercase tracking-wider text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b-2 border-[var(--border)]">
                {['Intern', 'Track', 'Plan', 'Mentor', 'Progress', 'Avg', 'Status', ''].map(h => (
                  <th key={h} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-mute)] py-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(i => (
                <tr key={i.id} className="border-b border-[var(--border)] hover:bg-[var(--paper)] transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--navy)] text-white flex items-center justify-center text-[11px] font-extrabold notched-sm flex-shrink-0">
                        {i.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="leading-tight">
                        <div className="font-bold text-[13px] text-[var(--navy)]">{i.name}</div>
                        <div className="text-[11px] text-[var(--text-mute)]">{i.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2"><span className="pill-blue">{i.track}</span></td>
                  <td className="py-3 px-2 text-[12px] font-semibold text-[var(--text-soft)]">{i.plan}</td>
                  <td className="py-3 px-2 text-[12px] font-medium text-[var(--text-soft)]">{i.mentor}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-[var(--border)]"><div className="h-full bg-[var(--blue)]" style={{ width: `${i.progress}%` }} /></div>
                      <span className="mono text-[11px] font-bold text-[var(--text-soft)]">{i.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2"><span className="mono tabular font-bold text-[14px] text-[var(--navy)]">{i.avgScore}</span></td>
                  <td className="py-3 px-2"><span className={STATUS_STYLE[i.status]}>{i.status}</span></td>
                  <td className="py-3 px-2">
                    <button className="text-[var(--text-mute)] hover:text-[var(--blue)]" aria-label="View intern"><ArrowUpRight size={16} strokeWidth={2.5} /></button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={8} className="py-12 text-center text-[13px] text-[var(--text-mute)] font-medium">No interns match those filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-[12px] text-[var(--text-mute)] font-medium">
          <span>Showing {rows.length} of {all.length}</span>
          <span className="mono">Cohort A · 2026</span>
        </div>
      </section>
    </>
  );
}
