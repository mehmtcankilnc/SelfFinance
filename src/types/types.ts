import { ImageSourcePropType } from "react-native";

export interface Transaction {
  id: number;
  type: "expense" | "income";
  title: string;
  category: Category;
  date: Date;
  amount: string;
}

export interface DropdownItem {
  title: string;
  id: number;
}

export interface Avatar {
  id: number;
  image: ImageSourcePropType;
}

export type Category = DropdownItem & {
  colorCode: string;
};
