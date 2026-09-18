"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";

export default function LoginPage() {
  const { user, ready, login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [googleNote, setGoogleNote] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!agreed) {
      setError("Please agree to the Terms and Conditions to continue.");
      return;
    }
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  function handleGoogle() {
    setGoogleNote(true);
    const result = loginWithGoogle();
    if (result.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-brand-darker flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-brand rounded-xl2 shadow-card p-8 sm:p-10 border border-white/10">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white rounded-full p-1 mb-4">
            <Logo size={72} />
          </div>
          <h1 className="text-white text-xl font-semibold">Welcome Back</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full rounded-md bg-brand-light/90 px-3 py-2 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full rounded-md bg-brand-light/90 px-3 py-2 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:ring-2 focus:ring-brand-accent"
            />
          </div>

          <label className="flex items-start gap-2 text-xs text-white/90">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              By checking &quot;I agree,&quot; you confirm that you have read, understood, and
              agree to follow these{" "}
              <Link href="/terms" className="underline hover:text-brand-accent">
                Terms and Conditions
              </Link>
              .
            </span>
          </label>

          {error && (
            <p className="text-sm bg-red-100 text-red-700 rounded-md px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-brand-accent hover:bg-sky-400 transition-colors text-white font-semibold py-2.5"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/25" />
          <span className="text-white/70 text-xs">or</span>
          <div className="flex-1 h-px bg-white/25" />
        </div>

        <button
          onClick={handleGoogle}
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-md bg-brand-dark hover:bg-brand-darker transition-colors text-white font-medium py-2.5"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {googleNote && (
          <p className="text-white/70 text-xs mt-3 text-center">
            Demo mode: signing you in with a sample Google account.
          </p>
        )}

        <p className="text-center text-white/80 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-brand-accent font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.4l-6.3-5.3C29.4 34.8 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.3 5.9l6.3 5.3C40.7 36.6 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
