import "../global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>

      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >

        <Stack.Screen
          name="index"
          options={{
            title: "Practice Sessions",
          }}
        />

        <Stack.Screen
          name="practice-form"
          options={{
            title: "Practice",
          }}
        />

      </Stack>

    </SafeAreaProvider>
  );
}