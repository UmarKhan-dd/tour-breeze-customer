import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react-native";
import { ThemeToggle } from "@/components/ThemeToggle";

type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

interface Appointment {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  propertyImage: string;
  propertyPrice: string;
  agent: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    rating: number;
  };
  date: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  notes?: string;
}

export default function AppointmentDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  // Mock appointment data
  const appointment: Appointment = {
    id: "APT-001",
    propertyId: "PROP-123",
    propertyName: "Luxury Oceanfront Villa",
    propertyAddress: "123 Ocean Drive, Miami Beach, FL 33139",
    propertyImage:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60",
    propertyPrice: "$2,450,000",
    agent: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@realestate.com",
      rating: 4.9,
    },
    date: "2024-02-15",
    time: "10:00 AM",
    duration: "1 hour",
    status: "confirmed",
    notes:
      "Please bring additional property documentation and discuss neighborhood amenities.",
  };

  // Mock available time slots
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Mock next 7 days
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: date.getDate(),
      });
    }
    return days;
  };

  const upcomingDates = getNextDays();

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const handleReschedule = () => {
    Alert.alert(
      "Reschedule Appointment",
      "Are you sure you want to reschedule this appointment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert(
              "Success",
              "Your appointment has been rescheduled successfully.",
            );
          },
        },
      ],
    );
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert("Cancelled", "Your appointment has been cancelled.");
          },
        },
      ],
    );
  };

  const handleBookAppointment = () => {
    Alert.alert(
      "Book Appointment",
      `Confirm booking for ${appointment.propertyName} on ${selectedDate.toLocaleDateString()} at ${selectedTime}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm Booking",
          onPress: () => {
            Alert.alert(
              "Success",
              "Your appointment has been booked successfully!",
            );
          },
        },
      ],
    );
  };

  const isDateSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 border-b border-border">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-card items-center justify-center border border-border"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Pressable>
          <Text className="text-xl font-bold text-foreground">
            Appointment Details
          </Text>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Badge */}
        <View className="flex-row items-center gap-2">
          <View
            className={`px-3 py-1 rounded-full ${getStatusColor(appointment.status)}`}
          >
            <Text className="text-white font-semibold text-sm">
              {getStatusText(appointment.status)}
            </Text>
          </View>
          <Text className="text-muted-foreground text-sm">
            ID: {appointment.id}
          </Text>
        </View>

        {/* Property Preview Card */}
        <View className="bg-card rounded-2xl overflow-hidden border border-border">
          <View className="h-48 relative">
            <View
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${appointment.propertyImage})` }}
            />
          </View>
          <View className="p-4">
            <Text className="text-lg font-bold text-foreground mb-1">
              {appointment.propertyName}
            </Text>
            <View className="flex-row items-center gap-1 mb-2">
              <MapPin size={16} className="text-muted-foreground" />
              <Text className="text-muted-foreground text-sm flex-1">
                {appointment.propertyAddress}
              </Text>
            </View>
            <Text className="text-primary font-bold text-lg">
              {appointment.propertyPrice}
            </Text>
          </View>
        </View>

        {/* Appointment Details */}
        <View className="bg-card rounded-2xl p-4 border border-border">
          <Text className="text-lg font-bold text-foreground mb-4">
            Appointment Details
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Calendar size={20} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-muted-foreground text-xs">Date</Text>
                <Text className="text-foreground font-semibold">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock size={20} className="text-primary" />
              </View>
              <View className="flex-1">
                <Text className="text-muted-foreground text-xs">Time</Text>
                <Text className="text-foreground font-semibold">
                  {appointment.time} ({appointment.duration})
                </Text>
              </View>
            </View>

            {appointment.notes && (
              <View className="pt-3 border-t border-border">
                <Text className="text-muted-foreground text-xs mb-1">
                  Notes
                </Text>
                <Text className="text-foreground text-sm">
                  {appointment.notes}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Agent Info */}
        <View className="bg-card rounded-2xl p-4 border border-border">
          <Text className="text-lg font-bold text-foreground mb-4">
            Agent Information
          </Text>

          <View className="flex-row items-center gap-4 mb-4">
            <View
              className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-border"
              style={{ backgroundImage: `url(${appointment.agent.avatar})` }}
            />
            <View className="flex-1">
              <Text className="text-foreground font-bold text-lg">
                {appointment.agent.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-yellow-500">★</Text>
                <Text className="text-foreground font-semibold">
                  {appointment.agent.rating}
                </Text>
                <Text className="text-muted-foreground text-sm">Rating</Text>
              </View>
            </View>
          </View>

          <View className="space-y-3">
            <Pressable className="flex-row items-center gap-3 p-3 bg-secondary rounded-xl">
              <Phone size={20} className="text-primary" />
              <Text className="text-foreground flex-1">
                {appointment.agent.phone}
              </Text>
            </Pressable>

            <Pressable className="flex-row items-center gap-3 p-3 bg-secondary rounded-xl">
              <Mail size={20} className="text-primary" />
              <Text className="text-foreground flex-1">
                {appointment.agent.email}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Reschedule Section */}
        <View className="bg-card rounded-2xl p-4 border border-border">
          <Text className="text-lg font-bold text-foreground mb-4">
            Reschedule Appointment
          </Text>

          {/* Date Picker */}
          <View className="mb-4">
            <Text className="text-muted-foreground text-sm mb-3">
              Select Date
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {upcomingDates.map((day, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedDate(day.date)}
                  className={`px-4 py-3 rounded-xl border-2 min-w-[70px] items-center ${
                    isDateSelected(day.date)
                      ? "border-primary bg-secondary"
                      : "border-border bg-card"
                  }`}
                >
                  <Text
                    className={`text-xs mb-1 ${
                      isDateSelected(day.date)
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {day.dayName}
                  </Text>
                  <Text
                    className={`text-lg font-bold ${
                      isDateSelected(day.date)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {day.dayNumber}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Time Picker */}
          <View>
            <Text className="text-muted-foreground text-sm mb-3">
              Select Time
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {timeSlots.map((time, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedTime(time)}
                  style={{
                    flex: 1,
                    minWidth: "22%",
                    paddingVertical: 12,
                    borderRadius: 12,
                    borderWidth: 2,
                    alignItems: "center",
                    backgroundColor:
                      selectedTime === time
                        ? isDark
                          ? "#1a3d36"
                          : "#ccfbf1"
                        : isDark
                          ? "#1a2e2a"
                          : "#ffffff",
                    borderColor:
                      selectedTime === time
                        ? isDark
                          ? "#5eead4"
                          : "#0d9488"
                        : isDark
                          ? "#1a3d36"
                          : "#e2e8f0",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color:
                        selectedTime === time
                          ? isDark
                            ? "#5eead4"
                            : "#0d9488"
                          : isDark
                            ? "#f0fdfa"
                            : "#0f1728",
                    }}
                  >
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3 pt-4">
          {appointment.status === "confirmed" ||
          appointment.status === "pending" ? (
            <>
              <Pressable
                onPress={handleReschedule}
                className="bg-primary py-4 rounded-xl items-center"
              >
                <Text className="text-primary-foreground font-bold text-lg">
                  Reschedule Appointment
                </Text>
              </Pressable>

              <Pressable
                onPress={handleCancel}
                className="bg-destructive py-4 rounded-xl items-center"
              >
                <Text className="text-white font-bold text-lg">
                  Cancel Appointment
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={handleBookAppointment}
              className="bg-primary py-4 rounded-xl items-center"
            >
              <Text className="text-primary-foreground font-bold text-lg">
                Book New Appointment
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
