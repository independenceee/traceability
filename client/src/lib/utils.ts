import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function shortenString(str = "", length: number = 6): string {
    if (str.length <= length * 2) {
        return str;
    }
    const start = str.slice(0, length);
    const end = str.slice(-length);
    return `${start}...${end}`;
}

export async function copyToClipboard(textToCopy: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand("copy");
        } catch (e) {
            console.error(e);
        } finally {
            textArea.remove();
        }
    }
}
