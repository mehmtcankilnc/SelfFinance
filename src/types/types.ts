import { ImageSourcePropType } from "react-native";

export type TransactionType = "expense" | "income";

export interface Transaction {
  id: number;
  type: TransactionType;
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

export interface ProfileColor {
  id: number;
  colorCode: string;
}

export type Category = DropdownItem & {
  colorCode: string;
};

export type TypeFilter = "all" | TransactionType;

export type CategoryFilter = "all" | Category;

export type DateFilter = "all" | "today" | "thisWeek" | "thisMonth";
