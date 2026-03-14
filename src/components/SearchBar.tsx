import { View, Text, TextInput } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";

export default function SearchBar() {
  return (
    <>
      <TextInput
        className="rounded-xl"
        style={{
          backgroundColor: "#2A2A2A",
          width: wp(65),
          paddingLeft: wp(10),
          fontFamily: "OpenSans-Regular",
          color: "#FFFFFF",
        }}
        placeholder="Search..."
        placeholderTextColor={"#FFFFFF"}
        cursorColor={"#FFFFFF"}
      />
      <View className="absolute left-2">
        <SmoothIcon name="magnify" size={20} color={"#FFFFFF"} />
      </View>
    </>
  );
}
