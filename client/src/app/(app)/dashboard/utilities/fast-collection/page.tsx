"use client";
import CSVReader from "@/components/csv-reader";
import { useUploadCsvContext } from "@/contexts/fast-collection";
import { useState } from "react";

export default function UploadCSVPage() {
  const { loading, uploadCsv } = useUploadCsvContext();
  const [csvContent, setCsvContent] = useState<{
    name: string;
    data: string[][];
  }>(null!);

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Upload Fast Collection</h1>

        <div className="mt-5">
          <CSVReader
            loading={loading}
            setCsvContent={setCsvContent}
            onSubmit={() => {
              uploadCsv({
                csvContent: csvContent.data,
                csvName: csvContent.name,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
