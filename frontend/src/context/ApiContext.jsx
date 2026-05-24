import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { checkApiHealth } from "../services/health.service.js";
import { API_BASE_URL } from "../services/api.js";

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const [online, setOnline] = useState(null);
  const [checking, setChecking] = useState(true);

  const refresh = useCallback(async () => {
    setChecking(true);
    try {
      await checkApiHealth();
      setOnline(true);
    } catch {
      setOnline(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <ApiContext.Provider value={{ online, checking, refresh, apiBaseUrl: API_BASE_URL }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi must be used within ApiProvider");
  return ctx;
}
