import { View, Text, Pressable, Modal } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Transaction } from "../types/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { useProfile } from "../store/useProfile";
import { useTransactions } from "../store/useTransactions";
import { useBottomSheet } from "../store/useBottomSheet";
import { useThemeColors } from "../theme/useThemeColors";
import { haptics } from "../utilities/haptics";
import SwipeableRow, { SwipeableRowRef } from "./SwipeableRow";

type Props = {
  transaction: Transaction;
};

const ROW_HEIGHT = wp(20);
const CARD_RADIUS = 24;
const ACTION_BTN = wp(13);
const BTN_GAP = wp(2.5);
const LEAD_GAP = wp(3);
const ACTIONS_WIDTH = LEAD_GAP + ACTION_BTN + BTN_GAP + ACTION_BTN;

function TransactionItem({ transaction }: Props) {
  const { c } = useThemeColors();
  const isExpense = transaction.type === "expense";
  const currency = useProfile((state) => state?.currency ?? "USD ($)");
  const deleteTransaction = useTransactions((state) => state.deleteTransaction);
  const openBottomSheet = useBottomSheet((state) => state.openBottomSheet);

  const rowRef = useRef<SwipeableRowRef>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleEdit = useCallback(() => {
    haptics.tapLight();
    rowRef.current?.close();
    openBottomSheet("ADD_SCREEN", { mode: "edit", transaction });
  }, [openBottomSheet, transaction]);

  const askDelete = useCallback(() => {
    haptics.tapLight();
    setConfirmVisible(true);
  }, []);

  const confirmDelete = useCallback(() => {
    haptics.success();
    setConfirmVisible(false);
    rowRef.current?.close();
    deleteTransaction(transaction.id);
  }, [deleteTransaction, transaction.id]);

  const cancelDelete = useCallback(() => {
    setConfirmVisible(false);
    rowRef.current?.close();
  }, []);

  const renderRightActions = () => (
    <View
      className="flex-row items-center"
      style={{ gap: BTN_GAP, paddingLeft: LEAD_GAP }}
    >
      <Pressable
        onPress={handleEdit}
        hitSlop={6}
        className="items-center justify-center"
        style={{
          width: ACTION_BTN,
          height: ACTION_BTN,
          borderRadius: 20,
          backgroundColor: c.action,
        }}
      >
        <SmoothIcon name="edit2-outlined" size={24} color={c.onAction} />
      </Pressable>
      <Pressable
        onPress={askDelete}
        hitSlop={6}
        className="items-center justify-center"
        style={{
          width: ACTION_BTN,
          height: ACTION_BTN,
          borderRadius: 20,
          backgroundColor: c.deleteBtn,
        }}
      >
        <SmoothIcon name="delete-outlined" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );

  return (
    <>
      <SwipeableRow
        ref={rowRef}
        height={ROW_HEIGHT}
        borderRadius={CARD_RADIUS}
        actionsWidth={ACTIONS_WIDTH}
        renderRightActions={renderRightActions}
        onFullSwipe={() => setConfirmVisible(true)}
      >
        <View
          className="w-full flex-row items-center justify-between"
          style={{
            padding: wp(5),
            gap: wp(2),
            height: ROW_HEIGHT,
            backgroundColor: c.surface,
            borderRadius: CARD_RADIUS,
          }}
        >
          <View className="flex-1 flex-row items-center">
            <View
              className="flex-1 flex-row items-center"
              style={{ gap: wp(2) }}
            >
              <View
                className="rounded-full"
                style={{
                  backgroundColor: isExpense ? c.dangerBg : c.successBg,
                  padding: wp(2),
                }}
              >
                <SmoothIcon
                  name={isExpense ? "arrow-descending" : "arrow-ascending"}
                  size={24}
                  color={isExpense ? c.danger : c.success}
                />
              </View>
              <View className="flex" style={{ width: wp(40) }}>
                <Text
                  style={{
                    fontFamily: "Poppins-SemiBold",
                    fontSize: 14,
                    color: c.textPrimary,
                  }}
                  numberOfLines={1}
                >
                  {transaction.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "OpenSans-Regular",
                    fontSize: 10,
                    color: transaction.category.colorCode,
                  }}
                >
                  {`${transaction.category.title} • `}
                  <Text style={{ color: c.textTertiary }}>
                    {new Date(transaction.date).toLocaleDateString("tr-TR")}
                  </Text>
                </Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "right",
                color: isExpense ? c.danger : c.success,
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                width: wp(20),
              }}
              numberOfLines={1}
            >
              {isExpense ? "-" : "+"}
              {transaction.amount} {currency.slice(5, 6)}
            </Text>
          </View>
        </View>
      </SwipeableRow>

      {/** Delete confirmation */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: c.overlay }}
          onPress={cancelDelete}
        >
          <Pressable
            style={{
              width: wp(85),
              padding: wp(6),
              backgroundColor: c.surface,
            }}
            className="rounded-3xl items-center justify-between"
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              className="text-center"
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: c.textPrimary,
              }}
            >
              Delete this transaction?
            </Text>
            <Text
              className="text-center"
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 12,
                color: c.textTertiary,
                marginTop: wp(2),
              }}
            >
              This action cannot be undone.
            </Text>
            <View className="flex-row" style={{ gap: wp(3), marginTop: wp(6) }}>
              <Pressable
                onPress={cancelDelete}
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
                onPress={confirmDelete}
                className="flex-1 rounded-2xl items-center justify-center"
                style={{ height: hp(6), backgroundColor: c.deleteBtn }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Regular",
                    fontSize: 14,
                    color: "#FFFFFF",
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export default React.memo(TransactionItem);
