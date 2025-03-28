"use client";

import React from "react";
import QueryClientProvider from "./query";
import ErrorClientProvider from "./error";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import BlockchainProvider from "./blockchain";

export default function AppProviders({ children, session }: { children: React.ReactNode; session: SessionProviderProps["session"] }) {
  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      <Toaster />
      <ErrorClientProvider>
        <QueryClientProvider>
          <SessionProvider session={session}>
            <BlockchainProvider>{children}</BlockchainProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ErrorClientProvider>
      {/* </Suspense> */}
    </>
  );
}
