import images from "~/public/images";
import WalletConnectButton from "~/components/wallet-connect-button";
import { useSidebarToggle } from "~/hooks/use-sidebar-toggle";
import { Breadcrumb } from "../ui/breadcrumb";
import { cn } from "~/lib/utils";
import Image from "next/image";

export default function Navlink() {
    const sidebar = useSidebarToggle();
    return (
        <header className="fixed right-0 top-0 z-10 max-h-16 w-full bg-section">
            <div className="mx-4 flex h-16 items-center sm:mx-8">
                <div className="flex flex-1 items-center justify-start md:hidden">
                    <Image src={images.logo} alt="" className="h-full w-full object-cover" />
                </div>

                <div
                    className={cn(
                        "flex-1 hidden md:flex items-center justify-start transition-all duration-300 ease-in-out",
                        sidebar?.isOpen === false ? "ml-[73px]" : "ml-[300px]",
                    )}
                >
                    <Breadcrumb />
                </div>

                <div className="flex flex-1 items-center justify-end space-x-2">
                    <WalletConnectButton />
                </div>
            </div>
        </header>
    );
}
