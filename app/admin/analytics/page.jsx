'use client';

import {
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const TRACK_PERFORMANCE = [
  { track: 'Frontend', score: 89, completion: 95 },
  { track: 'Backend', score: 87, completion: 92 },
  { track: 'Cybersec', score: 91, completion: 100 },
  { track: 'Product', score: 85, completion: 91 },
  { track: 'UI/UX', score: 88, completion: 90 },
  { track: 'Data Sci', score: 90, completion: 87 },
];

const SKILL_RADAR = [
  { skill: 'Technical', A: 88 },
  { skill: 'Consistency', A: 82 },
  { skill: 'Collaboration', A: 90 },
  { skill: 'Communication', A: 85 },
  { skill: 'Problem Solving', A: 91 },
  { skill: 'Delivery', A: 87 },
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

export default function AdminAnalytics() {
  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 reveal">
        {[
          { label: 'Cohort Avg Score', value: '87', suffix: '/100' },
          { label: 'Completion Rate', value: '94', suffix: '%' },
          { label: 'On-Time Rate', value: '91', suffix: '%' },
          { label: 'At-Risk Interns', value: '03', suffix: '' },
        ].map((s, i) => (
          <div key={i} className="card notched-sm p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-mute)] mb-3">{s.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="pixel tabular text-[36px] leading-none text-[var(--navy)]">{s.value}</span>
              {s.suffix && <span className="text-[13px] font-bold text-[var(--text-mute)]">{s.suffix}</span>}
            </div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-[1.4fr_1fr] gap-5 reveal" style={{ animationDelay: '60ms' }}>
        <div className="card notched p-5 lg:p-6">
          <div className="mb-5">
            <span className="pill-yellow mb-2 inline-block">Track-based</span>
            <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Track Performance</h3>
          </div>
          <div style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRACK_PERFORMANCE} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="track" tickLine={false} axisLine={false} width={75} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(33,150,243,0.06)' }} />
                <Legend wrapperStyle={{ paddingTop: 16 }} iconType="square" />
                <Bar dataKey="score" name="Avg Score" fill="#2196F3" radius={[0, 3, 3, 0]} />
                <Bar dataKey="completion" name="Completion %" fill="#1B2D5C" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card notched p-5 lg:p-6">
          <div className="mb-5">
            <span className="pill-yellow mb-2 inline-block">Competency</span>
            <h3 className="pixel text-[22px] leading-tight text-[var(--navy)]">Cohort Skill Profile</h3>
          </div>
          <div style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={SKILL_RADAR}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: 'var(--text-mute)' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Cohort A" dataKey="A" stroke="#2196F3" fill="#2196F3" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}
