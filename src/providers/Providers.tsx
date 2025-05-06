"use client";

import React from "react";

import { AuthProvider } from "./AuthProvider";
import { LoadingProvider } from "./LoadingProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <AuthProvider>{children}</AuthProvider>
    </LoadingProvider>
  );
}
