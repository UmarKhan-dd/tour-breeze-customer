import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Sliders,
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Star,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";

// Mock property data (placeholder for Zillow API)
const mockProperties = [
  {
    id: 1,
    address: "123 Ocean View Drive",
    city: "Miami Beach, FL",
    price: 1250000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60",
    rating: 4.8,
    isFavorite: true,
  },
  {
    id: 2,
    address: "456 Palm Avenue",
    city: "San Diego, CA",
    price: 875000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
    rating: 4.5,
    isFavorite: false,
  },
  {
    id: 3,
    address: "789 Sunset Boulevard",
    city: "Los Angeles, CA",
    price: 2450000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    rating: 4.9,
    isFavorite: false,
  },
  {
    id: 4,
    address: "321 Coastal Highway",
    city: "Santa Barbara, CA",
    price: 1850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    isFavorite: true,
  },
  {
    id: 5,
    address: "654 Beach Road",
    city: "Malibu, CA",
    price: 3200000,
    beds: 6,
    baths: 5,
    sqft: 5500,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=60",
    rating: 5.0,
    isFavorite: false,
  },
];

type Property = (typeof mockProperties)[0];

export default function SearchScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: "all",
    beds: "all",
    baths: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(mockProperties.filter((p) => p.isFavorite).map((p) => p.id)),
  );

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      const matchesSearch =
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.city.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter logic (simplified)
      const matchesPrice = selectedFilters.priceRange === "all" || true;

      // Beds filter logic
      const matchesBeds =
        selectedFilters.beds === "all" ||
        (selectedFilters.beds === "3+"
          ? property.beds >= 3
          : property.beds === parseInt(selectedFilters.beds));

      // Baths filter logic
      const matchesBaths =
        selectedFilters.baths === "all" ||
        (selectedFilters.baths === "2+"
          ? property.baths >= 2
          : property.baths === parseInt(selectedFilters.baths));

      return matchesSearch && matchesPrice && matchesBeds && matchesBaths;
    });
  }, [searchQuery, selectedFilters]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-3xl font-bold text-foreground mb-1">Search</Text>
        <Text className="text-muted-foreground">Find your dream property</Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="flex-row gap-3">
          <View className="flex-1 flex-row items-center bg-card border border-border rounded-2xl px-4 py-3">
            <Search className="text-muted-foreground mr-3" size={20} />
            <TextInput
              className="flex-1 text-foreground text-base"
              placeholder="Search by address or city..."
              placeholderTextColor={
                isDark ? "rgba(156, 163, 175, 0.8)" : "rgba(107, 114, 128, 0.8)"
              }
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 rounded-2xl items-center justify-center border ${
              showFilters
                ? "bg-primary border-primary"
                : "bg-card border-border"
            }`}
          >
            <Sliders
              className={
                showFilters ? "text-primary-foreground" : "text-foreground"
              }
              size={20}
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {showFilters && (
          <Animated.View
            className="mt-4 bg-card border border-border rounded-2xl p-4"
            style={{ opacity: 1 }}
          >
            <Text className="text-sm font-semibold text-foreground mb-3">
              Filters
            </Text>

            {/* Price Range */}
            <View className="mb-4">
              <Text className="text-xs text-muted-foreground mb-2">
                Price Range
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["All", "$500k", "$1M", "$2M"].map((price) => (
                  <TouchableOpacity
                    key={price}
                    onPress={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        priceRange: price,
                      }))
                    }
                    className={`mr-2 px-4 py-2 rounded-full ${
                      selectedFilters.priceRange ===
                        price
                          .toLowerCase()
                          .replace("$", "")
                          .replace("m", "000000") ||
                      (price === "All" && selectedFilters.priceRange === "all")
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        selectedFilters.priceRange ===
                          price
                            .toLowerCase()
                            .replace("$", "")
                            .replace("m", "000000") ||
                        (price === "All" &&
                          selectedFilters.priceRange === "all")
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Beds */}
            <View className="mb-4">
              <Text className="text-xs text-muted-foreground mb-2">
                Bedrooms
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["All", "1", "2", "3+", "4+"].map((bed) => (
                  <TouchableOpacity
                    key={bed}
                    onPress={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        beds: bed === "All" ? "all" : bed,
                      }))
                    }
                    className={`mr-2 px-4 py-2 rounded-full ${
                      selectedFilters.beds === bed ||
                      (bed === "All" && selectedFilters.beds === "all")
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        selectedFilters.beds === bed ||
                        (bed === "All" && selectedFilters.beds === "all")
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {bed === "All" ? "Any" : bed + " Beds"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Baths */}
            <View>
              <Text className="text-xs text-muted-foreground mb-2">
                Bathrooms
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["All", "1", "2", "3+"].map((bath) => (
                  <TouchableOpacity
                    key={bath}
                    onPress={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        baths: bath === "All" ? "all" : bath,
                      }))
                    }
                    className={`mr-2 px-4 py-2 rounded-full ${
                      selectedFilters.baths === bath ||
                      (bath === "All" && selectedFilters.baths === "all")
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        selectedFilters.baths === bath ||
                        (bath === "All" && selectedFilters.baths === "all")
                          ? "text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {bath === "All" ? "Any" : bath + " Baths"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Results */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 128,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Results Count */}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-foreground font-semibold">
            {filteredProperties.length} Properties Found
          </Text>
          <TouchableOpacity>
            <Text className="text-primary text-sm">View Map</Text>
          </TouchableOpacity>
        </View>

        {/* Property Cards */}
        {filteredProperties.map((property, index) => (
          <TouchableOpacity
            key={property.id}
            className="bg-card rounded-2xl overflow-hidden border border-border"
            style={{
              shadowColor: isDark ? "#000" : "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            {/* Image */}
            <View className="relative">
              <Image
                source={{ uri: property.image }}
                className="w-full h-48"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => toggleFavorite(property.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full items-center justify-center"
              >
                <Heart
                  className={
                    favorites.has(property.id)
                      ? "text-destructive fill-destructive"
                      : "text-foreground"
                  }
                  size={20}
                  fill={favorites.has(property.id) ? "#ef4444" : "none"}
                />
              </TouchableOpacity>
              <View className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <Text className="text-primary-foreground text-xs font-medium">
                  For Sale
                </Text>
              </View>
            </View>

            {/* Content */}
            <View className="p-4">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-foreground">
                    {formatPrice(property.price)}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin className="text-muted-foreground mr-1" size={14} />
                    <Text
                      className="text-muted-foreground text-sm flex-1"
                      numberOfLines={1}
                    >
                      {property.address}
                    </Text>
                  </View>
                  <Text className="text-muted-foreground text-xs">
                    {property.city}
                  </Text>
                </View>
                <View className="flex-row items-center bg-muted px-2 py-1 rounded-lg">
                  <Star
                    className="text-yellow-500 mr-1"
                    size={14}
                    fill="#eab308"
                  />
                  <Text className="text-foreground text-sm font-medium">
                    {property.rating}
                  </Text>
                </View>
              </View>

              {/* Property Details */}
              <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-border">
                <View className="flex-row items-center">
                  <Bed className="text-muted-foreground mr-1" size={16} />
                  <Text className="text-foreground text-sm">
                    {property.beds} Beds
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Bath className="text-muted-foreground mr-1" size={16} />
                  <Text className="text-foreground text-sm">
                    {property.baths} Baths
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Maximize className="text-muted-foreground mr-1" size={16} />
                  <Text className="text-foreground text-sm">
                    {property.sqft.toLocaleString()} sqft
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <View className="items-center justify-center py-12">
            <Search className="text-muted-foreground mb-4" size={48} />
            <Text className="text-xl font-semibold text-foreground mb-2">
              No Properties Found
            </Text>
            <Text className="text-muted-foreground text-center">
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
