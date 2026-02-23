import { Tabs } from "expo-router";
import { Home, Search, Calendar, Heart, User } from "lucide-react-native";
import { cssInterop, useColorScheme } from "nativewind";

// Enable className styling for icons
cssInterop(Home, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Search, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Calendar, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(Heart, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});
cssInterop(User, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Ocean Teal theme colors
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#0f2924" : "#f0fdfa",
          borderTopColor: isDark ? "#1a3d36" : "#ccfbf1",
          height: 85,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarActiveTintColor: isDark ? "#5eead4" : "#0d9488",
        tabBarInactiveTintColor: isDark ? "#6b7280" : "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              color={
                focused
                  ? isDark
                    ? "#5eead4"
                    : "#0d9488"
                  : isDark
                    ? "#6b7280"
                    : "#9ca3af"
              }
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Search
              color={
                focused
                  ? isDark
                    ? "#5eead4"
                    : "#0d9488"
                  : isDark
                    ? "#6b7280"
                    : "#9ca3af"
              }
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ focused }) => (
            <Calendar
              color={
                focused
                  ? isDark
                    ? "#5eead4"
                    : "#0d9488"
                  : isDark
                    ? "#6b7280"
                    : "#9ca3af"
              }
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => (
            <Heart
              color={
                focused
                  ? isDark
                    ? "#5eead4"
                    : "#0d9488"
                  : isDark
                    ? "#6b7280"
                    : "#9ca3af"
              }
              size={24}
              strokeWidth={focused ? 2.5 : 2}
              fill={focused ? (isDark ? "#5eead4" : "#0d9488") : "none"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <User
              color={
                focused
                  ? isDark
                    ? "#5eead4"
                    : "#0d9488"
                  : isDark
                    ? "#6b7280"
                    : "#9ca3af"
              }
              size={24}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
