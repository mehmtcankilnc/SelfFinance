import { useContext } from "react";
import { DropdownContext } from "../providers/DropdownProvider";

export const useDropdown = () => useContext(DropdownContext);
