"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HandCoins, Accessibility } from "lucide-react";
import { useRequests } from "../../../context/RequestContext";
import StepHeader from "../../../components/StepHeader";

const TYPES = [
  { value: "Financial Assistance", icon: HandCoins },
  { value: "Assistive Device", icon: Accessibility },
];

export default function ChooseAssistancePage() {
  const { draft, updateDraft } = useRequests();
  const router = useRouter();
  const [selected, setSelected] = useState(draft.type);

  function handleContinue() {
    if (!selected) return;
    updateDraft({ type: selected });
    router.push("/dashboard/request/details");
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl2 shadow-card p-8">
      <StepHeader step={1} title="Request Assistance" subtitle="What type of assistance do you need?" />

      <div className="grid grid-cols-2 gap-4">
        {TYPES.map(({ value, icon: Icon }) => {
          const active = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setSelected(value)}
              className={`rounded-xl2 p-6 flex flex-col items-center gap-3 border-2 transition-colors ${
                active
                  ? "border-brand bg-brand-light"
                  : "border-slate-200 bg-slate-50 hover:border-brand-border"
              }`}
            >
              <Icon size={28} className="text-brand" />
              <span className="font-medium text-sm text-brand-dark text-center">{value}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full mt-8 rounded-md bg-brand hover:bg-brand-mid disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-semibold py-2.5"
      >
        Continue
      </button>
    </div>
  );
}
