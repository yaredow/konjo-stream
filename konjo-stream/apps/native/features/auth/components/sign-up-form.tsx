import { authClient } from "@/lib/auth-client";
import { GoogleIcon } from "@/components/google-icon";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signUp.email(
        { name, email, password },
        {
          onError: (error) => {
            console.error("Sign up error:", error);
            setError(error.error?.message || "Failed to sign up");
            setIsLoading(false);
          },
          onSuccess: () => {
            setName("");
            setEmail("");
            setPassword("");
            router.push("/(tabs)");
          },
          onFinished: () => setIsLoading(false),
        }
      );
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="w-full max-w-md">
        <View className="mb-8">
          <Text className="text-3xl text-white font-bold text-center">
            Create Account
          </Text>
          <Text className="text-center mt-2 text-white/70">
            Sign up to start your streaming journey
          </Text>
        </View>

        <View className="space-y-8">
          <View className="flex flex-col gap-y-6">
            <View>
              <Text className="font-semibold mb-2 text-base text-white">
                Name
              </Text>
              <TextInput
                className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600"
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>

            <View>
              <Text className="font-semibold mb-2 text-base text-white">
                Email
              </Text>
              <TextInput
                className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            <View>
              <Text className="font-semibold mb-2 text-base text-white">
                Password
              </Text>
              <TextInput
                className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600"
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>
          </View>

          {error && (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          )}

          {/* Sign up button */}
          <TouchableOpacity
            onPress={handleSignUp}
            disabled={isLoading}
            className="bg-primary rounded-2xl py-4 shadow-md flex-row justify-center items-center mt-8"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-primary-foreground font-bold text-lg">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-zinc-600" />
          <Text className="mx-4 font-medium text-white/50">or</Text>
          <View className="flex-1 h-px bg-zinc-600" />
        </View>

        {/* Social buttons */}
        <View className="space-y-3">
          <TouchableOpacity className="rounded-2xl py-4 flex-row justify-center items-center border bg-zinc-700/30 border-zinc-600 gap-3">
            <GoogleIcon size={20} />
            <Text className="font-semibold text-base text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign in */}
        <View className="flex-row items-center justify-center mt-10">
          <Text className="text-base text-white/70">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text className="text-primary-foreground font-semibold text-base">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
