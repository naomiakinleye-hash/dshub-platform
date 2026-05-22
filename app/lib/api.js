// ============================================================
// DSHub · API Client
// ------------------------------------------------------------
// Talks to the backend at /api/v1. Attaches the Bearer token
// from localStorage automatically. Unwraps the { success,
// message, data } envelope and throws on failure with field
// errors attached so forms can show inline validation.
// ============================================================

import { getAccessToken } from './auth';

export const API_BASE = 'https://dshub-graduation-backend.onrender.com/api/v1';

export class ApiError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message || 'Request failed');
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors || {};
  }
}

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const token = auth ? getAccessToken() : null;
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    // Network failure: backend asleep on Render free tier (50s cold start), or actually unreachable.
    throw new ApiError("Can't reach the server. The backend may be waking up, try again in a moment.", { status: 0 });
  }

  let json = null;
  try { json = await res.json(); } catch { /* may be empty */ }

  if (!res.ok || (json && json.success === false)) {
    throw new ApiError(json?.message || `Request failed (${res.status})`, {
      status: res.status,
      fieldErrors: json?.errors,
    });
  }

  return json?.data ?? null;
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body, auth: false }),
  login:    (body) => request('/auth/login',    { method: 'POST', body, auth: false }),
  me:       ()     => request('/auth/me'),
  refresh:  ()     => request('/auth/refresh-token', { method: 'POST' }),

  // Generic for future endpoints (interns, testimonials, milestones, etc.)
  get:  (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put:  (path, body) => request(path, { method: 'PUT',  body }),
  del:  (path) => request(path, { method: 'DELETE' }),
};
