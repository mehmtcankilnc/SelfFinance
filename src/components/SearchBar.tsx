import { View, TextInput } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { useFilter } from "../store/useFilter";

export default function SearchBar() {
  const searchText = useFilter((state) => state.searchText);
  const setSearchText = useFilter((state) => state.setSearchText);

  return (
    <>
      <TextInput
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        className="rounded-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          width: wp(65),
          paddingLeft: wp(10),
          fontFamily: "OpenSans-Regular",
          color: "#FFFFFF",
        }}
        placeholder="Search..."
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        cursorColor={"#FFFFFF"}
      />
      <View className="absolute left-2">
        <SmoothIcon name="magnify-outlined" size={20} color={"#FFFFFF"} />
      </View>
    </>
  );
}
