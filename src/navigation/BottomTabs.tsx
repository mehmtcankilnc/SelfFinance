import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import { SmoothIcon } from "smooth-icon";
import { Text, TouchableOpacity, View } from "react-native";
import CenterTabBg from "../components/CenterTabBg";
import EmptyScreen from "../screens/EmptyScreen";
import { useBottomSheet } from "../store/useBottomSheet";

const Tab = createBottomTabNavigator();

const CustomTabButton = ({
  children,
  onPress,
}: {
  children: any;
  onPress: () => void;
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
          backgroundColor: "#C67C4E",
          top: -20,
          borderRadius: 30,
          width: 60,
          height: 60,
          padding: 15,
        }}
      >
        <SmoothIcon name="plus" size={30} color={"#EDEDED"} />
      </View>
      <CenterTabBg />
      {children}
    </View>
  </TouchableOpacity>
);

export default function BottomTabs() {
  const { openBottomSheet } = useBottomSheet();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
          borderTopWidth: 0,
          shadowOpacity: 0,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SmoothIcon
              name="home"
              size={24}
              color={focused ? "#C67C4E" : "#A2A2A2"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#C67C4E" : "#A2A2A2", fontSize: 12 }}
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
              onPress={() => openBottomSheet("ADD_SCREEN")}
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
            openBottomSheet("ADD_SCREEN");
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
              color={focused ? "#C67C4E" : "#A2A2A2"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ color: focused ? "#C67C4E" : "#A2A2A2", fontSize: 12 }}
            >
              Analytics
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
