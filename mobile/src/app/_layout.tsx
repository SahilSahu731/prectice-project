import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}