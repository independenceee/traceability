import { create } from "zustand";
export type UploadCsvStore = {
  csvContent: string[][];
  csvName: string;
  setCsvContent: (input: { name: string; data: string[][] }) => void;
};

const useUploadCsvStore = create<UploadCsvStore>((set) => ({
  csvContent: null!,
  csvName: null!,
  setCsvContent: ({ name, data }: { name: string; data: string[][] }) => set({ csvContent: data, csvName: name }),
}));

export default useUploadCsvStore;
