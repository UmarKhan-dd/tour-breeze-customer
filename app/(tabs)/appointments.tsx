/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Edit,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// Mock data for appointments
const appointmentsData = {
  open: [
    {
      id: 1,
      propertyTitle: "Modern Downtown Apartment",
      propertyImage:
        "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
      address: "123 Main Street, Downtown",
      startDate: "Jan 20, 2025",
      endDate: "Jan 22, 2025",
      time: "10:00 AM - 12:00 PM",
      agentName: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      propertyTitle: "Luxury Waterfront Villa",
      propertyImage:
        "https://images.unsplash.com/photo-1577919518833-57dc0a0105e1?w=900&auto=format&fit=crop&q=60",
      address: "456 Ocean Drive, Marina Bay",
      startDate: "Jan 25, 2025",
      endDate: "Jan 25, 2025",
      time: "2:00 PM - 4:00 PM",
      agentName: "Michael Chen",
      agentAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    },
  ],
  submitted: [
    {
      id: 3,
      propertyTitle: "Cozy Suburban Home",
      propertyImage:
        "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=900&auto=format&fit=crop&q=60",
      address: "789 Maple Lane, Suburbs",
      startDate: "Jan 18, 2025",
      endDate: "Jan 18, 2025",
      time: "11:00 AM - 1:00 PM",
      agentName: "Emily Davis",
      agentAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
      submittedAt: "Jan 15, 2025 at 9:30 AM",
    },
  ],
  confirmed: [
    {
      id: 4,
      propertyTitle: "Modern Downtown Apartment",
      propertyImage:
        "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
      address: "123 Main Street, Downtown",
      startDate: "Jan 15, 2025",
      endDate: "Jan 15, 2025",
      time: "10:00 AM - 12:00 PM",
      agentName: "Sarah Johnson",
      agentAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
      confirmedAt: "Jan 14, 2025 at 3:45 PM",
    },
  ],
  completed: [
    {
      id: 5,
      propertyTitle: "Sunset Beach House",
      propertyImage:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=60",
      address: "321 Palm Street, Beachside",
      startDate: "Jan 10, 2025",
      endDate: "Jan 10, 2025",
      time: "3:00 PM - 5:00 PM",
      agentName: "Robert Wilson",
      agentAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      completedAt: "Jan 10, 2025 at 5:15 PM",
    },
  ],
};

type Appointment = (typeof appointmentsData.open)[0];

type TabKey = keyof typeof appointmentsData;

