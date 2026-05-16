'use client';

import { useState } from 'react';
import { FileCheck, ExternalLink } from 'lucide-react';
import { getSubmissions, STATUS_STYLE } from '@/app/lib/adminData';

export default function AdminSubmissions() {
  const all = getSubmissions();
  const [filter, setFilter] = useState('all');

  const rows = all.filter(s => filter === 'all' || s.status === filter);

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
        {[
          { label: 'Total', value: all.length },
          { label: 'Pending', value: all.filter(s => s.status === 'pending').length },
          { label: 'Reviewed', value: all.filter(s => s.status === 'reviewed').length },
          { label: 'Flagged', value: all.filter(s => s.status === 'flagged').length },
        ].map((s, i) => (
          <div key={i} className="card notched-sm p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{s.label}</div>
            <div className="pixel tabular text-[36px] leading-none text-[var(--navy)]">{String(s.value).padStart(2, '0')}</div>
          </div>
        ))}
      </section>

      <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '60ms' }}>
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {['all', 'pending', 'reviewed', 'flagged'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] border-2 transition-colors ${filter === f ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white text-[var(--navy)] border-[var(--border)] hover:border-[var(--navy)]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b-2 border-[var(--border)]">
                {['ID', 'Intern', 'Track', 'Wk', 'Project', 'Mentor', 'Status', 'Score', ''].map(h => (
                  <th key={h} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-mute)] py-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(s => (
                <tr key={s.id} className="border-b border-[var(--border)] hover:bg-[var(--paper)] transition-colors">
                  <td className="py-3 px-2 mono text-[11px] font-bold text-[var(--text-mute)]">{s.id}</td>
                  <td className="py-3 px-2 font-bold text-[13px] text-[var(--navy)]">{s.intern}</td>
                  <td className="py-3 px-2"><span className="pill-blue">{s.track}</span></td>
                  <td className="py-3 px-2 mono tabular text-[13px] font-bold text-[var(--text-soft)]">W{s.week}</td>
                  <td className="py-3 px-2 text-[12px] font-semibold text-[var(--text-soft)]">{s.title}</td>
                  <td className="py-3 px-2 text-[12px] font-medium text-[var(--text-mute)]">{s.mentor}</td>
                  <td className="py-3 px-2"><span className={STATUS_STYLE[s.status]}>{s.status}</span></td>
                  <td className="py-3 px-2 mono tabular font-bold text-[14px] text-[var(--navy)]">{s.score ?? '—'}</td>
                  <td className="py-3 px-2">
                    <button className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--blue)] hover:text-[var(--navy)]">
                      Review <ExternalLink size={12} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center text-[13px] text-[var(--text-mute)] font-medium">Nothing in this queue.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
