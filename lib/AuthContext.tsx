import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name: string;
  provider: "email" | "google" | "apple";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Failed to restore session:", e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulated login - any credentials work for now
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        provider: "email",
      };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      console.error("Login failed:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulated signup - any credentials work for now
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        provider: "email",
      };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      console.error("Signup failed:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulated Google login
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: `user.${Math.random().toString(36).substr(2, 5)}@gmail.com`,
        name: "Google User",
        provider: "google",
      };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      console.error("Google login failed:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    setIsLoading(true);
    try {
      // Simulated Apple login
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: `user.${Math.random().toString(36).substr(2, 5)}@icloud.com`,
        name: "Apple User",
        provider: "apple",
      };
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      console.error("Apple login failed:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.error("Logout failed:", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    loginWithGoogle,
    loginWithApple,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
