"use client";
import Link from "next/link";
import Image from "next/image";
import images from "~/public/images";
import { routes } from "~/constants/routes";
import { SocialIcon } from "react-social-icons";
import { networks } from "~/constants/networks";
import Network from "~/components/network";
import wallets from "~/constants/wallets";
import Wallet from "~/components/wallet";
import { WalletType } from "~/types";

export default function SignInPage() {
    return (
        <div className="h-screen">
            <div className="mx-auto my-0 flex h-full w-full max-w-[1200px] flex-col">
                <header className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex h-[60px] w-[150px] items-center justify-center">
                        <Link
                            className="relative flex items-center justify-center gap-2"
                            href={routes.landing.redirect}
                        >
                            <Image
                                className="h-[35px] w-[35px] object-cover"
                                src={images.logo}
                                alt="Logo"
                            />
                            <span className="text-2xl">Traceability</span>
                        </Link>
                    </div>
                    <ul className="flex items-center justify-center gap-7">
                        <Link href={""}>
                            <SocialIcon style={{ width: 36, height: 36 }} network="telegram" />
                        </Link>
                        <Link href={""}>
                            <SocialIcon style={{ width: 36, height: 36 }} network="discord" />
                        </Link>
                        <Link href={""}>
                            <SocialIcon style={{ width: 36, height: 36 }} network="github" />
                        </Link>
                        <Link href={""}>
                            <SocialIcon style={{ width: 36, height: 36 }} network="x" />
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
                                <strong>Preprod</strong>
                            </div>
                        </div>

                        <div className="flex mt-5">
                            <section className="pr-[30px] border-r-[1px] flex flex-col gap-5 border-solid border-gray-500 mr-[30px] h-[230px] overflow-y-auto overflow-x-hidden">
                                {networks.map(({ image, name }, index: number) => {
                                    return <Network image={image} name={name} key={index} />;
                                })}
                            </section>
                            <section className="overflow-x-hidden overflow-y-auto pr-[20px] mr-[-20px] h-[230px] flex flex-col gap-2 ">
                                {wallets.map(({ name, image }: WalletType, index: number) => {
                                    return <Wallet name={name} image={image} key={index} />;
                                })}
                            </section>
                        </div>
                    </section>

                    <section className="mt-[20px] ">
                        <div className="flex items-center justify-center  text-center ">
                            <p>Web2 Login Powered by Particle Network</p>
                        </div>
                        <div className="flex items-center justify-center  text-center gap-6 my-[20px]">
                            <Link href={""}>
                                <SocialIcon style={{ width: 36, height: 36 }} network="x" />
                            </Link>
                            <Link href={""}>
                                <SocialIcon style={{ width: 36, height: 36 }} network="github" />
                            </Link>
                        </div>
                    </section>
                </main>

                <footer className="pb-[20px] text-center">
                    <Link className="underline-offset-2 underline" href={""} target="_blake">
                        Help Center
                    </Link>
                    <p className="mt-[16px] text-gray-400">
                        Traceability Network Foundation Independence
                    </p>
                </footer>
            </div>
        </div>
    );
}
