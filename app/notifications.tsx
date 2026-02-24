import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Bell,
  Calendar,
  Home,
  Info,
  CheckCircle,
  Clock,
  Trash2,
  ChevronLeft,
} from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// Mock notification data
const notificationsData = [
  {
    id: 1,
    type: "appointment",
    title: "Tour Reminder",
    message:
      "Your tour for 123 Ocean View is scheduled for tomorrow at 2:00 PM",
    time: "2 hours ago",
    isRead: false,
    icon: Calendar,
    color: "#0d9488",
  },
  {
    id: 2,
    type: "property",
    title: "New Property Match",
    message: "A new property matching your criteria is available in Downtown",
    time: "5 hours ago",
    isRead: false,
    icon: Home,
    color: "#3b82f6",
  },
  {
    id: 3,
    type: "system",
    title: "Account Updated",
    message: "Your profile information has been successfully updated",
    time: "1 day ago",
    isRead: true,
    icon: Info,
    color: "#f59e0b",
  },
  {
    id: 4,
    type: "appointment",
    title: "Tour Confirmed",
    message: "Your tour request for 456 Mountain Ave has been confirmed",
    time: "2 days ago",
    isRead: true,
    icon: Calendar,
    color: "#0d9488",
  },
  {
    id: 5,
    type: "property",
    title: "Price Drop Alert",
    message: "The price for 789 Sunset Blvd has dropped by $50,000",
    time: "3 days ago",
    isRead: true,
    icon: Home,
    color: "#3b82f6",
  },
];

type NotificationItem = (typeof notificationsData)[0];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleFilterChange = useCallback((newFilter: "all" | "unread") => {
    setFilter(newFilter);
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const renderNotification = ({
    item,
    index,
  }: {
    item: NotificationItem;
    index: number;
  }) => {
    const Icon = item.icon;
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 50).springify()}
        className="mb-3"
      >
        <TouchableOpacity
          onPress={() => !item.isRead && markAsRead(item.id)}
          activeOpacity={0.7}
        >
          <View
            className={`p-4 rounded-xl border ${!item.isRead ? "bg-card border-primary/30" : "bg-card border-border"}`}
            style={
              !item.isRead
                ? {
                    shadowColor: item.color,
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 2 },
                  }
                : {}
            }
          >
            <View className="flex-row gap-3">
              {/* Icon */}
              <View
                className="w-12 h-12 rounded-full items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <Icon size={22} color={item.color} />
              </View>

              {/* Content */}
              <View className="flex-1">
                <View className="flex-row items-start justify-between">
                  <Text
                    className={`text-base font-semibold ${!item.isRead ? "text-foreground" : "text-foreground/80"}`}
                  >
                    {item.title}
                  </Text>
                  {!item.isRead && (
                    <View className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </View>
                <Text
                  className="text-sm text-muted-foreground mt-1 pr-8"
                  numberOfLines={2}
                >
                  {item.message}
                </Text>
                <View className="flex-row items-center gap-2 mt-2">
                  <Clock size={12} color="#9ca3af" />
                  <Text className="text-xs text-muted-foreground">
                    {item.time}
                  </Text>
                </View>
              </View>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => deleteNotification(item.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={18} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 bg-card rounded-full border border-border"
            >
              <ChevronLeft
                size={20}
                className="text-foreground"
                strokeWidth={2.5}
              />
            </TouchableOpacity>
            <View className="relative">
              <Bell
                size={24}
                color="rgb(15, 23, 42)"
                className="dark:text-foreground"
              />
              {unreadCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-destructive w-4 h-4 rounded-full items-center justify-center border-2 border-background">
                  <Text className="text-[10px] text-white font-bold">
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-2xl font-bold text-foreground">
              Notifications
            </Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-6 py-4">
        <View className="flex-row bg-muted rounded-lg p-1">
          <TouchableOpacity
            onPress={() => handleFilterChange("all")}
            className={`flex-1 py-2 rounded-md ${filter === "all" ? "bg-background shadow-sm" : ""}`}
          >
            <Text
              className={`text-center text-sm font-medium ${filter === "all" ? "text-foreground" : "text-muted-foreground"}`}
            >
              All ({notifications.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleFilterChange("unread")}
            className={`flex-1 py-2 rounded-md ${filter === "unread" ? "bg-background shadow-sm" : ""}`}
          >
            <Text
              className={`text-center text-sm font-medium ${filter === "unread" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            unreadCount > 0 && (
              <Animated.View entering={FadeIn} className="mb-4">
                <TouchableOpacity
                  onPress={markAllAsRead}
                  className="flex-row items-center justify-center gap-2 py-3 bg-card border border-border rounded-xl"
                >
                  <CheckCircle size={18} color="#0d9488" />
                  <Text className="text-sm font-medium text-primary">
                    Mark all as read
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full bg-muted items-center justify-center mb-4">
            <Bell size={32} color="#9ca3af" />
          </View>
          <Text className="text-xl font-semibold text-foreground mb-2">
            No Notifications
          </Text>
          <Text className="text-sm text-muted-foreground text-center">
            {filter === "unread"
              ? "You're all caught up! No unread notifications."
              : "You don't have any notifications yet."}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
