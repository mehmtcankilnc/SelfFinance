import { View, Modal, Dimensions, Pressable, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import SmoothIcon from "smooth-icon";
import { useThemeColors } from "../theme/useThemeColors";
import { haptics } from "../utilities/haptics";

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  initialDate?: Date;
}

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const isSameDay = (a: Date, b: Date) =>
  a.getDate() === b.getDate() &&
  a.getMonth() === b.getMonth() &&
  a.getFullYear() === b.getFullYear();

export default function DatePickerModal({
  visible,
  onClose,
  onDateSelect,
  initialDate = new Date(),
}: DatePickerModalProps) {
  const { c } = useThemeColors();
  const [currentDate, setCurrentDate] = useState(initialDate);

  // Keep the visible month in sync when the sheet re-opens with a new value.
  useEffect(() => {
    if (visible) setCurrentDate(initialDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const changeMonth = (offset: number) => {
    haptics.selection();
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // getDay(): 0 = Sunday … 6 = Saturday. Our grid starts on Monday.
    let firstDayIndex = new Date(year, month, 1).getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [currentDate]);

  const handleSelectDay = (day: number) => {
    haptics.tapLight();
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    onDateSelect(selected);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onDismiss={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: c.overlay }}
      >
        <Pressable
          className="rounded-2xl"
          style={{
            width: Dimensions.get("window").width * 0.85,
            padding: 20,
            backgroundColor: c.surface,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          {/** Header & Navigation */}
          <View className="flex-row justify-between items-center">
            <Pressable onPress={() => changeMonth(-1)} hitSlop={12}>
              <SmoothIcon name="chevron-left" size={24} color={c.textPrimary} />
            </Pressable>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: c.textPrimary,
              }}
            >
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <Pressable onPress={() => changeMonth(1)} hitSlop={12}>
              <SmoothIcon name="chevron-right" size={24} color={c.textPrimary} />
            </Pressable>
          </View>
          {/** Days Row */}
          <View className="flex-row justify-between" style={{ marginTop: 12 }}>
            {DAYS_OF_WEEK.map((day, index) => (
              <Text
                key={index}
                style={{
                  fontFamily: "OpenSans-Regular",
                  color: c.textSecondary,
                  width: "14.28%",
                  textAlign: "center",
                }}
              >
                {day}
              </Text>
            ))}
          </View>
          {/** Calendar */}
          <View className="flex-row flex-wrap">
            {calendarDays.map((day, index) => {
              const cellDate =
                day != null
                  ? new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day,
                    )
                  : null;
              const selected = cellDate != null && isSameDay(cellDate, initialDate);

              return (
                <Pressable
                  key={index}
                  disabled={day == null}
                  onPress={() => day != null && handleSelectDay(day)}
                  style={{
                    width: "14.28%",
                    padding: 8,
                    backgroundColor: selected ? c.action : "transparent",
                  }}
                  className="items-center justify-center rounded-xl"
                >
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      color: selected
                        ? c.onAction
                        : day != null
                          ? c.textSecondary
                          : "transparent",
                    }}
                  >
                    {day ?? ""}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {/** Close Button */}
          <Pressable
            className="items-center"
            onPress={onClose}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 14,
                color: c.textPrimary,
              }}
            >
              Close
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
