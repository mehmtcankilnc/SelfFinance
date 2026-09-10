import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../store/useProfile";
import { avatarData } from "../data/profileData";
import { useTransactions } from "../store/useTransactions";
import PieChart from "../components/charts/PieChart";
import AnimatedSegmentedButtons from "../components/AnimatedSegmentedButtons";
import { useThemeColors } from "../theme/useThemeColors";

export default function AnalyticsScreen() {
  const navigation = useNavigation();
  const { c } = useThemeColors();
  const { avatar, currency, profileColor } = useProfile();
  const { totalIncome, totalExpense, balance } = useTransactions();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const stats = [
    {
      label: "Income",
      value: totalIncome,
      color: c.success,
      bg: c.successBg,
      icon: <SmoothIcon name="arrow-ascending" size={32} color={c.success} />,
    },
    {
      label: "Expense",
      value: totalExpense,
      color: c.danger,
      bg: c.dangerBg,
      icon: <SmoothIcon name="arrow-descending" size={32} color={c.danger} />,
    },
    {
      label: "Balance",
      value: balance,
      color: c.action,
      bg: c.actionSoft,
      icon: <Text style={{ color: c.action, fontSize: 20 }}>$</Text>,
    },
  ];

  return (
    <View className="flex-1" style={{ backgroundColor: c.background }}>
      {/** Header */}
      <View
        className="flex-row justify-between items-center rounded-b-2xl"
        style={{
          height: hp(15),
          padding: wp(6),
          gap: wp(5),
          backgroundColor: c.headerBg,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 24,
              lineHeight: 36,
              color: "#D8D8D8",
            }}
          >
            Analytics
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 16,
              color: "#D8D8D8",
              maxWidth: wp(65),
            }}
          >
            The coolest way to analyze{"\n"}transactions 👌
          </Text>
        </View>
        {/** Avatar */}
        <Pressable
          onPress={() => navigation.getParent()?.navigate("Profile")}
          className="items-center justify-center"
          style={{
            width: wp(16),
            height: wp(16),
            borderRadius: wp(6),
            backgroundColor: profileColor,
          }}
        >
          <Image
            source={avatarData.find((av) => av.id === avatar)?.image}
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      {/** Statistics */}
      <View className="flex-row" style={{ gap: wp(3), padding: wp(6) }}>
        {stats.map((s) => (
          <View
            key={s.label}
            className="flex-1 rounded-2xl"
            style={{ padding: wp(3), gap: wp(1), backgroundColor: c.surface }}
          >
            <View
              className="items-center justify-center rounded-full"
              style={{ width: 40, height: 40, backgroundColor: s.bg }}
            >
              {s.icon}
            </View>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 12,
                color: c.textSecondary,
              }}
            >
              {s.label}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: s.color,
              }}
            >
              {s.value} {currency.slice(5, 6)}
            </Text>
          </View>
        ))}
      </View>
      {/** Charts */}
      <View className="flex-1" style={{ paddingHorizontal: wp(6), gap: wp(3) }}>
        <AnimatedSegmentedButtons
          titles={["Income", "Expense"]}
          onChange={(index) =>
            index !== selectedIndex && setSelectedIndex(index)
          }
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: wp(8), gap: wp(3) }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <View
            className="rounded-2xl"
            style={{ padding: wp(3), gap: wp(3), backgroundColor: c.surface }}
          >
            <PieChart type={selectedIndex === 0 ? "income" : "expense"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
