import { apiRequest } from "./api.js";

export function createEmergency(payload) {
  return apiRequest("/emergency/create", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateMyProfile(payload) {
  return apiRequest("/migrants/me/profile", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
