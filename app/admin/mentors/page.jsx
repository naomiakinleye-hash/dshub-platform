'use client';

import { useState } from 'react';
import { Check, X, Star, Mail } from 'lucide-react';
import { getMentors, STATUS_STYLE } from '@/app/lib/adminData';

export default function AdminMentors() {
  const [mentors, setMentors] = useState(getMentors());
  const [filter, setFilter] = useState('all');

  const decide = (id, status) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const rows = mentors.filter(m => filter === 'all' || m.status === filter);
  const pendingCount = mentors.filter(m => m.status === 'pending').length;

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
        {[
          { label: 'Total Mentors', value: mentors.length },
          { label: 'Approved', value: mentors.filter(m => m.status === 'approved').length },
          { label: 'Pending', value: pendingCount },
          { label: 'Avg Rating', value: '4.8' },
        ].map((s, i) => (
          <div key={i} className="card notched-sm p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{s.label}</div>
            <div className="pixel tabular text-[36px] leading-none text-[var(--navy)]">{s.value}</div>
          </div>
        ))}
      </section>

      <section className="card notched p-5 lg:p-6 reveal" style={{ animationDelay: '60ms' }}>
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] border-2 transition-colors ${filter === f ? 'bg-[var(--navy)] text-white border-[var(--navy)]' : 'bg-white text-[var(--navy)] border-[var(--border)] hover:border-[var(--navy)]'}`}
            >
              {f}{f === 'pending' && pendingCount > 0 ? ` (${pendingCount})` : ''}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {rows.map(m => (
            <div key={m.id} className="border-2 border-[var(--border)] p-4 flex flex-col lg:flex-row lg:items-center gap-4 hover:border-[var(--navy)] transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-11 h-11 bg-[var(--navy)] text-white flex items-center justify-center text-[14px] font-extrabold notched-sm flex-shrink-0">
                  {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="leading-tight min-w-0">
                  <div className="font-bold text-[14px] text-[var(--navy)]">{m.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Mail size={11} className="text-[var(--text-mute)]" />
                    <span className="text-[11px] text-[var(--text-mute)] truncate">{m.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-mute)]">Track</div>
                  <span className="pill-blue mt-1">{m.track}</span>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-mute)]">Interns</div>
                  <div className="mono tabular font-bold text-[15px] text-[var(--navy)]">{m.interns}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-mute)]">Rating</div>
                  <div className="flex items-center gap-1 justify-center mono tabular font-bold text-[15px] text-[var(--navy)]">
                    {m.rating ? <><Star size={12} className="text-[var(--yellow)] fill-[var(--yellow)]" />{m.rating}</> : '—'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:w-[200px] lg:justify-end">
                {m.status === 'pending' ? (
                  <>
                    <button onClick={() => decide(m.id, 'approved')} className="flex items-center gap-1.5 bg-[var(--success)] text-white px-3 py-2 text-[12px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
                      <Check size={14} strokeWidth={2.5} /> Approve
                    </button>
                    <button onClick={() => decide(m.id, 'rejected')} className="flex items-center gap-1.5 border-2 border-[var(--error)] text-[var(--error)] px-3 py-2 text-[12px] font-bold uppercase tracking-wider hover:bg-[var(--error)] hover:text-white transition-colors">
                      <X size={14} strokeWidth={2.5} /> Reject
                    </button>
                  </>
                ) : (
                  <span className={m.status === 'rejected' ? 'pill-error' : STATUS_STYLE[m.status]}>{m.status}</span>
                )}
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="py-12 text-center text-[13px] text-[var(--text-mute)] font-medium">No mentors in this view.</div>
          )}
        </div>
      </section>
    </>
  );
}
