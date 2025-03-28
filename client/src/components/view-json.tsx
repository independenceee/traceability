import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReactDiffViewer from "react-diff-viewer";

export function ViewMetadataContent({ json }: { json: Record<string, string> }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Content</Button>
      </DialogTrigger>
      <DialogContent className=" max-w-[80vw] w-screen h-[80vh] p-0">
        <div className="rounded-xl p-10">
          <ReactDiffViewer oldValue={""} newValue={JSON.stringify(json, null, 2)} splitView={false} useDarkTheme />
        </div>
      </DialogContent>
    </Dialog>
  );
}
