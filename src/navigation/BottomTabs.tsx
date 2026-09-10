import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import SmoothIcon from "smooth-icon";
import { Text, TouchableOpacity, View } from "react-native";
import CenterTabBg from "../components/CenterTabBg";
import EmptyScreen from "../screens/EmptyScreen";
import { useBottomSheet } from "../store/useBottomSheet";
import { ReactNode } from "react";
import { useThemeColors } from "../theme/useThemeColors";
import { haptics } from "../utilities/haptics";

const Tab = createBottomTabNavigator();

const CustomTabButton = ({
  children,
  onPress,
  notchColor,
  actionColor,
}: {
  children: ReactNode;
  onPress: () => void;
  notchColor: string;
  actionColor: string;
}) => (
  <TouchableOpacity
    style={{ justifyContent: "center", alignItems: "center" }}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View className="items-center justify-center">
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          backgroundColor: actionColor,
          top: -20,
          borderRadius: 30,
          width: 60,
          height: 60,
          padding: 15,
        }}
      >
        <SmoothIcon name="plus" size={30} color={"#EDEDED"} />
      </View>
      <CenterTabBg color={notchColor} />
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabs() {
  const { openBottomSheet } = useBottomSheet();
  const { c } = useThemeColors();

  const openAdd = () => {
    haptics.tapLight();
    openBottomSheet("ADD_SCREEN");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: c.tabBar,
          elevation: 0,
          borderTopWidth: 0,
          shadowOpacity: 0,
          height: 70,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SmoothIcon
              name="home"
              size={24}
              color={focused ? c.tabActive : c.tabInactive}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? c.tabActive : c.tabInactive,
                fontSize: 12,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={EmptyScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              onPress={openAdd}
              notchColor={c.background}
              actionColor={c.action}
            />
          ),
          tabBarIconStyle: {
            display: "none",
          },
          tabBarLabelStyle: {
            display: "none",
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            openAdd();
          },
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SmoothIcon
              name="chart"
              size={24}
              color={focused ? c.tabActive : c.tabInactive}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? c.tabActive : c.tabInactive,
                fontSize: 12,
              }}
            >
              Analytics
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
