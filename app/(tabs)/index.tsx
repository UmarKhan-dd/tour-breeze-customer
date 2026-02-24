import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  MapPin,
  Search,
  Calendar,
  Bell,
  Star,
  ChevronRight,
  Heart,
  Check,
  Map as MapIcon,
  List,
  Layers,
} from "lucide-react-native";
import Animated, {
  FadeInDown,
  FadeIn,
  SlideInUp,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

// Mock data for properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    address: "123 Main Street, Downtown",
    price: "$450,000",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image:
      "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
    rating: 4.8,
    isFavorite: false,
    lat: 0.3,
    lng: 0.4,
    status: "Available",
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    address: "456 Ocean Drive, Marina Bay",
    price: "$1,250,000",
    beds: 4,
    baths: 3,
    sqft: 2800,
    image:
      "https://images.unsplash.com/photo-1577919518833-57dc0a0105e1?w=900&auto=format&fit=crop&q=60",
    rating: 4.9,
    isFavorite: true,
    lat: 0.5,
    lng: 0.6,
    status: "Available",
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    address: "789 Maple Lane, Suburbs",
    price: "$320,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image:
      "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=900&auto=format&fit=crop&q=60",
    rating: 4.5,
    isFavorite: false,
    lat: 0.7,
    lng: 0.2,
    status: "Available",
  },
];

const recentAppointments = [
  {
    id: 1,
    propertyTitle: "Modern Downtown Apartment",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    propertyTitle: "Luxury Waterfront Villa",
    date: "Jan 18, 2025",
    time: "2:00 PM",
    status: "Pending",
  },
];

type Property = (typeof featuredProperties)[0];
type Appointment = (typeof recentAppointments)[0];

