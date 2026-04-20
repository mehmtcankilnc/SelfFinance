import { View, Text, FlatList } from "react-native";
import React, { useMemo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import HomeHeader from "../components/HomeHeader";
import TransactionItem from "../components/TransactionItem";
import { useTransactions } from "../store/useTransactions";
import { useFilter } from "../store/useFilter";
import { useDebounce } from "../hooks/useDebounce";

const ITEM_HEIGHT = wp(20);
const SCREEN_HEIGHT = hp(100);
const ITEMS_PER_SCREEN = Math.ceil(SCREEN_HEIGHT / ITEM_HEIGHT);

export default function HomeScreen() {
  const { transactions } = useTransactions();
  const {
    searchText,
    currentTypeFilter,
    currentCategoryFilter,
    currentDateFilter,
  } = useFilter();

  const debouncedSearchText = useDebounce(searchText, 300);

  const filteredTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Filtering
    const filtered = transactions.filter((transaction) => {
      // Search Text Filtering
      if (debouncedSearchText !== "") {
        const lowerSearchText = searchText.toLowerCase();
        const lowerTitle = transaction.title.toLowerCase();

        if (!lowerTitle.includes(lowerSearchText)) {
          return false;
        }
      }

      // Type Filtering
      if (
        currentTypeFilter !== "all" &&
        transaction.type !== currentTypeFilter
      ) {
        return false;
      }

      // Category Filtering
      if (
        currentCategoryFilter !== "all" &&
        transaction.category.title !== currentCategoryFilter.title
      ) {
        return false;
      }

      // Date Filtering
      if (currentDateFilter !== "all") {
        const txDate = new Date(transaction.date);
        const today = new Date();

        if (currentDateFilter === "today") {
          const isToday =
            txDate.getDate() === today.getDate() &&
            txDate.getMonth() === today.getMonth() &&
            txDate.getFullYear() === today.getFullYear();

          if (!isToday) return false;
        } else if (currentDateFilter === "thisWeek") {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(today.getDate() - 7);

          if (txDate < oneWeekAgo || txDate > today) return false;
        } else if (currentDateFilter === "thisMonth") {
          const isThisMonth =
            txDate.getMonth() === today.getMonth() &&
            txDate.getFullYear() === today.getFullYear();

          if (!isThisMonth) return false;
        }
      }

      return true;
    });

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [
    transactions,
    debouncedSearchText,
    currentTypeFilter,
    currentCategoryFilter,
    currentDateFilter,
  ]);

  return (
    <View className="flex-1 bg-backgroundColor">
      <HomeHeader />
      <View style={{ flex: 1, padding: wp(6), gap: wp(5) }}>
        {filteredTransactions.length > 0 ? (
          <FlatList
            data={filteredTransactions}
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
