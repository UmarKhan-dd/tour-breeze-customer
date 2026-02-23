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
import { useRouter } from "expo-router";
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

// Mock Data: Properties selected from the Home screen
// In a real app, this would be passed via route params
const selectedProperties = [
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

// Generate mock dates for the next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 14; i++) {
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
    });
  }
  return dates;
};

const availableDates = generateDates();

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

type DateItem = (typeof availableDates)[0];
type Property = (typeof selectedProperties)[0];

export default function ScheduleTourScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<DateItem | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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
              Preferred Date
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {availableDates.map((date) => (
                <TouchableOpacity
                  key={date.id}
                  onPress={() => setSelectedDate(date)}
                  className={`
                    min-w-[60px] rounded-xl p-3 items-center border-2
                    ${
                      selectedDate?.id === date.id
                        ? "bg-primary border-primary"
                        : "bg-card border-border"
                    }
                  `}
                >
                  <Text
                    className={`text-xs font-medium ${selectedDate?.id === date.id ? "text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {date.day}
                  </Text>
                  <Text
                    className={`text-xl font-bold mt-1 ${selectedDate?.id === date.id ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {date.date}
                  </Text>
                </TouchableOpacity>
              ))}
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
              Preferred Time
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-3">
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`
                  px-4 py-3 rounded-xl border-2 min-w-[100px] items-center justify-center
                  ${
                    selectedTime === time
                      ? "bg-primary border-primary"
                      : "bg-card border-border"
                  }
                `}
              >
                <Text
                  className={`font-semibold ${selectedTime === time ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {time}
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
          className={`rounded-xl py-4 items-center ${!selectedDate || !selectedTime ? "bg-muted" : "bg-primary"}`}
          disabled={!selectedDate || !selectedTime}
        >
          <Text
            className={`font-semibold text-lg ${!selectedDate || !selectedTime ? "text-muted-foreground" : "text-white"}`}
          >
            Submit Tour Request
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
