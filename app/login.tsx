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
import { Mail, Lock, Apple, Zap } from "lucide-react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAuth } from "@/lib/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, loginWithGoogle, loginWithApple } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      router.replace("/(tabs)");
    } catch {
      Alert.alert(
        "Google Login Failed",
        "An error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      await loginWithApple();
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Apple Login Failed", "An error occurred. Please try again.");
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
              Welcome Back
            </Text>
            <Text className="text-base text-muted-foreground">
              Sign in to continue exploring properties
            </Text>
          </Animated.View>

          {/* Email Input */}
          <Animated.View entering={FadeInDown.delay(200)} className="mb-4">
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
          <Animated.View entering={FadeInDown.delay(300)} className="mb-6">
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

          {/* Login Button */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="bg-primary rounded-xl py-3 items-center justify-center mb-4"
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-base font-bold">Login</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View
            entering={FadeInDown.delay(500)}
            className="flex-row items-center mb-6"
          >
            <View className="flex-1 h-px bg-border" />
            <Text className="px-3 text-muted-foreground text-sm">
              Or continue with
            </Text>
            <View className="flex-1 h-px bg-border" />
          </Animated.View>

          {/* Google Login */}
          <Animated.View entering={FadeInDown.delay(600)} className="mb-3">
            <TouchableOpacity
              onPress={handleGoogleLogin}
              disabled={loading}
              className="flex-row items-center justify-center gap-2 bg-card border border-border rounded-xl py-3"
            >
              <Zap size={20} color="#ea4335" />
              <Text className="text-foreground text-base font-semibold">
                Google
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Apple Login */}
          <Animated.View entering={FadeInDown.delay(700)} className="mb-6">
            <TouchableOpacity
              onPress={handleAppleLogin}
              disabled={loading}
              className="flex-row items-center justify-center gap-2 bg-card border border-border rounded-xl py-3"
            >
              <Apple size={20} color="#000" />
              <Text className="text-foreground text-base font-semibold">
                Apple
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Signup Link */}
          <Animated.View
            entering={FadeInDown.delay(800)}
            className="flex-row items-center justify-center"
          >
            <Text className="text-muted-foreground">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/signup")}
              disabled={loading}
            >
              <Text className="text-primary font-semibold">Sign up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
