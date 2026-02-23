import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Calendar as CalendarIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// Mock data for calendar appointments
const mockAppointments = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Apartment",
    propertyAddress: "123 Main Street, Downtown",
    customerName: "John Smith",
    customerPhone: "+1 (555) 123-4567",
    date: "2025-01-15",
    time: "10:00 AM",
    duration: "1 hour",
    status: "Confirmed",
    propertyImage:
      "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    propertyTitle: "Luxury Waterfront Villa",
    propertyAddress: "456 Ocean Drive, Marina Bay",
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 234-5678",
    date: "2025-01-15",
    time: "2:00 PM",
    duration: "45 min",
    status: "Pending",
    propertyImage:
      "https://images.unsplash.com/photo-1577919518833-57dc0a0105e1?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    propertyTitle: "Cozy Suburban Home",
    propertyAddress: "789 Maple Lane, Suburbs",
    customerName: "Mike Davis",
    customerPhone: "+1 (555) 345-6789",
    date: "2025-01-16",
    time: "11:00 AM",
    duration: "1 hour",
    status: "Confirmed",
    propertyImage:
      "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    propertyTitle: "Urban Loft Studio",
    propertyAddress: "321 City Center Ave",
    customerName: "Emily Brown",
    customerPhone: "+1 (555) 456-7890",
    date: "2025-01-16",
    time: "3:30 PM",
    duration: "30 min",
    status: "Pending",
    propertyImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    propertyTitle: "Beachfront Condo",
    propertyAddress: "555 Sunset Blvd",
    customerName: "David Wilson",
    customerPhone: "+1 (555) 567-8901",
    date: "2025-01-17",
    time: "10:00 AM",
    duration: "1 hour",
    status: "Confirmed",
    propertyImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=60",
  },
];

type Appointment = (typeof mockAppointments)[0];
type StatusFilter = "All" | "Confirmed" | "Pending";

// Generate week dates
const generateWeekDates = () => {
  const dates = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = -2; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      day: dayNames[date.getDay()],
      date: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
      isToday: i === 0,
    });
  }
  return dates;
};

const weekDates = generateWeekDates();

export default function AgentCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(weekDates[2].fullDate); // Default to today
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter appointments by selected date and status
  const filteredAppointments = mockAppointments.filter((apt) => {
    const matchesDate = apt.date === selectedDate;
    const matchesStatus = statusFilter === "All" || apt.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle size={14} />;
      case "Pending":
        return <AlertCircle size={14} />;
      default:
        return <XCircle size={14} />;
    }
  };

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
      <TouchableOpacity className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
        <View className="relative">
          <Image
            source={{ uri: item.propertyImage }}
            className="w-full h-36"
            resizeMode="cover"
          />
          <View
            className={`absolute top-3 right-3 px-3 py-1 rounded-full flex-row items-center gap-1 ${getStatusColor(item.status)}`}
          >
            {getStatusIcon(item.status)}
            <Text className="text-xs font-semibold">{item.status}</Text>
          </View>
        </View>
        <View className="p-4">
          <Text
            className="text-lg font-bold text-foreground mb-1"
            numberOfLines={1}
          >
            {item.propertyTitle}
          </Text>
          <View className="flex-row items-center gap-1 mb-2">
            <MapPin size={14} color="#6b7280" />
            <Text
              className="text-sm text-muted-foreground flex-1"
              numberOfLines={1}
            >
              {item.propertyAddress}
            </Text>
          </View>

          <View className="flex-row items-center gap-4 mb-3 pt-3 border-t border-border">
            <View className="flex-row items-center gap-1">
              <Clock size={16} color="#0d9488" />
              <Text className="text-sm font-medium text-foreground">
                {item.time}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <User size={16} color="#6b7280" />
              <Text className="text-sm text-muted-foreground">
                {item.customerName}
              </Text>
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl items-center">
              <Text className="text-primary-foreground font-semibold text-sm">
                View Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-secondary py-3 rounded-xl items-center">
              <Text className="text-secondary-foreground font-semibold text-sm">
                Contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="w-10 h-10 bg-card rounded-full items-center justify-center border border-border">
            <ChevronLeft size={20} color="#6b7280" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-foreground">Calendar</Text>
            <Text className="text-sm text-muted-foreground">
              Manage your tours
            </Text>
          </View>
          <ThemeToggle />
        </View>

        {/* Filter Button */}
        <View className="relative">
          <TouchableOpacity
            className="flex-row items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border self-start"
            onPress={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Filter size={18} color="#0d9488" />
            <Text className="text-sm font-medium text-foreground">
              Status: {statusFilter}
            </Text>
          </TouchableOpacity>

          {showFilterDropdown && (
            <View
              className="absolute top-12 left-0 bg-card rounded-xl border border-border shadow-lg z-10"
              style={{ width: 150 }}
            >
              {(["All", "Confirmed", "Pending"] as StatusFilter[]).map(
                (filter) => (
                  <TouchableOpacity
                    key={filter}
                    className="px-4 py-3 border-b border-border last:border-b-0"
                    onPress={() => {
                      setStatusFilter(filter);
                      setShowFilterDropdown(false);
                    }}
                  >
                    <Text
                      className={`text-sm ${statusFilter === filter ? "text-teal-600 dark:text-teal-400 font-semibold" : "text-muted-foreground"}`}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selector */}
        <Animated.View entering={FadeIn} className="mb-6">
          <View className="px-6 mb-3">
            <Text className="text-sm font-semibold text-muted-foreground">
              SELECT DATE
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {weekDates.map((date, index) => {
              const isSelected = date.fullDate === selectedDate;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(date.fullDate)}
                  className={`mr-3 rounded-2xl p-3 items-center justify-center border ${
                    isSelected
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  }`}
                  style={{ width: 60, height: 70 }}
                >
                  <Text
                    className={`text-xs mb-1 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {date.day}
                  </Text>
                  <Text
                    className={`text-xl font-bold ${isSelected ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {date.date}
                  </Text>
                  {date.isToday && (
                    <View
                      className={`w-1 h-1 rounded-full mt-1 ${isSelected ? "bg-primary-foreground" : "bg-primary"}`}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Appointments List */}
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <View className="px-6 mb-3 flex-row items-center justify-between">
            <Text className="text-sm font-semibold text-muted-foreground">
              {filteredAppointments.length} TOUR
              {filteredAppointments.length !== 1 ? "S" : ""}
            </Text>
            <Text className="text-sm text-teal-600 dark:text-teal-400 font-medium">
              {selectedDate}
            </Text>
          </View>

          {filteredAppointments.length > 0 ? (
            <View className="px-6">
              {filteredAppointments.map((item, index) =>
                renderAppointmentCard({ item, index }),
              )}
            </View>
          ) : (
            <View className="px-6 py-12 items-center">
              <CalendarIcon size={48} color="#cbd5e1" />
              <Text className="text-muted-foreground mt-4 text-center">
                No tours scheduled for this date
              </Text>
              <Text className="text-muted-foreground text-sm text-center">
                Select another date to view appointments
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
