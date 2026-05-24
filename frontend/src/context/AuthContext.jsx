import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  getMyProfile,
  loginMigrant,
  logoutMigrant,
  registerMigrant
} from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await getMyProfile();
      setUser(profile);
      return profile;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    refreshProfile().finally(() => setLoading(false));
  }, [refreshProfile]);

  const login = async (migrantId, password) => {
    const result = await loginMigrant(migrantId, password);
    await refreshProfile();
    return result;
  };

  const register = async (payload) => {
    const result = await registerMigrant(payload);
    await loginMigrant(result.migrantId, payload.password);
    await refreshProfile();
    return result;
  };

  const logout = async () => {
    await logoutMigrant();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
