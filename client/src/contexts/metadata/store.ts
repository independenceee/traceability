import { create } from "zustand";
import { FilterType, PMetadata } from "@/types";
import { filterDefault } from "@/constants";

export type MetadataStore = {
  listMetadata: PMetadata[];
  setListMetadata: (media: PMetadata[]) => void;
  listSelected: PMetadata[];
  setListSelected: (media: PMetadata[]) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const useMetadataStore = create<MetadataStore>((set) => ({
  listMetadata: [],
  listSelected: [],
  currentPage: 1,
  totalPages: 0,
  filter: filterDefault,
  setFilter: (filter: FilterType) => set({ filter }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setListMetadata: (media: PMetadata[]) => set({ listMetadata: media }),
  setListSelected: (media: PMetadata[]) => set({ listSelected: media }),
}));

export default useMetadataStore;
