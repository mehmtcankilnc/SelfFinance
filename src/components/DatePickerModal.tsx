import { View, Modal, Dimensions, Pressable, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { SmoothIcon } from "smooth-icon";

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

export default function DatePickerModal({
  visible,
  onClose,
  onDateSelect,
  initialDate = new Date(),
}: DatePickerModalProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let firstDayIndex = new Date(year, month, 1).getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    for (let i = 0; i < daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentDate]);

  const handleSelectDay = (day: number) => {
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
        className="flex-1 bg-[rgba(0,0,0,0.5)] items-center justify-center"
      >
        <Pressable
          className="bg-backgroundColor rounded-2xl "
          style={{ width: Dimensions.get("window").width * 0.85, padding: 20 }}
        >
          {/** Header & Navigation */}
          <View className="flex-row justify-between items-center">
            <Pressable onPress={() => changeMonth(-1)}>
              <SmoothIcon name="left-chevron" size={24} color={"#242424"} />
            </Pressable>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 16,
                color: "#242424",
              }}
            >
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <Pressable onPress={() => changeMonth(1)}>
              <SmoothIcon name="right-chevron" size={24} color={"#242424"} />
            </Pressable>
          </View>
          {/** Days Row */}
          <View className="flex-row justify-between" style={{ marginTop: 12 }}>
            {DAYS_OF_WEEK.map((day, index) => (
              <Text
                key={index}
                style={{
                  fontFamily: "OpenSans-Regular",
                  color: "#374151",
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
            {calendarDays.map((day, index) => (
              <Pressable
                key={index}
                disabled={!day}
                onPress={() => day && handleSelectDay(day)}
                style={{
                  width: "14.28%",
                  padding: 8,
                  backgroundColor:
                    day === initialDate.getDate() &&
                    currentDate.getMonth() === initialDate.getMonth()
                      ? "#C67C4E"
                      : "transparent",
                }}
                className="items-center justify-center rounded-xl"
              >
                <Text
                  style={{
                    fontFamily: "OpenSans-Regular",
                    color:
                      day === initialDate.getDate() &&
                      currentDate.getMonth() === initialDate.getMonth()
                        ? "#FFFFFF"
                        : day
                          ? "#374151"
                          : "transparent",
                  }}
                >
                  {day || ""}
                </Text>
              </Pressable>
            ))}
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
                color: "#242424",
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
