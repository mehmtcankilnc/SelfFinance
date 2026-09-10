import { create } from "zustand";
import { Transaction } from "../types/types";

export type BottomSheetPropsMap = {
  ADD_SCREEN: { mode?: "edit"; transaction?: Transaction } | undefined;
  EDIT_AVATAR: undefined;
};

export type BottomSheetContentType = keyof BottomSheetPropsMap;

export type Content<T extends BottomSheetContentType = BottomSheetContentType> =
  {
    type: T | null;
    props?: BottomSheetPropsMap[T];
  };

interface BottomSheetState {
  isOpen: boolean;
  content: Content | null;
  openBottomSheet: <T extends BottomSheetContentType>(
    type: T,
    props?: BottomSheetPropsMap[T],
  ) => void;
  closeBottomSheet: () => void;
  clearBottomSheetContent: () => void;
}

export const useBottomSheet = create<BottomSheetState>((set) => ({
  isOpen: false,
  content: null,
  openBottomSheet: (type, props) =>
    set({
      isOpen: true,
      content: { type, props } as Content,
    }),
  closeBottomSheet: () =>
    set({
      isOpen: false,
    }),
  clearBottomSheetContent: () => set({ content: null }),
}));
