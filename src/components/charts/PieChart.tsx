import { View, Text } from "react-native";
import React from "react";
import { expenseCategories, incomeCategories } from "../../data/categoryData";

type Props = {
  type: "income" | "expense";
};

export default function PieChart({ type }: Props) {
  const categoryData = type === "income" ? incomeCategories : expenseCategories;

  return <></>;
}
