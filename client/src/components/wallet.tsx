import Image, { StaticImageData } from "next/image";

export default function Wallet({ name, image }: { name: string; image: StaticImageData }) {
    return (
        <div className="flex items-center justify-between w-[332px] h-[70px] py-2 px-[35px] rounded-md text-[18px] relative text-gray-300 border border-gray-400  select-none cursor-pointer">
            <span>{name}</span>
            <Image src={image} className="w-[30px] h-[30px]" alt={name} />
        </div>
    );
}
