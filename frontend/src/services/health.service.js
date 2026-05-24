import { API_BASE_URL } from "./api.js";

export async function checkApiHealth() {
  const url = `${API_BASE_URL}/health`;
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("API unhealthy");
  return response.json();
}
