import Image from "next/image";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { appImage } from "@/public/images";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex h-full  flex-col w-full items-center justify-center bg-[#13161b]">
      <div className="mb-2">
        <Image className="animate-pulse" width={260} src={appImage.logo} alt="not-found" />
      </div>
      <div className="text-2xl font-bold">404 - Page not found</div>
      <div className="text-base text-[#8e97a8]">The page you are looking for does not exist</div>
      <Link
        href={routes.landing.redirect}
        className="mt-3 h-10 rounded-md flex items-center justify-center px-6 text-sm font-medium text-white bg-gradient-to-r from-[#ffb444] to-[#eb6f3a]"
      >
        Back to Home
      </Link>
    </div>
  );
}
