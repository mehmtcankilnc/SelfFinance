import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomDropdown from "./CustomDropdown";
import { useFilter } from "../store/useFilter";
import { allCategories } from "../data/categoryData";
import { useThemeColors } from "../theme/useThemeColors";
import { haptics } from "../utilities/haptics";

function Pill({
  label,
  active,
  onPress,
  width,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  width?: number;
}) {
  const { c } = useThemeColors();
  return (
    <Pressable
      onPress={() => {
        if (!active) {
          haptics.selection();
          onPress();
        }
      }}
      className="items-center justify-center rounded-full"
      style={{
        height: hp(4),
        flex: width === undefined ? 1 : undefined,
        width,
        backgroundColor: active ? c.action : c.surfaceAlt,
        borderWidth: active ? 0 : 1,
        borderColor: c.border,
      }}
    >
      <Text
        style={{
          fontFamily: "OpenSans-Regular",
          fontSize: 14,
          color: active ? c.onAction : c.textSecondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function FilterSection() {
  const { c } = useThemeColors();
  const currentTypeFilter = useFilter((state) => state.currentTypeFilter);
  const currentCategoryFilter = useFilter(
    (state) => state.currentCategoryFilter,
  );
  const currentDateFilter = useFilter((state) => state.currentDateFilter);
  const setCurrentTypeFilter = useFilter((state) => state.setCurrentTypeFilter);
  const setCurrentCategoryFilter = useFilter(
    (state) => state.setCurrentCategoryFilter,
  );
  const setCurrentDateFilter = useFilter((state) => state.setCurrentDateFilter);

  const label = {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: c.textSecondary,
  } as const;

  return (
    <>
      {/** Type */}
      <View style={{ gap: wp(1) }}>
        <Text style={label}>Transaction Type</Text>
        <View className="flex-row" style={{ gap: wp(3) }}>
          <Pill
            label="All"
            active={currentTypeFilter === "all"}
            onPress={() => setCurrentTypeFilter("all")}
          />
          <Pill
            label="Expense"
            active={currentTypeFilter === "expense"}
            onPress={() => setCurrentTypeFilter("expense")}
          />
          <Pill
            label="Income"
            active={currentTypeFilter === "income"}
            onPress={() => setCurrentTypeFilter("income")}
          />
        </View>
      </View>
      {/** Category */}
      <View
        style={{
          gap: wp(1),
          position: "relative",
          zIndex: 999,
          elevation: 10,
        }}
      >
        <Text style={label}>Category</Text>
        <CustomDropdown
          dropdownData={allCategories}
          placeholder="Choose a Category"
          selectedTitle={
            currentCategoryFilter === "all"
              ? "All"
              : currentCategoryFilter.title
          }
          onSelect={(cat) =>
            cat.id === 0
              ? setCurrentCategoryFilter("all")
              : setCurrentCategoryFilter(cat)
          }
        />
      </View>
      {/** Date Range */}
      <View style={{ gap: wp(1) }}>
        <Text style={label}>Date Range</Text>
        <View className="flex-row flex-wrap" style={{ gap: wp(3) }}>
          <Pill
            label="All Time"
            width={wp(42)}
            active={currentDateFilter === "all"}
            onPress={() => setCurrentDateFilter("all")}
          />
          <Pill
            label="Today"
            width={wp(42)}
            active={currentDateFilter === "today"}
            onPress={() => setCurrentDateFilter("today")}
          />
          <Pill
            label="This Week"
            width={wp(42)}
            active={currentDateFilter === "thisWeek"}
            onPress={() => setCurrentDateFilter("thisWeek")}
          />
          <Pill
            label="This Month"
            width={wp(42)}
            active={currentDateFilter === "thisMonth"}
            onPress={() => setCurrentDateFilter("thisMonth")}
          />
        </View>
      </View>
    </>
  );
}
