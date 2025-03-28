import { AssetInput, Task } from "@/types";
import { isEmpty } from "lodash";
import { create } from "zustand";

export type MintManyStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  assetInputToMint: AssetInput[];
  setAssetInputToMint: (assetInput: AssetInput[]) => void;
  tasks: Task[];
  resetTasks: () => void;
  updateTaskState: (status: "todo" | "inprogress" | "success" | "error", name?: string, content?: string) => void;
  txhash: string | string[];
  setTxHash: (txhash: string) => void;
};

const useMintManyStore = create<MintManyStore>((set) => ({
  loading: false,
  assetInputToMint: null!,
  txhash: "",
  tasks: [],
  setAssetInputToMint: (assetInput) => set({ assetInputToMint: assetInput }),
  resetTasks: () => set({ tasks: [] }),
  setTxHash: (txhash) =>
    set((state) => ({
      txhash: Array.isArray(state.txhash) ? [...state.txhash, txhash] : [txhash],
    })),
  setLoading: (loading) => set({ loading }),
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

export default useMintManyStore;
