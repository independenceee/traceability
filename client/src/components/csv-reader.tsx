/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import FileDisplay from "@/components/file-display";
import { isEmpty, isNil } from "lodash";
import Link from "next/link";
import { parseError } from "@/utils/error/parse-error";

export default function CSVReader({
  loading,
  setCsvContent,
  onSubmit,
}: {
  loading: boolean;
  setCsvContent: ({ name, data }: { name: string; data: string[][] }) => void;
  onSubmit: () => void;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const { CSVReader } = useCSVReader();
  return (
    <>
      {loading ? (
        <div className="grid h-full place-content-center px-4">
          <Loader2 className="my-28 h-16 w-16 animate-spin text-primary/60" />
        </div>
      ) : (
        <CSVReader
          onUploadAccepted={(result: any, file: File) => {
            try {
              if (!isEmpty(result.errors)) {
                throw new Error(result.errors[0][0].message);
              }
              setError(null);
              setCsvContent({
                name: file.name.replace(/\.csv$/, ""),
                data: result.data,
              });
            } catch (e) {
              setError(parseError(e));
            }
          }}
        >
          {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
            <div className="w-full h-[30vh] flex flex-col space-y-5 items-center justify-center bg-transparent border-dashed border-gray-700 border-[1px] rounded-lg">
              <p className="ml-2 text-red-400"> {error && <p>{error}</p>}</p>
              {acceptedFile ? (
                <div className="flex w-full max-w-md items-center justify-between rounded-lg bg-gray-800 p-2">
                  <div className="flex flex-grow items-center">
                    <FileDisplay src={""} alt={acceptedFile.name} type={acceptedFile.type} className="mr-4 h-20 w-20 rounded object-cover" />
                    <span className="truncate text-lg text-white">{acceptedFile.name}</span>
                  </div>
                  <Button
                    {...getRemoveFileProps()}
                    onClick={(event: Event) => {
                      getRemoveFileProps().onClick(event);
                      setCsvContent(null!);
                      setError(null);
                    }}
                    variant="destructive"
                    size="icon"
                    className="ml-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
                    <div className="mx-4 flex h-16 items-center sm:mx-8">
                      <div className="flex flex-1 items-center justify-end space-x-2">
                        <Button onClick={onSubmit} disabled={!isNil(error)}>
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center flex-col gap-4">
                  <Link href={"/demo.csv"} className="font-normal self-stretch text-center text-sm text-[16px] underline">
                    Download the sample CSV file here, edit it and upload your own file
                  </Link>
                  <div {...getRootProps()}>
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Select File
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </CSVReader>
      )}
    </>
  );
}
