import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import HomeHeader from "../components/HomeHeader";
import { Transaction } from "../types/types";
import TransactionItem from "../components/TransactionItem";

const dummyData: Transaction[] = [
  {
    type: "expense",
    title: "Youtube Premium",
    category: "Subscription",
    date: "March 12",
    amount: "54,99",
  },
  {
    type: "income",
    title: "Income",
    category: "Payment",
    date: "March 12",
    amount: "54,99",
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-backgroundColor">
      <HomeHeader />
      <View style={{ padding: wp(6), gap: wp(5) }}>
        {dummyData.length > 0 ? (
          Array.from(dummyData, (transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))
        ) : (
          <View
            className="justify-center items-center"
            style={{ height: hp(55), gap: wp(3) }}
          >
            <Text style={{ fontSize: 64 }}>📭</Text>
            <Text
              className="text-textColor"
              style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}
            >
              No Transactions Yet
            </Text>
            <Text
              className="text-center"
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 12,
                color: "#9CA3AF",
              }}
            >
              Your transaction history is empty. Tap the button below to add
              your first transaction!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
