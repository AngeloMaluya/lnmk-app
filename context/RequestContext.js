"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { STAGES } from "../lib/options";

const RequestContext = createContext(null);

const REQUESTS_KEY = "lnmk_requests";
const DRAFT_KEY = "lnmk_draft";

const emptyDraft = {
  type: null, // "Financial Assistance" | "Assistive Device"
  deviceType: "",
  purpose: "",
  amount: "",
  reason: "",
  additionalInfo: "",
  documents: {},
};

export function RequestProvider({ children }) {
  const [draft, setDraft] = useState(emptyDraft);
  const [requests, setRequests] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedRequests = window.localStorage.getItem(REQUESTS_KEY);
      if (storedRequests) setRequests(JSON.parse(storedRequests));
      const storedDraft = window.sessionStorage.getItem(DRAFT_KEY);
      if (storedDraft) setDraft(JSON.parse(storedDraft));
    } catch (e) {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [draft, loaded]);

  function updateDraft(patch) {
    setDraft((d) => ({ ...d, ...patch }));
  }

  function updateDocument(key, filename) {
    setDraft((d) => ({ ...d, documents: { ...d.documents, [key]: filename } }));
  }

  function resetDraft() {
    setDraft(emptyDraft);
    window.sessionStorage.removeItem(DRAFT_KEY);
  }

  function submitRequest() {
    const newRequest = {
      id:
        "AR-" +
        new Date().getFullYear() +
        "-" +
        String(Math.floor(10000 + Math.random() * 89999)),
      ...draft,
      stageIndex: 0,
      status: STAGES[0],
      createdAt: new Date().toISOString(),
    };
    const updated = [newRequest, ...requests];
    setRequests(updated);
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
    resetDraft();
    return newRequest;
  }

  function advanceStage(id) {
    const updated = requests.map((r) => {
      if (r.id === id && r.stageIndex < STAGES.length - 1) {
        const nextIndex = r.stageIndex + 1;
        return { ...r, stageIndex: nextIndex, status: STAGES[nextIndex] };
      }
      return r;
    });
    setRequests(updated);
    window.localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  }

  function getRequest(id) {
    return requests.find((r) => r.id === id) || null;
  }

  return (
    <RequestContext.Provider
      value={{
        draft,
        updateDraft,
        updateDocument,
        resetDraft,
        requests,
        submitRequest,
        advanceStage,
        getRequest,
        loaded,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests() {
  const ctx = useContext(RequestContext);
  if (!ctx) throw new Error("useRequests must be used within RequestProvider");
  return ctx;
}
