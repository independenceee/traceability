"use client";
import { PropsWithChildren } from "react";
import MintOneProvider from "@/contexts/mint-one";
import { useSearchParams } from "next/navigation";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const product = searchParams.get("product");

  return (
    <MintOneProvider metadataTemplateId={template} productId={product}>
      {children}
    </MintOneProvider>
  );
}
