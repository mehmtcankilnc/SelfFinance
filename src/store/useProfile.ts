import { create } from "zustand";
import { DropdownItem } from "../types/types";
import { ImageSourcePropType } from "react-native";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { storage } from "../utilities/storage";

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};

interface ProfileState {
  displayName: string;
  currency: DropdownItem;
  avatar: number;
  setDisplayName: (name: string) => void;
  setCurrency: (curr: DropdownItem) => void;
  setAvatar: (id: number) => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      displayName: "Guest",
      currency: { value: 1, text: "USD ($)" },
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
