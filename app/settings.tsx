import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ChevronRight,
  User,
  CreditCard,
  FileText,
  Shield,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

type SettingItem = {
  id: string;
  title: string;
  icon: any;
  color: string;
  screen?: string;
  action?: () => void;
  destructive?: boolean;
};

const accountSettings: SettingItem[] = [
  {
    id: "1",
    title: "Edit Profile",
    icon: User,
    color: "#0d9488",
    screen: "edit-profile",
  },
  {
    id: "2",
    title: "Payment Methods",
    icon: CreditCard,
    color: "#0d9488",
    screen: "payment-methods",
  },
  {
    id: "3",
    title: "Contract History",
    icon: FileText,
    color: "#0d9488",
    screen: "contract-history",
  },
];

const appSettings: SettingItem[] = [
  {
    id: "4",
    title: "Agent Block List",
    icon: Shield,
    color: "#6b7280",
    screen: "block-list",
  },
  {
    id: "5",
    title: "Privacy Policy",
    icon: Shield,
    color: "#6b7280",
    screen: "privacy-policy",
  },
];

const dangerSettings: SettingItem[] = [
  {
    id: "6",
    title: "Delete Account",
    icon: Trash2,
    color: "#ef4444",
    action: () =>
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => console.log("Delete account"),
          },
        ],
      ),
    destructive: true,
  },
];

export default function SettingsScreen() {
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => console.log("Logout"),
      },
    ]);
  };

  const renderSettingItem = ({
    item,
    index,
  }: {
    item: SettingItem;
    index: number;
  }) => {
    const Icon = item.icon;
    return (
      <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
        <TouchableOpacity
          className="bg-card rounded-xl p-4 flex-row items-center justify-between border border-border"
          onPress={item.action}
        >
          <View className="flex-row items-center gap-3">
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Icon size={20} color={item.color} />
            </View>
            <Text
              className={`text-base font-medium ${item.destructive ? "text-destructive" : "text-foreground"}`}
            >
              {item.title}
            </Text>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-foreground">Settings</Text>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Settings */}
        <Animated.View entering={FadeIn} className="px-6 mb-6">
          <Text className="text-lg font-bold text-foreground mb-3">
            Account
          </Text>
          <View className="gap-2">
            {accountSettings.map((item, index) =>
              renderSettingItem({ item, index }),
            )}
          </View>
        </Animated.View>

        {/* App Settings */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="px-6 mb-6"
        >
          <Text className="text-lg font-bold text-foreground mb-3">
            App Settings
          </Text>
          <View className="gap-2">
            {appSettings.map((item, index) =>
              renderSettingItem({ item, index }),
            )}
          </View>
        </Animated.View>

        {/* Theme Section */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="px-6 mb-6"
        >
          <Text className="text-lg font-bold text-foreground mb-3">
            Appearance
          </Text>
          <View className="bg-card rounded-xl p-4 border border-border">
            <Text className="text-sm text-muted-foreground mb-3">
              Theme Mode
            </Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="flex-1 bg-background rounded-lg p-3 items-center border border-border">
                <Sun size={20} color="#6b7280" />
                <Text className="text-xs text-muted-foreground mt-1">
                  Light
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-background rounded-lg p-3 items-center border border-border">
                <Moon size={20} color="#6b7280" />
                <Text className="text-xs text-muted-foreground mt-1">Dark</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg p-3 items-center border border-primary/30">
                <Monitor size={20} color="#0d9488" />
                <Text className="text-xs text-primary mt-1">System</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Danger Zone */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="px-6 mb-6"
        >
          <Text className="text-lg font-bold text-foreground mb-3">
            Danger Zone
          </Text>
          <View className="gap-2">
            {dangerSettings.map((item, index) =>
              renderSettingItem({ item, index }),
            )}
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          className="px-6"
        >
          <TouchableOpacity
            className="bg-destructive/10 rounded-xl p-4 flex-row items-center justify-center gap-2 border border-destructive/20"
            onPress={handleLogout}
          >
            <LogOut size={20} color="#ef4444" />
            <Text className="text-base font-semibold text-destructive">
              Log Out
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Version Info */}
        <View className="px-6 mt-6 mb-4">
          <Text className="text-center text-xs text-muted-foreground">
            Tour Breeze v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
