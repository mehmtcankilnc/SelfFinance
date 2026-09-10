import { View, Text, Image, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../components/CustomTextInput";
import CustomDropdown from "../components/CustomDropdown";
import { useBottomSheet } from "../store/useBottomSheet";
import { useProfile } from "../store/useProfile";
import { avatarData } from "../data/profileData";
import { useThemeColors } from "../theme/useThemeColors";
import { useTheme } from "../store/useTheme";
import { useTransactions } from "../store/useTransactions";
import { useFilter } from "../store/useFilter";
import { haptics } from "../utilities/haptics";
import ToggleSwitch from "../components/ToggleSwitch";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { c, isDark } = useThemeColors();
  const toggleTheme = useTheme((state) => state.toggleTheme);
  const { openBottomSheet } = useBottomSheet();
  const {
    displayName,
    setDisplayName,
    currency,
    setCurrency,
    avatar,
    profileColor,
  } = useProfile();
  const clearTransactions = useTransactions((state) => state.clearTransactions);

  const [confirmVisible, setConfirmVisible] = useState(false);

  const label = {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: c.textSecondary,
  } as const;

  const handleToggleTheme = () => {
    haptics.selection();
    toggleTheme();
  };

  const handleDeleteData = () => {
    haptics.warning();
    clearTransactions();
    const filter = useFilter.getState();
    filter.setSearchText("");
    filter.setCurrentTypeFilter("all");
    filter.setCurrentCategoryFilter("all");
    filter.setCurrentDateFilter("all");
    setConfirmVisible(false);
    haptics.success();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: c.background }}>
      {/** Header */}
      <View
        className="justify-center items-center rounded-b-2xl"
        style={{ paddingVertical: wp(6), backgroundColor: c.headerBg }}
      >
        <SmoothIcon
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: wp(3) }}
          name="chevron-left"
          size={32}
          color="#D8D8D8"
        />
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 24,
            lineHeight: 36,
            color: "#D8D8D8",
          }}
        >
          Profile
        </Text>
      </View>
      {/** Avatar */}
      <View
        className="rounded-full self-center items-center justify-center"
        style={{
          width: wp(40),
          height: wp(40),
          marginTop: wp(10),
          backgroundColor: profileColor,
        }}
      >
        <Image
          source={avatarData.find((av) => av.id === avatar)?.image}
          style={{ width: wp(25), height: wp(25) }}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => openBottomSheet("EDIT_AVATAR")}
          className="absolute rounded-full bottom-0 right-0"
          style={{ padding: wp(1.5), backgroundColor: c.headerBg }}
        >
          <SmoothIcon name="edit1-outlined" size={24} color={"#D8D8D8"} />
        </Pressable>
      </View>
      {/** Content */}
      <View style={{ paddingHorizontal: wp(6), marginTop: wp(10), gap: wp(3) }}>
        {/** Display Name */}
        <View style={{ gap: wp(1) }}>
          <Text style={label}>Display Name</Text>
          <CustomTextInput
            text={displayName}
            onTextChange={(val) => setDisplayName(val)}
            placeholder={"Name"}
          />
        </View>
        {/** Currency */}
        <View style={{ gap: wp(1) }}>
          <Text style={label}>Currency</Text>
          <CustomDropdown
            dropdownData={[
              { id: 1, title: "USD ($)" },
              { id: 2, title: "EUR (€)" },
              { id: 3, title: "JPY (¥)" },
              { id: 4, title: "GBP (£)" },
              { id: 5, title: "TRY (₺)" },
            ]}
            selectedTitle={currency}
            placeholder="Choose"
            onSelect={(curr) => setCurrency(curr.title)}
          />
        </View>
        {/** Appearance */}
        <View style={{ gap: wp(1) }}>
          <Text style={label}>Appearance</Text>
          <View
            className="flex-row items-center justify-between rounded-2xl border"
            style={{
              minHeight: hp(6),
              paddingHorizontal: wp(4),
              paddingVertical: wp(2),
              backgroundColor: c.surfaceAlt,
              borderColor: c.border,
            }}
          >
            <View className="flex-row items-center" style={{ gap: wp(3) }}>
              <SmoothIcon
                name={isDark ? "moon" : "sun"}
                size={22}
                color={c.textSecondary}
              />
              <Text
                style={{
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  color: c.textPrimary,
                }}
              >
                Dark Theme
              </Text>
            </View>
            <ToggleSwitch
              value={isDark}
              onValueChange={handleToggleTheme}
              onColor={c.action}
              offColor={isDark ? "#48484A" : "#E9E9EA"}
            />
          </View>
        </View>
        {/** Data */}
        <View style={{ gap: wp(1), marginTop: wp(2) }}>
          <Text style={label}>Data</Text>
          <Pressable
            onPress={() => {
              haptics.tapLight();
              setConfirmVisible(true);
            }}
            className="flex-row items-center justify-center rounded-2xl border"
            style={{
              minHeight: hp(6),
              gap: wp(2),
              borderColor: c.deleteBtn,
              backgroundColor: c.dangerBg,
            }}
          >
            <SmoothIcon name="delete-outlined" size={20} color={c.deleteBtn} />
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14,
                color: c.deleteBtn,
              }}
            >
              Delete My Data
            </Text>
          </Pressable>
        </View>
      </View>

      {/** Delete confirmation */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: c.overlay }}
          onPress={() => setConfirmVisible(false)}
        >
          <Pressable
            style={{
              width: wp(85),
              padding: wp(6),
              backgroundColor: c.surface,
            }}
            className="rounded-3xl items-center"
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
              Delete all your transactions?
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
              Every transaction and its totals will be permanently removed. Your
              profile and preferences stay untouched. This cannot be undone.
            </Text>
            <View className="flex-row" style={{ gap: wp(3), marginTop: wp(6) }}>
              <Pressable
                onPress={() => setConfirmVisible(false)}
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
                onPress={handleDeleteData}
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
    </View>
  );
}
