/* eslint-disable react/no-unescaped-entities */
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
  MessageSquare,
  Star,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

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
  status: "open",
  message:
    "Hi, I'm interested in viewing this property. I'm looking for a modern space with good natural light.",
};

// Mock agent responses
const mockResponses = [
  {
    id: "agent1",
    name: "John Smith",
    message: "I'd be happy to show you this property. It's a great investment!",
    offer: "Available this weekend and next week",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    rating: 4.8,
  },
  {
    id: "agent2",
    name: "Emily Davis",
    message:
      "This property has excellent potential. I specialize in downtown properties.",
    offer: "Can arrange tours on weekdays",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    rating: 4.9,
  },
];

type Request = typeof mockRequest;
type AgentResponse = (typeof mockResponses)[0];

export default function TourRequestDetailScreen() {
  const [request, setRequest] = useState<Request>(mockRequest);
  const [activeTab, setActiveTab] = useState<
    "open" | "submitted" | "responses" | "confirmed"
  >("open");
  const [selectedAgent, setSelectedAgent] = useState<AgentResponse | null>(
    null,
  );
  const [responses, setResponses] = useState<AgentResponse[]>(mockResponses);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleApproveAgent = (agent: AgentResponse) => {
    Alert.alert("Approve Agent", `Confirm appointment with ${agent.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Approve",
        style: "default",
        onPress: () => {
          // API call would go here
          setRequest({ ...request, status: "confirmed" });
          setSelectedAgent(agent);
          setActiveTab("confirmed");
          Alert.alert("Success", `${agent.name} has been approved!`);
        },
      },
    ]);
  };

  const handleReject = () => {
    Alert.alert(
      "Reject Request",
      "Are you sure you want to reject this tour request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            Alert.alert("Rejected", "Tour request has been rejected.");
          },
        },
      ],
    );
  };

  const tabs = [
    { id: "open", label: "Open" },
    { id: "submitted", label: "Submitted" },
    ...(responses.length > 0
      ? [{ id: "responses", label: `Responses (${responses.length})` }]
      : []),
    ...(request.status === "confirmed"
      ? [{ id: "confirmed", label: "Confirmed" }]
      : []),
  ] as const;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "submitted":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "open":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const PropertyCard = () => (
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
        {/* NO AGENT INFO - Agents only finalized after approval */}
      </View>
    </View>
  );

  const CustomerInfoCard = () => (
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
  );

  const TourDetailsCard = () => (
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
  );

  const MessageCard = () => (
    <>
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
    </>
  );

  const AgentResponseCard = ({
    agent,
    index,
  }: {
    agent: AgentResponse;
    index: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} className="mb-4">
      <View className="bg-card rounded-2xl p-5 shadow-sm border border-border">
        <View className="flex-row items-center gap-4 mb-4">
          <Image
            source={{ uri: agent.image }}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-foreground">
              {agent.name}
            </Text>
            <View className="flex-row items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(agent.rating) ? "#fbbf24" : "#d1d5db"}
                  color={i < Math.floor(agent.rating) ? "#fbbf24" : "#d1d5db"}
                />
              ))}
              <Text className="text-xs text-muted-foreground ml-1">
                {agent.rating}
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-secondary/30 rounded-xl p-3 mb-4">
          <View className="flex-row items-start gap-2 mb-2">
            <MessageSquare size={16} className="text-primary mt-1" />
            <Text className="text-sm text-foreground flex-1 leading-relaxed">
              {agent.message}
            </Text>
          </View>
        </View>

        <View className="bg-primary/10 rounded-xl p-3 mb-4">
          <Text className="text-xs text-muted-foreground mb-1">Offer:</Text>
          <Text className="text-sm font-medium text-foreground">
            {agent.offer}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-primary rounded-xl py-3 items-center"
          onPress={() => handleApproveAgent(agent)}
        >
          <Text className="text-white font-semibold">Approve Agent</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const ConfirmedAgentCard = () => (
    <Animated.View entering={FadeIn} className="mb-6">
      {selectedAgent && (
        <View className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 border border-green-200 dark:border-green-800">
          <View className="flex-row items-start gap-3 mb-4">
            <Check size={24} className="text-green-600 dark:text-green-400" />
            <View className="flex-1">
              <Text className="text-lg font-bold text-green-700 dark:text-green-400">
                Appointment Confirmed
              </Text>
              <Text className="text-sm text-green-600 dark:text-green-300">
                Your tour has been scheduled
              </Text>
            </View>
          </View>

          <View className="bg-white/50 dark:bg-white/10 rounded-xl p-4">
            <View className="flex-row items-center gap-4 mb-4">
              <Image
                source={{ uri: selectedAgent.image }}
                className="w-16 h-16 rounded-full"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  {selectedAgent.name}
                </Text>
                <View className="flex-row items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(selectedAgent.rating)
                          ? "#fbbf24"
                          : "#d1d5db"
                      }
                      color={
                        i < Math.floor(selectedAgent.rating)
                          ? "#fbbf24"
                          : "#d1d5db"
                      }
                    />
                  ))}
                </View>
              </View>
            </View>

            <View className="border-t border-border pt-3">
              <Text className="text-sm font-medium text-foreground mb-1">
                Tour Scheduled
              </Text>
              <Text className="text-sm text-muted-foreground">
                {request.requestedDate} at {request.requestedTime}
              </Text>
            </View>
          </View>
        </View>
      )}
    </Animated.View>
  );

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

      {/* Tabs */}
      <View className="px-6 py-4 border-b border-border">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg border ${
                activeTab === tab.id
                  ? "bg-primary border-primary"
                  : "bg-card border-border"
              }`}
            >
              <Text
                className={`font-medium text-sm ${
                  activeTab === tab.id ? "text-white" : "text-foreground"
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 200,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Open Tab - Initial Request (NO AGENT INFO) */}
        {activeTab === "open" && (
          <Animated.View entering={FadeIn}>
            <PropertyCard />
            <CustomerInfoCard />
            <TourDetailsCard />
            <MessageCard />

            <View className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 mb-6">
              <Text className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                📝 Awaiting agent responses...
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Submitted Tab - Request Confirmed (NO AGENT INFO) */}
        {activeTab === "submitted" && (
          <Animated.View entering={FadeIn}>
            <PropertyCard />
            <CustomerInfoCard />
            <TourDetailsCard />
            <MessageCard />

            <View className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
              <View className="flex-row items-start gap-3">
                <Check
                  size={20}
                  className="text-blue-600 dark:text-blue-400 mt-0.5"
                />
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    Request Submitted
                  </Text>
                  <Text className="text-xs text-blue-600 dark:text-blue-400">
                    Your tour request has been sent to available agents. You'll
                    receive responses shortly.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Responses Tab - Agent Responses */}
        {activeTab === "responses" && (
          <Animated.View entering={FadeIn}>
            <PropertyCard />

            <View className="mb-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-semibold text-foreground">
                  Agent Responses
                </Text>
                <View className="bg-primary/20 rounded-full px-3 py-1">
                  <Text className="text-xs font-semibold text-primary">
                    {responses.length} Available
                  </Text>
                </View>
              </View>
              {responses.map((agent, index) => (
                <AgentResponseCard key={agent.id} agent={agent} index={index} />
              ))}
            </View>
          </Animated.View>
        )}

        {/* Confirmed Tab - Approved Agent */}
        {activeTab === "confirmed" && (
          <Animated.View entering={FadeIn}>
            <PropertyCard />
            <ConfirmedAgentCard />
            <TourDetailsCard />
          </Animated.View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      {activeTab === "open" && (
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
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl py-4 flex-row items-center justify-center shadow-sm"
              onPress={() => setActiveTab("submitted")}
            >
              <Check
                size={20}
                color="white"
                className="mr-2"
                strokeWidth={2.5}
              />
              <Text className="text-white font-semibold text-base">
                Submit Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
