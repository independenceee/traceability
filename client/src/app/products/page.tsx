"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Title from "@/components/title";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { appImage } from "@/public/images";
import { ArrowRight } from "lucide-react";
import Service from "@/components/service";
import Header from "../(landing)/_layout/header";
import Footer from "../(landing)/_layout/footer";
import React from "react";
import { create } from "zustand";
import { AssetDetails, FilterType } from "@/types";
import { filterDefault } from "@/constants";
import { getAssets } from "@/services/contract/getWalletsAssets";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/pagination";
import AssetCardSkeleton from "../(app)/dashboard/(profile)/_components/asset-card-skeleton";
import { isEmpty } from "lodash";
import ProductCard from "../(app)/dashboard/(profile)/_components/product-card";

export type ProductStore = {
  totalUserAssets: number;
  listNft: AssetDetails[];
  filter: FilterType;
  totalItem: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: FilterType) => void;
};

const useProductStore = create<ProductStore>((set) => ({
  totalUserAssets: 0,
  listNft: [],
  filter: filterDefault,
  totalItem: 0,
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilter: (filter) => set({ filter }),
}));

const banners = [{ image: appImage.certification }, { image: appImage.collection }, { image: appImage.about }, { image: appImage.storegae }];

export default function ProductsPage() {
  const { filter, currentPage, setCurrentPage } = useProductStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getWalletAssets", filter, currentPage],
    queryFn: () => getAssets({ query: filter.query, page: currentPage, limit: 12 }),
  });

  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <main className="relative px-4 overflow-x-hidden">
      <Header />
      {/* banner-begin */}
      <section className="px-0 pt-[150px] max-md:pt-[150px] max-md:px-3">
        <aside className="mx-auto my-0 w-full h-full max-w-[1200px] flex items-center justify-center">
          <Carousel plugins={[plugin.current]} className="w-full h-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent className="w-full p-0">
              {banners.map(({ image }, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className="w-full p-0 rounded aspect-[3/1.2]">
                      <CardContent className="flex w-full items-center p-0 justify-center">
                        <Image className="object-cover aspect-[3/1.2] w-full h-full" src={image} alt="" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </aside>
      </section>
      {/* banner-end */}

      {/* feature-begin */}
      <section className={"px-0 mt-5 max-md:mt-[200px]"}>
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <Title title="Products" description="Discover the highlight features of our Traceability" />

          {/* content-begin */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <AssetCardSkeleton key={index} />
              ))}
            </div>
          )}
          {!isLoading ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {isEmpty(data?.data) ? (
                  <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
                    <Card className="w-full rounded-lg border ">
                      <CardHeader className="pt-8">
                        <CardTitle className="text-2xl font-medium text-white text-center">No NFTs found</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center gap-6 pb-8">
                        <p className="text-gray-400 text-center">We couldn't find any NFTs that match your search criteria.</p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  data?.data.map((data, index) => <ProductCard data={data} key={index} />)
                )}
              </div>

              <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.totalPages || 0} />
            </>
          ) : !isLoading ? (
            <div className="h-[60vh] w-full space-y-4 rounded-lg py-4">
              <Card className="w-full rounded-lg border">
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-medium text-white text-center">You don't have any product</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6 pb-8">
                  <p className="text-gray-400 text-center">To get started you'll need your prepared assets, we'll help guide you along your way.</p>
                </CardContent>
              </Card>
            </div>
          ) : null}
          {/* content-end */}
        </aside>
      </section>
      {/* feature-end */}

      {/* about-begin */}
      <section className="px-0 mt-[100px]">
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <div className="flex w-full gap-7 max-sm:flex-col">
            <div className='m relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""] max-sm:w-full'>
              <Image className="absolute inset-0 z-10 block h-full w-full rounded-xl" src={appImage.about} alt=""></Image>
            </div>
            <div className="z-10 flex w-[40%] flex-col items-start gap-[15px] max-md:gap-3 max-sm:w-full">
              <h2 className="text-left text-[25px]  font-bold max-md:text-xl">About Traceability</h2>
              <p className="mb-1 text-[20px] font-normal max-md:text-lg">Open-Source Transparency for Supply Chains</p>
              <span className={"text-left leading-[1.8] max-md:text-base"}>
                Supply Chain Traceability Generator: Simplifying Asset Management on Blockchain, Open-Source Transparency for Supply Chains, Simplify
                Blockchain-Based Supply Chain Tracking. Supply Chain Traceability Generator: Simplifying Asset Management on Blockchain, Open-Source
                Transparency for Supply Chains, Simplify Blockchain-Based Supply Chain Tracking. Supply Chain Traceability Generator: Simplifying
              </span>
              <Link href="https://cips.cardano.org/cip/CIP-68" target="_blank">
                <Button className={"w-full px-8 py-6"}>Learn More Traceability</Button>
              </Link>
            </div>
          </div>
        </aside>
      </section>
      {/* about-end */}

      {/* founder-begin */}
      <section className={"px-0 mt-[100px] max-md:mt-[50px]"}>
        <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
          <Title title="Service Plan" description="The driving force behind our success" />
          {/* founder-begin */}
          <section className="grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg max-lg:grid-cols-2 max-sm:grid-cols-1">
            <Service />
          </section>
          {/* founder-end */}
        </aside>
      </section>
      {/* founder-end */}
      {/* subscribe-begin */}
      <div className="px-auto pb-[50px] mt-[100px]">
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
