import { View, Text } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import CustomTextInput from "./CustomTextInput";

interface Props {}

export default function AddTransactionContent({}: Props) {
  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [isExpense, setIsExpense] = useState(true);

  return (
    <View style={{ paddingBottom: wp(8) }}>
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
        <SmoothIcon name="close" size={24} color={"#242424"} />
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
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Category
          </Text>
          {/** DropDown gelcek buraya */}
          <CustomTextInput
            text={transactionTitle}
            onTextChange={(val) => setTransactionTitle(val)}
            placeholder={"e.g., Youtube Premium"}
          />
        </View>
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
      </View>
    </View>
  );
}
