"use client";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
      <div className="mx-4 flex h-16 items-center sm:mx-8">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
}
