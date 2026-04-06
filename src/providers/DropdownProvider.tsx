import React, { createContext, useState } from "react";
import { View } from "react-native";

type DropdownConfig = {
  layout: { x: number; y: number; width: number; height: number };
  content: React.ReactNode;
};

export const DropdownContext = createContext<any>(null);

export default function DropdownProvider({ children }: any) {
  const [dropdown, setDropdown] = useState<DropdownConfig | null>(null);

  const openDropdown = (config: DropdownConfig) => {
    setDropdown(config);
  };

  const closeDropdown = () => setDropdown(null);

  return (
    <DropdownContext.Provider value={{ openDropdown, closeDropdown }}>
      {children}
      {dropdown && (
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
      )}
    </DropdownContext.Provider>
  );
}
