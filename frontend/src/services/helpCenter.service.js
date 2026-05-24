import { apiRequest } from "./api.js";

export function getHelpCenters(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/help-centers${query ? `?${query}` : ""}`);
}

export function getNearestHelpCenters(lat, lng, type) {
  const query = new URLSearchParams({ lat, lng, ...(type ? { type } : {}) });
  return apiRequest(`/help-centers/nearest?${query}`);
}

export function getCheapestShelters(city) {
  return apiRequest(`/help-centers/cheapest?city=${encodeURIComponent(city)}`);
}

export function getCheapestFoodCenters(city) {
  return apiRequest(`/help-centers/cheapest-food?city=${encodeURIComponent(city)}`);
}
