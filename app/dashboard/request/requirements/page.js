"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequests } from "../../../../context/RequestContext";
import StepHeader from "../../../../components/StepHeader";
import { REQUIRED_DOCUMENTS } from "../../../../lib/options";

export default function RequirementsPage() {
  const { draft, updateDocument, loaded } = useRequests();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (loaded && !draft.type) router.replace("/dashboard/request");
  }, [loaded, draft.type, router]);

  function handleFile(key, e) {
    const file = e.target.files?.[0];
    if (file) updateDocument(key, file.name);
  }

  function handleContinue() {
    const missing = REQUIRED_DOCUMENTS.filter((d) => !draft.documents[d.key]);
    if (missing.length > 0) {
      setError("Please upload all required documents before continuing.");
      return;
    }
    setError("");
    router.push("/dashboard/request/review");
  }

  if (!draft.type) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl2 shadow-card p-8">
      <StepHeader step={3} title="Request Assistance" subtitle={draft.type} />

      <h3 className="font-semibold text-brand-dark mb-4">Required Documents</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <div key={doc.key}>
            <label className="block text-sm font-medium text-brand-dark mb-1">{doc.label}</label>
            <label className="flex items-center gap-2 bg-slate-100 rounded-md px-3 py-2 cursor-pointer">
              <span className="bg-slate-300 text-slate-700 text-xs font-medium px-2 py-1 rounded">
                Choose File
              </span>
              <span className="text-xs text-slate-500 truncate">
                {draft.documents[doc.key] || "No File Chosen"}
              </span>
              <input
                type="file"
                onChange={(e) => handleFile(doc.key, e)}
                className="hidden"
              />
            </label>
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm bg-red-100 text-red-700 rounded-md px-3 py-2 mt-4">{error}</p>
      )}

      <div className="flex gap-3 pt-6">
        <button
          onClick={() => router.push("/dashboard/request/details")}
          className="flex-1 rounded-md border border-brand text-brand font-medium py-2.5 hover:bg-brand-light"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 rounded-md bg-brand hover:bg-brand-mid text-white font-semibold py-2.5"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
