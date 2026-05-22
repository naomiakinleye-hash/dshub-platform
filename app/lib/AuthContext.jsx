'use client';

// ============================================================
// DSHub · Auth Context
// ------------------------------------------------------------
// Provides the current user across the app and the actions to
// log in, register, log out. Hydrates from /auth/me on mount
// if a token exists. RequireAuth wraps protected pages.
//
// The login response is expected to look like:
//   { accessToken, refreshToken, user: { _id, fullName, email, role, ... } }
// If the backend nests these differently we adjust normalizeAuth().
// ============================================================

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { api, ApiError } from './api';
import { getAccessToken, getStoredUser, setSession, clearSession } from './auth';

const AuthContext = createContext(null);

// Tolerant unwrap in case the backend uses slightly different keys.
function normalizeAuth(data) {
  if (!data) return null;
  const accessToken  = data.accessToken  || data.token || data.tokens?.access  || null;
  const refreshToken = data.refreshToken || data.tokens?.refresh || null;
  const user         = data.user || data.profile || null;
  return { accessToken, refreshToken, user };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, if we have a stored token, validate it against /auth/me.
  useEffect(() => {
    let alive = true;
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }
    // Optimistic: use cached user immediately, then re-verify.
    const cached = getStoredUser();
    if (cached) setUser(cached);

    api.me()
      .then((data) => {
        if (!alive) return;
        const u = data?.user || data; // /auth/me may return user directly or wrapped
        if (u) {
          setUser(u);
          setSession({ user: u });
        }
      })
      .catch(() => {
        if (!alive) return;
        clearSession();
        setUser(null);
      })
      .finally(() => { if (alive) setLoading(false); });

    return () => { alive = false; };
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.login({ email, password });
    const { accessToken, refreshToken, user: u } = normalizeAuth(data);
    if (!accessToken || !u) {
      console.error('Unexpected login response shape:', data);
      throw new ApiError('Login response missing token or user. Check the backend response shape.', { status: 500 });
    }
    setSession({ accessToken, refreshToken, user: u });
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async ({ fullName, email, password, role }) => {
    const data = await api.register({ fullName, email, password, role });
    const { accessToken, refreshToken, user: u } = normalizeAuth(data);
    // Some backends auto-login on register, some require a separate login. Handle both.
    if (accessToken && u) {
      setSession({ accessToken, refreshToken, user: u });
      setUser(u);
      return { user: u, autoLoggedIn: true };
    }
    return { user: u, autoLoggedIn: false };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = { user, loading, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

// ============================================================
// RequireAuth: wrap a page subtree, kicks unauthorized users
// back to /signin. Optionally enforces a role list.
//
//   <RequireAuth roles={['admin']}>...</RequireAuth>
//   <RequireAuth>...</RequireAuth>   // any authenticated user
// ============================================================
export function RequireAuth({ children, roles }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const next = encodeURIComponent(pathname || '/');
      router.replace(`/signin?next=${next}`);
      return;
    }
    if (roles && roles.length && !roles.includes(user.role)) {
      router.replace('/');
    }
  }, [user, loading, roles, router, pathname]);

  if (loading || !user) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#5A6B85', fontSize: 13, fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase'
      }}>
        Checking session…
      </div>
    );
  }
  if (roles && roles.length && !roles.includes(user.role)) return null;
  return children;
}
