import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { haptics } from "../utilities/haptics";

export interface SwipeableRowRef {
  close: () => void;
}

interface Props {
  children: React.ReactNode;
  /** Width of the revealed action panel. */
  actionsWidth: number;
  /** Rendered behind the row, right-aligned, full height. */
  renderRightActions: () => React.ReactNode;
  /** Fired once when the row is dragged past the full-swipe threshold. */
  onFullSwipe: () => void;
  /** Match the row's outer border radius so the clip looks right. */
  borderRadius?: number;
  /** Row height, used for the action panel. */
  height: number;
}

const SPRING = { damping: 18, stiffness: 200, mass: 1 };
const OPEN_ON_DRAG = 4; // px of left drag past which the row settles open
const CLOSE_FLICK_VELOCITY = 300; // rightward flick that dismisses an open row
const FULL_SWIPE_RATIO = 0.55; // fraction of row width to trigger delete
const VELOCITY_TRIGGER = 1200;

const SwipeableRow = forwardRef<SwipeableRowRef, Props>(function SwipeableRow(
  { children, actionsWidth, renderRightActions, onFullSwipe, borderRadius = 24, height },
  ref,
) {
  const translateX = useSharedValue(0);
  const rowWidth = useSharedValue(0);
  const startX = useSharedValue(0);
  const fullSwipeArmed = useSharedValue(false);

  const close = useCallback(() => {
    translateX.value = withSpring(0, SPRING);
  }, [translateX]);

  useImperativeHandle(ref, () => ({ close }), [close]);

  const triggerFullSwipe = useCallback(() => {
    haptics.warning();
    onFullSwipe();
    // Settle back to closed; the confirmation modal takes over from here.
    translateX.value = withSpring(0, SPRING);
  }, [onFullSwipe, translateX]);

  const openPanel = useCallback(() => {
    haptics.tapMedium();
  }, []);

  const armFullSwipe = useCallback(() => {
    haptics.selection();
  }, []);

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-12, 12])
    .onBegin(() => {
      "worklet";
      startX.value = translateX.value;
      fullSwipeArmed.value = false;
    })
    .onUpdate((e) => {
      "worklet";
      let next = startX.value + e.translationX;
      // Only allow revealing on the left swipe; add mild rubber-band past open.
      if (next > 0) next = 0;
      const maxDrag = -(rowWidth.value * FULL_SWIPE_RATIO + 40);
      if (next < maxDrag) next = maxDrag;
      translateX.value = next;

      const fullSwipePoint = -(rowWidth.value * FULL_SWIPE_RATIO);
      if (next <= fullSwipePoint && !fullSwipeArmed.value) {
        fullSwipeArmed.value = true;
        scheduleOnRN(armFullSwipe);
      } else if (next > fullSwipePoint && fullSwipeArmed.value) {
        fullSwipeArmed.value = false;
      }
    })
    .onEnd((e) => {
      "worklet";
      const fullSwipePoint = -(rowWidth.value * FULL_SWIPE_RATIO);
      const openPoint = -actionsWidth;

      if (translateX.value <= fullSwipePoint || e.velocityX < -VELOCITY_TRIGGER) {
        scheduleOnRN(triggerFullSwipe);
        return;
      }

      // A rightward flick always dismisses; otherwise any noticeable
      // left drag settles the row open.
      if (e.velocityX > CLOSE_FLICK_VELOCITY) {
        translateX.value = withSpring(0, SPRING);
      } else if (translateX.value < -OPEN_ON_DRAG) {
        translateX.value = withSpring(openPoint, SPRING);
      } else {
        translateX.value = withSpring(0, SPRING);
      }
    });

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      "worklet";
      translateX.value = withSpring(-actionsWidth, SPRING);
      scheduleOnRN(openPanel);
    });

  const tapToClose = Gesture.Tap().onStart(() => {
    "worklet";
    if (translateX.value !== 0) {
      translateX.value = withSpring(0, SPRING);
    }
  });

  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(pan, longPress),
    tapToClose,
  );

  const rForeground = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rActions = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-actionsWidth, -actionsWidth * 0.15, 0],
      [1, 0.6, 0],
    ),
  }));

  return (
    <View style={{ overflow: "hidden" }}>
      <Animated.View
        style={[
          styles.actions,
          { width: actionsWidth, height },
          rActions,
        ]}
      >
        {renderRightActions()}
      </Animated.View>
      <GestureDetector gesture={composed}>
        <Animated.View
          onLayout={(e) => {
            rowWidth.value = e.nativeEvent.layout.width;
          }}
          style={[rForeground, { borderRadius }]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default SwipeableRow;
