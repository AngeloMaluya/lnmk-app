"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Home() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    router.replace(user ? "/dashboard" : "/login");
  }, [ready, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-darker">
      <div className="flex flex-col items-center gap-4 text-brand-light">
        <Logo size={56} />
        <p className="text-sm opacity-80">Loading...</p>
      </div>
    </div>
  );
}