const tabs = [
  { key: "open" as TabKey, label: "Open", icon: AlertCircle },
  { key: "submitted" as TabKey, label: "Submitted", icon: Clock },
  { key: "confirmed" as TabKey, label: "Confirmed", icon: CheckCircle },
  { key: "completed" as TabKey, label: "Completed", icon: XCircle },
];

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("open");
  const currentAppointments = appointmentsData[activeTab];

  const renderAppointmentCard = ({
    item,
    index,
  }: {
    item: Appointment;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      className="mb-4"
    >
      <View className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
        {/* Property Image */}
        <Image
          source={{ uri: item.propertyImage }}
          className="w-full h-40"
          resizeMode="cover"
        />

        <View className="p-4">
          {/* Property Title & Address */}
          <Text
            className="text-lg font-bold text-foreground mb-1"
            numberOfLines={1}
          >
            {item.propertyTitle}
          </Text>
          <View className="flex-row items-center gap-1 mb-3">
            <MapPin size={14} color="#6b7280" />
            <Text
              className="text-sm text-muted-foreground flex-1"
              numberOfLines={1}
            >
              {item.address}
            </Text>
          </View>

          {/* Date & Time */}
          <View className="flex-row gap-4 mb-3">
            <View className="flex-1 bg-muted/50 rounded-lg p-3">
              <View className="flex-row items-center gap-2 mb-1">
                <Calendar size={16} color="#0d9488" />
                <Text className="text-xs font-semibold text-muted-foreground uppercase">
                  Date
                </Text>
              </View>
              <Text className="text-sm font-medium text-foreground">
                {item.startDate}
              </Text>
              {item.endDate !== item.startDate && (
                <Text className="text-xs text-muted-foreground">
                  to {item.endDate}
                </Text>
              )}
            </View>
            <View className="flex-1 bg-muted/50 rounded-lg p-3">
              <View className="flex-row items-center gap-2 mb-1">
                <Clock size={16} color="#0d9488" />
                <Text className="text-xs font-semibold text-muted-foreground uppercase">
                  Time
                </Text>
              </View>
              <Text className="text-sm font-medium text-foreground">
                {item.time}
              </Text>
            </View>
          </View>

          {/* Agent Info */}
          <View className="flex-row items-center gap-3 mb-4 p-3 bg-muted/30 rounded-xl">
            <Image
              source={{ uri: item.agentAvatar }}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground">
                Agent: {item.agentName}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Your tour guide
              </Text>
            </View>
          </View>

          {/* Action Buttons based on tab */}
          {activeTab === "open" && (
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-secondary rounded-xl py-3 flex-row items-center justify-center gap-2">
                <Edit
                  size={18}
                  color={activeTab === "open" ? "#134e4a" : "#6b7280"}
                />
                <Text className="font-semibold text-foreground">
                  Reschedule
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary rounded-xl py-3 flex-row items-center justify-center gap-2">
                <Text className="font-semibold text-primary-foreground">
                  Set Appointment
                </Text>
                <ChevronRight size={18} color="white" />
              </TouchableOpacity>
            </View>
          )}

          {activeTab === "submitted" && (
            <View className="bg-teal-50 dark:bg-teal-950/30 rounded-xl p-3">
              <Text className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                Submitted on {item.submittedAt}
              </Text>
              <Text className="text-xs text-muted-foreground mt-1">
                Waiting for agent confirmation
              </Text>
            </View>
          )}

          {activeTab === "confirmed" && (
            <View className="bg-green-50 dark:bg-green-950/30 rounded-xl p-3">
              <View className="flex-row items-center gap-2">
                <CheckCircle size={16} color="#059669" />
                <Text className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Confirmed on {item.confirmedAt}
                </Text>
              </View>
            </View>
          )}

          {activeTab === "completed" && (
            <View className="bg-slate-50 dark:bg-slate-950/30 rounded-xl p-3">
              <View className="flex-row items-center gap-2">
                <XCircle size={16} color="#64748b" />
                <Text className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Completed on {item.completedAt}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-muted-foreground">Manage your</Text>
            <Text className="text-2xl font-bold text-foreground">
              Appointments
            </Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      {/* Tabs */}
      <Animated.View entering={FadeIn.delay(100)} className="px-6 pt-4 pb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            const count = appointmentsData[tab.key].length;

            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`flex-row items-center gap-2 px-4 py-2.5 rounded-full border ${
                  isActive
                    ? "bg-primary border-primary"
                    : "bg-card border-border"
                }`}
              >
                <Icon size={18} color={isActive ? "white" : "#6b7280"} />
                <Text
                  className={`font-medium ${
                    isActive ? "text-primary-foreground" : "text-foreground"
                  }`}
                >
                  {tab.label}
                </Text>
                {count > 0 && (
                  <View
                    className={`px-2 py-0.5 rounded-full ${
                      isActive ? "bg-primary-foreground/20" : "bg-muted"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* Appointments List */}
      <View className="flex-1 px-6 pt-4">
        {currentAppointments.length > 0 ? (
          <FlatList
            data={currentAppointments}
            renderItem={renderAppointmentCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
          />
        ) : (
          <Animated.View
            entering={FadeIn}
            className="flex-1 items-center justify-center py-20"
          >
            <View className="bg-muted/50 rounded-full p-6 mb-4">
              <Calendar size={48} color="#9ca3af" />
            </View>
            <Text className="text-xl font-bold text-foreground mb-2">
              No Appointments
            </Text>
            <Text className="text-sm text-muted-foreground text-center px-8">
              You don't have any {activeTab} appointments. Start exploring
              properties to schedule your first tour!
            </Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
