import { View, TextInput, TextInputProps } from "react-native";
import React, { ReactNode, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props extends TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  icon?: ReactNode;
  type?: "numeric" | "default";
}

export default function CustomTextInput({
  text,
  onTextChange,
  placeholder,
  icon,
  type = "default",
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={onTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={"#9CA3AF"}
        className="rounded-2xl border"
        style={{
          height: hp(6),
          backgroundColor: "#F9FAFB",
          color: "#111827",
          paddingLeft: icon ? wp(10) : wp(4),
          borderColor: isFocused ? "#C67C4E" : "#E5E7EB",
          fontFamily: "OpenSans-Regular",
        }}
        cursorColor={"#111827"}
        keyboardType={type}
      />
      {icon && <View className="absolute top-3 left-2">{icon}</View>}
    </View>
  );
}
