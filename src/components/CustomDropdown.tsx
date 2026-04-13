import { View, Text, Pressable } from "react-native";
import React, { ReactNode, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import { DropdownItem } from "../types/types";
import { ScrollView } from "react-native-gesture-handler";
import { useDropdown } from "../hooks/useDropdown";

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
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<View>(null);

  const { openDropdown, closeDropdown } = useDropdown();

  const handleSelect = (item: T) => {
    if (onSelect) onSelect(item);
  };

  const renderDropdown = () => (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 1,
        borderColor: "#C67C4E",
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
              borderBottomColor: "#F3F4F6",
              backgroundColor:
                selectedTitle && selectedTitle === item.title
                  ? "#FDF1E7"
                  : "transparent",
            }}
          >
            <Text
              style={{
                color:
                  selectedTitle && selectedTitle === item.title
                    ? "#C67C4E"
                    : "#374151",
                fontFamily: "OpenSans-Regular",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
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
          backgroundColor: "#F9FAFB",
          paddingLeft: icon ? wp(10) : wp(4),
          paddingRight: wp(4),
          borderWidth: 1,
          borderColor: isOpen ? "#C67C4E" : "#E5E7EB",
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
            color: selectedTitle ? "#111827" : "#9CA3AF",
            fontFamily: "OpenSans-Regular",
          }}
        >
          {selectedTitle ? selectedTitle : placeholder}
        </Text>
        <SmoothIcon
          name={isOpen ? "up-chevron" : "down-chevron"}
          size={20}
          color={isOpen ? "#C67C4E" : "#9CA3AF"}
        />
      </Pressable>
    </View>
  );
}
