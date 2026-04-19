import { View, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import CustomTextInput from "./CustomTextInput";
import { useBottomSheet } from "../store/useBottomSheet";
import CustomDropdown from "./CustomDropdown";
import { Transaction } from "../types/types";
import { useTransactions } from "../store/useTransactions";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePickerModal from "./DatePickerModal";
import { expenseCategories, incomeCategories } from "../data/categoryData";

const categorySchema = z.object({
  id: z.number().gt(0, "*Required Field"),
  title: z.string().min(1, "*Required Field"),
  colorCode: z.string(),
});

const addTransactionSchema = z.object({
  transactionName: z.string().min(1, "*Required Field"),
  transactionCategory: categorySchema,
  transactionAmount: z.string().min(1, "*Required Field"),
  transactionDate: z.date({
    error: (issue) =>
      issue.input === undefined ? "*Required Field" : "*Invalid Input",
  }),
});

type TransactionFromValues = z.infer<typeof addTransactionSchema>;

export default function AddTransactionContent() {
  const { closeBottomSheet } = useBottomSheet();
  const { transactions, addTransaction } = useTransactions();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFromValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      transactionName: "",
      transactionCategory: { id: 0, title: "", colorCode: "" },
      transactionAmount: "",
      transactionDate: new Date(),
    },
  });

  const selectedDate = watch("transactionDate");
  const selectedCat = watch("transactionCategory");

  const [isExpense, setIsExpense] = useState(true);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const handleAddNewTransaction = (data: TransactionFromValues) => {
    let newTransaction: Transaction = {
      id: transactions.length + 1,
      type: isExpense ? "expense" : "income",
      title: data.transactionName,
      category: data.transactionCategory,
      date: data.transactionDate,
      amount: data.transactionAmount,
    };

    addTransaction(newTransaction);
    closeBottomSheet();
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: wp(8) }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={20}
    >
      {/** Title & Header */}
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
      {/** Content */}
      <View style={{ paddingHorizontal: wp(6), gap: wp(3), paddingTop: wp(2) }}>
        {/** Transaction Name */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Transaction Name{" "}
            {errors.transactionName && (
              <Text className="color-[#e74c3c]">
                {errors.transactionName.message}
              </Text>
            )}
          </Text>
          <Controller
            control={control}
            name={"transactionName"}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                text={value}
                onTextChange={onChange}
                placeholder={"e.g., Youtube Premium"}
              />
            )}
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
            Category{" "}
            {errors.transactionCategory && (
              <Text className="color-[#e74c3c]">
                {errors.transactionCategory.id?.message ||
                  errors.transactionCategory.title?.message}
              </Text>
            )}
          </Text>
          <CustomDropdown
            dropdownData={isExpense ? expenseCategories : incomeCategories}
            placeholder="Choose a Category"
            onSelect={(cat) =>
              setValue("transactionCategory", cat, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            selectedTitle={selectedCat.title}
          />
        </View>
        {/** Transaction Amount */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Amount{" "}
            {errors.transactionAmount && (
              <Text className="color-[#e74c3c]">
                {errors.transactionAmount.message}
              </Text>
            )}
          </Text>
          <Controller
            control={control}
            name="transactionAmount"
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                text={value}
                onTextChange={onChange}
                placeholder={"0.00"}
                type="numeric"
              />
            )}
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
              onPress={() => {
                if (!isExpense) {
                  setIsExpense(true);
                  setValue("transactionCategory", {
                    id: 0,
                    title: "",
                    colorCode: "",
                  });
                }
              }}
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
              onPress={() => {
                if (isExpense) {
                  setIsExpense(false);
                  setValue("transactionCategory", {
                    id: 0,
                    title: "",
                    colorCode: "",
                  });
                }
              }}
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
            Date{" "}
            {errors.transactionDate && (
              <Text className="color-[#e74c3c]">
                {errors.transactionDate.message}
              </Text>
            )}
          </Text>
          <Pressable
            className="rounded-2xl border border-[#E5E7EB] justify-center"
            style={{
              height: hp(6),
              backgroundColor: "#F9FAFB",
              paddingLeft: wp(4),
            }}
            onPress={() => setIsDateModalVisible(true)}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                color: selectedDate ? "#111827" : "#9CA3AF",
              }}
            >
              {selectedDate
                ? selectedDate.toLocaleDateString("tr-TR")
                : "Select"}
            </Text>
          </Pressable>
        </View>
        {/** Buttons */}
        <View className="flex-row" style={{ gap: wp(3), marginTop: wp(5) }}>
          {/** Cancel Button */}
          <Pressable
            onPress={closeBottomSheet}
            className="flex-1 rounded-2xl items-center justify-center"
            style={{
              height: hp(6),
              backgroundColor: "#F3F4F6",
            }}
          >
            <Text
              className="color-secondaryText"
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
              }}
            >
              Cancel
            </Text>
          </Pressable>
          {/** Add Button */}
          <Pressable
            onPress={handleSubmit(handleAddNewTransaction)}
            className="flex-1 rounded-2xl items-center justify-center bg-action"
            style={{
              height: hp(6),
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: "#FFFFFF",
              }}
            >
              Add Transaction
            </Text>
          </Pressable>
        </View>
        {/** Date Modal */}
        <DatePickerModal
          visible={isDateModalVisible}
          onClose={() => setIsDateModalVisible(false)}
          onDateSelect={(date) => {
            setValue("transactionDate", date, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          initialDate={selectedDate}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
