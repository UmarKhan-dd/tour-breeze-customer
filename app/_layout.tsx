import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import "@/global.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/lib/AuthContext";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#0d9488" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? "(tabs)" : "login"}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="tour-request-detail" />
      <Stack.Screen name="agent-blocklist" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="schedule-tour" />
      <Stack.Screen name="property-detail" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
