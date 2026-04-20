import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "../utilities/storage";

interface ProfileState {
  displayName: string;
  currency: string;
  avatar: number;
  profileColor: string;
  setDisplayName: (name: string) => void;
  setCurrency: (curr: string) => void;
  setAvatar: (id: number) => void;
  setProfileColor: (color: string) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      displayName: "Guest",
      currency: "USD ($)",
      avatar: 5,
      profileColor: "#8B9DF0",
      setDisplayName: (name) => set({ displayName: name }),
      setCurrency: (curr) => set({ currency: curr }),
      setAvatar: (id) => set({ avatar: id }),
      setProfileColor: (color) => set({ profileColor: color }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
