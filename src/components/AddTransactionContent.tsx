import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import CustomTextInput from "./CustomTextInput";
import { useBottomSheet } from "../store/useBottomSheet";
import CustomDropdown from "./CustomDropdown";
import { DropdownItem } from "../types/types";

interface Props {}

export default function AddTransactionContent({}: Props) {
  const { closeBottomSheet } = useBottomSheet();

  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionCategory, setTransactionCategory] =
    useState<DropdownItem>();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [isExpense, setIsExpense] = useState(true);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: wp(8) }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View
        className="flex-row items-center justify-between border-b border-b-[#EBEBEB]"
        style={{ paddingBottom: wp(2), paddingHorizontal: wp(6) }}
      >
        <Text
          className="text-textColor"
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          Add Transaction
        </Text>
        <SmoothIcon
          onPress={closeBottomSheet}
          name="close"
          size={24}
          color={"#242424"}
        />
      </View>
      <View style={{ paddingHorizontal: wp(6), gap: wp(3), paddingTop: wp(2) }}>
        {/** Transaction Name */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Transaction Name
          </Text>
          <CustomTextInput
            text={transactionTitle}
            onTextChange={(val) => setTransactionTitle(val)}
            placeholder={"e.g., Youtube Premium"}
          />
        </View>
        {/** Transaction Category */}
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
              { text: "deneme", value: 1 },
              { text: "deneme2", value: 2 },
              { text: "deneme", value: 3 },
              { text: "deneme2", value: 4 },
              { text: "deneme", value: 5 },
              { text: "deneme2", value: 6 },
              { text: "deneme", value: 7 },
              { text: "deneme2", value: 8 },
              { text: "deneme", value: 9 },
              { text: "deneme2", value: 10 },
              { text: "deneme", value: 11 },
              { text: "deneme2", value: 12 },
            ]}
            placeholder="Choose a Category"
            onSelect={(cat) => setTransactionCategory(cat)}
          />
        </View>
        {/** Transaction Amount */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Amount
          </Text>
          <CustomTextInput
            text={transactionTitle}
            onTextChange={(val) => setTransactionAmount(val)}
            placeholder={"0.00"}
            type="numeric"
          />
        </View>
        {/** Transaction Type */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Transaction Type
          </Text>
          <View className="flex-row" style={{ gap: wp(3) }}>
            <Pressable
              onPress={() => !isExpense && setIsExpense(true)}
              className="flex-1 rounded-2xl items-center justify-center"
              style={{
                height: hp(6),
                backgroundColor: isExpense ? "#DC2626" : "#F9FAFB",
                borderWidth: isExpense ? 0 : 1,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: isExpense ? "#FFFFFF" : "#4B5563",
                }}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              onPress={() => isExpense && setIsExpense(false)}
              className="flex-1 rounded-2xl items-center justify-center"
              style={{
                height: hp(6),
                backgroundColor: isExpense ? "#F9FAFB" : "#10B981",
                borderWidth: isExpense ? 1 : 0,
                borderColor: "#E5E7EB",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: isExpense ? "#4B5563" : "#FFFFFF",
                }}
              >
                Income
              </Text>
            </Pressable>
          </View>
        </View>
        {/** Transaction Date */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Date
          </Text>
          <CustomTextInput // Custom Date modal gelmeli!
            text={transactionTitle}
            onTextChange={(val) => setTransactionTitle(val)}
            placeholder={"08.03.2026"}
          />
        </View>
      </View>
    </ScrollView>
  );
}
