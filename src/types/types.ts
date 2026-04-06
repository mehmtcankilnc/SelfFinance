export interface Transaction {
  id: number;
  type: "expense" | "income";
  title: string;
  category: string;
  date: string;
  amount: string;
}

export interface DropdownItem {
  text: string;
  value: number;
}
