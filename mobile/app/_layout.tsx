import { Stack, useSegments, useRouter, Redirect } from "expo-router";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import AppProvider from "@/providers/AppProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Slot } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications'

// Prevenir auto-hide del splash screen
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const { aToken, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
      const inAuthGroup = segments[0] === "(auth)";

      if (!isAuthenticated && !inAuthGroup) {
        router.replace("(auth)" as any);
      } else if (isAuthenticated && inAuthGroup) {
        router.replace("(root)/home" as any);
      }
  }, [isAuthenticated, segments]);

  return <Stack screenOptions={{ headerShown: false }}/>;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inria-Regular': require('../assets/fonts/InriaSans-Regular.ttf'),
    'Inria-Medium': require('../assets/fonts/InriaSans-Light.ttf'),
    'Inria-SemiBold': require('../assets/fonts/InriaSans-BoldItalic.ttf'),
    'Inria-Bold': require('../assets/fonts/InriaSans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <Provider store={store}>
      <ToastProvider>
        <AppProvider>
          <Slot/>
        </AppProvider>
      </ToastProvider>
    </Provider>
  );
}