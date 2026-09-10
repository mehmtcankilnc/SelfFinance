import { View, TextInput, TextInputProps } from "react-native";
import React, { ReactNode, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useThemeColors } from "../theme/useThemeColors";

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
  ...rest
}: Props) {
  const { c } = useThemeColors();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={onTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={c.textTertiary}
        className="rounded-2xl border"
        style={{
          height: hp(6),
          backgroundColor: c.surfaceAlt,
          color: c.textPrimary,
          paddingLeft: icon ? wp(10) : wp(4),
          borderColor: isFocused ? c.action : c.border,
          fontFamily: "OpenSans-Regular",
        }}
        {...rest}
        cursorColor={c.textPrimary}
        keyboardType={type}
      />
      {icon && <View className="absolute top-3 left-2">{icon}</View>}
    </View>
  );
}
