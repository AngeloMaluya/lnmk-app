"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";
import { DISABILITY_TYPES } from "../../lib/options";

const initialForm = {
  firstName: "",
  lastName: "",
  address: "",
  disabilityType: "",
  birthdate: "",
  sex: "",
  phone: "",
  email: "",
  password: "",
};

export default function SignupPage() {
  const { user, ready, signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace("/dashboard");
  }, [ready, user, router]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const required = [
      "firstName",
      "lastName",
      "address",
      "disabilityType",
      "birthdate",
      "sex",
      "phone",
      "email",
      "password",
    ];
    for (const field of required) {
      if (!form[field] || !String(form[field]).trim()) {
        setError("Please fill in all fields to create your account.");
        return;
      }
    }
    signup(form);
    router.push("/dashboard");
  }

  const inputClass =
    "w-full rounded-md bg-brand-light/90 px-3 py-2 text-brand-dark placeholder:text-brand-dark/40 outline-none focus:ring-2 focus:ring-brand-accent";

  return (
    <div className="min-h-screen bg-brand-darker flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-brand rounded-xl2 shadow-card p-8 sm:p-10 border border-white/10">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white rounded-full p-1 mb-4">
            <Logo size={64} />
          </div>
          <h1 className="text-white text-xl font-semibold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">First Name</label>
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="Juan"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="Dela Cruz"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Address</label>
            <input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Street, Barangay, City"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Type of Disability
            </label>
            <select
              value={form.disabilityType}
              onChange={(e) => update("disabilityType", e.target.value)}
              className={inputClass}
            >
              <option value="">Select type of disability</option>
              {DISABILITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">Birthdate</label>
              <input
                type="date"
                value={form.birthdate}
                onChange={(e) => update("birthdate", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Sex</label>
              <select
                value={form.sex}
                onChange={(e) => update("sex", e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-1">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="09XXXXXXXXX"
              className={inputClass}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="your.email@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Create a password"
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm bg-red-100 text-red-700 rounded-md px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-brand-accent hover:bg-sky-400 transition-colors text-white font-semibold py-2.5 mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-white/80 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
