import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "./SearchBar";
import { SmoothIcon } from "smooth-icon";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../store/useProfile";
import { avatarData } from "../data/profileData";
import FilterSection from "./FilterSection";

const HEIGHT_VALUE = hp(35);

export default function HomeHeader() {
  const navigation = useNavigation();
  const { avatar, displayName, profileColor } = useProfile();

  const [isFilterSectionOpen, setIsFilterSectionOpen] = useState(false);

  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  const borderRadius = useSharedValue(16);

  const handleToggleFilterSection = () => {
    if (progress.value == 0) {
      height.value = withTiming(HEIGHT_VALUE, { duration: 300 });
      borderRadius.value = withTiming(0, { duration: 200 });
      progress.value = 1;
      setIsFilterSectionOpen(true);
    } else {
      height.value = withTiming(0, { duration: 300 }, (isFinished) => {
        if (isFinished) {
          progress.value = 0;
        }
      });
      borderRadius.value = withDelay(300, withTiming(16, { duration: 200 }));
      setIsFilterSectionOpen(false);
    }
  };

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: height.value,
      display: progress.value === 1 ? "flex" : "none",
    };
  });

  const animatedBorderRadius = useAnimatedStyle(() => {
    return {
      borderBottomRightRadius: borderRadius.value,
      borderBottomLeftRadius: borderRadius.value,
    };
  });

  return (
    <>
      <Animated.View
        className="bg-headerBg"
        style={[
          { height: hp(25), padding: wp(6), gap: wp(5) },
          animatedBorderRadius,
        ]}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 24,
                lineHeight: 36,
                color: "#D8D8D8",
                maxWidth: wp(70),
              }}
              numberOfLines={1}
            >
              Hey, {displayName}
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                color: "#D8D8D8",
                maxWidth: wp(65),
              }}
            >
              Welcome back, your calculations are still perfect 👌
            </Text>
          </View>
          {/** Avatar */}
          <Pressable
            onPress={() => navigation.getParent()?.navigate("Profile")}
            className="items-center justify-center"
            style={{
              width: wp(16),
              height: wp(16),
              borderRadius: wp(6),
              backgroundColor: profileColor,
            }}
          >
            <Image
              source={avatarData.find((av) => av.id === avatar)?.image}
              style={{ width: wp(12), height: wp(12) }}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View className="flex-row items-center justify-between">
          <SearchBar />
          <Pressable
            onPress={handleToggleFilterSection}
            className="bg-action rounded-xl"
            style={{ padding: wp(2) }}
          >
            <SmoothIcon
              name={isFilterSectionOpen ? "close" : "filter"}
              size={24}
              color={"#FFFFFF"}
            />
          </Pressable>
        </View>
      </Animated.View>
      {/** Filters Section */}
      <Animated.View
        style={[
          {
            backgroundColor: "white",
            width: "100%",
            elevation: 3,
            paddingHorizontal: wp(6),
            gap: wp(3),
            paddingTop: wp(2),
          },
          animatedHeight,
        ]}
      >
        <FilterSection />
      </Animated.View>
    </>
  );
}
