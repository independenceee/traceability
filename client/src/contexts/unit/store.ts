import { Task } from "@/types";
import { isEmpty } from "lodash";
import { create } from "zustand";

export type UnitStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  metadataToUpdate: Record<string, string> | null;
  setMetadataToUpdate: (metadata: Record<string, string>) => void;
  quantityToBurn: number;
  setQuantityToBurn: (data: { quantity: number }) => void;
  tasks: Task[];
  resetTasks: () => void;
  updateTaskState: (status: "todo" | "inprogress" | "success" | "error", name?: string, content?: string) => void;
  txhash: string;
  setTxHash: (txhash: string) => void;
  txCurrentPage: number;
  txTotalPages: number;
  setTxCurrentPage: (page: number) => void;
};

const useUnitStore = create<UnitStore>((set) => ({
  loading: false,
  metadataToUpdate: null,
  txhash: "",
  tasks: [],
  resetTasks: () => set({ tasks: [] }),
  txCurrentPage: 1,
  txTotalPages: 1,
  quantityToBurn: 1,
  setQuantityToBurn: (data) => set({ quantityToBurn: data.quantity }),
  setTxCurrentPage: (page) => set({ txCurrentPage: page }),
  setTxHash: (txhash) => set({ txhash }),
  setLoading: (loading) => set({ loading }),
  setMetadataToUpdate: (metadata) => set({ metadataToUpdate: metadata }),
  updateTaskState: (status, name = "", content = "") => {
    set((state) => {
      const tasks = [...state.tasks];
      if (status === "error" || isEmpty(name)) {
        const lastTaskIndex = tasks.length - 1;
        if (lastTaskIndex >= 0) {
          tasks[lastTaskIndex] = {
            ...tasks[lastTaskIndex],
            status,
          };
        }
      } else {
        const taskIndex = tasks.findIndex((task) => task.name === name);
        if (taskIndex < 0) {
          if (tasks.length !== 0) {
            const lastTaskIndex = tasks.length - 1;
            tasks[lastTaskIndex] = {
              ...tasks[lastTaskIndex],
              status: "success",
            };
          }
          tasks.push({ name, content, status });
        } else {
          if (taskIndex > 0) {
            tasks[taskIndex - 1] = {
              ...tasks[taskIndex - 1],
              status: "success",
            };
          }
          if (isEmpty(content)) {
            tasks[taskIndex] = { ...tasks[taskIndex], status };
          } else {
            tasks[taskIndex] = { ...tasks[taskIndex], status, content };
          }
        }
      }

      return { tasks };
    });
  },
}));

export default useUnitStore;
