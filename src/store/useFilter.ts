import { create } from "zustand";
import { CategoryFilter, DateFilter, TypeFilter } from "../types/types";

interface FilterState {
  searchText: string;
  currentTypeFilter: TypeFilter;
  currentCategoryFilter: CategoryFilter;
  currentDateFilter: DateFilter;
  setSearchText: (text: string) => void;
  setCurrentTypeFilter: (type: TypeFilter) => void;
  setCurrentCategoryFilter: (cat: CategoryFilter) => void;
  setCurrentDateFilter: (date: DateFilter) => void;
}

export const useFilter = create<FilterState>((set) => ({
  searchText: "",
  currentTypeFilter: "all",
  currentCategoryFilter: "all",
  currentDateFilter: "all",
  setSearchText: (text) => set({ searchText: text }),
  setCurrentTypeFilter: (type) => set({ currentTypeFilter: type }),
  setCurrentCategoryFilter: (cat) => set({ currentCategoryFilter: cat }),
  setCurrentDateFilter: (date) => set({ currentDateFilter: date }),
}));
