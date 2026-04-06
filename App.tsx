import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomTabs from "./src/navigation/BottomTabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import GlobalBottomSheet from "./src/components/GlobalBottomSheet";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import DropdownProvider from "./src/providers/DropdownProvider";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#313131" }}
          edges={["top", "left", "right"]}
        >
          <DropdownProvider>
            <NavigationContainer>
              <BottomTabs />
              <GlobalBottomSheet />
            </NavigationContainer>
          </DropdownProvider>
        </SafeAreaView>
        <StatusBar style="light" backgroundColor="black" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
