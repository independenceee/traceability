"use client";
import { PropsWithChildren } from "react";
import { useSearchParams } from "next/navigation";
import MintManyProvider from "@/contexts/mint-many";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  const searchParams = useSearchParams();
  const collection = searchParams.get("collection");

  return <MintManyProvider collectionId={collection}>{children}</MintManyProvider>;
}
