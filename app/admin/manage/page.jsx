'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Code2, Database, Shield, Palette, Cpu, BarChart3 } from 'lucide-react';

const ICONS = { Code2, Database, Shield, Palette, Cpu, BarChart3 };

const INITIAL_TRACKS = [
  { id: 't1', name: 'Frontend Development', icon: 'Code2', blurb: 'React, Next.js, design systems', interns: 14, mentors: 2, active: true },
  { id: 't2', name: 'Backend Engineering', icon: 'Database', blurb: 'APIs, databases, distributed systems', interns: 12, mentors: 2, active: true },
  { id: 't3', name: 'Cybersecurity', icon: 'Shield', blurb: 'OWASP, pentesting, threat modeling', interns: 9, mentors: 1, active: true },
  { id: 't4', name: 'Product Management', icon: 'BarChart3', blurb: 'Roadmaps, specs, stakeholder mgmt', interns: 11, mentors: 1, active: true },
  { id: 't5', name: 'UI/UX Design', icon: 'Palette', blurb: 'User research, prototyping, systems', interns: 10, mentors: 1, active: true },
  { id: 't6', name: 'Data Science', icon: 'Cpu', blurb: 'Analytics, ML, visualization', interns: 8, mentors: 1, active: true },
];

const BTN_PRIMARY = 'inline-flex items-center justify-center gap-2 bg-[var(--blue)] text-[var(--navy)] border-2 border-[var(--blue)] px-4 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.06em] hover:bg-[var(--navy)] hover:border-[var(--navy)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
const BTN_OUTLINE = 'inline-flex items-center justify-center gap-2 border-2 border-[var(--navy)] text-[var(--navy)] px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-[var(--navy)] hover:text-white transition-colors';

function TrackEditor({ track, onSave, onClose }) {
  const [form, setForm] = useState(track || { name: '', icon: 'Code2', blurb: '', active: true });
  const isNew = !track;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 pop-in" onClick={onClose}>
      <div className="bg-white max-w-md w-full notched p-6 lg:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="pixel text-[24px] text-[var(--navy)]">{isNew ? 'New Track' : 'Edit Track'}</h3>
          <button onClick={onClose} className="text-[var(--text-mute)] hover:text-[var(--navy)]" aria-label="Close"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Track name</label>
            <input
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-semibold text-[14px] text-[var(--navy)]"
              placeholder="e.g. Mobile Development" autoFocus
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {Object.keys(ICONS).map(k => {
                const Icon = ICONS[k];
                const sel = form.icon === k;
                return (
                  <button
                    key={k} type="button" onClick={() => setForm({ ...form, icon: k })}
                    className={`aspect-square flex items-center justify-center border-2 transition-colors notched-sm ${sel ? 'bg-[var(--blue)] border-[var(--blue)]' : 'bg-white border-[var(--border)] hover:border-[var(--navy)]'}`}
                  >
                    <Icon size={18} strokeWidth={2} className={sel ? 'text-white' : 'text-[var(--navy)]'} />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-soft)] block mb-1.5">Short blurb</label>
            <input
              value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              className="w-full p-3 border-2 border-[var(--border)] focus:border-[var(--blue)] outline-none font-medium text-[13px] text-[var(--text-soft)]"
              placeholder="e.g. iOS, Android, React Native"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="sr-only" />
            <span className={`w-11 h-6 relative transition-colors ${form.active ? 'bg-[var(--success)]' : 'bg-[var(--border)]'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white transition-transform ${form.active ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
            </span>
            <span className="text-[13px] font-semibold text-[var(--text-soft)]">Active and visible to interns</span>
          </label>
        </div>

        <div className="flex items-center gap-3 mt-7 pt-5 border-t-2 border-[var(--border)]">
          <button onClick={() => onSave(form)} disabled={!form.name.trim()} className={`${BTN_PRIMARY} flex-1`}>
            <Check size={13} strokeWidth={2.5} /> {isNew ? 'Create Track' : 'Save changes'}
          </button>
          <button onClick={onClose} className={BTN_OUTLINE}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminTracks() {
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [editor, setEditor] = useState(null);

  const save = (track) => {
    if (track.id) {
      setTracks(prev => prev.map(t => t.id === track.id ? { ...t, ...track } : t));
    } else {
      setTracks(prev => [...prev, { ...track, id: `t${Date.now()}`, interns: 0, mentors: 0 }]);
    }
    setEditor(null);
  };

  const del = (id) => {
    if (confirm('Delete this track? Existing interns on this track will not be removed.')) {
      setTracks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 reveal">
        <div>
          <span className="pill-yellow mb-2 inline-block">Track Management</span>
          <h2 className="pixel text-[26px] lg:text-[30px] leading-tight text-[var(--navy)]">
            All Tracks <span className="text-[var(--text-mute)] mono text-[18px]">({tracks.length})</span>
          </h2>
        </div>
        <button onClick={() => setEditor('new')} className={BTN_PRIMARY}>
          <Plus size={14} strokeWidth={2.5} /> New Track
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal" style={{ animationDelay: '60ms' }}>
        {tracks.map(t => {
          const Icon = ICONS[t.icon] || Code2;
          return (
            <div key={t.id} className="card notched-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 bg-[var(--navy)] flex items-center justify-center notched-sm">
                  <Icon size={18} className="text-white" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditor(t)} className="p-1.5 text-[var(--text-mute)] hover:text-[var(--blue)]" aria-label="Edit track"><Edit size={14} strokeWidth={2.2} /></button>
                  <button onClick={() => del(t.id)} className="p-1.5 text-[var(--text-mute)] hover:text-[var(--error)]" aria-label="Delete track"><Trash2 size={14} strokeWidth={2.2} /></button>
                </div>
              </div>
              <h3 className="font-extrabold text-[15px] text-[var(--navy)] mb-1.5">{t.name}</h3>
              <p className="text-[12px] text-[var(--text-mute)] font-medium mb-4 leading-snug">{t.blurb}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-mute)]">
                  <span><span className="text-[var(--navy)] mono">{t.interns}</span> interns</span>
                  <span><span className="text-[var(--navy)] mono">{t.mentors}</span> mentors</span>
                </div>
                {t.active ? <span className="pill-success">Active</span> : <span className="pill-warn">Hidden</span>}
              </div>
            </div>
          );
        })}
      </div>

      {editor && <TrackEditor track={editor === 'new' ? null : editor} onSave={save} onClose={() => setEditor(null)} />}
    </>
  );
}
