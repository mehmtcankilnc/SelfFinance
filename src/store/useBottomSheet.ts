import { create } from "zustand";

export type BottomSheetContentType = "ADD_SCREEN" | "EDIT_AVATAR";

interface BottomSheetState {
  isOpen: boolean;
  content: {
    type: BottomSheetContentType | null;
    props?: any;
  } | null;
  openBottomSheet: (type: BottomSheetContentType, props?: any) => void;
  closeBottomSheet: () => void;
  clearBottomSheetContent: () => void;
}

export const useBottomSheet = create<BottomSheetState>((set) => ({
  isOpen: false,
  content: null,
  openBottomSheet: (type, props = {}) =>
    set({
      isOpen: true,
      content: { type, props },
    }),
  closeBottomSheet: () =>
    set({
      isOpen: false,
    }),
  clearBottomSheetContent: () => set({ content: null }),
}));
