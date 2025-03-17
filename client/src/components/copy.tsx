import { CircleCheck, Copy } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { cn, copyToClipboard } from "~/lib/utils";

export default function CopyButton({
    content,
    className = "",
}: {
    content: string;
    className?: string;
}) {
    const [copied, setCopied] = React.useState(false);
    const handleCopy = async () => {
        await copyToClipboard(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 500);
    };
    return (
        <Button variant="ghost" size="icon" onClick={handleCopy} className={cn(className, "")}>
            {copied ? <CircleCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
    );
}
