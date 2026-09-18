"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar";
import Logo from "../../components/Logo";

export default function DashboardLayout({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-brand-dark">
          <Logo size={48} />
          <p className="text-sm opacity-70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-light">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
