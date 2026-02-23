import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Check,
  X,
  Home,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

// Mock Data - This would come from route params in a real app
const mockRequest = {
  id: "1",
  customerName: "Sarah Johnson",
  customerEmail: "sarah.johnson@email.com",
  customerPhone: "+1 (555) 123-4567",
  propertyTitle: "Modern Downtown Loft",
  propertyAddress: "123 Main Street, Downtown",
  propertyImage:
    "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
  propertyPrice: "$450,000",
  requestedDate: "October 24, 2024",
  requestedTime: "10:00 AM",
  status: "Pending",
  message:
    "Hi, I'm interested in viewing this property. I'm looking for a modern space with good natural light.",
};

type Request = typeof mockRequest;

export default function TourRequestDetailScreen() {
  const [request, setRequest] = useState<Request>(mockRequest);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleAccept = () => {
    Alert.alert(
      "Confirm Tour",
      "Are you sure you want to accept this tour request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          style: "default",
          onPress: () => {
            setRequest({ ...request, status: "Confirmed" });
            Alert.alert("Success", "Tour request has been confirmed!");
          },
        },
      ],
    );
  };

  const handleReject = () => {
    Alert.alert(
      "Reject Tour",
      "Are you sure you want to reject this tour request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            setRequest({ ...request, status: "Rejected" });
            Alert.alert("Rejected", "Tour request has been rejected.");
          },
        },
      ],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-2 bg-card rounded-full border border-border">
            <ChevronLeft
              size={20}
              className="text-foreground"
              strokeWidth={2.5}
            />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">
            Tour Request
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Badge */}
        <View className="mb-6">
          <View
            className={`px-4 py-2 rounded-full self-start ${getStatusColor(request.status)}`}
          >
            <Text className="text-sm font-semibold">{request.status}</Text>
          </View>
        </View>

        {/* Property Card */}
        <View className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border mb-6">
          <Image
            source={{ uri: request.propertyImage }}
            className="w-full h-48"
            resizeMode="cover"
          />
          <View className="p-4">
            <Text className="text-xl font-bold text-foreground mb-2">
              {request.propertyTitle}
            </Text>
            <View className="flex-row items-center gap-2 mb-3">
              <MapPin size={16} className="text-muted-foreground" />
              <Text className="text-sm text-muted-foreground">
                {request.propertyAddress}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-teal-600 dark:text-teal-400">
              {request.propertyPrice}
            </Text>
          </View>
        </View>

        {/* Customer Info Card */}
        <View className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Customer Information
          </Text>

          <View className="flex-row items-center gap-4 mb-4">
            <View className="w-12 h-12 bg-secondary rounded-full items-center justify-center">
              <User size={24} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-foreground">
                {request.customerName}
              </Text>
              <Text className="text-sm text-muted-foreground">
                Interested Buyer
              </Text>
            </View>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-secondary rounded-full items-center justify-center">
                <Mail size={18} className="text-primary" />
              </View>
              <Text className="text-sm text-foreground flex-1">
                {request.customerEmail}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-secondary rounded-full items-center justify-center">
                <Phone size={18} className="text-primary" />
              </View>
              <Text className="text-sm text-foreground flex-1">
                {request.customerPhone}
              </Text>
            </View>
          </View>
        </View>

        {/* Tour Details Card */}
        <View className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
          <Text className="text-lg font-semibold text-foreground mb-4">
            Tour Details
          </Text>

          <View className="gap-4">
            <View className="flex-row items-center gap-3">
              <Calendar size={20} className="text-primary" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground uppercase tracking-wide">
                  Date
                </Text>
                <Text className="text-base font-medium text-foreground">
                  {request.requestedDate}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3">
              <Clock size={20} className="text-primary" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground uppercase tracking-wide">
                  Time
                </Text>
                <Text className="text-base font-medium text-foreground">
                  {request.requestedTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Message */}
        {request.message && (
          <View className="bg-card rounded-2xl p-5 shadow-sm border border-border mb-6">
            <Text className="text-lg font-semibold text-foreground mb-3">
              Message
            </Text>
            <Text className="text-sm text-muted-foreground leading-relaxed">
              {request.message}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed Bottom Action Buttons */}
      {request.status === "Pending" && (
        <View
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{ backgroundColor: isDark ? "#0f2924" : "#f0fdfa" }}
        >
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 bg-card border-2 border-red-500 rounded-xl py-4 flex-row items-center justify-center"
              onPress={handleReject}
            >
              <X size={20} className="text-red-500 mr-2" strokeWidth={2.5} />
              <Text className="text-red-500 font-semibold text-base">
                Reject
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl py-4 flex-row items-center justify-center shadow-sm"
              onPress={handleAccept}
            >
              <Check
                size={20}
                color="white"
                className="mr-2"
                strokeWidth={2.5}
              />
              <Text className="text-white font-semibold text-base">
                Accept Tour
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Confirmed/Rejected Status Display */}
      {request.status !== "Pending" && (
        <View
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{ backgroundColor: isDark ? "#0f2924" : "#f0fdfa" }}
        >
          <View
            className={`rounded-xl py-4 items-center ${
              request.status === "Confirmed"
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <View className="flex-row items-center gap-2">
              {request.status === "Confirmed" ? (
                <Check
                  size={20}
                  className="text-green-600 dark:text-green-400"
                  strokeWidth={2.5}
                />
              ) : (
                <X
                  size={20}
                  className="text-red-600 dark:text-red-400"
                  strokeWidth={2.5}
                />
              )}
              <Text
                className={`font-semibold text-base ${
                  request.status === "Confirmed"
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                Tour {request.status}
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
