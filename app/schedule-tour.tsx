/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  Info,
} from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// Default mock data as fallback
const defaultProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main Street, Downtown",
    price: "$450,000",
    image:
      "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    address: "456 Ocean Drive, Marina Bay",
    price: "$1,250,000",
    image:
      "https://images.unsplash.com/photo-1577919518833-57dc0a0105e1?w=800&q=80",
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    address: "789 Maple Lane, Suburbs",
    price: "$320,000",
    image:
      "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=800&q=80",
  },
];

// Generate mock dates for the next 30 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      day: days[date.getDay()],
      date: date.getDate(),
      fullDate: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      id: i,
      dateObj: new Date(date),
    });
  }
  return dates;
};

const availableDates = generateDates();

// Time slots with ranges
const timeSlots = [
  { id: 1, label: "9:00 AM - 10:00 AM", start: "09:00", end: "10:00" },
  { id: 2, label: "10:00 AM - 11:00 AM", start: "10:00", end: "11:00" },
  { id: 3, label: "11:00 AM - 12:00 PM", start: "11:00", end: "12:00" },
  { id: 4, label: "12:00 PM - 1:00 PM", start: "12:00", end: "13:00" },
  { id: 5, label: "1:00 PM - 2:00 PM", start: "13:00", end: "14:00" },
  { id: 6, label: "2:00 PM - 3:00 PM", start: "14:00", end: "15:00" },
  { id: 7, label: "3:00 PM - 4:00 PM", start: "15:00", end: "16:00" },
  { id: 8, label: "4:00 PM - 5:00 PM", start: "16:00", end: "17:00" },
  { id: 9, label: "5:00 PM - 6:00 PM", start: "17:00", end: "18:00" },
];

type DateItem = (typeof availableDates)[0];
type Property = (typeof defaultProperties)[0];
type TimeSlot = (typeof timeSlots)[0];

