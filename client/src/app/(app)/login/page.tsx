"use client";

import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { routes } from "@/constants/routes";
import { useSession } from "next-auth/react";
import { wallets } from "@/constants";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { networks } from "@/constants/networks";
import Network from "@/components/network";
import Wallet from "@/components/wallet";
import { WalletType } from "@/types";
export const dynamic = "force-dynamic";
export default function SignInPage() {
  const [network, setNetwork] = useState<string>("preview");

  useEffect(() => {
    const networkConnection = localStorage.getItem("network");
    if (networkConnection) {
      setNetwork(JSON.parse(networkConnection));
    }
  }, []);

  useEffect(() => {
    if (network) {
      localStorage.setItem("network", JSON.stringify(network));
    }
  }, [network]);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="h-screen">
      <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
        <header className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex h-[60px] w-[150px] items-center justify-center">
            <Link className="relative flex items-center justify-center gap-2" href={routes.landing.redirect}>
              <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
              <span className="text-2xl">Traceability</span>
            </Link>
          </div>
          <ul className="flex items-center justify-center gap-7">
            <Link href={"https://traceability.trustorstudio.com/"}>
              <SocialIcon href="https://traceability.trustorstudio.com/" style={{ width: 36, height: 36 }} network="telegram" />
            </Link>
            <Link href={"https://traceability.trustorstudio.com/"}>
              <SocialIcon href="https://traceability.trustorstudio.com/" style={{ width: 36, height: 36 }} network="discord" />
            </Link>
            <Link href={"https://traceability.trustorstudio.com/"}>
              <SocialIcon href="https://traceability.trustorstudio.com/" style={{ width: 36, height: 36 }} network="github" />
            </Link>
            <Link href={"https://traceability.trustorstudio.com/"}>
              <SocialIcon href="https://traceability.trustorstudio.com/" style={{ width: 36, height: 36 }} network="x" />
            </Link>
          </ul>
        </header>

        <main className="mt-[60px] mb-[20px] flex items-center justify-center flex-col h-full">
          <section className="w-[540px] box-border py-[35px] px-[45px] bg-slate-900 shadow-lg rounded-md">
            <div className="flex items-center justify-between">
              <div className=" text-[20px]">
                <strong>Connect Wallet</strong>
              </div>
              <div className="w-[120px] text-[16px] text-end">
                <strong>{network.charAt(0).toUpperCase() + network.slice(1).toLowerCase()}</strong>
              </div>
            </div>

            <div className="flex mt-5">
              <section className="pr-[30px] border-r-[1px] flex flex-col gap-5 border-solid border-gray-500 mr-[30px] h-[230px] overflow-y-auto overflow-x-hidden">
                {networks.map(({ image, name }, index: number) => {
                  return (
                    <Network image={image} name={name} key={index} isActive={name.toLowerCase() === network.toLowerCase()} setNetwork={setNetwork} />
                  );
                })}
              </section>
              <section className="overflow-x-hidden overflow-y-auto pr-[20px] mr-[-20px] h-[230px] flex flex-col gap-2 ">
                {wallets.map((wallet: WalletType, index: number) => {
                  return <Wallet key={index} wallet={wallet} session={session} />;
                })}
              </section>
            </div>
          </section>

          <section className="mt-[20px] ">
            <div className="flex items-center justify-center  text-center ">
              <p>Web2 Login Powered by Particle Network</p>
            </div>
            <div className="flex items-center justify-center  text-center gap-6 my-[20px]">
              <Link href={"https://traceability.trustorstudio.com/"}>
                <SocialIcon href={"https://traceability.trustorstudio.com/"} style={{ width: 36, height: 36 }} network="x" />
              </Link>
              <Link href={"https://traceability.trustorstudio.com/"}>
                <SocialIcon href={"https://traceability.trustorstudio.com/"} style={{ width: 36, height: 36 }} network="github" />
              </Link>
            </div>
          </section>
        </main>

        <footer className="pb-[20px] text-center">
          <Link className="underline-offset-2 underline" href={"https://traceability.trustorstudio.com/"} target="_blake">
            Help Center
          </Link>
          <p className="mt-[16px] text-gray-400">Traceability Network Foundation Independence</p>
        </footer>
      </div>
    </div>
  );

  // return (
  //   <div className="h-screen">
  //     <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
  //       <header className="container mx-auto flex items-center justify-between px-4 py-4">
  //         <div className="flex h-[60px] w-[150px] items-center justify-center">
  //           <Link className="relative flex items-center justify-center gap-2" href={routes.landing.redirect}>
  //             <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
  //             <span className="text-2xl">Generator</span>
  //           </Link>
  //         </div>
  //       </header>

  //       <main className="mx-auto w-[550px] flex flex-1 flex-col items-center justify-center spacey-y-4">
  //         <Card className="w-full mx-auto">
  //           <CardHeader>
  //             <CardTitle>
  //               <div className="flex justify-between items-center w-full">
  //                 <span>Connect Wallet</span>
  //                 <DropdownMenu>
  //                   <DropdownMenuTrigger asChild>
  //                     <Button variant="outline" className="w-[180px] justify-between">
  //                       {appNetwork}
  //                       <ChevronDown className="h-4 w-4 opacity-50" />
  //                     </Button>
  //                   </DropdownMenuTrigger>
  //                   <DropdownMenuContent align="end" className="w-[180px] justify-between">
  //                     {["preview", "mainnet"]
  //                       .filter((item) => item !== appNetwork)
  //                       .map((item) => (
  //                         <DropdownMenuItem key={item} onClick={() => handleOpenNetwork(item)}>
  //                           {item}
  //                         </DropdownMenuItem>
  //                       ))}
  //                   </DropdownMenuContent>
  //                 </DropdownMenu>
  //               </div>
  //             </CardTitle>

  //             <CardDescription>Connect a wallet on {appNetwork} to continue</CardDescription>
  //           </CardHeader>
  //           <CardContent className="grid gap-4">
  //             {Object.entries(wallets).map(([key, value]) => {
  //               if (value.id != "eternl") return;
  //               return (
  //                 <WalletItem
  //                   key={key}
  //                   wallet={wallet}
  //                   item={value}
  //                   onConnectWallet={(wallet) => {
  //                     return signIn(session, wallet);
  //                   }}
  //                   status={walletInstalledList.find((wallet) => wallet.id === value.id) ? "ready" : "not installed"}
  //                 />
  //               );
  //             })}
  //           </CardContent>
  //         </Card>
  //         <p className="px-8 text-center text-sm text-muted-foreground">
  //           Created by cardano2vn , you agree to our{" "}
  //           <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
  //             Terms of Service
  //           </Link>{" "}
  //           and{" "}
  //           <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
  //             Privacy Policy
  //           </Link>
  //           .
  //         </p>
  //       </main>
  //     </div>
  //   </div>
  // );
}
