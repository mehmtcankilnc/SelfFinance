import React, { createContext, ReactNode, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";

type DropdownConfig = {
  layout: { x: number; y: number; width: number; height: number };
  content: React.ReactNode;
  onClose?: () => void;
};

type DropdownContextType = {
  openDropdown: (config: DropdownConfig) => void;
  closeDropdown: () => void;
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export default function DropdownProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dropdown, setDropdown] = useState<DropdownConfig | null>(null);

  const openDropdown = (config: DropdownConfig) => {
    setDropdown(config);
  };

  const closeDropdown = () => {
    if (dropdown?.onClose) {
      dropdown.onClose();
    }
    setDropdown(null);
  };

  return (
    <DropdownContext.Provider value={{ openDropdown, closeDropdown }}>
      {children}
      {dropdown && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeDropdown} />
          <View
            style={{
              position: "absolute",
              top: dropdown.layout.y + dropdown.layout.height,
              left: dropdown.layout.x,
              width: dropdown.layout.width,
              zIndex: 9999,
              elevation: 50,
            }}
          >
            {dropdown.content}
          </View>
        </>
      )}
    </DropdownContext.Provider>
  );
}
