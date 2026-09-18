"use client";

import { Bell } from "lucide-react";
import { useRequests } from "../../../context/RequestContext";

export default function NotificationsPage() {
  const { requests } = useRequests();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-dark mb-6">Notifications</h1>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl2 shadow-card p-6 text-slate-500 text-sm">
          You have no notifications yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r.id} className="bg-white rounded-xl2 shadow-card p-5 flex gap-3">
              <span className="w-9 h-9 rounded-full bg-brand-light text-brand flex items-center justify-center shrink-0">
                <Bell size={16} />
              </span>
              <div>
                <p className="text-sm text-brand-dark">
                  Your <span className="font-medium">{r.type}</span> request ({r.id}) is
                  currently <span className="font-medium">{r.status}</span>.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(r.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
