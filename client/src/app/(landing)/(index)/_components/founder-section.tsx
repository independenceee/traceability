import { FounderData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn as LinkedinIcon, FaTelegram } from "react-icons/fa";
import { isEmpty } from "lodash";

const Founder = function ({ data }: { data: FounderData }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl bg-slate-900 p-7 transition-all duration-300 ease-in-out">
      <div className="bg-[rgba(0, 0, 0, 0.08)] relative h-[150px] w-[150px] overflow-hidden rounded-full transition-all duration-500">
        <Image
          className="absolute inset-0 h-full w-full object-cover text-transparent transition-all duration-500 ease-in-out hover:scale-150"
          src={data.avatar}
          fill
          alt="Avatar"
        />
        <div className="absolute bottom-0 left-0 right-0 flex h-12 justify-center gap-4 transition-all duration-500">
          {!isEmpty(data.telegram) && (
            <Link
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white"
              target="_blank"
              href={data.telegram}
            >
              <FaTelegram />
            </Link>
          )}
          {!isEmpty(data.linkedin) && (
            <Link
              className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(0,0,0,0.4)] text-[16px] text-white"
              target="_blank"
              href={data.linkedin}
            >
              {" "}
              <LinkedinIcon />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="text-center text-[16px] font-medium leading-[120%] text-white">{data.firstName + " " + data.lastName}</div>
        <div className="text-center text-[13px] font-medium leading-[120%] text-white">{data.role}</div>
        <div className="text-center text-[10px] font-normal leading-[120%] text-white">{data.description}</div>
      </div>
    </div>
  );
};

export default Founder;
