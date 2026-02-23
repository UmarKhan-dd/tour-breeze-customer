import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  ChevronLeft,
  Calendar,
  CheckCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

type Review = {
  id: number;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
};

type Agent = {
  id: number;
  name: string;
  photo: string;
  title: string;
  agency: string;
  rating: number;
  reviewCount: number;
  toursCompleted: number;
  yearsExperience: number;
  badges: string[];
  phone: string;
  email: string;
  location: string;
  reviews: Review[];
};

const mockAgent: Agent = {
  id: 1,
  name: "Sarah Johnson",
  photo:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
  title: "Senior Real Estate Agent",
  agency: "Premier Properties",
  rating: 4.9,
  reviewCount: 127,
  toursCompleted: 342,
  yearsExperience: 8,
  badges: ["Top Rated", "Expert Negotiator", "Fast Response"],
  phone: "+1 (555) 123-4567",
  email: "sarah.johnson@premier.com",
  location: "Downtown District",
  reviews: [
    {
      id: 1,
      customerName: "Michael Chen",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Sarah was exceptional! She found us the perfect home within our budget and negotiated a great deal.",
    },
    {
      id: 2,
      customerName: "Emily Rodriguez",
      rating: 5,
      date: "1 month ago",
      comment:
        "Professional, knowledgeable, and always available. Made the whole process stress-free.",
    },
    {
      id: 3,
      customerName: "David Thompson",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great agent with excellent market knowledge. Highly recommend for first-time buyers.",
    },
  ],
};

export default function AgentDetailScreen() {
  const router = useRouter();

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            color={i < Math.floor(rating) ? "#fbbf24" : "#d1d5db"}
            fill={i < Math.floor(rating) ? "#fbbf24" : "none"}
          />
        ))}
      </View>
    );
  };

  const renderBadge = (badge: string, index: number) => {
    const colors = ["#0d9488", "#7c3aed", "#ea580c"];
    const color = colors[index % colors.length];

    return (
      <View
        key={badge}
        className="px-3 py-1.5 rounded-full mr-2 mb-2"
        style={{ backgroundColor: `${color}20` }}
      >
        <Text className="text-xs font-medium" style={{ color }}>
          {badge}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Header with Back Button */}
        <View className="relative">
          <Image
            source={{ uri: mockAgent.photo }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(15, 41, 36, 0.8)",
              "rgba(15, 41, 36, 1)",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 120,
            }}
          />

          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm p-2 rounded-full"
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Agent Info Card */}
        <View className="px-6 -mt-16 relative z-10">
          <View className="bg-card rounded-2xl p-6 shadow-lg border-border">
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1">
                <Text className="text-2xl font-bold text-foreground mb-1">
                  {mockAgent.name}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {mockAgent.title}
                </Text>
                <Text className="text-sm text-primary font-medium">
                  {mockAgent.agency}
                </Text>
              </View>
              <View className="bg-primary/10 px-3 py-1 rounded-full">
                <Text className="text-primary font-bold text-lg">
                  {mockAgent.rating}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-3">
              {renderStars(mockAgent.rating)}
              <Text className="text-sm text-muted-foreground ml-2">
                ({mockAgent.reviewCount} reviews)
              </Text>
            </View>

            <View className="flex-row items-center text-muted-foreground mb-2">
              <MapPin size={16} className="mr-2" />
              <Text className="text-sm">{mockAgent.location}</Text>
            </View>

            <View className="flex-row flex-wrap mt-4">
              {mockAgent.badges.map(renderBadge)}
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-6 mt-6">
          <View className="flex-row gap-4">
            <View className="flex-1 bg-card rounded-xl p-4 items-center border-border">
              <Calendar size={24} className="text-primary mb-2" />
              <Text className="text-2xl font-bold text-foreground">
                {mockAgent.toursCompleted}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Tours Completed
              </Text>
            </View>
            <View className="flex-1 bg-card rounded-xl p-4 items-center border-border">
              <Award size={24} className="text-primary mb-2" />
              <Text className="text-2xl font-bold text-foreground">
                {mockAgent.yearsExperience}
              </Text>
              <Text className="text-xs text-muted-foreground">
                Years Experience
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="px-6 mt-6">
          <Text className="text-lg font-bold text-foreground mb-4">
            Contact Information
          </Text>
          <View className="bg-card rounded-xl p-4 border-border gap-3">
            <TouchableOpacity className="flex-row items-center">
              <Phone size={20} className="text-primary mr-3" />
              <Text className="text-foreground flex-1">{mockAgent.phone}</Text>
            </TouchableOpacity>
            <View className="h-px bg-border" />
            <TouchableOpacity className="flex-row items-center">
              <Mail size={20} className="text-primary mr-3" />
              <Text className="text-foreground flex-1">{mockAgent.email}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews Section */}
        <View className="px-6 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-foreground">
              Customer Reviews
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-primary">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-4">
            {mockAgent.reviews.map((review) => (
              <View
                key={review.id}
                className="bg-card rounded-xl p-4 border-border"
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-primary/20 rounded-full items-center justify-center mr-3">
                      <Text className="text-primary font-bold">
                        {review.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Text>
                    </View>
                    <View>
                      <Text className="font-semibold text-foreground">
                        {review.customerName}
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        {review.date}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        color={i < review.rating ? "#fbbf24" : "#d1d5db"}
                        fill={i < review.rating ? "#fbbf24" : "none"}
                      />
                    ))}
                  </View>
                </View>
                <Text className="text-sm text-foreground leading-relaxed">
                  {review.comment}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <TouchableOpacity className="bg-primary rounded-xl py-4 items-center shadow-lg">
          <View className="flex-row items-center">
            <CheckCircle size={20} color="white" className="mr-2" />
            <Text className="text-primary-foreground font-semibold text-lg">
              Select Agent
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
