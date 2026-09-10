import { View, Text, SectionList } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import HomeHeader from "../components/HomeHeader";
import TransactionItem from "../components/TransactionItem";
import { useTransactions } from "../store/useTransactions";
import { useFilter } from "../store/useFilter";
import { useDebounce } from "../hooks/useDebounce";
import { useThemeColors } from "../theme/useThemeColors";
import { groupBySection } from "../utilities/groupTransactions";
import { Transaction } from "../types/types";

const ITEM_HEIGHT = wp(20);
const SCREEN_HEIGHT = hp(100);
const ITEMS_PER_SCREEN = Math.ceil(SCREEN_HEIGHT / ITEM_HEIGHT);

export default function HomeScreen() {
  const { c } = useThemeColors();
  const transactions = useTransactions((state) => state.transactions);
  const {
    searchText,
    currentTypeFilter,
    currentCategoryFilter,
    currentDateFilter,
  } = useFilter();

  const debouncedSearchText = useDebounce(searchText, 300);

  const filteredTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const lowerSearchText = debouncedSearchText.toLowerCase();

    const filtered = transactions.filter((transaction) => {
      if (lowerSearchText !== "") {
        if (!transaction.title.toLowerCase().includes(lowerSearchText)) {
          return false;
        }
      }

      if (
        currentTypeFilter !== "all" &&
        transaction.type !== currentTypeFilter
      ) {
        return false;
      }

      if (
        currentCategoryFilter !== "all" &&
        transaction.category.title !== currentCategoryFilter.title
      ) {
        return false;
      }

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

  const sections = useMemo(
    () => groupBySection(filteredTransactions),
    [filteredTransactions],
  );

  const renderItem = useCallback(
    ({ item }: { item: Transaction }) => <TransactionItem transaction={item} />,
    [],
  );

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      section: {
        title: string;
        month: string;
        showMonth: boolean;
        index: number;
      };
    }) => (
      <View
        style={{
          backgroundColor: c.background,
          paddingTop: section.index === 0 ? wp(1) : wp(7),
          paddingBottom: wp(3),
        }}
      >
        {section.showMonth && (
          <View
            className="flex-row items-center"
            style={{ gap: wp(3), marginBottom: wp(3) }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 17,
                color: c.textPrimary,
              }}
            >
              {section.month}
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: c.separator }} />
          </View>
        )}
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            fontSize: 11,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: c.textTertiary,
          }}
        >
          {section.title}
        </Text>
      </View>
    ),
    [c],
  );

  const keyExtractor = useCallback((item: Transaction) => item.id.toString(), []);

  return (
    <View className="flex-1" style={{ backgroundColor: c.background }}>
      <HomeHeader />
      <View style={{ flex: 1, paddingHorizontal: wp(6) }}>
        {filteredTransactions.length > 0 ? (
          <SectionList
            sections={sections}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: wp(2), paddingBottom: wp(10) }}
            ItemSeparatorComponent={ItemSeparator}
            SectionSeparatorComponent={null}
            initialNumToRender={ITEMS_PER_SCREEN + 2}
            maxToRenderPerBatch={ITEMS_PER_SCREEN}
            windowSize={7}
            updateCellsBatchingPeriod={40}
            removeClippedSubviews
          />
        ) : (
          <View
            className="justify-center items-center"
            style={{ height: hp(55), gap: wp(3) }}
          >
            <Text style={{ fontSize: 64 }}>📭</Text>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 20,
                color: c.textPrimary,
              }}
            >
              No Transactions Yet
            </Text>
            <Text
              className="text-center"
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 12,
                color: c.textTertiary,
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

const ItemSeparator = () => <View style={{ height: wp(5) }} />;
