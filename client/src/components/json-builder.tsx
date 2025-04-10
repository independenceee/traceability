"use client";

import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils";
import { FilePick } from "./file-pick";
import { useJsonBuilderStore } from "./store";
import { isEmpty } from "lodash";
import { Card } from "./ui/card";

export default function JsonBuilder({ className }: { className?: string }) {
  const { fields, addField, removeField, updateField, error, getJsonResult } = useJsonBuilderStore();
  return (
    <div className={cn(className, "flex h-full bg-section gap-4 flex-1")}>
      <Card className="w-1/2 p-4 flex-1 space-y-2 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg ">
          <h1 className="text-2xl font-semibold tracking-tight">Metadata Builder</h1>
        </div>
        <div className=" ont-semibold tracking-tight"> {error && <p className="text-red-500">{error}</p>}</div>
        <div className="flex-1">
          {!isEmpty(fields) &&
            fields.map((field, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <div className="flex-1">
                  <Label htmlFor={`key-${index}`} className="sr-only">
                    Key
                  </Label>
                  <Input
                    id={`key-${index}`}
                    placeholder="Key"
                    value={field.key}
                    onChange={(e) => updateField && updateField(index, "key", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`value-${index}`} className="sr-only">
                    Value
                  </Label>
                  <Input
                    id={`value-${index}`}
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => updateField && updateField(index, "value", e.target.value)}
                  />
                </div>
                <Button variant="destructive" className="text-white" onClick={() => removeField && removeField(index)}>
                  <FaTrash size={20} />
                </Button>
              </div>
            ))}
        </div>
        <div className="flex items-center justify-start space-x-4">
          <Button className="w-full self-stretch" onClick={addField}>
            Add Field
          </Button>
          <FilePick />
        </div>
      </Card>
      <Card className="w-1/2 p-4 h-full flex-1 flex">
        <Textarea className="w-full h-full resize-none font-mono " value={JSON.stringify(getJsonResult(), null, 2)} readOnly />
      </Card>
    </div>
  );
}
