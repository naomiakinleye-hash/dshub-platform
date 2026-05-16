'use client';

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import Link from 'next/link';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const KPIS = [
  { label: 'Total Interns', value: 64, change: '+12%', detail: 'vs Cohort 2025', href: '/admin/interns' },
  { label: 'Active Mentors', value: 12, change: '+2', detail: 'this cohort', href: '/admin/mentors' },
  { label: 'Completion Rate', value: '94%', change: '+5%', detail: 'vs target 90%', href: '/admin/analytics' },
  { label: 'Avg Score', value: 87, suffix: '/100', change: '+3', detail: 'across capstones', href: '/admin/analytics' },
];

const SUBMISSION_DATA = [
  { week: 'W1', onTime: 60, late: 4 }, { week: 'W2', onTime: 58, late: 6 },
  { week: 'W3', onTime: 62, late: 2 }, { week: 'W4', onTime: 55, late: 9 },
  { week: 'W5', onTime: 61, late: 3 }, { week: 'W6', onTime: 59, late: 5 },
  { week: 'W7', onTime: 63, late: 1 }, { week: 'W8', onTime: 60, late: 4 },
];

const TRACK_DISTRIBUTION = [
  { name: 'Frontend', value: 14, color: '#2196F3' },
  { name: 'Backend', value: 12, color: '#1B2D5C' },
  { name: 'Cybersecurity', value: 9, color: '#FBC02D' },
  { name: 'Product Mgmt', value: 11, color: '#0D6EBF' },
  { name: 'UI/UX Design', value: 10, color: '#FFE082' },
  { name: 'Data Science', value: 8, color: '#2E4585' },
];

const ENGAGEMENT_DATA = [
  { week: 'W1', active: 52, sessions: 312 }, { week: 'W2', active: 48, sessions: 296 },
  { week: 'W3', active: 55, sessions: 340 }, { week: 'W4', active: 58, sessions: 388 },
  { week: 'W5', active: 51, sessions: 322 }, { week: 'W6', active: 56, sessions: 358 },
  { week: 'W7', active: 60, sessions: 412 }, { week: 'W8', active: 62, sessions: 448 },
];

const ACTIVITY = [
  { user: 'Adaeze Okonkwo', action: 'submitted capstone', target: 'Graduation Web Platform', track: 'Frontend', time: '2m ago', type: 'submission' },
  { user: 'Victor John', action: 'completed review of', target: 'OWASP Audit Toolkit', track: 'Cybersec', time: '12m ago', type: 'review' },
  { user: 'Olumide Balogun', action: 'submitted capstone', target: 'Analytics API Layer', track: 'Backend', time: '38m ago', type: 'submission' },
  { user: 'Dr. Aisha Mohammed', action: 'hosted office hours', target: 'Distributed Systems Q&A', track: '·', time: '1h ago', type: 'mentor' },
  { user: 'System', action: 'flagged late submission', target: 'Roadmap Teardown', track: 'Product', time: '3h ago', type: 'flag' },
  { user: 'Chiamaka Nwosu', action: 'submitted capstone', target: 'DSHub Design System', track: 'UI/UX', time: '4h ago', type: 'submission' },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card notched-sm p-3" style={{ borderColor: 'var(--navy)', borderWidth: '2px' }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--navy)] mb-2">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[12px] mb-1 last:mb-0">
          <span className="w-2 h-2 inline-block" style={{ background: p.color }} />
          <span className="font-semibold text-[var(--text-soft)]">{p.name}:</span>
          <span className="mono tabular font-bold text-[var(--navy)]">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminOverview() {
  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
        {KPIS.map((k, i) => (
          <Link key={i} href={k.href} className="card notched-sm p-5 lift block">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{k.label}</div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="pixel tabular text-[40px] leading-none text-[var(--navy)]">{k.value}</span>
              {k.suffix && <span className="text-[14px] font-bold text-[var(--text-mute)]">{k.suffix}</span>}
            </div>
            <div className="flex items-center justify-between">
              <span className="pill-success"><TrendingUp size={10} className="inline mr-1" strokeWidth={2.5} />{k.change}</span>
              <span className="text-[11px] text-[var(--text-mute)] font-medium">{k.detail}</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid lg:grid-cols-[1.6fr_1fr] gap-5 mb-6 reveal" style={{ animationDelay: '60ms' }}>
        <div className="card notched p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="pill-yellow mb-2 inline-block">Performance</span>
              <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Submission Performance</h3>
            </div>
            <span className="pill-blue">Weekly</span>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUBMISSION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(33,150,243,0.06)' }} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                <Bar dataKey="onTime" name="On Time" fill="#2196F3" radius={[2, 2, 0, 0]} />
                <Bar dataKey="late" name="Late" fill="#FBC02D" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card notched p-5 lg:p-6">
          <div className="mb-5">
            <span className="pill-yellow mb-2 inline-block">Distribution</span>
            <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Interns by Track</h3>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={TRACK_DISTRIBUTION} cx="50%" cy="48%" innerRadius={55} outerRadius={95} paddingAngle={2} dataKey="value" stroke="none">
                  {TRACK_DISTRIBUTION.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="horizontal" verticalAlign="bottom" iconType="square" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[1.6fr_1fr] gap-5 reveal" style={{ animationDelay: '120ms' }}>
        <div className="card notched p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="pill-yellow mb-2 inline-block">Engagement</span>
              <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Weekly Active & Sessions</h3>
            </div>
            <span className="pill-blue">8 weeks</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ENGAGEMENT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                <Line yAxisId="left" type="monotone" dataKey="active" name="Active Interns" stroke="#1B2D5C" strokeWidth={3} dot={{ r: 4, fill: '#1B2D5C' }} />
                <Line yAxisId="right" type="monotone" dataKey="sessions" name="Sessions" stroke="#2196F3" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#2196F3' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card notched p-5 lg:p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="pill-yellow mb-2 inline-block">Live</span>
              <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Recent Activity</h3>
            </div>
            <Link href="/admin/submissions" className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--blue)] flex items-center gap-1 hover:text-[var(--navy)]">
              View all <ArrowUpRight size={12} strokeWidth={2.5} />
            </Link>
          </div>
          <div className="space-y-3 max-h-[330px] overflow-y-auto pr-1">
            {ACTIVITY.map((a, i) => {
              const dot = a.type === 'submission' ? '#2196F3' : a.type === 'review' ? '#1B2D5C' : a.type === 'mentor' ? '#FBC02D' : a.type === 'flag' ? '#D32F2F' : '#5A6B85';
              return (
                <div key={i} className="flex gap-3 pb-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                  <div className="w-2 h-2 mt-2 flex-shrink-0" style={{ background: dot }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-snug">
                      <span className="font-bold text-[var(--navy)]">{a.user}</span>
                      <span className="text-[var(--text-soft)] font-medium"> {a.action} </span>
                      <span className="font-semibold text-[var(--blue)]">{a.target}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="mono text-[10px] text-[var(--text-mute)] uppercase tracking-wider">{a.time}</span>
                      {a.track !== '·' && <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-mute)]">· {a.track}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
