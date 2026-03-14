import { View, TextInput } from "react-native";
import React, { ReactNode, useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  text: string;
  onTextChange: (val: string) => void;
  placeholder: string;
  icon?: ReactNode;
};

export default function CustomTextInput({
  text,
  onTextChange,
  placeholder,
  icon,
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
          backgroundColor: "#F9FAFB",
          color: "#111827",
          paddingLeft: icon ? wp(10) : wp(2),
          borderColor: isFocused ? "#C67C4E" : "#E5E7EB",
        }}
        cursorColor={"#111827"}
      />
      {icon && <View className="absolute top-3 left-2">{icon}</View>}
    </View>
  );
}
