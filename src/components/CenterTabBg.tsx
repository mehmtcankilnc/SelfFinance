import React from "react";
import Svg, { Path } from "react-native-svg";

export default function CenterTabBg() {
  return (
    <Svg width={100} height={50} viewBox="0 0 100 50" fill="none">
      <Path
        d="M100 0c-6.903 0-12.5 5.596-12.5 12.5C87.5 33.21 70.71 50 50 50S12.5 33.21 12.5 12.5C12.5 5.596 6.904 0 0 0h100z"
        fill="#F9F9F9"
      />
    </Svg>
  );
}
