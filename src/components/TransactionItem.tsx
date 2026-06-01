import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import { Transaction } from "../types/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { useProfile } from "../store/useProfile";
import { useTransactions } from "../store/useTransactions";

type Props = {
  transaction: Transaction;
};

export default function TransactionItem({ transaction }: Props) {
  const isExpense = transaction.type === "expense";
  const currency = useProfile((state) => state?.currency ?? "USD ($)");
  const { deleteTransaction } = useTransactions();

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeModalType, setActiveModalType] = useState<
    "edit" | "delete" | null
  >(null);

  return (
    <>
      {/** Item's Itself */}
      <Pressable
        onLongPress={() => setIsEditMode(true)}
        className="w-full flex-row items-center justify-between bg-white rounded-3xl"
        style={{ padding: wp(5), gap: wp(2), height: wp(20) }}
      >
        <View className="flex-1 flex-row items-center">
          <View className="flex-1 flex-row items-center" style={{ gap: wp(2) }}>
            <View
              className="rounded-full"
              style={{
                backgroundColor: isExpense ? "#FCEAEA" : "#E8F8F3",
                padding: wp(2),
              }}
            >
              <SmoothIcon
                name={isExpense ? "arrow-descending" : "arrow-ascending"}
                size={24}
                color={isExpense ? "#DC2626" : "#10B981"}
              />
            </View>
            <View
              className="flex"
              style={{
                width: wp(40),
              }}
            >
              <Text
                className="text-textColor"
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 14,
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
                <Text style={{ color: "#9CA3AF" }}>
                  {new Date(transaction.date).toLocaleDateString("tr-TR")}
                </Text>
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "right",
              color: isExpense ? "#DC2626" : "#10B981",
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              width: wp(20),
              display: isEditMode ? "none" : "flex",
            }}
            numberOfLines={1}
          >
            {isExpense ? "-" : "+"}
            {transaction.amount} {currency.slice(5, 6)}
          </Text>
        </View>
      </Pressable>
      {/** Edit Mode Options */}
      <View
        className="absolute right-0 flex-row rounded-3xl overflow-hidden"
        style={{
          display: isEditMode ? "flex" : "none",
          height: wp(20),
        }}
      >
        <Pressable
          className="justify-center bg-action"
          style={{ padding: wp(2) }}
          onPress={() => setActiveModalType("edit")}
        >
          <SmoothIcon name="edit2-outlined" size={30} color="#FFFFFF" />
        </Pressable>
        <Pressable
          className="justify-center bg-[#F9032C]"
          style={{ padding: wp(2), marginLeft: -1 }}
          onPress={() => setActiveModalType("delete")}
        >
          <SmoothIcon name="delete-outlined" size={30} color="#FFFFFF" />
        </Pressable>
        <Pressable
          className="justify-center bg-headerBg"
          style={{ padding: wp(2), marginLeft: -1 }}
          onPress={() => {
            setActiveModalType(null);
            setIsEditMode(false);
          }}
        >
          <SmoothIcon name="close" size={30} color="#FFFFFF" />
        </Pressable>
      </View>
      {/** Modals */}
      <>
        {/** Edit Modal */}
        {/* <Modal
          visible={activeModalType === "edit"}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setActiveModalType(null)}
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center items-center"
            onPress={() => setActiveModalType(null)}
          >
            <Pressable
              style={{ width: wp(85), height: wp(85) }}
              className="bg-white rounded-3xl"
              onPress={(e) => e.stopPropagation()}
            ></Pressable>
          </Pressable>
        </Modal> */}
        {/** Delete Modal */}
        <Modal
          visible={activeModalType === "delete"}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setActiveModalType(null)}
        >
          <Pressable
            className="flex-1 bg-black/50 justify-center items-center"
            onPress={() => setActiveModalType(null)}
          >
            <Pressable
              style={{ width: wp(85), height: wp(50), padding: wp(5) }}
              className="bg-white rounded-3xl items-center justify-between"
              onPress={(e) => e.stopPropagation()}
            >
              <Text
                className="text-textColor text-center"
                style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}
              >
                Delete this transaction? This action cannot be undone.
              </Text>
              <View
                className="flex-row"
                style={{ gap: wp(3), marginTop: wp(5) }}
              >
                {/** Cancel Button */}
                <Pressable
                  onPress={() => setActiveModalType(null)}
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
                {/** Confirm Button */}
                <Pressable
                  onPress={() => deleteTransaction(transaction.id)}
                  className="flex-1 rounded-2xl items-center justify-center bg-[#F9032C]"
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
                    Delete
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </>
    </>
  );
}