export default function ScheduleTourScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get properties from route params or use defaults
  let selectedProperties: Property[] = defaultProperties;
  if (params.properties && typeof params.properties === "string") {
    try {
      selectedProperties = JSON.parse(params.properties);
    } catch (e) {
      selectedProperties = defaultProperties;
    }
  }

  const [startDate, setStartDate] = useState<DateItem | null>(null);
  const [endDate, setEndDate] = useState<DateItem | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [showDateRangeInfo, setShowDateRangeInfo] = useState(false);

  const renderPropertyItem = ({ item }: { item: Property }) => (
    <View className="mr-4 w-48 bg-card rounded-xl overflow-hidden border border-border shadow-sm">
      <Image
        source={{ uri: item.image }}
        className="w-full h-28"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
          {item.title}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <MapPin size={12} className="text-muted-foreground" />
          <Text
            className="text-xs text-muted-foreground flex-1"
            numberOfLines={1}
          >
            {item.address}
          </Text>
        </View>
        <Text className="text-sm font-semibold text-teal-600 dark:text-teal-400 mt-1">
          {item.price}
        </Text>
      </View>
    </View>
  );

  const handleDateSelect = (date: DateItem) => {
    // If start date is not set, set it
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
      setShowDateRangeInfo(false);
      return;
    }

    // If end date is not set, determine the range
    if (!endDate) {
      if (date.id < startDate.id) {
        // User selected a date before start date, swap them
        setStartDate(date);
        setEndDate(startDate);
      } else if (date.id === startDate.id) {
        // User clicked the same date, just set single date
        setStartDate(date);
        setEndDate(null);
      } else {
        // User selected a date after start date, set as end date
        setEndDate(date);
      }
      setShowDateRangeInfo(true);
      return;
    }

    // If both dates are set, reset and start over
    setStartDate(date);
    setEndDate(null);
    setShowDateRangeInfo(false);
  };

  const isDateInRange = (dateId: number): boolean => {
    if (!startDate) return false;
    if (!endDate) return dateId === startDate.id;
    return dateId >= startDate.id && dateId <= endDate.id;
  };

  const isDateRangeStart = (dateId: number): boolean => {
    return startDate?.id === dateId;
  };

  const isDateRangeEnd = (dateId: number): boolean => {
    return endDate?.id === dateId;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 flex-row items-center justify-between border-b border-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground">Schedule Tour</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tour Itinerary Section */}
        <Animated.View entering={FadeIn} className="px-6 mt-6 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-foreground">
              Tour Itinerary
            </Text>
            <View className="bg-primary/10 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-primary">
                {selectedProperties.length} Properties
              </Text>
            </View>
          </View>

          <FlatList
            data={selectedProperties}
            horizontal
            renderItem={renderPropertyItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 0 }}
            keyExtractor={(item) => item.id.toString()}
          />
        </Animated.View>

        {/* Date Selection */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="px-6 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Calendar size={20} className="text-primary" />
            <Text className="text-lg font-bold text-foreground">
              Select Date Range
            </Text>
          </View>

          {showDateRangeInfo && startDate && endDate && (
            <View className="bg-primary/10 rounded-lg p-3 mb-4 border border-primary/20">
              <Text className="text-xs text-muted-foreground mb-1">
                Tour Date Range
              </Text>
              <Text className="text-sm font-semibold text-primary">
                {startDate.fullDate} to {endDate.fullDate}
              </Text>
            </View>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {availableDates.map((date) => {
                const isStart = isDateRangeStart(date.id);
                const isEnd = isDateRangeEnd(date.id);
                const isInRange = isDateInRange(date.id);

                return (
                  <TouchableOpacity
                    key={date.id}
                    onPress={() => handleDateSelect(date)}
                    className={`
                      min-w-[60px] rounded-xl p-3 items-center border-2
                      ${
                        isStart || isEnd
                          ? "bg-primary border-primary"
                          : isInRange
                            ? "bg-primary/30 border-primary/50"
                            : "bg-card border-border"
                      }
                    `}
                  >
                    <Text
                      className={`text-xs font-medium ${isStart || isEnd || isInRange ? "text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      {date.day}
                    </Text>
                    <Text
                      className={`text-xl font-bold mt-1 ${isStart || isEnd || isInRange ? "text-primary-foreground" : "text-foreground"}`}
                    >
                      {date.date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Time Selection */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="px-6 mb-6"
        >
          <View className="flex-row items-center gap-2 mb-4">
            <Clock size={20} className="text-primary" />
            <Text className="text-lg font-bold text-foreground">
              Preferred Time Slot
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                onPress={() => setSelectedTime(slot)}
                className={`
                  px-4 py-3 rounded-xl border-2 min-w-[140px] items-center justify-center
                  ${
                    selectedTime?.id === slot.id
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  }
                `}
              >
                <Text
                  className={`font-semibold text-sm ${selectedTime?.id === slot.id ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {slot.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Info Section */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="px-6"
        >
          <View className="bg-card rounded-xl p-4 border border-border flex-row gap-3">
            <View className="bg-primary/10 p-2 rounded-lg">
              <Info size={20} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-foreground mb-1">
                Tour Details
              </Text>
              <Text className="text-xs text-muted-foreground leading-relaxed">
                You are requesting a tour for {selectedProperties.length}{" "}
                properties. Agents will be notified and can accept your request.
                You'll be able to review and select your preferred agent
                afterwards.
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <TouchableOpacity
          onPress={() => {
            if (startDate && selectedTime) {
              Alert.alert(
                "Tour Request Submitted",
                `Your tour has been scheduled for ${selectedProperties.length} ${selectedProperties.length === 1 ? "property" : "properties"}${endDate ? ` from ${startDate.fullDate} to ${endDate.fullDate}` : ` on ${startDate.fullDate}`} at ${selectedTime.label}.`,
                [
                  {
                    text: "OK",
                    onPress: () => router.back(),
                  },
                ],
              );
            }
          }}
          className={`rounded-xl py-4 items-center ${!startDate || !selectedTime ? "bg-muted" : "bg-primary"}`}
          disabled={!startDate || !selectedTime}
        >
          <Text
            className={`font-semibold text-lg ${!startDate || !selectedTime ? "text-muted-foreground" : "text-white"}`}
          >
            Submit Tour Request
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
