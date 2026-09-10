import { View, Text, Pressable } from "react-native";
import React, { ReactNode, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SmoothIcon from "smooth-icon";
import { DropdownItem } from "../types/types";
import { ScrollView } from "react-native-gesture-handler";
import { useDropdown } from "../hooks/useDropdown";
import { useThemeColors } from "../theme/useThemeColors";
import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  withTiming,
} from "react-native-reanimated";

const SlideDownEnter = (values: EntryAnimationsValues) => {
  "worklet";
  return {
    initialValues: {
      height: 0,
    },
    animations: {
      height: withTiming(values.targetHeight, { duration: 200 }),
    },
  };
};

const SlideUpExit = (values: ExitAnimationsValues) => {
  "worklet";
  return {
    initialValues: {
      height: values.currentHeight,
    },
    animations: {
      height: withTiming(0, { duration: 200 }),
    },
  };
};

interface CustomDropdownProps<T extends DropdownItem> {
  dropdownData: T[];
  icon?: ReactNode;
  placeholder?: string;
  onSelect?: (item: T) => void;
  selectedTitle?: string;
}

export default function CustomDropdown<T extends DropdownItem>({
  dropdownData,
  icon,
  placeholder,
  onSelect,
  selectedTitle,
}: CustomDropdownProps<T>) {
  const { c } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<View>(null);

  const { openDropdown, closeDropdown } = useDropdown();

  const handleSelect = (item: T) => {
    if (onSelect) onSelect(item);
  };

  const renderDropdown = () => (
    <Animated.View
      entering={SlideDownEnter}
      exiting={SlideUpExit}
      style={{
        backgroundColor: c.surface,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 1,
        borderColor: c.action,
        maxHeight: hp(24),
        overflow: "hidden",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {dropdownData.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={() => {
              handleSelect(item);
              closeDropdown();
              setIsOpen(false);
            }}
            style={{
              paddingVertical: hp(1.5),
              paddingHorizontal: wp(4),
              borderBottomWidth: index === dropdownData.length - 1 ? 0 : 1,
              borderBottomColor: c.separator,
              backgroundColor:
                selectedTitle && selectedTitle === item.title
                  ? c.actionSoft
                  : "transparent",
            }}
          >
            <Text
              style={{
                color:
                  selectedTitle && selectedTitle === item.title
                    ? c.action
                    : c.textSecondary,
                fontFamily: "OpenSans-Regular",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
      setIsOpen(false);
      return;
    }

    ref.current?.measure((_, __, width, height, pageX, pageY) => {
      openDropdown({
        layout: {
          x: pageX,
          y: pageY,
          width,
          height,
        },
        content: renderDropdown(),
        onClose: () => setIsOpen(false),
      });

      setIsOpen(true);
    });
  };

  return (
    <View ref={ref}>
      <Pressable
        onPress={toggleDropdown}
        style={{
          height: hp(6),
          backgroundColor: c.surfaceAlt,
          paddingLeft: icon ? wp(10) : wp(4),
          paddingRight: wp(4),
          borderWidth: 1,
          borderColor: isOpen ? c.action : c.border,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          borderBottomRightRadius: isOpen ? 0 : 16,
          borderBottomLeftRadius: isOpen ? 0 : 16,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {icon && <View className="absolute top-3 left-2">{icon}</View>}
        <Text
          style={{
            color: selectedTitle ? c.textPrimary : c.textTertiary,
            fontFamily: "OpenSans-Regular",
          }}
        >
          {selectedTitle ? selectedTitle : placeholder}
        </Text>
        <SmoothIcon
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={isOpen ? c.action : c.textTertiary}
        />
      </Pressable>
    </View>
  );
}
