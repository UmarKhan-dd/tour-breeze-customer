import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Plus, Edit, Trash2, MapPin, X, Home } from "lucide-react-native";
import { useColorScheme } from "nativewind";

// Mock Data
const initialListings = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    price: "$450,000",
    address: "123 Main Street, Downtown",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1544654187-454deb2b423e?w=900&auto=format&fit=crop&q=60",
    beds: 2,
    baths: 2,
  },
  {
    id: "2",
    title: "Suburban Family Home",
    price: "$320,000",
    address: "789 Maple Lane, Suburbs",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1564393333316-a1a043196554?w=900&auto=format&fit=crop&q=60",
    beds: 3,
    baths: 2,
  },
  {
    id: "3",
    title: "Luxury Waterfront Villa",
    price: "$1,250,000",
    address: "456 Ocean Drive, Marina Bay",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1577919518833-57dc0a0105e1?w=900&auto=format&fit=crop&q=60",
    beds: 4,
    baths: 3,
  },
  {
    id: "4",
    title: "Cozy Studio Apartment",
    price: "$180,000",
    address: "321 Elm Street, Midtown",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop&q=60",
    beds: 1,
    baths: 1,
  },
];

type Listing = (typeof initialListings)[0];

export default function AgentListingsScreen() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    price: "",
    address: "",
  });
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Sold":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Listing",
      "Are you sure you want to delete this property?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setListings(listings.filter((item) => item.id !== id)),
        },
      ],
    );
  };

  const handleEdit = (item: Listing) => {
    Alert.alert(
      "Edit Listing",
      `Edit functionality for "${item.title}" would open here.`,
    );
  };

  const handleAddListing = () => {
    if (!newListing.title || !newListing.price || !newListing.address) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const listing: Listing = {
      id: Date.now().toString(),
      title: newListing.title,
      price: newListing.price.startsWith("$")
        ? newListing.price
        : `$${newListing.price}`,
      address: newListing.address,
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60", // Default image
      beds: 2,
      baths: 1,
    };

    setListings([listing, ...listings]);
    setNewListing({ title: "", price: "", address: "" });
    setIsModalVisible(false);
  };

  const renderListingItem = ({ item }: { item: Listing }) => (
    <View className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <View className="flex-1">
            <Text
              className="text-lg font-bold text-foreground mb-1"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View className="flex-row items-center gap-1">
              <MapPin size={14} className="text-muted-foreground" />
              <Text className="text-sm text-muted-foreground" numberOfLines={1}>
                {item.address}
              </Text>
            </View>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}
          >
            <Text className="text-xs font-semibold">{item.status}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-border">
          <Text className="text-xl font-bold text-teal-600 dark:text-teal-400">
            {item.price}
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              className="p-2 bg-secondary rounded-full"
            >
              <Edit size={18} className="text-foreground" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full"
            >
              <Trash2
                size={18}
                className="text-red-500 dark:text-red-400"
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">My Listings</Text>
        <ThemeToggle />
      </View>

      <View className="px-6 mb-4">
        <Text className="text-sm text-muted-foreground">
          Manage your properties and track their status
        </Text>
      </View>

      <FlatList
        data={listings}
        renderItem={renderListingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Home size={48} className="text-muted-foreground mb-4" />
            <Text className="text-lg font-semibold text-foreground">
              No Listings Yet
            </Text>
            <Text className="text-sm text-muted-foreground text-center mt-2">
              Tap the + button to add your first property
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => setIsModalVisible(true)}
      >
        <Plus size={24} color="white" strokeWidth={3} />
      </TouchableOpacity>

      {/* Add Listing Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          {/* Backdrop */}
          <View className="absolute inset-0 bg-black/50" />

          {/* Modal Content */}
          <View
            style={{ backgroundColor: isDark ? "#1a2e2a" : "#ffffff" }}
            className="rounded-t-3xl p-6 pb-10"
          >
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-foreground">
                Add New Property
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <X size={24} className="text-muted-foreground" />
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Property Title
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="e.g. Modern Villa"
                  placeholderTextColor="#9ca3af"
                  value={newListing.title}
                  onChangeText={(text) =>
                    setNewListing({ ...newListing, title: text })
                  }
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Price
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="e.g. $500,000"
                  placeholderTextColor="#9ca3af"
                  value={newListing.price}
                  onChangeText={(text) =>
                    setNewListing({ ...newListing, price: text })
                  }
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Address
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-xl px-4 py-3 text-foreground"
                  placeholder="Full address"
                  placeholderTextColor="#9ca3af"
                  value={newListing.address}
                  onChangeText={(text) =>
                    setNewListing({ ...newListing, address: text })
                  }
                />
              </View>

              <TouchableOpacity
                className="bg-primary rounded-xl py-4 items-center shadow-sm mt-4"
                onPress={handleAddListing}
              >
                <Text className="text-white font-semibold text-lg">
                  Add Listing
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
