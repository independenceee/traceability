"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { appImage } from "@/public/images";
import { ArrowRight } from "lucide-react";
import React, { useEffect } from "react";
import Header from "@/app/(landing)/_layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import FileDisplay from "@/components/file-display";
import Copy from "@/components/copy";
import { hexToString } from "@meshsdk/core";
import Property from "@/components/property";
import { isEmpty, isNil } from "lodash";
import { getAssetTxHistory } from "@/services/blockchain/get-asset-tx-history";
import { getAssetInfo } from "@/services/blockchain/getAssetInfo";
import { useQuery } from "@tanstack/react-query";
import useUnitStore from "@/contexts/unit/store";
import { AssetDetailsWithTransactionHistory, TxHistory } from "@/types";
import { useParams } from "next/navigation";
import Loading from "@/app/(loading)/loading";
import Footer from "@/app/(landing)/_layout/footer";
import QRCodeGenerator from "@/components/qrcode-generator";
import TransactionHistory from "@/app/(app)/dashboard/(profile)/_components/product-history";

export default function ProductsPage() {
  const params = useParams();
  const unit = params.unit as string;
  console.log(unit);
  const {
    metadataToUpdate,
    setMetadataToUpdate,

    txCurrentPage,
    txTotalPages,
    setTxCurrentPage,
    setQuantityToBurn,
  } = useUnitStore();

  const { data: assetData, isLoading: assetLoading } = useQuery({
    queryKey: ["getAssetInfo", unit],
    queryFn: () => getAssetInfo(unit),
    enabled: !isNil(unit) && !isEmpty(unit),
  });

  const { data: assetTxHistory, isLoading: txLoading } = useQuery({
    queryKey: ["getAssetTxHistory", unit, txCurrentPage],
    queryFn: () =>
      getAssetTxHistory({
        unit: unit,
        page: txCurrentPage,
        limit: 8,
      }),
    enabled: !isNil(unit),
  });

  useEffect(() => {
    if (assetData?.data && !isNil(assetData.data.metadata)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _pk, ...metadata } = assetData.data.metadata;
      setMetadataToUpdate(metadata);
    } else {
      setMetadataToUpdate({});
      setQuantityToBurn({ quantity: 1 });
    }
  }, [assetData, assetLoading]);
  if (txLoading) return <Loading />;
  if (assetLoading) return <Loading />;

  const { asset_name, policy_id, metadata, fingerprint, quantity } = assetData?.data || ({} as AssetDetailsWithTransactionHistory);

  const assetNameString = hexToString(asset_name?.replace(/^000de140/, "")?.replace(/^000643b0/, ""));

  const imgSrc = metadata?.image || "";

  const mediaType = metadata?.mediaType || "image/png";

  const totalSupply = quantity || "1";
  return (
    <main className="relative px-4 overflow-x-hidden">
      <Header />
      {/* banner-begin */}
      <section className="px-0 pt-[150px] max-md:pt-[150px] max-md:px-3">
        <aside className="mx-auto my-0 w-full h-full max-w-[1200px] flex items-center justify-center">
          <div className="w-full flex flex-col">
            <div className="rounded-xl  flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-6">
                {/* NFT Image */}
                <div className="w-full h-full md:w-1/2">
                  <AspectRatio ratio={4 / 4}>
                    <FileDisplay
                      src={imgSrc}
                      alt={"image"}
                      objectFit="contain"
                      type={mediaType}
                      className="h-auto w-full rounded-lg border object-contain"
                    />
                  </AspectRatio>
                </div>

                {/* NFT Details */}
                <Card className="w-full h-full md:w-1/2 bg-card ">
                  <CardContent className="p-6 space-y-6">
                    {/* Title and Verification */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold overflow-hidden whitespace-nowrap">{assetNameString}</h1>
                        <span className="text-blue-400">✓</span>
                      </div>
                    </div>

                    {/* Policy and Asset IDs */}
                    <div className="space-y-2 ">
                      <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">Policy ID: {policy_id}</span>
                        <Copy content={policy_id} className="h-8 w-8" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-400 overflow-hidden whitespace-nowrap">Asset ID: {fingerprint}</span>
                        <Copy content={fingerprint} className="h-8 w-8" />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-400 overflow-hidden whitespace-nowrap">Total Supply: {totalSupply}</span>
                        <Copy content={totalSupply} className="h-8 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="properties" className="w-full mt-5">
                <TabsList className="bg-gray-900">
                  <TabsTrigger value="properties">Properties</TabsTrigger>
                  <TabsTrigger value="transaction">Transaction History</TabsTrigger>
                </TabsList>
                <TabsContent value="properties" className="mt-4">
                  <Card className="p-5 border-none rounded-lg flex flex-col gap-8">
                    <div className="flex flex-col gap-8">
                      <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                        {metadataToUpdate &&
                          Object.entries(metadataToUpdate).map(([name, value], index) => <Property key={index} name={name} value={value} />)}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="transaction" className="mt-4">
                  {/* <ProductHistory
                    assetTxHistory={assetTxHistory?.data as TxHistory[]}
                    unit={unit}
                    setTxCurrentPage={setTxCurrentPage}
                    txTotalPages={txTotalPages}
                    txCurrentPage={txCurrentPage}
                  /> */}
                  <TransactionHistory
                    assetTxHistory={assetTxHistory?.data as TxHistory[]}
                    unit={unit}
                    setTxCurrentPage={setTxCurrentPage}
                    txTotalPages={txTotalPages}
                    txCurrentPage={txCurrentPage}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex flex-col md:flex-row gap-6 w-full">
                <QRCodeGenerator code={policy_id + asset_name} />
              </div>
            </div>
          </div>
        </aside>
      </section>
      {/* banner-end */}

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
