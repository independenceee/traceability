"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavLink from "./nav-link";
import { appImage } from "@/public/images";
import Hamburger from "./hamburger";
import { routes } from "@/constants/routes";
import { landingMenu } from "@/constants/menu-list";
import { useWallet } from "@/hooks/use-wallet";
import Account from "@/components/account";

const Header = function () {
  const { browserWallet } = useWallet();

  return (
    <header className="fixed left-[50%] top-0 z-50 my-0 ml-[-600px] mr-auto box-border flex h-[75px] w-[1200px] translate-y-[30px] items-center justify-between rounded-2xl bg-[#13161b] px-[30px] py-0 shadow-sm transition duration-300 ease-out max-md:h-[52px] max-md:w-full max-md:px-[15px] max-md:m-0 max-md:py-0 max-md:left-3 max-md:top-0 max-md:right-[10px] ">
      {/* logo-begin */}

      <Link className="relative flex items-center justify-center gap-2" href={routes.landing.redirect}>
        <Image className="h-[35px] w-[35px] object-cover" src={appImage.logo} alt="Logo" />
        <span className="text-2xl">Traceability</span>
      </Link>

      {/* logo-end */}

      <ul className="flex w-full items-center justify-center gap-12 max-md:hidden">
        {landingMenu.map(function (item, index: number) {
          return <NavLink key={index} setSelected={null!} className="" isActive={false} redirect={item.href} name={item.title} />;
        })}
      </ul>

      {/* connect-wallet-begin */}
      {browserWallet ? (
        <Account />
      ) : (
        <Link className="max-md:hidden" href={"/login"}>
          <Button>Connect Wallet</Button>
        </Link>
      )}
      {/* connect-wallet-end */}

      <Hamburger />
    </header>
  );
};

export default Header;
