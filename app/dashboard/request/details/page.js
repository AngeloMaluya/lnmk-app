"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequests } from "../../../../context/RequestContext";
import StepHeader from "../../../../components/StepHeader";
import { DEVICE_TYPES, FINANCIAL_PURPOSES } from "../../../../lib/options";

export default function RequestDetailsPage() {
  const { draft, updateDraft, loaded } = useRequests();
  const router = useRouter();
  const [error, setError] = useState("");

  const isDevice = draft.type === "Assistive Device";

  useEffect(() => {
    if (loaded && !draft.type) router.replace("/dashboard/request");
  }, [loaded, draft.type, router]);

  function handleContinue() {
    setError("");
    if (isDevice) {
      if (!draft.deviceType || !draft.reason.trim()) {
        setError("Please select a device type and tell us why you need it.");
        return;
      }
    } else {
      if (!draft.purpose || !draft.amount || !draft.reason.trim()) {
        setError("Please complete the purpose, amount, and reason fields.");
        return;
      }
    }
    router.push("/dashboard/request/requirements");
  }

  const inputClass =
    "w-full rounded-md bg-slate-100 px-3 py-2 text-brand-dark outline-none focus:ring-2 focus:ring-brand-accent";

  if (!draft.type) return null;

  return (
    <div className="max-w-xl mx-auto bg-brand-light border-2 border-brand rounded-xl2 p-8">
      <StepHeader step={2} title="Request Assistance" />

      <div className="space-y-4">
        {isDevice ? (
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">
              What type of Assistive Device you need?
            </label>
            <select
              value={draft.deviceType}
              onChange={(e) => updateDraft({ deviceType: e.target.value })}
              className={inputClass}
            >
              <option value="">Select a device</option>
              {DEVICE_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                What is this financial assistance for?
              </label>
              <select
                value={draft.purpose}
                onChange={(e) => updateDraft({ purpose: e.target.value })}
                className={inputClass}
              >
                <option value="">Select purpose</option>
                {FINANCIAL_PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                Estimated Amount Needed (PHP)
              </label>
              <input
                type="number"
                min="0"
                value={draft.amount}
                onChange={(e) => updateDraft({ amount: e.target.value })}
                placeholder="e.g. 5000"
                className={inputClass}
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">
            Why do you need this {isDevice ? "device" : "assistance"}?
          </label>
          <textarea
            value={draft.reason}
            onChange={(e) => updateDraft({ reason: e.target.value })}
            placeholder="Please describe what you need..."
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">
            Additional Information
          </label>
          <textarea
            value={draft.additionalInfo}
            onChange={(e) => updateDraft({ additionalInfo: e.target.value })}
            rows={2}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm bg-red-100 text-red-700 rounded-md px-3 py-2">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push("/dashboard/request")}
            className="flex-1 rounded-md border border-brand text-brand font-medium py-2.5 hover:bg-white"
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
    </div>
  );
}
