"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const ACCOUNT_KEY = "lnmk_account";
const SESSION_KEY = "lnmk_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedAccount = window.localStorage.getItem(ACCOUNT_KEY);
      const session = window.localStorage.getItem(SESSION_KEY);
      if (storedAccount && session) {
        const account = JSON.parse(storedAccount);
        if (account.email?.toLowerCase() === session.toLowerCase()) {
          setUser(account);
        }
      }
    } catch (e) {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  function signup(data) {
    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(data));
    window.localStorage.setItem(SESSION_KEY, data.email);
    setUser(data);
    return { ok: true };
  }

  function login(email, password) {
    const stored = window.localStorage.getItem(ACCOUNT_KEY);
    if (!stored) {
      return { ok: false, error: "No account found yet. Please create one first." };
    }
    const account = JSON.parse(stored);
    if (account.email?.toLowerCase() !== email.trim().toLowerCase()) {
      return { ok: false, error: "No account found with that email." };
    }
    if (account.password !== password) {
      return { ok: false, error: "Incorrect password." };
    }
    window.localStorage.setItem(SESSION_KEY, account.email);
    setUser(account);
    return { ok: true };
  }

  function loginWithGoogle() {
    const stored = window.localStorage.getItem(ACCOUNT_KEY);
    if (!stored) {
      const demoAccount = {
        firstName: "Juan",
        lastName: "Dela Cruz",
        address: "Quezon City, Metro Manila",
        disabilityType: "Physical Disability",
        birthdate: "1990-01-01",
        sex: "Male",
        phone: "09171234567",
        email: "juan.delacruz@example.com",
        password: "google-demo",
      };
      window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(demoAccount));
      window.localStorage.setItem(SESSION_KEY, demoAccount.email);
      setUser(demoAccount);
      return { ok: true };
    }
    const account = JSON.parse(stored);
    window.localStorage.setItem(SESSION_KEY, account.email);
    setUser(account);
    return { ok: true };
  }

  function logout() {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function updateProfile(patch) {
    const updated = { ...user, ...patch };
    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updated));
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, signup, login, loginWithGoogle, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
