import React from "react";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { useRouter } from "expo-router";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Container } from "@/components/container";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignInPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Container>
        <View
          style={{ top: insets.top + 16, left: 16 }}
          className="absolute z-10"
        >
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary/50 items-center justify-center"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={20}
              color="hsl(210 20% 96%)"
            />
          </Pressable>
        </View>

        <View className="flex-1 justify-center px-6">
          <SignInForm />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
