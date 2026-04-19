import { useContext } from "react";
import { DropdownContext } from "../providers/DropdownProvider";

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdown hook'u DropdownProvider içerisinde kullanılmalıdır!",
    );
  }
  return context;
};
