import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utilities/storage";
import { ThemeMode } from "../theme/palette";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
