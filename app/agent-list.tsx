import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Star,
  MapPin,
  ChevronRight,
  Calendar,
  Clock,
} from "lucide-react-native";

// Mock Data
const tourRequest = {
  id: "TR-2024-001",
  date: "Oct 24, 2024",
  time: "10:00 AM",
  propertyCount: 3,
};

const agents = [
  {
    id: "1",
    name: "Sarah Mitchell",
    rating: 4.9,
    reviews: 128,
    specialty: "Luxury Homes",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    status: "Accepted",
  },
  {
    id: "2",
    name: "James Rodriguez",
    rating: 4.7,
    reviews: 95,
    specialty: "First-Time Buyers",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    status: "Accepted",
  },
  {
    id: "3",
    name: "Emily Chen",
    rating: 4.8,
    reviews: 156,
    specialty: "Investment Properties",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    status: "Accepted",
  },
];

type Agent = (typeof agents)[0];

export default function AgentListScreen() {
  const router = useRouter();

  const renderAgentCard = ({ item }: { item: Agent }) => (
    <View className="bg-card rounded-2xl p-4 mb-4 shadow-sm border border-border">
      <View className="flex-row items-center gap-4">
        {/* Avatar */}
        <Image
          source={{ uri: item.avatar }}
          className="w-16 h-16 rounded-full"
          resizeMode="cover"
        />

        {/* Info */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">{item.name}</Text>
          <View className="flex-row items-center gap-1 mt-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <Text className="text-sm font-medium text-foreground">
              {item.rating}
            </Text>
            <Text className="text-sm text-muted-foreground">
              ({item.reviews} reviews)
            </Text>
          </View>
          <View className="flex-row items-center gap-1 mt-1">
            <MapPin size={12} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">
              {item.specialty}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={() => router.push(`/agent-detail?id=${item.id}`)}
          className="bg-secondary px-4 py-2 rounded-xl flex-row items-center gap-2"
        >
          <Text className="text-sm font-semibold text-secondary-foreground">
            View
          </Text>
          <ChevronRight size={16} className="text-secondary-foreground" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-4">
        <Text className="text-2xl font-bold text-foreground">
          Available Agents
        </Text>
        <Text className="text-sm text-muted-foreground mt-1">
          Agents who accepted your tour request
        </Text>
      </View>

      {/* Tour Request Summary Card */}
      <View className="mx-6 mb-6 bg-primary/10 border border-primary/20 rounded-2xl p-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-semibold text-primary">
            Request #{tourRequest.id}
          </Text>
          <View className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
            <Text className="text-xs font-medium text-green-700 dark:text-green-400">
              Accepted
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <Calendar size={16} className="text-muted-foreground" />
            <Text className="text-sm text-foreground">{tourRequest.date}</Text>
          </View>
          <View className="flex-row items-center gap-1.5">
            <Clock size={16} className="text-muted-foreground" />
            <Text className="text-sm text-foreground">{tourRequest.time}</Text>
          </View>
        </View>
        <Text className="text-xs text-muted-foreground mt-2">
          {tourRequest.propertyCount} properties included in this tour
        </Text>
      </View>

      {/* Agents List */}
      <FlatList
        data={agents}
        renderItem={renderAgentCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-lg font-semibold text-foreground">
              No Agents Yet
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-2">
              Waiting for agents to accept your request
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
