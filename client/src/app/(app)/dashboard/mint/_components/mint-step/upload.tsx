import CSVReader from "@/components/csv-reader";
import { useState } from "react";

export default function UploadSteps({
  loading,
  uploadCSV,
}: {
  loading: boolean;
  uploadCSV: (input: { csvContent: string[][]; csvName: string }) => void;
}) {
  const [csvContent, setCsvContent] = useState<{
    name: string;
    data: string[][];
  }>(null!);

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <CSVReader
          loading={loading}
          setCsvContent={setCsvContent}
          onSubmit={() =>
            uploadCSV({
              csvContent: csvContent.data,
              csvName: csvContent.name,
            })
          }
        />
      </div>
    </div>
  );
}
