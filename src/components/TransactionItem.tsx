import { View, Text } from "react-native";
import React from "react";
import { Transaction } from "../types/types";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import { useProfile } from "../store/useProfile";

type Props = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: Props) {
  const isExpense = transaction.type === "expense";
  const { currency } = useProfile();

  return (
    <View
      className="w-full flex-row items-center justify-between bg-white rounded-3xl"
      style={{ padding: wp(5), gap: wp(2) }}
    >
      <View className="flex-1 flex-row items-center" style={{ gap: wp(2) }}>
        <View
          className="rounded-full"
          style={{
            backgroundColor: isExpense ? "#FCEAEA" : "#E8F8F3",
            padding: wp(2),
          }}
        >
          <SmoothIcon
            name={isExpense ? "expense" : "income"}
            size={24}
            color={isExpense ? "#DC2626" : "#10B981"}
          />
        </View>
        <View>
          <Text
            className="text-textColor"
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 14,
              width: wp(40),
            }}
            numberOfLines={1}
          >
            {transaction.title}
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 10,
              color: transaction.category.colorCode,
            }}
          >
            {`${transaction.category.title} • `}
            <Text style={{ color: "#9CA3AF" }}>
              {new Date(transaction.date).toLocaleDateString("tr-TR")}
            </Text>
          </Text>
        </View>
      </View>
      <Text
        style={{
          textAlign: "right",
          color: isExpense ? "#DC2626" : "#10B981",
          fontFamily: "Poppins-SemiBold",
          fontSize: 16,
          width: wp(20),
        }}
        numberOfLines={1}
      >
        {isExpense ? "-" : "+"}
        {transaction.amount} {currency.slice(5, 6)}
      </Text>
    </View>
  );
}
