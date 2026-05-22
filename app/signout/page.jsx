'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';

export default function SignOutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    // Send them to the public site, not /signin, so they aren't kicked back into auth flow unintentionally.
    router.replace('/');
  }, [logout, router]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#5A6B85', fontSize: 13, fontWeight: 600,
      letterSpacing: '0.12em', textTransform: 'uppercase'
    }}>
      Signing out…
    </div>
  );
}
