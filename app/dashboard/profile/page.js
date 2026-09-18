"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { DISABILITY_TYPES } from "../../../lib/options";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  if (!form) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
  }

  const inputClass =
    "w-full rounded-md bg-slate-100 px-3 py-2 text-brand-dark outline-none focus:ring-2 focus:ring-brand-accent";

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-dark mb-6">Profile</h1>

      <form onSubmit={handleSave} className="bg-white rounded-xl2 shadow-card p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">First Name</label>
            <input
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Last Name</label>
            <input
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Address</label>
          <input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">
            Type of Disability
          </label>
          <select
            value={form.disabilityType}
            onChange={(e) => update("disabilityType", e.target.value)}
            className={inputClass}
          >
            {DISABILITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Birthdate</label>
            <input
              type="date"
              value={form.birthdate}
              onChange={(e) => update("birthdate", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Sex</label>
            <select
              value={form.sex}
              onChange={(e) => update("sex", e.target.value)}
              className={inputClass}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
          <input
            value={form.email}
            disabled
            className={inputClass + " opacity-60 cursor-not-allowed"}
          />
        </div>

        {saved && (
          <p className="text-sm bg-emerald-100 text-emerald-700 rounded-md px-3 py-2">
            Profile updated.
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-brand hover:bg-brand-mid text-white font-semibold px-6 py-2.5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
