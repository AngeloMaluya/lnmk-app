import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-light py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl2 shadow-card p-8">
        <h1 className="text-2xl font-semibold text-brand-dark mb-4">Terms and Conditions</h1>
        <p className="text-slate-600 mb-4">
          This is a demo application built to showcase the Lakas ng may Kapansanan assistance
          request flow. No real personal data is transmitted anywhere — everything you enter is
          stored only in your own browser.
        </p>
        <p className="text-slate-600 mb-4">
          By using this demo, you understand it is for illustrative purposes and is not
          affiliated with any government agency.
        </p>
        <Link href="/login" className="text-brand font-medium hover:underline">
          &larr; Back to Sign In
        </Link>
      </div>
    </div>
  );
}