export default function HomeScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = React.useState<"list" | "map">("list");
  const [isSelectionMode, setIsSelectionMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  const toggleSelection = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) {
      setSelectedIds(new Set());
    }
  };

  const renderPropertyCard = ({
    item,
    index,
  }: {
    item: Property;
    index: number;
  }) => (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(index * 100).springify()}
      className="mb-4"
    >
      <TouchableOpacity
        className={`bg-card rounded-2xl overflow-hidden shadow-sm border-2 ${selectedIds.has(item.id) ? "border-primary" : "border-border"}`}
        onPress={() => {
          if (isSelectionMode) {
            toggleSelection(item.id);
          } else {
            // Navigate to detail (mocked for now)
            router.push("/property-detail");
          }
        }}
        onLongPress={() => {
          if (!isSelectionMode) {
            setIsSelectionMode(true);
            toggleSelection(item.id);
          }
        }}
        activeOpacity={0.7}
      >
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full h-48"
            resizeMode="cover"
          />

          {/* Selection Checkbox Overlay */}
          {isSelectionMode && (
            <View className="absolute top-3 left-3">
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${selectedIds.has(item.id) ? "bg-primary" : "bg-white/80 backdrop-blur-sm"}`}
              >
                {selectedIds.has(item.id) && <Check size={18} color="white" />}
              </View>
            </View>
          )}

          {/* Favorite Button (Only show when NOT in selection mode) */}
          {!isSelectionMode && (
            <TouchableOpacity
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2"
              style={{
                width: 36,
                height: 36,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Heart
                size={20}
                color={item.isFavorite ? "#ef4444" : "#6b7280"}
                fill={item.isFavorite ? "#ef4444" : "none"}
                strokeWidth={2}
              />
            </TouchableOpacity>
          )}

          <View className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Text className="text-primary-foreground text-xs font-semibold">
              {item.status || "Available"}
            </Text>
          </View>
        </View>
        <View className="p-4">
          <Text
            className="text-lg font-bold text-foreground mb-1"
            numberOfLines={1}
          >
            {item.title}
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
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-teal-600 dark:text-teal-400">
              {item.price}
            </Text>
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-sm font-medium text-foreground">
                {item.rating}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4 mt-3 pt-3 border-t border-border">
            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-muted-foreground">
                {item.beds} beds
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-muted-foreground">
                {item.baths} baths
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xs text-muted-foreground">
                {item.sqft} sqft
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAppointmentCard = ({
    item,
    index,
  }: {
    item: Appointment;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      className="mr-3"
    >
      <View
        className="bg-card rounded-xl p-4 border border-border"
        style={{ width: 200 }}
      >
        <View className="flex-row items-center gap-2 mb-2">
          <Calendar size={16} color="#0d9488" />
          <Text className="text-xs font-semibold text-teal-600 dark:text-teal-400">
            {item.status}
          </Text>
        </View>
        <Text
          className="text-sm font-bold text-foreground mb-1"
          numberOfLines={1}
        >
          {item.propertyTitle}
        </Text>
        <Text className="text-xs text-muted-foreground mb-2">{item.date}</Text>
        <Text className="text-sm font-medium text-foreground">{item.time}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-muted-foreground">Welcome back,</Text>
            <Text className="text-2xl font-bold text-foreground">
              Tour Breeze
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="relative"
            >
              <Bell size={24} color="#6b7280" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[10px] font-bold">2</Text>
              </View>
            </TouchableOpacity>
            <ThemeToggle />
          </View>
        </View>
      </View>

      <View className="flex-1">
        {/* View Mode Toggle & Select Button */}
        <View className="px-6 py-3 flex-row items-center justify-between gap-4">
          {/* View Mode Toggle */}
          <View className="flex-row bg-muted rounded-lg p-1 flex-1">
            <TouchableOpacity
              onPress={() => setViewMode("list")}
              className={`flex-1 py-2 px-4 rounded-md flex-row items-center justify-center gap-2 ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
            >
              <List
                size={18}
                color={viewMode === "list" ? "#0d9488" : "#6b7280"}
              />
              <Text
                className={`text-sm font-medium ${viewMode === "list" ? "text-foreground" : "text-muted-foreground"}`}
              >
                List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={viewMode}
              onPress={() => setViewMode("map")}
              className={`flex-1 py-2 px-4 rounded-md flex-row items-center justify-center gap-2 ${viewMode === "map" ? "bg-background shadow-sm" : ""}`}
            >
              <MapIcon
                size={18}
                color={viewMode === "map" ? "#0d9488" : "#6b7280"}
              />
              <Text
                className={`text-sm font-medium ${viewMode === "map" ? "text-foreground" : "text-muted-foreground"}`}
              >
                Map
              </Text>
            </TouchableOpacity>
          </View>

          {/* Select Mode Toggle */}
          <TouchableOpacity
            onPress={toggleSelectionMode}
            className={`px-4 py-2 rounded-lg flex-row items-center justify-center gap-2 ${isSelectionMode ? "bg-primary" : "bg-card border border-border"}`}
          >
            <Layers size={18} color={isSelectionMode ? "white" : "#0d9488"} />
            <Text
              className={`text-sm font-medium ${isSelectionMode ? "text-white" : "text-foreground"}`}
            >
              {isSelectionMode ? "Done" : "Select"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: selectedIds.size > 0 ? 140 : 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Map View */}
          {viewMode === "map" && (
            <Animated.View entering={FadeIn} className="px-6 mb-6">
              <View className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm relative h-64">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1577086664693-894d8405334a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcHxlbnwwfHwwfHx8MA%3D%3D",
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                {/* Mock Map Pins */}
                {featuredProperties.map((property) => (
                  <TouchableOpacity
                    key={`map-pin-${property.id}`}
                    onPress={() => {
                      if (isSelectionMode) {
                        toggleSelection(property.id);
                      } else {
                        router.push("/property-detail");
                      }
                    }}
                    className="absolute"
                    style={{
                      top: `${property.lat * 100}%`,
                      left: `${property.lng * 100}%`,
                    }}
                  >
                    <View
                      className={`relative items-center justify-center ${selectedIds.has(property.id) && isSelectionMode ? "opacity-100" : "opacity-90"}`}
                    >
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center shadow-lg ${selectedIds.has(property.id) && isSelectionMode ? "bg-primary" : "bg-white"}`}
                      >
                        {selectedIds.has(property.id) && isSelectionMode ? (
                          <Check size={16} color="white" />
                        ) : (
                          <View className="w-3 h-3 bg-primary rounded-full" />
                        )}
                      </View>
                      <View className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white absolute -bottom-2" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-center text-xs text-muted-foreground mt-2">
                Tap pins to select or view details
              </Text>
            </Animated.View>
          )}

          {/* Quick Actions (Only in List Mode) */}
          {viewMode === "list" && (
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="px-6 mb-6"
            >
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-teal-500 rounded-xl p-4 items-center shadow-sm">
                  <Search size={24} color="white" />
                  <Text className="text-white font-semibold mt-2 text-sm">
                    Search
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-card rounded-xl p-4 items-center border border-border shadow-sm">
                  <Calendar size={24} color="#0d9488" />
                  <Text className="text-foreground font-semibold mt-2 text-sm">
                    Schedule
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-card rounded-xl p-4 items-center border border-border shadow-sm">
                  <Heart size={24} color="#ef4444" />
                  <Text className="text-foreground font-semibold mt-2 text-sm">
                    Favorites
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* Upcoming Appointments */}
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="mb-6"
          >
            <View className="px-6 flex-row items-center justify-between mb-3">
              <Text className="text-lg font-bold text-foreground">
                Upcoming Tours
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                  See All
                </Text>
                <ChevronRight size={16} color="#0d9488" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentAppointments}
              renderItem={renderAppointmentCard}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              keyExtractor={(item) => item.id.toString()}
            />
          </Animated.View>

          {/* Featured Properties (List Mode) */}
          {viewMode === "list" && (
            <Animated.View entering={FadeInDown.delay(300).springify()}>
              <View className="px-6 flex-row items-center justify-between mb-3">
                <Text className="text-lg font-bold text-foreground">
                  Featured Properties
                </Text>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                    See All
                  </Text>
                  <ChevronRight size={16} color="#0d9488" />
                </TouchableOpacity>
              </View>
              <View className="px-6">
                {featuredProperties.map((item, index) =>
                  renderPropertyCard({ item, index }),
                )}
              </View>
            </Animated.View>
          )}
        </ScrollView>

        {/* Bottom Action Bar for Multi-Select */}
        {selectedIds.size > 0 && (
          <Animated.View
            entering={SlideInUp}
            className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8 shadow-lg"
          >
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-bold text-foreground">
                  {selectedIds.size}{" "}
                  {selectedIds.size === 1 ? "Property" : "Properties"} Selected
                </Text>
                <Text className="text-sm text-muted-foreground">
                  Ready to schedule your tour
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const selectedProps = featuredProperties.filter((p) =>
                    selectedIds.has(p.id),
                  );
                  router.push({
                    pathname: "/schedule-tour",
                    params: {
                      properties: JSON.stringify(selectedProps),
                    },
                  });
                }}
                className="bg-primary px-6 py-3 rounded-xl flex-row items-center gap-2"
              >
                <Calendar size={20} color="white" />
                <Text className="text-white font-semibold">Schedule Tour</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
