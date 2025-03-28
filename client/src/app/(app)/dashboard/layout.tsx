"use client";

import Loading from "@/app/(loading)/loading";
import DesktopDashboardLayout from "@/components";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const session = useSession();

  if (session.status === "loading") {
    return <Loading />;
  }

  if (session.status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <>
      <DesktopDashboardLayout>{children}</DesktopDashboardLayout>
    </>
  );
}
