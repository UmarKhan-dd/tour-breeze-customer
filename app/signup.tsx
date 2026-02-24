import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Mail, Lock, User, Apple, Zap } from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAuth } from "@/lib/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup, loginWithGoogle, loginWithApple } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Signup Failed", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.replace("/(tabs)");
    } catch {
      Alert.alert(
        "Google Signup Failed",
        "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    setLoading(true);
    try {
      await loginWithApple();
      router.replace("/(tabs)");
    } catch {
      Alert.alert(
        "Apple Signup Failed",
        "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-end">
          <ThemeToggle />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <Animated.View entering={FadeIn.delay(100)} className="mb-8">
            <Text className="text-4xl font-bold text-foreground mb-2">
              Join Tour Breeze
            </Text>
            <Text className="text-base text-muted-foreground">
              Create an account to book property tours
            </Text>
          </Animated.View>

          {/* Name Input */}
          <Animated.View entering={FadeInDown.delay(200)} className="mb-4">
            <View className="flex-row items-center bg-card border border-border rounded-xl px-4 py-3">
              <User size={20} color="#6b7280" className="mr-3" />
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                editable={!loading}
                className="flex-1 text-foreground text-base"
              />
            </View>
          </Animated.View>

          {/* Email Input */}
          <Animated.View entering={FadeInDown.delay(300)} className="mb-4">
            <View className="flex-row items-center bg-card border border-border rounded-xl px-4 py-3">
              <Mail size={20} color="#6b7280" className="mr-3" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
                className="flex-1 text-foreground text-base"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </Animated.View>

          {/* Password Input */}
          <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
            <View className="flex-row items-center bg-card border border-border rounded-xl px-4 py-3">
              <Lock size={20} color="#6b7280" className="mr-3" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                editable={!loading}
                secureTextEntry
                className="flex-1 text-foreground text-base"
              />
            </View>
          </Animated.View>

          {/* Signup Button */}
          <Animated.View entering={FadeInDown.delay(500)}>
            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              className="bg-primary rounded-xl py-3 items-center justify-center mb-4"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-base font-bold">Sign Up</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="flex-row items-center mb-6"
          >
            <View className="flex-1 h-px bg-border" />
            <Text className="px-3 text-muted-foreground text-sm">
              Or continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </Animated.View>

          {/* Google Signup */}
          <Animated.View entering={FadeInDown.delay(700)} className="mb-3">
            <TouchableOpacity
              onPress={handleGoogleSignup}
              disabled={loading}
              className="flex-row items-center justify-center gap-2 bg-card border border-border rounded-xl py-3"
            >
              <Zap size={20} color="#ea4335" />
              <Text className="text-foreground text-base font-semibold">
                Google
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Apple Signup */}
          <Animated.View entering={FadeInDown.delay(800)} className="mb-6">
            <TouchableOpacity
              onPress={handleAppleSignup}
              disabled={loading}
              className="flex-row items-center justify-center gap-2 bg-card border border-border rounded-xl py-3"
            >
              <Apple size={20} color="#000" />
              <Text className="text-foreground text-base font-semibold">
                Apple
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Link */}
          <Animated.View
            entering={FadeInDown.delay(900)}
            className="flex-row items-center justify-center"
          >
            <Text className="text-muted-foreground">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              disabled={loading}
            >
              <Text className="text-primary font-semibold">Log in</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
