"use client";
import { Button } from "@/components/ui/button";
import FilePicker from "@/components/file-picker";
import { useUploadContext } from "@/contexts/storage";
import MediaGirdtoUpload from "../_components/media-gird-to-upload";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils";
export default function UploadFilePage() {
  const { loading, listFileToUpload, setListFileToUpload, uploadFiles } = useUploadContext();
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Upload File</h1>
        <div className="mt-5">
          <div>
            {loading ? (
              <div className="grid h-full place-content-center px-4">
                <Loader2 className={cn("my-28 h-16 w-16 animate-spin text-primary/60")} />
              </div>
            ) : listFileToUpload.length > 0 ? (
              <div>
                <MediaGirdtoUpload />
                <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
                  <div className="mx-4 flex h-16 items-center sm:mx-8">
                    <div className="flex flex-1 items-center justify-end space-x-2">
                      <Button onClick={uploadFiles}>Upload</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <FilePicker
                title=" Provide the file youd like to use. Make sure each name is
          unique"
                setFiles={setListFileToUpload}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
