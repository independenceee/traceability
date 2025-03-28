import { WalletConnectButton } from "@/components/cardano-wallet";
import { appImage } from "@/public/images";
import { cn } from "@/utils";
import Image from "next/image";
export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-section">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex flex-1 items-center justify-start md:hidden">
          <Image className={cn("h-[35px] w-[35px] object-coverabsolute")} src={appImage.logo} alt="Logo" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}
