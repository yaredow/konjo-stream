import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Container } from "@/components/container";
import { useRouter } from "expo-router";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowLeft01Icon,
  Search01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic here
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Container>
      <View className="px-4 pb-4">
        <View className="flex-row items-center gap-3 mb-4">
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

          {/* Search Input */}
          <View className="flex-1 flex-row items-center bg-input rounded-2xl px-4 py-3 border border-border">
            <HugeiconsIcon
              icon={Search01Icon}
              size={20}
              color="hsl(215 16% 65%)"
            />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Search movies, shows..."
              placeholderTextColor="hsl(215 16% 65%)"
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={clearSearch} className="ml-2">
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={20}
                  color="hsl(215 16% 65%)"
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* Search Results */}
      <View className="flex-1 px-4">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="hsl(268 88% 62%)" />
          </View>
        ) : searchQuery.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <HugeiconsIcon
              icon={Search01Icon}
              size={64}
              color="hsl(215 16% 65%)"
              strokeWidth={1.5}
            />
            <Text className="text-muted-foreground text-lg mt-4">
              Search for movies and shows
            </Text>
            <Text className="text-muted-foreground text-sm mt-2 text-center">
              Start typing to find your favorite content
            </Text>
          </View>
        ) : (
          <View className="flex-1">
            <Text className="text-white text-sm mb-4">
              Results for "{searchQuery}"
            </Text>
            {/* TODO: Replace with actual search results */}
            <FlatList
              data={[]}
              renderItem={() => null}
              ListEmptyComponent={
                <View className="items-center py-12">
                  <Text className="text-muted-foreground text-base">
                    No results found
                  </Text>
                  <Text className="text-muted-foreground text-sm mt-2">
                    Try a different search term
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </View>
    </Container>
  );
}
