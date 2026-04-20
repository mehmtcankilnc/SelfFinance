/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  useWindowDimensions,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { Content, useBottomSheet } from "../store/useBottomSheet";
import AddTransactionContent from "./AddTransactionContent";
import EditProfileContent from "./EditProfileContent";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

const TIMING_CONFIG = {
  duration: 250,
};

const renderContent = (content: Content) => {
  const { type } = content;

  switch (type) {
    case "ADD_SCREEN":
      return <AddTransactionContent />;
    case "EDIT_AVATAR":
      return <EditProfileContent />;
    default:
      return null;
  }
};

export default function GlobalBottomSheet() {
  const { isOpen, content, closeBottomSheet, clearBottomSheetContent } =
    useBottomSheet();

  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const SNAP_POINT = SCREEN_HEIGHT * 0.3;
  const gestureContentY = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const [isSheetVisible, setIsSheetVisible] = useState(false);

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        closeBottomSheet();
        return true;
      } else {
        return false;
      }
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress,
    );

    return () => {
      subscription.remove();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsSheetVisible(true);
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, TIMING_CONFIG);

      const timerId = setTimeout(() => {
        setIsSheetVisible(false);
        clearBottomSheetContent();
      }, TIMING_CONFIG.duration);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, SCREEN_HEIGHT]);

  const dispatchClose = useCallback(() => {
    closeBottomSheet();
  }, []);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      gestureContentY.value = translateY.value;
    })
    .onUpdate((event) => {
      "worklet";
      const newTranslateY = gestureContentY.value + event.translationY;

      translateY.value = Math.max(newTranslateY, 0);
    })
    .onEnd((event) => {
      "worklet";
      if (translateY.value > SNAP_POINT || event.velocityY > 500) {
        scheduleOnRN(dispatchClose);
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const rBackdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT],
      [0.5, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  const rSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleBackdropPress = () => {
    closeBottomSheet();
  };

  if (!isSheetVisible) {
    return null;
  }

  return (
    <Animated.View
      className="absolute inset-0"
      style={{ pointerEvents: "box-none" }}
    >
      <AnimatedPressable
        onPress={handleBackdropPress}
        className="absolute inset-0 bg-black/50"
        style={rBackdropStyle}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="absolute inset-0"
        pointerEvents="box-none"
      >
        <View className="flex-1 justify-end" pointerEvents="box-none">
          <Animated.View
            onStartShouldSetResponder={() => true}
            style={[rSheetStyle, { maxHeight: "100%" }]}
            className="w-full bg-backgroundColor rounded-t-2xl shadow-lg md:max-w-lg md:mx-auto md:bottom-4 md:rounded-xl"
          >
            <GestureDetector gesture={panGesture}>
              <Animated.View className="w-full pt-3 pb-4 items-center bg-transparent">
                <View className="w-16 h-1 bg-action rounded-full" />
              </Animated.View>
            </GestureDetector>
            {content ? renderContent(content) : null}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}
