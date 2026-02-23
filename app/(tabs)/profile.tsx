import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Settings,
  Bell,
  Calendar,
  User,
  MapPin,
  Mail,
  ChevronRight,
  LogOut,
  Heart,
  Clock,
} from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// Mock user data
const user = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar:
    "https://images.unsplash.com/photo-1517340073101-289191978ae8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fDMlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
};

// Mock stats
const stats = [
  {
    id: 1,
    label: "Tours Completed",
    value: "24",
    icon: Calendar,
    color: "#0d9488",
  },
  { id: 2, label: "Favorites", value: "12", icon: Heart, color: "#ef4444" },
  { id: 3, label: "Upcoming", value: "3", icon: Clock, color: "#f59e0b" },
];

// Quick links data
const quickLinks = [
  {
    id: 1,
    title: "Settings",
    icon: Settings,
    color: "#6b7280",
    screen: "settings",
  },
  {
    id: 2,
    title: "Notifications",
    icon: Bell,
    color: "#6b7280",
    screen: "notifications",
  },
  {
    id: 3,
    title: "Appointment History",
    icon: Calendar,
    color: "#6b7280",
    screen: "appointments",
  },
];

type StatItem = (typeof stats)[0];
type LinkItem = (typeof quickLinks)[0];

export default function ProfileScreen() {
  const renderStatCard = ({
    item,
    index,
  }: {
    item: StatItem;
    index: number;
  }) => {
    const Icon = item.icon;
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100).springify()}
        className="flex-1"
      >
        <View className="bg-card rounded-2xl p-4 items-center border border-border shadow-sm">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mb-3"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <Icon size={24} color={item.color} />
          </View>
          <Text className="text-2xl font-bold text-foreground">
            {item.value}
          </Text>
          <Text className="text-xs text-muted-foreground mt-1 text-center">
            {item.label}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderQuickLink = ({
    item,
    index,
  }: {
    item: LinkItem;
    index: number;
  }) => {
    const Icon = item.icon;
    return (
      <Animated.View entering={FadeInDown.delay(300 + index * 100).springify()}>
        <TouchableOpacity className="bg-card rounded-xl p-4 flex-row items-center justify-between border border-border">
          <View className="flex-row items-center gap-3">
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <Icon size={20} color={item.color} />
            </View>
            <Text className="text-base font-medium text-foreground">
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
          <Text className="text-2xl font-bold text-foreground">Profile</Text>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View entering={FadeIn} className="px-6 mb-6">
          <View className="bg-card rounded-2xl p-6 items-center border border-border shadow-sm">
            <View className="relative mb-4">
              <Image
                source={{ uri: user.avatar }}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 right-0 bg-primary w-7 h-7 rounded-full items-center justify-center border-2 border-card">
                <User size={14} color="white" />
              </View>
            </View>

            <Text className="text-xl font-bold text-foreground mb-1">
              {user.name}
            </Text>
            <Text className="text-sm text-muted-foreground mb-4">
              {user.email}
            </Text>

            <View className="w-full gap-3">
              <View className="flex-row items-center gap-3">
                <Mail size={16} color="#6b7280" />
                <Text className="text-sm text-foreground">{user.email}</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <MapPin size={16} color="#6b7280" />
                <Text className="text-sm text-foreground">{user.location}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="px-6 mb-6"
        >
          <View className="flex-row gap-3">
            {stats.map((item, index) => renderStatCard({ item, index }))}
          </View>
        </Animated.View>

        {/* Quick Links */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="px-6 mb-6"
        >
          <Text className="text-lg font-bold text-foreground mb-3">
            Quick Links
          </Text>
          <View className="gap-2">
            {quickLinks.map((item, index) => renderQuickLink({ item, index }))}
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View
          entering={FadeInDown.delay(600).springify()}
          className="px-6"
        >
          <TouchableOpacity className="bg-destructive/10 rounded-xl p-4 flex-row items-center justify-center gap-2 border border-destructive/20">
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
