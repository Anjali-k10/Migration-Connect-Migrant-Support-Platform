import { apiRequest } from "./api.js";

export function registerMigrant(payload) {
  return apiRequest("/migrants/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function loginMigrant(migrantId, password) {
  return apiRequest("/migrants/login", {
    method: "POST",
    body: JSON.stringify({ migrantId, password })
  });
}

export function logoutMigrant() {
  return apiRequest("/migrants/logout", { method: "POST" });
}

export function getMyProfile() {
  return apiRequest("/migrants/me/profile");
}
