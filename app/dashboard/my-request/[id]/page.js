"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useRequests } from "../../../../context/RequestContext";
import { REQUIRED_DOCUMENTS, STAGES } from "../../../../lib/options";

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getRequest, advanceStage, loaded } = useRequests();

  if (!loaded) return null;

  const request = getRequest(id);

  if (!request) {
    return (
      <div className="max-w-xl">
        <p className="text-slate-500">Request not found.</p>
        <Link href="/dashboard/my-request" className="text-brand font-medium hover:underline">
          &larr; Back to My Request
        </Link>
      </div>
    );
  }

  const isDevice = request.type === "Assistive Device";
  const isFinal = request.stageIndex === STAGES.length - 1;

  return (
    <div className="max-w-xl">
      <button
        onClick={() => router.push("/dashboard/my-request")}
        className="text-sm text-brand font-medium hover:underline mb-4"
      >
        &larr; Back to My Request
      </button>

      <div className="bg-white rounded-xl2 shadow-card p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-brand-dark">{request.type}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{request.id}</p>
          </div>
          <span className="text-xs font-medium bg-brand-light text-brand px-2.5 py-1 rounded-full">
            {request.status}
          </span>
        </div>

        <dl className="space-y-3 text-sm mb-6">
          {isDevice ? (
            <Row label="Device" value={request.deviceType} />
          ) : (
            <>
              <Row label="Purpose" value={request.purpose} />
              <Row label="Amount Needed" value={`₱${request.amount}`} />
            </>
          )}
          <Row label="Reason" value={request.reason} multiline />
        </dl>

        <p className="text-sm font-medium text-brand-dark mb-2">Documents:</p>
        <ul className="space-y-1.5 mb-6">
          {REQUIRED_DOCUMENTS.map((doc) => (
            <li key={doc.key} className="flex items-center gap-2 text-sm text-slate-600">
              <Check size={15} className="text-emerald-600" />
              {doc.label}
            </li>
          ))}
        </ul>

        <p className="text-sm font-medium text-brand-dark mb-3">Progress</p>
        <ul className="space-y-2 mb-6">
          {STAGES.map((stage, i) => {
            const done = i <= request.stageIndex;
            return (
              <li key={stage} className="flex items-center gap-2 text-sm">
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded-full ${
                    done ? "bg-brand text-white" : "border border-slate-300"
                  }`}
                >
                  {done && <Check size={11} />}
                </span>
                <span className={done ? "text-brand-dark" : "text-slate-400"}>{stage}</span>
              </li>
            );
          })}
        </ul>

        {!isFinal && (
          <button
            onClick={() => advanceStage(request.id)}
            className="text-sm bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-brand-darker"
          >
            Advance to next stage (demo)
          </button>
        )}
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
