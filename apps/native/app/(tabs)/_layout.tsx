import { TabBarIcon } from "@/components/tabbar-icon";
import { Tabs, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Bookmark01Icon,
  Menu01Icon,
  Search01Icon,
  UserCircle02FreeIcons,
  Film02Icon,
  Home03Icon,
} from "@hugeicons/core-free-icons";

export default function TabLayout() {
  const router = useRouter();
  const accentColor = "hsl(72 97% 61%)";

  return (
    <>
      <StatusBar style="light" backgroundColor="hsl(225 25% 12%)" />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "hsl(225 25% 12%)",
          },
          headerTintColor: "hsl(210 20% 96%)",
          headerShadowVisible: false,
          headerLeft: () => (
            <Text className="text-2xl font-bold text-slate-100 ml-4">
              Stream
            </Text>
          ),
          headerTitle: "",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                marginRight: 16,
              }}
            >
              <Pressable onPress={() => router.push("/search")}>
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={28}
                  color="hsl(210 20% 96%)"
                  strokeWidth={1.8}
                />
              </Pressable>
              <Pressable onPress={() => router.push("/sign-in")}>
                <HugeiconsIcon
                  icon={UserCircle02FreeIcons}
                  size={28}
                  color="hsl(210 20% 96%)"
                  strokeWidth={1.8}
                />
              </Pressable>
            </View>
          ),
          tabBarActiveTintColor: accentColor,
          tabBarLabelStyle: {
            fontFamily: "Inter_500Medium",
            fontSize: 11,
            marginTop: 4,
          },
          tabBarInactiveTintColor: "hsl(215 16% 65%)",
          tabBarStyle: {
            backgroundColor: "hsl(225 25% 12%)",
            borderTopColor: "hsl(220 18% 18%)",
            borderTopWidth: 1,
            height: 90,
            paddingBottom: 20,
            paddingTop: 8,
            paddingHorizontal: 8,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon icon={Home03Icon} color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="movies"
          options={{
            title: "Movies",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon icon={Film02Icon} color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="watch-list"
          options={{
            title: "Watch List",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon icon={Bookmark01Icon} color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarIcon: ({ color, size }) => (
              <TabBarIcon icon={Menu01Icon} color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
