import Image, { StaticImageData } from "next/image";

export default function Network({ image, name }: { image: StaticImageData; name: string }) {
    return (
        <div className="flex items-center justify-center flex-col w-[52px] h-[52px] text-[10px] cursor-pointer rounded-[5px] hover:bg-slate-500 p-3">
            <Image src={image} alt="Network" className="w-[32px] h-[32px] rounded-full" />
            <span>{name}</span>
        </div>
    );
}
