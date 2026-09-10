import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  value: boolean;
  onValueChange: (next: boolean) => void;
  /** Track colour when on. */
  onColor?: string;
  /** Track colour when off. */
  offColor?: string;
  disabled?: boolean;
}

const WIDTH = 51;
const HEIGHT = 31;
const PADDING = 2;
const THUMB = HEIGHT - PADDING * 2;
const TRAVEL = WIDTH - THUMB - PADDING * 2;

const SPRING = { damping: 15, stiffness: 190, mass: 0.7 };

export default function ToggleSwitch({
  value,
  onValueChange,
  onColor = "#C67C4E",
  offColor = "#78788029",
  disabled = false,
}: Props) {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, SPRING);
  }, [value, progress]);

  const rTrack = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [offColor, onColor],
    ),
  }));

  const rThumb = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, TRAVEL]) },
      { scale: withTiming(disabled ? 0.9 : 1, { duration: 120 }) },
    ],
  }));

  return (
    <Pressable
      disabled={disabled}
      hitSlop={8}
      onPress={() => onValueChange(!value)}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          {
            width: WIDTH,
            height: HEIGHT,
            borderRadius: HEIGHT / 2,
            padding: PADDING,
            justifyContent: "center",
          },
          rTrack,
        ]}
      >
        <Animated.View
          style={[
            {
              width: THUMB,
              height: THUMB,
              borderRadius: THUMB / 2,
              backgroundColor: "#FFFFFF",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            },
            rThumb,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
