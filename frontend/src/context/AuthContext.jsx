import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken } from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("edumatch_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setReady(true);
      return;
    }
    api("/api/auth/me")
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("edumatch_user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("edumatch_token");
        localStorage.removeItem("edumatch_user");
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  function persist(nextUser, token) {
    localStorage.setItem("edumatch_token", token);
    localStorage.setItem("edumatch_user", JSON.stringify(nextUser));
    setUser(nextUser);
  }

  const value = useMemo(
    () => ({
      user,
      ready,
      isAdmin: user?.role === "admin",
      isTeacher: user?.role === "teacher",
      isStudent: user?.role === "student",
      login: async (email, password, role) => {
        const data = await api("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password, role }),
        });
        persist(data.user, data.token);
        return data.user;
      },
      register: async (payload) => {
        const data = await api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
        persist(data.user, data.token);
        return data.user;
      },
      setUser,
      persistUser: (next) => {
        localStorage.setItem("edumatch_user", JSON.stringify(next));
        setUser(next);
      },
      logout: () => {
        localStorage.removeItem("edumatch_token");
        localStorage.removeItem("edumatch_user");
        setUser(null);
      },
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
