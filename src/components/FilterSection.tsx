import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CustomDropdown from "./CustomDropdown";
import { useFilter } from "../store/useFilter";
import { allCategories } from "../data/categoryData";

export default function FilterSection() {
  const {
    currentTypeFilter,
    currentCategoryFilter,
    currentDateFilter,
    setCurrentTypeFilter,
    setCurrentCategoryFilter,
    setCurrentDateFilter,
  } = useFilter();

  return (
    <>
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
            onPress={() =>
              currentTypeFilter !== "all" && setCurrentTypeFilter("all")
            }
            className="flex-1 items-center justify-center rounded-full"
            style={{
              height: hp(4),
              backgroundColor:
                currentTypeFilter === "all" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentTypeFilter === "all" ? "#FFFFFF" : "#4B5563",
              }}
            >
              All
            </Text>
          </Pressable>
          {/** Expense */}
          <Pressable
            onPress={() =>
              currentTypeFilter !== "expense" && setCurrentTypeFilter("expense")
            }
            className="flex-1 items-center justify-center rounded-full"
            style={{
              height: hp(4),
              backgroundColor:
                currentTypeFilter === "expense" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentTypeFilter === "expense" ? "#FFFFFF" : "#4B5563",
              }}
            >
              Expense
            </Text>
          </Pressable>
          {/** Income */}
          <Pressable
            onPress={() =>
              currentTypeFilter !== "income" && setCurrentTypeFilter("income")
            }
            className="flex-1 items-center justify-center rounded-full"
            style={{
              height: hp(4),
              backgroundColor:
                currentTypeFilter === "income" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentTypeFilter === "income" ? "#FFFFFF" : "#4B5563",
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
              currentDateFilter !== "all" && setCurrentDateFilter("all")
            }
            className="items-center justify-center rounded-full"
            style={{
              width: wp(42),
              height: hp(4),
              backgroundColor:
                currentDateFilter === "all" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentDateFilter === "all" ? "#FFFFFF" : "#4B5563",
              }}
            >
              All Time
            </Text>
          </Pressable>
          {/** Today */}
          <Pressable
            onPress={() =>
              currentDateFilter !== "today" && setCurrentDateFilter("today")
            }
            className="items-center justify-center rounded-full"
            style={{
              width: wp(42),
              height: hp(4),
              backgroundColor:
                currentDateFilter === "today" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentDateFilter === "today" ? "#FFFFFF" : "#4B5563",
              }}
            >
              Today
            </Text>
          </Pressable>
          {/** This Week */}
          <Pressable
            onPress={() =>
              currentDateFilter !== "thisWeek" &&
              setCurrentDateFilter("thisWeek")
            }
            className="items-center justify-center rounded-full"
            style={{
              width: wp(42),
              height: hp(4),
              backgroundColor:
                currentDateFilter === "thisWeek" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: currentDateFilter === "thisWeek" ? "#FFFFFF" : "#4B5563",
              }}
            >
              This Week
            </Text>
          </Pressable>
          {/** This Month */}
          <Pressable
            onPress={() =>
              currentDateFilter !== "thisMonth" &&
              setCurrentDateFilter("thisMonth")
            }
            className="items-center justify-center rounded-full"
            style={{
              width: wp(42),
              height: hp(4),
              backgroundColor:
                currentDateFilter === "thisMonth" ? "#C67C4E" : "#F9FAFB",
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color:
                  currentDateFilter === "thisMonth" ? "#FFFFFF" : "#4B5563",
              }}
            >
              This Month
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
