'use client';

import { RequireAuth } from '../lib/AuthContext';

export default function MentorLayout({ children }) {
  return <RequireAuth roles={['mentor', 'admin']}>{children}</RequireAuth>;
}
