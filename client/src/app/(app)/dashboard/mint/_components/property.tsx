import CopyButton from "@/components/copy";

type Props = {
  name: string;
  value: string | null;
};

export default function Property({ name, value }: Props) {
  return (
    <div className="gap-6 p-4 bg-[#030711] rounded-lg">
      <div className="flex items-center justify-between gap-2 self-stretch">
        <div className="font-semibold text-start text-base text-ellipsis overflow-hidden whitespace-nowrap">{name}</div>
        <CopyButton content={value?.toString() || ""} />
      </div>
      <div className="font-medium text-start text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap">{value?.toString()}</div>
    </div>
  );
}
