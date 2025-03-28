type Props = {
  title: string;
  value?: number;
};
export default function StatisticItem({ title, value }: Props) {
  return (
    <div className="min-w-[160px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:w-[50%] max-md:h-[88px] max-md:mb-[16px] max-md:bg-slate-900 max-md-relative">
      <p className="mb-[10px] text-[42px] font-normal leading-[50px] text-[#fff] max-md:text-[20px] max-md:leading-[24px] max-md:mt-[10px]">
        {value}
      </p>
      <span className="block text-[16px] leading-[20px] max-md:mt-[3px] max-md:leading-1 max-md:text-[12px]">{title}</span>
    </div>
  );
}
