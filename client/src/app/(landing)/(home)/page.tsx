import Image from "next/image";
import images from "~/public/images";
import Title from "~/components/title";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "~/components/layout/header";
import { routes } from "~/constants/routes";
import Footer from "~/components/layout/footer";

export default function Home() {
    return (
        <main className="relative  px-4 overflow-x-hidden">
            <Header />
            {/* banner-begin */}
            <section className="px-0 pt-[215px] max-md:pt-[150px] max-md:px-3">
                <aside className="mx-auto my-0 w-full max-w-[1200px]">
                    {/* slogan-begin */}
                    <section className="text-center">
                        <h2 className="text-[54px] leading-[64px] text-[#ff9345] max-md:text-[28px] max-md:leading-[33px] max-md:w-[320px] max-md:my-0 max-md:mx-auto">
                            Simplify Cardano Asset Creation
                        </h2>
                        <h3 className="mt-[15px] text-[42px] leading-[50px] text-[#fff] max-md:mt-[10px] max-md:text-[18px] max-md:leading-[22px]">
                            Open-Source Innovation for All
                        </h3>
                        <h4 className="text-[rgb(119, 119, 118)] mx-auto mb-0 mt-10 max-w-[940px] text-[16px] leading-[20px] max-md:mt-5 max-md:mx-auto max-md:mb-0 max-md:text-[12px] max-md:leading-[16px]">
                            CIP68 Generator is a tool designed to simplify the creation, management,
                            and burning of CIP68-compliant native assets on the Cardano platform
                        </h4>
                    </section>
                    {/* slogan-end */}

                    {/* links-begin */}
                    <div className="mt-[60px] max-md:mt-[30px] flex justify-center gap-10">
                        <Button className="box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium leading-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg max-md:text-[14px] max-md:h-[35px] max-md:rounded-[5px] gap-2 ">
                            <Link className="flex items-center gap-2" href={routes.mint.redirect}>
                                Mint Now
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                    {/* links-end */}

                    {/* statistic-begin */}
                    <div className="mt-[125px] flex h-[160px] items-center justify-around rounded-xl bg-[#13161B] px-[10px] py-0 text-center shadow-2xl max-md:mt-[35px] max-md:bg-none max-md:flex-wrap max-md:h-0 max-md:p-0">
                        {/* {statistic && (
                            <>
                                <StatisticItem value={statistic.transaction} title="Transactions" />
                                <StatisticItem value={statistic.update} title="Assets Active" />
                                <StatisticItem value={statistic.mint} title="Minting Assets" />
                                <StatisticItem value={statistic.burn} title="Burning Assets" />
                            </>
                        )} */}
                    </div>
                    {/* statistic-end */}
                </aside>
            </section>
            {/* banner-end */}

            {/* feature-begin */}
            <section className={"px-0 mt-[100px] max-md:mt-[200px]"}>
                <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
                    <Title
                        title="Features"
                        description="Discover the highlight features of our CIP68 Generator"
                    />

                    {/* content-begin */}
                    <section className="grid grid-cols-3 gap-1 max-md:grid-cols-2 ">
                        {/* {features.map(function (feature, index: number) {
                            return (
                                <Feature
                                    index={index}
                                    key={index}
                                    title={feature.title}
                                    slogan={feature.slogan}
                                    description={feature.description}
                                />
                            );
                        })} */}
                    </section>
                    {/* content-end */}
                </aside>
            </section>
            {/* feature-end */}

            {/* about-begin */}
            <section className="px-0 mt-[100px]">
                <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
                    <div className="flex w-full gap-7 max-sm:flex-col">
                        <div className='m relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""] max-sm:w-full'>
                            <iframe
                                className="absolute inset-0 z-10 block h-full w-full rounded-xl"
                                src="https://www.youtube.com/embed/_GrbIRoT3mU"
                                title="Open source dynamic assets (Token/NFT) generator (CIP68)"
                                frameBorder={"none"}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                        <div className="z-10 flex w-[40%] flex-col items-start gap-[15px] max-md:gap-3 max-sm:w-full">
                            <h2 className="text-left text-[25px]  font-bold max-md:text-xl">
                                About CIP68 Generator
                            </h2>
                            <p className="mb-1 text-[20px] font-normal max-md:text-lg">
                                Open source dynamic assets (Token/NFT) generator (CIP68)
                            </p>
                            <span className={"text-left leading-[1.8] max-md:text-base"}>
                                Open source dynamic assets (Token/NFT) generator (CIP68) CIP68
                                Generator is a tool designed to simplify the creation, management,
                                and burning of CIP68-compliant native assets on the Cardano
                                platform. It provides an easy-to-use interface for non-technical
                                users to interact with these assets while also offering open-source
                                code for developers to integrate and deploy applications faster and
                                more efficiently.
                            </span>
                            <Link href="https://cips.cardano.org/cip/CIP-68" target="_blank">
                                <Button className={"w-full px-8 py-6"}>Learn More Cip68</Button>
                            </Link>
                        </div>
                    </div>
                </aside>
            </section>
            {/* about-end */}

            {/* founder-begin */}
            <section className={"px-0 mt-[100px] max-md:mt-[50px]"}>
                <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
                    <Title title="Our Team" description="The driving force behind our success" />
                    {/* founder-begin */}
                    <section className="grid grid-cols-3 content-start justify-stretch gap-8 rounded-lg max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {/* {founderData.map((founder, index) => (
                            <Founder key={index} data={founder} />
                        ))} */}
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
                            <Image
                                className="h-full w-full animate-pulse object-cover"
                                src={images.logo}
                                alt=""
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-[40px] leading-[50px] max-sm:text-[22px] max-md:text-[20px]">
                                Stay Updated with
                                <span className="pl-4 text-[#ccc]">CIP68 Generator</span>
                            </h2>
                            <p className="mb-7 mt-4 text-gray-400 max-sm:text-[12px] max-md:mt-1">
                                Be the first to stay updated on the latest releases, exciting new
                                features, and exclusive updates.
                            </p>

                            <Link
                                href="https://github.com/cardano2vn/cip68generator"
                                target="_blank"
                            >
                                <Button className="box-border flex cursor-pointer items-center rounded-[10px] px-6 py-0 text-[16px] font-medium leading-8 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg max-md:text-[14px] max-md:h-[35px] max-md:rounded-[5px] gap-2 ">
                                    <Link
                                        className="flex items-center gap-2"
                                        href={routes.mint.redirect}
                                    >
                                        Mint Now
                                        <ArrowRight />
                                    </Link>
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
