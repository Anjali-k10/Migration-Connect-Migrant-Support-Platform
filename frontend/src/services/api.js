import { getApiBaseUrl } from "../config/api.config.js";

export const API_BASE_URL = getApiBaseUrl();

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let response;
  try {
    response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      },
      ...options
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Start the backend: npm run dev:backend (or npm run dev from project root).",
      { status: 0 }
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.error || data.message || "Request failed", {
      status: response.status,
      data
    });
  }

  return data;
}
