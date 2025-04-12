import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator({
  code,
  title = "Scan the QR Code",
  slogan = "Use your mobile app to scan this QR code and proceed with the action.",
  description = "Supply Chain Traceability Generator: Simplifying Asset Management on Blockchain, Open-Source Transparency for Supply Chains, Simplify Blockchain-Based Supply Chain Tracking.",
}: {
  code: string;
  title?: string;
  slogan?: string;
  description?: string;
}) {
  return (
    <section className="px-0 mt-[100px]">
      <aside className="mx-auto my-0 flex w-full max-w-[1200px] flex-col gap-2">
        <div className="flex w-full gap-7 max-sm:flex-col">
          <div className='flex items-center justify-center relative aspect-video w-[60%] rounded-3xl before:absolute before:left-8 before:top-8 before:h-full before:w-full before:rounded-3xl before:bg-slate-900 before:shadow-xl before:content-[""] max-sm:w-full'>
            <QRCodeCanvas
              className="absolute right-[50%] translate-x-[50%] inset-0 z-10 block h-full w-full rounded-xl"
              value={code}
              size={400}
              fgColor="#000000"
              bgColor="#ffffff"
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="z-10 flex w-[40%] flex-col items-start gap-[15px] max-md:gap-3 max-sm:w-full">
            <h2 className="text-left text-[25px]  font-bold max-md:text-xl">{title}</h2>
            <p className="mb-1 text-[20px] font-normal max-md:text-lg">{slogan}</p>
            <span className={"text-left leading-[1.8] max-md:text-base"}>{description}</span>
            {/* <Link href="https://cips.cardano.org/cip/CIP-68" target="_blank">
              <Button className={"w-full px-8 py-6"}>Learn More Traceability</Button>
            </Link> */}
          </div>
        </div>
      </aside>
    </section>
  );
}
