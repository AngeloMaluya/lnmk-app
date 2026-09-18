"use client";

import { AuthProvider } from "../context/AuthContext";
import { RequestProvider } from "../context/RequestContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RequestProvider>{children}</RequestProvider>
    </AuthProvider>
  );
}
