// ============================================================
// DSHub · Central Data Layer
// ------------------------------------------------------------
// This is the ONLY place mock data lives. When the backend is
// ready, replace each getX() body with a real fetch() call and
// every page updates automatically. Keep the return shapes
// identical and no UI code needs to change.
//
// Example backend swap:
//   export async function getInterns() {
//     const res = await fetch(`${API}/interns`, { cache: 'no-store' });
//     return res.json();
//   }
// ============================================================

export const TRACKS = [
  { name: 'Frontend', color: '#2196F3' },
  { name: 'Backend', color: '#1B2D5C' },
  { name: 'Cybersecurity', color: '#FBC02D' },
  { name: 'Product Mgmt', color: '#0D6EBF' },
  { name: 'UI/UX Design', color: '#FFE082' },
  { name: 'Data Science', color: '#2E4585' },
];

const INTERNS = [
  { id: 'IN-001', name: 'Adaeze Okonkwo', email: 'adaeze@dshub.com', track: 'Frontend', plan: 'Premium', mentor: 'Engr Abdulrahman', progress: 67, avgScore: 92, status: 'active', submissions: 5, lastActive: '2m ago' },
  { id: 'IN-002', name: 'Olumide Balogun', email: 'olumide@dshub.com', track: 'Backend', plan: 'Standard', mentor: 'Dr. Aisha Mohammed', progress: 78, avgScore: 87, status: 'active', submissions: 6, lastActive: '38m ago' },
  { id: 'IN-003', name: 'Chiamaka Nwosu', email: 'chiamaka@dshub.com', track: 'UI/UX Design', plan: 'Premium', mentor: 'Tobi Akinwale', progress: 89, avgScore: 90, status: 'active', submissions: 7, lastActive: '4h ago' },
  { id: 'IN-004', name: 'Victor John', email: 'victor@dshub.com', track: 'Cybersecurity', plan: 'Standard', mentor: 'Dr. Aisha Mohammed', progress: 100, avgScore: 91, status: 'graduated', submissions: 9, lastActive: '1d ago' },
  { id: 'IN-005', name: 'Funke Adeyemi', email: 'funke@dshub.com', track: 'Data Science', plan: 'Premium', mentor: 'Engr Abdulrahman', progress: 55, avgScore: 84, status: 'active', submissions: 4, lastActive: '6h ago' },
  { id: 'IN-006', name: 'Emeka Obi', email: 'emeka@dshub.com', track: 'Product Mgmt', plan: 'Standard', mentor: 'Tobi Akinwale', progress: 44, avgScore: 79, status: 'at-risk', submissions: 3, lastActive: '3d ago' },
  { id: 'IN-007', name: 'Zainab Bello', email: 'zainab@dshub.com', track: 'Frontend', plan: 'Premium', mentor: 'Engr Abdulrahman', progress: 72, avgScore: 88, status: 'active', submissions: 6, lastActive: '1h ago' },
  { id: 'IN-008', name: 'Daniel Eze', email: 'daniel@dshub.com', track: 'Backend', plan: 'Standard', mentor: 'Dr. Aisha Mohammed', progress: 61, avgScore: 83, status: 'active', submissions: 5, lastActive: '5h ago' },
];

const MENTORS = [
  { id: 'MN-01', name: 'Engr Abdulrahman Abdulrahim', email: 'abdulrahman@dshub.com', track: 'Frontend', interns: 14, rating: 4.9, status: 'approved', joined: 'Jan 2026' },
  { id: 'MN-02', name: 'Dr. Aisha Mohammed', email: 'aisha@dshub.com', track: 'Backend', interns: 12, rating: 4.8, status: 'approved', joined: 'Jan 2026' },
  { id: 'MN-03', name: 'Tobi Akinwale', email: 'tobi@dshub.com', track: 'UI/UX Design', interns: 10, rating: 4.7, status: 'approved', joined: 'Feb 2026' },
  { id: 'MN-04', name: 'Kemi Olawale', email: 'kemi@dshub.com', track: 'Data Science', interns: 0, rating: null, status: 'pending', joined: 'May 2026' },
  { id: 'MN-05', name: 'Suleiman Garba', email: 'suleiman@dshub.com', track: 'Cybersecurity', interns: 0, rating: null, status: 'pending', joined: 'May 2026' },
  { id: 'MN-06', name: 'Grace Effiong', email: 'grace@dshub.com', track: 'Product Mgmt', interns: 0, rating: null, status: 'pending', joined: 'May 2026' },
];

const SUBMISSIONS = [
  { id: 'SB-2401', intern: 'Adaeze Okonkwo', track: 'Frontend', week: 6, title: 'Dashboard Module', status: 'pending', submitted: '2h ago', mentor: 'Engr Abdulrahman' },
  { id: 'SB-2402', intern: 'Olumide Balogun', track: 'Backend', week: 6, title: 'Analytics API Layer', status: 'reviewed', score: 88, submitted: '38m ago', mentor: 'Dr. Aisha Mohammed' },
  { id: 'SB-2403', intern: 'Victor John', track: 'Cybersecurity', week: 9, title: 'OWASP Audit Toolkit', status: 'reviewed', score: 95, submitted: '1d ago', mentor: 'Dr. Aisha Mohammed' },
  { id: 'SB-2404', intern: 'Chiamaka Nwosu', track: 'UI/UX Design', week: 6, title: 'DSHub Design System', status: 'pending', submitted: '4h ago', mentor: 'Tobi Akinwale' },
  { id: 'SB-2405', intern: 'Emeka Obi', track: 'Product Mgmt', week: 4, title: 'Roadmap Teardown', status: 'flagged', submitted: '3d ago', mentor: 'Tobi Akinwale' },
  { id: 'SB-2406', intern: 'Funke Adeyemi', track: 'Data Science', week: 5, title: 'Churn Prediction Model', status: 'reviewed', score: 84, submitted: '6h ago', mentor: 'Engr Abdulrahman' },
  { id: 'SB-2407', intern: 'Zainab Bello', track: 'Frontend', week: 6, title: 'Component Library v2', status: 'pending', submitted: '1h ago', mentor: 'Engr Abdulrahman' },
];

const GRADUATES = Array.from({ length: 64 }, (_, i) => ({
  id: `GR-${String(i + 1).padStart(3, '0')}`,
  name: INTERNS[i % INTERNS.length].name,
  track: TRACKS[i % TRACKS.length].name,
  year: 2026,
  score: 80 + ((i * 7) % 20),
}));

// ---- Accessors (swap these bodies for fetch() later) ----
export function getInterns() { return INTERNS; }
export function getMentors() { return MENTORS; }
export function getSubmissions() { return SUBMISSIONS; }
export function getGraduates() { return GRADUATES; }
export function getInternById(id) { return INTERNS.find(x => x.id === id) || null; }

export const STATUS_STYLE = {
  active: 'pill-success',
  graduated: 'pill-blue',
  'at-risk': 'pill-error',
  pending: 'pill-warn',
  approved: 'pill-success',
  reviewed: 'pill-success',
  flagged: 'pill-error',
};
