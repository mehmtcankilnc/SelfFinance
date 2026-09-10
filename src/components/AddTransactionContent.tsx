import { View, Text, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import CustomTextInput from "./CustomTextInput";
import { useBottomSheet } from "../store/useBottomSheet";
import CustomDropdown from "./CustomDropdown";
import { Transaction, TransactionFromValues } from "../types/types";
import { useTransactions } from "../store/useTransactions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePickerModal from "./DatePickerModal";
import { expenseCategories, incomeCategories } from "../data/categoryData";
import { addTransactionSchema } from "../schemas/addTransactionSchema";
import { useThemeColors } from "../theme/useThemeColors";
import { haptics } from "../utilities/haptics";

export default function AddTransactionContent() {
  const { c } = useThemeColors();
  const closeBottomSheet = useBottomSheet((state) => state.closeBottomSheet);
  const props = useBottomSheet((state) => state.content?.props) as
    | { mode?: "edit"; transaction?: Transaction }
    | undefined;

  const editing = props?.mode === "edit" && !!props.transaction;
  const editTarget = props?.transaction;

  const addTransaction = useTransactions((state) => state.addTransaction);
  const editTransaction = useTransactions((state) => state.editTransaction);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFromValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      transactionName: editTarget?.title ?? "",
      transactionCategory: editTarget?.category ?? {
        id: 0,
        title: "",
        colorCode: "",
      },
      transactionAmount: editTarget?.amount ?? "",
      transactionDate: editTarget ? new Date(editTarget.date) : new Date(),
    },
  });

  const selectedDate = watch("transactionDate");
  const selectedCat = watch("transactionCategory");

  const [isExpense, setIsExpense] = useState(
    editTarget ? editTarget.type === "expense" : true,
  );
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);

  const onSubmit = (data: TransactionFromValues) => {
    haptics.success();

    if (editing && editTarget) {
      editTransaction({
        ...editTarget,
        type: isExpense ? "expense" : "income",
        title: data.transactionName,
        category: data.transactionCategory,
        date: data.transactionDate,
        amount: data.transactionAmount,
      });
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        type: isExpense ? "expense" : "income",
        title: data.transactionName,
        category: data.transactionCategory,
        date: data.transactionDate,
        amount: data.transactionAmount,
      };
      addTransaction(newTransaction);
    }

    closeBottomSheet();
  };

  const switchType = (toExpense: boolean) => {
    if (toExpense === isExpense) return;
    haptics.selection();
    setIsExpense(toExpense);
    setValue("transactionCategory", { id: 0, title: "", colorCode: "" });
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
        className="flex-row items-center justify-between border-b"
        style={{
          paddingBottom: wp(2),
          paddingHorizontal: wp(6),
          borderBottomColor: c.separator,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            lineHeight: 24,
            color: c.textPrimary,
          }}
        >
          {editing ? "Edit Transaction" : "Add Transaction"}
        </Text>
        <SmoothIcon
          onPress={closeBottomSheet}
          name="close"
          size={24}
          color={c.textPrimary}
        />
      </View>
      {/** Content */}
      <View style={{ paddingHorizontal: wp(6), gap: wp(3), paddingTop: wp(2) }}>
        {/** Transaction Name */}
        <View style={{ gap: wp(1) }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            Transaction Name{" "}
            {errors.transactionName && (
              <Text style={{ color: c.danger }}>
                {errors.transactionName.message}
              </Text>
            )}
          </Text>
          <Controller
            control={control}
            name={"transactionName"}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                testID="nameInputTest"
                text={value}
                onTextChange={onChange}
                placeholder={"e.g., Youtube Premium"}
              />
            )}
          />
        </View>
        {/** Transaction Amount */}
        <View style={{ gap: wp(1) }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            Amount{" "}
            {errors.transactionAmount && (
              <Text style={{ color: c.danger }}>
                {errors.transactionAmount.message}
              </Text>
            )}
          </Text>
          <Controller
            control={control}
            name="transactionAmount"
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                testID="amountInputTest"
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
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            Transaction Type
          </Text>
          <View className="flex-row" style={{ gap: wp(3) }}>
            <Pressable
              onPress={() => switchType(true)}
              className="flex-1 rounded-2xl items-center justify-center"
              style={{
                height: hp(6),
                backgroundColor: isExpense ? c.danger : c.surfaceAlt,
                borderWidth: isExpense ? 0 : 1,
                borderColor: c.border,
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: isExpense ? "#FFFFFF" : c.textSecondary,
                }}
              >
                Expense
              </Text>
            </Pressable>
            <Pressable
              onPress={() => switchType(false)}
              className="flex-1 rounded-2xl items-center justify-center"
              style={{
                height: hp(6),
                backgroundColor: isExpense ? c.surfaceAlt : c.success,
                borderWidth: isExpense ? 1 : 0,
                borderColor: c.border,
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: isExpense ? c.textSecondary : "#FFFFFF",
                }}
              >
                Income
              </Text>
            </Pressable>
          </View>
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
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            Category{" "}
            {errors.transactionCategory && (
              <Text style={{ color: c.danger }}>
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
        {/** Transaction Date */}
        <View style={{ gap: wp(1) }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            Date{" "}
            {errors.transactionDate && (
              <Text style={{ color: c.danger }}>
                {errors.transactionDate.message}
              </Text>
            )}
          </Text>
          <Pressable
            className="rounded-2xl border justify-center"
            style={{
              height: hp(6),
              backgroundColor: c.surfaceAlt,
              borderColor: c.border,
              paddingLeft: wp(4),
            }}
            onPress={() => setIsDateModalVisible(true)}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                color: selectedDate ? c.textPrimary : c.textTertiary,
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
          <Pressable
            onPress={closeBottomSheet}
            className="flex-1 rounded-2xl items-center justify-center"
            style={{ height: hp(6), backgroundColor: c.surfaceAlt }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: c.textSecondary,
              }}
            >
              Cancel
            </Text>
          </Pressable>
          <Pressable
            testID="addTransactionButtonTest"
            onPress={handleSubmit(onSubmit)}
            className="flex-1 rounded-2xl items-center justify-center"
            style={{ height: hp(6), backgroundColor: c.action }}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: c.onAction,
              }}
            >
              {editing ? "Save Changes" : "Add Transaction"}
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
