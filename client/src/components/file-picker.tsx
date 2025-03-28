"use client";

import { uploadConfig } from "@/constants";
import { useToast } from "@/hooks/use-toast";

export default function FilePicker({
  title,
  setFiles,
  accept = "*/*",
  multiple = true,
}: {
  title?: string;
  setFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}) {
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files) {
      let size = 0;
      if (files.length > uploadConfig.maxFiles) {
        toast({
          title: "Error",
          description: `You can only upload a maximum of ${uploadConfig.maxFiles} files.`,
          variant: "destructive",
        });
        return;
      }
      Array.from(files).forEach((file) => {
        size += file.size;
      });
      if (size > 1024 * 1024 * uploadConfig.maxSize) {
        toast({
          title: "Error",
          description: `Total file size exceeds ${uploadConfig.maxSize}MB`,
          variant: "destructive",
        });
        return;
      }
      setFiles(Array.from(files));
    }
  };

  return (
    <div className="w-full h-[30vh] flex items-center flex-col justify-center bg-transparent border-dashed border-gray-700 border-[1px] rounded-lg gap-4 text-center ">
      <p className="font-normal flex items-center justify-center self-stretch  text-sm text-[16px] text-center">
        <span className="max-w-[480px]">{title}</span>
      </p>
      <label
        htmlFor="file-upload"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Upload File
      </label>
      <input id="file-upload" type="file" className="hidden" accept={accept} multiple={multiple} onChange={handleFileUpload} />
    </div>
  );
}
