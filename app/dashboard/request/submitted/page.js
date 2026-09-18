"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

function SubmittedContent() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl2 shadow-card p-8 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle2 size={48} className="text-emerald-500" />
      </div>
      <h2 className="text-lg font-semibold text-brand-dark">Request Submitted Successfully!</h2>
      <p className="text-sm text-slate-500 mt-2">
        Your request has been submitted and is currently waiting for verification.
      </p>

      {id && (
        <div className="mt-5">
          <p className="text-xs text-slate-500">Request ID</p>
          <p className="font-semibold text-brand-dark">{id}</p>
        </div>
      )}

      <Link
        href={id ? `/dashboard/my-request/${id}` : "/dashboard/my-request"}
        className="inline-block mt-6 bg-brand hover:bg-brand-mid transition-colors text-white font-semibold px-6 py-2.5 rounded-md"
      >
        Track my Request
      </Link>
    </div>
  );
}

export default function RequestSubmittedPage() {
  return (
    <Suspense fallback={null}>
      <SubmittedContent />
    </Suspense>
  );
}
