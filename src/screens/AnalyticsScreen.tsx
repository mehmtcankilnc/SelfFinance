import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";

export default function AnalyticsScreen() {
  return (
    <View className="flex-1 bg-backgroundColor">
      {/** Header */}
      <View
        className="flex-row justify-between items-center bg-headerBg rounded-b-2xl"
        style={{ height: hp(15), padding: wp(6), gap: wp(5) }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 25,
              color: "#D8D8D8",
            }}
          >
            Analytics
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 16,
              color: "#D8D8D8",
              maxWidth: wp(65),
            }}
          >
            The coolest way to analyze{"\n"}transactions 👌
          </Text>
        </View>
        {/** Avatar */}
        <Pressable
          onPress={() => {}}
          className="bg-[#79A8FF] items-center justify-center"
          style={{ width: wp(16), height: wp(16), borderRadius: wp(6) }}
        >
          <Image
            source={require("../../assets/avatars/avatar1_male.webp")}
            style={{ width: wp(12), height: wp(12) }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      {/** Statistics */}
      <View className="flex-row" style={{ gap: wp(3), padding: wp(6) }}>
        {/** Income */}
        <View
          className="flex-1 bg-white rounded-2xl"
          style={{ padding: wp(3), gap: wp(1) }}
        >
          <View
            className="bg-[#E8F8F3] items-center justify-center rounded-full"
            style={{ width: 40, height: 40 }}
          >
            <SmoothIcon name="income" size={32} color="#10B981" />
          </View>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 12,
              color: "#374151",
            }}
          >
            Income
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 14,
              color: "#10B981",
            }}
          >
            $4500
          </Text>
        </View>
        {/** Expense */}
        <View
          className="flex-1 bg-white rounded-2xl"
          style={{ padding: wp(3), gap: wp(1) }}
        >
          <View
            className="bg-[#FCEAEA] items-center justify-center rounded-full"
            style={{ width: 40, height: 40 }}
          >
            <SmoothIcon name="expense" size={32} color="#DC2626" />
          </View>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 12,
              color: "#374151",
            }}
          >
            Expense
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 14,
              color: "#DC2626",
            }}
          >
            $2500
          </Text>
        </View>
        {/** Balance */}
        <View
          className="flex-1 bg-white rounded-2xl"
          style={{ padding: wp(3), gap: wp(1) }}
        >
          <View
            className="bg-[#FBF2ED] items-center justify-center rounded-full"
            style={{ width: 40, height: 40 }}
          >
            <Text style={{ color: "#D17C4E", fontSize: 20 }}>$</Text>
          </View>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 12,
              color: "#374151",
            }}
          >
            Balance
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans-Regular",
              fontSize: 14,
              color: "#D17C4E",
            }}
          >
            $2000
          </Text>
        </View>
      </View>
      {/** Graphs */}
    </View>
  );
}
