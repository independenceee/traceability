/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import React, { useState } from "react";
import NavLink from "./nav-link";
import { routes } from "@/constants/routes";

type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const [selected, setSelected] = useState<string>(routes.landing.redirect);

  return (
    <div className={cn(className)}>
      <Button>Connect Wallet</Button>
      <nav className="py-[25px] px-[18px]">
        {/* <ul>
          {publicRoutes.map(function ({ name, redirect }, index: number) {
            return <NavLink key={index} isActive={false} name={name} redirect={redirect} setSelected={setSelected} />;
          })}
        </ul> */}
      </nav>
    </div>
  );
}
