import { authClient } from "@/lib/auth-client";
import { useColorScheme } from "@/lib/use-color-scheme";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GoogleIcon } from "@/components/google-icon";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onError: (error) => {
            console.error("Sign in error:", error);
            setError(error.error?.message || "Failed to sign in");
            setIsLoading(false);
          },
          onSuccess: () => {
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
          <Text className="text-3xl text-white font-bold text-center ">
            Welcome
          </Text>
          <Text className="text-center mt-2 text-white/70">
            Sign in and continue enjoying movies
          </Text>
        </View>

        <View className="space-y-12">
          <View className="flex flex-col gap-y-6">
            <View>
              <Text className="font-semibold mb-2 text-base text-white">
                Email
              </Text>

              <TextInput
                className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600 focus:border-lewi"
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
                className="p-4 rounded-2xl border text-base bg-zinc-700/50 text-white border-zinc-600 focus:border-lewi"
                placeholder="Enter your password"
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

          <View className="items-end mt-3">
            <TouchableOpacity>
              <Text className="font-medium text-white/70">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign in button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className="bg-primary rounded-2xl py-4 shadow-md flex-row justify-center items-center mt-8"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-primary-foreground font-bold text-lg">
                Sign In
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

        {/* Sign up */}
        <View className="flex-row items-center justify-center mt-10">
          <Text className="text-base text-white/70">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text className="text-primary-foreground font-semibold text-base">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
