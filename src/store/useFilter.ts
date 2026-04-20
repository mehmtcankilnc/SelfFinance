import { create } from "zustand";
import { CategoryFilter, DateFilter, TypeFilter } from "../types/types";

interface FilterState {
  currentTypeFilter: TypeFilter;
  currentCategoryFilter: CategoryFilter;
  currentDateFilter: DateFilter;
  setCurrentTypeFilter: (type: TypeFilter) => void;
  setCurrentCategoryFilter: (cat: CategoryFilter) => void;
  setCurrentDateFilter: (date: DateFilter) => void;
}

export const useFilter = create<FilterState>((set) => ({
  currentTypeFilter: "all",
  currentCategoryFilter: "all",
  currentDateFilter: "all",
  setCurrentTypeFilter: (type) => set({ currentTypeFilter: type }),
  setCurrentCategoryFilter: (cat) => set({ currentCategoryFilter: cat }),
  setCurrentDateFilter: (date) => set({ currentDateFilter: date }),
}));
