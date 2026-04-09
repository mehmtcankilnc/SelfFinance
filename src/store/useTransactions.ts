import { create } from "zustand";
import { Transaction } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utilities/storage";

interface TransactionsState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  addTransaction: (item: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

export const useTransactions = create<TransactionsState>()(
  persist(
    (set) => ({
      transactions: [],
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      addTransaction: (item) =>
        set((state) => {
          if (item.type === "income") {
            state.totalIncome += Number(item.amount);
          } else {
            state.totalExpense += Number(item.amount);
          }

          state.balance = state.totalIncome - state.totalExpense;

          return { transactions: [...state.transactions, item] };
        }),
      deleteTransaction: (id) =>
        set((state) => {
          let item = state.transactions.find((t) => t.id === id);

          if (item?.type === "income") {
            state.totalIncome -= Number(item.amount);
          } else {
            state.totalExpense -= Number(item?.amount);
          }

          state.balance = state.totalIncome - state.totalExpense;

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
          };
        }),
    }),
    {
      name: "transaction-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
