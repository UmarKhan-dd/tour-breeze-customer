import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Home,
  Calendar,
  Users,
  TrendingUp,
  Plus,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react-native";

// Mock Data
const stats = [
  {
    id: "1",
    label: "Active Listings",
    value: "12",
    icon: Home,
    color: "bg-blue-500",
  },
  {
    id: "2",
    label: "Tour Requests",
    value: "8",
    icon: Calendar,
    color: "bg-green-500",
  },
  {
    id: "3",
    label: "Total Views",
    value: "1.2k",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    id: "4",
    label: "Messages",
    value: "5",
    icon: Users,
    color: "bg-orange-500",
  },
];

const recentRequests = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    propertyTitle: "Modern Downtown Loft",
    date: "Oct 24, 2024",
    time: "10:00 AM",
    status: "Pending",
  },
  {
    id: "2",
    customerName: "Michael Chen",
    propertyTitle: "Suburban Family Home",
    date: "Oct 25, 2024",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    id: "3",
    customerName: "Emily Davis",
    propertyTitle: "Luxury Penthouse",
    date: "Oct 26, 2024",
    time: "11:30 AM",
    status: "Pending",
  },
];

type StatItem = (typeof stats)[0];
type RequestItem = (typeof recentRequests)[0];

export default function AgentDashboardScreen() {
  const renderStatCard = (item: StatItem) => {
    const Icon = item.icon;
    return (
      <View className="flex-1 bg-card rounded-2xl p-4 shadow-sm border border-border">
        <View
          className={`w-10 h-10 ${item.color} rounded-full items-center justify-center mb-3`}
        >
          <Icon size={20} color="white" />
        </View>
        <Text className="text-2xl font-bold text-foreground">{item.value}</Text>
        <Text className="text-sm text-muted-foreground">{item.label}</Text>
      </View>
    );
  };

  const renderRequestItem = (item: RequestItem) => (
    <View className="bg-card rounded-xl p-4 mb-3 shadow-sm border border-border flex-row items-center justify-between">
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Users size={16} className="text-primary" />
          <Text className="font-semibold text-foreground">
            {item.customerName}
          </Text>
        </View>
        <Text className="text-sm text-muted-foreground mb-2" numberOfLines={1}>
          {item.propertyTitle}
        </Text>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1">
            <Calendar size={14} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">{item.date}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Clock size={14} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">{item.time}</Text>
          </View>
        </View>
      </View>
      <View className="ml-3">
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "Confirmed" ? "bg-green-100" : "bg-yellow-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              item.status === "Confirmed" ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {item.status}
          </Text>
        </View>
        <ChevronRight
          size={20}
          className="text-muted-foreground self-center mt-2"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-foreground">
            Agent Dashboard
          </Text>
          <Text className="text-sm text-muted-foreground">
            Welcome back, Agent!
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          {stats.map((stat) => (
            <View key={stat.id} className="flex-1 min-w-[45%]">
              {renderStatCard(stat)}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-foreground mb-3">
            Quick Actions
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-primary rounded-xl p-4 flex-row items-center justify-center shadow-sm">
              <Plus size={20} color="white" className="mr-2" />
              <Text className="text-white font-semibold">Add Listing</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-card border border-border rounded-xl p-4 flex-row items-center justify-center shadow-sm">
              <Calendar size={20} className="text-primary mr-2" />
              <Text className="text-primary font-semibold">My Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Tour Requests */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">
              Recent Tour Requests
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-primary font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentRequests}
            renderItem={({ item }) => renderRequestItem(item)}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
