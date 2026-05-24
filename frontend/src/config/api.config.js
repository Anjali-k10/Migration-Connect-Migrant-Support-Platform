/**
 * Dev: Vite proxies /api → backend (see vite.config.js).
 * Prod (split): set VITE_API_BASE_URL=http://localhost:5001/api
 * Prod (unified): set VITE_API_BASE_URL=/api and SERVE_CLIENT=true on backend.
 */
export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured.replace(/\/$/, "");
  return "/api";
}
