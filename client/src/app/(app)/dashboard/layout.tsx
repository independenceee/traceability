"use client";

import Loading from "~/app/(loading)/loading";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { Menu } from "~/components/layout/menu";
import { cn } from "~/lib/utils";
import { useSidebarToggle } from "~/hooks/use-sidebar-toggle";
import Navlink from "~/components/layout/navlink";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
    const sidebar = useSidebarToggle();
    return (
        <main>
            <Menu />
            <main
                className={cn(
                    "flex min-h-[calc(100vh_-_56px)] justify-center transition-[margin-left] duration-300 ease-in-out",
                    sidebar?.isOpen === false ? "lg:ml-[73px]" : "lg:ml-[300px]",
                )}
            >
                <Navlink />

                <div className="container mt-20 px-4">{children}</div>
            </main>
        </main>
    );
}
