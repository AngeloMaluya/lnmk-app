"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, FileText, Bell, History, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/my-request", label: "My Request", icon: FileText },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/history", label: "History", icon: History },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <aside className="w-60 min-h-screen bg-brand flex flex-col shrink-0">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 px-5 py-6 border-b border-white/15"
      >
        <div className="bg-white rounded-full p-0.5">
          <Logo size={34} />
        </div>
        <span className="text-white font-semibold text-sm leading-tight">
          Lakas ng may Kapansanan
        </span>
      </Link>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-2.5 mx-3 mb-1 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-white text-brand-dark"
                  : "text-white/85 hover:bg-white/10"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-5 py-4 mx-3 mb-4 text-sm font-medium text-white/85 hover:bg-white/10 rounded-md"
      >
        <LogOut size={17} />
        Log Out
      </button>
    </aside>
  );
}
