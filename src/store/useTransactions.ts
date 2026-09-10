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
  editTransaction: (item: Transaction) => void;
  deleteTransaction: (id: number) => void;
  clearTransactions: () => void;
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
      editTransaction: (item) =>
        set((state) => {
          const previous = state.transactions.find((t) => t.id === item.id);
          if (!previous) return {};

          // Roll back the old contribution.
          if (previous.type === "income") {
            state.totalIncome -= Number(previous.amount);
          } else {
            state.totalExpense -= Number(previous.amount);
          }

          // Apply the new contribution.
          if (item.type === "income") {
            state.totalIncome += Number(item.amount);
          } else {
            state.totalExpense += Number(item.amount);
          }

          state.balance = state.totalIncome - state.totalExpense;

          return {
            transactions: state.transactions.map((t) =>
              t.id === item.id ? item : t,
            ),
          };
        }),
      deleteTransaction: (id) =>
        set((state) => {
          const item = state.transactions.find((t) => t.id === id);
          if (!item) return {};

          if (item.type === "income") {
            state.totalIncome -= Number(item.amount);
          } else if (item.type === "expense") {
            state.totalExpense -= Number(item.amount);
          }

          state.balance = state.totalIncome - state.totalExpense;

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
          };
        }),
      clearTransactions: () =>
        set({
          transactions: [],
          totalIncome: 0,
          totalExpense: 0,
          balance: 0,
        }),
    }),
    {
      name: "transaction-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
