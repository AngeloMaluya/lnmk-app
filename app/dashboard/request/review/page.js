"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useRequests } from "../../../../context/RequestContext";
import StepHeader from "../../../../components/StepHeader";
import { REQUIRED_DOCUMENTS } from "../../../../lib/options";

export default function ReviewRequestPage() {
  const { draft, submitRequest, loaded } = useRequests();
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (loaded && !draft.type) router.replace("/dashboard/request");
  }, [loaded, draft.type, router]);

  function handleSubmit() {
    if (!confirmed) return;
    const newRequest = submitRequest();
    router.push(`/dashboard/request/submitted?id=${newRequest.id}`);
  }

  if (!draft.type) return null;

  const isDevice = draft.type === "Assistive Device";

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl2 shadow-card p-8">
      <StepHeader step={4} title="Review of Request" />

      <dl className="space-y-3 text-sm">
        <Row label="Assistance Type" value={draft.type} />
        {isDevice ? (
          <Row label="Device" value={draft.deviceType} />
        ) : (
          <>
            <Row label="Purpose" value={draft.purpose} />
            <Row label="Amount Needed" value={`₱${draft.amount}`} />
          </>
        )}
        <Row label="Reason" value={draft.reason} multiline />
        {draft.additionalInfo && (
          <Row label="Additional Info" value={draft.additionalInfo} multiline />
        )}
      </dl>

      <p className="text-sm font-medium text-brand-dark mt-5 mb-2">Documents:</p>
      <ul className="space-y-1.5">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <li key={doc.key} className="flex items-center gap-2 text-sm text-slate-600">
            <Check size={15} className="text-emerald-600" />
            {doc.label}
          </li>
        ))}
      </ul>

      <label className="flex items-center gap-2 text-sm text-slate-600 mt-6">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I confirm that the information provided is correct
      </label>

      <div className="flex gap-3 pt-6">
        <button
          onClick={() => router.push("/dashboard/request/requirements")}
          className="flex-1 rounded-md border border-brand text-brand font-medium py-2.5 hover:bg-brand-light"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!confirmed}
          className="flex-1 rounded-md bg-brand hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, multiline }) {
  return (
    <div className={multiline ? "" : "flex justify-between gap-4"}>
      <dt className="text-slate-500">{label}:</dt>
      <dd className={multiline ? "text-brand-dark mt-1" : "text-brand-dark font-medium text-right"}>
        {value}
      </dd>
    </div>
  );
}
