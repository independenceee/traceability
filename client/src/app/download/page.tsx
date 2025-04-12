"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { appImage } from "@/public/images";
import { ArrowRight } from "lucide-react";
import React from "react";
import Header from "@/app/(landing)/_layout/header";
import Footer from "@/app/(landing)/_layout/footer";
import QRCodeGenerator from "@/components/qrcode-generator";

export default function DownloadPage() {
  return (
    <main className="relative px-4 overflow-x-hidden">
      <Header />
      {/* banner-begin */}
      <section className="px-0 pt-[150px] max-md:pt-[150px] max-md:px-3">
        <aside className="mx-auto my-0 w-full h-full max-w-[1200px] flex items-center justify-center">
          <QRCodeGenerator
            code={
              "lakshtoihadbgkljasdfaskjhfdhaskjlavhndkyfnoaiwyireiorva385q8w45n089wnvnaw3856a098nn64598ya98nweyawyna5894yhnhitaiwy598ayvfuhaubaytuabnt87bna9084a0buynt89yaw458ya8ey"
            }
          />
        </aside>
      </section>
      {/* banner-end */}

      {/* subscribe-begin */}
      <div className="px-auto pb-[50px] mt-[80px]">
        <div className="mx-auto my-0 w-full max-w-[1200px]">
          <section className="flex justify-between rounded-xl bg-slate-900 px-[100px] py-[45px] max-sm:flex-col max-sm:px-3 max-sm:py-7">
            <div className="mr-[100px] h-[150px] w-[150px] max-md:w-[100px] max-md:h-[100px]">
              <Image className="h-full w-full animate-pulse object-cover" src={appImage.logo} alt="" />
            </div>
            <div className="flex-1">
              <h2 className="text-[40px] leading-[50px] max-sm:text-[22px] max-md:text-[20px]">
                Stay Updated with<span className="pl-4 text-[#ccc]">Traceability</span>
              </h2>
              <p className="mb-7 mt-4 text-gray-400 max-sm:text-[12px] max-md:mt-1">
                Supply Chain Traceability Generator: Simplifying Asset Management on Blockchain, Open-Source Transparency for Supply Chains, Simplify
                Blockchain-Based Supply Chain Tracking.
              </p>

              <Link href="https://github.com/indepedenceee/traceability" target="_blank">
                <Button className="flex h-[45px] items-center gap-2 rounded-md max-md:text-[12px]">
                  <span>Star us on GitHub</span>
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
      {/* subscribe-end */}
      {/* footer-begin */}
      <Footer />
      {/* footer-end */}
    </main>
  );
}
