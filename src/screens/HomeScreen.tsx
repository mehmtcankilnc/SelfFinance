import { View, Text, FlatList } from "react-native";
import React, { useMemo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import HomeHeader from "../components/HomeHeader";
import TransactionItem from "../components/TransactionItem";
import { useTransactions } from "../store/useTransactions";

const ITEM_HEIGHT = wp(20);
const SCREEN_HEIGHT = hp(100);
const ITEMS_PER_SCREEN = Math.ceil(SCREEN_HEIGHT / ITEM_HEIGHT);

export default function HomeScreen() {
  const { transactions } = useTransactions();

  const orderedTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions]);

  return (
    <View className="flex-1 bg-backgroundColor">
      <HomeHeader />
      <View style={{ flex: 1, padding: wp(6), gap: wp(5) }}>
        {orderedTransactions.length > 0 ? (
          <FlatList
            data={orderedTransactions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: transaction }) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            )}
            contentContainerStyle={{ gap: wp(5) }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={ITEMS_PER_SCREEN + 2}
            windowSize={7}
            maxToRenderPerBatch={ITEMS_PER_SCREEN}
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
