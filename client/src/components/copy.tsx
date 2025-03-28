"use client";

import { FaCopy, FaCheck } from "react-icons/fa";
import React from "react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

export default function Copy({ content, className = "" }: { content: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    await copyToClipboard(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 500);
  };
  return (
    <Button variant="ghost" size="icon" onClick={handleCopy} className={cn(className, "")}>
      {copied ? <FaCheck className="h-4 w-4" /> : <FaCopy className="h-4 w-4" />}
    </Button>
  );
}
