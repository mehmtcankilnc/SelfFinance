import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SmoothIcon } from "smooth-icon";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../components/CustomTextInput";
import CustomDropdown from "../components/CustomDropdown";
import { useBottomSheet } from "../store/useBottomSheet";
import { useProfile } from "../store/useProfile";
import { avatarData } from "../data/avatarData";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheet();
  const { displayName, setDisplayName, currency, setCurrency, avatar } =
    useProfile();

  return (
    <View className="flex-1 bg-backgroundColor">
      {/** Header */}
      <View
        className="justify-center items-center bg-headerBg rounded-b-2xl"
        style={{ paddingVertical: wp(6) }}
      >
        <SmoothIcon
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: wp(3),
          }}
          name="left-chevron"
          size={32}
          color="#D8D8D8"
        />
        <Text
          style={{
            fontFamily: "Poppins-SemiBold",
            fontSize: 24,
            lineHeight: 36,
            color: "#D8D8D8",
          }}
        >
          Profile
        </Text>
      </View>
      {/** Avatar */}
      <View
        className="bg-[#79A8FF] rounded-full self-center items-center justify-center"
        style={{ width: wp(40), height: wp(40), marginTop: wp(10) }}
      >
        <Image
          source={avatarData.find((av) => av.id === avatar)?.image}
          style={{ width: wp(25), height: wp(25) }}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => openBottomSheet("EDIT_AVATAR")}
          className="absolute rounded-full bg-headerBg bottom-0 right-0"
          style={{ padding: wp(1.5) }}
        >
          <SmoothIcon name="edit" size={24} color={"#D8D8D8"} />
        </Pressable>
      </View>
      {/** Content */}
      <View style={{ paddingHorizontal: wp(6), marginTop: wp(10), gap: wp(3) }}>
        {/** Display Name */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Display Name
          </Text>
          <CustomTextInput
            text={displayName}
            onTextChange={(val) => setDisplayName(val)}
            placeholder={"Name"}
          />
        </View>
        {/** Currency */}
        <View style={{ gap: wp(1) }}>
          <Text
            className="text-secondaryText"
            style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}
          >
            Currency
          </Text>
          <CustomDropdown
            dropdownData={[
              { id: 1, title: "USD ($)" },
              { id: 2, title: "EUR (€)" },
              { id: 3, title: "JPY (¥)" },
              { id: 4, title: "GBP (£)" },
              { id: 5, title: "TRY (₺)" },
            ]}
            selectedTitle={currency}
            placeholder="Choose"
            onSelect={(curr) => setCurrency(curr.title)}
          />
        </View>
      </View>
    </View>
  );
}
