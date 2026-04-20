import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { useBottomSheet } from "../store/useBottomSheet";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import { avatarData, profileColorData } from "../data/profileData";
import { useProfile } from "../store/useProfile";

export default function EditProfileContent() {
  const { closeBottomSheet } = useBottomSheet();
  const { avatar, profileColor, setAvatar, setProfileColor } = useProfile();

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
          Edit
        </Text>
        <SmoothIcon
          onPress={closeBottomSheet}
          name="close"
          size={24}
          color={"#242424"}
        />
      </View>
      <View style={{ paddingHorizontal: wp(6), paddingTop: wp(2), gap: wp(3) }}>
        {/** Edit Profile Color */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Profile Color
          </Text>
          <View className="flex-row justify-between">
            {profileColorData.map((item) => (
              <Pressable
                className="rounded-md items-center justify-center"
                key={item.id}
                style={{
                  backgroundColor: item.colorCode,
                  width: wp(7),
                  height: wp(7),
                }}
                onPress={() => setProfileColor(item.colorCode)}
              >
                {profileColor === item.colorCode && (
                  <SmoothIcon name="confirm" size={24} color={"#111827"} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        {/** Edit Avatar */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Avatar
          </Text>
          <View
            className="flex-row flex-wrap justify-between"
            style={{ rowGap: wp(2) }}
          >
            {avatarData.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setAvatar(item.id)}
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
        </View>
      </View>
    </ScrollView>
  );
}
