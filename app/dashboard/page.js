"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRequests } from "../../context/RequestContext";
import { STAGES } from "../../lib/options";
import { Check, HeartHandshake } from "lucide-react";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHome() {
  const { user } = useAuth();
  const { requests } = useRequests();

  const submitted = requests.filter((r) => r.stageIndex === 0).length;
  const underAssessment = requests.filter((r) => r.stageIndex === 1 || r.stageIndex === 2).length;
  const approved = requests.filter((r) => r.stageIndex === 3).length;
  const completed = requests.filter((r) => r.stageIndex === 4).length;

  const current = requests[0];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-brand-dark">
        {getGreeting()}, {user?.firstName || "there"}!
      </h1>
      <p className="text-slate-500 mt-1">What would you like to request today?</p>

      <Link
        href="/dashboard/request"
        className="mt-6 block bg-slate-100 hover:bg-slate-200 transition-colors rounded-xl2 p-6 text-center"
      >
        <div className="flex justify-center mb-2 text-brand">
          <HeartHandshake size={26} />
        </div>
        <p className="font-semibold text-brand-dark">REQUEST ASSISTANCE</p>
        <p className="text-slate-500 text-sm mt-1">Need assistance? Submit a request.</p>
        <span className="inline-block mt-4 bg-brand text-white text-sm font-medium px-5 py-2 rounded-md">
          Request Now
        </span>
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <StatCard label="Submitted Request" value={submitted} />
        <StatCard label="Under Assessment" value={underAssessment} />
        <StatCard label="Approved" value={approved} />
        <StatCard label="Completed" value={completed} />
      </div>

      <h2 className="font-semibold text-brand-dark mt-8 mb-3">Current Request</h2>
      {!current ? (
        <div className="bg-white rounded-xl2 shadow-card p-6 text-slate-500 text-sm">
          You don&apos;t have any requests yet. Tap &quot;Request Now&quot; above to get started.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl2 shadow-card p-5">
            <p className="text-sm text-slate-500">
              Type of Assistance:{" "}
              <span className="font-medium text-brand-dark">{current.type}</span>
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Status: <span className="font-medium text-brand-dark">{current.status}</span>
            </p>
            <ul className="mt-4 space-y-2">
              {STAGES.map((stage, i) => {
                const done = i <= current.stageIndex;
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
            <Link
              href={`/dashboard/my-request/${current.id}`}
              className="inline-block mt-4 bg-brand text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              View Details
            </Link>
          </div>
          <div className="bg-white rounded-xl2 shadow-card p-5" />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl2 shadow-card p-4 flex flex-col items-center text-center gap-2">
      <span className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center text-brand font-semibold">
        {value}
      </span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}
