/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChevronLeft, Shield, Star, UserX } from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

// Mock data for blocked agents
const blockedAgentsData = [
  {
    id: "agent1",
    name: "Robert Johnson",
    email: "robert.johnson@agency.com",
    phone: "+1 (555) 234-5678",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    rating: 3.2,
    blockedDate: "October 20, 2024",
    reason: "Poor communication",
  },
  {
    id: "agent2",
    name: "Michelle Lee",
    email: "michelle.lee@agency.com",
    phone: "+1 (555) 345-6789",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    rating: 2.8,
    blockedDate: "September 15, 2024",
    reason: "Unprofessional behavior",
  },
  {
    id: "agent3",
    name: "David Martinez",
    email: "david.martinez@agency.com",
    phone: "+1 (555) 456-7890",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    rating: 2.5,
    blockedDate: "August 10, 2024",
    reason: "Misleading information",
  },
];

type BlockedAgent = (typeof blockedAgentsData)[0];

export default function AgentBlocklistScreen() {
  const [blockedAgents, setBlockedAgents] =
    useState<BlockedAgent[]>(blockedAgentsData);
  const router = useRouter();

  const handleUnblock = (agentId: string, agentName: string) => {
    Alert.alert(
      "Unblock Agent",
      `Are you sure you want to unblock ${agentName}? You'll be able to receive tour requests from this agent again.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Unblock",
          style: "default",
          onPress: () => {
            setBlockedAgents((prev) => prev.filter((a) => a.id !== agentId));
            Alert.alert("Success", `${agentName} has been unblocked.`);
          },
        },
      ],
    );
  };

  const renderBlockedAgent = ({
    item,
    index,
  }: {
    item: BlockedAgent;
    index: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} className="mb-4">
      <View className="bg-card rounded-2xl p-5 shadow-sm border border-border overflow-hidden">
        <View className="flex-row items-start gap-4 mb-4">
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground mb-1">
              {item.name}
            </Text>
            <View className="flex-row items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(item.rating) ? "#fbbf24" : "#d1d5db"}
                  color={i < Math.floor(item.rating) ? "#fbbf24" : "#d1d5db"}
                />
              ))}
              <Text className="text-xs text-muted-foreground ml-1">
                {item.rating}
              </Text>
            </View>
            <View className="bg-red-50 dark:bg-red-900/20 rounded-lg px-2 py-1">
              <Text className="text-xs font-medium text-red-700 dark:text-red-400">
                🚫 {item.reason}
              </Text>
            </View>
          </View>
        </View>

        <View className="border-t border-border pt-4 mb-4">
          <View className="gap-2 mb-3">
            <View className="flex-row items-center gap-2">
              <Text className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Email
              </Text>
              <Text className="text-sm text-foreground flex-1">
                {item.email}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Phone
              </Text>
              <Text className="text-sm text-foreground flex-1">
                {item.phone}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Blocked
              </Text>
              <Text className="text-sm text-foreground flex-1">
                {item.blockedDate}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleUnblock(item.id, item.name)}
          className="bg-primary/10 border border-primary/30 rounded-lg py-3 flex-row items-center justify-center gap-2"
        >
          <Shield size={18} color="#0d9488" />
          <Text className="text-primary font-semibold text-sm">
            Unblock Agent
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 bg-card rounded-full border border-border"
          >
            <ChevronLeft
              size={20}
              className="text-foreground"
              strokeWidth={2.5}
            />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-foreground">
            Blocked Agents
          </Text>
        </View>
        <ThemeToggle />
      </View>

      {/* Info Card */}
      <View className="px-6 py-4">
        <View className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800 flex-row items-start gap-3">
          <UserX
            size={20}
            className="text-blue-600 dark:text-blue-400 mt-0.5"
          />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
              About Blocked Agents
            </Text>
            <Text className="text-xs text-blue-600 dark:text-blue-400">
              Blocked agents won't be able to send you tour requests or
              messages.
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      {blockedAgents.length > 0 ? (
        <FlatList
          data={blockedAgents}
          renderItem={renderBlockedAgent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Animated.View entering={FadeIn} className="mb-4">
              <View className="bg-card rounded-xl p-3 flex-row items-center gap-2 border border-border">
                <Shield size={18} color="#0d9488" />
                <Text className="text-sm font-medium text-foreground flex-1">
                  {blockedAgents.length} agent
                  {blockedAgents.length !== 1 ? "s" : ""} blocked
                </Text>
              </View>
            </Animated.View>
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full bg-muted items-center justify-center mb-4">
            <Shield size={32} color="#9ca3af" />
          </View>
          <Text className="text-xl font-semibold text-foreground mb-2">
            No Blocked Agents
          </Text>
          <Text className="text-sm text-muted-foreground text-center">
            You haven't blocked any agents yet. Blocked agents won't be able to
            contact you.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
