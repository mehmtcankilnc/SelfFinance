import { View, Text, FlatList } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import HomeHeader from "../components/HomeHeader";
import TransactionItem from "../components/TransactionItem";
import { useTransactions } from "../store/useTransactions";

export default function HomeScreen() {
  const { transactions } = useTransactions();

  return (
    <View className="flex-1 bg-backgroundColor">
      <HomeHeader />
      <View style={{ flex: 1, padding: wp(6), gap: wp(5) }}>
        {transactions.length > 0 ? (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: transaction }) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            )}
            contentContainerStyle={{ gap: wp(5) }}
            showsVerticalScrollIndicator={false}
          />
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
