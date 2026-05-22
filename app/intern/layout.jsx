'use client';

import { RequireAuth } from '../lib/AuthContext';

export default function InternLayout({ children }) {
  // Any logged-in user can view intern pages. Mentor/admin can read intern data per role hierarchy.
  return <RequireAuth>{children}</RequireAuth>;
}
