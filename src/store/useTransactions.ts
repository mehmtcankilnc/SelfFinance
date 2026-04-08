import { create } from "zustand";
import { Transaction } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utilities/storage";

interface TransactionsState {
  transactions: Transaction[];
  addTransaction: (item: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

export const useTransactions = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      addTransaction: (item) =>
        set((state) => ({ transactions: [...state.transactions, item] })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "transaction-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
