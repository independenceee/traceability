"use client";

import React, { PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "~/app/(loading)/loading";

type Props = PropsWithChildren;

const Provider = function ({ children }: Props) {
    const queryClient = new QueryClient();
    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Suspense>
    );
};

export default Provider;
