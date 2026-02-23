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
import { MapPin, Heart, Star, Trash2, Grid, List } from "lucide-react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// Mock data for favorite properties
const favoriteProperties = [
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
    isFavorite: true,
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
    isFavorite: true,
  },
  {
    id: 4,
    title: "Sunset Beach House",
    address: "321 Palm Street, Beachside",
    price: "$875,000",
    beds: 3,
    baths: 2,
    sqft: 2100,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=60",
    rating: 4.7,
    isFavorite: true,
  },
];

type Property = (typeof favoriteProperties)[0];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Property[]>(favoriteProperties);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const renderPropertyCard = ({
    item,
    index,
  }: {
    item: Property;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      className={viewMode === "grid" ? "mb-4" : "mb-4"}
    >
      <TouchableOpacity className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full"
            style={{ height: viewMode === "grid" ? 180 : 200 }}
            resizeMode="cover"
          />
          <TouchableOpacity
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2"
            style={{
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => toggleFavorite(item.id)}
          >
            <Heart size={20} color="#ef4444" fill="#ef4444" strokeWidth={2} />
          </TouchableOpacity>
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

  const renderListItem = ({
    item,
    index,
  }: {
    item: Property;
    index: number;
  }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      className="mb-3"
    >
      <TouchableOpacity className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-28 h-28"
          resizeMode="cover"
        />
        <View className="flex-1 p-3 justify-between">
          <View>
            <Text
              className="text-base font-bold text-foreground mb-1"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View className="flex-row items-center gap-1 mb-1">
              <MapPin size={12} color="#6b7280" />
              <Text
                className="text-xs text-muted-foreground flex-1"
                numberOfLines={1}
              >
                {item.address}
              </Text>
            </View>
            <Text className="text-lg font-bold text-teal-600 dark:text-teal-400">
              {item.price}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-xs text-muted-foreground">
                {item.beds} bd
              </Text>
              <Text className="text-xs text-muted-foreground">•</Text>
              <Text className="text-xs text-muted-foreground">
                {item.baths} ba
              </Text>
              <Text className="text-xs text-muted-foreground">•</Text>
              <Text className="text-xs text-muted-foreground">
                {item.sqft} sqft
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              className="bg-red-50 dark:bg-red-950/30 p-2 rounded-full"
            >
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-muted-foreground">Your saved</Text>
            <Text className="text-2xl font-bold text-foreground">
              Favorites
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row bg-card rounded-lg border border-border p-1">
              <TouchableOpacity
                onPress={() => setViewMode("grid")}
                className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary" : ""}`}
              >
                <Grid
                  size={18}
                  color={viewMode === "grid" ? "white" : "#6b7280"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewMode("list")}
                className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary" : ""}`}
              >
                <List
                  size={18}
                  color={viewMode === "list" ? "white" : "#6b7280"}
                />
              </TouchableOpacity>
            </View>
            <ThemeToggle />
          </View>
        </View>
      </View>

      {/* Favorites List */}
      <View className="flex-1 px-6 pt-4">
        {favorites.length > 0 ? (
          viewMode === "grid" ? (
            <FlatList
              key={viewMode}
              data={favorites}
              renderItem={renderPropertyCard}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 140 }}
              numColumns={2}
              columnWrapperStyle={{ gap: 12 }}
              ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
            />
          ) : (
            <FlatList
              key={viewMode}
              data={favorites}
              renderItem={renderListItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 140 }}
            />
          )
        ) : (
          <Animated.View
            entering={FadeIn}
            className="flex-1 items-center justify-center py-20"
          >
            <View className="bg-muted/50 rounded-full p-6 mb-4">
              <Heart size={48} color="#9ca3af" strokeWidth={1.5} />
            </View>
            <Text className="text-xl font-bold text-foreground mb-2">
              No Favorites Yet
            </Text>
            <Text className="text-sm text-muted-foreground text-center px-8 mb-6">
              Start exploring properties and save your favorites to view them
              here!
            </Text>
            <TouchableOpacity className="bg-primary px-6 py-3 rounded-full flex-row items-center gap-2">
              <Text className="text-primary-foreground font-semibold">
                Explore Properties
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
