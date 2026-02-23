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
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Share,
  Heart,
  MapPin,
  Wifi,
  Shield,
  Phone,
  Mail,
  Star,
  Calendar,
  User,
} from "lucide-react-native";

// Mock Data
const property = {
  id: 1,
  title: "Modern Luxury Villa",
  price: "$1,250,000",
  address: "123 Sunset Boulevard, Beverly Hills, CA",
  beds: 4,
  baths: 3,
  sqft: 2800,
  description:
    "Experience luxury living in this stunning modern villa featuring an open floor plan, gourmet kitchen with top-of-the-line appliances, and floor-to-ceiling windows offering breathtaking views. The master suite includes a spa-like bathroom and walk-in closet. Additional features include a private pool, smart home technology, and a two-car garage.",
  amenities: [
    { id: 1, icon: "Wifi", label: "High-speed Wi-Fi" },
    { id: 2, icon: "Shield", label: "24/7 Security" },
    { id: 3, icon: "Car", label: "2-Car Garage" },
    { id: 4, icon: "Droplet", label: "Private Pool" },
    { id: 5, icon: "Wind", label: "Central AC" },
    { id: 6, icon: "Sun", label: "Solar Panels" },
  ],
  agent: {
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4.8,
    reviews: 124,
    phone: "+1 234 567 890",
  },
  images: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  ],
};

type Amenity = {
  id: number;
  icon: string;
  label: string;
};

export default function PropertyDetailScreen() {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case "Wifi":
        return <Wifi size={20} className="text-primary" />;
      case "Shield":
        return <Shield size={20} className="text-primary" />;
      case "Car":
        return (
          <View className="w-5 h-5 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-xs font-bold">C</Text>
          </View>
        );
      case "Droplet":
        return (
          <View className="w-5 h-5 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-xs font-bold">P</Text>
          </View>
        );
      case "Wind":
        return (
          <View className="w-5 h-5 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-xs font-bold">A</Text>
          </View>
        );
      case "Sun":
        return (
          <View className="w-5 h-5 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-xs font-bold">S</Text>
          </View>
        );
      default:
        return (
          <View className="w-5 h-5 bg-primary/20 rounded-full items-center justify-center">
            <Text className="text-primary text-xs font-bold">?</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Image Gallery */}
        <View className="relative h-72">
          <FlatList
            data={property.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                className="w-full h-72"
                resizeMode="cover"
              />
            )}
          />

          {/* Header Overlay */}
          <View className="absolute top-0 left-0 right-0 p-6 flex-row justify-between items-center pt-4">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full items-center justify-center"
            >
              <ArrowLeft size={20} className="text-white" />
            </TouchableOpacity>
            <View className="flex-row gap-3">
              <TouchableOpacity className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full items-center justify-center">
                <Share size={20} className="text-white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFavorite(!isFavorite)}
                className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full items-center justify-center"
              >
                <Heart
                  size={20}
                  className={
                    isFavorite ? "text-red-500 fill-red-500" : "text-white"
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {property.images.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${index === 0 ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </View>
        </View>

        {/* Property Info */}
        <View className="px-6 pt-6 gap-4">
          <View>
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <Text className="text-3xl font-bold text-foreground">
                  {property.price}
                </Text>
                <Text className="text-lg text-foreground mt-1">
                  {property.title}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center mt-2">
              <MapPin size={16} className="text-muted-foreground" />
              <Text className="text-muted-foreground ml-1 flex-1">
                {property.address}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-4 py-4 border-b border-border">
            <View className="flex-1 bg-card rounded-xl p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                {property.beds}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">Beds</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                {property.baths}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">Baths</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl p-4 items-center">
              <Text className="text-2xl font-bold text-foreground">
                {property.sqft}
              </Text>
              <Text className="text-sm text-muted-foreground mt-1">Sqft</Text>
            </View>
          </View>

          {/* Description */}
          <View className="pt-4">
            <Text className="text-xl font-bold text-foreground mb-3">
              Description
            </Text>
            <Text className="text-muted-foreground leading-relaxed">
              {property.description}
            </Text>
          </View>

          {/* Amenities */}
          <View className="pt-4">
            <Text className="text-xl font-bold text-foreground mb-4">
              Amenities
            </Text>
            <View className="flex-row flex-wrap gap-4">
              {property.amenities.map((amenity: Amenity) => (
                <View
                  key={amenity.id}
                  className="bg-card rounded-xl px-4 py-3 flex-row items-center gap-2"
                >
                  {renderAmenityIcon(amenity.icon)}
                  <Text className="text-foreground text-sm">
                    {amenity.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View className="pt-4">
            <Text className="text-xl font-bold text-foreground mb-4">
              Location
            </Text>
            <View className="bg-card rounded-xl overflow-hidden h-48">
              <Image
                source={{
                  uri: "https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.4006,34.0689,14,0/400x300?access_token=placeholder",
                }}
                className="w-full h-full opacity-60"
                resizeMode="cover"
              />
              <View className="absolute inset-0 items-center justify-center">
                <View className="bg-primary/20 p-3 rounded-full">
                  <MapPin size={24} className="text-primary" />
                </View>
              </View>
            </View>
          </View>

          {/* Agent Info */}
          <View className="pt-4 pb-6">
            <Text className="text-xl font-bold text-foreground mb-4">
              Agent
            </Text>
            <View className="bg-card rounded-xl p-4 flex-row items-center gap-4">
              <Image
                source={{ uri: property.agent.avatar }}
                className="w-16 h-16 rounded-full"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  {property.agent.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <Text className="text-muted-foreground ml-1">
                    {property.agent.rating} ({property.agent.reviews} reviews)
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                  <Phone size={20} className="text-primary" />
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-8">
        <TouchableOpacity
          onPress={() => router.push("/schedule-tour")}
          className="bg-primary rounded-xl py-4 items-center"
        >
          <Text className="text-white font-semibold text-lg">
            Schedule Tour
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
