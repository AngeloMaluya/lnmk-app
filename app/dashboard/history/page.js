"use client";

import Link from "next/link";
import { useRequests } from "../../../context/RequestContext";
import { STAGES } from "../../../lib/options";

export default function HistoryPage() {
  const { requests } = useRequests();
  const completed = requests.filter((r) => r.stageIndex === STAGES.length - 1);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-dark mb-6">History</h1>

      {completed.length === 0 ? (
        <div className="bg-white rounded-xl2 shadow-card p-6 text-slate-500 text-sm">
          No completed requests yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {completed.map((r) => (
            <li key={r.id}>
              <Link
                href={`/dashboard/my-request/${r.id}`}
                className="flex items-center justify-between bg-white rounded-xl2 shadow-card p-5 hover:bg-brand-light transition-colors"
              >
                <div>
                  <p className="font-medium text-brand-dark">{r.type}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r.id} &middot; {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                  Released
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
