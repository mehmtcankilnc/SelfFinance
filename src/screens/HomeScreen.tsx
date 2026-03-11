import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-backgroundColor">
      <View
        className="bg-headerBg rounded-b-2xl"
        style={{ height: hp(25), padding: wp(8) }}
      >
        {/** Header */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 25,
                color: "#D8D8D8",
              }}
            >
              Hey, Mehmetcan
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
        {/** Search Bar */}
        <View className="flex-row items-center justify-between" />
      </View>
      <Text>HomeScreen</Text>
    </View>
  );
}
