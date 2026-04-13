import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utilities/storage";

interface ProfileState {
  displayName: string;
  currency: string;
  avatar: number;
  setDisplayName: (name: string) => void;
  setCurrency: (curr: string) => void;
  setAvatar: (id: number) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      displayName: "Guest",
      currency: "USD ($)",
      avatar: 5,
      setDisplayName: (name) => set({ displayName: name }),
      setCurrency: (curr) => set({ currency: curr }),
      setAvatar: (id) => set({ avatar: id }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
