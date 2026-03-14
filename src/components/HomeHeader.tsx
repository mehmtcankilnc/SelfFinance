import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "./SearchBar";
import { SmoothIcon } from "smooth-icon";

export default function HomeHeader() {
  return (
    <View
      className="bg-headerBg rounded-b-2xl"
      style={{ height: hp(25), padding: wp(6), gap: wp(5) }}
    >
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
      <View className="flex-row items-center justify-between">
        <SearchBar />
        <Pressable className="bg-action rounded-xl" style={{ padding: wp(2) }}>
          <SmoothIcon name="filter" size={24} color={"#FFFFFF"} />
        </Pressable>
      </View>
    </View>
  );
}
