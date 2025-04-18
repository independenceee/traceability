"use client";

import React from "react";
import { CheckCircle, CircleX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TransactionStep({
  stepper,
  tasks,
}: {
  stepper: { prev: () => void; isFirst: boolean };
  tasks: { content: string; status: string }[];
}) {
  return (
    <div className="h-full py-8  m-auto flex flex-col">
      <Card className="rounded-md border border-dashed">
        <ul className="space-y-4">
          {tasks.map((state, index) => {
            if (state.status === "todo") return null;

            if (state.status === "inprogress") {
              return (
                <li key={index} className="flex items-center space-x-3 p-3 rounded-md">
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                  <span className="flex-1">{state.content}</span>
                </li>
              );
            }
            if (state.status === "error") {
              return (
                <li key={index} className="flex items-center space-x-3 p-3 rounded-md">
                  <CircleX className="h-5 w-5 text-red-500" />
                  <span className="flex-1">{state.content}</span>
                </li>
              );
            }

            return (
              <li key={index} className="flex items-center space-x-3 p-3 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="flex-1">{state.content}</span>
              </li>
            );
          })}
        </ul>
      </Card>
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="secondary" onClick={stepper.prev} disabled={stepper.isFirst}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
