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

type Props = {
  dropdownData: DropdownItem[];
  icon?: ReactNode;
  placeholder?: string;
  onSelect?: (item: DropdownItem) => void;
  item?: DropdownItem;
};

export default function CustomDropdown({
  dropdownData,
  icon,
  placeholder,
  onSelect,
  item,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    item,
  );

  const ref = useRef<View>(null);

  const { openDropdown, closeDropdown } = useDropdown();

  const handleSelect = (item: DropdownItem) => {
    setSelectedItem(item);
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
            key={item.value}
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
                selectedItem?.value === item.value ? "#FDF1E7" : "transparent",
            }}
          >
            <Text
              style={{
                color:
                  selectedItem?.value === item.value ? "#C67C4E" : "#374151",
                fontFamily: "OpenSans-Regular",
              }}
            >
              {item.text}
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
            color: selectedItem ? "#111827" : "#9CA3AF",
            fontFamily: "OpenSans-Regular",
          }}
        >
          {selectedItem ? selectedItem.text : placeholder}
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
