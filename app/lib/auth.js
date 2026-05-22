// ============================================================
// DSHub · Session Storage
// ------------------------------------------------------------
// Holds the access token, refresh token, and cached user in
// localStorage. All reads guard against SSR (window undefined).
// ============================================================

const K_ACCESS = 'dshub_access_token';
const K_REFRESH = 'dshub_refresh_token';
const K_USER = 'dshub_user';

const hasWindow = () => typeof window !== 'undefined';

export function getAccessToken() {
  if (!hasWindow()) return null;
  return localStorage.getItem(K_ACCESS);
}

export function getRefreshToken() {
  if (!hasWindow()) return null;
  return localStorage.getItem(K_REFRESH);
}

export function getStoredUser() {
  if (!hasWindow()) return null;
  const raw = localStorage.getItem(K_USER);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function setSession({ accessToken, refreshToken, user }) {
  if (!hasWindow()) return;
  if (accessToken)  localStorage.setItem(K_ACCESS, accessToken);
  if (refreshToken) localStorage.setItem(K_REFRESH, refreshToken);
  if (user)         localStorage.setItem(K_USER, JSON.stringify(user));
}

export function clearSession() {
  if (!hasWindow()) return;
  localStorage.removeItem(K_ACCESS);
  localStorage.removeItem(K_REFRESH);
  localStorage.removeItem(K_USER);
}
