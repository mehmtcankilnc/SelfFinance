export interface Transaction {
  type: "expense" | "income";
  title: string;
  category: string;
  date: string;
  amount: string;
}
