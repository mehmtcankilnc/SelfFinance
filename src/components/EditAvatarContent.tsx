import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useBottomSheet } from "../store/useBottomSheet";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import { avatarData } from "../data/avatarData";
import { useProfile } from "../store/useProfile";

export default function EditAvatarContent() {
  const { closeBottomSheet } = useBottomSheet();
  const { avatar, setAvatar } = useProfile();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: wp(8) }}
      keyboardShouldPersistTaps="handled"
      bounces={false}
    >
      <View
        className="flex-row items-center justify-between border-b border-b-[#EBEBEB]"
        style={{ paddingBottom: wp(2), paddingHorizontal: wp(6) }}
      >
        <Text
          className="text-textColor"
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          Edit Avatar
        </Text>
        <SmoothIcon
          onPress={closeBottomSheet}
          name="close"
          size={24}
          color={"#242424"}
        />
      </View>
      <View
        className="flex-row flex-wrap justify-between"
        style={{ paddingHorizontal: wp(6), paddingTop: wp(2), rowGap: wp(2) }}
      >
        {avatarData.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setAvatar(item.image)}
            style={{ width: wp(15), height: wp(15) }}
          >
            <Image
              source={item.image}
              style={{ width: wp(15), height: wp(15) }}
              resizeMode="contain"
            />
            {avatar === item.image && (
              <View className="absolute bottom-0 right-0 bg-action rounded-full">
                <SmoothIcon name="confirm" size={14} color={"#D8D8D8"} />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
