import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, getToken } from "../api/client.js";

const AuthContext = createContext(null);
const API_CONFIGURED = Boolean(import.meta.env.VITE_API_URL);

const DEMO_USERS = [
  { id: "demo-student", name: "Alex Student", email: "student@edumatch.test", password: "Student123!", role: "student", phone: "0400 111 222" },
  { id: "demo-admin", name: "Admin Taylor", email: "admin@edumatch.test", password: "Admin123!", role: "admin", phone: "0400 000 000" },
  { id: "demo-anjali", name: "Dr Anjali Sharma", email: "anjali@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
  { id: "demo-james", name: "James Okoro", email: "james@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
  { id: "demo-priya", name: "Priya Adhikari", email: "priya@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
  { id: "demo-daniel", name: "Daniel Chen", email: "daniel@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
  { id: "demo-sofia", name: "Sofia Martins", email: "sofia@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
  { id: "demo-ravi", name: "Ravi Thapa", email: "ravi@edumatch.test", password: "Teacher123!", role: "teacher", phone: "0400 555 000" },
];

function publicDemo(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone || "" };
}

function matchDemo(email, password, role) {
  return DEMO_USERS.find(
    (user) => user.email === String(email || "").toLowerCase() && user.password === password && (!role || user.role === role)
  );
}

function loginFromCopy(email, password, role) {
  const demo = matchDemo(email, password, role);
  if (!demo) {
    if (matchDemo(email, password)) throw new Error(`This account is not a ${role} account.`);
    throw new Error("Incorrect email or password.");
  }
  return publicDemo(demo);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("edumatch_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token || token.startsWith("demo-") || !API_CONFIGURED) {
      setReady(true);
      return;
    }
    api("/api/auth/me")
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("edumatch_user", JSON.stringify(data.user));
      })
      .catch(() => {
        const raw = localStorage.getItem("edumatch_user");
        if (raw) {
          setUser(JSON.parse(raw));
          return;
        }
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
        if (!API_CONFIGURED) {
          const next = loginFromCopy(email, password, role);
          persist(next, `demo-${next.id}`);
          return next;
        }
        try {
          const data = await api("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password, role }),
          });
          persist(data.user, data.token);
          return data.user;
        } catch {
          const next = loginFromCopy(email, password, role);
          persist(next, `demo-${next.id}`);
          return next;
        }
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
