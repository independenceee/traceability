import { appImage } from "@/public/images";
import { LucideIcon, LucideProps } from "lucide-react";
import Image from "next/image";
export type Icon = LucideIcon;
export const Images = {
  logo: (props: LucideProps) => <Image src={appImage.logo} className={props.className} alt="Logo" />,
  document: (props: LucideProps) => <Image src={appImage.document} className={props.className} alt="Logo" />,
  certification: (props: LucideProps) => <Image src={appImage.certification} className={props.className} alt="Logo" />,
  warehouse: (props: LucideProps) => <Image src={appImage.warehouse} className={props.className} alt="Logo" />,
  process: (props: LucideProps) => <Image src={appImage.process} className={props.className} alt="Logo" />,
  feedback: (props: LucideProps) => <Image src={appImage.feedback} className={props.className} alt="Logo" />,
  metadata: (props: LucideProps) => <Image src={appImage.metadata} className={props.className} alt="metadata" />,
  marketplace: (props: LucideProps) => <Image src={appImage.marketplace} className={props.className} alt="metadata" />,
  collection: (props: LucideProps) => <Image src={appImage.collection} className={props.className} alt="Collection" />,
  fastCollection: (props: LucideProps) => <Image src={appImage.fastCollection} className={props.className} alt="Fast Collection" />,
  api: (props: LucideProps) => <Image src={appImage.api} className={props.className} alt="API" />,
  storegae: (props: LucideProps) => <Image src={appImage.storegae} className={props.className} alt="metadata" />,
  mintOne: (props: LucideProps) => <Image src={appImage.mintOne} className={props.className} alt="metadata" />,
  mintMany: (props: LucideProps) => <Image src={appImage.mintMany} className={props.className} alt="mintMany" />,
  startFromScratch: (props: LucideProps) => <Image src={appImage.startFromCratch} className={props.className} alt="Start from Scratch" />,
};
