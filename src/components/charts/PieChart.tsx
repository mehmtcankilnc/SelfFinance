import { View, Text, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import { useTransactions } from "../../store/useTransactions";
import { useProfile } from "../../store/useProfile";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Category, TransactionType } from "../../types/types";
import Svg, { Circle, G } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SmoothIcon from "smooth-icon";
import { useThemeColors } from "../../theme/useThemeColors";
import { haptics } from "../../utilities/haptics";

type Props = {
  type: TransactionType;
};

type PieChartData = {
  category: Category;
  totalAmount: number;
  percentage: number;
  degree: number;
  startDegree: number;
};

export default function PieChart({ type }: Props) {
  const { c } = useThemeColors();
  const allTransactions = useTransactions((state) => state.transactions);
  const totalIncome = useTransactions((state) => state.totalIncome);
  const totalExpense = useTransactions((state) => state.totalExpense);
  const currency = useProfile((state) => state?.currency ?? "USD ($)");
  const symbol = currency.slice(5, 6);

  const totalOfSelectedType = type === "expense" ? totalExpense : totalIncome;

  const [detailsOpen, setDetailsOpen] = useState(false);
  const contentHeight = useSharedValue(0);
  const progress = useSharedValue(0);

  const rAccordion = useAnimatedStyle(() => ({
    height: contentHeight.value * progress.value,
    opacity: progress.value,
  }));

  const rChevron = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
  }));

  const toggleDetails = () => {
    haptics.selection();
    const next = !detailsOpen;
    setDetailsOpen(next);
    progress.value = withTiming(next ? 1 : 0, { duration: 260 });
  };

  const pieChartData = useMemo<PieChartData[] | null>(() => {
    const transactionsByType = allTransactions.filter((tr) => tr.type === type);

    if (transactionsByType.length <= 0) return null;

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

    return Object.values(groupedData)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .map((item) => {
        const ratio =
          totalOfSelectedType > 0 ? item.totalAmount / totalOfSelectedType : 0;
        const degree = Number((360 * ratio).toFixed(1));

        const startDegree = currentDegree;
        currentDegree += degree;

        return {
          category: item.category,
          totalAmount: item.totalAmount,
          percentage: Number((ratio * 100).toFixed(1)),
          degree,
          startDegree,
        };
      });
  }, [allTransactions, type, totalOfSelectedType]);

  if (pieChartData === null) {
    return (
      <View className="justify-center items-center" style={{ gap: wp(3) }}>
        <Text style={{ fontSize: 64 }}>📊</Text>
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 20,
            color: c.textPrimary,
          }}
        >
          No Data Yet
        </Text>
        <Text
          className="text-center"
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 12,
            color: c.textTertiary,
          }}
        >
          Add some transactions to see your financial insights and charts!
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full" style={{ gap: wp(3) }}>
      <View className="flex-row items-center w-full" style={{ gap: wp(4) }}>
        {/** PieChart itself */}
        <View
          className="rounded-full"
          style={{ width: wp(48), height: wp(48) }}
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

        {/** Simple legend: colour + name */}
        <View className="flex-1" style={{ gap: wp(2) }}>
          {pieChartData.map((data) => (
            <View
              key={data.category.id}
              className="flex-row items-center"
              style={{ gap: wp(2) }}
            >
              <View
                className="rounded-sm"
                style={{
                  width: wp(3.5),
                  height: wp(3.5),
                  backgroundColor: data.category.colorCode,
                }}
              />
              <Text
                numberOfLines={1}
                className="flex-1"
                style={{
                  fontSize: 12,
                  fontFamily: "OpenSans-Regular",
                  color: c.textPrimary,
                }}
              >
                {data.category.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/** Details toggle + accordion (own block so the outer gap doesn't
           add empty space under the button while collapsed) */}
      <View>
        <Pressable
          onPress={toggleDetails}
          className="flex-row items-center justify-center"
          style={{
            gap: wp(1.5),
            paddingVertical: wp(2),
            borderTopWidth: 1,
            borderTopColor: c.separator,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.action,
            }}
          >
            {detailsOpen ? "Hide details" : "Show details"}
          </Text>
          <Animated.View style={rChevron}>
            <SmoothIcon name="chevron-down" size={16} color={c.action} />
          </Animated.View>
        </Pressable>

        <Animated.View style={[{ overflow: "hidden" }, rAccordion]}>
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              paddingBottom: wp(1),
              gap: wp(2.5),
            }}
            onLayout={(e) => {
              contentHeight.value = e.nativeEvent.layout.height;
            }}
          >
          {pieChartData.map((data) => (
            <View
              key={data.category.id}
              className="flex-row items-center"
              style={{ gap: wp(3) }}
            >
              <View
                className="rounded-full"
                style={{
                  width: wp(3),
                  height: wp(3),
                  backgroundColor: data.category.colorCode,
                }}
              />
              <Text
                numberOfLines={1}
                className="flex-1"
                style={{
                  fontSize: 13,
                  fontFamily: "OpenSans-Regular",
                  color: c.textPrimary,
                }}
              >
                {data.category.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Poppins-SemiBold",
                  color: c.textPrimary,
                }}
              >
                {data.percentage}%
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "OpenSans-Regular",
                  color: c.textTertiary,
                  minWidth: wp(16),
                  textAlign: "right",
                }}
              >
                {data.totalAmount} {symbol}
              </Text>
            </View>
          ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
