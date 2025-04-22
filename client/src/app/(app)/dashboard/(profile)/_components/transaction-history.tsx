import { Card, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { appNetwork, decialPlace } from "@/constants";
import { useUnitContext } from "@/contexts/unit";
import { TxHistory } from "@/types";
import { shortenString } from "@/utils";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { getHistoryMetadata } from "@/services/blockchain/getHistoryMetadata";
import ReactDiffViewer from "react-diff-viewer";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";

export default function TransactionHistory() {
  const { assetTxHistory, unit, txCurrentPage, txTotalPages, setTxCurrentPage } = useUnitContext();

  const [dialog, setDialog] = useState<{
    open: boolean;
    oldMetadata: Record<string, string>;
    newMetadata: Record<string, string>;
  }>({
    open: false,
    oldMetadata: {},
    newMetadata: {},
  });

  const openMetadataChanges = async (txhash: string) => {
    try {
      const data = await getHistoryMetadata({
        txHash: txhash,
        unit: unit.replace("000de140", "000643b0"),
      });
      setDialog({
        open: true,
        oldMetadata: data?.metadata?.from as Record<string, string>,
        newMetadata: data?.metadata?.to as Record<string, string>,
      });
    } catch {
      setDialog({ open: false, oldMetadata: {}, newMetadata: {} });
    }
  };

  return (
    <>
      <Dialog
        open={dialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setDialog({ open: false, oldMetadata: {}, newMetadata: {} });
          }
        }}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent className=" max-w-[80vw] w-screen h-[80vh] p-0">
          <div className="rounded-xl p-10">
            <ReactDiffViewer
              oldValue={JSON.stringify(dialog.oldMetadata, null, 2)}
              newValue={JSON.stringify(dialog.newMetadata, null, 2)}
              splitView
              useDarkTheme
            />
          </div>
        </DialogContent>
      </Dialog>
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                  {"Tx Hash / Datetime"}
                </TableHead>
                <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                  {"Fees / Action"}
                </TableHead>
                <TableHead className="h-8 py-5 px-4 text-[#8e97a8] text-[10px] uppercase leading-[16px] font-medium text-center">
                  {"Status / History"}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetTxHistory?.map((transaction: TxHistory, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-[#0d0e12]" : ""}>
                  <TableCell className="h-14 py-5 px-4 text-center">
                    <Link
                      href={`https://${appNetwork}.cexplorer.io/tx/${transaction.txHash}`}
                      target="_blank"
                      className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]"
                    >
                      {shortenString(transaction.txHash, 10)}
                    </Link>
                    <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                      {new Date(transaction?.datetime * 1000).toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell className="h-14 py-5 px-4 text-center">
                    <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                      {((Number(transaction.fee) || 0) / decialPlace).toFixed(3)} ₳
                    </h3>
                    <p className="text-[#5b6372] max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                      {transaction.action}
                    </p>
                  </TableCell>
                  <TableCell className="h-14 py-5 px-4 text-center">
                    <h3 className="max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-white text-[14px] font-medium leading-[20px]">
                      {transaction.status}
                    </h3>
                    <Button onClick={() => openMetadataChanges(transaction.txHash)} variant={"ghost"}>
                      <p className="text-[#5b6372] underline max-w-full overflow-hidden whitespace-nowrap text-ellipsis text-[12px] font-medium leading-4">
                        View Metadata Changes
                      </p>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <>
            <Pagination currentPage={txCurrentPage} setCurrentPage={setTxCurrentPage} totalPages={txTotalPages} />
          </>
        </CardContent>
      </Card>
    </>
  );
}
