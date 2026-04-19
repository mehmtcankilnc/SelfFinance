import { View, Text, Pressable, LayoutChangeEvent } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  titles: string[];
  onChange: (index: number) => void;
};

export default function AnimatedSegmentedButtons({ titles, onChange }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const translateX = useSharedValue(0);

  const handleSwitch = (index: number) => {
    if (index !== activeIndex && containerWidth > 0) {
      setActiveIndex(index);
      onChange(index);

      const segmentWidth = containerWidth / titles.length;

      translateX.value = withSpring(index * segmentWidth, {
        damping: 30,
        stiffness: 200,
      });
    }
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View
      className="w-full flex-row rounded-2xl relative overflow-hidden bg-white"
      onLayout={(e: LayoutChangeEvent) => {
        const width = e.nativeEvent.layout.width;
        setContainerWidth(width);

        translateX.value = (width / titles.length) * activeIndex;
      }}
    >
      {containerWidth > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              width: containerWidth / titles.length,
              height: "100%",
              backgroundColor: "#C67C4E",
              borderRadius: 8,
            },
            indicatorStyle,
          ]}
        />
      )}
      {titles.length > 0 &&
        titles.map((title, index) => {
          const isActive = activeIndex === index;

          return (
            <Pressable
              key={index}
              onPress={() => handleSwitch(index)}
              style={{
                width: `${100 / titles.length}%`,
                paddingVertical: wp(3),
                zIndex: 10,
              }}
            >
              <Text
                className={`text-center font-semibold ${
                  isActive ? "text-white" : "text-textColor"
                }`}
              >
                {title}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
}
