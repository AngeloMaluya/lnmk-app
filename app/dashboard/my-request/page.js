"use client";

import Link from "next/link";
import { useRequests } from "../../../context/RequestContext";
import { ChevronRight } from "lucide-react";

export default function MyRequestPage() {
  const { requests } = useRequests();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-dark mb-6">My Request</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl2 shadow-card p-6 text-slate-500 text-sm">
          You haven&apos;t submitted any requests yet.{" "}
          <Link href="/dashboard/request" className="text-brand font-medium hover:underline">
            Request assistance now.
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
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
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-brand-light text-brand px-2.5 py-1 rounded-full">
                    {r.status}
                  </span>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
