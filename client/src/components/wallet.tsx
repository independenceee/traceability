"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { WalletType } from "~/types";
import { useEffect, useState } from "react";
import { useWallet } from "~/hooks/use-wallet";
import { useRouter } from "next/navigation";

export default function Wallet({ name, image, checkApi, downloadApi }: WalletType) {
    const router = useRouter(); // Hook để
    const { connectWallet } = useWallet();
    const [isDownload, setIsDownload] = useState<boolean>(true);

    useEffect(() => {
        (async function () {
            try {
                if (checkApi) {
                    setIsDownload(await checkApi());
                } else {
                    setIsDownload(false);
                }
                /* eslint-disable @typescript-eslint/no-unused-vars */
            } catch (error) {
                setIsDownload(false);
            }
        })();
        // @typescript-eslint/no-unused-vars
    }, []);

    const handleDownload = async () => {
        if (downloadApi) {
            if (
                typeof downloadApi === "string" &&
                (downloadApi.startsWith("http://") || downloadApi.startsWith("https://"))
            ) {
                window.open(downloadApi, "_blank");
            }
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <main
                    className={cn(
                        "flex items-center justify-between w-[332px] py-2 px-[35px] rounded-md text-[18px] relative text-gray-300 border border-gray-600 select-none cursor-pointer",
                        {
                            "opacity-50 cursor-not-allowed": !isDownload,
                        },
                    )}
                >
                    <span>{name}</span>
                    <Image src={image} className="w-[30px] h-[30px]" alt={name} />
                </main>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {isDownload ? "Are you absolutely sure?" : "Download " + name + "?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isDownload
                            ? "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                            : "Clicking 'Continue' will start the download process."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={
                            isDownload
                                ? async () => {
                                      await connectWallet({
                                          icon: image,
                                          id: "1",
                                          name: name,
                                          version: "1.1.4",
                                      });

                                      router.push("/dashboard");
                                  }
                                : handleDownload
                        }
                    >
                        {isDownload ? "Continue" : "Download"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
