import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { useTransactions } from "../../store/useTransactions";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Category } from "../../types/types";
import Svg, { Circle, G } from "react-native-svg";

type Props = {
  type: "income" | "expense";
};

type PieChartData = {
  category: Category;
  totalAmount: number;
  degree: number;
  startDegree: number;
};

export default function PieChart({ type }: Props) {
  const {
    transactions: allTransactions,
    totalIncome,
    totalExpense,
  } = useTransactions();

  const totalOfSelectedType = type === "expense" ? totalExpense : totalIncome;

  const pieChartData = useMemo<PieChartData[]>(() => {
    const transactionsByType = allTransactions.filter((tr) => tr.type === type);

    const groupedData = transactionsByType.reduce(
      (acc, tr) => {
        const catId = tr.category.id;

        if (!acc[catId]) {
          acc[catId] = { category: tr.category, totalAmount: 0 };
        }

        acc[catId].totalAmount += Number(tr.amount);
        return acc;
      },
      {} as Record<number, { category: Category; totalAmount: number }>,
    );

    let currentDegree = 0;

    return Object.values(groupedData).map((item) => {
      const degree =
        totalOfSelectedType > 0
          ? Number(((360 * item.totalAmount) / totalOfSelectedType).toFixed(1))
          : 0;

      const startDegree = currentDegree;
      currentDegree += degree;

      return {
        category: item.category,
        totalAmount: item.totalAmount,
        degree: degree,
        startDegree: startDegree,
      };
    });
  }, [allTransactions, type, totalOfSelectedType]);

  return (
    <View className="flex-row w-full" style={{ gap: wp(3) }}>
      {/** PieChart's Itself */}
      <View
        className="bg-transparent rounded-full"
        style={{ width: wp(60), height: wp(60) }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <G transform="rotate(-90, 50, 50)">
            {pieChartData.map((data) => {
              const r = 25;
              const circumference = 2 * Math.PI * r;

              const strokeLength = (data.degree / 360) * circumference;

              if (data.degree === 0) return null;

              return (
                <Circle
                  key={data.category.id}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="transparent"
                  stroke={data.category.colorCode}
                  strokeWidth="50"
                  strokeDasharray={`${strokeLength} ${circumference}`}
                  transform={`rotate(${data.startDegree}, 50, 50)`}
                />
              );
            })}
          </G>
        </Svg>
      </View>
      {/** Categories Distrubition */}
      <View
        className="justify-center"
        style={{ width: wp(25), height: wp(60), gap: wp(1) }}
      >
        {pieChartData.map((data) => (
          <View
            key={data.category.id}
            className="flex-row items-center"
            style={{ gap: wp(1) }}
          >
            <View
              className="rounded-sm"
              style={{
                width: wp(4),
                height: wp(4),
                backgroundColor: data.category.colorCode,
              }}
            />
            <Text style={{ fontSize: 10, fontFamily: "OpenSans-Regular" }}>
              {data.category.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
