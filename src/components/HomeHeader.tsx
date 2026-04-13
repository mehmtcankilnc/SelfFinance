import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "./SearchBar";
import { SmoothIcon } from "smooth-icon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import CustomDropdown from "./CustomDropdown";
import { DropdownItem } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../store/useProfile";
import { avatarData } from "../data/avatarData";

const HEIGHT_VALUE = hp(35);

export default function HomeHeader() {
  const navigation = useNavigation();
  const { avatar, displayName } = useProfile();

  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);

  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  const borderRadius = useSharedValue(16);

  const handleToggleFilterSection = () => {
    if (progress.value == 0) {
      height.value = withTiming(HEIGHT_VALUE, { duration: 300 });
      borderRadius.value = withTiming(0, { duration: 200 });
      progress.value = 1;
      setIsFilterSectionOpen(true);
    } else {
      height.value = withTiming(0, { duration: 300 }, (isFinished) => {
        if (isFinished) {
          progress.value = 0;
        }
      });
      borderRadius.value = withDelay(300, withTiming(16, { duration: 200 }));
      setIsFilterSectionOpen(false);
    }
  };

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: height.value,
      display: progress.value === 1 ? "flex" : "none",
    };
  });

  const animatedBorderRadius = useAnimatedStyle(() => {
    return {
      borderBottomRightRadius: borderRadius.value,
      borderBottomLeftRadius: borderRadius.value,
    };
  });

  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterDateRange, setFilterDateRange] = useState<
    "all" | "today" | "weekly" | "monthly"
  >("all");

  return (
    <>
      <Animated.View
        className="bg-headerBg"
        style={[
          { height: hp(25), padding: wp(6), gap: wp(5) },
          animatedBorderRadius,
        ]}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                lineHeight: 36,
                color: "#D8D8D8",
                maxWidth: wp(70),
              }}
              numberOfLines={1}
            >
              Hey, {displayName}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                color: "#D8D8D8",
                maxWidth: wp(65),
              }}
            >
              Welcome back, your calculations are still perfect 👌
            </Text>
          </View>
          {/** Avatar */}
          <Pressable
            onPress={() => navigation.getParent()?.navigate("Profile")}
            className="bg-[#79A8FF] items-center justify-center"
            style={{ width: wp(16), height: wp(16), borderRadius: wp(6) }}
          >
            <Image
              source={avatarData.find((av) => av.id === avatar)?.image}
              style={{ width: wp(12), height: wp(12) }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between">
          <SearchBar />
          <Pressable
            onPress={handleToggleFilterSection}
            className="bg-action rounded-xl"
            style={{ padding: wp(2) }}
          >
            <SmoothIcon
              name={isFilterSectionOpen ? "close" : "filter"}
              size={24}
              color={"#FFFFFF"}
            />
          </Pressable>
        </View>
      </Animated.View>
      {/** Filters Section */}
      <Animated.View
        style={[
          {
            backgroundColor: "white",
            width: "100%",
            elevation: 3,
            paddingHorizontal: wp(6),
            gap: wp(3),
            paddingTop: wp(2),
          },
          animatedHeight,
        ]}
      >
        {/** Type */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Transaction Type
          </Text>
          <View className="flex-row" style={{ gap: wp(3) }}>
            {/** All */}
            <Pressable
              onPress={() => filterType !== "all" && setFilterType("all")}
              className="flex-1 items-center justify-center rounded-full"
              style={{
                height: hp(4),
                backgroundColor: filterType === "all" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterType === "all" ? "#FFFFFF" : "#4B5563",
                }}
              >
                All
              </Text>
            </Pressable>
            {/** Expense */}
            <Pressable
              onPress={() =>
                filterType !== "expense" && setFilterType("expense")
              }
              className="flex-1 items-center justify-center rounded-full"
              style={{
                height: hp(4),
                backgroundColor:
                  filterType === "expense" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterType === "expense" ? "#FFFFFF" : "#4B5563",
                }}
              >
                Expense
              </Text>
            </Pressable>
            {/** Income */}
            <Pressable
              onPress={() => filterType !== "income" && setFilterType("income")}
              className="flex-1 items-center justify-center rounded-full"
              style={{
                height: hp(4),
                backgroundColor:
                  filterType === "income" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterType === "income" ? "#FFFFFF" : "#4B5563",
                }}
              >
                Income
              </Text>
            </Pressable>
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
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Category
          </Text>
          <CustomDropdown
            dropdownData={[
              { title: "All Categories", id: 1 },
              { title: "deneme", id: 2 },
              { title: "deneme2", id: 3 },
            ]}
            placeholder="Choose a Category"
            selectedTitle={filterCategory}
            onSelect={(cat) => setFilterCategory(cat.title)}
          />
        </View>
        {/** Date Range */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Date Range
          </Text>
          <View className="flex-row flex-wrap" style={{ gap: wp(3) }}>
            {/** All Time */}
            <Pressable
              onPress={() =>
                filterDateRange !== "all" && setFilterDateRange("all")
              }
              className="items-center justify-center rounded-full"
              style={{
                width: wp(42),
                height: hp(4),
                backgroundColor:
                  filterDateRange === "all" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterDateRange === "all" ? "#FFFFFF" : "#4B5563",
                }}
              >
                All Time
              </Text>
            </Pressable>
            {/** Today */}
            <Pressable
              onPress={() =>
                filterDateRange !== "today" && setFilterDateRange("today")
              }
              className="items-center justify-center rounded-full"
              style={{
                width: wp(42),
                height: hp(4),
                backgroundColor:
                  filterDateRange === "today" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterDateRange === "today" ? "#FFFFFF" : "#4B5563",
                }}
              >
                Today
              </Text>
            </Pressable>
            {/** This Week */}
            <Pressable
              onPress={() =>
                filterDateRange !== "weekly" && setFilterDateRange("weekly")
              }
              className="items-center justify-center rounded-full"
              style={{
                width: wp(42),
                height: hp(4),
                backgroundColor:
                  filterDateRange === "weekly" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterDateRange === "weekly" ? "#FFFFFF" : "#4B5563",
                }}
              >
                This Week
              </Text>
            </Pressable>
            {/** This Month */}
            <Pressable
              onPress={() =>
                filterDateRange !== "monthly" && setFilterDateRange("monthly")
              }
              className="items-center justify-center rounded-full"
              style={{
                width: wp(42),
                height: hp(4),
                backgroundColor:
                  filterDateRange === "monthly" ? "#C67C4E" : "#F9FAFB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: filterDateRange === "monthly" ? "#FFFFFF" : "#4B5563",
                }}
              >
                This Month
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </>
  );
}
